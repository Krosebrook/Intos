import { Sparkles, Keyboard, Zap, Globe, ChevronRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface WelcomeProps {
  onDismiss: () => void;
}

export function Welcome({ onDismiss }: WelcomeProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full p-8 card-gradient border-white/10 relative">
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-[#A8B2C1] hover:text-white transition-colors"
          aria-label="Close welcome"
        >
          ✕
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#0097A9] to-[#FF6B35] rounded-2xl flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Welcome to INT OS v2.5</h2>
          <p className="text-lg text-[#A8B2C1]">
            Your unified workspace for intelligent automation and insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-[#0097A9]/20 flex items-center justify-center mb-3">
              <Keyboard className="w-5 h-5 text-[#0097A9]" />
            </div>
            <h3 className="font-medium mb-2">Keyboard Shortcuts</h3>
            <div className="space-y-2 text-sm text-[#A8B2C1]">
              <div className="flex items-center justify-between">
                <span>Command Palette</span>
                <Badge variant="outline" className="border-white/20">⌘K</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Toggle AI Assistant</span>
                <Badge variant="outline" className="border-white/20">⌘I</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Toggle Sidebar</span>
                <Badge variant="outline" className="border-white/20">⌘B</Badge>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-[#FF6B35]/20 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <h3 className="font-medium mb-2">Live Automations</h3>
            <div className="space-y-2 text-sm text-[#A8B2C1]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2ECC71]" />
                <span>HubSpot → ConnectDesk sync</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2ECC71]" />
                <span>Freshdesk → ResolveDesk intake</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2ECC71]" />
                <span>Teams → SyncBot summaries</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-[#40B4E5]/20 flex items-center justify-center mb-3">
              <Globe className="w-5 h-5 text-[#40B4E5]" />
            </div>
            <h3 className="font-medium mb-2">26 Integrated Apps</h3>
            <p className="text-sm text-[#A8B2C1]">
              From analytics to support, from automation to sentiment analysis—everything 
              you need in one unified platform.
            </p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-lg bg-gradient-to-br from-[#0097A9]/10 to-transparent">
            <div className="w-10 h-10 rounded-full bg-[#0097A9]/20 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-[#0097A9]" />
            </div>
            <h3 className="font-medium mb-2">AI-Powered Insights</h3>
            <p className="text-sm text-[#A8B2C1]">
              Get intelligent recommendations, automated responses, and real-time alerts 
              powered by advanced AI.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onDismiss}
            className="flex-1 bg-[#0097A9] hover:bg-[#00B8CC]"
          >
            Get Started
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-white/20"
            onClick={onDismiss}
          >
            Take a Tour
          </Button>
        </div>

        <div className="mt-6 text-center text-xs text-[#A8B2C1]">
          <p>Built with React, Tailwind CSS, and shadcn/ui • Designed for Figma Make</p>
        </div>
      </Card>
    </div>
  );
}
