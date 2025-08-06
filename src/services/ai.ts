// AI-Powered Matching and Analytics Service

interface AIMatchingCriteria {
  productCategory: string;
  targetAudience: string;
  campaignType: string;
  budget: string;
  brandValues: string[];
  contentStyle: string;
  location?: string;
  languages?: string[];
}

interface InfluencerProfile {
  id: string;
  demographics: any;
  contentStyle: string;
  engagement: number;
  audience: any;
  pastPerformance: any;
  brandAffinities: string[];
}

class AIService {
  private apiKey: string;
  private baseURL: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    this.baseURL = 'https://api.openai.com/v1';
  }

  // AI-Powered Influencer Matching
  async findMatches(criteria: AIMatchingCriteria): Promise<any[]> {
    try {
      // Call your backend AI matching service
      const response = await fetch('/api/ai/match-influencers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(criteria)
      });

      if (!response.ok) {
        throw new Error('AI matching service failed');
      }

      return response.json();
    } catch (error) {
      console.error('AI matching error:', error);
      // Fallback to rule-based matching
      return this.fallbackMatching(criteria);
    }
  }

  // Fallback rule-based matching when AI service is unavailable
  private async fallbackMatching(criteria: AIMatchingCriteria): Promise<any[]> {
    // Get all influencers from your database
    const response = await fetch('/api/influencers', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    
    const influencers = await response.json();
    
    // Apply rule-based scoring
    const scoredInfluencers = influencers.map((influencer: any) => ({
      ...influencer,
      matchScore: this.calculateMatchScore(influencer, criteria)
    }));

    // Sort by match score and return top matches
    return scoredInfluencers
      .sort((a: any, b: any) => b.matchScore - a.matchScore)
      .slice(0, 20)
      .filter((influencer: any) => influencer.matchScore >= 60);
  }

  private calculateMatchScore(influencer: any, criteria: AIMatchingCriteria): number {
    let score = 0;
    let maxScore = 0;

    // Category matching (30% weight)
    maxScore += 30;
    if (this.categoriesMatch(influencer.category, criteria.productCategory)) {
      score += 30;
    }

    // Engagement rate (25% weight)
    maxScore += 25;
    if (influencer.engagementRate >= 6) score += 25;
    else if (influencer.engagementRate >= 4) score += 20;
    else if (influencer.engagementRate >= 2) score += 15;

    // Follower count vs budget (20% weight)
    maxScore += 20;
    const budgetScore = this.calculateBudgetScore(influencer.followers, criteria.budget);
    score += budgetScore;

    // Brand values alignment (15% weight)
    maxScore += 15;
    const valuesScore = this.calculateValuesScore(influencer, criteria.brandValues);
    score += valuesScore;

    // Performance history (10% weight)
    maxScore += 10;
    if (influencer.rating >= 4.5) score += 10;
    else if (influencer.rating >= 4.0) score += 8;
    else if (influencer.rating >= 3.5) score += 6;

    return Math.round((score / maxScore) * 100);
  }

  private categoriesMatch(influencerCategory: string, productCategory: string): boolean {
    const categoryMappings: { [key: string]: string[] } = {
      'Fashion & Apparel': ['Fashion & Style', 'Fashion & Lifestyle'],
      'Beauty & Cosmetics': ['Beauty & Lifestyle', 'Health & Wellness'],
      'Technology & Electronics': ['Technology'],
      'Health & Wellness': ['Health & Wellness', 'Fitness & Health'],
      'Food & Beverage': ['Food & Cooking'],
      'Travel & Tourism': ['Travel & Adventure'],
      'Fitness & Sports': ['Fitness & Health']
    };

    const matchingCategories = categoryMappings[productCategory] || [];
    return matchingCategories.some(cat => influencerCategory.includes(cat));
  }

  private calculateBudgetScore(followers: number, budget: string): number {
    const budgetRanges: { [key: string]: [number, number] } = {
      'Under $5,000': [0, 50000],
      '$5,000 - $15,000': [50000, 200000],
      '$15,000 - $50,000': [200000, 500000],
      'Over $50,000': [500000, Infinity]
    };

    const [minFollowers, maxFollowers] = budgetRanges[budget] || [0, Infinity];
    
    if (followers >= minFollowers && followers <= maxFollowers) {
      return 20;
    } else if (Math.abs(followers - minFollowers) < 50000) {
      return 15;
    }
    
    return 10;
  }

  private calculateValuesScore(influencer: any, brandValues: string[]): number {
    if (!brandValues.length) return 15;
    
    // This would ideally analyze the influencer's content for brand value alignment
    // For now, return a base score
    return 12;
  }

  // Content Performance Prediction
  async predictPerformance(contentData: any): Promise<any> {
    try {
      const response = await fetch('/api/ai/predict-performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(contentData)
      });

      if (!response.ok) {
        throw new Error('Performance prediction failed');
      }

      return response.json();
    } catch (error) {
      console.error('Performance prediction error:', error);
      return this.fallbackPerformancePrediction(contentData);
    }
  }

  private fallbackPerformancePrediction(contentData: any): any {
    // Simple rule-based prediction
    const baseEngagement = contentData.influencer.averageEngagement || 1000;
    const multiplier = this.getContentTypeMultiplier(contentData.contentType);
    
    return {
      predictedLikes: Math.round(baseEngagement * multiplier * 0.8),
      predictedComments: Math.round(baseEngagement * multiplier * 0.1),
      predictedShares: Math.round(baseEngagement * multiplier * 0.05),
      predictedReach: Math.round(contentData.influencer.followers * 0.3),
      confidence: 0.75
    };
  }

  private getContentTypeMultiplier(contentType: string): number {
    const multipliers: { [key: string]: number } = {
      'reel': 1.5,
      'video': 1.3,
      'post': 1.0,
      'story': 0.8
    };
    
    return multipliers[contentType] || 1.0;
  }

  // Sentiment Analysis for Content
  async analyzeSentiment(text: string): Promise<any> {
    try {
      const response = await fetch('/api/ai/sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error('Sentiment analysis failed');
      }

      return response.json();
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      return {
        sentiment: 'neutral',
        confidence: 0.5,
        emotions: []
      };
    }
  }

  // Campaign Optimization Suggestions
  async getOptimizationSuggestions(campaignData: any): Promise<any> {
    try {
      const response = await fetch('/api/ai/optimize-campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(campaignData)
      });

      if (!response.ok) {
        throw new Error('Optimization suggestions failed');
      }

      return response.json();
    } catch (error) {
      console.error('Optimization error:', error);
      return this.fallbackOptimizationSuggestions(campaignData);
    }
  }

  private fallbackOptimizationSuggestions(campaignData: any): any {
    const suggestions = [];
    
    // Analyze performance and provide suggestions
    if (campaignData.engagementRate < 3) {
      suggestions.push({
        type: 'engagement',
        suggestion: 'Consider working with micro-influencers who typically have higher engagement rates',
        impact: 'high'
      });
    }
    
    if (campaignData.conversionRate < 2) {
      suggestions.push({
        type: 'conversion',
        suggestion: 'Add clear call-to-actions and discount codes to improve conversion rates',
        impact: 'medium'
      });
    }
    
    return {
      suggestions,
      overallScore: this.calculateCampaignScore(campaignData),
      recommendations: this.generateRecommendations(campaignData)
    };
  }

  private calculateCampaignScore(campaignData: any): number {
    // Simple scoring algorithm
    let score = 0;
    
    if (campaignData.engagementRate >= 5) score += 25;
    else if (campaignData.engagementRate >= 3) score += 20;
    else score += 10;
    
    if (campaignData.conversionRate >= 3) score += 25;
    else if (campaignData.conversionRate >= 2) score += 20;
    else score += 10;
    
    if (campaignData.roas >= 4) score += 25;
    else if (campaignData.roas >= 3) score += 20;
    else score += 10;
    
    score += 25; // Base score for other factors
    
    return Math.min(score, 100);
  }

  private generateRecommendations(campaignData: any): string[] {
    const recommendations = [];
    
    if (campaignData.budget > 50000) {
      recommendations.push('Consider diversifying across multiple influencer tiers');
    }
    
    if (campaignData.duration > 90) {
      recommendations.push('Long campaigns may benefit from mid-campaign optimization');
    }
    
    recommendations.push('Monitor performance weekly and adjust targeting as needed');
    
    return recommendations;
  }
}

export const aiService = new AIService();