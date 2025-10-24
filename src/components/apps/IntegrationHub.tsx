import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Alert, AlertDescription } from '../ui/alert';
import {
  Plug,
  Search,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  Ticket,
  Settings,
  Plus,
  ExternalLink,
  Sparkles,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

// Mock data for HubSpot CRM objects
const mockHubSpotDeals = [
  {
    id: 'deal-1',
    name: 'Acme Corp - Enterprise License',
    amount: 45000,
    stage: 'proposal-sent',
    closeDate: '2025-11-15',
    priority: 'high',
    company: 'Acme Corporation',
    contactName: 'Sarah Chen',
    contactEmail: 'sarah@acmecorp.com',
    probability: 75,
    daysToClose: 22,
    source: 'hubspot'
  },
  {
    id: 'deal-2',
    name: 'TechStart - Professional Plan',
    amount: 12500,
    stage: 'negotiation',
    closeDate: '2025-11-30',
    priority: 'medium',
    company: 'TechStart Inc',
    contactName: 'Michael Torres',
    contactEmail: 'michael@techstart.io',
    probability: 60,
    daysToClose: 37,
    source: 'hubspot'
  },
  {
    id: 'deal-3',
    name: 'Global Retail - Implementation',
    amount: 89000,
    stage: 'closed-won',
    closeDate: '2025-10-20',
    priority: 'high',
    company: 'Global Retail Group',
    contactName: 'Jennifer Park',
    contactEmail: 'jpark@globalretail.com',
    probability: 100,
    daysToClose: -4,
    source: 'hubspot'
  }
];

const mockFreshdeskTickets = [
  {
    id: 'fd-1234',
    subject: 'API Integration Issue - Production',
    status: 'open',
    priority: 'urgent',
    requester: 'David Kim',
    requesterEmail: 'david@enterprise.com',
    created: '2 hours ago',
    updated: '15 min ago',
    assignedTo: 'Support Team',
    company: 'Enterprise Solutions',
    source: 'freshdesk',
    tags: ['api', 'production', 'urgent']
  },
  {
    id: 'fd-5678',
    subject: 'Feature Request: Dark Mode',
    status: 'pending',
    priority: 'medium',
    requester: 'Lisa Anderson',
    requesterEmail: 'lisa@retailgroup.com',
    created: '1 day ago',
    updated: '3 hours ago',
    assignedTo: 'Product Team',
    company: 'Retail Group Inc',
    source: 'freshdesk',
    tags: ['feature-request', 'ui']
  },
  {
    id: 'fd-9012',
    subject: 'Billing Question - Invoice Discrepancy',
    status: 'resolved',
    priority: 'high',
    requester: 'Robert Chen',
    requesterEmail: 'robert@fintech.com',
    created: '3 days ago',
    updated: '1 day ago',
    assignedTo: 'Finance Team',
    company: 'FinTech Solutions',
    source: 'freshdesk',
    tags: ['billing', 'resolved']
  }
];

const integrations = [
  {
    id: 'hubspot',
    name: 'HubSpot CRM',
    description: 'Sync contacts, companies, deals, and tickets',
    status: 'connected',
    lastSync: '5 min ago',
    icon: Building2,
    color: '#E27305',
    objects: { contacts: 2847, companies: 523, deals: 148, tickets: 89 }
  },
  {
    id: 'freshdesk',
    name: 'Freshdesk Support',
    description: 'Unified ticket management and customer support',
    status: 'connected',
    lastSync: '10 min ago',
    icon: Ticket,
    color: '#529ADB',
    objects: { tickets: 456, contacts: 1234, agents: 12 }
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Channel notifications and meeting integration',
    status: 'pending',
    lastSync: 'Not synced',
    icon: Users,
    color: '#46A57B',
    objects: { teams: 0, channels: 0, messages: 0 }
  }
];

export function IntegrationHub() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSource, setFilterSource] = useState<'all' | 'hubspot' | 'freshdesk'>('all');

  const allRecords = [
    ...mockHubSpotDeals.map(d => ({ ...d, type: 'deal' })),
    ...mockFreshdeskTickets.map(t => ({ ...t, type: 'ticket' }))
  ];

  const filteredRecords = allRecords.filter(record => {
    const matchesSearch = searchQuery === '' || 
      (record.type === 'deal' 
        ? record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.company.toLowerCase().includes(searchQuery.toLowerCase())
        : record.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesSource = filterSource === 'all' || record.source === filterSource;
    return matchesSearch && matchesSource;
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'connected': '#46A57B',
      'pending': '#E27305',
      'error': '#F87171',
      'open': '#529ADB',
      'pending': '#E27305',
      'resolved': '#46A57B',
      'closed': '#33475B',
      'urgent': '#F87171',
      'high': '#E27305',
      'medium': '#529ADB',
      'low': '#46A57B'
    };
    return colors[status.toLowerCase()] || '#CBD5E0';
  };

  return (
    <div className="h-full flex flex-col p-6 gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">Integration Hub</h1>
          <p className="text-gray-400">Unified CRM connectors - HubSpot, Freshdesk, Microsoft Teams</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-white/20 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync All
          </Button>
          <Button size="sm" className="bg-[#E27305] hover:bg-[#F08515] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>

      {/* AI Assistant Info */}
      <Alert className="border-[#529ADB] bg-[#529ADB]/10">
        <Sparkles className="w-4 h-4 text-[#529ADB]" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-sm text-gray-300">
            <strong className="text-white">AI Assistant Ready:</strong> Ask me to retrieve data from any connector. 
            Try: "Show me all open deals for Acme Corp" or "Find urgent Freshdesk tickets"
          </span>
        </AlertDescription>
      </Alert>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Deals</p>
                <p className="text-2xl text-white">148</p>
                <p className="text-xs text-[#46A57B] mt-1">+12% this month</p>
              </div>
              <DollarSign className="w-8 h-8 text-[#E27305]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Open Tickets</p>
                <p className="text-2xl text-white">456</p>
                <p className="text-xs text-gray-400 mt-1">Avg 2.4h response</p>
              </div>
              <Ticket className="w-8 h-8 text-[#529ADB]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Contacts</p>
                <p className="text-2xl text-white">2,847</p>
                <p className="text-xs text-gray-400 mt-1">Across all CRMs</p>
              </div>
              <Users className="w-8 h-8 text-[#46A57B]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Pipeline Value</p>
                <p className="text-2xl text-white">$1.2M</p>
                <p className="text-xs text-[#46A57B] mt-1">67% close rate</p>
              </div>
              <TrendingUp className="w-8 h-8 text-[#E27305]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-1 flex flex-col min-h-0">
        <TabsList className="bg-white/5 w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="unified">Unified View</TabsTrigger>
          <TabsTrigger value="hubspot">HubSpot</TabsTrigger>
          <TabsTrigger value="freshdesk">Freshdesk</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="flex-1 min-h-0 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => {
              const Icon = integration.icon;
              return (
                <Card key={integration.id} className="bg-white/5 border-white/10 hover:border-white/30 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: `${integration.color}20`,
                          border: `1px solid ${integration.color}40`
                        }}
                      >
                        <Icon className="w-6 h-6" style={{ color: integration.color }} />
                      </div>
                      <Badge
                        className="text-xs"
                        style={{
                          backgroundColor: `${getStatusColor(integration.status)}20`,
                          color: getStatusColor(integration.status),
                          borderColor: `${getStatusColor(integration.status)}40`
                        }}
                      >
                        {integration.status === 'connected' ? (
                          <><CheckCircle2 className="w-3 h-3 mr-1" /> Connected</>
                        ) : integration.status === 'pending' ? (
                          <><Clock className="w-3 h-3 mr-1" /> Pending</>
                        ) : (
                          <><XCircle className="w-3 h-3 mr-1" /> Error</>
                        )}
                      </Badge>
                    </div>

                    <h3 className="text-xl text-white mb-2">{integration.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{integration.description}</p>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Last sync: {integration.lastSync}</span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Object counts */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {Object.entries(integration.objects).map(([key, value]) => (
                        <div key={key} className="bg-white/5 rounded p-2">
                          <p className="text-xs text-gray-400 capitalize">{key}</p>
                          <p className="text-lg text-white">{value.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-white/20 text-white hover:bg-white/10"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-white/20 text-white hover:bg-white/10"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Sync
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Unified View Tab */}
        <TabsContent value="unified" className="flex-1 min-h-0 mt-6">
          <Card className="bg-white/5 border-white/10 h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search across all integrations..."
                    className="pl-10 bg-white/5 border-white/10 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filterSource} onValueChange={(value: any) => setFilterSource(value)}>
                  <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="hubspot">HubSpot Only</SelectItem>
                    <SelectItem value="freshdesk">Freshdesk Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div className="space-y-3">
                  {filteredRecords.map((record: any) => (
                    <div
                      key={record.id}
                      className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Badge
                            className="text-xs"
                            style={{
                              backgroundColor: record.source === 'hubspot' ? '#E2730520' : '#529ADB20',
                              color: record.source === 'hubspot' ? '#E27305' : '#529ADB',
                              borderColor: record.source === 'hubspot' ? '#E2730540' : '#529ADB40'
                            }}
                          >
                            {record.source === 'hubspot' ? 'HubSpot' : 'Freshdesk'}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs bg-white/5 border-white/20 text-gray-400"
                          >
                            {record.type === 'deal' ? 'Deal' : 'Ticket'}
                          </Badge>
                        </div>
                        {record.type === 'deal' && record.daysToClose <= 30 && record.daysToClose > 0 && (
                          <Badge className="bg-[#E27305]/20 text-[#E27305] border-[#E27305]/50 text-xs">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Closing soon ({record.daysToClose}d)
                          </Badge>
                        )}
                      </div>

                      <h4 className="text-white mb-2">
                        {record.type === 'deal' ? record.name : record.subject}
                      </h4>

                      {record.type === 'deal' ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                          <div>
                            <p className="text-gray-400">Amount</p>
                            <p className="text-white">${record.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Stage</p>
                            <p className="text-white capitalize">{record.stage.replace('-', ' ')}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Close Date</p>
                            <p className="text-white">{record.closeDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Probability</p>
                            <p className="text-white">{record.probability}%</p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                          <div>
                            <p className="text-gray-400">Status</p>
                            <Badge
                              className="text-xs mt-1"
                              style={{
                                backgroundColor: `${getStatusColor(record.status)}20`,
                                color: getStatusColor(record.status),
                                borderColor: `${getStatusColor(record.status)}40`
                              }}
                            >
                              {record.status}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-gray-400">Priority</p>
                            <Badge
                              className="text-xs mt-1"
                              style={{
                                backgroundColor: `${getStatusColor(record.priority)}20`,
                                color: getStatusColor(record.priority),
                                borderColor: `${getStatusColor(record.priority)}40`
                              }}
                            >
                              {record.priority}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-gray-400">Created</p>
                            <p className="text-white">{record.created}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Assigned To</p>
                            <p className="text-white">{record.assignedTo}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">
                            {record.type === 'deal' ? 'Contact' : 'Requester'}: {' '}
                            <span className="text-white">
                              {record.type === 'deal' ? record.contactName : record.requester}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500">
                            {record.company}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="border-white/20 text-white">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* HubSpot Tab */}
        <TabsContent value="hubspot" className="flex-1 min-h-0 mt-6">
          <Alert className="mb-4 border-[#E27305] bg-[#E27305]/10">
            <Building2 className="w-4 h-4 text-[#E27305]" />
            <AlertDescription className="text-sm text-gray-300">
              <strong className="text-white">HubSpot Connected:</strong> Syncing contacts, companies, deals, and tickets.
              Last sync: 5 minutes ago. Next sync: in 25 minutes.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <h3 className="text-white">Deals Closing Soon</h3>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {mockHubSpotDeals
                      .filter(deal => deal.daysToClose > 0 && deal.daysToClose <= 30)
                      .map(deal => (
                        <div key={deal.id} className="p-3 rounded-lg bg-white/5 border border-[#E27305]/30">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-white text-sm">{deal.name}</h4>
                            <Badge className="bg-[#E27305]/20 text-[#E27305] border-[#E27305]/50 text-xs">
                              {deal.daysToClose}d
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400 mb-2">${deal.amount.toLocaleString()}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{deal.company}</span>
                            <span>{deal.probability}% probability</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <h3 className="text-white">Recent Activity</h3>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {[
                      { action: 'Deal created', item: 'Acme Corp - Enterprise License', time: '2 hours ago' },
                      { action: 'Contact updated', item: 'Sarah Chen', time: '3 hours ago' },
                      { action: 'Deal moved to', item: 'Negotiation stage', time: '5 hours ago' },
                      { action: 'Company added', item: 'TechStart Inc', time: '1 day ago' }
                    ].map((activity, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                        <Calendar className="w-4 h-4 text-[#E27305]" />
                        <div className="flex-1">
                          <p className="text-sm text-white">{activity.action}</p>
                          <p className="text-xs text-gray-400">{activity.item}</p>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Freshdesk Tab */}
        <TabsContent value="freshdesk" className="flex-1 min-h-0 mt-6">
          <Alert className="mb-4 border-[#529ADB] bg-[#529ADB]/10">
            <Ticket className="w-4 h-4 text-[#529ADB]" />
            <AlertDescription className="text-sm text-gray-300">
              <strong className="text-white">Freshdesk Connected:</strong> Real-time ticket sync active.
              Average first response time: 2.4 hours. SLA compliance: 94%.
            </AlertDescription>
          </Alert>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <h3 className="text-white">Support Tickets</h3>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-3">
                  {mockFreshdeskTickets.map(ticket => (
                    <div key={ticket.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              className="text-xs"
                              style={{
                                backgroundColor: `${getStatusColor(ticket.status)}20`,
                                color: getStatusColor(ticket.status),
                                borderColor: `${getStatusColor(ticket.status)}40`
                              }}
                            >
                              {ticket.status}
                            </Badge>
                            <Badge
                              className="text-xs"
                              style={{
                                backgroundColor: `${getStatusColor(ticket.priority)}20`,
                                color: getStatusColor(ticket.priority),
                                borderColor: `${getStatusColor(ticket.priority)}40`
                              }}
                            >
                              {ticket.priority}
                            </Badge>
                          </div>
                          <h4 className="text-white">{ticket.subject}</h4>
                        </div>
                        <span className="text-xs text-gray-500">#{ticket.id}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                        <div>
                          <p className="text-gray-400">Requester</p>
                          <p className="text-white">{ticket.requester}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Assigned To</p>
                          <p className="text-white">{ticket.assignedTo}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {ticket.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs bg-white/5 border-white/20 text-gray-400">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="outline" size="sm" className="border-white/20 text-white">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Teams Tab */}
        <TabsContent value="teams" className="flex-1 min-h-0 mt-6">
          <Alert className="border-[#46A57B] bg-[#46A57B]/10">
            <Users className="w-4 h-4 text-[#46A57B]" />
            <AlertDescription className="text-sm text-gray-300">
              <strong className="text-white">Setup Required:</strong> Connect your Microsoft Teams account to enable 
              channel notifications, meeting integration, and collaboration features.
            </AlertDescription>
          </Alert>

          <div className="mt-6 text-center">
            <Button size="lg" className="bg-[#46A57B] hover:bg-[#58B68D] text-white">
              <Users className="w-5 h-5 mr-2" />
              Connect Microsoft Teams
            </Button>
            <p className="text-sm text-gray-400 mt-4">
              You'll be redirected to Microsoft to authorize INT OS
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
