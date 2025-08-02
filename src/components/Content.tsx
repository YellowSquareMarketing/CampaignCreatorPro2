import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye,
  Heart,
  MessageCircle,
  Share,
  Play,
  Image,
  Video,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { formatNumber, formatDate, getStatusColor } from '../utils/formatters';
import { mockContent, mockInfluencers, mockCampaigns } from '../data/mockData';
import type { Content } from '../types';
import clsx from 'clsx';

const contentTypeIcons = {
  post: Image,
  story: FileText,
  reel: Video,
  video: Play
};

export default function ContentLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  const filteredContent = mockContent.filter(content => {
    const influencer = mockInfluencers.find(i => i.id === content.influencerId);
    const campaign = mockCampaigns.find(c => c.id === content.campaignId);
    
    const matchesSearch = content.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || content.status === statusFilter;
    const matchesType = typeFilter === 'all' || content.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getInfluencer = (influencerId: string) => {
    return mockInfluencers.find(i => i.id === influencerId);
  };

  const getCampaign = (campaignId: string) => {
    return mockCampaigns.find(c => c.id === campaignId);
  };

  const getContentTypeIcon = (type: string) => {
    const Icon = contentTypeIcons[type as keyof typeof contentTypeIcons] || Image;
    return Icon;
  };

  // Mock content data for demonstration
  const extendedMockContent = [
    ...mockContent,
    {
      id: '3',
      campaignId: '1',
      influencerId: '3',
      type: 'reel' as const,
      status: 'pending' as const,
      url: 'https://instagram.com/reel/example3',
      caption: 'Summer vibes with the new collection! 🌊☀️ Perfect for those beach days #SummerStyle',
      metrics: {
        likes: 15000,
        comments: 890,
        shares: 450,
        views: 95000,
        saves: 1200
      },
      submittedAt: '2024-06-20',
      feedback: 'Great content! Please adjust the caption to include the discount code.'
    },
    {
      id: '4',
      campaignId: '2',
      influencerId: '4',
      type: 'video' as const,
      status: 'rejected' as const,
      url: 'https://youtube.com/watch/example4',
      caption: 'Testing out this new fitness app - here are my honest thoughts after 30 days',
      metrics: {
        likes: 8500,
        comments: 320,
        shares: 180,
        views: 45000,
        saves: 680
      },
      submittedAt: '2024-07-05',
      feedback: 'Content quality is great, but please include more specific app features as discussed in the brief.'
    },
    {
      id: '5',
      campaignId: '3',
      influencerId: '6',
      type: 'post' as const,
      status: 'published' as const,
      url: 'https://instagram.com/p/example5',
      caption: 'Sustainable beauty is the future 🌱 Love how this brand is making a difference #EcoBeauty #Sustainable',
      metrics: {
        likes: 6200,
        comments: 240,
        shares: 120,
        views: 28000,
        saves: 850
      },
      submittedAt: '2024-04-15',
      publishedAt: '2024-04-16'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Content Library</h1>
        <p className="mt-2 text-sm text-gray-600">
          Review, approve, and track performance of influencer-generated content.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-semibold text-gray-900">
                  {extendedMockContent.filter(c => c.status === 'published').length}
                </div>
                <div className="text-sm font-medium text-gray-500">Published</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-semibold text-gray-900">
                  {extendedMockContent.filter(c => c.status === 'pending').length}
                </div>
                <div className="text-sm font-medium text-gray-500">Pending Review</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-semibold text-gray-900">
                  {formatNumber(extendedMockContent.reduce((sum, c) => sum + c.metrics.likes, 0))}
                </div>
                <div className="text-sm font-medium text-gray-500">Total Likes</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-semibold text-gray-900">
                  {formatNumber(extendedMockContent.reduce((sum, c) => sum + c.metrics.views, 0))}
                </div>
                <div className="text-sm font-medium text-gray-500">Total Views</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="published">Published</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="block px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="post">Posts</option>
            <option value="story">Stories</option>
            <option value="reel">Reels</option>
            <option value="video">Videos</option>
          </select>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <Filter size={16} className="mr-1" />
            More Filters
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {extendedMockContent.map((content) => {
          const influencer = getInfluencer(content.influencerId);
          const campaign = getCampaign(content.campaignId);
          const ContentIcon = getContentTypeIcon(content.type);
          
          return (
            <div key={content.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Content Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <ContentIcon size={20} className="text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {content.type}
                    </span>
                  </div>
                  <span className={clsx(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getStatusColor(content.status)
                  )}>
                    {content.status}
                  </span>
                </div>

                {/* Influencer & Campaign */}
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={influencer?.avatar}
                      alt={influencer?.name}
                    />
                    <div className="ml-2">
                      <p className="text-sm font-medium text-gray-900">{influencer?.name}</p>
                      <p className="text-xs text-gray-500">{campaign?.name}</p>
                    </div>
                  </div>
                </div>

                {/* Caption Preview */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-3">{content.caption}</p>
                </div>

                {/* Metrics */}
                {content.status === 'published' && (
                  <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="flex items-center justify-center text-red-500 mb-1">
                        <Heart size={16} />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {formatNumber(content.metrics.likes)}
                      </div>
                      <div className="text-xs text-gray-500">Likes</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="flex items-center justify-center text-blue-500 mb-1">
                        <Eye size={16} />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {formatNumber(content.metrics.views)}
                      </div>
                      <div className="text-xs text-gray-500">Views</div>
                    </div>
                  </div>
                )}

                {/* Engagement Metrics for Published Content */}
                {content.status === 'published' && (
                  <div className="flex justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <MessageCircle size={12} className="mr-1" />
                      {formatNumber(content.metrics.comments)}
                    </div>
                    <div className="flex items-center">
                      <Share size={12} className="mr-1" />
                      {formatNumber(content.metrics.shares)}
                    </div>
                    <div>Saves: {formatNumber(content.metrics.saves)}</div>
                  </div>
                )}

                {/* Submission Date */}
                <div className="text-xs text-gray-500 mb-4">
                  Submitted: {formatDate(content.submittedAt)}
                  {content.publishedAt && (
                    <span className="block">Published: {formatDate(content.publishedAt)}</span>
                  )}
                </div>

                {/* Feedback for Rejected Content */}
                {content.status === 'rejected' && content.feedback && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                    <p className="text-xs text-red-700">{content.feedback}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedContent(content)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <Eye size={14} className="mr-1" />
                    Review
                  </button>
                  {content.url && (
                    <button className="px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                      <ExternalLink size={14} />
                    </button>
                  )}
                </div>

                {/* Pending Actions */}
                {content.status === 'pending' && (
                  <div className="flex space-x-2 mt-2">
                    <button className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                      <CheckCircle size={14} className="mr-1" />
                      Approve
                    </button>
                    <button className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                      <XCircle size={14} className="mr-1" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {extendedMockContent.length === 0 && (
        <div className="text-center py-12">
          <Image size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
          <p className="text-gray-500">
            Content will appear here once influencers start submitting their work.
          </p>
        </div>
      )}

      {/* Content Detail Modal */}
      {selectedContent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedContent(null)} />
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Content Review
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {getInfluencer(selectedContent.influencerId)?.name} • {getCampaign(selectedContent.campaignId)?.name}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedContent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Content Details */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Content Details</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Type</span>
                      <span className="text-sm font-medium text-gray-900 capitalize">{selectedContent.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <span className={clsx(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getStatusColor(selectedContent.status)
                      )}>
                        {selectedContent.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Submitted</span>
                      <span className="text-sm font-medium text-gray-900">{formatDate(selectedContent.submittedAt)}</span>
                    </div>
                    {selectedContent.publishedAt && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Published</span>
                        <span className="text-sm font-medium text-gray-900">{formatDate(selectedContent.publishedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Caption */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Caption</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{selectedContent.caption}</p>
                  </div>
                </div>

                {/* Performance Metrics */}
                {selectedContent.status === 'published' && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Performance Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-50 p-4 rounded-lg text-center">
                        <Heart className="mx-auto text-red-500 mb-2" size={20} />
                        <div className="text-lg font-semibold text-red-600">{formatNumber(selectedContent.metrics.likes)}</div>
                        <div className="text-sm text-red-600">Likes</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <Eye className="mx-auto text-blue-500 mb-2" size={20} />
                        <div className="text-lg font-semibold text-blue-600">{formatNumber(selectedContent.metrics.views)}</div>
                        <div className="text-sm text-blue-600">Views</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <MessageCircle className="mx-auto text-green-500 mb-2" size={20} />
                        <div className="text-lg font-semibold text-green-600">{formatNumber(selectedContent.metrics.comments)}</div>
                        <div className="text-sm text-green-600">Comments</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <Share className="mx-auto text-purple-500 mb-2" size={20} />
                        <div className="text-lg font-semibold text-purple-600">{formatNumber(selectedContent.metrics.shares)}</div>
                        <div className="text-sm text-purple-600">Shares</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Feedback */}
                {selectedContent.feedback && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Feedback</h4>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-700">{selectedContent.feedback}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedContent(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Close
                </button>
                {selectedContent.url && (
                  <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    View Original
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}