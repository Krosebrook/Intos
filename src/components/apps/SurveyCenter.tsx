import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Switch } from '../ui/switch';
import {
  ClipboardList,
  Plus,
  Send,
  Edit,
  Copy,
  Trash2,
  BarChart3,
  Users,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Mail,
  Link2,
  Download,
  Share2,
  Eye,
  Settings,
  CheckCircle2,
  Circle,
  Square,
  Type,
  Sparkles,
  Calendar,
  Clock,
  Target,
  AlertCircle,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';

interface Survey {
  id: string;
  title: string;
  description: string;
  type: 'csat' | 'nps' | 'custom' | 'ces';
  status: 'draft' | 'active' | 'paused' | 'completed';
  responses: number;
  responseRate: number;
  avgScore?: number;
  createdAt: Date;
  lastSent?: Date;
  questions: SurveyQuestion[];
}

interface SurveyQuestion {
  id: string;
  type: 'rating' | 'scale' | 'multiple-choice' | 'text' | 'yes-no';
  question: string;
  required: boolean;
  options?: string[];
}

interface SurveyResponse {
  id: string;
  surveyId: string;
  respondent: string;
  submittedAt: Date;
  score?: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  answers: Record<string, any>;
}

const mockSurveys: Survey[] = [
  {
    id: 'survey-1',
    title: 'Post-Support CSAT Survey',
    description: 'Customer satisfaction after ticket resolution',
    type: 'csat',
    status: 'active',
    responses: 234,
    responseRate: 68.2,
    avgScore: 4.3,
    createdAt: new Date(2025, 8, 1),
    lastSent: new Date(2025, 9, 24),
    questions: [
      {
        id: 'q1',
        type: 'rating',
        question: 'How satisfied were you with our support?',
        required: true
      },
      {
        id: 'q2',
        type: 'text',
        question: 'What could we improve?',
        required: false
      }
    ]
  },
  {
    id: 'survey-2',
    title: 'Product NPS Survey',
    description: 'Net Promoter Score for our platform',
    type: 'nps',
    status: 'active',
    responses: 567,
    responseRate: 42.1,
    avgScore: 8.1,
    createdAt: new Date(2025, 7, 15),
    lastSent: new Date(2025, 9, 20),
    questions: [
      {
        id: 'q1',
        type: 'scale',
        question: 'How likely are you to recommend us to a colleague?',
        required: true
      }
    ]
  },
  {
    id: 'survey-3',
    title: 'Onboarding Feedback',
    description: 'Customer experience during onboarding',
    type: 'custom',
    status: 'active',
    responses: 89,
    responseRate: 71.5,
    avgScore: 4.5,
    createdAt: new Date(2025, 9, 1),
    lastSent: new Date(2025, 9, 23),
    questions: [
      {
        id: 'q1',
        type: 'rating',
        question: 'How easy was the onboarding process?',
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Which resources were most helpful?',
        required: true,
        options: ['Documentation', 'Video Tutorials', 'Support Team', 'Knowledge Base']
      }
    ]
  }
];

const mockResponses: SurveyResponse[] = [
  {
    id: 'resp-1',
    surveyId: 'survey-1',
    respondent: 'customer1@example.com',
    submittedAt: new Date(2025, 9, 24, 14, 30),
    score: 5,
    sentiment: 'positive',
    answers: {
      q1: 5,
      q2: 'Great support, very responsive!'
    }
  },
  {
    id: 'resp-2',
    surveyId: 'survey-1',
    respondent: 'customer2@example.com',
    submittedAt: new Date(2025, 9, 24, 10, 15),
    score: 3,
    sentiment: 'neutral',
    answers: {
      q1: 3,
      q2: 'Could be faster'
    }
  },
  {
    id: 'resp-3',
    surveyId: 'survey-1',
    respondent: 'customer3@example.com',
    submittedAt: new Date(2025, 9, 23, 16, 45),
    score: 2,
    sentiment: 'negative',
    answers: {
      q1: 2,
      q2: 'Took too long to resolve my issue'
    }
  }
];

export function SurveyCenter() {
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [showBuilder, setShowBuilder] = useState(false);
  const [viewMode, setViewMode] = useState<'overview' | 'responses'>('overview');

  const getSentimentColor = (sentiment: string) => {
    const colors = {
      positive: '#46A57B',
      neutral: '#E27305',
      negative: '#F87171'
    };
    return colors[sentiment as keyof typeof colors] || '#CBD5E0';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: '#46A57B',
      paused: '#E27305',
      draft: '#CBD5E0',
      completed: '#529ADB'
    };
    return colors[status as keyof typeof colors] || '#CBD5E0';
  };

  const calculateNPS = () => {
    // Mock NPS calculation
    const promoters = 65; // 9-10 scores
    const detractors = 15; // 0-6 scores
    return promoters - detractors;
  };

  return (
    <div className="h-full flex flex-col p-6 gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">SurveyCenter</h1>
          <p className="text-gray-400">Customer feedback surveys with AI sentiment analysis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-white/20 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm" className="bg-[#E27305] hover:bg-[#F08515] text-white" onClick={() => setShowBuilder(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Survey
          </Button>
        </div>
      </div>

      {/* AI Insights */}
      <Alert className="border-[#529ADB] bg-[#529ADB]/10">
        <Sparkles className="w-4 h-4 text-[#529ADB]" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-sm text-gray-300">
            <strong className="text-white">AI Insight:</strong> CSAT trending down 8% this week. Most common complaint: "slow response time"
          </span>
          <Button size="sm" variant="outline" className="border-[#529ADB] text-[#529ADB] hover:bg-[#529ADB]/10">
            View Analysis
          </Button>
        </AlertDescription>
      </Alert>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-gray-400">Active Surveys</p>
                <p className="text-2xl text-white">8</p>
              </div>
              <ClipboardList className="w-8 h-8 text-[#E27305]" />
            </div>
            <div className="flex items-center gap-1 text-sm text-[#46A57B]">
              <TrendingUp className="w-4 h-4" />
              +2 this month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-gray-400">Total Responses</p>
                <p className="text-2xl text-white">1,247</p>
              </div>
              <Users className="w-8 h-8 text-[#529ADB]" />
            </div>
            <div className="flex items-center gap-1 text-sm text-[#46A57B]">
              <TrendingUp className="w-4 h-4" />
              +18.2%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-gray-400">Avg CSAT Score</p>
                <p className="text-2xl text-white">4.3</p>
              </div>
              <Star className="w-8 h-8 text-[#E27305]" />
            </div>
            <div className="flex items-center gap-1 text-sm text-red-400">
              <TrendingDown className="w-4 h-4" />
              -0.2 this week
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-gray-400">NPS Score</p>
                <p className="text-2xl text-white">+{calculateNPS()}</p>
              </div>
              <Target className="w-8 h-8 text-[#46A57B]" />
            </div>
            <div className="flex items-center gap-1 text-sm text-[#46A57B]">
              <TrendingUp className="w-4 h-4" />
              +5 points
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={viewMode} onValueChange={(v: any) => setViewMode(v)} className="flex-1 flex flex-col min-h-0">
        <TabsList className="bg-white/5 w-full justify-start">
          <TabsTrigger value="overview">
            <BarChart3 className="w-4 h-4 mr-2" />
            Survey Overview
          </TabsTrigger>
          <TabsTrigger value="responses">
            <MessageSquare className="w-4 h-4 mr-2" />
            Recent Responses
          </TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="flex-1 mt-6">
          <div className="grid grid-cols-1 gap-6">
            {mockSurveys.map((survey) => (
              <Card key={survey.id} className="bg-white/5 border-white/10">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white">{survey.title}</h3>
                        <Badge style={{
                          backgroundColor: `${getStatusColor(survey.status)}20`,
                          color: getStatusColor(survey.status)
                        }}>
                          {survey.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {survey.type.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">{survey.description}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedSurvey(survey)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Send className="w-4 h-4 mr-2" />
                          Send Now
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Responses</p>
                      <p className="text-lg text-white">{survey.responses}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Response Rate</p>
                      <p className="text-lg text-white">{survey.responseRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Avg Score</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-[#E27305]" />
                        <p className="text-lg text-white">{survey.avgScore}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Created</p>
                      <p className="text-sm text-white">{survey.createdAt.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Last Sent</p>
                      <p className="text-sm text-white">
                        {survey.lastSent ? survey.lastSent.toLocaleDateString() : 'Never'}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-400">Response Rate</p>
                      <p className="text-sm text-white">{survey.responseRate}%</p>
                    </div>
                    <Progress value={survey.responseRate} className="h-2" />
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="bg-[#529ADB] hover:bg-[#6AABEB] text-white">
                      <Eye className="w-4 h-4 mr-2" />
                      View Results
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/20">
                      <Send className="w-4 h-4 mr-2" />
                      Send Survey
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/20">
                      <Link2 className="w-4 h-4 mr-2" />
                      Copy Link
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Responses */}
        <TabsContent value="responses" className="flex-1 mt-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-white">Recent Survey Responses</h3>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Surveys</SelectItem>
                      <SelectItem value="csat">CSAT Only</SelectItem>
                      <SelectItem value="nps">NPS Only</SelectItem>
                      <SelectItem value="custom">Custom Only</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all-sentiment">
                    <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-sentiment">All Sentiment</SelectItem>
                      <SelectItem value="positive">Positive Only</SelectItem>
                      <SelectItem value="neutral">Neutral Only</SelectItem>
                      <SelectItem value="negative">Negative Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {mockResponses.map((response) => {
                    const survey = mockSurveys.find(s => s.id === response.surveyId);
                    return (
                      <div key={response.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-white">{survey?.title}</h4>
                              <Badge style={{
                                backgroundColor: `${getSentimentColor(response.sentiment)}20`,
                                color: getSentimentColor(response.sentiment)
                              }}>
                                {response.sentiment}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span>{response.respondent}</span>
                              <span>•</span>
                              <span>{response.submittedAt.toLocaleString()}</span>
                            </div>
                          </div>
                          {response.score && (
                            <div className="flex items-center gap-1">
                              <Star className="w-5 h-5 text-[#E27305]" />
                              <span className="text-lg text-white">{response.score}</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          {Object.entries(response.answers).map(([qId, answer]) => {
                            const question = survey?.questions.find(q => q.id === qId);
                            return (
                              <div key={qId} className="p-3 rounded bg-white/5">
                                <p className="text-sm text-gray-400 mb-1">{question?.question}</p>
                                <p className="text-white">
                                  {typeof answer === 'number' ? `${answer}/5` : answer}
                                </p>
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="border-white/20 text-white">
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            Helpful
                          </Button>
                          <Button size="sm" variant="outline" className="border-white/20 text-white">
                            <Mail className="w-3 h-3 mr-1" />
                            Follow Up
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Survey Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowBuilder(false)}>
          <Card className="bg-[#172235] border-white/10 w-full max-w-3xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-white">Create New Survey</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowBuilder(false)}>×</Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6">
                  {/* Survey Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Survey Title</label>
                      <Input placeholder="e.g., Customer Satisfaction Survey" className="bg-white/5 border-white/10 text-white" />
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Description</label>
                      <Textarea placeholder="Brief description of the survey..." className="bg-white/5 border-white/10 text-white" rows={3} />
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Survey Type</label>
                      <Select>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="csat">CSAT (Customer Satisfaction)</SelectItem>
                          <SelectItem value="nps">NPS (Net Promoter Score)</SelectItem>
                          <SelectItem value="ces">CES (Customer Effort Score)</SelectItem>
                          <SelectItem value="custom">Custom Survey</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-white">Questions</h4>
                      <Button size="sm" variant="outline" className="border-white/20">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Question
                      </Button>
                    </div>

                    {/* Sample Question */}
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <label className="text-sm text-gray-400 mb-2 block">Question Type</label>
                          <Select defaultValue="rating">
                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rating">
                                <div className="flex items-center gap-2">
                                  <Star className="w-4 h-4" />
                                  Star Rating (1-5)
                                </div>
                              </SelectItem>
                              <SelectItem value="scale">
                                <div className="flex items-center gap-2">
                                  <BarChart3 className="w-4 h-4" />
                                  Scale (0-10)
                                </div>
                              </SelectItem>
                              <SelectItem value="multiple-choice">
                                <div className="flex items-center gap-2">
                                  <Circle className="w-4 h-4" />
                                  Multiple Choice
                                </div>
                              </SelectItem>
                              <SelectItem value="text">
                                <div className="flex items-center gap-2">
                                  <Type className="w-4 h-4" />
                                  Text Response
                                </div>
                              </SelectItem>
                              <SelectItem value="yes-no">
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4" />
                                  Yes/No
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                      </div>

                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Question Text</label>
                        <Input 
                          placeholder="How satisfied were you with our service?" 
                          className="bg-white/5 border-white/10 text-white" 
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <Switch id="required" />
                        <label htmlFor="required" className="text-sm text-white">Required question</label>
                      </div>
                    </div>
                  </div>

                  {/* Distribution Settings */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <h4 className="text-white">Distribution Settings</h4>

                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Send Via</label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Switch id="email" defaultChecked />
                          <label htmlFor="email" className="text-sm text-white">Email (Gmail/Outlook)</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch id="link" />
                          <label htmlFor="link" className="text-sm text-white">Shareable Link</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch id="auto" />
                          <label htmlFor="auto" className="text-sm text-white">Automatic (after ticket resolution)</label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Delay After Trigger</label>
                      <Select defaultValue="24">
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Immediate</SelectItem>
                          <SelectItem value="1">1 hour</SelectItem>
                          <SelectItem value="24">24 hours</SelectItem>
                          <SelectItem value="48">48 hours</SelectItem>
                          <SelectItem value="168">1 week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1 bg-[#46A57B] hover:bg-[#58B68D] text-white">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Create Survey
                    </Button>
                    <Button variant="outline" className="border-white/20" onClick={() => setShowBuilder(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Survey Details Modal */}
      {selectedSurvey && !showBuilder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedSurvey(null)}>
          <Card className="bg-[#172235] border-white/10 w-full max-w-4xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white mb-2">{selectedSurvey.title}</h3>
                  <p className="text-sm text-gray-400">{selectedSurvey.description}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedSurvey(null)}>×</Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-sm text-gray-400 mb-1">Total Responses</p>
                      <p className="text-2xl text-white">{selectedSurvey.responses}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-sm text-gray-400 mb-1">Response Rate</p>
                      <p className="text-2xl text-white">{selectedSurvey.responseRate}%</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-sm text-gray-400 mb-1">Average Score</p>
                      <div className="flex items-center gap-2">
                        <Star className="w-6 h-6 text-[#E27305]" />
                        <p className="text-2xl text-white">{selectedSurvey.avgScore}</p>
                      </div>
                    </div>
                  </div>

                  {/* Sentiment Breakdown */}
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="text-white mb-4">Sentiment Breakdown</h4>
                    <div className="space-y-3">
                      {[
                        { sentiment: 'Positive', count: 156, percentage: 66.7, color: '#46A57B' },
                        { sentiment: 'Neutral', count: 52, percentage: 22.2, color: '#E27305' },
                        { sentiment: 'Negative', count: 26, percentage: 11.1, color: '#F87171' }
                      ].map((item) => (
                        <div key={item.sentiment}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-white">{item.sentiment}</span>
                            <span className="text-sm text-gray-400">{item.count} ({item.percentage}%)</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full"
                              style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Responses */}
                  <div>
                    <h4 className="text-white mb-4">Recent Responses</h4>
                    <div className="space-y-3">
                      {mockResponses
                        .filter(r => r.surveyId === selectedSurvey.id)
                        .slice(0, 5)
                        .map((response) => (
                          <div key={response.id} className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-white">{response.respondent}</span>
                              <Badge style={{
                                backgroundColor: `${getSentimentColor(response.sentiment)}20`,
                                color: getSentimentColor(response.sentiment)
                              }}>
                                {response.sentiment}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-400">
                              {response.submittedAt.toLocaleString()}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
