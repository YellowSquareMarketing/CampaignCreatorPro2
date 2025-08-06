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
        <div className="max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Google Sign-In Error</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <div className="bg-white p-4 rounded-md border border-red-300 mb-4">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Troubleshooting:</strong>
            </p>
            <ul className="text-sm text-gray-600 text-left space-y-1">
              <li>• Check if popups are blocked in your browser</li>
              <li>• Verify this domain is in Google OAuth settings</li>
              <li>• Try refreshing the page</li>
            </ul>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Setup Help
            </button>
          </div>
          {showInstructions && (
            <div className="mt-6">
              <SetupInstructions />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
        <div className="max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Google OAuth Setup Required</h3>
          <p className="text-yellow-700 mb-4">
            Google Sign-In needs to be configured for this domain to work properly.
          </p>
          <div className="bg-white p-4 rounded-md border border-yellow-300 mb-4">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Current Domain:</strong>
            </p>
            <code className="bg-gray-100 px-2 py-1 rounded text-sm block">
              {window.location.origin}
            </code>
          </div>
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors"
          >
            {showInstructions ? 'Hide' : 'Show'} Setup Instructions
          </button>
          {showInstructions && (
            <div className="mt-6">
              <SetupInstructions />
            </div>
          )}
        </div>
      </button>
      
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
          {error}
        </div>
      )}
    </div>
  );
}