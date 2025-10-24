import { BarChart3, TrendingUp, Users, DollarSign, ArrowUpRight } from 'lucide-react';
import { MetricCard } from '../int-os/MetricCard';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { generateChartData } from '../../lib/mock-data';

export function InsightHub() {
  const chartData = generateChartData(12);
  const revenueData = generateChartData(12).map(d => ({ ...d, revenue: d.value * 1000, target: 85000 }));

  return (
    <div className="space-y-6">
      {/* Hero KPIs */}
      <div>
        <h1 className="mb-6">InsightHub</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Total Revenue"
            value="$2.4M"
            change="+18%"
            trend="up"
            icon={<DollarSign className="w-5 h-5" />}
          />
          <MetricCard
            label="Active Users"
            value="12,847"
            change="+12%"
            trend="up"
            icon={<Users className="w-5 h-5" />}
          />
          <MetricCard
            label="Conversion Rate"
            value="3.8%"
            change="+0.4%"
            trend="up"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <MetricCard
            label="Avg. Deal Size"
            value="$24.5K"
            change="+8%"
            trend="up"
            icon={<BarChart3 className="w-5 h-5" />}
          />
        </div>
      </div>

      {/* Analytics Dashboard */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-6 space-y-6">
          <Card className="p-6 card-gradient border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium mb-1">Monthly Performance</h3>
                <p className="text-sm text-[#A8B2C1]">Key metrics over the past 12 months</p>
              </div>
              <button className="text-sm text-[#0097A9] hover:text-[#00B8CC] flex items-center gap-1">
                View details <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0097A9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0097A9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0097A9"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#FF6B35"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 card-gradient border-white/10">
              <h3 className="text-lg font-medium mb-4">Top Channels</h3>
              <div className="space-y-4">
                {['Organic Search', 'Direct', 'Social Media', 'Referral'].map((channel, i) => {
                  const percentage = [45, 28, 18, 9][i];
                  return (
                    <div key={channel}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">{channel}</span>
                        <span className="text-sm text-[#0097A9]">{percentage}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#0097A9] to-[#00B8CC]"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 card-gradient border-white/10">
              <h3 className="text-lg font-medium mb-4">Recent Insights</h3>
              <div className="space-y-4">
                {[
                  { text: 'Mobile traffic increased 23% this week', type: 'success' },
                  { text: 'Bounce rate on pricing page trending down', type: 'success' },
                  { text: 'Email campaign CTR above benchmark', type: 'success' },
                  { text: 'Consider A/B test on homepage CTA', type: 'info' },
                ].map((insight, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      insight.type === 'success' ? 'bg-[#2ECC71]' : 'bg-[#40B4E5]'
                    }`} />
                    <p className="text-sm flex-1">{insight.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          <Card className="p-6 card-gradient border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium mb-1">Revenue Trends</h3>
                <p className="text-sm text-[#A8B2C1]">Monthly recurring revenue vs target</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={revenueData}>
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
                <Legend />
                <Bar dataKey="revenue" fill="#0097A9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#FF6B35" radius={[4, 4, 0, 0]} opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="mt-6">
          <Card className="p-6 card-gradient border-white/10">
            <h3 className="text-lg font-medium mb-4">User Engagement</h3>
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
                <Line type="monotone" dataKey="value" stroke="#0097A9" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
