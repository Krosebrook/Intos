import { AppLandingPage } from './AppLandingPage';
import { Mail, Brain, Zap, Filter, Search, Bell } from 'lucide-react';

export function UnifiedInboxPage() {
  return (
    <AppLandingPage
      appName="UnifiedInbox"
      tagline="AI-Powered Email Management for Gmail & Outlook"
      description="Manage all your email accounts in one unified inbox with AI sentiment analysis, smart categorization, and CRM integration. Never miss an important message again."
      primaryColor="#529ADB"
      category="Email & Communication"
      features={[
        {
          title: 'Multi-Account Support',
          description: 'Connect unlimited Gmail and Outlook accounts. View and manage all emails in one interface.',
          icon: Mail
        },
        {
          title: 'AI Sentiment Analysis',
          description: 'Automatically detect customer sentiment in emails. Prioritize urgent or negative messages.',
          icon: Brain
        },
        {
          title: 'Smart Categorization',
          description: 'AI categorizes emails into sales, support, urgent, or general. Auto-routing to the right team.',
          icon: Filter
        },
        {
          title: 'Lightning Fast Search',
          description: 'Find any email instantly with full-text search across all accounts and attachments.',
          icon: Search
        },
        {
          title: 'Priority Inbox',
          description: 'Important emails rise to the top. Focus on what matters with AI-powered prioritization.',
          icon: Zap
        },
        {
          title: 'Real-Time Alerts',
          description: 'Get notified instantly for high-priority messages. Custom rules for different senders.',
          icon: Bell
        }
      ]}
      benefits={[
        {
          title: 'Save 10 Hours per Week',
          description: 'Teams report saving an average of 10 hours per week through automated sorting and smart prioritization.'
        },
        {
          title: 'Never Miss Urgent Emails',
          description: 'AI sentiment analysis flags negative or urgent messages instantly, ensuring rapid response to critical issues.'
        },
        {
          title: 'Linked to CRM',
          description: 'Every email automatically links to contacts, deals, and tickets in HubSpot or Freshdesk for complete context.'
        },
        {
          title: 'Team Collaboration',
          description: 'Share inboxes, assign emails, and collaborate on responses with your team in real-time.'
        }
      ]}
      integrations={['Gmail', 'Outlook', 'HubSpot', 'Freshdesk', 'Slack', 'Teams']}
      stats={{ users: '18K+', rating: '4.9', timeSaved: '10 hrs/week' }}
    />
  );
}
