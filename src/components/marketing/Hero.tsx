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
      {/* Background - INT Inc. Primary Blue gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#33475B] via-[#202D3A] to-[#121920]" />
      
      {/* Animated background elements - INT Inc. brand colors */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#529ADB] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E27305] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#46A57B] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge - INT Inc. brand styling */}
        <Badge className="mb-6 bg-[#529ADB]/20 text-[#529ADB] border-[#529ADB]/50 hover:bg-[#529ADB]/30 int-fade-in-up"
          style={{ fontFamily: "'Rubik', system-ui, sans-serif", fontWeight: 600 }}>
          <span className="mr-2">✨</span>
          Introducing INT OS v2.5 Scrollscape
        </Badge>

        {/* Main headline - Rubik font, INT Inc. gradient */}
        <h1 className="mb-6 max-w-4xl mx-auto int-hero-h1 int-fade-in-up" 
            style={{ animationDelay: '100ms' }}>
          <span className="block text-white">
            Unify Your Operations with
          </span>
          <span className="block int-text-gradient">
            26 AI-Powered Applications
            <span className="int-dot-lg ml-2"></span>
          </span>
        </h1>

        {/* Subheadline - Roboto font */}
        <p className="int-body-lg text-gray-300 mb-8 max-w-3xl mx-auto int-fade-in-up" 
           style={{ animationDelay: '200ms' }}>
          INT OS is the unified platform for analytics, support, workflow automation, and team collaboration. 
          One login. One interface. Infinite possibilities.
        </p>

        {/* Feature highlights - INT Inc. green for checkmarks */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10 int-body-sm int-fade-in-up"
             style={{ animationDelay: '300ms' }}>
          {[
            'Real-time Analytics',
            'AI-Driven Automation',
            'Enterprise Security',
            'WCAG 2.2 AA Compliant'
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-[#46A57B]" />
              <span style={{ fontFamily: "'Roboto', system-ui, sans-serif" }}>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons - INT Inc. brand gradients */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 int-stagger-fade">
          <button
            className="int-btn-primary text-lg px-8 py-4 flex items-center gap-2 int-hover-lift"
            onClick={onGetStarted}
          >
            Start Your Project
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            className="int-btn-secondary text-lg px-8 py-4 flex items-center gap-2"
            onClick={onWatchDemo}
          >
            <Play className="w-5 h-5" />
            Watch Demo
          </button>
        </div>

        {/* Social proof */}
        <div className="flex flex-col items-center gap-4 int-fade-in-up" style={{ animationDelay: '400ms' }}>
          <p className="int-caption text-gray-400">
            Trusted by operations teams at leading companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {/* Placeholder for company logos */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-32 h-12 bg-white/10 rounded flex items-center justify-center text-white/50"
                style={{ fontFamily: "'Rubik', system-ui, sans-serif", fontWeight: 600 }}
              >
                Company {i}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-[#E27305] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}