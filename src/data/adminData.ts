import { UserAnalytics, SystemMetrics, ActivityLog, ErrorLog, PerformanceMetrics } from '../types/admin';

export const mockUserAnalytics: UserAnalytics = {
  totalUsers: 12847,
  activeUsers: 8932,
  newUsersToday: 127,
  newUsersThisWeek: 892,
  newUsersThisMonth: 3421,
  usersByType: {
    marketers: 4231,
    influencers: 8616
  },
  usersByPlatform: {
    google: 9834,
    email: 3013
  },
  retentionRate: 73.2,
  averageSessionDuration: 1847 // seconds
};

export const mockSystemMetrics: SystemMetrics = {
  totalCampaigns: 2847,
  activeCampaigns: 432,
  totalInfluencers: 8616,
  verifiedInfluencers: 3247,
  totalRevenue: 2847392,
  monthlyRevenue: 284739,
  averageCampaignBudget: 15420,
  platformDistribution: {
    instagram: 45,
    youtube: 25,
    tiktok: 20,
    twitter: 10
  },
  topPerformingCategories: [
    { category: 'Fashion & Lifestyle', count: 1247, revenue: 847392 },
    { category: 'Technology', count: 892, revenue: 634821 },
    { category: 'Fitness & Health', count: 743, revenue: 521847 },
    { category: 'Food & Cooking', count: 634, revenue: 423918 },
    { category: 'Travel & Adventure', count: 521, revenue: 347291 }
  ]
};

export const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    userId: 'user_123',
    userEmail: 'john@company.com',
    userType: 'marketer',
    action: 'Campaign Created',
    details: 'Created campaign "Summer Fashion Launch" with budget $25,000',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  {
    id: '2',
    userId: 'user_456',
    userEmail: 'emma@creator.com',
    userType: 'influencer',
    action: 'Profile Updated',
    details: 'Updated social media rates and portfolio',
    timestamp: new Date(Date.now() - 1000 * 60 * 32).toISOString(),
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  },
  {
    id: '3',
    userId: 'user_789',
    userEmail: 'sarah@brand.com',
    userType: 'marketer',
    action: 'Influencer Added',
    details: 'Added @fitness_guru to campaign network',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  {
    id: '4',
    userId: 'user_321',
    userEmail: 'mike@creator.com',
    userType: 'influencer',
    action: 'Campaign Accepted',
    details: 'Accepted campaign offer from EcoBeauty Co. ($2,500)',
    timestamp: new Date(Date.now() - 1000 * 60 * 67).toISOString(),
    ipAddress: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    id: '5',
    userId: 'user_654',
    userEmail: 'lisa@company.com',
    userType: 'marketer',
    action: 'Content Approved',
    details: 'Approved Instagram post for Summer Collection campaign',
    timestamp: new Date(Date.now() - 1000 * 60 * 89).toISOString(),
    ipAddress: '192.168.1.104',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  }
];

export const mockErrorLogs: ErrorLog[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 23).toISOString(),
    level: 'error',
    message: 'Failed to load user profile',
    stack: 'Error: Network request failed\n    at fetchUserProfile (profile.js:45)\n    at async loadProfile (dashboard.js:123)',
    userId: 'user_789',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    url: '/dashboard/profile'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 67).toISOString(),
    level: 'warning',
    message: 'Slow API response detected',
    details: 'Campaign analytics API took 5.2s to respond',
    url: '/api/campaigns/analytics'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 134).toISOString(),
    level: 'error',
    message: 'Google OAuth authentication failed',
    stack: 'Error: Invalid client configuration\n    at GoogleAuth.authenticate (auth.js:78)',
    url: '/auth/google'
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 1000 * 60 * 201).toISOString(),
    level: 'warning',
    message: 'High memory usage detected',
    details: 'Memory usage at 87% of available capacity',
    url: '/system/health'
  }
];

export const mockPerformanceMetrics: PerformanceMetrics = {
  pageLoadTime: 1.2, // seconds
  apiResponseTime: 0.3, // seconds
  errorRate: 0.02, // 2%
  uptime: 99.97, // percentage
  activeConnections: 1247,
  memoryUsage: 68.4, // percentage
  cpuUsage: 23.7 // percentage
};

// Mock real-time data updates
export const generateRealtimeMetrics = () => ({
  activeUsers: mockUserAnalytics.activeUsers + Math.floor(Math.random() * 100) - 50,
  activeConnections: mockPerformanceMetrics.activeConnections + Math.floor(Math.random() * 50) - 25,
  memoryUsage: Math.max(0, Math.min(100, mockPerformanceMetrics.memoryUsage + (Math.random() - 0.5) * 10)),
  cpuUsage: Math.max(0, Math.min(100, mockPerformanceMetrics.cpuUsage + (Math.random() - 0.5) * 20)),
  apiResponseTime: Math.max(0.1, mockPerformanceMetrics.apiResponseTime + (Math.random() - 0.5) * 0.2)
});