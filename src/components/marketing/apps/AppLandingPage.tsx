import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { CheckCircle2, ArrowRight, Star, Users, Zap, Shield } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: any;
}

interface Benefit {
  title: string;
  description: string;
}

interface AppLandingPageProps {
  appName: string;
  tagline: string;
  description: string;
  heroImage?: string;
  features: Feature[];
  benefits: Benefit[];
  primaryColor: string;
  category: string;
  integrations?: string[];
  stats?: {
    users?: string;
    rating?: string;
    timeSaved?: string;
  };
}

export function AppLandingPage({
  appName,
  tagline,
  description,
  features,
  benefits,
  primaryColor,
  category,
  integrations = [],
  stats = { users: '10K+', rating: '4.9', timeSaved: '15 hrs/week' }
}: AppLandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2F4D]/50 to-[#0F1E33]/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
              {category}
            </Badge>
            <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {appName}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              {tagline}
            </p>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8 py-6" style={{ backgroundColor: primaryColor }}>
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white/20 text-white">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-[#529ADB]" />
                  <p className="text-2xl text-white">{stats.users}</p>
                </div>
                <p className="text-sm text-gray-400">Active Users</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-[#E27305]" />
                  <p className="text-2xl text-white">{stats.rating}</p>
                </div>
                <p className="text-sm text-gray-400">User Rating</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-[#46A57B]" />
                  <p className="text-2xl text-white">{stats.timeSaved}</p>
                </div>
                <p className="text-sm text-gray-400">Time Saved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-white">Powerful Features</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to supercharge your workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="bg-white/5 border-white/10 hover:border-white/30 transition-all">
                  <CardContent className="p-6">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${primaryColor}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: primaryColor }} />
                    </div>
                    <h3 className="text-xl text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl mb-4 text-white">Why Choose {appName}?</h2>
              <p className="text-xl text-gray-400">
                Built for teams that demand excellence
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, idx) => (
                <Card key={idx} className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: primaryColor }} />
                      <div>
                        <h3 className="text-xl text-white mb-2">{benefit.title}</h3>
                        <p className="text-gray-400">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      {integrations.length > 0 && (
        <section className="py-20 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl mb-4 text-white">Seamless Integrations</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Connect with your favorite tools
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center max-w-3xl mx-auto">
              {integrations.map((integration, idx) => (
                <Badge key={idx} variant="outline" className="px-4 py-2 text-sm bg-white/5 border-white/20">
                  {integration}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl mb-4 text-white">Ready to Get Started?</h2>
              <p className="text-xl text-gray-400 mb-8">
                Join thousands of teams using {appName} to work smarter
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6" style={{ backgroundColor: primaryColor }}>
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white/20 text-white">
                  Contact Sales
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#46A57B]" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#529ADB]" />
                  <span>Enterprise-grade security</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
