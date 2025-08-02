import React, { useState } from 'react';
import { 
  ArrowLeft,
  Plus,
  X,
  Calendar,
  DollarSign,
  Target,
  Users,
  FileText,
  Settings
} from 'lucide-react';
import clsx from 'clsx';

interface CreateCampaignProps {
  onBack: () => void;
  onSave: (campaign: any) => void;
}

const campaignObjectives = [
  'Brand Awareness',
  'Product Launch',
  'Sales Conversion', 
  'App Downloads',
  'Lead Generation',
  'Event Promotion',
  'User-Generated Content',
  'Community Building'
];

const contentTypes = [
  { type: 'Instagram Posts', icon: '📷', description: 'Static image posts on Instagram feed' },
  { type: 'Instagram Stories', icon: '📱', description: '24-hour disappearing content' },
  { type: 'Instagram Reels', icon: '🎥', description: 'Short-form vertical videos' },
  { type: 'YouTube Videos', icon: '📺', description: 'Long-form video content' },
  { type: 'TikTok Videos', icon: '🎵', description: 'Short-form vertical videos' },
  { type: 'Blog Posts', icon: '✍️', description: 'Written content and articles' },
  { type: 'Podcast Mentions', icon: '🎧', description: 'Audio mentions and interviews' },
  { type: 'Twitter Posts', icon: '🐦', description: 'Social media posts and threads' }
];

const targetDemographics = [
  'Gen Z (18-24)',
  'Millennials (25-40)', 
  'Gen X (41-56)',
  'Parents',
  'Students',
  'Professionals',
  'Entrepreneurs',
  'Fitness Enthusiasts',
  'Fashion Lovers',
  'Tech Enthusiasts',
  'Gamers',
  'Travelers'
];

const interests = [
  'Fashion', 'Beauty', 'Fitness', 'Technology', 'Gaming', 'Travel', 
  'Food', 'Lifestyle', 'Business', 'Education', 'Health', 'Sports',
  'Entertainment', 'Art', 'Music', 'Photography', 'DIY', 'Parenting'
];

export default function CreateCampaign({ onBack, onSave }: CreateCampaignProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    objectives: [] as string[],
    budget: '',
    startDate: '',
    endDate: '',
    targetAudience: {
      ageRange: '',
      demographics: [] as string[],
      interests: [] as string[]
    },
    deliverables: [] as any[],
    requirements: ''
  });

  const steps = [
    { id: 1, name: 'Basic Info', icon: FileText },
    { id: 2, name: 'Objectives', icon: Target },
    { id: 3, name: 'Budget & Timeline', icon: Calendar },
    { id: 4, name: 'Target Audience', icon: Users },
    { id: 5, name: 'Deliverables', icon: Settings },
    { id: 6, name: 'Review', icon: FileText }
  ];

  const handleObjectiveToggle = (objective: string) => {
    const updatedObjectives = formData.objectives.includes(objective)
      ? formData.objectives.filter(o => o !== objective)
      : [...formData.objectives, objective];
    
    setFormData({ ...formData, objectives: updatedObjectives });
  };

  const handleDemographicToggle = (demographic: string) => {
    const updatedDemographics = formData.targetAudience.demographics.includes(demographic)
      ? formData.targetAudience.demographics.filter(d => d !== demographic)
      : [...formData.targetAudience.demographics, demographic];
    
    setFormData({
      ...formData,
      targetAudience: { ...formData.targetAudience, demographics: updatedDemographics }
    });
  };

  const handleInterestToggle = (interest: string) => {
    const updatedInterests = formData.targetAudience.interests.includes(interest)
      ? formData.targetAudience.interests.filter(i => i !== interest)
      : [...formData.targetAudience.interests, interest];
    
    setFormData({
      ...formData,
      targetAudience: { ...formData.targetAudience, interests: updatedInterests }
    });
  };

  const addDeliverable = (contentType: any) => {
    const newDeliverable = {
      type: contentType.type,
      count: 1,
      requirements: contentType.description
    };
    setFormData({
      ...formData,
      deliverables: [...formData.deliverables, newDeliverable]
    });
  };

  const updateDeliverable = (index: number, field: string, value: any) => {
    const updatedDeliverables = formData.deliverables.map((deliverable, i) =>
      i === index ? { ...deliverable, [field]: value } : deliverable
    );
    setFormData({ ...formData, deliverables: updatedDeliverables });
  };

  const removeDeliverable = (index: number) => {
    const updatedDeliverables = formData.deliverables.filter((_, i) => i !== index);
    setFormData({ ...formData, deliverables: updatedDeliverables });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.description;
      case 2:
        return formData.objectives.length > 0;
      case 3:
        return formData.budget && formData.startDate && formData.endDate;
      case 4:
        return formData.targetAudience.ageRange && 
               formData.targetAudience.demographics.length > 0 &&
               formData.targetAudience.interests.length > 0;
      case 5:
        return formData.deliverables.length > 0;
      default:
        return true;
    }
  };

  const handleSave = () => {
    const campaign = {
      id: Date.now().toString(),
      ...formData,
      status: 'draft',
      budget: parseInt(formData.budget),
      spent: 0,
      metrics: {
        reach: 0,
        impressions: 0,
        engagement: 0,
        clicks: 0,
        conversions: 0
      },
      influencers: [],
      createdAt: new Date().toISOString()
    };
    
    onSave(campaign);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Summer Collection Launch"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your campaign goals, key messages, and what you want to achieve..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Objectives</h3>
              <p className="text-sm text-gray-600 mb-4">
                Select the primary goals for this campaign. You can choose multiple objectives.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {campaignObjectives.map((objective) => (
                  <button
                    key={objective}
                    onClick={() => handleObjectiveToggle(objective)}
                    className={clsx(
                      'flex items-center p-3 border-2 rounded-lg text-left transition-colors',
                      formData.objectives.includes(objective)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    )}
                  >
                    <div className="flex-1">
                      <div className="font-medium">{objective}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Budget ($) *
              </label>
              <div className="relative">
                <DollarSign size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="50000"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Range *
              </label>
              <select
                value={formData.targetAudience.ageRange}
                onChange={(e) => setFormData({
                  ...formData,
                  targetAudience: { ...formData.targetAudience, ageRange: e.target.value }
                })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select age range</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="18-35">18-35</option>
                <option value="25-45">25-45</option>
                <option value="All Ages">All Ages</option>
              </select>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Target Demographics *</h4>
              <div className="grid grid-cols-3 gap-2">
                {targetDemographics.map((demographic) => (
                  <button
                    key={demographic}
                    onClick={() => handleDemographicToggle(demographic)}
                    className={clsx(
                      'px-3 py-2 text-sm border rounded-md transition-colors',
                      formData.targetAudience.demographics.includes(demographic)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    )}
                  >
                    {demographic}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Interests *</h4>
              <div className="grid grid-cols-4 gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => handleInterestToggle(interest)}
                    className={clsx(
                      'px-3 py-2 text-sm border rounded-md transition-colors',
                      formData.targetAudience.interests.includes(interest)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    )}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Content Deliverables</h3>
              <p className="text-sm text-gray-600 mb-4">
                Select the types of content you want influencers to create.
              </p>
              
              {formData.deliverables.length === 0 && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {contentTypes.map((contentType) => (
                    <button
                      key={contentType.type}
                      onClick={() => addDeliverable(contentType)}
                      className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-2xl mr-3">{contentType.icon}</span>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">{contentType.type}</div>
                        <div className="text-sm text-gray-500">{contentType.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {formData.deliverables.length > 0 && (
                <div className="space-y-4">
                  {formData.deliverables.map((deliverable, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{deliverable.type}</h4>
                        <button
                          onClick={() => removeDeliverable(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={deliverable.count}
                            onChange={(e) => updateDeliverable(index, 'count', parseInt(e.target.value))}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Requirements
                        </label>
                        <textarea
                          value={deliverable.requirements}
                          onChange={(e) => updateDeliverable(index, 'requirements', e.target.value)}
                          rows={2}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Specific requirements for this content type..."
                        />
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => {
                      const availableTypes = contentTypes.filter(
                        ct => !formData.deliverables.some(d => d.type === ct.type)
                      );
                      if (availableTypes.length > 0) {
                        addDeliverable(availableTypes[0]);
                      }
                    }}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Another Deliverable
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Review Campaign</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Campaign Overview</h4>
                <p className="text-sm text-gray-600"><strong>Name:</strong> {formData.name}</p>
                <p className="text-sm text-gray-600"><strong>Description:</strong> {formData.description}</p>
                <p className="text-sm text-gray-600"><strong>Budget:</strong> ${parseInt(formData.budget).toLocaleString()}</p>
                <p className="text-sm text-gray-600"><strong>Duration:</strong> {formData.startDate} to {formData.endDate}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Objectives</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.objectives.map((objective) => (
                    <span key={objective} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {objective}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Target Audience</h4>
                <p className="text-sm text-gray-600"><strong>Age Range:</strong> {formData.targetAudience.ageRange}</p>
                <p className="text-sm text-gray-600"><strong>Demographics:</strong> {formData.targetAudience.demographics.join(', ')}</p>
                <p className="text-sm text-gray-600"><strong>Interests:</strong> {formData.targetAudience.interests.join(', ')}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Deliverables</h4>
                <div className="space-y-2">
                  {formData.deliverables.map((deliverable, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      <strong>{deliverable.count}x {deliverable.type}</strong>
                      <p className="text-xs text-gray-500 ml-4">{deliverable.requirements}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Campaigns
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Create New Campaign</h1>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={clsx(
                  'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors',
                  isActive 
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : isCompleted
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-gray-300 bg-white text-gray-400'
                )}>
                  <Icon size={16} />
                </div>
                <div className="ml-3">
                  <div className={clsx(
                    'text-sm font-medium',
                    isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'
                  )}>
                    {step.name}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="ml-6 w-16 h-px bg-gray-300" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className={clsx(
              'px-6 py-2 border border-gray-300 rounded-md text-sm font-medium transition-colors',
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-50'
            )}
          >
            Previous
          </button>
          
          <div className="flex space-x-3">
            {currentStep === steps.length ? (
              <button
                onClick={handleSave}
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Campaign
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                disabled={!canProceed()}
                className={clsx(
                  'px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors',
                  canProceed()
                    ? 'text-white bg-blue-600 hover:bg-blue-700'
                    : 'text-gray-400 bg-gray-200 cursor-not-allowed'
                )}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}