import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowRight } from 'lucide-react';
import { APPS } from '../../lib/constants';

interface ApplicationsGridProps {
  onAppClick?: (appId: string) => void;
}

export function ApplicationsGrid({ onAppClick }: ApplicationsGridProps) {
  return (
    <section id="applications" className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#1A2F4D] to-[#0A1628]" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#E27305]/20 text-[#E27305] border-[#E27305]/50">
            18 Integrated Applications
          </Badge>
          <h2 className="mb-4 text-white">
            One Platform, Endless Capabilities
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Each application is purpose-built for specific operations needs, yet seamlessly 
            integrated with the entire INT OS ecosystem.
          </p>
        </div>

        {/* Applications grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPS.filter(app => app.id !== 'home').map((app) => {
            const IconComponent = app.icon;
            const isMainApp = [
              'insights',
              'resolve',
              'connect',
              'flowforge',
              'sentiment',
              'alertops'
            ].includes(app.id);

            return (
              <Card
                key={app.id}
                className={`bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
                  isMainApp ? 'lg:col-span-1' : ''
                }`}
                onClick={() => onAppClick?.(app.id)}
              >
                <CardHeader>
                  {/* Icon and title */}
                  <div className="flex items-start justify-between mb-2">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: `${app.color}20`,
                        border: `1px solid ${app.color}40`
                      }}
                    >
                      <IconComponent
                        className="w-6 h-6"
                        style={{ color: app.color }}
                      />
                    </div>
                    {isMainApp && (
                      <Badge className="bg-[#E27305]/20 text-[#E27305] border-[#E27305]/50 text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl text-white">{app.name}</h3>
                </CardHeader>
                
                <CardContent>
                  {/* Description */}
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {getAppDescription(app.id)}
                  </p>

                  {/* Key features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {getAppFeatures(app.id).slice(0, 3).map((feature, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-xs bg-white/5 border-white/20 text-gray-300"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    variant="ghost"
                    className="w-full text-[#529ADB] hover:text-[#6AAEE5] hover:bg-[#529ADB]/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAppClick?.(app.id);
                    }}
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-[#E27305] hover:bg-[#F08515] text-white shadow-lg"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-sm text-gray-400 mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}

// Helper functions for content
function getAppDescription(appId: string): string {
  const descriptions: Record<string, string> = {
    insights: 'Unified analytics dashboard with real-time metrics, custom reports, and AI-powered insights for data-driven decision making.',
    resolve: 'AI-powered support desk with smart ticket routing, automated responses, and multi-channel support integration.',
    connect: 'CRM and contact management hub with pipeline tracking, lead scoring, and automated follow-ups.',
    flowforge: 'Visual workflow automation builder with drag-and-drop interface, conditional logic, and 100+ integrations.',
    sentiment: 'Real-time sentiment analysis across customer interactions with emotion detection and trend visualization.',
    alertops: 'Incident management and on-call routing with escalation policies, status pages, and post-mortem tools.',
    syncbot: 'Bot orchestration platform for managing chatbots, automation bots, and AI agents across channels.',
    academy: 'Learning management system with courses, certifications, progress tracking, and knowledge assessments.',
    pulse: 'Team health and engagement metrics with surveys, mood tracking, and actionable insights.',
    brain: 'AI-powered knowledge base with semantic search, automatic categorization, and smart recommendations.',
    triage: 'Intelligent ticket routing and priority queue management with ML-based urgency detection.',
    partner: 'Partner portal and collaboration workspace with shared resources, co-selling tools, and communication.',
    studio: 'No-code app builder for creating custom applications, forms, and dashboards without development.',
    feedback: 'Customer feedback collection and analysis with NPS, CSAT, sentiment tracking, and action items.',
    strategy: 'OKR and strategic planning tool with goal tracking, alignment views, and progress dashboards.',
    command: 'System administration and operations center with user management, audit logs, and configuration.',
    pulsechat: 'Team communication platform with channels, DMs, video calls, and screen sharing.',
    assurance: 'Compliance and security monitoring with policy enforcement, audit trails, and risk assessment.'
  };
  return descriptions[appId] || 'Powerful application to streamline your operations.';
}

function getAppFeatures(appId: string): string[] {
  const features: Record<string, string[]> = {
    insights: ['Real-time Dashboards', 'Custom Reports', 'Predictive Analytics', 'Data Export'],
    resolve: ['AI Ticket Routing', 'Multi-channel Support', 'SLA Management', 'Knowledge Base'],
    connect: ['Pipeline Management', 'Lead Scoring', 'Email Campaigns', 'Contact Enrichment'],
    flowforge: ['Visual Builder', 'Conditional Logic', '100+ Integrations', 'Version Control'],
    sentiment: ['Emotion Detection', 'Trend Analysis', 'Real-time Alerts', 'Custom Triggers'],
    alertops: ['Escalation Policies', 'On-call Scheduling', 'Status Pages', 'Post-mortems'],
    syncbot: ['Bot Management', 'Multi-channel Deploy', 'Analytics', 'A/B Testing'],
    academy: ['Course Builder', 'Certifications', 'Progress Tracking', 'Assessments'],
    pulse: ['Engagement Surveys', 'Mood Tracking', 'Team Insights', 'Action Plans'],
    brain: ['Semantic Search', 'Auto-categorization', 'Smart Suggestions', 'Version History'],
    triage: ['Priority Scoring', 'Smart Routing', 'Queue Management', 'SLA Tracking'],
    partner: ['Resource Sharing', 'Co-selling Tools', 'Communication', 'Deal Registration'],
    studio: ['Drag-and-drop', 'Custom Forms', 'Dashboards', 'API Integration'],
    feedback: ['NPS Surveys', 'CSAT Tracking', 'Sentiment Analysis', 'Action Items'],
    strategy: ['OKR Tracking', 'Goal Alignment', 'Progress Dashboards', 'Check-ins'],
    command: ['User Management', 'Audit Logs', 'Configuration', 'Security Settings'],
    pulsechat: ['Channels', 'Video Calls', 'File Sharing', 'Integrations'],
    assurance: ['Compliance Monitoring', 'Policy Enforcement', 'Risk Assessment', 'Audit Trails']
  };
  return features[appId] || ['Feature 1', 'Feature 2', 'Feature 3'];
}
