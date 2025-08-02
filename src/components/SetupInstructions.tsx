import React, { useState } from 'react';
import { ExternalLink, Copy, CheckCircle, AlertCircle } from 'lucide-react';

export default function SetupInstructions() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const currentDomain = window.location.origin;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Google OAuth Setup Instructions</h2>
        <p className="text-gray-600">Follow these steps to enable Google authentication for your application.</p>
      </div>

      <div className="space-y-6">
        {/* Step 1 */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Create Google Cloud Project</h3>
          </div>
          <div className="ml-11">
            <p className="text-gray-600 mb-3">Go to Google Cloud Console and create a new project or select an existing one.</p>
            <a
              href="https://console.cloud.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Open Google Cloud Console
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Step 2 */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Enable Google+ API</h3>
          </div>
          <div className="ml-11">
            <p className="text-gray-600 mb-3">Navigate to "APIs & Services" → "Library" and enable the Google+ API.</p>
            <a
              href="https://console.cloud.google.com/apis/library"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to API Library
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Step 3 */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Create OAuth 2.0 Credentials</h3>
          </div>
          <div className="ml-11">
            <p className="text-gray-600 mb-3">Go to "APIs & Services" → "Credentials" and create OAuth 2.0 Client IDs.</p>
            <div className="space-y-2 mb-3">
              <p className="text-sm text-gray-600"><strong>Application type:</strong> Web application</p>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-600"><strong>Authorized JavaScript origins:</strong></p>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">{currentDomain}</code>
                <button
                  onClick={() => copyToClipboard(currentDomain, 3)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  {copiedStep === 3 ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <a
              href="https://console.cloud.google.com/apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Credentials
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Step 4 */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
              4
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Configure Environment Variables</h3>
          </div>
          <div className="ml-11">
            <p className="text-gray-600 mb-3">Create a <code className="bg-gray-100 px-1 rounded">.env</code> file in your project root and add your Google Client ID:</p>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-md font-mono text-sm mb-3">
              <div className="flex items-center justify-between">
                <span>VITE_GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com</span>
                <button
                  onClick={() => copyToClipboard('VITE_GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com', 4)}
                  className="p-1 text-gray-400 hover:text-gray-200"
                >
                  {copiedStep === 4 ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                <p className="text-sm text-yellow-800">
                  Replace <code>your_client_id_here</code> with your actual Google Client ID from step 3.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
              5
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Restart Development Server</h3>
          </div>
          <div className="ml-11">
            <p className="text-gray-600 mb-3">After adding the environment variable, restart your development server:</p>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-md font-mono text-sm mb-3">
              <div className="flex items-center justify-between">
                <span>npm run dev</span>
                <button
                  onClick={() => copyToClipboard('npm run dev', 5)}
                  className="p-1 text-gray-400 hover:text-gray-200"
                >
                  {copiedStep === 5 ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
          <p className="text-sm text-green-800">
            Once configured, users will be able to sign in with their actual Google accounts!
          </p>
        </div>
      </div>
    </div>
  );
}