import { Helmet } from 'react-helmet';

interface SEOEnhancedProps {
  // Basic Meta
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
  
  // Structured Data
  schema?: {
    type: 'Organization' | 'SoftwareApplication' | 'Article' | 'FAQPage' | 'BreadcrumbList' | 'Product';
    data: Record<string, any>;
  }[];
  
  // Social
  twitterHandle?: string;
  ogType?: string;
  
  // Breadcrumbs
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export function SEOEnhanced({
  title,
  description,
  canonical,
  image = 'https://int-os.com/og-image.jpg',
  type = 'website',
  keywords = [],
  author = 'INT Inc.',
  publishedTime,
  modifiedTime,
  noindex = false,
  schema = [],
  twitterHandle = '@intinc',
  ogType,
  breadcrumbs
}: SEOEnhancedProps) {
  const siteUrl = 'https://int-os.com';
  const fullTitle = title.includes('INT OS') ? title : `${title} | INT OS v2.5`;
  const url = canonical || siteUrl;
  
  // Default Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'INT Inc.',
    legalName: 'INT Incorporated',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'INT OS v2.5 - 26 AI-powered applications unified into one operational platform',
    foundingDate: '2020',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'Customer Service',
      email: 'hello@intinc.com',
      availableLanguage: ['en', 'es', 'fr', 'ar']
    },
    sameAs: [
      'https://twitter.com/intinc',
      'https://linkedin.com/company/intinc',
      'https://facebook.com/intinc',
      'https://github.com/intinc'
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Business Ave',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US'
    }
  };
  
  // Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.url}`
    }))
  } : null;
  
  // Combine all schemas
  const allSchemas = [
    organizationSchema,
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
    ...schema.map(s => s.data)
  ];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="author" content={author} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />}

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType || type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="INT OS" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:site" content={twitterHandle} />

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
      <meta name="theme-color" content="#33475B" />
      
      {/* Structured Data - Multiple Schemas */}
      {allSchemas.map((schemaData, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      ))}
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Resource Hints */}
      <link rel="prefetch" href="/apps" />
      <link rel="prefetch" href="/pricing" />
    </Helmet>
  );
}

// Schema Builders for Common Use Cases
export const SchemaBuilders = {
  // Software Application Schema
  softwareApplication: (data: {
    name: string;
    description: string;
    price: number;
    currency?: string;
    rating?: number;
    ratingCount?: number;
    features?: string[];
    screenshot?: string;
  }) => ({
    type: 'SoftwareApplication' as const,
    data: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: data.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      description: data.description,
      offers: {
        '@type': 'Offer',
        price: data.price.toString(),
        priceCurrency: data.currency || 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: data.rating?.toString() || '4.8',
        ratingCount: data.ratingCount?.toString() || '1247',
        bestRating: '5',
        worstRating: '1'
      },
      ...(data.screenshot && { screenshot: data.screenshot }),
      ...(data.features && { featureList: data.features })
    }
  }),
  
  // Article Schema (for blog posts)
  article: (data: {
    headline: string;
    description: string;
    image: string;
    author: string;
    publishedDate: string;
    modifiedDate?: string;
    url: string;
  }) => ({
    type: 'Article' as const,
    data: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.headline,
      description: data.description,
      image: data.image,
      author: {
        '@type': 'Person',
        name: data.author
      },
      publisher: {
        '@type': 'Organization',
        name: 'INT Inc.',
        logo: {
          '@type': 'ImageObject',
          url: 'https://int-os.com/logo.png'
        }
      },
      datePublished: data.publishedDate,
      dateModified: data.modifiedDate || data.publishedDate,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': data.url
      }
    }
  }),
  
  // FAQ Schema
  faq: (faqs: Array<{ question: string; answer: string }>) => ({
    type: 'FAQPage' as const,
    data: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    }
  }),
  
  // Product Schema
  product: (data: {
    name: string;
    description: string;
    image: string;
    price: number;
    currency?: string;
    availability?: string;
    rating?: number;
    reviewCount?: number;
    brand?: string;
  }) => ({
    type: 'Product' as const,
    data: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: data.name,
      description: data.description,
      image: data.image,
      brand: {
        '@type': 'Brand',
        name: data.brand || 'INT Inc.'
      },
      offers: {
        '@type': 'Offer',
        price: data.price.toString(),
        priceCurrency: data.currency || 'USD',
        availability: data.availability || 'https://schema.org/InStock',
        url: 'https://int-os.com/pricing'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: data.rating?.toString() || '4.8',
        reviewCount: data.reviewCount?.toString() || '1247'
      }
    }
  }),
  
  // How-To Schema (for tutorials)
  howTo: (data: {
    name: string;
    description: string;
    image?: string;
    totalTime?: string;
    steps: Array<{ name: string; text: string; image?: string }>;
  }) => ({
    type: 'HowTo' as const,
    data: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: data.name,
      description: data.description,
      image: data.image,
      totalTime: data.totalTime,
      step: data.steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        ...(step.image && { image: step.image })
      }))
    }
  })
};

// Preset SEO configs for common pages
export const seoPresets = {
  home: {
    title: 'INT OS v2.5 | 26 AI-Powered Apps for Business Automation',
    description: 'Automate operations with INT OS v2.5\'s 26 AI-powered apps. Integrate HubSpot, Freshdesk, Teams & more. Trusted by 10,000+ teams. Start free trial!',
    keywords: ['AI operations platform', 'business automation', 'workflow automation', 'CRM integration', 'customer support software', 'analytics platform'],
    breadcrumbs: [
      { name: 'Home', url: '/' }
    ]
  },
  
  features: {
    title: 'Features | AI Automation, Analytics & Integrations',
    description: 'Explore INT OS v2.5 features: AI automation, real-time analytics, 100+ integrations, advanced workflows, and enterprise security. See all features.',
    keywords: ['AI automation features', 'business analytics', 'integration platform', 'workflow engine', 'enterprise security'],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/features' }
    ]
  },
  
  insightHub: {
    title: 'InsightHub - AI-Powered Customer Analytics & Insights',
    description: 'Analyze customer data with InsightHub AI. Get real-time insights, sentiment analysis, and predictive analytics. 99.9% accuracy. Try free!',
    keywords: ['customer analytics', 'AI insights', 'sentiment analysis', 'predictive analytics', 'business intelligence', 'real-time dashboard'],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Apps', url: '/apps' },
      { name: 'InsightHub', url: '/apps/insight-hub' }
    ],
    schema: [
      SchemaBuilders.softwareApplication({
        name: 'InsightHub',
        description: 'AI-powered customer analytics and insights platform',
        price: 29,
        rating: 4.9,
        ratingCount: 342,
        features: [
          'Real-time customer analytics',
          'AI sentiment analysis',
          'Predictive insights',
          'Custom dashboards',
          'HubSpot & Freshdesk integration'
        ]
      })
    ]
  },
  
  workflowEngine: {
    title: 'WorkflowEngine - Visual No-Code Workflow Automation',
    description: 'Build powerful multi-step workflows without coding. Connect 50+ tools, automate tasks, and save 20 hours per week. Try free for 14 days.',
    keywords: ['workflow automation', 'no-code automation', 'business process automation', 'workflow builder', 'zapier alternative', 'integration platform'],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Apps', url: '/apps' },
      { name: 'WorkflowEngine', url: '/apps/workflow-engine' }
    ],
    schema: [
      SchemaBuilders.softwareApplication({
        name: 'WorkflowEngine',
        description: 'Visual no-code workflow automation platform',
        price: 29,
        rating: 4.8,
        ratingCount: 589,
        features: [
          'Visual workflow builder',
          'No-code automation',
          '50+ integration connectors',
          'Conditional logic',
          'Multi-step workflows'
        ]
      })
    ]
  },
  
  pricing: {
    title: 'Pricing | Simple Plans for Teams of All Sizes',
    description: 'Transparent INT OS v2.5 pricing. Start free, upgrade anytime. Professional $79/mo, Enterprise custom. All 26 apps included. No hidden fees.',
    keywords: ['pricing', 'business software pricing', 'SaaS pricing', 'enterprise pricing', 'subscription plans'],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Pricing', url: '/pricing' }
    ],
    schema: [
      SchemaBuilders.faq([
        {
          question: 'What is included in the Professional plan?',
          answer: 'The Professional plan includes all 26 applications, unlimited workflows, 50+ integrations, advanced analytics, priority support, and custom branding for $79/month.'
        },
        {
          question: 'Is there a free trial?',
          answer: 'Yes! All plans come with a 14-day free trial. No credit card required. You can test all features before committing.'
        },
        {
          question: 'Can I change plans later?',
          answer: 'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we prorate any charges.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, AmEx), PayPal, and bank transfers for enterprise customers.'
        }
      ])
    ]
  },
  
  contact: {
    title: 'Contact Us | Get in Touch with INT OS Team',
    description: 'Get in touch with INT OS team. Sales inquiries, support, partnerships, and demos. We respond within 24 hours. Call, email, or visit us.',
    keywords: ['contact', 'customer support', 'sales inquiry', 'demo request', 'partnership'],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact' }
    ]
  }
};

export { SEOEnhanced as SEO };
