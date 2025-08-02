import React from 'react';
import { Chrome, AlertCircle } from 'lucide-react';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

interface GoogleAuthProps {
  onSuccess: (user: any) => void;
  userType: 'marketer' | 'influencer';
}

export default function GoogleAuth({ onSuccess, userType }: GoogleAuthProps) {
  const { signInWithGoogle, isLoading, isGoogleLoaded, error, isConfigured } = useGoogleAuth();

  const handleGoogleLogin = async () => {
    try {
      const googleUser = await signInWithGoogle();
      
      // Transform Google user data to match your app's user structure
      const user = {
        ...googleUser,
        type: userType,
        provider: 'google',
      };
      
      onSuccess(user);
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  // Show configuration error if Google OAuth is not set up
  if (!isConfigured) {
    return (
      <div className="w-full p-4 border border-orange-200 rounded-lg bg-orange-50">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
          <div>
            <p className="text-sm font-medium text-orange-800">Google OAuth Not Configured</p>
            <p className="text-xs text-orange-600 mt-1">
              Please add your Google Client ID to continue with Google sign-in.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading || !isGoogleLoaded}
        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
        ) : (
          <>
            <Chrome className="w-5 h-5 mr-3 text-red-500" />
            <span className="font-medium">
              {!isGoogleLoaded ? 'Loading Google...' : 'Continue with Google'}
            </span>
          </>
        )}
      </button>
      
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
          {error}
        </div>
      )}
    </div>
  );
}