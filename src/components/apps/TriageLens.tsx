import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { ScrollArea } from '../ui/scroll-area';
import {
  Layers,
  AlertCircle,
  Clock,
  Zap,
  Users,
  TrendingUp,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Brain,
  Target,
  Timer,
  Activity,
  Shield,
  Flame,
  Sparkles,
  Tag,
  User,
  BarChart3,
} from 'lucide-react';
import { MetricCard } from '../int-os/MetricCard';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

interface Ticket {
  id: string;
  title: string;
  customer: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  sentiment: 'negative' | 'neutral' | 'positive';
  aiScore: number;
  estimatedTime: string;
  suggestedAgent: string;
  tags: string[];
  createdAt: string;
  waitTime: string;
  complexity: number;
  status: 'queued' | 'routing' | 'assigned' | 'resolved';
}

const tickets: Ticket[] = [
  {
    id: 'TKT-8945',
    title: 'Critical integration failure - Production down',
    customer: 'Acme Corp',
    priority: 'critical',
    category: 'Integration',
    sentiment: 'negative',
    aiScore: 98,
    estimatedTime: '45-60 min',
    suggestedAgent: 'Sarah Chen',
    tags: ['Integration', 'HubSpot', 'Urgent'],
    createdAt: '2 min ago',
    waitTime: '2 min',
    complexity: 9,
    status: 'routing',
  },
  {
    id: 'TKT-8944',
    title: 'Unable to access dashboard after login',
    customer: 'TechStart Inc',
    priority: 'high',
    category: 'Access',
    sentiment: 'neutral',
    aiScore: 87,
    estimatedTime: '20-30 min',
    suggestedAgent: 'Mike Rodriguez',
    tags: ['Access', 'Login', 'Dashboard'],
    createdAt: '8 min ago',
    waitTime: '8 min',
    complexity: 6,
    status: 'queued',
  },
  {
    id: 'TKT-8943',
    title: 'Automation workflow not triggering',
    customer: 'DataFlow LLC',
    priority: 'high',
    category: 'Automation',
    sentiment: 'negative',
    aiScore: 85,
    estimatedTime: '30-45 min',
    suggestedAgent: 'Sarah Chen',
    tags: ['Automation', 'Workflows'],
    createdAt: '12 min ago',
    waitTime: '12 min',
    complexity: 7,
    status: 'routing',
  },
  {
    id: 'TKT-8942',
    title: 'Question about API rate limits',
    customer: 'DevHub',
    priority: 'medium',
    category: 'API',
    sentiment: 'neutral',
    aiScore: 72,
    estimatedTime: '15-20 min',
    suggestedAgent: 'Alex Turner',
    tags: ['API', 'Documentation'],
    createdAt: '25 min ago',
    waitTime: '25 min',
    complexity: 4,
    status: 'queued',
  },
  {
    id: 'TKT-8941',
    title: 'Billing inquiry for enterprise plan',
    customer: 'Global Systems',
    priority: 'medium',
    category: 'Billing',
    sentiment: 'neutral',
    aiScore: 68,
    estimatedTime: '10-15 min',
    suggestedAgent: 'Jordan Lee',
    tags: ['Billing', 'Enterprise'],
    createdAt: '35 min ago',
    waitTime: '35 min',
    complexity: 3,
    status: 'assigned',
  },
  {
    id: 'TKT-8940',
    title: 'Feature request: Export to CSV',
    customer: 'Analytics Pro',
    priority: 'low',
    category: 'Feature Request',
    sentiment: 'positive',
    aiScore: 45,
    estimatedTime: '5-10 min',
    suggestedAgent: 'Emily Park',
    tags: ['Feature', 'Export'],
    createdAt: '1 hour ago',
    waitTime: '1 hour',
    complexity: 2,
    status: 'queued',
  },
];

const agentAvailability = [
  {
    id: 1,
    name: 'Sarah Chen',
    status: 'available',
    specialties: ['Integration', 'Automation'],
    currentLoad: 2,
    maxLoad: 5,
    avgResolutionTime: '32 min',
    successRate: 94,
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    status: 'available',
    specialties: ['Access', 'Security'],
    currentLoad: 1,
    maxLoad: 5,
    avgResolutionTime: '28 min',
    successRate: 96,
  },
  {
    id: 3,
    name: 'Alex Turner',
    status: 'busy',
    specialties: ['API', 'Technical'],
    currentLoad: 4,
    maxLoad: 5,
    avgResolutionTime: '35 min',
    successRate: 92,
  },
  {
    id: 4,
    name: 'Emily Park',
    status: 'available',
    specialties: ['General', 'Billing'],
    currentLoad: 1,
    maxLoad: 5,
    avgResolutionTime: '25 min',
    successRate: 91,
  },
  {
    id: 5,
    name: 'Jordan Lee',
    status: 'busy',
    specialties: ['Enterprise', 'Onboarding'],
    currentLoad: 3,
    maxLoad: 4,
    avgResolutionTime: '42 min',
    successRate: 95,
  },
];

const routingHistory = [
  { hour: '00:00', routed: 12, successful: 11, failed: 1 },
  { hour: '04:00', routed: 8, successful: 8, failed: 0 },
  { hour: '08:00', routed: 24, successful: 22, failed: 2 },
  { hour: '12:00', routed: 35, successful: 33, failed: 2 },
  { hour: '16:00', routed: 28, successful: 27, failed: 1 },
  { hour: '20:00', routed: 18, successful: 17, failed: 1 },
];

const categoryDistribution = [
  { name: 'Integration', value: 28, color: '#0097A9' },
  { name: 'Access', value: 22, color: '#40B4E5' },
  { name: 'Automation', value: 18, color: '#9B59B6' },
  { name: 'API', value: 15, color: '#2ECC71' },
  { name: 'Billing', value: 10, color: '#F1C40F' },
  { name: 'Other', value: 7, color: '#A8B2C1' },
];

export function TriageLens() {
  const [selectedTab, setSelectedTab] = useState('queue');
  const [autoRouting, setAutoRouting] = useState(true);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return '#E74C3C';
      case 'high':
        return '#FF6B35';
      case 'medium':
        return '#F1C40F';
      case 'low':
        return '#40B4E5';
      default:
        return '#A8B2C1';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Flame className="w-4 h-4" />;
      case 'high':
        return <AlertCircle className="w-4 h-4" />;
      case 'medium':
        return <Clock className="w-4 h-4" />;
      case 'low':
        return <Activity className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'negative':
        return '#FF6B35';
      case 'neutral':
        return '#A8B2C1';
      case 'positive':
        return '#2ECC71';
      default:
        return '#A8B2C1';
    }
  };

  const queuedTickets = tickets.filter((t) => t.status === 'queued' || t.status === 'routing');
  const assignedTickets = tickets.filter((t) => t.status === 'assigned');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Layers className="w-8 h-8 text-[#1ABC9C]" />
          <h1>TriageLens</h1>
        </div>
        <p className="text-[#A8B2C1]">
          AI-powered ticket routing and priority queue management
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="In Queue"
          value={queuedTickets.length.toString()}
          change="-3 from 1h ago"
          trend="up"
          icon={<Layers className="w-5 h-5 text-[#1ABC9C]" />}
        />
        <MetricCard
          label="Avg Wait Time"
          value="12 min"
          change="-5 min vs target"
          trend="up"
          icon={<Timer className="w-5 h-5 text-[#40B4E5]" />}
        />
        <MetricCard
          label="Routing Success"
          value="96.8%"
          change="+2.1% this week"
          trend="up"
          icon={<Target className="w-5 h-5 text-[#2ECC71]" />}
        />
        <MetricCard
          label="Available Agents"
          value="3/5"
          change="Peak capacity"
          trend="neutral"
          icon={<Users className="w-5 h-5 text-[#9B59B6]" />}
        />
      </div>

      {/* AI Routing Control */}
      <Card className="p-4 card-gradient border-white/10 border-l-4 border-l-[#1ABC9C]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-[#1ABC9C]" />
            <div>
              <h3 className="text-sm mb-1">AI Auto-Routing</h3>
              <p className="text-xs text-[#A8B2C1]">
                {autoRouting
                  ? 'AI is actively routing tickets based on complexity, priority, and agent expertise'
                  : 'Auto-routing paused - Manual routing mode'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              className={
                autoRouting
                  ? 'bg-[#2ECC71]/20 text-[#2ECC71] border-[#2ECC71]/50'
                  : 'bg-[#A8B2C1]/20 text-[#A8B2C1] border-[#A8B2C1]/50'
              }
            >
              {autoRouting ? 'Active' : 'Paused'}
            </Badge>
            <Button
              size="sm"
              variant={autoRouting ? 'outline' : 'default'}
              onClick={() => setAutoRouting(!autoRouting)}
            >
              {autoRouting ? 'Pause' : 'Resume'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="queue">Priority Queue</TabsTrigger>
          <TabsTrigger value="agents">Agent Status</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Queue Tab */}
        <TabsContent value="queue" className="space-y-4 mt-6">
          <ScrollArea className="h-[600px]">
            <div className="space-y-3">
              {queuedTickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  className="p-5 card-gradient border-white/10 hover:border-[#1ABC9C]/50 transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${getPriorityColor(ticket.priority)}20` }}
                    >
                      <div style={{ color: getPriorityColor(ticket.priority) }}>
                        {getPriorityIcon(ticket.priority)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-[#A8B2C1]">{ticket.id}</span>
                            <Badge
                              className="text-xs"
                              style={{
                                backgroundColor: `${getPriorityColor(ticket.priority)}20`,
                                color: getPriorityColor(ticket.priority),
                                borderColor: `${getPriorityColor(ticket.priority)}50`,
                              }}
                            >
                              {ticket.priority.toUpperCase()}
                            </Badge>
                            {ticket.status === 'routing' && (
                              <Badge className="text-xs bg-[#1ABC9C]/20 text-[#1ABC9C] border-[#1ABC9C]/50">
                                <Zap className="w-3 h-3 mr-1" />
                                Routing...
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-base mb-1">{ticket.title}</h3>
                          <p className="text-sm text-[#A8B2C1]">{ticket.customer}</p>
                        </div>
                      </div>

                      {/* AI Insights */}
                      <div className="bg-white/5 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Brain className="w-4 h-4 text-[#1ABC9C]" />
                            <span className="text-sm">AI Confidence Score</span>
                          </div>
                          <span className="text-sm text-[#1ABC9C]">{ticket.aiScore}%</span>
                        </div>
                        <Progress value={ticket.aiScore} className="h-1 mb-3" />
                        
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-[#A8B2C1]">Suggested Agent:</span>
                            <span className="text-white ml-1">{ticket.suggestedAgent}</span>
                          </div>
                          <div>
                            <span className="text-[#A8B2C1]">Est. Time:</span>
                            <span className="text-white ml-1">{ticket.estimatedTime}</span>
                          </div>
                          <div>
                            <span className="text-[#A8B2C1]">Complexity:</span>
                            <span className="text-white ml-1">{ticket.complexity}/10</span>
                          </div>
                          <div>
                            <span className="text-[#A8B2C1]">Sentiment:</span>
                            <span
                              className="ml-1"
                              style={{ color: getSentimentColor(ticket.sentiment) }}
                            >
                              {ticket.sentiment}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tags and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">
                            {ticket.category}
                          </Badge>
                          {ticket.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-white/5">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#A8B2C1]">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {ticket.waitTime}
                          </span>
                          <Button size="sm" className="bg-[#1ABC9C] hover:bg-[#1ABC9C]/80">
                            Route Now
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Agents Tab */}
        <TabsContent value="agents" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {agentAvailability.map((agent) => (
              <Card
                key={agent.id}
                className="p-5 card-gradient border-white/10"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-base mb-1">{agent.name}</h3>
                        <div className="flex flex-wrap gap-1">
                          {agent.specialties.map((specialty, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge
                        className={
                          agent.status === 'available'
                            ? 'bg-[#2ECC71]/20 text-[#2ECC71] border-[#2ECC71]/50'
                            : 'bg-[#F1C40F]/20 text-[#F1C40F] border-[#F1C40F]/50'
                        }
                      >
                        {agent.status}
                      </Badge>
                    </div>

                    {/* Load */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#A8B2C1]">Current Load</span>
                        <span>
                          {agent.currentLoad} / {agent.maxLoad}
                        </span>
                      </div>
                      <Progress
                        value={(agent.currentLoad / agent.maxLoad) * 100}
                        className="h-2"
                      />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-[#A8B2C1] mb-1">Avg Resolution</div>
                        <div>{agent.avgResolutionTime}</div>
                      </div>
                      <div>
                        <div className="text-[#A8B2C1] mb-1">Success Rate</div>
                        <div className="text-[#2ECC71]">{agent.successRate}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6 mt-6">
          {/* Routing History */}
          <Card className="p-6 card-gradient border-white/10">
            <h2 className="mb-4">24-Hour Routing Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={routingHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="hour" stroke="#A8B2C1" />
                <YAxis stroke="#A8B2C1" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#172235',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="routed"
                  stroke="#1ABC9C"
                  strokeWidth={2}
                  name="Total Routed"
                />
                <Line
                  type="monotone"
                  dataKey="successful"
                  stroke="#2ECC71"
                  strokeWidth={2}
                  name="Successful"
                />
                <Line
                  type="monotone"
                  dataKey="failed"
                  stroke="#FF6B35"
                  strokeWidth={2}
                  name="Failed"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Distribution */}
            <Card className="p-6 card-gradient border-white/10">
              <h2 className="mb-4">Category Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#172235',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Performance Metrics */}
            <Card className="p-6 card-gradient border-white/10">
              <h2 className="mb-4">Routing Quality Metrics</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#A8B2C1]">Agent Match Accuracy</span>
                    <span className="text-[#2ECC71]">94.5%</span>
                  </div>
                  <Progress value={94.5} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#A8B2C1]">First-Time Resolution</span>
                    <span className="text-[#40B4E5]">87.2%</span>
                  </div>
                  <Progress value={87.2} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#A8B2C1]">Avg Response Time</span>
                    <span className="text-[#9B59B6]">3.2 min</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#A8B2C1]">Customer Satisfaction</span>
                    <span className="text-[#F1C40F]">4.6/5</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>
            </Card>
          </div>

          {/* AI Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 card-gradient border-white/10 border-l-4 border-l-[#1ABC9C]">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-[#1ABC9C]" />
                <h3 className="text-sm">Peak Hours Detected</h3>
              </div>
              <p className="text-sm text-[#A8B2C1]">
                12:00-16:00 consistently sees 40% higher ticket volume
              </p>
            </Card>
            <Card className="p-4 card-gradient border-white/10 border-l-4 border-l-[#FF6B35]">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-[#FF6B35]" />
                <h3 className="text-sm">Integration Issues Up</h3>
              </div>
              <p className="text-sm text-[#A8B2C1]">
                +15% integration tickets vs last week - consider proactive comms
              </p>
            </Card>
            <Card className="p-4 card-gradient border-white/10 border-l-4 border-l-[#2ECC71]">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="w-5 h-5 text-[#2ECC71]" />
                <h3 className="text-sm">Routing Improving</h3>
              </div>
              <p className="text-sm text-[#A8B2C1]">
                AI accuracy improved 3.2% this week through learning
              </p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
