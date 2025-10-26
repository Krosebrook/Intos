import { Card, CardContent } from '../ui/card';
import {
  BarChart3,
  Bot,
  Workflow,
  Shield,
  Zap,
  Users,
  Globe,
  MessageSquare,
  TrendingUp,
  Lock,
  RefreshCw,
  Sparkles
} from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Gain instant insights with live dashboards, custom reports, and predictive analytics powered by AI.',
    color: '#529ADB'
  },
  {
    icon: Bot,
    title: 'AI-Driven Automation',
    description: 'Automate workflows, route tickets intelligently, and let AI handle repetitive tasks.',
    color: '#E27305'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with RBAC, audit logging, and AI security policies to protect your data.',
    color: '#46A57B'
  },
  {
    icon: Workflow,
    title: 'Workflow Builder',
    description: 'Create custom automations with our visual workflow builder. No code required.',
    color: '#529ADB'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built as a PWA with offline support, sub-second load times, and instant updates.',
    color: '#E27305'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Built-in chat, video calls, and shared workspaces keep your team aligned.',
    color: '#46A57B'
  },
  {
    icon: Globe,
    title: 'Global Scale',
    description: 'Deployed across multiple regions with 99.9% uptime and automatic failover.',
    color: '#529ADB'
  },
  {
    icon: MessageSquare,
    title: 'Smart Assistant',
    description: 'AI assistant with context awareness helps you navigate and automate tasks.',
    color: '#E27305'
  },
  {
    icon: TrendingUp,
    title: 'Predictive Insights',
    description: 'Machine learning models forecast trends and recommend actions proactively.',
    color: '#46A57B'
  },
  {
    icon: Lock,
    title: 'Data Privacy',
    description: 'GDPR and CCPA compliant with granular data controls and encryption at rest.',
    color: '#529ADB'
  },
  {
    icon: RefreshCw,
    title: 'Seamless Integrations',
    description: 'Connect to HubSpot, Salesforce, Slack, Teams, and 100+ other tools.',
    color: '#E27305'
  },
  {
    icon: Sparkles,
    title: 'Continuous Innovation',
    description: 'Regular updates with new features, improvements, and AI model enhancements.',
    color: '#46A57B'
  }
];

export function Features() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Background - INT Inc. Primary Blue gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#33475B] via-[#202D3A] to-[#33475B]" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 int-fade-in-up">
          <h2 className="int-h2 mb-4 text-white">
            Everything You Need<span className="int-dot"></span> Nothing You Don't
          </h2>
          <p className="int-body-lg text-gray-300 max-w-3xl mx-auto">
            INT OS combines the best features from multiple tools into one unified platform,
            saving you time, money, and headaches.
          </p>
        </div>

        {/* Features grid - INT Inc. interactive cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 int-stagger-fade">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="int-card-interactive bg-[#F9FAFB]"
              >
                <CardContent className="p-6">
                  {/* Icon - INT Inc. brand gradient background */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 int-hover-scale"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}, ${feature.color}DD)`,
                      boxShadow: `0 4px 12px ${feature.color}30`
                    }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content - INT Inc. typography */}
                  <h3 className="int-h4 mb-2 text-[#33475B]">
                    {feature.title}
                  </h3>
                  <p className="int-body text-[#666666]">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 int-fade-in-up">
          <p className="int-body text-gray-300 mb-4">
            And that's just the beginning...
          </p>
          <a
            href="#applications"
            className="int-btn-secondary inline-flex items-center gap-2"
          >
            Explore All 26 Applications
            <Sparkles className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}