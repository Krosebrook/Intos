import { useState, useEffect } from 'react';
import { ParticleField } from './components/int-os/ParticleField';
import { TopNav } from './components/int-os/TopNav';
import { Sidebar } from './components/int-os/Sidebar';
import { RightAssistant } from './components/int-os/RightAssistant';
import { CommandPalette } from './components/int-os/CommandPalette';
import { Welcome } from './components/int-os/Welcome';
import { LandingPage } from './components/int-os/LandingPage';
import { Toaster } from './components/ui/sonner';
import { APPS } from './lib/constants';

// App imports
import { InsightHub } from './components/apps/InsightHub';
import { ResolveDesk } from './components/apps/ResolveDesk';
import { ConnectDesk } from './components/apps/ConnectDesk';
import { FlowForge } from './components/apps/FlowForge';
import { SentimentScope } from './components/apps/SentimentScope';
import { AlertOps } from './components/apps/AlertOps';
import { SyncBotPanel } from './components/apps/SyncBotPanel';
import { AcademyPortal } from './components/apps/AcademyPortal';
import { PulseBoard } from './components/apps/PulseBoard';
import { BrainDock } from './components/apps/BrainDock';
import { TriageLens } from './components/apps/TriageLens';
import { GenericApp } from './components/apps/GenericApp';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentPath, setCurrentPath] = useState('/insights');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-collapse sidebar on mobile
      if (window.innerWidth < 768) {
        setIsSidebarExpanded(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check if user has visited before
  useEffect(() => {
    const hasVisited = localStorage.getItem('int-os-visited');
    if (hasVisited) {
      setShowLanding(false);
      setShowWelcome(false);
    }
  }, []);

  const handleEnterApp = () => {
    localStorage.setItem('int-os-visited', 'true');
    setShowLanding(false);
    setShowWelcome(true);
  };

  // Keyboard shortcuts
  useEffect(() => {
    if (showLanding) return; // Disable shortcuts on landing page

    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K for command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      // Command/Ctrl + I for assistant
      if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
        e.preventDefault();
        setIsAssistantOpen(!isAssistantOpen);
      }
      // Command/Ctrl + B for sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setIsSidebarExpanded(!isSidebarExpanded);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAssistantOpen, isSidebarExpanded, showLanding]);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Close sidebar on mobile after navigation
    if (isMobile) {
      setIsSidebarExpanded(false);
    }
  };

  const currentApp = APPS.find(app => app.path === currentPath);

  // Render the current app
  const renderApp = () => {
    switch (currentPath) {
      case '/insights':
        return <InsightHub />;
      case '/resolve':
        return <ResolveDesk />;
      case '/connect':
        return <ConnectDesk />;
      case '/flow':
        return <FlowForge />;
      case '/sentiment':
        return <SentimentScope />;
      case '/alerts':
        return <AlertOps />;
      case '/syncbot':
        return <SyncBotPanel />;
      case '/academy':
        return <AcademyPortal />;
      case '/pulse':
        return <PulseBoard />;
      case '/brain':
        return <BrainDock />;
      case '/triage':
        return <TriageLens />;
      default:
        // Use GenericApp for other apps
        const app = APPS.find(a => a.path === currentPath);
        if (app) {
          return (
            <GenericApp
              title={app.name}
              icon={app.icon}
              description={app.description}
              color={app.color}
            />
          );
        }
        return <InsightHub />;
    }
  };

  // Show landing page first
  if (showLanding) {
    return <LandingPage onEnterApp={handleEnterApp} />;
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Fixed Background with Particles */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#1A2F4D] to-[#0F1E33]" style={{ zIndex: -1 }} />
      <ParticleField />

      {/* Top Navigation */}
      <TopNav
        onCommandPaletteOpen={() => setIsCommandPaletteOpen(true)}
        currentApp={currentApp?.name}
      />

      {/* Sidebar */}
      <Sidebar 
        currentPath={currentPath} 
        onNavigate={handleNavigate}
        isExpanded={isSidebarExpanded}
        onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
      />

      {/* Main Content Area - Responsive padding */}
      <main
        className={`pt-16 min-h-screen transition-all duration-300 pl-0 ${
          isSidebarExpanded ? 'md:pl-72' : 'md:pl-20'
        } ${isAssistantOpen ? 'md:pr-80 lg:pr-96' : 'pr-0'}`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl">
          {renderApp()}
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-12 py-6">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#A8B2C1]">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
                <span>© 2025 INT OS v2.5.0</span>
                <button className="hover:text-white transition-colors">
                  Feedback
                </button>
                <button 
                  className="hover:text-white transition-colors"
                  onClick={() => setIsAssistantOpen(!isAssistantOpen)}
                >
                  Accessibility
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <select className="bg-white/5 border border-white/10 rounded px-3 py-1 text-xs sm:text-sm">
                  <option>English</option>
                  <option>Español</option>
                  <option>Français</option>
                  <option>العربية</option>
                </select>
                <button className="text-[#0097A9] hover:text-[#00B8CC] transition-colors">
                  Documentation →
                </button>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Right Assistant Drawer */}
      <RightAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Welcome Modal */}
      {showWelcome && <Welcome onDismiss={() => setShowWelcome(false)} />}

      {/* Toast Notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#172235',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#FFFFFF',
          },
        }}
      />

      {/* AI Assistant Toggle Button (Mobile) */}
      <button
        onClick={() => setIsAssistantOpen(!isAssistantOpen)}
        className="fixed bottom-6 right-6 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#00D9FF] to-[#5B8DEE] rounded-full shadow-lg flex items-center justify-center md:hidden z-50 hover:scale-110 transition-transform hover:shadow-[0_0_20px_rgba(0,217,255,0.4)]"
        aria-label="Toggle AI Assistant"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </button>

      {/* Mobile Sidebar Toggle */}
      {isMobile && !isSidebarExpanded && (
        <button
          onClick={() => setIsSidebarExpanded(true)}
          className="fixed bottom-6 left-6 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-white/20 transition-all"
          aria-label="Open Menu"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
    </div>
  );
}