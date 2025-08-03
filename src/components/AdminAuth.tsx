import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, AlertTriangle } from 'lucide-react';

interface AdminAuthProps {
  onLogin: (adminUser: any) => void;
}

export default function AdminAuth({ onLogin }: AdminAuthProps) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    accessCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication
    setTimeout(() => {
      // Demo credentials
      if (credentials.email === 'admin@creatorcampaignpro.com' && 
          credentials.password === 'admin123' && 
          credentials.accessCode === 'CCP2024') {
        
        const adminUser = {
          id: 'admin_1',
          email: credentials.email,
          role: 'admin',
          name: 'System Administrator',
          createdAt: '2024-01-01T00:00:00Z',
          lastLogin: new Date().toISOString(),
          permissions: ['view_analytics', 'manage_users', 'system_admin', 'view_logs']
        };
        
        onLogin(adminUser);
      } else {
        setError('Invalid credentials or access code');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
            <p className="text-gray-600 mt-2">Creator Campaign Pro - Management Portal</p>
          </div>

          {/* Security Warning */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-red-800">Restricted Access</p>
                <p className="text-xs text-red-600 mt-1">
                  This area is for authorized personnel only. All access is logged and monitored.
                </p>
              </div>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</p>
            <div className="text-xs text-blue-600 space-y-1">
              <p><strong>Email:</strong> admin@creatorcampaignpro.com</p>
              <p><strong>Password:</strong> admin123</p>
              <p><strong>Access Code:</strong> CCP2024</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="admin@creatorcampaignpro.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Access Code
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  value={credentials.accessCode}
                  onChange={(e) => setCredentials({ ...credentials, accessCode: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter access code"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:from-red-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Access Admin Panel'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            Protected by enterprise-grade security
          </div>
        </div>
      </div>
    </div>
  );
}