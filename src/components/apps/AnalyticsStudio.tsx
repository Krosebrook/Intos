import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import {
  PieChart,
  BarChart3,
  LineChart,
  TrendingUp,
  TrendingDown,
  Download,
  Share2,
  Plus,
  Settings,
  Filter,
  Calendar,
  Users,
  DollarSign,
  Target,
  Activity,
  Zap,
  AlertCircle,
  CheckCircle2,
  Clock,
  RefreshCw,
  Sparkles,
  Table,
  ChevronDown,
  Eye,
  Database
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { Alert, AlertDescription } from '../ui/alert';

const mockSalesData = [
  { month: 'Jan', revenue: 45000, deals: 12, avgDealSize: 3750 },
  { month: 'Feb', revenue: 52000, deals: 14, avgDealSize: 3714 },
  { month: 'Mar', revenue: 48000, deals: 13, avgDealSize: 3692 },
  { month: 'Apr', revenue: 61000, deals: 16, avgDealSize: 3812 },
  { month: 'May', revenue: 58000, deals: 15, avgDealSize: 3867 },
  { month: 'Jun', revenue: 70000, deals: 18, avgDealSize: 3889 },
  { month: 'Jul', revenue: 67000, deals: 17, avgDealSize: 3941 },
  { month: 'Aug', revenue: 75000, deals: 19, avgDealSize: 3947 },
  { month: 'Sep', revenue: 82000, deals: 21, avgDealSize: 3905 },
  { month: 'Oct', revenue: 78000, deals: 20, avgDealSize: 3900 }
];

const mockTicketData = [
  { category: 'Billing', count: 145, avgResolution: 4.2, satisfaction: 4.5 },
  { category: 'Technical', count: 234, avgResolution: 8.7, satisfaction: 4.1 },
  { category: 'Feature Request', count: 89, avgResolution: 12.3, satisfaction: 4.3 },
  { category: 'Bug Report', count: 156, avgResolution: 6.8, satisfaction: 4.2 },
  { category: 'Account', count: 67, avgResolution: 3.1, satisfaction: 4.7 }
];

const mockDealStages = [
  { name: 'Prospecting', value: 23, amount: 345000 },
  { name: 'Qualification', value: 18, amount: 270000 },
  { name: 'Proposal', value: 12, amount: 480000 },
  { name: 'Negotiation', value: 8, amount: 640000 },
  { name: 'Closed Won', value: 15, amount: 750000 }
];

const mockPivotData = [
  { rep: 'Sarah Johnson', q1: 125000, q2: 145000, q3: 165000, q4: 180000, total: 615000 },
  { rep: 'Mike Chen', q1: 98000, q2: 112000, q3: 134000, q4: 156000, total: 500000 },
  { rep: 'Emily Davis', q1: 87000, q2: 95000, q3: 118000, q4: 142000, total: 442000 },
  { rep: 'David Kim', q1: 104000, q2: 121000, q3: 138000, q4: 167000, total: 530000 }
];

const COLORS = ['#E27305', '#529ADB', '#46A57B', '#CBD5E0', '#F87171'];

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  icon: any;
  color: string;
}

export function AnalyticsStudio() {
  const [selectedDateRange, setSelectedDateRange] = useState('last-30-days');
  const [selectedDataSource, setSelectedDataSource] = useState('all');
  const [activeChart, setActiveChart] = useState<'sales' | 'tickets' | 'pipeline' | 'pivot'>('sales');

  const metrics: MetricCard[] = [
    {
      title: 'Total Revenue',
      value: '$656K',
      change: 12.5,
      icon: DollarSign,
      color: '#46A57B'
    },
    {
      title: 'Active Deals',
      value: '76',
      change: 8.2,
      icon: Target,
      color: '#E27305'
    },
    {
      title: 'Support Tickets',
      value: '691',
      change: -3.4,
      icon: AlertCircle,
      color: '#529ADB'
    },
    {
      title: 'Avg Close Time',
      value: '14.2 days',
      change: -7.1,
      icon: Clock,
      color: '#46A57B'
    }
  ];

  return (
    <div className="h-full flex flex-col p-6 gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">AnalyticsStudio</h1>
          <p className="text-gray-400">Advanced analytics and pivot tables across all integrations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-white/20 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
          <Button size="sm" className="bg-[#E27305] hover:bg-[#F08515] text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* AI Insights Alert */}
      <Alert className="border-[#529ADB] bg-[#529ADB]/10">
        <Sparkles className="w-4 h-4 text-[#529ADB]" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-sm text-gray-300">
            <strong className="text-white">AI Insight:</strong> Sales velocity increased 23% this month. Sarah Johnson trending to exceed quota by 15%.
          </span>
          <Button size="sm" variant="outline" className="border-[#529ADB] text-[#529ADB] hover:bg-[#529ADB]/10">
            View Details
          </Button>
        </AlertDescription>
      </Alert>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
          <SelectTrigger className="w-[200px] bg-white/5 border-white/10 text-white">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="last-7-days">Last 7 Days</SelectItem>
            <SelectItem value="last-30-days">Last 30 Days</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="this-quarter">This Quarter</SelectItem>
            <SelectItem value="this-year">This Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedDataSource} onValueChange={setSelectedDataSource}>
          <SelectTrigger className="w-[200px] bg-white/5 border-white/10 text-white">
            <Database className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="hubspot">HubSpot</SelectItem>
            <SelectItem value="freshdesk">Freshdesk</SelectItem>
            <SelectItem value="gmail">Gmail</SelectItem>
            <SelectItem value="teams">Teams</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" className="border-white/20 text-white">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>

        <Button variant="outline" size="sm" className="border-white/20 text-white ml-auto">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>

        <Button variant="outline" size="sm" className="border-white/20 text-white">
          <Share2 className="w-4 h-4 mr-2" />
          Share Report
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          const isPositive = metric.change > 0;
          
          return (
            <Card key={idx} className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center`} 
                       style={{ backgroundColor: `${metric.color}20` }}>
                    <Icon className="w-5 h-5" style={{ color: metric.color }} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    isPositive ? 'text-[#46A57B]' : 'text-red-400'
                  }`}>
                    {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {Math.abs(metric.change)}%
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-1">{metric.title}</p>
                <p className="text-2xl text-white">{metric.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <Tabs value={activeChart} onValueChange={(v: any) => setActiveChart(v)} className="flex-1 flex flex-col min-h-0">
        <TabsList className="bg-white/5 w-full justify-start">
          <TabsTrigger value="sales">
            <LineChart className="w-4 h-4 mr-2" />
            Sales Performance
          </TabsTrigger>
          <TabsTrigger value="tickets">
            <BarChart3 className="w-4 h-4 mr-2" />
            Support Metrics
          </TabsTrigger>
          <TabsTrigger value="pipeline">
            <PieChart className="w-4 h-4 mr-2" />
            Deal Pipeline
          </TabsTrigger>
          <TabsTrigger value="pivot">
            <Table className="w-4 h-4 mr-2" />
            Pivot Table
          </TabsTrigger>
        </TabsList>

        {/* Sales Performance */}
        <TabsContent value="sales" className="flex-1 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-white">Revenue Trend</h3>
                  <Badge className="bg-[#46A57B]/20 text-[#46A57B]">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +18.2%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mockSalesData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#46A57B" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#46A57B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#172235', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#46A57B" 
                      strokeWidth={2}
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-white">Deals Closed</h3>
                  <Badge className="bg-[#529ADB]/20 text-[#529ADB]">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.4%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockSalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#172235', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="deals" fill="#529ADB" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 lg:col-span-2">
              <CardHeader>
                <h3 className="text-white">Average Deal Size Trend</h3>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={mockSalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#172235', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="avgDealSize" 
                      stroke="#E27305" 
                      strokeWidth={3}
                      dot={{ fill: '#E27305', r: 4 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Support Metrics */}
        <TabsContent value="tickets" className="flex-1 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <h3 className="text-white">Tickets by Category</h3>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockTicketData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis type="number" stroke="#888" />
                    <YAxis dataKey="category" type="category" stroke="#888" width={120} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#172235', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="count" fill="#529ADB" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <h3 className="text-white">Average Resolution Time (hours)</h3>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockTicketData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="category" stroke="#888" angle={-45} textAnchor="end" height={100} />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#172235', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="avgResolution" fill="#E27305" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 lg:col-span-2">
              <CardHeader>
                <h3 className="text-white">Customer Satisfaction by Category</h3>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockTicketData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="category" stroke="#888" />
                    <YAxis stroke="#888" domain={[0, 5]} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#172235', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="satisfaction" fill="#46A57B" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Deal Pipeline */}
        <TabsContent value="pipeline" className="flex-1 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <h3 className="text-white">Deals by Stage</h3>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RechartsPieChart>
                    <Pie
                      data={mockDealStages}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => entry.name}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {mockDealStages.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#172235', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <h3 className="text-white">Pipeline Value by Stage</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDealStages.map((stage, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                          />
                          <span className="text-white text-sm">{stage.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-white">${(stage.amount / 1000).toFixed(0)}K</p>
                          <p className="text-xs text-gray-400">{stage.value} deals</p>
                        </div>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all"
                          style={{ 
                            width: `${(stage.amount / 750000) * 100}%`,
                            backgroundColor: COLORS[idx % COLORS.length]
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Pipeline</span>
                      <span className="text-xl text-white">
                        ${(mockDealStages.reduce((sum, s) => sum + s.amount, 0) / 1000).toFixed(0)}K
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pivot Table */}
        <TabsContent value="pivot" className="flex-1 mt-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-white">Sales Rep Performance (Quarterly Breakdown)</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-white/20 text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/20 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <table className="w-full">
                  <thead className="sticky top-0 bg-[#172235] z-10">
                    <tr className="border-b border-white/10">
                      <th className="text-left p-3 text-gray-400">Sales Rep</th>
                      <th className="text-right p-3 text-gray-400">Q1 2025</th>
                      <th className="text-right p-3 text-gray-400">Q2 2025</th>
                      <th className="text-right p-3 text-gray-400">Q3 2025</th>
                      <th className="text-right p-3 text-gray-400">Q4 2025</th>
                      <th className="text-right p-3 text-gray-400">Total</th>
                      <th className="text-right p-3 text-gray-400">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPivotData.map((row, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#529ADB]/20 flex items-center justify-center">
                              <Users className="w-4 h-4 text-[#529ADB]" />
                            </div>
                            <span className="text-white">{row.rep}</span>
                          </div>
                        </td>
                        <td className="text-right p-3 text-gray-300">
                          ${(row.q1 / 1000).toFixed(0)}K
                        </td>
                        <td className="text-right p-3 text-gray-300">
                          ${(row.q2 / 1000).toFixed(0)}K
                        </td>
                        <td className="text-right p-3 text-gray-300">
                          ${(row.q3 / 1000).toFixed(0)}K
                        </td>
                        <td className="text-right p-3 text-gray-300">
                          ${(row.q4 / 1000).toFixed(0)}K
                        </td>
                        <td className="text-right p-3">
                          <span className="text-white">${(row.total / 1000).toFixed(0)}K</span>
                        </td>
                        <td className="text-right p-3">
                          <div className="flex items-center justify-end gap-1">
                            <TrendingUp className="w-4 h-4 text-[#46A57B]" />
                            <span className="text-[#46A57B] text-sm">
                              {(((row.q4 - row.q1) / row.q1) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-white/20 bg-white/5">
                      <td className="p-3 text-white">Total</td>
                      <td className="text-right p-3 text-white">
                        ${(mockPivotData.reduce((sum, r) => sum + r.q1, 0) / 1000).toFixed(0)}K
                      </td>
                      <td className="text-right p-3 text-white">
                        ${(mockPivotData.reduce((sum, r) => sum + r.q2, 0) / 1000).toFixed(0)}K
                      </td>
                      <td className="text-right p-3 text-white">
                        ${(mockPivotData.reduce((sum, r) => sum + r.q3, 0) / 1000).toFixed(0)}K
                      </td>
                      <td className="text-right p-3 text-white">
                        ${(mockPivotData.reduce((sum, r) => sum + r.q4, 0) / 1000).toFixed(0)}K
                      </td>
                      <td className="text-right p-3 text-white">
                        ${(mockPivotData.reduce((sum, r) => sum + r.total, 0) / 1000).toFixed(0)}K
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
