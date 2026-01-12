import { useEffect, useState } from 'react';
import { Search, ArrowRight, type LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';
import { APPS } from '../../lib/constants';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

interface Command {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  category: string;
  keywords?: string[];
}

export function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Build commands
  const commands: Command[] = [
    ...APPS.map((app) => ({
      id: `nav-${app.id}`,
      label: `Go to ${app.name}`,
      icon: app.icon,
      action: () => {
        onNavigate(app.path);
        onClose();
      },
      category: (app as any).category || 'Navigation',
      keywords: [app.name.toLowerCase(), app.description.toLowerCase()],
    })),
    {
      id: 'toggle-assistant',
      label: 'Toggle AI Assistant',
      icon: 'Sparkles',
      action: () => {
        onClose();
      },
      category: 'Actions',
    },
    {
      id: 'new-ticket',
      label: 'Create new ticket',
      icon: 'Plus',
      action: () => {
        onClose();
      },
      category: 'Actions',
    },
    {
      id: 'run-automation',
      label: 'Run automation',
      icon: 'Zap',
      action: () => {
        onClose();
      },
      category: 'Actions',
    },
  ];

  // Filter commands based on search
  const filteredCommands = search
    ? commands.filter((cmd) => {
        const searchLower = search.toLowerCase();
        return (
          cmd.label.toLowerCase().includes(searchLower) ||
          cmd.keywords?.some((kw) => kw.includes(searchLower))
        );
      })
    : commands;

  // Group commands by category
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) {
      acc[cmd.category] = [];
    }
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) {
      setSearch('');
      setSelectedIndex(0);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filteredCommands.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 gap-0 bg-[#0F213C] border-white/10 max-w-2xl">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search className="w-5 h-5 text-[#A8B2C1]" />
          <input
            type="text"
            placeholder="Search apps, run commands..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-[#A8B2C1]"
            autoFocus
          />
          <kbd className="px-2 py-1 bg-white/10 rounded text-xs text-[#A8B2C1]">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {Object.keys(groupedCommands).length === 0 ? (
            <div className="p-8 text-center text-[#A8B2C1]">
              <p>No results found</p>
            </div>
          ) : (
            Object.entries(groupedCommands).map(([category, cmds]) => (
              <div key={category} className="py-2">
                <div className="px-4 py-2 text-xs text-[#A8B2C1] uppercase tracking-wider">
                  {category}
                </div>
                <div>
                  {cmds.map((cmd, index) => {
                    const globalIndex = filteredCommands.indexOf(cmd);
                    const isSelected = globalIndex === selectedIndex;
                    const IconComponent = (Icons as any)[cmd.icon] as LucideIcon;

                    return (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors ${
                          isSelected
                            ? 'bg-[#0097A9]/20 text-white'
                            : 'text-[#A8B2C1] hover:bg-white/5'
                        }`}
                      >
                        {IconComponent && <IconComponent className="w-5 h-5" />}
                        <span className="flex-1 text-left text-sm">{cmd.label}</span>
                        {isSelected && <ArrowRight className="w-4 h-4" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 text-xs text-[#A8B2C1]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↵</kbd> Select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded">ESC</kbd> Close
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
