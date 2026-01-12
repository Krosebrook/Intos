import { Command, Settings, User, Globe, Search, Activity, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface TopNavProps {
  onCommandPaletteOpen: () => void;
  currentApp?: string;
}

export function TopNav({ onCommandPaletteOpen, currentApp }: TopNavProps) {
  // Mocked global health status
  const systemHealth = 'warning'; // 'healthy', 'warning', 'error'

  return (
    <nav 
      className="glass-effect fixed top-0 left-0 right-0 h-16 z-50 border-b border-white/10 backdrop-blur-md"
      role="navigation"
      aria-label="Main navigation"
      style={{ fontFamily: "'Rubik', system-ui, sans-serif" }}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <a 
            href="/" 
            className="flex items-center gap-3 group"
            aria-label="INT OS Home"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#E27305] to-[#46A57B] rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-md">
              <span className="text-white font-bold text-sm" style={{ fontFamily: "'Rubik', sans-serif" }}>INT</span>
            </div>
            <span className="text-lg text-white hidden sm:block" style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 700 }}>
              INT OS<span className="int-dot"></span>
            </span>
          </a>
          
          {currentApp && (
            <>
              <div className="w-px h-6 bg-white/20 hidden md:block" />
              <span className="int-body-sm text-[#A8B2C1] hidden md:block">{currentApp}</span>
            </>
          )}
        </div>

        {/* Center - Search/Command */}
        <button
          onClick={onCommandPaletteOpen}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 int-focus-ring rounded-lg transition-all duration-200 min-w-[300px]"
          aria-label="Open command palette"
        >
          <Search className="w-4 h-4 text-[#A8B2C1]" />
          <span className="int-body-sm text-[#A8B2C1] flex-1 text-left">Search or run command...</span>
          <kbd className="px-2 py-0.5 bg-white/10 rounded text-xs text-[#A8B2C1]" style={{ fontFamily: "'Roboto', monospace" }}>⌘K</kbd>
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* System Health Indicator */}
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors mr-2">
                  <div className={`w-2 h-2 rounded-full ${
                    systemHealth === 'healthy' ? 'bg-green-500' : 
                    systemHealth === 'warning' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500 animate-pulse'
                  }`} />
                  <span className="text-xs font-medium text-[#A8B2C1] hidden xl:block">System Status</span>
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-[#0F213C] border-white/10 text-white p-3">
                <div className="space-y-2">
                  <p className="font-semibold text-sm">System Health: Warning</p>
                  <div className="text-xs text-[#A8B2C1] space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-3 h-3 text-red-500" />
                      <span>Freshdesk: Auth Expired</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-3 h-3 text-green-500" />
                      <span>HubSpot: Operational</span>
                    </div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            variant="ghost"
            size="icon"
            onClick={onCommandPaletteOpen}
            className="md:hidden text-[#A8B2C1] hover:text-white hover:bg-white/10"
            aria-label="Open command palette"
          >
            <Command className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-[#A8B2C1] hover:text-white hover:bg-white/10"
            aria-label="Change language"
          >
            <Globe className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-[#A8B2C1] hover:text-white hover:bg-white/10"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </Button>

          <div className="w-px h-6 bg-white/20 hidden sm:block" />

          <button 
            className="flex items-center gap-2 hover:bg-white/5 rounded-lg p-1.5 transition-colors"
            aria-label="User menu"
          >
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gradient-to-br from-[#E27305] to-[#529ADB] text-white text-sm" style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 600 }}>
                SC
              </AvatarFallback>
            </Avatar>
            <div className="text-left hidden lg:block">
              <div className="int-body-sm text-white">Sarah Chen</div>
              <div className="int-caption text-[#A8B2C1]">Manager</div>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}