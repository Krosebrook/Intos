import { Button } from '../ui/button';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/badge';

interface HeroProps {
  onGetStarted?: () => void;
  onWatchDemo?: () => void;
}

export function Hero({ onGetStarted, onWatchDemo }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A2F4D] via-[#0F1E33] to-[#0A1628]" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#529ADB] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E27305] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#46A57B] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <Badge className="mb-6 bg-[#529ADB]/20 text-[#529ADB] border-[#529ADB]/50 hover:bg-[#529ADB]/30">
          <span className="mr-2">✨</span>
          Introducing INT OS v2.5 Scrollscape
        </Badge>

        {/* Main headline */}
        <h1 className="mb-6 max-w-4xl mx-auto">
          <span className="block text-white">
            Unify Your Operations with
          </span>
          <span className="block bg-gradient-to-r from-[#529ADB] via-[#E27305] to-[#46A57B] bg-clip-text text-transparent">
            18 AI-Powered Applications
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          INT OS is the unified platform for analytics, support, workflow automation, and team collaboration. 
          One login. One interface. Infinite possibilities.
        </p>

        {/* Feature highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm">
          {[
            'Real-time Analytics',
            'AI-Driven Automation',
            'Enterprise Security',
            'WCAG 2.2 AA Compliant'
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-[#46A57B]" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button
            size="lg"
            className="bg-[#E27305] hover:bg-[#F08515] text-white shadow-lg hover:shadow-xl transition-all duration-200 text-lg px-8"
            onClick={onGetStarted}
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-[#529ADB] text-[#529ADB] hover:bg-[#529ADB]/10 text-lg px-8"
            onClick={onWatchDemo}
          >
            <Play className="mr-2 w-5 h-5" />
            Watch Demo
          </Button>
        </div>

        {/* Social proof */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-gray-400">
            Trusted by operations teams at leading companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {/* Placeholder for company logos */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-32 h-12 bg-white/10 rounded flex items-center justify-center text-white/50"
              >
                Company {i}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
