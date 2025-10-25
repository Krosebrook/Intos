import { AppLandingPage } from './AppLandingPage';
import { PieChart, Table, TrendingUp, Brain, Download, Zap } from 'lucide-react';

export function AnalyticsStudioPage() {
  return (
    <AppLandingPage
      appName="AnalyticsStudio"
      tagline="Advanced Analytics & Pivot Tables Across All Data"
      description="Transform data from HubSpot, Freshdesk, and more into actionable insights. Interactive charts, pivot tables, and AI-powered analysis."
      primaryColor="#46A57B"
      category="Advanced Analytics"
      features={[
        {
          title: 'Interactive Charts',
          description: 'Create beautiful charts with real-time data. Line, bar, pie, area, and custom visualizations.',
          icon: PieChart
        },
        {
          title: 'Pivot Tables',
          description: 'Drag-and-drop pivot tables with drill-down capabilities. Analyze data any way you want.',
          icon: Table
        },
        {
          title: 'Multi-Source Aggregation',
          description: 'Combine data from HubSpot, Freshdesk, Gmail, and more in unified reports.',
          icon: Zap
        },
        {
          title: 'Predictive Analytics',
          description: 'AI forecasts revenue, customer churn, and support volume based on historical trends.',
          icon: Brain
        },
        {
          title: 'Trend Detection',
          description: 'Automatically detect anomalies, spikes, and trends in your business metrics.',
          icon: TrendingUp
        },
        {
          title: 'Export Anywhere',
          description: 'Export reports to CSV, Excel, PDF, or Google Sheets with one click.',
          icon: Download
        }
      ]}
      benefits={[
        {
          title: 'Make Decisions 5x Faster',
          description: 'Real-time dashboards and AI insights help teams make critical decisions in minutes, not days.'
        },
        {
          title: 'Increase Revenue by 15%',
          description: 'Companies using AnalyticsStudio report 15% revenue growth through data-driven optimization.'
        },
        {
          title: 'Spot Trends Early',
          description: 'AI anomaly detection alerts you to problems before they become critical issues.'
        },
        {
          title: 'No SQL Required',
          description: 'Build complex reports without writing a single line of code. Drag, drop, done.'
        }
      ]}
      integrations={['HubSpot', 'Freshdesk', 'Gmail', 'Outlook', 'Google Analytics', 'Stripe']}
      stats={{ users: '13K+', rating: '4.9', timeSaved: '12 hrs/week' }}
    />
  );
}
