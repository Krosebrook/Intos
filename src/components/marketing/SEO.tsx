import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

export function SEO({
  title,
  description,
  canonical,
  image = 'https://intos.io/og-image.png',
  type = 'website',
  keywords = [],
  author = 'INT Inc.',
  publishedTime,
  modifiedTime,
  noindex = false
}: SEOProps) {
  const siteUrl = 'https://intos.io';
  const fullTitle = title.includes('INT OS') ? title : `${title} | INT OS v2.5`;
  const url = canonical || siteUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="author" content={author} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="INT OS" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta name="twitter:creator" content="@intinc" />

      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Additional SEO tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'product' ? 'SoftwareApplication' : 'WebSite',
          name: title,
          description: description,
          url: url,
          image: image,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock'
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            ratingCount: '1247'
          }
        })}
      </script>
    </Helmet>
  );
}

// Preset SEO configs for common pages
export const seoPresets = {
  home: {
    title: 'INT OS v2.5 - Unified Business Intelligence Platform',
    description: 'Transform your business operations with INT OS v2.5. 26 AI-powered applications, seamless integrations, and real-time analytics in one unified platform.',
    keywords: ['business intelligence', 'CRM', 'analytics', 'workflow automation', 'customer support', 'AI platform']
  },
  
  insightHub: {
    title: 'InsightHub - Real-time Analytics & Business Intelligence',
    description: 'Transform raw data into actionable insights with AI-powered analytics, customizable dashboards, and real-time reporting. Start free trial today.',
    keywords: ['business analytics', 'real-time dashboard', 'AI insights', 'data visualization', 'predictive analytics']
  },
  
  workflowEngine: {
    title: 'WorkflowEngine - Visual Automation Builder (No Code)',
    description: 'Build powerful multi-step workflows without coding. Connect 50+ tools, automate tasks, and save 20 hours per week. Try free for 14 days.',
    keywords: ['workflow automation', 'no-code automation', 'business process automation', 'integration platform', 'zapier alternative']
  },
  
  unifiedInbox: {
    title: 'UnifiedInbox - AI-Powered Email Management',
    description: 'Manage Gmail and Outlook in one unified inbox with AI sentiment analysis, smart categorization, and CRM integration. Free trial available.',
    keywords: ['unified inbox', 'email management', 'AI email', 'sentiment analysis', 'email automation']
  },
  
  calendarSync: {
    title: 'CalendarSync - Smart Scheduling with Google Calendar',
    description: 'Smart scheduling with AI meeting suggestions, CRM integration, and conflict detection. Sync Google Calendar with your business tools.',
    keywords: ['calendar sync', 'smart scheduling', 'meeting automation', 'Google Calendar integration', 'CRM calendar']
  },
  
  fileVault: {
    title: 'FileVault - Unified File Management (Drive & Dropbox)',
    description: 'Manage Google Drive and Dropbox files in one place. AI-powered organization, CRM linking, and secure sharing. Try free today.',
    keywords: ['file management', 'cloud storage', 'Google Drive', 'Dropbox', 'document management']
  },
  
  analyticsStudio: {
    title: 'AnalyticsStudio - Advanced Analytics & Pivot Tables',
    description: 'Advanced analytics with pivot tables, multi-source aggregation, and AI insights. Connect HubSpot, Freshdesk, and more.',
    keywords: ['pivot tables', 'advanced analytics', 'business intelligence', 'data aggregation', 'analytics platform']
  },
  
  surveyCenter: {
    title: 'SurveyCenter - Customer Feedback & CSAT Surveys',
    description: 'Create CSAT, NPS, and custom surveys with AI sentiment analysis. Auto-send after ticket resolution. Start collecting feedback today.',
    keywords: ['customer surveys', 'CSAT', 'NPS', 'customer feedback', 'survey software', 'sentiment analysis']
  },
  
  pricing: {
    title: 'Pricing - INT OS Plans & Packages',
    description: 'Transparent pricing for INT OS. Start free, upgrade anytime. Enterprise plans available. No hidden fees.',
    keywords: ['pricing', 'plans', 'business software pricing', 'enterprise pricing']
  },
  
  contact: {
    title: 'Contact Us - INT OS Support',
    description: 'Get in touch with INT OS team. Sales inquiries, support, partnerships, and demos. We respond within 24 hours.',
    keywords: ['contact', 'support', 'sales', 'demo']
  }
};
