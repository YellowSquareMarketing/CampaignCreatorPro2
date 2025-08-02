import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  MousePointer,
  ShoppingCart,
  DollarSign,
  Users,
  Calendar,
  Download
} from 'lucide-react';
import { formatNumber, formatCurrency, formatPercentage } from '../utils/formatters';
import { mockCampaigns, mockAnalytics } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const timeRanges = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: '1y', label: 'Last Year' }
];

const performanceData = [
  { date: 'Jan', reach: 1800000, engagement: 150000, conversions: 980, spend: 12000 },
  { date: 'Feb', reach: 2100000, engagement: 180000, conversions: 1250, spend: 15000 },
  { date: 'Mar', reach: 2400000, engagement: 210000, conversions: 1480, spend: 18000 },
  { date: 'Apr', reach: 2800000, engagement: 240000, conversions: 1720, spend: 22000 },
  { date: 'May', reach: 3200000, engagement: 280000, conversions: 2100, spend: 25000 },
  { date: 'Jun', reach: 3600000, engagement: 320000, conversions: 2450, spend: 28000 }
];

const channelData = [
  { name: 'Instagram', value: 45, color: '#E4405F', amount: 125000 },
  { name: 'TikTok', value: 25, color: '#000000', amount: 68000 },
  { name: 'YouTube', value: 20, color: '#FF0000', amount: 54000 },
  { name: 'Twitter', value: 10, color: '#1DA1F2', amount: 27000 }
];

const audienceData = [
  { age: '18-24', percentage: 28, male: 12, female: 16 },
  { age: '25-34', percentage: 42, male: 18, female: 24 },
  { age: '35-44', percentage: 22, male: 10, female: 12 },
  { age: '45+', percentage: 8, male: 4, female: 4 }
];

export default function Analytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('reach');

  const totalReach = mockCampaigns.reduce((sum, c) => sum + c.metrics.reach, 0);
  const totalEngagement = mockCampaigns.reduce((sum, c) => sum + c.metrics.engagement, 0);
  const totalClicks = mockCampaigns.reduce((sum, c) => sum + c.metrics.clicks, 0);
  const totalConversions = mockCampaigns.reduce((sum, c) => sum + c.metrics.conversions, 0);
  const totalSpend = mockCampaigns.reduce((sum, c) => sum + c.spent, 0);

  const roas = totalConversions > 0 ? (totalConversions * 50) / totalSpend : 0; // Assuming $50 average order value
  const engagementRate = totalReach > 0 ? (totalEngagement / totalReach) * 100 : 0;
  const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;
  const cpm = totalReach > 0 ? (totalSpend / totalReach) * 1000 : 0;

  const keyMetrics = [
    {
      name: 'Total Reach',
      value: formatNumber(totalReach),
      change: '+12.5%',
      trend: 'up',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Engagement Rate',
      value: formatPercentage(engagementRate),
      change: '+8.2%',
      trend: 'up',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      name: 'Click Rate',
      value: formatPercentage((totalClicks / totalReach) * 100),
      change: '+3.1%',
      trend: 'up',
      icon: MousePointer,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Conversion Rate',
      value: formatPercentage(conversionRate),
      change: '-2.4%',
      trend: 'down',
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      name: 'ROAS',
      value: `${roas.toFixed(1)}x`,
      change: '+15.7%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      name: 'CPM',
      value: formatCurrency(cpm),
      change: '-5.3%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reporting</h1>
          <p className="mt-2 text-sm text-gray-600">
            Track performance, ROI, and optimize your influencer marketing campaigns.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="block px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {keyMetrics.map((metric) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <div key={metric.name} className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 ${metric.bgColor} rounded-lg p-3`}>
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <div className="ml-4 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{metric.name}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{metric.value}</div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <TrendIcon size={16} className="mr-1" />
                          {metric.change}
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

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Performance Trends</h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="block px-3 py-1 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="reach">Reach</option>
              <option value="engagement">Engagement</option>
              <option value="conversions">Conversions</option>
              <option value="spend">Spend</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey={selectedMetric} 
                stroke="#3B82F6" 
                fillOpacity={1} 
                fill="url(#colorGradient)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Channel Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Channel Performance</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any, name: any, props: any) => [
                    `${value}% (${formatCurrency(props.payload.amount)})`, 
                    'Share'
                  ]}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {channelData.map((channel) => (
              <div key={channel.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: channel.color }}
                  />
                  <span className="text-sm text-gray-600">{channel.name}</span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {channel.value}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Performance Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Campaign Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reach
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ROAS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockCampaigns.slice(0, 5).map((campaign) => {
                const campaignROAS = campaign.metrics.conversions > 0 ? 
                  (campaign.metrics.conversions * 50) / campaign.spent : 0;
                
                return (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">
                        {campaign.status === 'active' ? 'Active' : 'Completed'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatNumber(campaign.metrics.reach)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatNumber(campaign.metrics.engagement)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatNumber(campaign.metrics.conversions)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(campaign.spent)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${
                        campaignROAS >= 3 ? 'text-green-600' : 
                        campaignROAS >= 2 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {campaignROAS.toFixed(1)}x
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audience Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Audience Demographics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={audienceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="age" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="male" stackId="gender" fill="#3B82F6" name="Male" />
              <Bar dataKey="female" stackId="gender" fill="#EC4899" name="Female" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Geographic Distribution</h3>
          <div className="space-y-4">
            {[
              { country: 'United States', percentage: 65, flag: '🇺🇸' },
              { country: 'Canada', percentage: 15, flag: '🇨🇦' },
              { country: 'United Kingdom', percentage: 10, flag: '🇬🇧' },
              { country: 'Australia', percentage: 5, flag: '🇦🇺' },
              { country: 'Others', percentage: 5, flag: '🌍' }
            ].map((location) => (
              <div key={location.country} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-lg mr-3">{location.flag}</span>
                  <span className="text-sm font-medium text-gray-900">{location.country}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${location.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{location.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROI Summary */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-sm p-8 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{formatCurrency(totalSpend)}</div>
            <div className="text-blue-100">Total Investment</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{formatNumber(totalReach)}</div>
            <div className="text-blue-100">Total Reach</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{formatNumber(totalConversions)}</div>
            <div className="text-blue-100">Total Conversions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{roas.toFixed(1)}x</div>
            <div className="text-blue-100">Average ROAS</div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-lg">
            Your influencer marketing campaigns have generated <strong>{formatCurrency(totalConversions * 50)}</strong> in revenue
            with an average return of <strong>${roas.toFixed(2)}</strong> for every dollar spent.
          </p>
        </div>
      </div>
    </div>
  );
}