import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Alert, AlertDescription } from '../ui/alert';
import { Textarea } from '../ui/textarea';
import {
  Zap,
  Plus,
  Play,
  Pause,
  Settings,
  Copy,
  Trash2,
  Save,
  GitBranch,
  Mail,
  Calendar,
  Users,
  FileText,
  DollarSign,
  Ticket,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  Sparkles,
  AlertCircle,
  Filter,
  MessageSquare,
  Phone,
  Upload,
  Download,
  Search,
  MoreVertical,
  ChevronDown,
  ChevronRight
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
import { Switch } from '../ui/switch';

// Workflow node types
type NodeType = 'trigger' | 'condition' | 'action' | 'delay';

interface WorkflowNode {
  id: string;
  type: NodeType;
  config: {
    title: string;
    description?: string;
    icon?: string;
    color?: string;
    settings?: Record<string, any>;
  };
  children?: WorkflowNode[];
  position?: { x: number; y: number };
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'draft';
  trigger: WorkflowNode;
  createdAt: string;
  lastRun?: string;
  runCount: number;
  successRate: number;
}

// Mock workflows
const mockWorkflows: Workflow[] = [
  {
    id: 'wf-1',
    name: 'High-Priority Email Escalation',
    description: 'Auto-escalate negative sentiment emails to urgent queue and notify Teams',
    status: 'active',
    trigger: {
      id: 'trigger-1',
      type: 'trigger',
      config: {
        title: 'New Email Received',
        icon: 'Mail',
        color: '#529ADB',
        settings: { source: 'gmail,outlook', priority: 'high' }
      },
      children: [
        {
          id: 'condition-1',
          type: 'condition',
          config: {
            title: 'Sentiment < -0.5?',
            icon: 'Filter',
            color: '#E27305',
            settings: { field: 'sentiment', operator: 'lt', value: -0.5 }
          },
          children: [
            {
              id: 'action-1',
              type: 'action',
              config: {
                title: 'Create Urgent Ticket',
                icon: 'Ticket',
                color: '#F87171',
                settings: { platform: 'freshdesk', priority: 'urgent' }
              }
            },
            {
              id: 'action-2',
              type: 'action',
              config: {
                title: 'Notify Teams Channel',
                icon: 'Users',
                color: '#46A57B',
                settings: { team: 'support', channel: 'urgent', type: 'adaptive-card' }
              }
            },
            {
              id: 'action-3',
              type: 'action',
              config: {
                title: 'Schedule Escalation Call',
                icon: 'Calendar',
                color: '#E27305',
                settings: { duration: 30, timeframe: '2 hours' }
              }
            }
          ]
        }
      ]
    },
    createdAt: '2025-10-15',
    lastRun: '2 min ago',
    runCount: 847,
    successRate: 98.5
  },
  {
    id: 'wf-2',
    name: 'Deal Stage Change Automation',
    description: 'When deal moves to "Proposal Sent", schedule follow-up and create project',
    status: 'active',
    trigger: {
      id: 'trigger-2',
      type: 'trigger',
      config: {
        title: 'HubSpot Deal Updated',
        icon: 'DollarSign',
        color: '#E27305',
        settings: { event: 'deal.stage_changed', stage: 'proposal-sent' }
      },
      children: [
        {
          id: 'action-4',
          type: 'action',
          config: {
            title: 'Schedule Follow-up Meeting',
            icon: 'Calendar',
            color: '#529ADB',
            settings: { duration: 60, daysAhead: 3 }
          }
        },
        {
          id: 'action-5',
          type: 'action',
          config: {
            title: 'Create Notion Project Page',
            icon: 'FileText',
            color: '#46A57B',
            settings: { workspace: 'sales', template: 'deal-project' }
          }
        },
        {
          id: 'action-6',
          type: 'action',
          config: {
            title: 'Send Email to Contact',
            icon: 'Mail',
            color: '#529ADB',
            settings: { template: 'proposal-sent', includeDocument: true }
          }
        }
      ]
    },
    createdAt: '2025-10-10',
    lastRun: '15 min ago',
    runCount: 234,
    successRate: 100
  },
  {
    id: 'wf-3',
    name: 'Customer Feedback Survey',
    description: 'Send CSAT survey 24 hours after ticket resolution',
    status: 'active',
    trigger: {
      id: 'trigger-3',
      type: 'trigger',
      config: {
        title: 'Freshdesk Ticket Resolved',
        icon: 'CheckCircle2',
        color: '#46A57B',
        settings: { status: 'resolved' }
      },
      children: [
        {
          id: 'delay-1',
          type: 'delay',
          config: {
            title: 'Wait 24 Hours',
            icon: 'Clock',
            color: '#CBD5E0',
            settings: { duration: 24, unit: 'hours' }
          },
          children: [
            {
              id: 'action-7',
              type: 'action',
              config: {
                title: 'Send CSAT Survey',
                icon: 'MessageSquare',
                color: '#529ADB',
                settings: { type: 'csat', questions: 3 }
              }
            }
          ]
        }
      ]
    },
    createdAt: '2025-09-20',
    lastRun: '1 hour ago',
    runCount: 1523,
    successRate: 96.2
  }
];

// Workflow templates
const workflowTemplates = [
  {
    id: 'template-1',
    name: 'Email to Ticket Automation',
    description: 'Convert high-priority emails to support tickets automatically',
    category: 'Support',
    icon: Mail,
    color: '#529ADB'
  },
  {
    id: 'template-2',
    name: 'Lead Nurturing Sequence',
    description: 'Multi-step email sequence for new leads from HubSpot',
    category: 'Sales',
    icon: Users,
    color: '#E27305'
  },
  {
    id: 'template-3',
    name: 'Incident Response',
    description: 'Alert on-call team and create war room for critical incidents',
    category: 'Operations',
    icon: AlertCircle,
    color: '#F87171'
  },
  {
    id: 'template-4',
    name: 'Onboarding Automation',
    description: 'Automated onboarding workflow for new customers',
    category: 'Customer Success',
    icon: CheckCircle2,
    color: '#46A57B'
  },
  {
    id: 'template-5',
    name: 'Contract Renewal Reminder',
    description: 'Notify sales team 30 days before contract expiration',
    category: 'Sales',
    icon: Calendar,
    color: '#E27305'
  },
  {
    id: 'template-6',
    name: 'Feedback Collection',
    description: 'Automated post-purchase or post-support feedback surveys',
    category: 'Feedback',
    icon: MessageSquare,
    color: '#529ADB'
  }
];

// Available triggers
const availableTriggers = [
  { id: 'email-received', name: 'Email Received', icon: Mail, source: 'Gmail/Outlook', color: '#529ADB' },
  { id: 'ticket-created', name: 'Ticket Created', icon: Ticket, source: 'Freshdesk', color: '#529ADB' },
  { id: 'deal-updated', name: 'Deal Updated', icon: DollarSign, source: 'HubSpot', color: '#E27305' },
  { id: 'contact-added', name: 'Contact Added', icon: Users, source: 'HubSpot', color: '#E27305' },
  { id: 'calendar-event', name: 'Calendar Event', icon: Calendar, source: 'Google Calendar', color: '#46A57B' },
  { id: 'file-uploaded', name: 'File Uploaded', icon: Upload, source: 'Drive/Dropbox', color: '#529ADB' },
  { id: 'survey-response', name: 'Survey Response', icon: MessageSquare, source: 'Survey Center', color: '#529ADB' },
  { id: 'teams-message', name: 'Teams Message', icon: Users, source: 'Microsoft Teams', color: '#46A57B' }
];

// Available actions
const availableActions = [
  { id: 'create-ticket', name: 'Create Ticket', icon: Ticket, target: 'Freshdesk', color: '#529ADB' },
  { id: 'send-email', name: 'Send Email', icon: Mail, target: 'Gmail/Outlook', color: '#529ADB' },
  { id: 'schedule-meeting', name: 'Schedule Meeting', icon: Calendar, target: 'Google Calendar', color: '#46A57B' },
  { id: 'notify-teams', name: 'Notify Teams', icon: Users, target: 'Microsoft Teams', color: '#46A57B' },
  { id: 'update-deal', name: 'Update Deal', icon: DollarSign, target: 'HubSpot', color: '#E27305' },
  { id: 'create-notion-page', name: 'Create Page', icon: FileText, target: 'Notion', color: '#46A57B' },
  { id: 'upload-file', name: 'Upload File', icon: Upload, target: 'Drive/Dropbox', color: '#529ADB' },
  { id: 'send-sms', name: 'Send SMS', icon: Phone, target: 'Twilio', color: '#E27305' },
  { id: 'webhook', name: 'Call Webhook', icon: Zap, target: 'Custom API', color: '#CBD5E0' }
];

const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    Mail, Calendar, Users, FileText, DollarSign, Ticket, CheckCircle2,
    Filter, MessageSquare, Phone, Upload, Clock, Zap
  };
  return icons[iconName] || Activity;
};

export function WorkflowEngine() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'builder'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paused' | 'draft'>('all');

  const filteredWorkflows = mockWorkflows.filter(wf => {
    const matchesSearch = wf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         wf.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || wf.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      active: '#46A57B',
      paused: '#E27305',
      draft: '#CBD5E0'
    };
    return colors[status as keyof typeof colors] || '#CBD5E0';
  };

  // Recursive workflow node renderer
  const renderWorkflowNode = (node: WorkflowNode, depth: number = 0) => {
    const Icon = getIconComponent(node.config.icon || 'Activity');
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="relative">
        {/* Node Card */}
        <div 
          className="p-4 rounded-lg border-2 transition-all hover:shadow-lg cursor-pointer"
          style={{
            backgroundColor: `${node.config.color}10`,
            borderColor: `${node.config.color}60`
          }}
        >
          <div className="flex items-start gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ 
                backgroundColor: `${node.config.color}20`,
                border: `2px solid ${node.config.color}`
              }}
            >
              <Icon className="w-5 h-5" style={{ color: node.config.color }} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <Badge 
                  className="text-xs"
                  style={{
                    backgroundColor: `${node.config.color}20`,
                    color: node.config.color,
                    borderColor: `${node.config.color}40`
                  }}
                >
                  {node.type}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <h4 className="text-white mb-1">{node.config.title}</h4>
              
              {node.config.description && (
                <p className="text-xs text-gray-400 mb-2">{node.config.description}</p>
              )}
              
              {node.config.settings && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {Object.entries(node.config.settings).slice(0, 3).map(([key, value]) => (
                    <Badge key={key} variant="outline" className="text-xs bg-white/5 border-white/20 text-gray-400">
                      {key}: {String(value)}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Connection Line & Children */}
        {hasChildren && (
          <div className="ml-8 mt-4 border-l-2 border-white/20 pl-4 space-y-4">
            {node.children!.map((child, idx) => (
              <div key={child.id} className="relative">
                {/* Horizontal connector */}
                <div className="absolute left-0 top-6 w-4 h-0.5 bg-white/20" />
                {renderWorkflowNode(child, depth + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col p-6 gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">Workflow Engine</h1>
          <p className="text-gray-400">Visual automation builder - no code required</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-white/20 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-[#E27305] hover:bg-[#F08515] text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Workflow
          </Button>
        </div>
      </div>

      {/* AI Assistant */}
      <Alert className="border-[#529ADB] bg-[#529ADB]/10">
        <Sparkles className="w-4 h-4 text-[#529ADB]" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-sm text-gray-300">
            <strong className="text-white">AI Workflow Builder:</strong> Describe your automation in plain English. 
            Try: "When a customer mentions 'refund' in email, assign to finance and schedule a call within 24 hours"
          </span>
          <Button size="sm" variant="outline" className="border-[#529ADB] text-[#529ADB] hover:bg-[#529ADB]/10">
            Try AI Builder
          </Button>
        </AlertDescription>
      </Alert>

      {/* Stats */}
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

      {/* Main Content */}
      <Tabs value={viewMode} onValueChange={(v: any) => setViewMode(v)} className="flex-1 flex flex-col min-h-0">
        <TabsList className="bg-white/5 w-full justify-start">
          <TabsTrigger value="list">My Workflows</TabsTrigger>
          <TabsTrigger value="builder">Workflow Builder</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">Execution History</TabsTrigger>
        </TabsList>

        {/* Workflows List */}
        <TabsContent value="list" className="flex-1 min-h-0 mt-6">
          <Card className="bg-white/5 border-white/10 h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search workflows..."
                    className="pl-10 bg-white/5 border-white/10 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={(v: any) => setFilterStatus(v)}>
                  <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="paused">Paused Only</SelectItem>
                    <SelectItem value="draft">Drafts Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div className="space-y-4">
                  {filteredWorkflows.map((workflow) => (
                    <div
                      key={workflow.id}
                      className={`p-4 rounded-lg border transition-all cursor-pointer ${
                        selectedWorkflow?.id === workflow.id
                          ? 'bg-white/10 border-[#529ADB]'
                          : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                      onClick={() => setSelectedWorkflow(workflow)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-white">{workflow.name}</h3>
                            <Badge
                              className="text-xs"
                              style={{
                                backgroundColor: `${getStatusColor(workflow.status)}20`,
                                color: getStatusColor(workflow.status),
                                borderColor: `${getStatusColor(workflow.status)}40`
                              }}
                            >
                              {workflow.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400 mb-3">{workflow.description}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Switch checked={workflow.status === 'active'} />
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                        <div>
                          <p className="text-gray-400">Executions</p>
                          <p className="text-white">{workflow.runCount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Success Rate</p>
                          <p className="text-white">{workflow.successRate}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Last Run</p>
                          <p className="text-white">{workflow.lastRun || 'Never'}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          <Badge variant="outline" className="text-xs bg-white/5 border-white/20 text-gray-400">
                            Created {workflow.createdAt}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-white/20 text-white h-7">
                            <Copy className="w-3 h-3 mr-1" />
                            Duplicate
                          </Button>
                          <Button variant="outline" size="sm" className="border-white/20 text-white h-7">
                            <GitBranch className="w-3 h-3 mr-1" />
                            View Flow
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workflow Builder */}
        <TabsContent value="builder" className="flex-1 min-h-0 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
            {/* Component Palette */}
            <Card className="bg-white/5 border-white/10 lg:col-span-1">
              <CardHeader>
                <h3 className="text-white">Components</h3>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {/* Triggers */}
                    <div>
                      <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Triggers
                      </h4>
                      <div className="space-y-2">
                        {availableTriggers.map((trigger) => {
                          const Icon = trigger.icon;
                          return (
                            <div
                              key={trigger.id}
                              className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 cursor-move transition-all"
                              draggable
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <Icon className="w-4 h-4" style={{ color: trigger.color }} />
                                <span className="text-sm text-white">{trigger.name}</span>
                              </div>
                              <p className="text-xs text-gray-400">{trigger.source}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Conditions */}
                    <div>
                      <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                        <GitBranch className="w-4 h-4" />
                        Conditions
                      </h4>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 cursor-move transition-all">
                          <div className="flex items-center gap-2 mb-1">
                            <Filter className="w-4 h-4 text-[#E27305]" />
                            <span className="text-sm text-white">If/Else</span>
                          </div>
                          <p className="text-xs text-gray-400">Branch based on condition</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 cursor-move transition-all">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle2 className="w-4 h-4 text-[#46A57B]" />
                            <span className="text-sm text-white">Filter</span>
                          </div>
                          <p className="text-xs text-gray-400">Continue if condition met</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div>
                      <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        Actions
                      </h4>
                      <div className="space-y-2">
                        {availableActions.map((action) => {
                          const Icon = action.icon;
                          return (
                            <div
                              key={action.id}
                              className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 cursor-move transition-all"
                              draggable
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <Icon className="w-4 h-4" style={{ color: action.color }} />
                                <span className="text-sm text-white">{action.name}</span>
                              </div>
                              <p className="text-xs text-gray-400">{action.target}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Utilities */}
                    <div>
                      <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Utilities
                      </h4>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 cursor-move transition-all">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-[#CBD5E0]" />
                            <span className="text-sm text-white">Delay</span>
                          </div>
                          <p className="text-xs text-gray-400">Wait before next step</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Canvas */}
            <Card className="bg-white/5 border-white/10 lg:col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white mb-1">Workflow Canvas</h3>
                    <p className="text-sm text-gray-400">
                      {selectedWorkflow ? `Editing: ${selectedWorkflow.name}` : 'Drag components to build your workflow'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-white/20">
                      <Play className="w-4 h-4 mr-2" />
                      Test Run
                    </Button>
                    <Button size="sm" className="bg-[#46A57B] hover:bg-[#58B68D] text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <ScrollArea className="h-[600px]">
                  {selectedWorkflow ? (
                    <div className="p-4">
                      {renderWorkflowNode(selectedWorkflow.trigger)}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <GitBranch className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="mb-2">Drag a trigger to start building</p>
                        <p className="text-sm">Or select a workflow from the list</p>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates" className="flex-1 min-h-0 mt-6">
          <Card className="bg-white/5 border-white/10 h-full">
            <CardHeader>
              <h3 className="text-white">Workflow Templates</h3>
              <p className="text-sm text-gray-400">Pre-built workflows to get started quickly</p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {workflowTemplates.map((template) => {
                    const Icon = template.icon;
                    return (
                      <div
                        key={template.id}
                        className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 transition-all cursor-pointer group"
                      >
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                          style={{
                            backgroundColor: `${template.color}20`,
                            border: `2px solid ${template.color}40`
                          }}
                        >
                          <Icon className="w-6 h-6" style={{ color: template.color }} />
                        </div>

                        <Badge className="mb-2 text-xs" variant="outline">
                          {template.category}
                        </Badge>

                        <h4 className="text-white mb-2">{template.name}</h4>
                        <p className="text-sm text-gray-400 mb-4">{template.description}</p>

                        <Button 
                          size="sm" 
                          className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            backgroundColor: template.color,
                            color: 'white'
                          }}
                        >
                          Use Template
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Execution History */}
        <TabsContent value="history" className="flex-1 min-h-0 mt-6">
          <Card className="bg-white/5 border-white/10 h-full">
            <CardHeader>
              <h3 className="text-white">Execution History</h3>
              <p className="text-sm text-gray-400">Recent workflow executions and results</p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-3">
                  {[
                    { workflow: 'High-Priority Email Escalation', status: 'success', time: '2 min ago', duration: '1.2s' },
                    { workflow: 'Deal Stage Change Automation', status: 'success', time: '15 min ago', duration: '2.8s' },
                    { workflow: 'High-Priority Email Escalation', status: 'success', time: '18 min ago', duration: '1.5s' },
                    { workflow: 'Customer Feedback Survey', status: 'success', time: '1 hour ago', duration: '0.9s' },
                    { workflow: 'Deal Stage Change Automation', status: 'failed', time: '2 hours ago', duration: '0.3s' },
                    { workflow: 'High-Priority Email Escalation', status: 'success', time: '3 hours ago', duration: '1.1s' }
                  ].map((execution, idx) => (
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
