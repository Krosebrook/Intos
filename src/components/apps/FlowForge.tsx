import { GitBranch, Zap, Play, Pause, Plus, Settings } from 'lucide-react';
import { MetricCard } from '../int-os/MetricCard';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { generateWorkflows } from '../../lib/mock-data';

export function FlowForge() {
  const workflows = generateWorkflows(5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-6">FlowForge</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Active Workflows"
            value="12"
            change="+3"
            trend="up"
            icon={<GitBranch className="w-5 h-5" />}
          />
          <MetricCard
            label="Total Runs"
            value="8,472"
            change="+22%"
            trend="up"
            icon={<Zap className="w-5 h-5" />}
          />
          <MetricCard
            label="Success Rate"
            value="96.8%"
            change="+2%"
            trend="up"
            icon={<Play className="w-5 h-5" />}
          />
          <MetricCard
            label="Time Saved"
            value="247h"
            change="+18%"
            trend="up"
          />
        </div>
      </div>

      <Card className="p-6 card-gradient border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Workflows</h2>
          <Button className="bg-[#0097A9] hover:bg-[#00B8CC]">
            <Plus className="w-4 h-4 mr-2" />
            Create Workflow
          </Button>
        </div>

        <div className="space-y-4">
          {workflows.map((workflow) => (
            <div
              key={workflow.id}
              className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{workflow.name}</h3>
                    <Badge
                      variant="outline"
                      className={workflow.enabled
                        ? 'bg-[#2ECC71]/20 text-[#2ECC71] border-[#2ECC71]/30'
                        : 'bg-white/10 text-white border-white/20'
                      }
                    >
                      {workflow.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#A8B2C1]">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {workflow.trigger}
                    </span>
                    <span>{workflow.actions} actions</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="hover:bg-white/10">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-white/10"
                  >
                    {workflow.enabled ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 card-gradient border-white/10">
          <h3 className="text-lg font-medium mb-4">Automation Performance</h3>
          <div className="space-y-4">
            {['HubSpot Sync', 'Ticket Auto-assign', 'Email Campaigns'].map((item, i) => {
              const percentage = [98, 96, 94][i];
              return (
                <div key={item}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{item}</span>
                    <span className="text-sm text-[#2ECC71]">{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 card-gradient border-white/10 bg-gradient-to-br from-[#FF6B35]/10 to-transparent">
          <h3 className="text-lg font-medium mb-4">Quick Templates</h3>
          <div className="space-y-2">
            {[
              'Welcome new customers',
              'Escalate urgent tickets',
              'Weekly team digest',
              'Sync CRM data',
            ].map((template) => (
              <button
                key={template}
                className="w-full text-left p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm"
              >
                {template}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
