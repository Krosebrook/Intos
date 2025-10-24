import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, type LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { APPS } from '../../lib/constants';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ currentPath, onNavigate, isExpanded: controlledExpanded, onToggle }: SidebarProps) {
  const [internalExpanded, setInternalExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={handleToggle}
        />
      )}

      <aside
        className={`fixed left-0 top-16 bottom-0 glass-effect border-r border-white/10 transition-all duration-300 z-40 ${
          isExpanded ? 'w-72' : 'w-20'
        } ${isMobile && !isExpanded ? '-translate-x-full' : 'translate-x-0'}`}
        role="navigation"
        aria-label="App navigation"
      >
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            {isExpanded && isMobile && (
              <span className="text-sm">Menu</span>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggle}
              aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
              className="hover:bg-white/10 ml-auto"
            >
              {isMobile && isExpanded ? (
                <X className="w-5 h-5" />
              ) : isExpanded ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <TooltipProvider>
              <div className="space-y-1 px-3">
                {APPS.map((app) => {
                  const IconComponent = (Icons as any)[app.icon] as LucideIcon;
                  const isActive = currentPath === app.path;

                  return (
                    <Tooltip key={app.id} delayDuration={0}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => onNavigate(app.path)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                            isActive
                              ? 'bg-[#00E5FF]/20 text-[#00E5FF] border-l-2 border-[#00E5FF]'
                              : 'text-[#A8B2C1] hover:bg-white/5 hover:text-white'
                          }`}
                          aria-label={app.name}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <div
                            className="flex-shrink-0 w-5 h-5"
                            style={{ color: isActive ? app.color : undefined }}
                          >
                            {IconComponent && <IconComponent className="w-5 h-5" />}
                          </div>
                          
                          {isExpanded && (
                            <div className="flex-1 text-left overflow-hidden">
                              <div className="text-sm truncate">{app.name}</div>
                            </div>
                          )}

                          {isActive && isExpanded && (
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                          )}
                        </button>
                      </TooltipTrigger>
                      {!isExpanded && (
                        <TooltipContent side="right" className="bg-[#172235] border-white/10">
                          <p>{app.name}</p>
                          <p className="text-xs text-[#A8B2C1]">{app.description}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </div>
            </TooltipProvider>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className={`text-xs text-[#A8B2C1] ${isExpanded ? 'block' : 'hidden'}`}>
              <div>INT OS v2.5.0</div>
              <div className="mt-1 opacity-60">Build 2847</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}