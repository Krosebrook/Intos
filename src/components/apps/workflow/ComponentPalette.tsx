import { Card, CardHeader, CardContent } from '../../ui/card';
import { ScrollArea } from '../../ui/scroll-area';
import { Zap, GitBranch, Activity, Settings, Filter, CheckCircle2, Clock } from 'lucide-react';
import { AVAILABLE_TRIGGERS, AVAILABLE_ACTIONS } from './constants';

export function ComponentPalette() {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <h3 className="text-white">Components</h3>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {/* Triggers */}
            <div>
              <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Triggers
              </h4>
              <div className="space-y-2">
                {AVAILABLE_TRIGGERS.map((trigger) => {
                  const Icon = trigger.icon;
                  return (
                    <div
                      key={trigger.id}
                      className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 cursor-move transition-all"
                      draggable
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4" style={{ color: trigger.color }} />
                        <span className="text-sm text-white">{trigger.name}</span>
                      </div>
                      <p className="text-xs text-gray-400">{trigger.source}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Conditions */}
            <div>
              <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                Conditions
              </h4>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 cursor-move transition-all">
                  <div className="flex items-center gap-2 mb-1">
                    <Filter className="w-4 h-4 text-[#E27305]" />
                    <span className="text-sm text-white">If/Else</span>
                  </div>
                  <p className="text-xs text-gray-400">Branch based on condition</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 cursor-move transition-all">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#46A57B]" />
                    <span className="text-sm text-white">Filter</span>
                  </div>
                  <p className="text-xs text-gray-400">Continue if condition met</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Actions
              </h4>
              <div className="space-y-2">
                {AVAILABLE_ACTIONS.map((action) => {
                  const Icon = action.icon;
                  return (
                    <div
                      key={action.id}
                      className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 cursor-move transition-all"
                      draggable
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4" style={{ color: action.color }} />
                        <span className="text-sm text-white">{action.name}</span>
                      </div>
                      <p className="text-xs text-gray-400">{action.target}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Utilities */}
            <div>
              <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Utilities
              </h4>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 cursor-move transition-all">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-[#CBD5E0]" />
                    <span className="text-sm text-white">Delay</span>
                  </div>
                  <p className="text-xs text-gray-400">Wait before next step</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
