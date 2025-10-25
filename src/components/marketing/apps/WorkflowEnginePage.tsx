import { AppLandingPage } from './AppLandingPage';
import { Zap, GitBranch, Sparkles, Clock, CheckCircle2, Code } from 'lucide-react';

export function WorkflowEnginePage() {
  return (
    <AppLandingPage
      appName="WorkflowEngine"
      tagline="Visual Automation Builder - No Code Required"
      description="Build powerful multi-step workflows that connect all your business tools. Automate repetitive tasks and free your team to focus on what matters most."
      primaryColor="#E27305"
      category="Automation & Integration"
      features={[
        {
          title: 'Visual Workflow Builder',
          description: 'Drag-and-drop interface makes automation accessible to everyone, no coding required.',
          icon: GitBranch
        },
        {
          title: 'AI-Powered Suggestions',
          description: 'Describe workflows in plain English and let AI build them for you automatically.',
          icon: Sparkles
        },
        {
          title: 'Multi-Step Automation',
          description: 'Chain together unlimited actions with conditional logic and branching.',
          icon: Zap
        },
        {
          title: 'Smart Scheduling',
          description: 'Add delays, time-based triggers, and schedule workflows to run at optimal times.',
          icon: Clock
        },
        {
          title: 'Pre-Built Templates',
          description: 'Start with 20+ ready-to-use workflow templates for common business processes.',
          icon: CheckCircle2
        },
        {
          title: 'Advanced Testing',
          description: 'Test workflows in sandbox mode before deploying to ensure everything works perfectly.',
          icon: Code
        }
      ]}
      benefits={[
        {
          title: 'Eliminate 80% of Manual Tasks',
          description: 'Teams using WorkflowEngine report eliminating up to 80% of repetitive manual tasks through intelligent automation.'
        },
        {
          title: 'Scale Without Hiring',
          description: 'Handle 10x more volume with the same team size by automating routine processes and workflows.'
        },
        {
          title: '98.3% Success Rate',
          description: 'Industry-leading reliability with built-in error handling and automatic retries ensures workflows run smoothly.'
        },
        {
          title: 'Connect Everything',
          description: 'Integrate 50+ business tools including HubSpot, Freshdesk, Gmail, Slack, and more into unified workflows.'
        }
      ]}
      integrations={[
        'HubSpot',
        'Freshdesk',
        'Gmail',
        'Outlook',
        'Slack',
        'Teams',
        'Notion',
        'Google Calendar',
        'Drive',
        'Dropbox',
        'Twilio',
        'Zapier'
      ]}
      stats={{
        users: '12K+',
        rating: '4.9',
        timeSaved: '20 hrs/week'
      }}
    />
  );
}
