import { Card, CardContent } from '../../ui/card';
import { Zap, Activity, CheckCircle2, Clock } from 'lucide-react';

export function WorkflowStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Workflows</p>
              <p className="text-2xl text-white">24</p>
            </div>
            <Zap className="w-8 h-8 text-[#E27305]" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Executions Today</p>
              <p className="text-2xl text-white">2,847</p>
            </div>
            <Activity className="w-8 h-8 text-[#529ADB]" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Success Rate</p>
              <p className="text-2xl text-white">98.3%</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-[#46A57B]" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Time Saved</p>
              <p className="text-2xl text-white">147h</p>
            </div>
            <Clock className="w-8 h-8 text-[#46A57B]" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
