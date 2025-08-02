import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Megaphone, 
  DollarSign,
  Eye,
  Heart,
  MousePointer,
  ShoppingCart
} from 'lucide-react';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/formatters';
import { mockCampaigns, mockInfluencers } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const stats = [
  {
    id: 1,
    name: 'Active Campaigns',
    value: '12',
    change: '+2.5%',
    changeType: 'positive',
    icon: Megaphone,
  },
  {
    id: 2,
    name: 'Total Influencers',
    value: '248',
    change: '+12.3%',
    changeType: 'positive',
    icon: Users,
  },
  {
    id: 3,
    name: 'Monthly Spend',
    value: formatCurrency(89500),
    change: '-5.2%',
    changeType: 'negative',
    icon: DollarSign,
  },
  {
    id: 4,
    name: 'Average ROAS',
    value: '4.2x',
    change: '+8.1%',
    changeType: 'positive',
    icon: TrendingUp,
  },
];

const performanceData = [
  { month: 'Jan', reach: 2100000, engagement: 180000, conversions: 1200 },
  { month: 'Feb', reach: 2400000, engagement: 210000, conversions: 1450 },
  { month: 'Mar', reach: 2800000, engagement: 240000, conversions: 1680 },
  { month: 'Apr', reach: 3200000, engagement: 280000, conversions: 1920 },
  { month: 'May', reach: 3600000, engagement: 320000, conversions: 2250 },
  { month: 'Jun', reach: 4100000, engagement: 380000, conversions: 2680 },
];

const campaignTypeData = [
  { name: 'Brand Awareness', value: 45, color: '#3B82F6' },
  { name: 'Product Launch', value: 30, color: '#10B981' },
  { name: 'Sales Drive', value: 15, color: '#F59E0B' },
  { name: 'App Install', value: 10, color: '#8B5CF6' },
];

export default function Dashboard() {
  const activeCampaigns = mockCampaigns.filter(c => c.status === 'active');
  const totalReach = mockCampaigns.reduce((sum, c) => sum + c.metrics.reach, 0);
  const totalEngagement = mockCampaigns.reduce((sum, c) => sum + c.metrics.engagement, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Overview of your influencer marketing campaigns and performance metrics.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="reach" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="engagement" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Campaign Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={campaignTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {campaignTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {campaignTypeData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Campaigns */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Active Campaigns</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {activeCampaigns.slice(0, 4).map((campaign) => (
              <div key={campaign.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {campaign.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatNumber(campaign.metrics.reach)} reach • {formatNumber(campaign.metrics.engagement)} engagement
                    </p>
                  </div>
                  <div className="ml-4 flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {formatCurrency(campaign.spent)} of {formatCurrency(campaign.budget)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Influencers */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Top Performers</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {mockInfluencers
              .sort((a, b) => b.engagementRate - a.engagementRate)
              .slice(0, 4)
              .map((influencer) => (
                <div key={influencer.id} className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={influencer.avatar}
                      alt={influencer.name}
                    />
                    <div className="ml-4 flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {influencer.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatNumber(influencer.followers)} followers • {formatPercentage(influencer.engagementRate)} engagement
                      </p>
                    </div>
                    <div className="ml-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        ⭐ {influencer.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Key Performance Indicators</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(totalReach)}</div>
            <div className="text-sm text-gray-500">Total Reach</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Heart className="h-8 w-8 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(totalEngagement)}</div>
            <div className="text-sm text-gray-500">Total Engagement</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <MousePointer className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {formatNumber(mockCampaigns.reduce((sum, c) => sum + c.metrics.clicks, 0))}
            </div>
            <div className="text-sm text-gray-500">Total Clicks</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <ShoppingCart className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {formatNumber(mockCampaigns.reduce((sum, c) => sum + c.metrics.conversions, 0))}
            </div>
            <div className="text-sm text-gray-500">Conversions</div>
          </div>
        </div>
      </div>
    </div>
  );
}