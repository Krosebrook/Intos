/**
 * INT OS v2.5 Production Deployment Configuration
 * 
 * This file contains all deployment settings for production environments.
 * Update these values before deploying to production.
 */

export const deployConfig = {
  // Environment
  environment: process.env.NODE_ENV || 'production',
  
  // API Configuration
  api: {
    baseUrl: process.env.VITE_API_URL || 'https://api.intos.io',
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000 // 1 second
  },

  // Supabase Configuration
  supabase: {
    url: process.env.VITE_SUPABASE_URL || '',
    anonKey: process.env.VITE_SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '', // Server-side only
  },

  // Analytics
  analytics: {
    googleAnalyticsId: process.env.VITE_GA_ID || 'G-XXXXXXXXXX',
    enableTracking: true,
    debug: false
  },

  // Error Tracking (Sentry)
  sentry: {
    dsn: process.env.VITE_SENTRY_DSN || '',
    environment: process.env.NODE_ENV || 'production',
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    enabled: process.env.NODE_ENV === 'production'
  },

  // Feature Flags
  features: {
    enablePWA: true,
    enableOfflineMode: true,
    enableServiceWorker: true,
    enableAnalytics: true,
    enableErrorTracking: true,
    enableBetaFeatures: false
  },

  // Performance
  performance: {
    enableLazyLoading: true,
    enableCodeSplitting: true,
    enableImageOptimization: true,
    enableCaching: true,
    cacheVersion: 'v2.5.0'
  },

  // Security
  security: {
    enableCSP: true,
    enableCORS: true,
    allowedOrigins: [
      'https://intos.io',
      'https://www.intos.io',
      'https://app.intos.io'
    ],
    enableRateLimiting: true,
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // max 100 requests per windowMs
    }
  },

  // CDN & Assets
  cdn: {
    baseUrl: process.env.VITE_CDN_URL || 'https://cdn.intos.io',
    imageOptimization: true,
    lazyLoadImages: true
  },

  // SEO
  seo: {
    siteName: 'INT OS v2.5',
    siteUrl: 'https://intos.io',
    defaultTitle: 'INT OS v2.5 - Unified Business Intelligence Platform',
    defaultDescription: 'Transform your business operations with INT OS v2.5. 26 AI-powered applications, seamless integrations, and real-time analytics in one unified platform.',
    twitterHandle: '@intinc',
    ogImage: 'https://intos.io/og-image.png'
  },

  // Build Configuration
  build: {
    outputDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable in production for security
    minify: true,
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true
      }
    }
  }
};

// Environment-specific overrides
const envConfigs = {
  development: {
    api: {
      baseUrl: 'http://localhost:3000'
    },
    analytics: {
      enableTracking: false,
      debug: true
    },
    sentry: {
      enabled: false
    },
    build: {
      sourcemap: true,
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: false
        }
      }
    }
  },

  staging: {
    api: {
      baseUrl: 'https://staging-api.intos.io'
    },
    seo: {
      siteUrl: 'https://staging.intos.io'
    }
  },

  production: {
    // Use defaults from deployConfig
  }
};

// Merge environment config
const currentEnv = process.env.NODE_ENV || 'production';
export const config = {
  ...deployConfig,
  ...(envConfigs[currentEnv as keyof typeof envConfigs] || {})
};

export default config;
