import { X, Sparkles, Clock, TrendingUp } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { generateActivityFeed } from '../../lib/mock-data';

interface RightAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RightAssistant({ isOpen, onClose }: RightAssistantProps) {
  const activities = generateActivityFeed(12);

  if (!isOpen) return null;

  return (
    <aside
      className="fixed right-0 top-16 bottom-0 w-80 md:w-96 glass-effect border-l border-white/10 z-40 animate-in slide-in-from-right duration-300"
      role="complementary"
      aria-label="AI Assistant and Activity Feed"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#0097A9]" />
            <h2 className="font-semibold">AI Assistant</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close assistant"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* AI Insights */}
        <div className="p-4 border-b border-white/10 bg-gradient-to-br from-[#0097A9]/10 to-transparent">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0097A9]/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-[#0097A9]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium mb-1">Insight</h3>
              <p className="text-sm text-[#A8B2C1] leading-relaxed">
                Response time improved by 15% this week. Consider applying the same automation template to other high-volume queues.
              </p>
              <Button
                variant="link"
                className="h-auto p-0 mt-2 text-[#0097A9] hover:text-[#00B8CC]"
              >
                View details →
              </Button>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="flex-1 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#A8B2C1]" />
              <h3 className="text-sm font-medium">Recent Activity</h3>
            </div>
          </div>

          <ScrollArea className="h-[calc(100%-60px)]">
            <div className="p-4 space-y-4">
              {activities.map((activity) => {
                const IconComponent = (Icons as any)[activity.icon];
                const timeAgo = formatTimeAgo(new Date(activity.timestamp));

                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${activity.color}20` }}
                    >
                      {IconComponent && (
                        <IconComponent
                          className="w-4 h-4"
                          style={{ color: activity.color }}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{activity.text}</p>
                      <p className="text-xs text-[#A8B2C1] mt-1">{timeAgo}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Badge variant="outline" className="w-full justify-center border-[#0097A9]/30 text-[#0097A9]">
            5 automations running
          </Badge>
        </div>
      </div>
    </aside>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
