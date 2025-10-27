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

// Background image import
import backgroundImage from 'figma:asset/218c0e5250419e02190c065fae4907c6d7e6f64f.png';

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
import { UnifiedInbox } from './components/apps/UnifiedInbox';
import { KnowledgeHub } from './components/apps/KnowledgeHub';
import { IntegrationHub } from './components/apps/IntegrationHub';
import { WorkflowEngine } from './components/apps/WorkflowEngine';
import { CalendarSync } from './components/apps/CalendarSync';
import { FileVault } from './components/apps/FileVault';
import { AnalyticsStudio } from './components/apps/AnalyticsStudio';
import { SurveyCenter } from './components/apps/SurveyCenter';
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
      case '/inbox':
        return <UnifiedInbox />;
      case '/knowledge':
        return <KnowledgeHub />;
      case '/integrations':
        return <IntegrationHub />;
      case '/workflows':
        return <WorkflowEngine />;
      case '/calendar':
        return <CalendarSync />;
      case '/files':
        return <FileVault />;
      case '/analytics':
        return <AnalyticsStudio />;
      case '/surveys':
        return <SurveyCenter />;
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
      {/* Fixed background image - stays in place while content scrolls */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          zIndex: -2
        }} 
      />
      
      {/* Overlay for better text readability */}
      <div 
        className="fixed inset-0 bg-gradient-to-b from-[#33475B]/40 via-[#33475B]/20 to-[#33475B]/60"
        style={{ zIndex: -1 }} 
      />

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
        <footer className="border-t border-white/20 mt-12 py-6 bg-[#33475B]/80 backdrop-blur-md">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 int-body-sm text-white/80">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
                <span style={{ fontFamily: "'Roboto', system-ui, sans-serif" }}>© 2025 INT OS v2.5.0</span>
                <button className="hover:text-[#E27305] transition-colors" style={{ fontFamily: "'Roboto', system-ui, sans-serif" }}>
                  Feedback
                </button>
                <button 
                  className="hover:text-[#E27305] transition-colors"
                  onClick={() => setIsAssistantOpen(!isAssistantOpen)}
                  style={{ fontFamily: "'Roboto', system-ui, sans-serif" }}
                >
                  Accessibility
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <select className="bg-white/10 border border-white/30 rounded px-3 py-1 text-white backdrop-blur-sm int-focus-ring" style={{ fontFamily: "'Roboto', system-ui, sans-serif" }}>
                  <option className="bg-[#33475B] text-white">English</option>
                  <option className="bg-[#33475B] text-white">Español</option>
                  <option className="bg-[#33475B] text-white">Français</option>
                  <option className="bg-[#33475B] text-white">العربية</option>
                </select>
                <button className="text-[#E27305] hover:text-[#F08515] transition-colors" style={{ fontFamily: "'Rubik', system-ui, sans-serif", fontWeight: 600 }}>
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
            background: 'rgba(51, 71, 91, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            fontFamily: "'Roboto', system-ui, sans-serif",
          },
        }}
      />

      {/* AI Assistant Toggle Button (Mobile) */}
      <button
        onClick={() => setIsAssistantOpen(!isAssistantOpen)}
        className="fixed bottom-6 right-6 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#E27305] to-[#46A57B] rounded-full shadow-lg flex items-center justify-center md:hidden z-50 hover:scale-110 transition-transform hover:shadow-[0_0_20px_rgba(226,115,5,0.4)]"
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
          className="fixed bottom-6 left-6 w-12 h-12 bg-white/90 backdrop-blur-sm border-2 border-[#33475B]/20 rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-white hover:border-[#E27305]/30 transition-all"
          aria-label="Open Menu"
        >
          <svg
            className="w-6 h-6 text-[#33475B]"
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