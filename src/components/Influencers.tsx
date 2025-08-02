import React, { useState } from 'react';
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
  Phone
} from 'lucide-react';
import { formatNumber, formatCurrency, getStatusColor } from '../utils/formatters';
import { mockInfluencers } from '../data/mockData';
import type { Influencer } from '../types';
import clsx from 'clsx';

const platformIcons = {
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  tiktok: Heart
};

export default function Influencers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredInfluencers = mockInfluencers.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || influencer.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || influencer.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(mockInfluencers.map(i => i.category))];

  const getPlatformIcon = (platform: string) => {
    const Icon = platformIcons[platform as keyof typeof platformIcons] || Heart;
    return Icon;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Influencers</h1>
          <p className="mt-2 text-sm text-gray-600">
            Discover and manage your network of content creators and influencers.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <div className="flex rounded-md shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={clsx(
                'px-3 py-2 text-sm font-medium border border-r-0 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500',
                viewMode === 'grid' 
                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                  : 'bg-white text-gray-500 border-gray-300 hover:text-gray-700'
              )}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={clsx(
                'px-3 py-2 text-sm font-medium border rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-500',
                viewMode === 'list' 
                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                  : 'bg-white text-gray-500 border-gray-300 hover:text-gray-700'
              )}
            >
              List
            </button>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            <Plus size={16} className="mr-2" />
            Add Influencer
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search influencers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="inactive">Inactive</option>
          </select>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <Filter size={16} className="mr-1" />
            More Filters
          </button>
        </div>
      </div>

      {/* Influencers Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredInfluencers.map((influencer) => {
            const PlatformIcon = getPlatformIcon(influencer.platform);
            return (
              <div key={influencer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedInfluencer(influencer)}>
                <div className="p-6">
                  {/* Profile Header */}
                  <div className="flex items-center mb-4">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={influencer.avatar}
                      alt={influencer.name}
                    />
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
                    <span className={clsx(
                      'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                      getStatusColor(influencer.status)
                    )}>
                      {influencer.status}
                    </span>
                  </div>

                  {/* Platform & Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <PlatformIcon size={16} className="mr-1" />
                      {influencer.platform}
                    </div>
                    <div className="text-sm text-gray-500">
                      {influencer.category}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        {formatNumber(influencer.followers)}
                      </div>
                      <div className="text-xs text-gray-500">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        {influencer.engagementRate}%
                      </div>
                      <div className="text-xs text-gray-500">Engagement</div>
                    </div>
                  </div>

                  {/* Location & Rating */}
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-2" />
                      {influencer.location}
                    </div>
                    <div className="flex items-center">
                      <Star size={14} className="mr-2" />
                      {influencer.rating} rating • {influencer.completedCampaigns} campaigns
                    </div>
                  </div>

                  {/* Rates */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Starting from</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatCurrency(Math.min(influencer.rates.post, influencer.rates.story, influencer.rates.reel))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Influencer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Platform
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Followers
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Engagement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInfluencers.map((influencer) => {
                  const PlatformIcon = getPlatformIcon(influencer.platform);
                  return (
                    <tr key={influencer.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedInfluencer(influencer)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img className="h-10 w-10 rounded-full" src={influencer.avatar} alt={influencer.name} />
                          <div className="ml-4">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">{influencer.name}</div>
                              {influencer.verified && (
                                <Star size={14} className="ml-1 text-blue-500 fill-current" />
                              )}
                            </div>
                            <div className="text-sm text-gray-500">{influencer.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <PlatformIcon size={16} className="mr-2" />
                          {influencer.platform}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatNumber(influencer.followers)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {influencer.engagementRate}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star size={14} className="text-yellow-400 fill-current mr-1" />
                          <span className="text-sm text-gray-900">{influencer.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        From {formatCurrency(Math.min(influencer.rates.post, influencer.rates.story, influencer.rates.reel))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={clsx(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          getStatusColor(influencer.status)
                        )}>
                          {influencer.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredInfluencers.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No influencers found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Start building your influencer network by adding creators.'
            }
          </p>
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
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Collaboration History</h4>
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
                        <span className="text-sm text-gray-600">Current Status</span>
                        <span className={clsx(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          getStatusColor(selectedInfluencer.status)
                        )}>
                          {selectedInfluencer.status}
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
                <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Add to Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}