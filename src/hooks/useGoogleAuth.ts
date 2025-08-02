import { useState, useEffect } from 'react';
import { GOOGLE_CONFIG, isGoogleConfigured } from '../config/google';

declare global {
  interface Window {
    google: any;
    googleAuthCallback: (response: any) => void;
  }
}

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  avatar: string;
  verified: boolean;
}

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isGoogleConfigured()) {
      setError('Google OAuth is not configured. Please add VITE_GOOGLE_CLIENT_ID to your environment variables.');
      return;
    }

    // Load Google OAuth script
    const loadGoogleScript = () => {
      if (window.google) {
        initializeGoogle();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      script.onerror = () => {
        setError('Failed to load Google OAuth script');
      };
      document.head.appendChild(script);
    };

    const initializeGoogle = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CONFIG.clientId,
          callback: window.googleAuthCallback,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        setIsGoogleLoaded(true);
        setError(null);
      }
    };

    loadGoogleScript();

    return () => {
      // Cleanup
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  const signInWithGoogle = (): Promise<GoogleUser> => {
    return new Promise((resolve, reject) => {
      if (!isGoogleLoaded) {
        reject(new Error('Google OAuth is not loaded yet'));
        return;
      }

      if (!isGoogleConfigured()) {
        reject(new Error('Google OAuth is not configured'));
        return;
      }

      setIsLoading(true);
      setError(null);

      // Set up callback for this specific sign-in attempt
      window.googleAuthCallback = (response: any) => {
        try {
          if (response.error) {
            throw new Error(response.error);
          }

          // Decode JWT token to get user info
          const payload = JSON.parse(atob(response.credential.split('.')[1]));
          
          const user: GoogleUser = {
            id: payload.sub,
            email: payload.email,
            name: payload.name,
            firstName: payload.given_name || '',
            lastName: payload.family_name || '',
            avatar: payload.picture || '',
            verified: payload.email_verified || false,
          };

          setIsLoading(false);
          resolve(user);
        } catch (error) {
          setIsLoading(false);
          setError(error instanceof Error ? error.message : 'Authentication failed');
          reject(error);
        }
      };

      // Trigger Google sign-in
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback to popup if prompt is not displayed
          window.google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CONFIG.clientId,
            scope: GOOGLE_CONFIG.scope,
            callback: (response: any) => {
              if (response.error) {
                setIsLoading(false);
                setError('Authentication failed');
                reject(new Error(response.error));
                return;
              }

              // Get user info using the access token
              fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.access_token}`)
                .then(res => res.json())
                .then(userInfo => {
                  const user: GoogleUser = {
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.name,
                    firstName: userInfo.given_name || '',
                    lastName: userInfo.family_name || '',
                    avatar: userInfo.picture || '',
                    verified: userInfo.verified_email || false,
                  };

                  setIsLoading(false);
                  resolve(user);
                })
                .catch(error => {
                  setIsLoading(false);
                  setError('Failed to get user information');
                  reject(error);
                });
            },
          }).requestAccessToken();
        }
      });
    });
  };

  return {
    signInWithGoogle,
    isLoading,
    isGoogleLoaded,
    error,
    isConfigured: isGoogleConfigured(),
  };
};