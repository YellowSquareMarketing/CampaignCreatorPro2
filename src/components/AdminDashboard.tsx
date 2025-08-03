import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Users,
  Activity,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Eye,
  Shield,
  Server,
  Database,
  Clock,
  Globe,
  LogOut,
  RefreshCw,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { formatNumber, formatCurrency } from '../utils/formatters';
import {
  mockUserAnalytics,
  mockSystemMetrics,
  mockActivityLogs,
  mockErrorLogs,
  mockPerformanceMetrics,
  generateRealtimeMetrics
} from '../data/adminData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import clsx from 'clsx';

interface AdminDashboardProps {
  adminUser: any;
  onLogout: () => void;
}

export default function AdminDashboard({ adminUser, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [realtimeMetrics, setRealtimeMetrics] = useState(generateRealtimeMetrics());
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeMetrics(generateRealtimeMetrics());
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'users', name: 'User Analytics', icon: Users },
    { id: 'system', name: 'System Metrics', icon: Server },
    { id: 'activity', name: 'Activity Logs', icon: Activity },
    { id: 'errors', name: 'Error Logs', icon: AlertTriangle },
    { id: 'performance', name: 'Performance', icon: TrendingUp }
  ];

  const userGrowthData = [
    { month: 'Jan', marketers: 320, influencers: 680, total: 1000 },
    { month: 'Feb', marketers: 450, influencers: 920, total: 1370 },
    { month: 'Mar', marketers: 580, influencers: 1240, total: 1820 },
    { month: 'Apr', marketers: 720, influencers: 1580, total: 2300 },
    { month: 'May', marketers: 890, influencers: 1920, total: 2810 },
    { month: 'Jun', marketers: 1050, influencers: 2340, total: 3390 }
  ];

  const platformData = [
    { name: 'Instagram', value: mockSystemMetrics.platformDistribution.instagram, color: '#E4405F' },
    { name: 'YouTube', value: mockSystemMetrics.platformDistribution.youtube, color: '#FF0000' },
    { name: 'TikTok', value: mockSystemMetrics.platformDistribution.tiktok, color: '#000000' },
    { name: 'Twitter', value: mockSystemMetrics.platformDistribution.twitter, color: '#1DA1F2' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(mockUserAnalytics.totalUsers)}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp size={14} className="mr-1" />
                +{mockUserAnalytics.newUsersThisMonth} this month
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(realtimeMetrics.activeUsers)}</p>
              <p className="text-sm text-gray-500 mt-1">
                {((realtimeMetrics.activeUsers / mockUserAnalytics.totalUsers) * 100).toFixed(1)}% of total
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockSystemMetrics.totalRevenue)}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp size={14} className="mr-1" />
                {formatCurrency(mockSystemMetrics.monthlyRevenue)} this month
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Uptime</p>
              <p className="text-2xl font-bold text-gray-900">{mockPerformanceMetrics.uptime}%</p>
              <p className="text-sm text-green-600 mt-1">
                Excellent performance
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Server className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userGrowthData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Area type="monotone" dataKey="total" stroke="#3B82F6" fillOpacity={1} fill="url(#colorTotal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Platform Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {platformData.map((platform) => (
              <div key={platform.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: platform.color }}
                />
                <span className="text-sm text-gray-600">{platform.name}: {platform.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Status */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Real-time System Status</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={14} className="mr-1" />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{realtimeMetrics.activeConnections}</div>
            <div className="text-sm text-blue-600">Active Connections</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{realtimeMetrics.memoryUsage.toFixed(1)}%</div>
            <div className="text-sm text-green-600">Memory Usage</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{realtimeMetrics.cpuUsage.toFixed(1)}%</div>
            <div className="text-sm text-yellow-600">CPU Usage</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{realtimeMetrics.apiResponseTime.toFixed(2)}s</div>
            <div className="text-sm text-purple-600">API Response</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{(mockPerformanceMetrics.errorRate * 100).toFixed(2)}%</div>
            <div className="text-sm text-red-600">Error Rate</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-sm font-medium text-gray-600 mb-2">User Distribution</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Marketers</span>
              <span className="text-sm font-medium">{formatNumber(mockUserAnalytics.usersByType.marketers)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Influencers</span>
              <span className="text-sm font-medium">{formatNumber(mockUserAnalytics.usersByType.influencers)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Registration Method</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Google OAuth</span>
              <span className="text-sm font-medium">{formatNumber(mockUserAnalytics.usersByPlatform.google)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Email/Password</span>
              <span className="text-sm font-medium">{formatNumber(mockUserAnalytics.usersByPlatform.email)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Retention & Engagement</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Retention Rate</span>
              <span className="text-sm font-medium">{mockUserAnalytics.retentionRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Session</span>
              <span className="text-sm font-medium">{Math.floor(mockUserAnalytics.averageSessionDuration / 60)}m</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth by Type</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Bar dataKey="marketers" stackId="users" fill="#3B82F6" name="Marketers" />
            <Bar dataKey="influencers" stackId="users" fill="#10B981" name="Influencers" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderActivityLogs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter size={14} className="mr-1" />
            Filter
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download size={14} className="mr-1" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockActivityLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{log.userEmail}</div>
                      <div className="text-sm text-gray-500">{log.userType}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{log.details}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderErrorLogs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Error Logs</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter size={14} className="mr-1" />
            Filter
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download size={14} className="mr-1" />
            Export
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {mockErrorLogs.map((error) => (
          <div key={error.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className={clsx(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-3',
                    error.level === 'error' ? 'bg-red-100 text-red-800' :
                    error.level === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  )}>
                    {error.level.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(error.timestamp).toLocaleString()}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">{error.message}</h4>
                <p className="text-sm text-gray-600 mb-2">URL: {error.url}</p>
                {error.stack && (
                  <details className="mt-2">
                    <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                      Stack Trace
                    </summary>
                    <pre className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded overflow-x-auto">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          </div>
        ))}
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
              <Shield className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Creator Campaign Pro</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">System Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{adminUser.name}</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {adminUser.role}
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
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
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
        {activeTab === 'users' && renderUserAnalytics()}
        {activeTab === 'system' && (
          <div className="text-center py-12">
            <Server className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">System Metrics</h3>
            <p className="text-gray-500">Detailed system performance and resource usage metrics.</p>
          </div>
        )}
        {activeTab === 'activity' && renderActivityLogs()}
        {activeTab === 'errors' && renderErrorLogs()}
        {activeTab === 'performance' && (
          <div className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Performance Monitoring</h3>
            <p className="text-gray-500">Real-time performance metrics and optimization insights.</p>
          </div>
        )}
      </div>
    </div>
  );
}