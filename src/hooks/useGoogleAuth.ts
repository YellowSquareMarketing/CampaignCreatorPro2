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

      // Check if we're in a webcontainer environment and show helpful error
      if (window.location.hostname.includes('webcontainer-api.io')) {
        const currentOrigin = window.location.origin;
        console.warn('WebContainer Environment Detected');
        console.warn('Current Origin:', currentOrigin);
        console.warn('Make sure this exact URL is added to your Google OAuth Authorized JavaScript origins:');
        console.warn(currentOrigin);
      }

      setIsLoading(true);
      setError(null);

      // Set up callback for this specific sign-in attempt
      window.googleAuthCallback = (response: any) => {
        try {
          if (response.error) {
            console.error('Google Auth Error:', response.error);
            throw new Error(`Google authentication failed: ${response.error}`);
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
          const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
          console.error('Google Auth Callback Error:', error);
          setError(errorMessage);
          reject(error);
        }
      };

      // Trigger Google sign-in
      window.google.accounts.id.prompt((notification: any) => {
        console.log('Google prompt notification:', notification);
        
        if (notification.isNotDisplayed()) {
          setIsLoading(false);
          setError('Google Sign-In is not available. Please check your Google OAuth configuration and ensure this domain is authorized.');
          reject(new Error('Google Sign-In not displayed'));
        } else if (notification.isSkippedMoment()) {
          setIsLoading(false);
          setError('Google Sign-In was dismissed. Please try again.');
          reject(new Error('Google Sign-In skipped'));
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