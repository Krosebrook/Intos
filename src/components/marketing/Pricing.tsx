import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$49',
    period: '/user/month',
    description: 'Perfect for small teams getting started with operational efficiency.',
    features: [
      'Up to 5 applications',
      '10 users included',
      'Basic analytics & reporting',
      'Email support',
      'Community access',
      '5GB storage per user',
      'Standard integrations'
    ],
    cta: 'Start Free Trial',
    color: '#529ADB',
    popular: false
  },
  {
    name: 'Professional',
    price: '$99',
    period: '/user/month',
    description: 'For growing teams that need advanced features and AI automation.',
    features: [
      'All 18 applications',
      'Unlimited users',
      'Advanced analytics & AI insights',
      'Priority support (24/7)',
      'Custom workflows',
      '50GB storage per user',
      'Premium integrations',
      'API access',
      'Custom branding'
    ],
    cta: 'Start Free Trial',
    color: '#E27305',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'Tailored solutions for large organizations with specific requirements.',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Custom SLAs & uptime guarantees',
      'Advanced security & compliance',
      'On-premise deployment option',
      'Unlimited storage',
      'Custom integrations',
      'Training & onboarding',
      'Data migration assistance'
    ],
    cta: 'Contact Sales',
    color: '#46A57B',
    popular: false
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#0F1E33] to-[#1A2F4D]" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#46A57B]/20 text-[#46A57B] border-[#46A57B]/50">
            Transparent Pricing
          </Badge>
          <h2 className="mb-4 text-white">
            Simple Pricing, Powerful Platform
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the plan that fits your team size and needs. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/30 transition-all duration-300 ${
                plan.popular
                  ? 'ring-2 ring-[#E27305] shadow-xl lg:-translate-y-4'
                  : 'hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[#E27305] text-white border-[#E27305] shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="pt-8">
                <h3 className="text-2xl text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="pt-6">
                {/* Features list */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check
                        className="w-5 h-5 mt-0.5 flex-shrink-0"
                        style={{ color: plan.color }}
                      />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-[#E27305] hover:bg-[#F08515] text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ / Additional info */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            All plans include: SSL encryption • 99.9% uptime SLA • GDPR compliance • Regular updates
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href="#faq" className="text-[#529ADB] hover:text-[#6AAEE5]">
              View FAQ
            </a>
            <span className="text-gray-600">•</span>
            <a href="#compare" className="text-[#529ADB] hover:text-[#6AAEE5]">
              Compare Plans
            </a>
            <span className="text-gray-600">•</span>
            <a href="#contact" className="text-[#529ADB] hover:text-[#6AAEE5]">
              Contact Sales
            </a>
          </div>
        </div>

        {/* Volume discount callout */}
        <Card className="mt-12 bg-gradient-to-r from-[#529ADB]/10 to-[#E27305]/10 border-white/20 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl text-white mb-2">
              Need More Than 100 Users?
            </h3>
            <p className="text-gray-300 mb-6">
              Contact our sales team for volume discounts and custom enterprise packages.
            </p>
            <Button
              size="lg"
              className="bg-[#E27305] hover:bg-[#F08515] text-white"
            >
              Schedule a Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
