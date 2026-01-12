import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, X, type LucideIcon } from 'lucide-react';
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
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Analytics': true,
    'Support': false,
    'Operations': false,
    'Productivity': false,
    'HR & Learning': false
  });
  
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

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
        style={{ fontFamily: "'Rubik', system-ui, sans-serif" }}
      >
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            {isExpanded && isMobile && (
              <span className="int-body-sm text-white">Menu</span>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggle}
              aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
              className="hover:bg-white/10 ml-auto text-white/70 hover:text-white"
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
          <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
            <TooltipProvider>
              <div className="space-y-2 px-3">
                {["Analytics", "Support", "Operations", "Productivity", "HR & Learning"].map((category) => {
                  const categoryApps = APPS.filter((app: any) => app.category === category);
                  if (categoryApps.length === 0) return null;
                  
                  const isCategoryExpanded = expandedCategories[category];

                  return (
                    <div key={category} className="mb-2">
                      {isExpanded ? (
                        <button
                          onClick={() => toggleCategory(category)}
                          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#A8B2C1] hover:text-white uppercase tracking-wider font-rubik transition-colors group"
                        >
                          <span>{category}</span>
                          <ChevronDown 
                            className={`w-3 h-3 transition-transform duration-200 ${isCategoryExpanded ? 'transform rotate-180' : ''}`}
                          />
                        </button>
                      ) : (
                        <div className="px-3 py-2 text-center border-t border-white/5 mt-2 first:mt-0 first:border-0">
                          <span className="text-[10px] text-[#A8B2C1] uppercase tracking-wider block mb-1">
                            {category.slice(0, 3)}
                          </span>
                        </div>
                      )}
                      
                      <div className={`space-y-1 transition-all duration-300 overflow-hidden ${
                        isExpanded && !isCategoryExpanded ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'
                      }`}>
                        {categoryApps.map((app) => {
                          const IconComponent = (Icons as any)[app.icon] as LucideIcon;
                          const isActive = currentPath === app.path;

                          return (
                            <Tooltip key={app.id} delayDuration={0}>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => onNavigate(app.path)}
                                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                    isActive
                                      ? 'bg-[#E27305]/20 text-[#E27305] border-l-2 border-[#E27305]'
                                      : 'text-[#A8B2C1] hover:bg-white/5 hover:text-white'
                                  }`}
                                  aria-label={app.name}
                                  aria-current={isActive ? 'page' : undefined}
                                  style={{ fontFamily: "'Rubik', system-ui, sans-serif", fontWeight: 600 }}
                                >
                                  <div
                                    className="flex-shrink-0 w-5 h-5"
                                    style={{ color: isActive ? '#E27305' : app.color }}
                                  >
                                    {IconComponent && <IconComponent className="w-5 h-5" />}
                                  </div>
                                  
                                  {isExpanded && (
                                    <div className="flex-1 text-left overflow-hidden">
                                      <div className="text-sm truncate">{app.name}</div>
                                    </div>
                                  )}

                                  {isActive && isExpanded && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#E27305]" />
                                  )}
                                </button>
                              </TooltipTrigger>
                              {!isExpanded && (
                                <TooltipContent side="right" className="bg-[#33475B] border-[#33475B]/20 text-white">
                                  <p style={{ fontFamily: "'Rubik', system-ui, sans-serif", fontWeight: 600 }}>{app.name}</p>
                                  <p className="text-xs text-gray-300" style={{ fontFamily: "'Roboto', system-ui, sans-serif" }}>{app.category}</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TooltipProvider>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className={`int-caption text-[#A8B2C1] ${isExpanded ? 'block' : 'hidden'}`}>
              <div>INT OS v2.5.0</div>
              <div className="mt-1 opacity-60">Build 2847</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}