import { Bot, RefreshCw, CheckCircle, Calendar, MessageSquare, Play } from 'lucide-react';
import { MetricCard } from '../int-os/MetricCard';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { generateAutomations } from '../../lib/mock-data';

export function SyncBotPanel() {
  const automations = generateAutomations();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-6">SyncBot Panel</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Active Automations"
            value="5"
            change="+1"
            trend="up"
            icon={<Bot className="w-5 h-5" />}
          />
          <MetricCard
            label="Sync Operations"
            value="4,672"
            change="+22%"
            trend="up"
            icon={<RefreshCw className="w-5 h-5" />}
          />
          <MetricCard
            label="Success Rate"
            value="98.4%"
            change="+1.2%"
            trend="up"
            icon={<CheckCircle className="w-5 h-5" />}
          />
          <MetricCard
            label="Time Saved"
            value="142h"
            change="+28h"
            trend="up"
          />
        </div>
      </div>

      {/* Live Automation Demo */}
      <Card className="p-6 card-gradient border-white/10 bg-gradient-to-br from-[#0097A9]/10 to-transparent">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#0097A9]/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-[#0097A9]" />
            </div>
            <div>
              <h3 className="font-medium">Teams → SyncBot</h3>
              <p className="text-sm text-[#A8B2C1]">Meeting summary automation</p>
            </div>
          </div>
          <Button className="bg-[#0097A9] hover:bg-[#00B8CC]">
            <Play className="w-4 h-4 mr-2" />
            Run Now
          </Button>
        </div>

        <div className="space-y-4">
          {/* Automation Steps */}
          <div className="relative pl-8">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0097A9] to-transparent" />
            
            {[
              { step: 'Fetch meeting transcript', status: 'complete', time: '0.2s' },
              { step: 'Extract action items', status: 'complete', time: '0.5s' },
              { step: 'Generate summary', status: 'complete', time: '1.2s' },
              { step: 'Add note to HubSpot contact', status: 'running', time: '...' },
              { step: 'Send notification', status: 'pending', time: '-' },
            ].map((item, i) => (
              <div key={i} className="relative mb-4 last:mb-0">
                <div
                  className={`absolute -left-6 w-4 h-4 rounded-full border-2 ${
                    item.status === 'complete'
                      ? 'bg-[#2ECC71] border-[#2ECC71]'
                      : item.status === 'running'
                      ? 'bg-[#0097A9] border-[#0097A9] animate-pulse'
                      : 'bg-transparent border-white/20'
                  }`}
                />
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${
                    item.status === 'pending' ? 'text-[#A8B2C1]' : 'text-white'
                  }`}>
                    {item.step}
                  </span>
                  <span className="text-xs text-[#A8B2C1]">{item.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Result Preview */}
          <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-start gap-3 mb-3">
              <Calendar className="w-4 h-4 text-[#0097A9] mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-medium mb-1">Meeting: Q4 Planning</h4>
                <p className="text-xs text-[#A8B2C1]">Dec 16, 2025 • 45 minutes</p>
              </div>
            </div>
            <div className="text-sm space-y-2 pl-7">
              <p className="text-[#A8B2C1]">
                <strong className="text-white">Summary:</strong> Discussed Q4 revenue targets and resource allocation. 
                Team agreed on expanding sales team by 3 members.
              </p>
              <p className="text-[#A8B2C1]">
                <strong className="text-white">Action Items:</strong>
              </p>
              <ul className="list-disc list-inside text-[#A8B2C1] space-y-1 text-xs">
                <li>Sarah to draft job descriptions by Friday</li>
                <li>Mike to review budget proposal</li>
                <li>Schedule follow-up for next Tuesday</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Automation List */}
      <Card className="p-6 card-gradient border-white/10">
        <h2 className="text-lg font-medium mb-4">Your Automations</h2>
        <div className="space-y-4">
          {automations.map((auto) => (
            <div
              key={auto.id}
              className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{auto.name}</h3>
                    <Badge
                      variant="outline"
                      className={auto.status === 'active'
                        ? 'bg-[#2ECC71]/20 text-[#2ECC71] border-[#2ECC71]/30'
                        : 'bg-[#A8B2C1]/20 text-[#A8B2C1] border-[#A8B2C1]/30'
                      }
                    >
                      {auto.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#A8B2C1] mb-3">{auto.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-[#A8B2C1]">
                      <strong className="text-white">{auto.runs}</strong> runs
                    </span>
                    <span className="text-[#A8B2C1]">
                      Last run: {new Date(auto.lastRun).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#A8B2C1]">Success Rate</span>
                  <span className="text-[#2ECC71]">{auto.successRate}%</span>
                </div>
                <Progress value={auto.successRate} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 card-gradient border-white/10">
          <h3 className="text-lg font-medium mb-4">Integration Status</h3>
          <div className="space-y-3">
            {[
              { name: 'HubSpot', status: 'connected', color: '#FF6B35' },
              { name: 'Freshdesk', status: 'connected', color: '#2ECC71' },
              { name: 'Microsoft Teams', status: 'connected', color: '#40B4E5' },
              { name: 'Slack', status: 'disconnected', color: '#A8B2C1' },
            ].map((integration) => (
              <div
                key={integration.name}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: integration.status === 'connected' ? '#2ECC71' : '#E74C3C',
                    }}
                  />
                  <span>{integration.name}</span>
                </div>
                <span className="text-xs text-[#A8B2C1]">{integration.status}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 card-gradient border-white/10">
          <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button className="w-full justify-start bg-[#0097A9] hover:bg-[#00B8CC]">
              <Calendar className="w-4 h-4 mr-2" />
              Summarize latest meeting
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync all contacts
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Export conversation
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
