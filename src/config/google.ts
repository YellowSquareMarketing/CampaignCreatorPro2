// Google OAuth Configuration
export const GOOGLE_CONFIG = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  redirectUri: window.location.origin,
  scope: 'openid email profile',
};

// Validate Google configuration
export const isGoogleConfigured = () => {
  return Boolean(GOOGLE_CONFIG.clientId && GOOGLE_CONFIG.clientId !== '');
};