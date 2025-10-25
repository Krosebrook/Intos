import { AppLandingPage } from './AppLandingPage';
import { Plug, Zap, RefreshCw, Shield, TrendingUp, CheckCircle2 } from 'lucide-react';

export function IntegrationHubPage() {
  return (
    <AppLandingPage
      appName="IntegrationHub"
      tagline="Central Hub for All Your CRM Integrations"
      description="Connect HubSpot, Freshdesk, Microsoft Teams, and more. Manage all integrations from one unified dashboard."
      primaryColor="#E27305"
      category="Integration & Connectivity"
      features={[
        {
          title: 'HubSpot Integration',
          description: 'Full access to contacts, companies, deals, and custom properties. Real-time sync.',
          icon: Plug
        },
        {
          title: 'Freshdesk Support',
          description: 'Manage tickets, track SLAs, and monitor agent performance. Bi-directional sync.',
          icon: CheckCircle2
        },
        {
          title: 'Microsoft Teams',
          description: 'Post messages, create channels, and schedule meetings from INT OS.',
          icon: Zap
        },
        {
          title: 'Real-Time Sync',
          description: 'Changes sync instantly across all platforms. No manual data entry.',
          icon: RefreshCw
        },
        {
          title: 'Health Monitoring',
          description: 'Track connection status, API usage, and sync errors in real-time.',
          icon: TrendingUp
        },
        {
          title: 'Enterprise Security',
          description: 'OAuth 2.0, encrypted tokens, and SOC 2 compliance. Your data stays safe.',
          icon: Shield
        }
      ]}
      benefits={[
        {
          title: 'Save 20 Hours per Week',
          description: 'Eliminate manual data entry and duplicate work across platforms.'
        },
        {
          title: 'Reduce Errors by 90%',
          description: 'Automated sync eliminates human error in data transfer.'
        },
        {
          title: 'Single Source of Truth',
          description: 'All your business data in one place. No more version conflicts.'
        },
        {
          title: 'Scale Without Limits',
          description: 'Handle millions of records with enterprise-grade sync infrastructure.'
        }
      ]}
      integrations={['HubSpot', 'Freshdesk', 'Microsoft Teams', 'Salesforce', 'Zendesk', 'Intercom']}
      stats={{ users: '20K+', rating: '4.9', timeSaved: '20 hrs/week' }}
    />
  );
}
