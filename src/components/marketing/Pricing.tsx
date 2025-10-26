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
      'All 26 applications',
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
      {/* Background - INT Inc. brand gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#33475B] via-[#202D3A] to-[#33475B]" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 int-fade-in-up">
          <Badge className="int-badge-success mb-4">
            Transparent Pricing
          </Badge>
          <h2 className="int-h2 mb-4 text-white">
            Simple Pricing<span className="int-dot"></span> Powerful Platform
          </h2>
          <p className="int-body-lg text-gray-300 max-w-3xl mx-auto">
            Choose the plan that fits your team size and needs. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing cards - INT Inc. brand styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative int-card-interactive bg-[#F9FAFB] ${
                plan.popular
                  ? 'border-2 border-[#E27305] shadow-[0_0_30px_rgba(226,115,5,0.2)] lg:scale-105'
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="int-badge-premium shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1" />
                    MOST POPULAR
                  </Badge>
                </div>
              )}

              <CardHeader className="pt-8">
                <h3 className="int-h3 text-[#33475B] mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl text-[#33475B]" style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 800 }}>
                    {plan.price}
                  </span>
                  <span className="int-body-sm text-[#666666]">{plan.period}</span>
                </div>
                <p className="int-body-sm text-[#666666]">
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
                      <span className="int-body-sm text-[#666666]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA button - INT Inc. brand buttons */}
                <button
                  className={`w-full flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'int-btn-primary'
                      : 'int-btn-secondary'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ / Additional info */}
        <div className="text-center int-fade-in-up">
          <p className="int-body text-gray-300 mb-4">
            All plans include: SSL encryption • 99.9% uptime SLA • GDPR compliance • Regular updates
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 int-body-sm">
            <a href="#faq" className="text-[#529ADB] hover:text-[#67A6DF] transition-colors">
              View FAQ
            </a>
            <span className="text-gray-500">•</span>
            <a href="#compare" className="text-[#529ADB] hover:text-[#67A6DF] transition-colors">
              Compare Plans
            </a>
            <span className="text-gray-500">•</span>
            <a href="#contact" className="text-[#529ADB] hover:text-[#67A6DF] transition-colors">
              Contact Sales
            </a>
          </div>
        </div>

        {/* Volume discount callout */}
        <Card className="mt-12 int-card-interactive bg-gradient-to-r from-[#529ADB]/10 to-[#E27305]/10 border-[#529ADB]/30">
          <CardContent className="p-8 text-center">
            <h3 className="int-h3 text-[#33475B] mb-2">
              Need More Than 100 Users?
            </h3>
            <p className="int-body text-[#666666] mb-6">
              Contact our sales team for volume discounts and custom enterprise packages.
            </p>
            <button className="int-btn-primary px-8 py-3"
              onClick={() => window.location.href = '#contact'}>
              Talk to an Expert
            </button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}