import React, { useState } from 'react';
import { Building2, Users } from 'lucide-react';
import SetupInstructions from './SetupInstructions';
import InfluencerAuth from './InfluencerAuth';
import MarketerAuth from './MarketerAuth';
import Layout from './Layout';
import Dashboard from './Dashboard';
import Campaigns from './Campaigns';
import Influencers from './Influencers';
import InfluencerDiscovery from './InfluencerDiscovery';
import Content from './Content';
import Analytics from './Analytics';
import CreateCampaign from './CreateCampaign';
import InfluencerDashboard from './InfluencerDashboard';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { isGoogleConfigured } from '../config/google';

export default function AuthWrapper() {
  const [userType, setUserType] = useState<'marketer' | 'influencer' | null>(null);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [campaigns, setCampaigns] = useLocalStorage('campaigns', []);
  const [discoveredInfluencers, setDiscoveredInfluencers] = useLocalStorage('discoveredInfluencers', []);
  const [showSetupInstructions, setShowSetupInstructions] = useState(false);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setUserType(userData.type);
  };

  const handleLogout = () => {
    setUser(null);
    setUserType(null);
    setActiveTab('dashboard');
    setShowCreateCampaign(false);
  };

  const handleCreateCampaign = () => {
    setShowCreateCampaign(true);
  };

  const handleSaveCampaign = (campaign: any) => {
    setCampaigns([...campaigns, campaign]);
    setShowCreateCampaign(false);
    setActiveTab('campaigns');
  };

  const handleBackToCampaigns = () => {
    setShowCreateCampaign(false);
  };

  const handleAddInfluencer = (influencer: any) => {
    setDiscoveredInfluencers([...discoveredInfluencers, influencer]);
  };

  // Show setup instructions if requested
  if (showSetupInstructions) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => setShowSetupInstructions(false)}
            className="mb-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Login
          </button>
          <SetupInstructions />
        </div>
      </div>
    );
  }

  // Show user type selection if no user type is selected
  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to CampaignPro
            </h1>
            <p className="text-xl text-gray-600">
              Choose your portal to get started
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Marketer Portal */}
            <div 
              onClick={() => setUserType('marketer')}
              className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-200"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  For Marketers & Brands
                </h2>
                <p className="text-gray-600 mb-6">
                  Create campaigns, discover influencers, manage content, and track ROI with our comprehensive marketing platform.
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600 mb-8">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Campaign creation and management
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Influencer discovery and outreach
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Content approval workflows
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Advanced analytics and ROI tracking
                  </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors">
                  Enter Marketer Portal
                </button>
              </div>
            </div>

            {/* Influencer Portal */}
            <div 
              onClick={() => setUserType('influencer')}
              className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-200"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  For Creators & Influencers
                </h2>
                <p className="text-gray-600 mb-6">
                  Connect your social accounts, get discovered by brands, manage campaigns, and track your earnings all in one place.
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600 mb-8">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                    Social media account integration
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                    Automatic analytics updates
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                    Campaign opportunities
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                    Earnings and performance tracking
                  </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-colors">
                  Enter Creator Portal
                </button>
              </div>
            </div>
          </div>
          
          {/* Setup Instructions Link */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowSetupInstructions(true)}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Need help setting up Google OAuth? Click here for instructions
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show influencer auth if influencer type is selected but no user is logged in
  if (userType === 'influencer' && !user) {
    return (
      <InfluencerAuth 
        onLogin={handleLogin}
        onSwitchToMarketer={() => setUserType('marketer')}
      />
    );
  }

  // Show influencer dashboard if influencer is logged in
  if (userType === 'influencer' && user) {
    return (
      <InfluencerDashboard 
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  // Show marketer auth if marketer type is selected but no user is logged in
  if (userType === 'marketer' && !user) {
    return (
      <MarketerAuth 
        onLogin={handleLogin}
        onSwitchToInfluencer={() => setUserType('influencer')}
      />
    );
  }

  // Show marketer portal if marketer is logged in
  if (userType === 'marketer') {
    const renderContent = () => {
      if (showCreateCampaign) {
        return (
          <CreateCampaign 
            onBack={handleBackToCampaigns}
            onSave={handleSaveCampaign}
          />
        );
      }

      switch (activeTab) {
        case 'dashboard':
          return <Dashboard />;
        case 'campaigns':
          return <Campaigns onCreateCampaign={handleCreateCampaign} />;
        case 'influencers':
          return <Influencers />;
        case 'discovery':
          return <InfluencerDiscovery onAddInfluencer={handleAddInfluencer} />;
        case 'content':
          return <Content />;
        case 'analytics':
          return <Analytics />;
        default:
          return <Dashboard />;
      }
    };

    return (
      <Layout activeTab={activeTab} onTabChange={setActiveTab} user={user}>
        {renderContent()}
      </Layout>
    );
  }

  return null;
}