import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Eye,
  Edit,
  Play,
  Pause,
  Trash2,
  Calendar,
  DollarSign,
  Target,
  TrendingUp
} from 'lucide-react';
import { formatCurrency, formatNumber, formatDate, getStatusColor } from '../utils/formatters';
import { mockCampaigns } from '../data/mockData';
import type { Campaign } from '../types';
import clsx from 'clsx';

interface CampaignsProps {
  onCreateCampaign: () => void;
}

export default function Campaigns({ onCreateCampaign }: CampaignsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getProgressPercentage = (spent: number, budget: number) => {
    return Math.min((spent / budget) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and monitor your influencer marketing campaigns.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={onCreateCampaign}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Create Campaign
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
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
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <Filter size={16} className="mr-1" />
            Filter
          </button>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Campaign Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {campaign.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {campaign.description}
                  </p>
                </div>
                <div className="ml-4 flex items-center space-x-2">
                  <span className={clsx(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getStatusColor(campaign.status)
                  )}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>

              {/* Campaign Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-gray-900">
                    {formatNumber(campaign.metrics.reach)}
                  </div>
                  <div className="text-xs text-gray-500">Reach</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-gray-900">
                    {formatNumber(campaign.metrics.engagement)}
                  </div>
                  <div className="text-xs text-gray-500">Engagement</div>
                </div>
              </div>

              {/* Budget Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Budget Progress</span>
                  <span>{formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${getProgressPercentage(campaign.spent, campaign.budget)}%` }}
                  />
                </div>
              </div>

              {/* Campaign Details */}
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-2" />
                  {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                </div>
                <div className="flex items-center">
                  <Target size={14} className="mr-2" />
                  {campaign.objectives.slice(0, 2).join(', ')}
                  {campaign.objectives.length > 2 && ` +${campaign.objectives.length - 2} more`}
                </div>
                <div className="flex items-center">
                  <TrendingUp size={14} className="mr-2" />
                  {campaign.influencers.length} influencers
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedCampaign(campaign)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <Eye size={14} className="mr-1" />
                  View
                </button>
                <button className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  <Edit size={14} className="mr-1" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <Megaphone size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by creating your first campaign.'
            }
          </p>
          {(!searchTerm && statusFilter === 'all') && (
            <button
              onClick={onCreateCampaign}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Plus size={16} className="mr-2" />
              Create Your First Campaign
            </button>
          )}
        </div>
      )}

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedCampaign(null)} />
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {selectedCampaign.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {selectedCampaign.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Campaign Overview */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Campaign Details</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <span className={clsx(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          getStatusColor(selectedCampaign.status)
                        )}>
                          {selectedCampaign.status.charAt(0).toUpperCase() + selectedCampaign.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Budget</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedCampaign.budget)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Spent</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedCampaign.spent)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Duration</span>
                        <span className="text-sm font-medium text-gray-900">
                          {formatDate(selectedCampaign.startDate)} - {formatDate(selectedCampaign.endDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Objectives</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCampaign.objectives.map((objective) => (
                        <span key={objective} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {objective}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Target Audience</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div>
                        <span className="text-sm text-gray-600">Age Range: </span>
                        <span className="text-sm font-medium text-gray-900">{selectedCampaign.targetAudience.ageRange}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Demographics: </span>
                        <span className="text-sm font-medium text-gray-900">{selectedCampaign.targetAudience.demographics.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Interests: </span>
                        <span className="text-sm font-medium text-gray-900">{selectedCampaign.targetAudience.interests.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Performance Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">{formatNumber(selectedCampaign.metrics.reach)}</div>
                        <div className="text-sm text-blue-600">Reach</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">{formatNumber(selectedCampaign.metrics.impressions)}</div>
                        <div className="text-sm text-green-600">Impressions</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">{formatNumber(selectedCampaign.metrics.engagement)}</div>
                        <div className="text-sm text-purple-600">Engagement</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-orange-600">{formatNumber(selectedCampaign.metrics.conversions)}</div>
                        <div className="text-sm text-orange-600">Conversions</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Deliverables</h4>
                    <div className="space-y-3">
                      {selectedCampaign.deliverables.map((deliverable, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-900">{deliverable.type}</span>
                            <span className="text-sm text-gray-500">{deliverable.count} required</span>
                          </div>
                          <p className="text-xs text-gray-600">{deliverable.requirements}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Close
                </button>
                <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Edit Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}