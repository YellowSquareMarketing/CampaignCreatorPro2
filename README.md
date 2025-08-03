# Creator Campaign Pro - Influencer Marketing Platform

A comprehensive platform connecting brands with content creators for successful influencer marketing campaigns.

## Features

### For Marketers & Brands
- **Campaign Management**: Create, manage, and optimize influencer marketing campaigns
- **Influencer Discovery**: Find and connect with verified content creators
- **Content Approval**: Review and approve influencer-generated content
- **Analytics & ROI**: Track performance metrics and calculate return on investment
- **Real-time Dashboard**: Monitor campaign progress and key metrics

### For Creators & Influencers
- **Profile Creation**: Build professional profiles with portfolio showcase
- **Social Media Integration**: Connect Instagram, YouTube, TikTok, and Twitter accounts
- **Automatic Analytics**: Real-time follower count, engagement rate, and performance metrics
- **Campaign Opportunities**: Receive and manage brand collaboration offers
- **Earnings Tracking**: Monitor income and campaign performance

## Google OAuth Setup

To enable Google authentication, you need to configure Google OAuth credentials:

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one

### 2. Enable Google+ API
1. Navigate to "APIs & Services" → "Library"
2. Search for and enable the "Google+ API"

### 3. Create OAuth 2.0 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Add your domain to "Authorized JavaScript origins":
   - For development: `http://localhost:5173`
   - For production: `https://yourdomain.com`

### 4. Configure Environment Variables
Create a `.env` file in your project root:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

### 5. Restart Development Server
```bash
npm run dev
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Charts**: Recharts for analytics visualization
- **Icons**: Lucide React
- **Authentication**: Google OAuth 2.0
- **Build Tool**: Vite
- **Deployment**: Netlify
- **Admin Panel**: Built-in management dashboard

## Project Structure

```
src/
├── components/          # React components
│   ├── AuthWrapper.tsx     # Main authentication wrapper
│   ├── GoogleAuth.tsx      # Google OAuth component
│   ├── AdminAuth.tsx       # Admin authentication
│   ├── AdminDashboard.tsx  # Admin management panel
│   ├── Layout.tsx          # Main layout component
│   ├── Dashboard.tsx       # Marketer dashboard
│   ├── InfluencerDashboard.tsx  # Creator dashboard
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useGoogleAuth.ts    # Google OAuth hook
│   └── useLocalStorage.ts  # Local storage hook
├── config/             # Configuration files
│   └── google.ts          # Google OAuth config
├── data/               # Mock data and API functions
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Admin Panel Access

The application includes a comprehensive admin panel for developers and managers to monitor system performance and user analytics.

### Accessing the Admin Panel

1. **Local Development**: Navigate to `http://localhost:5173#admin`
2. **Production**: Navigate to your deployed URL with `#admin` (e.g., `https://yourdomain.com#admin`)

### Demo Admin Credentials

```
Email: admin@creatorcampaignpro.com
Password: admin123
Access Code: CCP2024
```

### Admin Features

- **User Analytics**: Track user growth, retention, and engagement metrics
- **System Metrics**: Monitor platform performance and resource usage
- **Activity Logs**: View real-time user actions and system events
- **Error Monitoring**: Track and analyze application errors
- **Performance Metrics**: Real-time system performance monitoring
- **Revenue Analytics**: Track platform revenue and campaign performance

### Security Features

- Multi-factor authentication (email + password + access code)
- Role-based access control
- Activity logging and monitoring
- Secure session management
- IP address tracking

## Environment Variables

```env
# Google OAuth (Required for Google sign-in)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.