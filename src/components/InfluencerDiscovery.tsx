import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Plus,
  Star,
  MapPin,
  Users,
  TrendingUp,
  Instagram,
  Youtube,
  Twitter,
  Heart,
  MessageCircle,
  ExternalLink,
  Mail,
  Phone,
  Zap,
  Globe,
  CheckCircle,
  UserPlus,
  Eye,
  Sparkles
} from 'lucide-react';
import { formatNumber, formatCurrency, getStatusColor } from '../utils/formatters';
import type { Influencer } from '../types';
import clsx from 'clsx';

const platformIcons = {
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  tiktok: Heart
};

// Extended mock data for discovery
const discoveryInfluencers: Influencer[] = [
  {
    id: 'disc_1',
    name: 'Maya Patel',
    username: '@maya_wellness',
    email: 'maya@email.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    verified: true,
    platform: 'instagram',
    category: 'Health & Wellness',
    followers: 180000,
    engagementRate: 6.2,
    averageViews: 145000,
    location: 'San Francisco, CA',
    languages: ['English', 'Hindi'],
    rates: {
      post: 2200,
      story: 750,
      reel: 2800
    },
    metrics: {
      totalPosts: 890,
      totalReach: 8900000,
      totalEngagement: 1650000
    },
    campaigns: [],
    status: 'available',
    rating: 4.7,
    completedCampaigns: 16
  },
  {
    id: 'disc_2',
    name: 'Jake Morrison',
    username: '@jake_adventures',
    email: 'jake@email.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    verified: false,
    platform: 'youtube',
    category: 'Travel & Adventure',
    followers: 95000,
    engagementRate: 8.1,
    averageViews: 78000,
    location: 'Denver, CO',
    languages: ['English'],
    rates: {
      post: 1500,
      story: 500,
      reel: 1800
    },
    metrics: {
      totalPosts: 340,
      totalReach: 4200000,
      totalEngagement: 890000
    },
    campaigns: [],
    status: 'available',
    rating: 4.5,
    completedCampaigns: 9
  },
  {
    id: 'disc_3',
    name: 'Zoe Chen',
    username: '@zoe_foodie',
    email: 'zoe@email.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    verified: true,
    platform: 'tiktok',
    category: 'Food & Cooking',
    followers: 320000,
    engagementRate: 9.3,
    averageViews: 280000,
    location: 'New York, NY',
    languages: ['English', 'Mandarin'],
    rates: {
      post: 2800,
      story: 900,
      reel: 3200
    },
    metrics: {
      totalPosts: 1200,
      totalReach: 15600000,
      totalEngagement: 3100000
    },
    campaigns: [],
    status: 'available',
    rating: 4.9,
    completedCampaigns: 28
  },
  {
    id: 'disc_4',
    name: 'Carlos Rodriguez',
    username: '@carlos_tech',
    email: 'carlos@email.com',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    verified: true,
    platform: 'youtube',
    category: 'Technology',
    followers: 450000,
    engagementRate: 5.8,
    averageViews: 380000,
    location: 'Austin, TX',
    languages: ['English', 'Spanish'],
    rates: {
      post: 4200,
      story: 1200,
      reel: 3800
    },
    metrics: {
      totalPosts: 280,
      totalReach: 28000000,
      totalEngagement: 4800000
    },
    campaigns: [],
    status: 'available',
    rating: 4.8,
    completedCampaigns: 22
  },
  {
    id: 'disc_5',
    name: 'Aria Johnson',
    username: '@aria_style',
    email: 'aria@email.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    verified: false,
    platform: 'instagram',
    category: 'Fashion & Style',
    followers: 125000,
    engagementRate: 7.4,
    averageViews: 98000,
    location: 'Los Angeles, CA',
    languages: ['English'],
    rates: {
      post: 1800,
      story: 600,
      reel: 2200
    },
    metrics: {
      totalPosts: 650,
      totalReach: 6800000,
      totalEngagement: 1200000
    },
    campaigns: [],
    status: 'available',
    rating: 4.6,
    completedCampaigns: 14
  },
  {
    id: 'disc_6',
    name: 'Ryan Kim',
    username: '@ryan_fitness',
    email: 'ryan@email.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    verified: true,
    platform: 'instagram',
    category: 'Fitness & Health',
    followers: 280000,
    engagementRate: 6.9,
    averageViews: 220000,
    location: 'Miami, FL',
    languages: ['English', 'Korean'],
    rates: {
      post: 3000,
      story: 950,
      reel: 3500
    },
    metrics: {
      totalPosts: 890,
      totalReach: 18200000,
      totalEngagement: 3400000
    },
    campaigns: [],
    status: 'available',
    rating: 4.8,
    completedCampaigns: 31
  }
];

interface InfluencerDiscoveryProps {
  onAddInfluencer?: (influencer: Influencer) => void;
}

export default function InfluencerDiscovery({ onAddInfluencer }: InfluencerDiscoveryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [followersRange, setFollowersRange] = useState('all');
  const [engagementRange, setEngagementRange] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [addedInfluencers, setAddedInfluencers] = useState<Set<string>>(new Set());

  // Simulate real-time search with debouncing
  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, categoryFilter, platformFilter, followersRange, engagementRange, locationFilter]);

  const filteredInfluencers = useMemo(() => {
    return discoveryInfluencers.filter(influencer => {
      const matchesSearch = !searchTerm || 
        influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || 
        influencer.category.toLowerCase().includes(categoryFilter.toLowerCase());

      const matchesPlatform = platformFilter === 'all' || 
        influencer.platform === platformFilter;

      const matchesFollowers = (() => {
        switch (followersRange) {
          case 'micro': return influencer.followers >= 10000 && influencer.followers <= 100000;
          case 'mid': return influencer.followers > 100000 && influencer.followers <= 500000;
          case 'macro': return influencer.followers > 500000;
          default: return true;
        }
      })();

      const matchesEngagement = (() => {
        switch (engagementRange) {
          case 'high': return influencer.engagementRate >= 7;
          case 'medium': return influencer.engagementRate >= 4 && influencer.engagementRate < 7;
          case 'low': return influencer.engagementRate < 4;
          default: return true;
        }
      })();

      const matchesLocation = locationFilter === 'all' || 
        influencer.location.toLowerCase().includes(locationFilter.toLowerCase());

      return matchesSearch && matchesCategory && matchesPlatform && 
             matchesFollowers && matchesEngagement && matchesLocation;
    });
  }, [searchTerm, categoryFilter, platformFilter, followersRange, engagementRange, locationFilter]);

  const categories = [...new Set(discoveryInfluencers.map(i => i.category))];
  const platforms = [...new Set(discoveryInfluencers.map(i => i.platform))];
  const locations = [...new Set(discoveryInfluencers.map(i => i.location.split(',')[1]?.trim() || i.location))];

  const getPlatformIcon = (platform: string) => {
    const Icon = platformIcons[platform as keyof typeof platformIcons] || Heart;
    return Icon;
  };

  const handleAddInfluencer = (influencer: Influencer) => {
    setAddedInfluencers(prev => new Set([...prev, influencer.id]));
    onAddInfluencer?.(influencer);
    
    // Show success feedback
    setTimeout(() => {
      setAddedInfluencers(prev => {
        const newSet = new Set(prev);
        newSet.delete(influencer.id);
        return newSet;
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center">
            <Sparkles className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Discover Influencers</h1>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Find and connect with new content creators and influencers in real-time.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex items-center text-sm text-gray-500">
            <Zap className="h-4 w-4 mr-1 text-green-500" />
            Live Search • {filteredInfluencers.length} creators found
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          {/* Main Search */}
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, username, category, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Platform</label>
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Platforms</option>
                {platforms.map(platform => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Followers</label>
              <select
                value={followersRange}
                onChange={(e) => setFollowersRange(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Sizes</option>
                <option value="micro">Micro (10K-100K)</option>
                <option value="mid">Mid-tier (100K-500K)</option>
                <option value="macro">Macro (500K+)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Engagement</label>
              <select
                value={engagementRange}
                onChange={(e) => setEngagementRange(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Rates</option>
                <option value="high">High (7%+)</option>
                <option value="medium">Medium (4-7%)</option>
                <option value="low">Low (&lt;4%)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                  setPlatformFilter('all');
                  setFollowersRange('all');
                  setEngagementRange('all');
                  setLocationFilter('all');
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredInfluencers.map((influencer) => {
          const PlatformIcon = getPlatformIcon(influencer.platform);
          const isAdded = addedInfluencers.has(influencer.id);
          
          return (
            <div key={influencer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
              <div className="p-6">
                {/* Profile Header */}
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={influencer.avatar}
                      alt={influencer.name}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                      <PlatformIcon size={12} className="text-gray-600" />
                    </div>
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {influencer.name}
                      </p>
                      {influencer.verified && (
                        <Star size={14} className="ml-1 text-blue-500 fill-current" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {influencer.username}
                    </p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {influencer.category}
                  </span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center bg-blue-50 p-3 rounded-lg">
                    <div className="text-lg font-semibold text-blue-600">
                      {formatNumber(influencer.followers)}
                    </div>
                    <div className="text-xs text-blue-600">Followers</div>
                  </div>
                  <div className="text-center bg-green-50 p-3 rounded-lg">
                    <div className="text-lg font-semibold text-green-600">
                      {influencer.engagementRate}%
                    </div>
                    <div className="text-xs text-green-600">Engagement</div>
                  </div>
                </div>

                {/* Location & Rating */}
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-2 text-gray-400" />
                    {influencer.location}
                  </div>
                  <div className="flex items-center">
                    <Star size={14} className="mr-2 text-yellow-400 fill-current" />
                    {influencer.rating} • {influencer.completedCampaigns} campaigns
                  </div>
                </div>

                {/* Rate Preview */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="text-xs text-gray-500 mb-1">Starting from</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(Math.min(influencer.rates.post, influencer.rates.story, influencer.rates.reel))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedInfluencer(influencer)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <Eye size={14} className="mr-1" />
                    View
                  </button>
                  <button
                    onClick={() => handleAddInfluencer(influencer)}
                    disabled={isAdded}
                    className={clsx(
                      'flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
                      isAdded
                        ? 'text-green-700 bg-green-100 cursor-not-allowed'
                        : 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                    )}
                  >
                    {isAdded ? (
                      <>
                        <CheckCircle size={14} className="mr-1" />
                        Added
                      </>
                    ) : (
                      <>
                        <UserPlus size={14} className="mr-1" />
                        Add
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredInfluencers.length === 0 && !isSearching && (
        <div className="text-center py-12">
          <Search size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No influencers found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search criteria or filters to find more creators.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
              setPlatformFilter('all');
              setFollowersRange('all');
              setEngagementRange('all');
              setLocationFilter('all');
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Loading State */}
      {isSearching && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Searching...</h3>
          <p className="text-gray-500">Finding the perfect creators for you</p>
        </div>
      )}

      {/* Influencer Detail Modal */}
      {selectedInfluencer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedInfluencer(null)} />
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={selectedInfluencer.avatar}
                    alt={selectedInfluencer.name}
                  />
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h3 className="text-xl font-medium text-gray-900">
                        {selectedInfluencer.name}
                      </h3>
                      {selectedInfluencer.verified && (
                        <Star size={18} className="ml-2 text-blue-500 fill-current" />
                      )}
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        New Discovery
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{selectedInfluencer.username}</p>
                    <div className="flex items-center mt-1">
                      {(() => {
                        const PlatformIcon = getPlatformIcon(selectedInfluencer.platform);
                        return <PlatformIcon size={16} className="mr-1 text-gray-400" />;
                      })()}
                      <span className="text-sm text-gray-600">{selectedInfluencer.platform}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-600">{selectedInfluencer.category}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedInfluencer(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Stats */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Audience & Performance</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-xl font-bold text-blue-600">{formatNumber(selectedInfluencer.followers)}</div>
                        <div className="text-sm text-blue-600">Followers</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-xl font-bold text-green-600">{selectedInfluencer.engagementRate}%</div>
                        <div className="text-sm text-green-600">Engagement</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div className="text-xl font-bold text-purple-600">{formatNumber(selectedInfluencer.averageViews)}</div>
                        <div className="text-sm text-purple-600">Avg Views</div>
                      </div>
                    </div>
                  </div>

                  {/* Rates */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Content Rates</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Post</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedInfluencer.rates.post)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Story</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedInfluencer.rates.story)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Reel/Video</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedInfluencer.rates.reel)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail size={14} className="mr-2" />
                        {selectedInfluencer.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={14} className="mr-2" />
                        {selectedInfluencer.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Performance History */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Performance History</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Posts</span>
                        <span className="text-sm font-medium text-gray-900">{formatNumber(selectedInfluencer.metrics.totalPosts)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Reach</span>
                        <span className="text-sm font-medium text-gray-900">{formatNumber(selectedInfluencer.metrics.totalReach)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Engagement</span>
                        <span className="text-sm font-medium text-gray-900">{formatNumber(selectedInfluencer.metrics.totalEngagement)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Collaboration History */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Track Record</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Completed Campaigns</span>
                        <span className="text-sm font-medium text-gray-900">{selectedInfluencer.completedCampaigns}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Success Rating</span>
                        <div className="flex items-center">
                          <Star size={14} className="text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium text-gray-900">{selectedInfluencer.rating}/5.0</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Availability</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Available
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedInfluencer.languages.map((language) => (
                        <span key={language} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedInfluencer(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Close
                </button>
                <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  <Mail size={14} className="mr-1" />
                  Contact
                </button>
                <button 
                  onClick={() => {
                    handleAddInfluencer(selectedInfluencer);
                    setSelectedInfluencer(null);
                  }}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <UserPlus size={14} className="mr-1" />
                  Add to Network
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}