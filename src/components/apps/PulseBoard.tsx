import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { ScrollArea } from '../ui/scroll-area';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Users,
  Heart,
  Zap,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  Target,
  Calendar,
  Award,
  Sparkles,
  Coffee,
  Battery,
  Smile,
  Meh,
  Frown,
} from 'lucide-react';
import { MetricCard } from '../int-os/MetricCard';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Senior Support Agent',
    avatar: null,
    status: 'thriving',
    engagement: 92,
    mood: 'positive',
    productivity: 88,
    collaboration: 95,
    wellbeing: 90,
    lastCheckIn: '2 hours ago',
    recentActivity: 'Completed 12 tickets today',
    concerns: [],
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    role: 'Team Lead',
    avatar: null,
    status: 'good',
    engagement: 85,
    mood: 'positive',
    productivity: 82,
    collaboration: 88,
    wellbeing: 83,
    lastCheckIn: '5 hours ago',
    recentActivity: 'Led daily standup',
    concerns: [],
  },
  {
    id: 3,
    name: 'Emily Park',
    role: 'Support Agent',
    avatar: null,
    status: 'needs-attention',
    engagement: 62,
    mood: 'neutral',
    productivity: 58,
    collaboration: 65,
    wellbeing: 60,
    lastCheckIn: '1 day ago',
    recentActivity: 'Working on escalated ticket',
    concerns: ['Low engagement score', 'Missed check-in'],
  },
  {
    id: 4,
    name: 'Alex Turner',
    role: 'Support Agent',
    avatar: null,
    status: 'good',
    engagement: 78,
    mood: 'positive',
    productivity: 75,
    collaboration: 80,
    wellbeing: 78,
    lastCheckIn: '4 hours ago',
    recentActivity: 'Participated in team training',
    concerns: [],
  },
  {
    id: 5,
    name: 'Jordan Lee',
    role: 'Senior Support Agent',
    avatar: null,
    status: 'thriving',
    engagement: 90,
    mood: 'positive',
    productivity: 92,
    collaboration: 87,
    wellbeing: 91,
    lastCheckIn: '1 hour ago',
    recentActivity: 'Mentored 2 team members',
    concerns: [],
  },
  {
    id: 6,
    name: 'Taylor Kim',
    role: 'Support Agent',
    avatar: null,
    status: 'at-risk',
    engagement: 45,
    mood: 'negative',
    productivity: 48,
    collaboration: 42,
    wellbeing: 40,
    lastCheckIn: '3 days ago',
    recentActivity: 'Out sick yesterday',
    concerns: ['Low wellbeing', 'Decreased productivity', 'Long absence'],
  },
];

const engagementTrend = [
  { week: 'Week 1', engagement: 75, mood: 72, productivity: 78 },
  { week: 'Week 2', engagement: 78, mood: 76, productivity: 80 },
  { week: 'Week 3', engagement: 82, mood: 80, productivity: 84 },
  { week: 'Week 4', engagement: 77, mood: 74, productivity: 79 },
  { week: 'Week 5', engagement: 80, mood: 79, productivity: 82 },
  { week: 'Week 6', engagement: 84, mood: 82, productivity: 85 },
];

const teamHealthMetrics = [
  { metric: 'Engagement', score: 77, fullMark: 100 },
  { metric: 'Collaboration', score: 82, fullMark: 100 },
  { metric: 'Productivity', score: 75, fullMark: 100 },
  { metric: 'Wellbeing', score: 80, fullMark: 100 },
  { metric: 'Satisfaction', score: 78, fullMark: 100 },
];

const moodDistribution = [
  { mood: 'Very Happy', count: 2, color: '#2ECC71' },
  { mood: 'Happy', count: 2, color: '#40B4E5' },
  { mood: 'Neutral', count: 1, color: '#F1C40F' },
  { mood: 'Concerned', count: 1, color: '#FF6B35' },
];

const recentFeedback = [
  {
    id: 1,
    author: 'Sarah Chen',
    type: 'kudos',
    message: 'Great team collaboration on the urgent escalation today!',
    timestamp: '2 hours ago',
    likes: 8,
  },
  {
    id: 2,
    author: 'Mike Rodriguez',
    type: 'suggestion',
    message: 'Can we schedule more training sessions on the new ticketing system?',
    timestamp: '5 hours ago',
    likes: 5,
  },
  {
    id: 3,
    author: 'Jordan Lee',
    type: 'kudos',
    message: 'Shoutout to Alex for helping me with that complex automation!',
    timestamp: '1 day ago',
    likes: 12,
  },
  {
    id: 4,
    author: 'Emily Park',
    type: 'concern',
    message: 'Feeling overwhelmed with the current ticket volume.',
    timestamp: '1 day ago',
    likes: 3,
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Weekly Team Sync',
    date: '2025-10-25',
    time: '10:00 AM',
    type: 'meeting',
    attendees: 6,
  },
  {
    id: 2,
    title: '1:1 with Emily',
    date: '2025-10-25',
    time: '2:00 PM',
    type: '1-on-1',
    attendees: 2,
  },
  {
    id: 3,
    title: 'Team Building Activity',
    date: '2025-10-26',
    time: '3:00 PM',
    type: 'social',
    attendees: 6,
  },
  {
    id: 4,
    title: 'Q4 Planning Session',
    date: '2025-10-28',
    time: '9:00 AM',
    type: 'meeting',
    attendees: 8,
  },
];

export function PulseBoard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'thriving':
        return '#2ECC71';
      case 'good':
        return '#40B4E5';
      case 'needs-attention':
        return '#F1C40F';
      case 'at-risk':
        return '#FF6B35';
      default:
        return '#A8B2C1';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'thriving':
        return 'Thriving';
      case 'good':
        return 'Good';
      case 'needs-attention':
        return 'Needs Attention';
      case 'at-risk':
        return 'At Risk';
      default:
        return status;
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'positive':
        return <Smile className="w-5 h-5 text-[#2ECC71]" />;
      case 'neutral':
        return <Meh className="w-5 h-5 text-[#F1C40F]" />;
      case 'negative':
        return <Frown className="w-5 h-5 text-[#FF6B35]" />;
      default:
        return <Meh className="w-5 h-5 text-[#A8B2C1]" />;
    }
  };

  const avgEngagement = Math.round(
    teamMembers.reduce((acc, m) => acc + m.engagement, 0) / teamMembers.length
  );

  const needsAttention = teamMembers.filter(
    (m) => m.status === 'needs-attention' || m.status === 'at-risk'
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Activity className="w-8 h-8 text-[#2ECC71]" />
          <h1>PulseBoard</h1>
        </div>
        <p className="text-[#A8B2C1]">
          Team health and engagement metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Team Engagement"
          value={`${avgEngagement}%`}
          change="+7% from last week"
          trend="up"
          icon={<Heart className="w-5 h-5 text-[#2ECC71]" />}
        />
        <MetricCard
          label="Active Team Members"
          value={teamMembers.length.toString()}
          change="All online"
          trend="neutral"
          icon={<Users className="w-5 h-5 text-[#40B4E5]" />}
        />
        <MetricCard
          label="Needs Attention"
          value={needsAttention.toString()}
          change={needsAttention > 0 ? 'Review recommended' : 'All good'}
          trend={needsAttention > 0 ? 'down' : 'neutral'}
          icon={<AlertCircle className="w-5 h-5 text-[#FF6B35]" />}
        />
        <MetricCard
          label="Team Wellbeing"
          value="78%"
          change="+5% this month"
          trend="up"
          icon={<Sparkles className="w-5 h-5 text-[#9B59B6]" />}
        />
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="overview">Team Overview</TabsTrigger>
          <TabsTrigger value="individuals">Individuals</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Engagement Trend */}
          <Card className="p-6 card-gradient border-white/10">
            <h2 className="mb-4">6-Week Engagement Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="week" stroke="#A8B2C1" />
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
                  dataKey="engagement"
                  stroke="#2ECC71"
                  strokeWidth={2}
                  name="Engagement"
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#40B4E5"
                  strokeWidth={2}
                  name="Mood"
                />
                <Line
                  type="monotone"
                  dataKey="productivity"
                  stroke="#9B59B6"
                  strokeWidth={2}
                  name="Productivity"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Team Health Radar */}
            <Card className="p-6 card-gradient border-white/10">
              <h2 className="mb-4">Team Health Radar</h2>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={teamHealthMetrics}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="metric" stroke="#A8B2C1" />
                  <PolarRadiusAxis stroke="#A8B2C1" />
                  <Radar
                    name="Team Health"
                    dataKey="score"
                    stroke="#2ECC71"
                    fill="#2ECC71"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            {/* Mood Distribution */}
            <Card className="p-6 card-gradient border-white/10">
              <h2 className="mb-4">Current Mood Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={moodDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="mood" stroke="#A8B2C1" />
                  <YAxis stroke="#A8B2C1" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#172235',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="#40B4E5" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Quick Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 card-gradient border-white/10 border-l-4 border-l-[#2ECC71]">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-[#2ECC71]" />
                <h3 className="text-sm">Positive Trend</h3>
              </div>
              <p className="text-sm text-[#A8B2C1]">
                Team engagement up 7% this week. Great momentum!
              </p>
            </Card>
            <Card className="p-4 card-gradient border-white/10 border-l-4 border-l-[#FF6B35]">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-5 h-5 text-[#FF6B35]" />
                <h3 className="text-sm">Action Needed</h3>
              </div>
              <p className="text-sm text-[#A8B2C1]">
                2 team members need check-in. Schedule 1:1s soon.
              </p>
            </Card>
            <Card className="p-4 card-gradient border-white/10 border-l-4 border-l-[#40B4E5]">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-[#40B4E5]" />
                <h3 className="text-sm">Recognition</h3>
              </div>
              <p className="text-sm text-[#A8B2C1]">
                Sarah and Jordan are team MVPs this week!
              </p>
            </Card>
          </div>
        </TabsContent>

        {/* Individuals Tab */}
        <TabsContent value="individuals" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="p-5 card-gradient border-white/10 hover:border-[#2ECC71]/50 transition-all cursor-pointer"
                onClick={() => setSelectedMember(member.id)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="text-base">{member.name}</h3>
                        <p className="text-sm text-[#A8B2C1]">{member.role}</p>
                      </div>
                      <Badge
                        className="text-xs"
                        style={{
                          backgroundColor: `${getStatusColor(member.status)}20`,
                          color: getStatusColor(member.status),
                          borderColor: `${getStatusColor(member.status)}50`,
                        }}
                      >
                        {getStatusLabel(member.status)}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-lg mb-1">{member.engagement}%</div>
                    <div className="text-xs text-[#A8B2C1]">Engage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg mb-1">{member.productivity}%</div>
                    <div className="text-xs text-[#A8B2C1]">Product</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg mb-1">{member.collaboration}%</div>
                    <div className="text-xs text-[#A8B2C1]">Collab</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg mb-1">{member.wellbeing}%</div>
                    <div className="text-xs text-[#A8B2C1]">Health</div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="flex items-center gap-2 text-sm text-[#A8B2C1] mb-3">
                  {getMoodIcon(member.mood)}
                  <span>{member.recentActivity}</span>
                </div>

                {/* Concerns */}
                {member.concerns.length > 0 && (
                  <div className="space-y-1 mb-3">
                    {member.concerns.map((concern, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-[#FF6B35] bg-[#FF6B35]/10 p-2 rounded"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>{concern}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-xs text-[#A8B2C1]">
                    Last check-in: {member.lastCheckIn}
                  </span>
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6 mt-6">
          <Card className="p-6 card-gradient border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2>Team Feedback</h2>
              <Button className="bg-[#2ECC71] hover:bg-[#2ECC71]/80">
                <MessageSquare className="w-4 h-4 mr-2" />
                Share Feedback
              </Button>
            </div>

            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {recentFeedback.map((feedback) => (
                  <Card
                    key={feedback.id}
                    className="p-4 card-gradient border-white/10"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {feedback.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{feedback.author}</span>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                feedback.type === 'kudos'
                                  ? 'text-[#2ECC71] border-[#2ECC71]/50'
                                  : feedback.type === 'concern'
                                  ? 'text-[#FF6B35] border-[#FF6B35]/50'
                                  : 'text-[#40B4E5] border-[#40B4E5]/50'
                              }`}
                            >
                              {feedback.type}
                            </Badge>
                          </div>
                          <span className="text-xs text-[#A8B2C1]">
                            {feedback.timestamp}
                          </span>
                        </div>
                        <p className="text-sm mb-3">{feedback.message}</p>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {feedback.likes}
                          </Button>
                          <Button size="sm" variant="ghost">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6 mt-6">
          <Card className="p-6 card-gradient border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2>Upcoming Team Events</h2>
              <Button className="bg-[#40B4E5] hover:bg-[#40B4E5]/80">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Event
              </Button>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <Card
                  key={event.id}
                  className="p-4 card-gradient border-white/10 hover:border-[#40B4E5]/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 text-center">
                      <div className="text-2xl">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-xs text-[#A8B2C1]">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                        })}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base">{event.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#A8B2C1]">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.attendees} attending
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}