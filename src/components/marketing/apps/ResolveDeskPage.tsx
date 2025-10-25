import { AppLandingPage } from './AppLandingPage';
import { Headphones, Brain, Zap, Clock, Star, TrendingUp } from 'lucide-react';

export function ResolveDeskPage() {
  return (
    <AppLandingPage
      appName="ResolveDesk"
      tagline="AI-Powered Customer Support Ticket Management"
      description="Resolve tickets faster with AI-suggested responses, smart routing, and automated workflows. Delight your customers."
      primaryColor="#529ADB"
      category="Customer Support"
      features={[
        { title: 'AI Response Suggestions', description: 'AI analyzes tickets and suggests responses based on historical resolutions.', icon: Brain },
        { title: 'Smart Ticket Routing', description: 'Automatically route tickets to the right agent based on skills and workload.', icon: Zap },
        { title: 'SLA Monitoring', description: 'Track SLA compliance in real-time. Get alerted before breaches.', icon: Clock },
        { title: 'CSAT Tracking', description: 'Measure customer satisfaction per agent, team, and ticket type.', icon: Star },
        { title: 'Auto-Escalation', description: 'Automatically escalate urgent or aging tickets to managers.', icon: TrendingUp },
        { title: 'Multi-Channel Support', description: 'Email, chat, phone, and social media tickets in one queue.', icon: Headphones }
      ]}
      benefits={[
        { title: 'Reduce Resolution Time by 50%', description: 'AI suggestions and smart routing cut average resolution time in half.' },
        { title: 'Increase CSAT by 30%', description: 'Faster, smarter responses lead to happier customers.' },
        { title: 'Handle 3x More Volume', description: 'Automation helps teams handle triple the ticket volume without hiring.' },
        { title: '99% SLA Compliance', description: 'Automated escalation ensures you never miss an SLA deadline.' }
      ]}
      integrations={['Freshdesk', 'Zendesk', 'Intercom', 'Gmail', 'Slack', 'Teams']}
      stats={{ users: '22K+', rating: '4.9', timeSaved: '18 hrs/week' }}
    />
  );
}
