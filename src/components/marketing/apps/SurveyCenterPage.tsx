import { AppLandingPage } from './AppLandingPage';
import { ClipboardList, Brain, Star, Send, BarChart3, Sparkles } from 'lucide-react';

export function SurveyCenterPage() {
  return (
    <AppLandingPage
      appName="SurveyCenter"
      tagline="Customer Feedback Surveys with AI Sentiment Analysis"
      description="Create CSAT, NPS, and custom surveys that auto-send after support interactions. AI analyzes responses and identifies trends."
      primaryColor="#529ADB"
      category="Customer Feedback"
      features={[
        {
          title: 'Multiple Survey Types',
          description: 'Create CSAT, NPS, CES, or fully custom surveys. Pre-built templates get you started fast.',
          icon: ClipboardList
        },
        {
          title: 'AI Sentiment Analysis',
          description: 'AI analyzes open-ended responses and categorizes sentiment as positive, neutral, or negative.',
          icon: Brain
        },
        {
          title: 'Auto-Send Triggers',
          description: 'Automatically send surveys after ticket resolution, deal closure, or custom events.',
          icon: Send
        },
        {
          title: 'Real-Time Analytics',
          description: 'Track response rates, average scores, and sentiment trends in real-time dashboards.',
          icon: BarChart3
        },
        {
          title: 'Smart Insights',
          description: 'AI identifies common complaints and trending issues from survey responses.',
          icon: Sparkles
        },
        {
          title: 'Multiple Channels',
          description: 'Send surveys via email, SMS, or shareable link. Reach customers where they are.',
          icon: Star
        }
      ]}
      benefits={[
        {
          title: 'Boost Response Rates by 45%',
          description: 'Automated timing and multi-channel delivery increase survey response rates significantly.'
        },
        {
          title: 'Identify Issues Early',
          description: 'AI trend detection spots problems before they affect multiple customers.'
        },
        {
          title: 'Close the Feedback Loop',
          description: 'Automatically create tickets for negative feedback. Show customers you listen.'
        },
        {
          title: 'Prove ROI',
          description: 'Track CSAT and NPS improvements over time. Demonstrate the impact of your changes.'
        }
      ]}
      integrations={['Freshdesk', 'HubSpot', 'Gmail', 'Outlook', 'Twilio', 'Slack']}
      stats={{ users: '9K+', rating: '4.8', timeSaved: '6 hrs/week' }}
    />
  );
}
