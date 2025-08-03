import React, { useState, useEffect } from 'react';
import { 
  User,
  Settings,
  Bell,
  Search,
  TrendingUp,
  DollarSign,
  Eye,
  Heart,
  MessageCircle,
  Calendar,
  Star,
  Plus,
  Instagram,
  Youtube,
  Twitter,
  ExternalLink,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Camera,
  Edit3,
  LogOut
} from 'lucide-react';
import { formatNumber, formatCurrency, formatDate } from '../utils/formatters';
import type { InfluencerProfile, SocialMediaAccount } from '../types';
import { mockPayments, mockPaymentMethods, mockEarningsStats } from '../data/mockData';
import clsx from 'clsx';

interface InfluencerDashboardProps {
  user: any;
  onLogout: () => void;
}

const platformIcons = {
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  tiktok: Heart
};

const mockCampaignOffers = [
  {
    id: '1',
    brandName: 'EcoBeauty Co.',
    campaignTitle: 'Sustainable Summer Collection',
    budget: 2500,
    deliverables: ['2 Instagram Posts', '4 Stories'],
    deadline: '2024-02-15',
    status: 'pending',
    description: 'Promote our new eco-friendly summer skincare line with authentic lifestyle content.'
  },
  {
    id: '2',
    brandName: 'FitLife App',
    campaignTitle: 'New Year Fitness Challenge',
    budget: 1800,
    deliverables: ['1 YouTube Video', '3 Instagram Reels'],
    deadline: '2024-02-20',
    status: 'pending',
    description: 'Create motivational fitness content showcasing our new workout tracking features.'
  }
];

export default function InfluencerDashboard({ user, onLogout }: InfluencerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState<Partial<InfluencerProfile>>({
    personalInfo: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: '',
      location: '',
      bio: '',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    socialAccounts: [],
    categories: [],
    languages: ['English'],
    rates: {
      post: 0,
      story: 0,
      reel: 0,
      video: 0
    },
    portfolio: [],
    availability: 'available',
    verified: false,
    rating: 0,
    completedCampaigns: 0
  });
  const [isUpdatingAnalytics, setIsUpdatingAnalytics] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);

  const connectSocialAccount = (platform: string) => {
    setIsUpdatingAnalytics(true);
    
    // Simulate OAuth flow and API integration
    setTimeout(() => {
      const mockData = {
        instagram: { followers: 45000, engagementRate: 6.2, averageViews: 38000 },
        youtube: { followers: 12000, engagementRate: 8.1, averageViews: 15000 },
        tiktok: { followers: 89000, engagementRate: 9.3, averageViews: 75000 },
        twitter: { followers: 8500, engagementRate: 4.7, averageViews: 6200 }
      };

      const newAccount: SocialMediaAccount = {
        platform: platform as any,
        username: `@${user.firstName?.toLowerCase() || 'creator'}_${platform}`,
        connected: true,
        followers: mockData[platform as keyof typeof mockData]?.followers || 0,
        engagementRate: mockData[platform as keyof typeof mockData]?.engagementRate || 0,
        averageViews: mockData[platform as keyof typeof mockData]?.averageViews || 0,
        lastUpdated: new Date().toISOString()
      };

      setProfile(prev => ({
        ...prev,
        socialAccounts: [...(prev.socialAccounts || []), newAccount]
      }));
      
      setIsUpdatingAnalytics(false);
    }, 2000);
  };

  const refreshAnalytics = () => {
    setIsUpdatingAnalytics(true);
    
    // Simulate API refresh
    setTimeout(() => {
      setProfile(prev => ({
        ...prev,
        socialAccounts: prev.socialAccounts?.map(account => ({
          ...account,
          followers: account.followers + Math.floor(Math.random() * 1000),
          engagementRate: Math.max(1, account.engagementRate + (Math.random() - 0.5) * 0.5),
          lastUpdated: new Date().toISOString()
        }))
      }));
      setIsUpdatingAnalytics(false);
    }, 1500);
  };

  const totalFollowers = profile.socialAccounts?.reduce((sum, account) => sum + account.followers, 0) || 0;
  const avgEngagement = profile.socialAccounts?.length 
    ? profile.socialAccounts.reduce((sum, account) => sum + account.engagementRate, 0) / profile.socialAccounts.length 
    : 0;

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Followers</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(totalFollowers)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Engagement</p>
              <p className="text-2xl font-bold text-gray-900">{avgEngagement.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Earnings (30d)</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockEarningsStats.thisMonthEarnings)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rating</p>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Offers */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">New Campaign Offers</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {mockCampaignOffers.map((offer) => (
            <div key={offer.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="text-lg font-medium text-gray-900">{offer.campaignTitle}</h4>
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {formatCurrency(offer.budget)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">by {offer.brandName}</p>
                  <p className="text-sm text-gray-700 mb-4">{offer.description}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>📋 {offer.deliverables.join(', ')}</span>
                    <span>📅 Due {formatDate(offer.deadline)}</span>
                  </div>
                </div>
                <div className="ml-6 flex space-x-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Decline
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                    Accept
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={profile.personalInfo?.firstName || ''}
              onChange={(e) => setProfile(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo!, firstName: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={profile.personalInfo?.lastName || ''}
              onChange={(e) => setProfile(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo!, lastName: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={profile.personalInfo?.email || ''}
              onChange={(e) => setProfile(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo!, email: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={profile.personalInfo?.phone || ''}
              onChange={(e) => setProfile(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo!, phone: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={profile.personalInfo?.location || ''}
              onChange={(e) => setProfile(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo!, location: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="City, State/Country"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={profile.personalInfo?.bio || ''}
              onChange={(e) => setProfile(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo!, bio: e.target.value }
              }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell brands about yourself, your content style, and what makes you unique..."
            />
          </div>
        </div>
      </div>

      {/* Social Media Accounts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Social Media Accounts</h3>
          <button
            onClick={refreshAnalytics}
            disabled={isUpdatingAnalytics}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className={clsx('w-4 h-4 mr-2', isUpdatingAnalytics && 'animate-spin')} />
            Refresh Analytics
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {['instagram', 'youtube', 'tiktok', 'twitter'].map((platform) => {
            const Icon = platformIcons[platform as keyof typeof platformIcons];
            const account = profile.socialAccounts?.find(acc => acc.platform === platform);
            
            return (
              <div key={platform} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Icon className="w-6 h-6 text-gray-600 mr-2" />
                    <span className="font-medium text-gray-900 capitalize">{platform}</span>
                  </div>
                  {account ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <button
                      onClick={() => connectSocialAccount(platform)}
                      disabled={isUpdatingAnalytics}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                      Connect
                    </button>
                  )}
                </div>
                
                {account ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">@{account.username}</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-gray-500">Followers</p>
                        <p className="font-medium">{formatNumber(account.followers)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Engagement</p>
                        <p className="font-medium">{account.engagementRate.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Avg Views</p>
                        <p className="font-medium">{formatNumber(account.averageViews)}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">
                      Updated {new Date(account.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Connect to show analytics</p>
                )}
              </div>
            );
          })}
        </div>

        {profile.socialAccounts && profile.socialAccounts.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
              <p className="text-sm text-blue-700">
                Your analytics are automatically updated every 24 hours. Last update: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Content Rates */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Content Rates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { key: 'post', label: 'Instagram Post', icon: '📷' },
            { key: 'story', label: 'Instagram Story', icon: '📱' },
            { key: 'reel', label: 'Reel/TikTok', icon: '🎥' },
            { key: 'video', label: 'YouTube Video', icon: '📺' }
          ].map((item) => (
            <div key={item.key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {item.icon} {item.label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={profile.rates?.[item.key as keyof typeof profile.rates] || ''}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    rates: { ...prev.rates!, [item.key]: parseInt(e.target.value) || 0 }
                  }))}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">
          Save Profile
        </button>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockEarningsStats.totalEarnings)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockEarningsStats.pendingPayments)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockEarningsStats.thisMonthEarnings)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Payment</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockEarningsStats.averagePayment)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
          <button
            onClick={() => setShowAddPaymentMethod(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Method
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    {method.type === 'bank_account' && <DollarSign className="w-5 h-5 text-gray-600" />}
                    {method.type === 'paypal' && <Globe className="w-5 h-5 text-blue-600" />}
                    {method.type === 'stripe' && <DollarSign className="w-5 h-5 text-purple-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{method.name}</p>
                    <p className="text-sm text-gray-500">{method.details}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {method.isDefault && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Default
                    </span>
                  )}
                  {method.isVerified ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                  )}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Added {formatDate(method.addedAt)}</span>
                <span>{method.isVerified ? 'Verified' : 'Pending Verification'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Payment History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{payment.campaignName}</div>
                      <div className="text-sm text-gray-500">{payment.brandName}</div>
                      <div className="text-xs text-gray-400">{payment.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(payment.amount)}</div>
                    {payment.taxInfo && (
                      <div className="text-xs text-gray-500">
                        Net: {formatCurrency(payment.taxInfo.netAmount)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      payment.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      payment.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    )}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(payment.dueDate)}
                    {payment.paidDate && (
                      <div className="text-xs text-gray-500">
                        Paid: {formatDate(payment.paidDate)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.paymentMethod}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-medium text-blue-900">Tax Information</h4>
        </div>
        <div className="space-y-2 text-sm text-blue-800">
          <p>• All payments are subject to applicable taxes based on your location</p>
          <p>• Tax documents (1099-NEC) will be provided for earnings over $600/year</p>
          <p>• You're responsible for reporting all income to tax authorities</p>
          <p>• Consider consulting a tax professional for advice on creator income</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Creator Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src={profile.personalInfo?.avatar}
                  alt="Profile"
                />
                <span className="text-sm font-medium text-gray-900">
                  {profile.personalInfo?.firstName} {profile.personalInfo?.lastName}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: TrendingUp },
              { id: 'profile', name: 'Profile', icon: User },
              { id: 'payments', name: 'Payments', icon: DollarSign },
              { id: 'campaigns', name: 'Campaigns', icon: Calendar },
              { id: 'analytics', name: 'Analytics', icon: Eye }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'payments' && renderPayments()}
        {activeTab === 'campaigns' && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Campaign Management</h3>
            <p className="text-gray-500">Track your active campaigns and submissions here.</p>
          </div>
        )}
        {activeTab === 'analytics' && (
          <div className="text-center py-12">
            <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Detailed Analytics</h3>
            <p className="text-gray-500">View comprehensive performance metrics and insights.</p>
          </div>
        )}

        {/* Add Payment Method Modal */}
        {showAddPaymentMethod && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowAddPaymentMethod(false)} />
              
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Add Payment Method</h3>
                    <p className="mt-1 text-sm text-gray-500">Choose how you'd like to receive payments</p>
                  </div>
                  <button
                    onClick={() => setShowAddPaymentMethod(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <button className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <DollarSign className="w-8 h-8 text-gray-600 mr-4" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Bank Account</div>
                      <div className="text-sm text-gray-500">Direct deposit to your bank account</div>
                    </div>
                  </button>

                  <button className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Globe className="w-8 h-8 text-blue-600 mr-4" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">PayPal</div>
                      <div className="text-sm text-gray-500">Receive payments via PayPal</div>
                    </div>
                  </button>

                  <button className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <DollarSign className="w-8 h-8 text-purple-600 mr-4" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Stripe</div>
                      <div className="text-sm text-gray-500">Fast and secure payments</div>
                    </div>
                  </button>

                  <button className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Globe className="w-8 h-8 text-green-600 mr-4" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Wise (formerly TransferWise)</div>
                      <div className="text-sm text-gray-500">International payments with low fees</div>
                    </div>
                  </button>
                </div>

                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                    <p className="text-sm text-yellow-800">
                      Payment methods require verification before they can be used. This process typically takes 1-3 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}