import { Campaign, Influencer, Content, Analytics } from '../types';

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Fashion Collection Launch',
    description: 'Showcase our new summer collection with lifestyle and product-focused content',
    status: 'active',
    budget: 50000,
    spent: 32500,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    objectives: ['Brand Awareness', 'Product Launch', 'Sales Conversion'],
    targetAudience: {
      ageRange: '18-35',
      demographics: ['Fashion Enthusiasts', 'Young Professionals'],
      interests: ['Fashion', 'Lifestyle', 'Shopping']
    },
    deliverables: [
      { type: 'Instagram Posts', count: 12, requirements: 'High-quality product shots with lifestyle elements' },
      { type: 'Instagram Stories', count: 24, requirements: 'Behind-the-scenes content and product try-ons' },
      { type: 'Reels', count: 6, requirements: 'Trending audio with product showcase' }
    ],
    metrics: {
      reach: 2800000,
      impressions: 4200000,
      engagement: 350000,
      clicks: 45000,
      conversions: 2250
    },
    influencers: ['1', '2', '3'],
    createdAt: '2024-05-15'
  },
  {
    id: '2',
    name: 'Fitness App Beta Launch',
    description: 'Generate buzz and sign-ups for our new fitness tracking app',
    status: 'active',
    budget: 75000,
    spent: 28900,
    startDate: '2024-07-01',
    endDate: '2024-09-30',
    objectives: ['App Downloads', 'User Acquisition', 'Brand Awareness'],
    targetAudience: {
      ageRange: '22-45',
      demographics: ['Fitness Enthusiasts', 'Health-Conscious'],
      interests: ['Fitness', 'Health', 'Technology']
    },
    deliverables: [
      { type: 'YouTube Videos', count: 8, requirements: 'App demonstration and workout tutorials' },
      { type: 'Instagram Posts', count: 16, requirements: 'Workout results and app screenshots' },
      { type: 'TikTok Videos', count: 20, requirements: 'Quick workout tips using the app' }
    ],
    metrics: {
      reach: 1900000,
      impressions: 3100000,
      engagement: 280000,
      clicks: 38000,
      conversions: 4500
    },
    influencers: ['2', '4', '5'],
    createdAt: '2024-06-20'
  },
  {
    id: '3',
    name: 'Sustainable Beauty Brand Awareness',
    description: 'Educate audience about sustainable beauty practices and our eco-friendly products',
    status: 'completed',
    budget: 30000,
    spent: 29800,
    startDate: '2024-04-01',
    endDate: '2024-05-31',
    objectives: ['Brand Awareness', 'Education', 'Community Building'],
    targetAudience: {
      ageRange: '25-40',
      demographics: ['Eco-Conscious Consumers', 'Beauty Enthusiasts'],
      interests: ['Sustainability', 'Beauty', 'Environment']
    },
    deliverables: [
      { type: 'Instagram Posts', count: 10, requirements: 'Educational content about sustainable beauty' },
      { type: 'Blog Posts', count: 4, requirements: 'In-depth sustainability guides' }
    ],
    metrics: {
      reach: 850000,
      impressions: 1200000,
      engagement: 95000,
      clicks: 12000,
      conversions: 480
    },
    influencers: ['1', '6'],
    createdAt: '2024-03-15'
  }
];

export const mockInfluencers: Influencer[] = [
  {
    id: '1',
    name: 'Emma Rodriguez',
    username: '@emma_style',
    email: 'emma@email.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    verified: true,
    platform: 'instagram',
    category: 'Fashion & Lifestyle',
    followers: 245000,
    engagementRate: 4.2,
    averageViews: 180000,
    location: 'Los Angeles, CA',
    languages: ['English', 'Spanish'],
    rates: {
      post: 2500,
      story: 800,
      reel: 3200
    },
    metrics: {
      totalPosts: 1250,
      totalReach: 12500000,
      totalEngagement: 2100000
    },
    campaigns: ['1', '3'],
    status: 'available',
    rating: 4.8,
    completedCampaigns: 24
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    username: '@fit_marcus',
    email: 'marcus@email.com',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    verified: true,
    platform: 'youtube',
    category: 'Fitness & Health',
    followers: 890000,
    engagementRate: 6.8,
    averageViews: 450000,
    location: 'Miami, FL',
    languages: ['English'],
    rates: {
      post: 5500,
      story: 1200,
      reel: 4800
    },
    metrics: {
      totalPosts: 340,
      totalReach: 45000000,
      totalEngagement: 8900000
    },
    campaigns: ['1', '2'],
    status: 'busy',
    rating: 4.9,
    completedCampaigns: 18
  },
  {
    id: '3',
    name: 'Sophia Chen',
    username: '@sophia_creates',
    email: 'sophia@email.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    verified: false,
    platform: 'tiktok',
    category: 'Creative & Arts',
    followers: 125000,
    engagementRate: 8.5,
    averageViews: 95000,
    location: 'New York, NY',
    languages: ['English', 'Mandarin'],
    rates: {
      post: 1800,
      story: 600,
      reel: 2200
    },
    metrics: {
      totalPosts: 680,
      totalReach: 8500000,
      totalEngagement: 1850000
    },
    campaigns: ['1'],
    status: 'available',
    rating: 4.6,
    completedCampaigns: 12
  },
  {
    id: '4',
    name: 'David Kim',
    username: '@tech_david',
    email: 'david@email.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    verified: true,
    platform: 'youtube',
    category: 'Technology',
    followers: 450000,
    engagementRate: 5.2,
    averageViews: 280000,
    location: 'Seattle, WA',
    languages: ['English', 'Korean'],
    rates: {
      post: 3800,
      story: 1000,
      reel: 3500
    },
    metrics: {
      totalPosts: 210,
      totalReach: 28000000,
      totalEngagement: 4200000
    },
    campaigns: ['2'],
    status: 'available',
    rating: 4.7,
    completedCampaigns: 15
  },
  {
    id: '5',
    name: 'Alex Thompson',
    username: '@alex_fitness',
    email: 'alex@email.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    verified: true,
    platform: 'instagram',
    category: 'Fitness & Health',
    followers: 320000,
    engagementRate: 5.8,
    averageViews: 200000,
    location: 'Austin, TX',
    languages: ['English'],
    rates: {
      post: 3200,
      story: 900,
      reel: 3800
    },
    metrics: {
      totalPosts: 890,
      totalReach: 18500000,
      totalEngagement: 3250000
    },
    campaigns: ['2'],
    status: 'available',
    rating: 4.8,
    completedCampaigns: 22
  },
  {
    id: '6',
    name: 'Luna Garcia',
    username: '@eco_luna',
    email: 'luna@email.com',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    verified: false,
    platform: 'instagram',
    category: 'Sustainability',
    followers: 85000,
    engagementRate: 7.2,
    averageViews: 65000,
    location: 'Portland, OR',
    languages: ['English', 'Spanish'],
    rates: {
      post: 1200,
      story: 400,
      reel: 1500
    },
    metrics: {
      totalPosts: 450,
      totalReach: 4200000,
      totalEngagement: 980000
    },
    campaigns: ['3'],
    status: 'available',
    rating: 4.9,
    completedCampaigns: 8
  }
];

export const mockContent: Content[] = [
  {
    id: '1',
    campaignId: '1',
    influencerId: '1',
    type: 'post',
    status: 'published',
    url: 'https://instagram.com/p/example1',
    caption: 'Loving this new summer collection! The perfect blend of comfort and style 🌞 #SummerFashion #OOTD',
    metrics: {
      likes: 8500,
      comments: 320,
      shares: 150,
      views: 45000,
      saves: 680
    },
    submittedAt: '2024-06-15',
    publishedAt: '2024-06-16'
  },
  {
    id: '2',
    campaignId: '2',
    influencerId: '2',
    type: 'video',
    status: 'approved',
    url: 'https://youtube.com/watch/example2',
    caption: 'This fitness app has completely transformed my workout routine! Check out these amazing features.',
    metrics: {
      likes: 12000,
      comments: 580,
      shares: 890,
      views: 125000,
      saves: 1200
    },
    submittedAt: '2024-07-10',
    publishedAt: '2024-07-12'
  }
];

export const mockAnalytics: Analytics[] = [
  {
    campaignId: '1',
    totalReach: 2800000,
    totalImpressions: 4200000,
    totalEngagement: 350000,
    totalClicks: 45000,
    totalConversions: 2250,
    roas: 4.2,
    cpm: 7.74,
    cpc: 0.72,
    engagementRate: 8.33,
    conversionRate: 5.0,
    topPerformingContent: ['1', '3', '5'],
    demographicBreakdown: {
      age: {
        '18-24': 35,
        '25-34': 45,
        '35-44': 20
      },
      gender: {
        'Female': 70,
        'Male': 28,
        'Other': 2
      },
      location: {
        'United States': 65,
        'Canada': 15,
        'United Kingdom': 10,
        'Other': 10
      }
    }
  }
];

// Mock social media API integration functions
export const mockSocialMediaAPI = {
  instagram: {
    authenticate: async (userId: string) => {
      // Simulate OAuth flow
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            accessToken: 'mock_instagram_token',
            username: 'demo_creator',
            followers: 45000,
            engagementRate: 6.2,
            averageViews: 38000
          });
        }, 1000);
      });
    },
    
    refreshAnalytics: async (accessToken: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            followers: 45000 + Math.floor(Math.random() * 1000),
            engagementRate: 6.2 + (Math.random() - 0.5) * 0.5,
            averageViews: 38000 + Math.floor(Math.random() * 5000),
            lastUpdated: new Date().toISOString()
          });
        }, 800);
      });
    }
  },
  
  youtube: {
    authenticate: async (userId: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            accessToken: 'mock_youtube_token',
            username: 'demo_creator_yt',
            followers: 12000,
            engagementRate: 8.1,
            averageViews: 15000
          });
        }, 1000);
      });
    },
    
    refreshAnalytics: async (accessToken: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            followers: 12000 + Math.floor(Math.random() * 500),
            engagementRate: 8.1 + (Math.random() - 0.5) * 0.3,
            averageViews: 15000 + Math.floor(Math.random() * 2000),
            lastUpdated: new Date().toISOString()
          });
        }, 800);
      });
    }
  },
  
  tiktok: {
    authenticate: async (userId: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            accessToken: 'mock_tiktok_token',
            username: 'demo_creator_tt',
            followers: 89000,
            engagementRate: 9.3,
            averageViews: 75000
          });
        }, 1000);
      });
    },
    
    refreshAnalytics: async (accessToken: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            followers: 89000 + Math.floor(Math.random() * 2000),
            engagementRate: 9.3 + (Math.random() - 0.5) * 0.4,
            averageViews: 75000 + Math.floor(Math.random() * 10000),
            lastUpdated: new Date().toISOString()
          });
        }, 800);
      });
    }
  },
  
  twitter: {
    authenticate: async (userId: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            accessToken: 'mock_twitter_token',
            username: 'demo_creator_tw',
            followers: 8500,
            engagementRate: 4.7,
            averageViews: 6200
          });
        }, 1000);
      });
    },
    
    refreshAnalytics: async (accessToken: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            followers: 8500 + Math.floor(Math.random() * 300),
            engagementRate: 4.7 + (Math.random() - 0.5) * 0.2,
            averageViews: 6200 + Math.floor(Math.random() * 800),
            lastUpdated: new Date().toISOString()
          });
        }, 800);
      });
    }
  }
};

// Mock payment data for creators
export const mockPaymentMethods = [
  {
    id: '1',
    type: 'bank_account' as const,
    name: 'Chase Bank Account',
    details: '****1234',
    isDefault: true,
    isVerified: true,
    addedAt: '2024-01-15'
  },
  {
    id: '2',
    type: 'paypal' as const,
    name: 'PayPal Account',
    details: 'creator@email.com',
    isDefault: false,
    isVerified: true,
    addedAt: '2024-02-01'
  }
];

export const mockPayments = [
  {
    id: '1',
    campaignId: '1',
    campaignName: 'Summer Fashion Collection Launch',
    brandName: 'StyleCo',
    amount: 2500,
    currency: 'USD',
    status: 'completed' as const,
    paymentMethod: 'Chase Bank Account',
    dueDate: '2024-01-15',
    paidDate: '2024-01-14',
    description: '2 Instagram Posts + 4 Stories',
    deliverables: ['Instagram Post #1', 'Instagram Post #2', '4 Instagram Stories'],
    taxInfo: {
      taxRate: 0.24,
      taxAmount: 600,
      netAmount: 1900
    }
  },
  {
    id: '2',
    campaignId: '2',
    campaignName: 'Fitness App Beta Launch',
    brandName: 'FitLife App',
    amount: 1800,
    currency: 'USD',
    status: 'pending' as const,
    paymentMethod: 'PayPal Account',
    dueDate: '2024-02-20',
    description: '1 YouTube Video + 3 Instagram Reels',
    deliverables: ['YouTube Review Video', 'Instagram Reel #1', 'Instagram Reel #2', 'Instagram Reel #3']
  },
  {
    id: '3',
    campaignId: '3',
    campaignName: 'Sustainable Beauty Brand Awareness',
    brandName: 'EcoBeauty Co.',
    amount: 1200,
    currency: 'USD',
    status: 'processing' as const,
    paymentMethod: 'Chase Bank Account',
    dueDate: '2024-02-10',
    description: '3 Instagram Posts + Blog Review',
    deliverables: ['Instagram Post #1', 'Instagram Post #2', 'Instagram Post #3', 'Blog Review']
  }
];

export const mockEarningsStats = {
  totalEarnings: 12450,
  pendingPayments: 3000,
  thisMonthEarnings: 4250,
  lastMonthEarnings: 3800,
  averagePayment: 2075,
  completedPayments: 6,
  paymentMethods: 2
};