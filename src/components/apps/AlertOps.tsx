import { Bell, AlertCircle, CheckCircle, Clock, Zap, Users } from 'lucide-react';
import { MetricCard } from '../int-os/MetricCard';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';

export function AlertOps() {
  const alerts = [
    {
      id: 'ALT-001',
      title: 'High CPU usage on production server',
      severity: 'critical',
      status: 'active',
      assignee: 'Sarah Chen',
      time: '2m ago',
      runbook: 'Scale up instances',
    },
    {
      id: 'ALT-002',
      title: 'Database connection pool exhausted',
      severity: 'high',
      status: 'investigating',
      assignee: 'Mike Johnson',
      time: '15m ago',
      runbook: 'Restart DB pool',
    },
    {
      id: 'ALT-003',
      title: 'Elevated error rate in payment API',
      severity: 'high',
      status: 'active',
      assignee: 'Alex Rivera',
      time: '23m ago',
      runbook: 'Check payment gateway',
    },
    {
      id: 'ALT-004',
      title: 'Disk space running low',
      severity: 'medium',
      status: 'acknowledged',
      assignee: 'Jamie Lee',
      time: '1h ago',
      runbook: 'Clean up logs',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-[#E74C3C] text-white';
      case 'high': return 'bg-[#FF6B35] text-white';
      case 'medium': return 'bg-[#F1C40F] text-black';
      default: return 'bg-[#A8B2C1] text-black';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-[#2ECC71]/20 text-[#2ECC71] border-[#2ECC71]/30';
      case 'investigating': return 'bg-[#40B4E5]/20 text-[#40B4E5] border-[#40B4E5]/30';
      case 'acknowledged': return 'bg-[#F1C40F]/20 text-[#F1C40F] border-[#F1C40F]/30';
      default: return 'bg-[#E74C3C]/20 text-[#E74C3C] border-[#E74C3C]/30';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-6">AlertOps</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Active Alerts"
            value="7"
            change="+2"
            trend="down"
            icon={<Bell className="w-5 h-5" />}
          />
          <MetricCard
            label="Critical"
            value="2"
            change="+1"
            trend="down"
            icon={<AlertCircle className="w-5 h-5" />}
          />
          <MetricCard
            label="MTTR"
            value="12m"
            change="-3m"
            trend="up"
            icon={<Clock className="w-5 h-5" />}
          />
          <MetricCard
            label="On-Call Team"
            value="4"
            change="0"
            trend="neutral"
            icon={<Users className="w-5 h-5" />}
          />
        </div>
      </div>

      <Card className="card-gradient border-white/10">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Active Incidents</h2>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-[#E74C3C]/20 text-[#E74C3C] border-[#E74C3C]/30">
                2 Critical
              </Badge>
              <Badge variant="outline" className="bg-[#FF6B35]/20 text-[#FF6B35] border-[#FF6B35]/30">
                3 High
              </Badge>
            </div>
          </div>
        </div>

        <div className="divide-y divide-white/10">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    <span className="font-mono text-sm text-[#0097A9]">{alert.id}</span>
                    <Badge variant="outline" className={getStatusColor(alert.status)}>
                      {alert.status}
                    </Badge>
                  </div>
                  <h3 className="font-medium mb-2">{alert.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-[#A8B2C1]">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-[#0097A9] text-white text-xs">
                          {alert.assignee.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span>{alert.assignee}</span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {alert.time}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    className="bg-[#0097A9] hover:bg-[#00B8CC]"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Run: {alert.runbook}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20"
                  >
                    Acknowledge
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 card-gradient border-white/10">
          <h3 className="text-lg font-medium mb-4">On-Call Schedule</h3>
          <div className="space-y-3">
            {[
              { name: 'Sarah Chen', role: 'Primary', until: 'Tomorrow 9 AM' },
              { name: 'Mike Johnson', role: 'Backup', until: 'Tomorrow 9 AM' },
              { name: 'Alex Rivera', role: 'Escalation', until: 'Friday 5 PM' },
            ].map((person, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#0097A9] text-white text-sm">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{person.name}</div>
                    <div className="text-xs text-[#A8B2C1]">{person.role}</div>
                  </div>
                </div>
                <div className="text-xs text-[#A8B2C1]">Until {person.until}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 card-gradient border-white/10">
          <h3 className="text-lg font-medium mb-4">Runbook Library</h3>
          <div className="space-y-2">
            {[
              'Database performance degradation',
              'API gateway timeout',
              'Service deployment rollback',
              'Cache invalidation procedure',
              'Load balancer failover',
            ].map((runbook, i) => (
              <button
                key={i}
                className="w-full text-left p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm flex items-center justify-between group"
              >
                <span>{runbook}</span>
                <Zap className="w-4 h-4 text-[#A8B2C1] group-hover:text-[#0097A9]" />
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
