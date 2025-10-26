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
      className="glass-effect fixed top-0 left-0 right-0 h-16 z-50 border-b border-[#33475B]/20 bg-white/95 backdrop-blur-md"
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
            <span className="text-lg text-[#33475B] hidden sm:block" style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 700 }}>
              INT OS<span className="int-dot"></span>
            </span>
          </a>
          
          {currentApp && (
            <>
              <div className="w-px h-6 bg-[#33475B]/20 hidden md:block" />
              <span className="int-body-sm text-[#666666] hidden md:block">{currentApp}</span>
            </>
          )}
        </div>

        {/* Center - Search/Command */}
        <button
          onClick={onCommandPaletteOpen}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#F9FAFB] hover:bg-[#F2F6F9] border border-[#33475B]/10 int-focus-ring rounded-lg transition-all duration-200 min-w-[300px]"
          aria-label="Open command palette"
        >
          <Search className="w-4 h-4 text-[#666666]" />
          <span className="int-body-sm text-[#666666] flex-1 text-left">Search or run command...</span>
          <kbd className="px-2 py-0.5 bg-[#33475B]/10 rounded text-xs text-[#33475B]" style={{ fontFamily: "'Roboto', monospace" }}>⌘K</kbd>
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onCommandPaletteOpen}
            className="md:hidden text-[#33475B] hover:bg-[#33475B]/10"
            aria-label="Open command palette"
          >
            <Command className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-[#33475B] hover:bg-[#33475B]/10"
            aria-label="Change language"
          >
            <Globe className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-[#33475B] hover:bg-[#33475B]/10"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </Button>

          <div className="w-px h-6 bg-[#33475B]/20 hidden sm:block" />

          <button 
            className="flex items-center gap-2 hover:bg-[#33475B]/5 rounded-lg p-1.5 transition-colors"
            aria-label="User menu"
          >
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gradient-to-br from-[#E27305] to-[#529ADB] text-white text-sm" style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 600 }}>
                SC
              </AvatarFallback>
            </Avatar>
            <div className="text-left hidden lg:block">
              <div className="int-body-sm text-[#33475B]">Sarah Chen</div>
              <div className="int-caption text-[#666666]">Manager</div>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}