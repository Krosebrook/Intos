import { AppLandingPage } from './AppLandingPage';
import { MessageSquare, Users, Sparkles, Target, Bell, BarChart3, BookOpen, Activity, Eye, Zap, Brain, Shield, TrendingUp, Clock, Star } from 'lucide-react';

// ConnectDesk
export function ConnectDeskPage() {
  return (
    <AppLandingPage
      appName="ConnectDesk"
      tagline="Omnichannel Customer Communication Platform"
      description="Unify customer conversations from email, chat, social media, and phone into one powerful inbox."
      primaryColor="#46A57B"
      category="Customer Communication"
      features={[
        { title: 'Omnichannel Inbox', description: 'All customer messages in one place. Email, chat, social, SMS unified.', icon: MessageSquare },
        { title: 'Team Collaboration', description: 'Assign conversations, add internal notes, and collaborate on responses.', icon: Users },
        { title: 'AI Smart Replies', description: 'AI suggests contextual responses based on conversation history.', icon: Brain },
        { title: 'Live Chat Widget', description: 'Embeddable chat widget for your website with co-browsing support.', icon: Sparkles },
        { title: 'CSAT Surveys', description: 'Automatically send satisfaction surveys after conversations close.', icon: Star },
        { title: 'Performance Analytics', description: 'Track response time, resolution rate, and agent performance.', icon: BarChart3 }
      ]}
      benefits={[
        { title: 'Respond 10x Faster', description: 'Unified inbox and AI suggestions reduce average response time from hours to minutes.' },
        { title: 'Increase Conversions by 25%', description: 'Live chat captures leads that would otherwise bounce from your site.' },
        { title: 'Reduce Agent Burnout', description: 'Smart routing and automation prevent agent overload and improve satisfaction.' },
        { title: 'Scale Globally', description: 'Built-in translation supports customer conversations in 100+ languages.' }
      ]}
      integrations={['Intercom', 'Drift', 'WhatsApp', 'Facebook', 'Twitter', 'Instagram']}
      stats={{ users: '17K+', rating: '4.8', timeSaved: '14 hrs/week' }}
    />
  );
}

// FlowForge
export function FlowForgePage() {
  return (
    <AppLandingPage
      appName="FlowForge"
      tagline="Visual Process Builder for Complex Workflows"
      description="Design, test, and deploy complex business processes with drag-and-drop simplicity. No coding required."
      primaryColor="#E27305"
      category="Process Automation"
      features={[
        { title: 'Visual Flow Designer', description: 'Drag-and-drop interface makes complex workflows easy to build and understand.', icon: Zap },
        { title: 'Conditional Logic', description: 'Add if/then branches, loops, and switches for sophisticated process control.', icon: Brain },
        { title: 'Version Control', description: 'Track changes, rollback to previous versions, and test before deploying.', icon: Shield },
        { title: 'Real-Time Testing', description: 'Test workflows in sandbox mode before going live. Debug with step-by-step logs.', icon: Activity },
        { title: 'Team Templates', description: 'Share workflow templates across your organization. Best practices built-in.', icon: Users },
        { title: 'Execution Monitoring', description: 'Watch workflows run in real-time. Get alerts when errors occur.', icon: Eye }
      ]}
      benefits={[
        { title: 'Build Workflows 5x Faster', description: 'Visual builder is 5x faster than traditional scripting or development.' },
        { title: '99.9% Uptime', description: 'Enterprise-grade infrastructure ensures your workflows always run.' },
        { title: 'Handle Any Complexity', description: 'From simple 2-step flows to 100+ step processes, FlowForge scales.' },
        { title: 'Empower Citizen Developers', description: 'Business users can build workflows without IT involvement.' }
      ]}
      integrations={['Zapier', 'Make.com', 'n8n', 'HubSpot', 'Salesforce', 'Any API']}
      stats={{ users: '15K+', rating: '4.9', timeSaved: '25 hrs/week' }}
    />
  );
}

// SentimentScope
export function SentimentScopePage() {
  return (
    <AppLandingPage
      appName="SentimentScope"
      tagline="AI-Powered Customer Sentiment Analysis"
      description="Monitor customer sentiment across all channels. Identify unhappy customers before they churn."
      primaryColor="#529ADB"
      category="AI & Analytics"
      features={[
        { title: 'Real-Time Sentiment', description: 'AI analyzes every customer interaction and scores sentiment in real-time.', icon: Brain },
        { title: 'Churn Prediction', description: 'Identify at-risk customers based on sentiment trends and engagement patterns.', icon: TrendingUp },
        { title: 'Escalation Alerts', description: 'Get instant alerts when customers express negative sentiment.', icon: Bell },
        { title: 'Sentiment Trends', description: 'Track sentiment over time. See how product changes affect customer happiness.', icon: BarChart3 },
        { title: 'Multi-Channel Analysis', description: 'Analyze sentiment from emails, chats, surveys, and social media.', icon: MessageSquare },
        { title: 'Team Dashboards', description: 'Every team member sees sentiment metrics relevant to their role.', icon: Activity }
      ]}
      benefits={[
        { title: 'Reduce Churn by 35%', description: 'Early intervention with unhappy customers dramatically reduces churn rate.' },
        { title: 'Increase NPS by 20 Points', description: 'Proactive sentiment monitoring leads to measurable NPS improvements.' },
        { title: 'Spot Product Issues Early', description: 'Detect bugs or UX problems through customer sentiment before reviews pile up.' },
        { title: 'Improve Agent Training', description: 'See which agents generate positive sentiment and replicate their approach.' }
      ]}
      integrations={['OpenAI', 'Anthropic', 'HubSpot', 'Freshdesk', 'Zendesk', 'Intercom']}
      stats={{ users: '12K+', rating: '4.8', timeSaved: '10 hrs/week' }}
    />
  );
}

// AlertOps
export function AlertOpsPage() {
  return (
    <AppLandingPage
      appName="AlertOps"
      tagline="Intelligent Alert Management & Incident Response"
      description="Never miss a critical alert. Smart routing, on-call scheduling, and automated escalation for DevOps teams."
      primaryColor="#E27305"
      category="Incident Management"
      features={[
        { title: 'Smart Alert Routing', description: 'Route alerts to the right person based on type, severity, and on-call schedule.', icon: Zap },
        { title: 'On-Call Scheduling', description: 'Flexible on-call rotations with automatic handoffs and shift reminders.', icon: Clock },
        { title: 'Escalation Policies', description: 'Automatically escalate unacknowledged alerts to managers or backup teams.', icon: TrendingUp },
        { title: 'Multi-Channel Alerts', description: 'Receive alerts via SMS, phone, Slack, Teams, email, or push notification.', icon: Bell },
        { title: 'Alert Deduplication', description: 'AI groups related alerts to prevent alert fatigue and noise.', icon: Brain },
        { title: 'Incident Timeline', description: 'Complete audit trail of who was notified when and what actions were taken.', icon: Activity }
      ]}
      benefits={[
        { title: 'Reduce MTTR by 60%', description: 'Faster alerting and routing cuts mean time to resolution by more than half.' },
        { title: 'Prevent Alert Fatigue', description: 'Smart deduplication reduces alerts by 80% without missing critical issues.' },
        { title: '99.99% Delivery Rate', description: 'Redundant delivery ensures critical alerts always reach someone.' },
        { title: 'Sleep Better', description: 'Fair on-call rotations and backup escalation reduce burnout.' }
      ]}
      integrations={['PagerDuty', 'Opsgenie', 'DataDog', 'New Relic', 'Prometheus', 'Grafana']}
      stats={{ users: '8K+', rating: '4.9', timeSaved: '15 hrs/week' }}
    />
  );
}

// SyncBotPanel
export function SyncBotPanelPage() {
  return (
    <AppLandingPage
      appName="SyncBotPanel"
      tagline="Chatbot Builder & Conversation Automation"
      description="Build AI-powered chatbots for support, sales, and lead generation. No coding required."
      primaryColor="#46A57B"
      category="Chatbot & Automation"
      features={[
        { title: 'Visual Bot Builder', description: 'Drag-and-drop conversation flows. Design complex bots in minutes.', icon: Zap },
        { title: 'AI-Powered NLP', description: 'Understand customer intent with advanced natural language processing.', icon: Brain },
        { title: 'Multi-Channel Deploy', description: 'Deploy bots to website, Slack, Teams, WhatsApp, and Facebook Messenger.', icon: MessageSquare },
        { title: 'Human Handoff', description: 'Seamlessly transfer complex questions from bot to human agent.', icon: Users },
        { title: 'CRM Integration', description: 'Bots can look up customer data, create tickets, and update CRM records.', icon: Sparkles },
        { title: 'Analytics Dashboard', description: 'Track bot performance, conversation success rate, and user satisfaction.', icon: BarChart3 }
      ]}
      benefits={[
        { title: 'Handle 70% of Questions', description: 'Bots resolve 70% of common questions without human intervention.' },
        { title: '24/7 Availability', description: 'Provide instant support even when your team is offline.' },
        { title: 'Qualify Leads Automatically', description: 'Sales bots qualify leads before routing to human reps.' },
        { title: 'Reduce Support Costs by 40%', description: 'Automation significantly reduces per-ticket support costs.' }
      ]}
      integrations={['Dialogflow', 'Rasa', 'Slack', 'Teams', 'WhatsApp', 'Messenger']}
      stats={{ users: '14K+', rating: '4.7', timeSaved: '20 hrs/week' }}
    />
  );
}

// AcademyPortal
export function AcademyPortalPage() {
  return (
    <AppLandingPage
      appName="AcademyPortal"
      tagline="Customer Education & Training Platform"
      description="Create courses, certification programs, and training materials. Onboard customers faster and reduce support tickets."
      primaryColor="#529ADB"
      category="Education & Training"
      features={[
        { title: 'Course Builder', description: 'Create video courses, quizzes, and interactive lessons with drag-and-drop.', icon: BookOpen },
        { title: 'Certification Programs', description: 'Issue certificates upon course completion. Track who is certified.', icon: Star },
        { title: 'Progress Tracking', description: 'See who has completed training and where students are struggling.', icon: Activity },
        { title: 'Video Hosting', description: 'Upload and host training videos with built-in analytics and engagement tracking.', icon: Eye },
        { title: 'Knowledge Base', description: 'Searchable documentation library integrated with course content.', icon: BookOpen },
        { title: 'Gamification', description: 'Badges, leaderboards, and points encourage course completion.', icon: Target }
      ]}
      benefits={[
        { title: 'Reduce Support Tickets by 50%', description: 'Educated customers create fewer support tickets and resolve issues themselves.' },
        { title: 'Faster Onboarding', description: 'Structured training cuts customer onboarding time from weeks to days.' },
        { title: 'Increase Product Adoption', description: 'Customers who complete training use 3x more features.' },
        { title: 'Scale Customer Success', description: 'Train thousands of customers without scaling your team.' }
      ]}
      integrations={['Notion', 'YouTube', 'Vimeo', 'HubSpot', 'Salesforce', 'LMS platforms']}
      stats={{ users: '11K+', rating: '4.8', timeSaved: '12 hrs/week' }}
    />
  );
}

// PulseBoard
export function PulseBoardPage() {
  return (
    <AppLandingPage
      appName="PulseBoard"
      tagline="Real-Time Business Health Monitoring"
      description="Monitor your entire business in real-time. See revenue, support, sales, and operations metrics at a glance."
      primaryColor="#E27305"
      category="Executive Dashboard"
      features={[
        { title: 'Real-Time Metrics', description: 'All key business metrics update in real-time. No manual refreshing.', icon: Activity },
        { title: 'Customizable Widgets', description: 'Drag-and-drop widgets to create the perfect dashboard for your role.', icon: Sparkles },
        { title: 'Multi-Source Data', description: 'Combine data from HubSpot, Freshdesk, Stripe, Analytics, and more.', icon: BarChart3 },
        { title: 'Smart Alerts', description: 'Get notified when metrics cross thresholds or anomalies are detected.', icon: Bell },
        { title: 'Mobile Optimized', description: 'Check business health from anywhere on your phone or tablet.', icon: Eye },
        { title: 'Team Sharing', description: 'Share dashboards with team members or export for presentations.', icon: Users }
      ]}
      benefits={[
        { title: 'Make Decisions Faster', description: 'Real-time visibility eliminates delays in decision-making.' },
        { title: 'Spot Issues Early', description: 'Anomaly detection alerts you to problems before they escalate.' },
        { title: 'Align Teams', description: 'Everyone sees the same metrics and works toward the same goals.' },
        { title: 'Replace Weekly Reports', description: 'Live dashboards eliminate the need for manual weekly reports.' }
      ]}
      integrations={['HubSpot', 'Freshdesk', 'Stripe', 'Google Analytics', 'QuickBooks', 'Any API']}
      stats={{ users: '19K+', rating: '4.9', timeSaved: '10 hrs/week' }}
    />
  );
}

// BrainDock
export function BrainDockPage() {
  return (
    <AppLandingPage
      appName="BrainDock"
      tagline="AI Assistant for Business Operations"
      description="Your AI-powered business assistant. Ask questions, get insights, and automate tasks with natural language."
      primaryColor="#529ADB"
      category="AI Assistant"
      features={[
        { title: 'Natural Language Interface', description: 'Ask questions in plain English. No need to learn complex query syntax.', icon: MessageSquare },
        { title: 'Multi-Source Knowledge', description: 'AI searches across all connected platforms to find answers.', icon: Brain },
        { title: 'Smart Recommendations', description: 'AI suggests actions based on patterns in your business data.', icon: Sparkles },
        { title: 'Automated Tasks', description: 'Create tickets, send emails, and update records with simple commands.', icon: Zap },
        { title: 'Learning Engine', description: 'AI learns from your team\'s actions to provide better suggestions over time.', icon: TrendingUp },
        { title: 'Context Awareness', description: 'AI understands context from previous conversations and your current workflow.', icon: Eye }
      ]}
      benefits={[
        { title: 'Save 5 Hours per Day', description: 'Teams report massive time savings through AI-powered automation.' },
        { title: 'Reduce Training Time', description: 'New employees can ask AI instead of bothering senior team members.' },
        { title: 'Never Forget Tasks', description: 'AI reminds you of important follow-ups and deadlines.' },
        { title: 'Data-Driven Decisions', description: 'Get instant answers to business questions without running reports.' }
      ]}
      integrations={['OpenAI GPT-4', 'Anthropic Claude', 'HubSpot', 'Freshdesk', 'Gmail', 'Notion']}
      stats={{ users: '16K+', rating: '4.9', timeSaved: '30 hrs/week' }}
    />
  );
}

// TriageLens
export function TriageLensPage() {
  return (
    <AppLandingPage
      appName="TriageLens"
      tagline="Intelligent Ticket Prioritization & Routing"
      description="AI automatically prioritizes and routes support tickets. Focus your team on what matters most."
      primaryColor="#46A57B"
      category="Support Operations"
      features={[
        { title: 'AI Priority Scoring', description: 'AI analyzes tickets and assigns priority scores based on urgency and impact.', icon: Brain },
        { title: 'Smart Routing', description: 'Route tickets to agents based on skills, workload, and historical performance.', icon: Zap },
        { title: 'SLA Management', description: 'Automatically track SLAs and escalate tickets approaching breach.', icon: Clock },
        { title: 'Duplicate Detection', description: 'AI identifies and merges duplicate tickets automatically.', icon: Eye },
        { title: 'Sentiment Analysis', description: 'Prioritize tickets from angry or frustrated customers.', icon: TrendingUp },
        { title: 'Workload Balancing', description: 'Distribute tickets evenly to prevent agent overload.', icon: Users }
      ]}
      benefits={[
        { title: 'Reduce Escalations by 60%', description: 'Smart routing gets tickets to the right agent the first time.' },
        { title: 'Improve SLA Compliance', description: 'Automated tracking and escalation prevent SLA breaches.' },
        { title: 'Handle 40% More Volume', description: 'Efficient routing helps teams handle more tickets without growing.' },
        { title: 'Increase Agent Satisfaction', description: 'Balanced workloads and skill-based routing reduce burnout.' }
      ]}
      integrations={['Freshdesk', 'Zendesk', 'Jira Service Desk', 'ServiceNow', 'Front', 'Help Scout']}
      stats={{ users: '13K+', rating: '4.8', timeSaved: '16 hrs/week' }}
    />
  );
}
