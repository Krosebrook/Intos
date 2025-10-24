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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#0F1E33] to-[#0A1628]" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="mb-4 text-white">
            Everything You Need, Nothing You Don't
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            INT OS combines the best features from multiple tools into one unified platform,
            saving you time, money, and headaches.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: `${feature.color}20`,
                      border: `1px solid ${feature.color}40`
                    }}
                  >
                    <Icon
                      className="w-7 h-7"
                      style={{ color: feature.color }}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">
            And that's just the beginning...
          </p>
          <a
            href="#applications"
            className="text-[#529ADB] hover:text-[#6AAEE5] font-medium inline-flex items-center gap-2"
          >
            Explore All 18 Applications
            <Sparkles className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
