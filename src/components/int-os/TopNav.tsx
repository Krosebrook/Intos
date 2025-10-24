import { Command, Settings, User, Globe, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';

interface TopNavProps {
  onCommandPaletteOpen: () => void;
  currentApp?: string;
}

export function TopNav({ onCommandPaletteOpen, currentApp }: TopNavProps) {
  return (
    <nav 
      className="glass-effect fixed top-0 left-0 right-0 h-16 z-50 border-b border-white/10"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <a 
            href="/" 
            className="flex items-center gap-3 group"
            aria-label="INT OS Home"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#0097A9] to-[#FF6B35] rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <span className="text-white font-bold text-sm">INT</span>
            </div>
            <span className="text-lg font-semibold hidden sm:block">INT OS</span>
          </a>
          
          {currentApp && (
            <>
              <div className="w-px h-6 bg-white/20 hidden md:block" />
              <span className="text-sm text-[#A8B2C1] hidden md:block">{currentApp}</span>
            </>
          )}
        </div>

        {/* Center - Search/Command */}
        <button
          onClick={onCommandPaletteOpen}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-200 min-w-[300px]"
          aria-label="Open command palette"
        >
          <Search className="w-4 h-4 text-[#A8B2C1]" />
          <span className="text-sm text-[#A8B2C1] flex-1 text-left">Search or run command...</span>
          <kbd className="px-2 py-0.5 bg-white/10 rounded text-xs">⌘K</kbd>
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onCommandPaletteOpen}
            className="md:hidden"
            aria-label="Open command palette"
          >
            <Command className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Change language"
          >
            <Globe className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
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
              <AvatarFallback className="bg-[#0097A9] text-white text-sm">
                SC
              </AvatarFallback>
            </Avatar>
            <div className="text-left hidden lg:block">
              <div className="text-sm">Sarah Chen</div>
              <div className="text-xs text-[#A8B2C1]">Manager</div>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
