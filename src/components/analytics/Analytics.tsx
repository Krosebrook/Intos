import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics 4 Configuration
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with actual ID

// Initialize Google Analytics
export function initializeAnalytics() {
  if (typeof window === 'undefined') return;

  // Load GA4 script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll handle page views manually
    cookie_flags: 'SameSite=None;Secure'
  });

  // Store gtag globally
  (window as any).gtag = gtag;
}

// Track page view
export function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href
  });

  console.log('[Analytics] Page view:', path);
}

// Track custom events
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, any>
) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', eventName, eventParams);
  console.log('[Analytics] Event:', eventName, eventParams);
}

// Predefined event trackers
export const analytics = {
  // Button clicks
  clickCTA: (ctaText: string, location: string) => {
    trackEvent('cta_click', {
      cta_text: ctaText,
      cta_location: location
    });
  },

  // Form submissions
  submitForm: (formName: string, formData?: Record<string, any>) => {
    trackEvent('form_submit', {
      form_name: formName,
      ...formData
    });
  },

  // Trial signup
  startTrial: (plan?: string) => {
    trackEvent('begin_trial', {
      plan: plan || 'free'
    });
  },

  // Demo request
  requestDemo: (appName?: string) => {
    trackEvent('request_demo', {
      app_name: appName
    });
  },

  // Contact form
  submitContact: (interest: string) => {
    trackEvent('contact_submit', {
      interest_type: interest
    });
  },

  // Video plays
  playVideo: (videoTitle: string, duration?: number) => {
    trackEvent('video_play', {
      video_title: videoTitle,
      video_duration: duration
    });
  },

  // Downloads
  downloadFile: (fileName: string, fileType: string) => {
    trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType
    });
  },

  // Search
  search: (query: string, results?: number) => {
    trackEvent('search', {
      search_term: query,
      search_results: results
    });
  },

  // Scroll depth
  scrollDepth: (percentage: number, page: string) => {
    trackEvent('scroll', {
      scroll_depth: percentage,
      page_path: page
    });
  },

  // Time on page (when user leaves)
  timeOnPage: (seconds: number, page: string) => {
    trackEvent('time_on_page', {
      duration_seconds: seconds,
      page_path: page
    });
  },

  // App navigation
  navigateToApp: (appName: string) => {
    trackEvent('navigate_app', {
      app_name: appName
    });
  },

  // Pricing interactions
  viewPricing: (plan: string) => {
    trackEvent('view_pricing', {
      plan_name: plan
    });
  },

  selectPlan: (plan: string, billing: 'monthly' | 'annual') => {
    trackEvent('select_plan', {
      plan_name: plan,
      billing_period: billing
    });
  },

  // Integration clicks
  clickIntegration: (integrationName: string) => {
    trackEvent('integration_click', {
      integration_name: integrationName
    });
  },

  // Social shares
  shareSocial: (platform: string, contentType: string) => {
    trackEvent('share', {
      method: platform,
      content_type: contentType
    });
  },

  // Errors
  error: (errorType: string, errorMessage: string) => {
    trackEvent('error', {
      error_type: errorType,
      error_message: errorMessage
    });
  }
};

// React hook for automatic page view tracking
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
}

// Component to initialize analytics
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeAnalytics();
  }, []);

  return <>{children}</>;
}

// HOC to track page views automatically
export function withPageTracking<P extends object>(
  Component: React.ComponentType<P>,
  pageName?: string
) {
  return function TrackedComponent(props: P) {
    usePageTracking();
    return <Component {...props} />;
  };
}

// Scroll depth tracker
export function useScrollTracking(threshold = 75) {
  useEffect(() => {
    let maxScroll = 0;
    let tracked = false;

    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
      }

      if (scrollPercentage >= threshold && !tracked) {
        analytics.scrollDepth(scrollPercentage, window.location.pathname);
        tracked = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);
}

// Time on page tracker
export function useTimeOnPage() {
  useEffect(() => {
    const startTime = Date.now();

    const handleUnload = () => {
      const duration = Math.round((Date.now() - startTime) / 1000);
      analytics.timeOnPage(duration, window.location.pathname);
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);
}

// Outbound link tracker
export function trackOutboundLink(url: string, label?: string) {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: label || url,
    transport_type: 'beacon'
  });
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
