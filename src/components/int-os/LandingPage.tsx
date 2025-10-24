import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Monitor,
  Smartphone,
  Download,
  Zap,
  Shield,
  BarChart3,
  Users,
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Globe,
  Layers,
  Command,
} from 'lucide-react';
import { ParticleField } from './ParticleField';

interface LandingPageProps {
  onEnterApp: () => void;
}

export function LandingPage({ onEnterApp }: LandingPageProps) {
  const [deviceType, setDeviceType] = useState<'desktop' | 'mobile'>('desktop');
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Detect device type
    const checkDevice = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setDeviceType(isMobile ? 'mobile' : 'desktop');
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    // Listen for PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // Fallback if PWA prompt not available
      alert('To install:\n\nDesktop: Click the install icon in your browser\'s address bar\n\nMobile: Tap Share > Add to Home Screen');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Real-time Analytics',
      description: 'Live dashboards and business intelligence across all integrations',
      color: '#00E5FF',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI-Powered Automation',
      description: 'Intelligent routing, sentiment analysis, and predictive insights',
      color: '#B794F6',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Team Collaboration',
      description: 'Unified workspace for support, CRM, and team health monitoring',
      color: '#48E5AC',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Workflow Automation',
      description: 'Visual workflow builder with triggers and multi-stage processes',
      color: '#FF7A50',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with role-based access and audit trails',
      color: '#34D399',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: '18 Integrated Apps',
      description: 'Complete suite for support, analytics, learning, and operations',
      color: '#6B9FFF',
    },
  ];

  const apps = [
    'InsightHub', 'ResolveDesk', 'ConnectDesk', 'FlowForge',
    'SentimentScope', 'AlertOps', 'SyncBotPanel', 'AcademyPortal',
    'PulseBoard', 'BrainDock', 'TriageLens', 'StrategyBoard',
    'FeedbackLoop', 'PulseChat', 'CommandView', 'AssuranceBoard',
    'PartnerHub', 'INT_Studio'
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Fixed Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#1A2F4D] to-[#0F1E33]" style={{ zIndex: -1 }} />
      <ParticleField />

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-[#00E5FF]/30 text-[#00E5FF] border-[#00E5FF]/60 text-xs sm:text-sm px-3 py-1">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              INT OS v2.5 Scrollscape
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-7xl mb-4 sm:mb-6">
              Your Unified
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#6B9FFF] to-[#B794F6]">
                Operations Platform
              </span>
            </h1>
            <p className="text-base sm:text-xl text-[#E2E8F0] max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
              18 AI-powered apps for support, analytics, automation, and team management.
              Built for HubSpot, Freshdesk, and Teams integrations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-12 px-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-[#00E5FF] to-[#6B9FFF] hover:from-[#33EBFF] hover:to-[#8FB3FF] text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all"
                onClick={onEnterApp}
              >
                Launch App
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              {showInstallPrompt && (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-[#00E5FF]/60 text-[#00E5FF] hover:bg-[#00E5FF]/20 hover:border-[#00E5FF] text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14"
                  onClick={handleInstall}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Install {deviceType === 'mobile' ? 'Mobile' : 'Desktop'} App
                </Button>
              )}
            </div>

            {/* Device Type Badge */}
            <div className="flex items-center justify-center gap-3 text-sm text-[#E2E8F0]">
              {deviceType === 'desktop' ? (
                <>
                  <Monitor className="w-4 h-4 text-[#00E5FF]" />
                  <span>Optimized for Desktop Experience</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-4 h-4 text-[#00E5FF]" />
                  <span>Optimized for Mobile Experience</span>
                </>
              )}
            </div>
          </div>

          {/* Install Instructions Card */}
          {deviceType === 'mobile' && (
            <Card className="max-w-lg mx-auto mb-12 sm:mb-16 p-4 sm:p-6 card-gradient border-[#00E5FF]/40 border-l-4 border-l-[#00E5FF]">
              <div className="flex items-start gap-3 sm:gap-4">
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-[#00E5FF] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg mb-2">Install Mobile App</h3>
                  <p className="text-xs sm:text-sm text-[#E2E8F0] mb-3">
                    For the best mobile experience, install INT OS as a native app:
                  </p>
                  <ol className="text-xs sm:text-sm text-[#E2E8F0] space-y-2 list-decimal list-inside">
                    <li>Tap the Share button in your browser</li>
                    <li>Select "Add to Home Screen"</li>
                    <li>Tap "Add" to install</li>
                  </ol>
                </div>
              </div>
            </Card>
          )}

          {deviceType === 'desktop' && (
            <Card className="max-w-lg mx-auto mb-12 sm:mb-16 p-4 sm:p-6 card-gradient border-[#00E5FF]/40 border-l-4 border-l-[#00E5FF]">
              <div className="flex items-start gap-3 sm:gap-4">
                <Monitor className="w-5 h-5 sm:w-6 sm:h-6 text-[#00E5FF] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg mb-2">Install Desktop App</h3>
                  <p className="text-xs sm:text-sm text-[#E2E8F0] mb-3">
                    Install INT OS as a standalone desktop application:
                  </p>
                  <ol className="text-xs sm:text-sm text-[#E2E8F0] space-y-2 list-decimal list-inside">
                    <li>Look for the install icon in your browser's address bar</li>
                    <li>Click "Install" or "Add to Desktop"</li>
                    <li>Launch from your desktop or app menu</li>
                  </ol>
                </div>
              </div>
            </Card>
          )}

          {/* Features Grid */}
          <div className="mb-12 sm:mb-20">
            <h2 className="text-center mb-8 sm:mb-12 text-2xl sm:text-3xl">
              Everything You Need in One Platform
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {features.map((feature, i) => (
                <Card
                  key={i}
                  className="p-4 sm:p-6 card-gradient border-white/10 hover:border-[#0097A9]/50 transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <div style={{ color: feature.color }}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#A8B2C1]">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Apps Overview */}
          <div className="mb-12 sm:mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl mb-4">18 Integrated Applications</h2>
              <p className="text-sm sm:text-base text-[#A8B2C1] max-w-2xl mx-auto px-4">
                Complete suite covering analytics, support, automation, learning, and team operations
              </p>
            </div>
            <Card className="p-6 sm:p-8 card-gradient border-white/10">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {apps.map((app, i) => (
                  <div
                    key={i}
                    className="p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer text-center"
                  >
                    <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-[#0097A9] mx-auto mb-2" />
                    <p className="text-xs sm:text-sm">{app}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Technical Specs */}
          <div className="mb-12 sm:mb-20">
            <h2 className="text-center mb-8 sm:mb-12 text-2xl sm:text-3xl">
              Studio-Grade Engineering
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6 card-gradient border-white/10 text-center">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#2ECC71] mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg mb-2">WCAG 2.2 AA</h3>
                <p className="text-xs sm:text-sm text-[#A8B2C1]">
                  Fully accessible with screen reader support
                </p>
              </Card>
              <Card className="p-4 sm:p-6 card-gradient border-white/10 text-center">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#40B4E5] mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg mb-2">Responsive</h3>
                <p className="text-xs sm:text-sm text-[#A8B2C1]">
                  Mobile-first design adapts to any screen
                </p>
              </Card>
              <Card className="p-4 sm:p-6 card-gradient border-white/10 text-center">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#9B59B6] mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg mb-2">Shadcn/UI</h3>
                <p className="text-xs sm:text-sm text-[#A8B2C1]">
                  Built with production-ready components
                </p>
              </Card>
              <Card className="p-4 sm:p-6 card-gradient border-white/10 text-center">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#F1C40F] mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg mb-2">No-Code Ready</h3>
                <p className="text-xs sm:text-sm text-[#A8B2C1]">
                  Export-ready for no-code platforms
                </p>
              </Card>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <Card className="max-w-2xl mx-auto mb-12 sm:mb-20 p-6 sm:p-8 card-gradient border-white/10">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Command className="w-5 h-5 sm:w-6 sm:h-6 text-[#0097A9]" />
              <h3 className="text-lg sm:text-xl">Keyboard Shortcuts</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-[#A8B2C1]">Command Palette</span>
                <Badge variant="outline" className="text-xs">⌘K</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-[#A8B2C1]">AI Assistant</span>
                <Badge variant="outline" className="text-xs">⌘I</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-[#A8B2C1]">Toggle Sidebar</span>
                <Badge variant="outline" className="text-xs">⌘B</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-[#A8B2C1]">Navigation</span>
                <Badge variant="outline" className="text-xs">⌘1-9</Badge>
              </div>
            </div>
          </Card>

          {/* Final CTA */}
          <div className="text-center">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-[#0097A9] to-[#00B8CC] hover:from-[#00B8CC] hover:to-[#0097A9] text-base sm:text-lg px-8 sm:px-12 h-12 sm:h-14 mb-4"
              onClick={onEnterApp}
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-xs sm:text-sm text-[#A8B2C1]">
              No installation required • Works in any modern browser
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 py-6 sm:py-8 mt-12 sm:mt-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#A8B2C1]">
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <span>© 2025 INT OS v2.5.0</span>
                <button className="hover:text-white transition-colors">Documentation</button>
                <button className="hover:text-white transition-colors">Support</button>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-xs">Studio-Grade</Badge>
                <Badge variant="outline" className="text-xs">WCAG 2.2 AA</Badge>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}