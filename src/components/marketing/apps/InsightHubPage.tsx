import { AppLandingPage } from './AppLandingPage';
import { BarChart3, TrendingUp, Zap, Bell, Brain, Shield } from 'lucide-react';

export function InsightHubPage() {
  return (
    <AppLandingPage
      appName="InsightHub"
      tagline="Real-time Business Intelligence at Your Fingertips"
      description="Transform raw data into actionable insights with AI-powered analytics, customizable dashboards, and real-time reporting that drives better business decisions."
      primaryColor="#529ADB"
      category="Analytics & Reporting"
      features={[
        {
          title: 'Real-Time Dashboards',
          description: 'Monitor your business metrics with live updating dashboards that refresh automatically.',
          icon: BarChart3
        },
        {
          title: 'AI-Powered Insights',
          description: 'Get intelligent recommendations and anomaly detection powered by machine learning.',
          icon: Brain
        },
        {
          title: 'Predictive Analytics',
          description: 'Forecast trends and make data-driven predictions with advanced algorithms.',
          icon: TrendingUp
        },
        {
          title: 'Smart Alerts',
          description: 'Receive instant notifications when metrics cross critical thresholds.',
          icon: Bell
        },
        {
          title: 'Lightning Fast',
          description: 'Query millions of records in milliseconds with our optimized data engine.',
          icon: Zap
        },
        {
          title: 'Enterprise Security',
          description: 'Bank-level encryption and role-based access control keep your data safe.',
          icon: Shield
        }
      ]}
      benefits={[
        {
          title: 'Increase Revenue by 23%',
          description: 'Companies using InsightHub report an average 23% increase in revenue through better decision-making and faster response to market changes.'
        },
        {
          title: 'Save 15 Hours per Week',
          description: 'Automated reporting and real-time dashboards eliminate manual data gathering, saving your team hours of work every week.'
        },
        {
          title: 'Make Faster Decisions',
          description: 'Access to real-time data and AI insights enables teams to make critical decisions 3x faster than traditional methods.'
        },
        {
          title: 'Reduce Costs by 18%',
          description: 'Identify inefficiencies and optimize operations with data-driven insights that directly impact your bottom line.'
        }
      ]}
      integrations={[
        'HubSpot',
        'Salesforce',
        'Google Analytics',
        'Stripe',
        'QuickBooks',
        'Shopify',
        'Zendesk',
        'Slack'
      ]}
      stats={{
        users: '15K+',
        rating: '4.9',
        timeSaved: '15 hrs/week'
      }}
    />
  );
}
