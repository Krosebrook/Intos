import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { MetricCard } from '../int-os/MetricCard';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { EmptyState } from '../int-os/DataStates';
import { generateMetrics, generateChartData } from '../../lib/mock-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GenericAppProps {
  title: string;
  icon: string;
  description: string;
  color: string;
}

export function GenericApp({ title, icon, description, color }: GenericAppProps) {
  const metrics = generateMetrics(4);
  const chartData = generateChartData(12);
  const IconComponent = (Icons as any)[icon] as LucideIcon;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          {IconComponent && <IconComponent className="w-8 h-8" style={{ color }} />}
          <h1>{title}</h1>
        </div>
        <p className="text-[#A8B2C1] mb-6">{description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, i) => (
            <MetricCard
              key={i}
              label={metric.label}
              value={metric.value}
              change={metric.change}
              trend={metric.trend as any}
            />
          ))}
        </div>
      </div>

      <Card className="p-6 card-gradient border-white/10">
        <h3 className="text-lg font-medium mb-4">Activity Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#A8B2C1" />
            <YAxis stroke="#A8B2C1" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#172235',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 card-gradient border-white/10">
          <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {['Activity 1', 'Activity 2', 'Activity 3', 'Activity 4'].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm flex-1">{activity} completed successfully</span>
                <span className="text-xs text-[#A8B2C1]">{i + 1}h ago</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 card-gradient border-white/10">
          <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button className="w-full justify-start" variant="outline" style={{ borderColor: `${color}40` }}>
              Create new item
            </Button>
            <Button className="w-full justify-start" variant="outline" style={{ borderColor: `${color}40` }}>
              View reports
            </Button>
            <Button className="w-full justify-start" variant="outline" style={{ borderColor: `${color}40` }}>
              Configure settings
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
