// API Service Layer - Replace mock data with real backend calls

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// API Client with authentication
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: any) {
    return this.request<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async googleAuth(googleToken: string) {
    return this.request<{ token: string; user: any }>('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ token: googleToken }),
    });
  }

  // User endpoints
  async getProfile() {
    return this.request<any>('/users/profile');
  }

  async updateProfile(profileData: any) {
    return this.request<any>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Campaign endpoints
  async getCampaigns() {
    return this.request<any[]>('/campaigns');
  }

  async createCampaign(campaignData: any) {
    return this.request<any>('/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaignData),
    });
  }

  async updateCampaign(id: string, campaignData: any) {
    return this.request<any>(`/campaigns/${id}`, {
      method: 'PUT',
      body: JSON.stringify(campaignData),
    });
  }

  async deleteCampaign(id: string) {
    return this.request<void>(`/campaigns/${id}`, {
      method: 'DELETE',
    });
  }

  // Influencer endpoints
  async getInfluencers(filters?: any) {
    const queryParams = filters ? `?${new URLSearchParams(filters)}` : '';
    return this.request<any[]>(`/influencers${queryParams}`);
  }

  async searchInfluencers(searchParams: any) {
    return this.request<any[]>('/influencers/search', {
      method: 'POST',
      body: JSON.stringify(searchParams),
    });
  }

  async getInfluencerProfile(id: string) {
    return this.request<any>(`/influencers/${id}`);
  }

  // Content endpoints
  async getContent(campaignId?: string) {
    const queryParams = campaignId ? `?campaignId=${campaignId}` : '';
    return this.request<any[]>(`/content${queryParams}`);
  }

  async submitContent(contentData: any) {
    return this.request<any>('/content', {
      method: 'POST',
      body: JSON.stringify(contentData),
    });
  }

  async approveContent(contentId: string) {
    return this.request<any>(`/content/${contentId}/approve`, {
      method: 'POST',
    });
  }

  async rejectContent(contentId: string, feedback: string) {
    return this.request<any>(`/content/${contentId}/reject`, {
      method: 'POST',
      body: JSON.stringify({ feedback }),
    });
  }

  // Analytics endpoints
  async getCampaignAnalytics(campaignId: string) {
    return this.request<any>(`/analytics/campaigns/${campaignId}`);
  }

  async getInfluencerAnalytics(influencerId: string) {
    return this.request<any>(`/analytics/influencers/${influencerId}`);
  }

  // Payment endpoints
  async getPayments() {
    return this.request<any[]>('/payments');
  }

  async getPaymentMethods() {
    return this.request<any[]>('/payments/methods');
  }

  async addPaymentMethod(methodData: any) {
    return this.request<any>('/payments/methods', {
      method: 'POST',
      body: JSON.stringify(methodData),
    });
  }

  async processPayment(paymentData: any) {
    return this.request<any>('/payments/process', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // Social Media Integration endpoints
  async connectSocialAccount(platform: string, authData: any) {
    return this.request<any>(`/social/${platform}/connect`, {
      method: 'POST',
      body: JSON.stringify(authData),
    });
  }

  async refreshSocialAnalytics(platform: string) {
    return this.request<any>(`/social/${platform}/refresh`, {
      method: 'POST',
    });
  }

  // AI Matching endpoints
  async getAIMatches(criteria: any) {
    return this.request<any[]>('/ai/match', {
      method: 'POST',
      body: JSON.stringify(criteria),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);