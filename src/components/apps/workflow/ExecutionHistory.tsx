import { Card, CardHeader, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

const mockExecutions = [
  { workflow: 'High-Priority Email Escalation', status: 'success' as const, time: '2 min ago', duration: '1.2s' },
  { workflow: 'Deal Stage Change Automation', status: 'success' as const, time: '15 min ago', duration: '2.8s' },
  { workflow: 'High-Priority Email Escalation', status: 'success' as const, time: '18 min ago', duration: '1.5s' },
  { workflow: 'Customer Feedback Survey', status: 'success' as const, time: '1 hour ago', duration: '0.9s' },
  { workflow: 'Deal Stage Change Automation', status: 'failed' as const, time: '2 hours ago', duration: '0.3s' },
  { workflow: 'High-Priority Email Escalation', status: 'success' as const, time: '3 hours ago', duration: '1.1s' }
];

export function ExecutionHistory() {
  return (
    <Card className="bg-white/5 border-white/10 h-full">
      <CardHeader>
        <h3 className="text-white">Execution History</h3>
        <p className="text-sm text-gray-400">Recent workflow executions and results</p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="space-y-3">
            {mockExecutions.map((execution, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white">{execution.workflow}</h4>
                  <Badge
                    className="text-xs"
                    style={{
                      backgroundColor: execution.status === 'success' ? '#46A57B20' : '#F8717120',
                      color: execution.status === 'success' ? '#46A57B' : '#F87171',
                      borderColor: execution.status === 'success' ? '#46A57B40' : '#F8717140'
                    }}
                  >
                    {execution.status === 'success' ? (
                      <><CheckCircle2 className="w-3 h-3 mr-1" /> Success</>
                    ) : (
                      <><XCircle className="w-3 h-3 mr-1" /> Failed</>
                    )}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {execution.time}
                  </span>
                  <span>•</span>
                  <span>Duration: {execution.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
