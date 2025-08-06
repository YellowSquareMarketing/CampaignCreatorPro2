// Real Social Media API Integration

interface SocialMediaConfig {
  instagram: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  };
  youtube: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  };
  tiktok: {
    clientKey: string;
    clientSecret: string;
    redirectUri: string;
  };
  twitter: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  };
}

class SocialMediaService {
  private config: SocialMediaConfig;

  constructor(config: SocialMediaConfig) {
    this.config = config;
  }

  // Instagram Business API Integration
  async connectInstagram(userId: string): Promise<any> {
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${this.config.instagram.clientId}&redirect_uri=${this.config.instagram.redirectUri}&scope=user_profile,user_media&response_type=code`;
    
    // Open OAuth window
    window.open(authUrl, 'instagram-auth', 'width=600,height=600');
    
    // Listen for OAuth callback
    return new Promise((resolve, reject) => {
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'INSTAGRAM_AUTH_SUCCESS') {
          window.removeEventListener('message', handleMessage);
          resolve(event.data.data);
        } else if (event.data.type === 'INSTAGRAM_AUTH_ERROR') {
          window.removeEventListener('message', handleMessage);
          reject(new Error(event.data.error));
        }
      };
      
      window.addEventListener('message', handleMessage);
    });
  }

  async getInstagramAnalytics(accessToken: string): Promise<any> {
    const response = await fetch(`https://graph.instagram.com/me?fields=account_type,media_count,followers_count&access_token=${accessToken}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch Instagram analytics');
    }
    
    const data = await response.json();
    
    // Get recent media for engagement calculation
    const mediaResponse = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,like_count,comments_count,timestamp&limit=20&access_token=${accessToken}`);
    const mediaData = await mediaResponse.json();
    
    // Calculate engagement rate
    const totalEngagement = mediaData.data.reduce((sum: number, post: any) => 
      sum + (post.like_count || 0) + (post.comments_count || 0), 0
    );
    const avgEngagement = totalEngagement / mediaData.data.length;
    const engagementRate = (avgEngagement / data.followers_count) * 100;
    
    return {
      followers: data.followers_count,
      mediaCount: data.media_count,
      engagementRate: engagementRate.toFixed(2),
      recentPosts: mediaData.data,
      lastUpdated: new Date().toISOString()
    };
  }

  // YouTube API Integration
  async connectYouTube(userId: string): Promise<any> {
    const authUrl = `https://accounts.google.com/oauth2/auth?client_id=${this.config.youtube.clientId}&redirect_uri=${this.config.youtube.redirectUri}&scope=https://www.googleapis.com/auth/youtube.readonly&response_type=code`;
    
    window.open(authUrl, 'youtube-auth', 'width=600,height=600');
    
    return new Promise((resolve, reject) => {
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'YOUTUBE_AUTH_SUCCESS') {
          window.removeEventListener('message', handleMessage);
          resolve(event.data.data);
        } else if (event.data.type === 'YOUTUBE_AUTH_ERROR') {
          window.removeEventListener('message', handleMessage);
          reject(new Error(event.data.error));
        }
      };
      
      window.addEventListener('message', handleMessage);
    });
  }

  async getYouTubeAnalytics(accessToken: string): Promise<any> {
    // Get channel info
    const channelResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&mine=true&access_token=${accessToken}`);
    const channelData = await channelResponse.json();
    
    if (!channelData.items || channelData.items.length === 0) {
      throw new Error('No YouTube channel found');
    }
    
    const channel = channelData.items[0];
    const stats = channel.statistics;
    
    // Get recent videos for engagement calculation
    const videosResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=id&channelId=${channel.id}&maxResults=10&order=date&type=video&access_token=${accessToken}`);
    const videosData = await videosResponse.json();
    
    // Get video statistics
    const videoIds = videosData.items.map((item: any) => item.id.videoId).join(',');
    const videoStatsResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&access_token=${accessToken}`);
    const videoStatsData = await videoStatsResponse.json();
    
    // Calculate average views and engagement
    const totalViews = videoStatsData.items.reduce((sum: number, video: any) => 
      sum + parseInt(video.statistics.viewCount || 0), 0
    );
    const avgViews = totalViews / videoStatsData.items.length;
    
    const totalEngagement = videoStatsData.items.reduce((sum: number, video: any) => 
      sum + parseInt(video.statistics.likeCount || 0) + parseInt(video.statistics.commentCount || 0), 0
    );
    const avgEngagement = totalEngagement / videoStatsData.items.length;
    const engagementRate = (avgEngagement / avgViews) * 100;
    
    return {
      subscribers: parseInt(stats.subscriberCount),
      totalViews: parseInt(stats.viewCount),
      videoCount: parseInt(stats.videoCount),
      averageViews: Math.round(avgViews),
      engagementRate: engagementRate.toFixed(2),
      recentVideos: videoStatsData.items,
      lastUpdated: new Date().toISOString()
    };
  }

  // TikTok API Integration
  async connectTikTok(userId: string): Promise<any> {
    const authUrl = `https://www.tiktok.com/auth/authorize/?client_key=${this.config.tiktok.clientKey}&response_type=code&scope=user.info.basic,video.list&redirect_uri=${this.config.tiktok.redirectUri}`;
    
    window.open(authUrl, 'tiktok-auth', 'width=600,height=600');
    
    return new Promise((resolve, reject) => {
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'TIKTOK_AUTH_SUCCESS') {
          window.removeEventListener('message', handleMessage);
          resolve(event.data.data);
        } else if (event.data.type === 'TIKTOK_AUTH_ERROR') {
          window.removeEventListener('message', handleMessage);
          reject(new Error(event.data.error));
        }
      };
      
      window.addEventListener('message', handleMessage);
    });
  }

  async getTikTokAnalytics(accessToken: string): Promise<any> {
    // Get user info
    const userResponse = await fetch('https://open-api.tiktok.com/user/info/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    const userData = await userResponse.json();
    
    // Get video list
    const videosResponse = await fetch('https://open-api.tiktok.com/video/list/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        max_count: 20
      })
    });
    
    const videosData = await videosResponse.json();
    
    // Calculate engagement metrics
    const videos = videosData.data.videos || [];
    const totalViews = videos.reduce((sum: number, video: any) => sum + video.view_count, 0);
    const totalLikes = videos.reduce((sum: number, video: any) => sum + video.like_count, 0);
    const totalComments = videos.reduce((sum: number, video: any) => sum + video.comment_count, 0);
    const totalShares = videos.reduce((sum: number, video: any) => sum + video.share_count, 0);
    
    const avgViews = totalViews / videos.length;
    const avgEngagement = (totalLikes + totalComments + totalShares) / videos.length;
    const engagementRate = (avgEngagement / avgViews) * 100;
    
    return {
      followers: userData.data.follower_count,
      following: userData.data.following_count,
      likes: userData.data.likes_count,
      videoCount: videos.length,
      averageViews: Math.round(avgViews),
      engagementRate: engagementRate.toFixed(2),
      recentVideos: videos,
      lastUpdated: new Date().toISOString()
    };
  }

  // Twitter API Integration
  async connectTwitter(userId: string): Promise<any> {
    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${this.config.twitter.clientId}&redirect_uri=${this.config.twitter.redirectUri}&scope=tweet.read%20users.read%20follows.read&state=${userId}`;
    
    window.open(authUrl, 'twitter-auth', 'width=600,height=600');
    
    return new Promise((resolve, reject) => {
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'TWITTER_AUTH_SUCCESS') {
          window.removeEventListener('message', handleMessage);
          resolve(event.data.data);
        } else if (event.data.type === 'TWITTER_AUTH_ERROR') {
          window.removeEventListener('message', handleMessage);
          reject(new Error(event.data.error));
        }
      };
      
      window.addEventListener('message', handleMessage);
    });
  }

  async getTwitterAnalytics(accessToken: string): Promise<any> {
    // Get user info
    const userResponse = await fetch('https://api.twitter.com/2/users/me?user.fields=public_metrics', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const userData = await userResponse.json();
    const user = userData.data;
    
    // Get recent tweets
    const tweetsResponse = await fetch(`https://api.twitter.com/2/users/${user.id}/tweets?max_results=20&tweet.fields=public_metrics,created_at`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const tweetsData = await tweetsResponse.json();
    const tweets = tweetsData.data || [];
    
    // Calculate engagement metrics
    const totalImpressions = tweets.reduce((sum: number, tweet: any) => sum + tweet.public_metrics.impression_count, 0);
    const totalEngagement = tweets.reduce((sum: number, tweet: any) => 
      sum + tweet.public_metrics.like_count + tweet.public_metrics.retweet_count + tweet.public_metrics.reply_count, 0
    );
    
    const avgImpressions = totalImpressions / tweets.length;
    const avgEngagement = totalEngagement / tweets.length;
    const engagementRate = (avgEngagement / avgImpressions) * 100;
    
    return {
      followers: user.public_metrics.followers_count,
      following: user.public_metrics.following_count,
      tweetCount: user.public_metrics.tweet_count,
      averageImpressions: Math.round(avgImpressions),
      engagementRate: engagementRate.toFixed(2),
      recentTweets: tweets,
      lastUpdated: new Date().toISOString()
    };
  }
}

// Export configured service
export const socialMediaService = new SocialMediaService({
  instagram: {
    clientId: import.meta.env.VITE_INSTAGRAM_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_INSTAGRAM_CLIENT_SECRET || '',
    redirectUri: `${window.location.origin}/auth/instagram/callback`
  },
  youtube: {
    clientId: import.meta.env.VITE_YOUTUBE_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_YOUTUBE_CLIENT_SECRET || '',
    redirectUri: `${window.location.origin}/auth/youtube/callback`
  },
  tiktok: {
    clientKey: import.meta.env.VITE_TIKTOK_CLIENT_KEY || '',
    clientSecret: import.meta.env.VITE_TIKTOK_CLIENT_SECRET || '',
    redirectUri: `${window.location.origin}/auth/tiktok/callback`
  },
  twitter: {
    clientId: import.meta.env.VITE_TWITTER_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_TWITTER_CLIENT_SECRET || '',
    redirectUri: `${window.location.origin}/auth/twitter/callback`
  }
});