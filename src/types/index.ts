export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  objectives: string[];
  targetAudience: {
    ageRange: string;
    demographics: string[];
    interests: string[];
  };
  deliverables: {
    type: string;
    count: number;
    requirements: string;
  }[];
  metrics: {
    reach: number;
    impressions: number;
    engagement: number;
    clicks: number;
    conversions: number;
  };
  influencers: string[];
  createdAt: string;
}

export interface Influencer {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  verified: boolean;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'twitter';
  category: string;
  followers: number;
  engagementRate: number;
  averageViews: number;
  location: string;
  languages: string[];
  rates: {
    post: number;
    story: number;
    reel: number;
  };
  metrics: {
    totalPosts: number;
    totalReach: number;
    totalEngagement: number;
  };
  campaigns: string[];
  status: 'available' | 'busy' | 'inactive';
  rating: number;
  completedCampaigns: number;
}

export interface Content {
  id: string;
  campaignId: string;
  influencerId: string;
  type: 'post' | 'story' | 'reel' | 'video';
  status: 'pending' | 'approved' | 'rejected' | 'published';
  url: string;
  caption: string;
  metrics: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
    saves: number;
  };
  submittedAt: string;
  publishedAt?: string;
  feedback?: string;
}

export interface Analytics {
  campaignId: string;
  totalReach: number;
  totalImpressions: number;
  totalEngagement: number;
  totalClicks: number;
  totalConversions: number;
  roas: number;
  cpm: number;
  cpc: number;
  engagementRate: number;
  conversionRate: number;
  topPerformingContent: string[];
  demographicBreakdown: {
    age: { [key: string]: number };
    gender: { [key: string]: number };
    location: { [key: string]: number };
  };
}

export interface SocialMediaAccount {
  platform: 'instagram' | 'tiktok' | 'youtube' | 'twitter';
  username: string;
  connected: boolean;
  followers: number;
  engagementRate: number;
  averageViews: number;
  lastUpdated: string;
  accessToken?: string;
}

export interface InfluencerProfile {
  id: string;
  userId: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    avatar: string;
  };
  socialAccounts: SocialMediaAccount[];
  categories: string[];
  languages: string[];
  rates: {
    post: number;
    story: number;
    reel: number;
    video: number;
  };
  portfolio: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    platform: string;
    metrics: {
      likes: number;
      comments: number;
      shares: number;
      views: number;
    };
  }[];
  availability: 'available' | 'busy' | 'unavailable';
  verified: boolean;
  rating: number;
  completedCampaigns: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  type: 'marketer' | 'influencer';
  profile?: InfluencerProfile;
  createdAt: string;
}

export interface PaymentMethod {
  id: string;
  type: 'bank_account' | 'paypal' | 'stripe' | 'wise' | 'crypto';
  name: string;
  details: string;
  isDefault: boolean;
  isVerified: boolean;
  addedAt: string;
}

export interface Payment {
  id: string;
  campaignId: string;
  campaignName: string;
  brandName: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'disputed';
  paymentMethod: string;
  dueDate: string;
  paidDate?: string;
  description: string;
  deliverables: string[];
  taxInfo?: {
    taxRate: number;
    taxAmount: number;
    netAmount: number;
  };
}

export interface EarningsStats {
  totalEarnings: number;
  pendingPayments: number;
  thisMonthEarnings: number;
  lastMonthEarnings: number;
  averagePayment: number;
  completedPayments: number;
  paymentMethods: number;
}