export interface AdminUser {
  id: string;
  email: string;
  role: 'developer' | 'manager' | 'admin';
  name: string;
  createdAt: string;
  lastLogin: string;
  permissions: string[];
}

export interface UserAnalytics {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  usersByType: {
    marketers: number;
    influencers: number;
  };
  usersByPlatform: {
    google: number;
    email: number;
  };
  retentionRate: number;
  averageSessionDuration: number;
}

export interface SystemMetrics {
  totalCampaigns: number;
  activeCampaigns: number;
  totalInfluencers: number;
  verifiedInfluencers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  averageCampaignBudget: number;
  platformDistribution: {
    instagram: number;
    youtube: number;
    tiktok: number;
    twitter: number;
  };
  topPerformingCategories: Array<{
    category: string;
    count: number;
    revenue: number;
  }>;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userEmail: string;
  userType: 'marketer' | 'influencer';
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

export interface ErrorLog {
  id: string;
  timestamp: string;
  level: 'error' | 'warning' | 'info';
  message: string;
  stack?: string;
  userId?: string;
  userAgent?: string;
  url: string;
}

export interface PerformanceMetrics {
  pageLoadTime: number;
  apiResponseTime: number;
  errorRate: number;
  uptime: number;
  activeConnections: number;
  memoryUsage: number;
  cpuUsage: number;
}