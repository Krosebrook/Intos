// Mock data generators for INT OS apps

export const generateMetrics = (count: number = 4) => {
  const metrics = [
    { label: 'Active Users', value: '2,847', change: '+12%', trend: 'up' },
    { label: 'Avg Response Time', value: '2.4m', change: '-8%', trend: 'up' },
    { label: 'Resolution Rate', value: '94.2%', change: '+5%', trend: 'up' },
    { label: 'Customer Satisfaction', value: '4.8/5', change: '+0.3', trend: 'up' },
    { label: 'Open Tickets', value: '127', change: '-15', trend: 'up' },
    { label: 'Revenue (MRR)', value: '$847K', change: '+22%', trend: 'up' },
    { label: 'Automation Rate', value: '67%', change: '+9%', trend: 'up' },
    { label: 'Team Utilization', value: '82%', change: '-3%', trend: 'down' },
  ];
  return metrics.slice(0, count);
};

export const generateTickets = (count: number = 10) => {
  const statuses = ['open', 'in-progress', 'resolved', 'waiting'];
  const priorities = ['low', 'medium', 'high', 'urgent'];
  const customers = [
    'Acme Corp', 'TechStart Inc', 'Global Industries', 'Innovation Labs',
    'Digital Dynamics', 'Future Systems', 'Smart Solutions', 'Cloud Nine',
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `TKT-${1000 + i}`,
    title: [
      'Login authentication failing',
      'Dashboard not loading properly',
      'Payment integration error',
      'Report export timing out',
      'Mobile app crashing on startup',
      'Email notifications delayed',
      'API rate limit exceeded',
      'Data sync taking too long',
    ][i % 8],
    customer: customers[i % customers.length],
    status: statuses[i % statuses.length],
    priority: priorities[i % priorities.length],
    assignee: ['Sarah Chen', 'Mike Johnson', 'Alex Rivera', 'Jamie Lee'][i % 4],
    created: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    sentiment: ['positive', 'neutral', 'negative'][i % 3],
  }));
};

export const generateActivityFeed = (count: number = 8) => {
  const actions = [
    { type: 'ticket', icon: 'Ticket', text: 'New ticket TKT-1047 created', color: '#FF6B35' },
    { type: 'sync', icon: 'RefreshCw', text: 'HubSpot sync completed', color: '#0097A9' },
    { type: 'automation', icon: 'Zap', text: 'Workflow "Auto-assign" triggered', color: '#F1C40F' },
    { type: 'alert', icon: 'AlertCircle', text: 'Sentiment dip detected', color: '#E74C3C' },
    { type: 'success', icon: 'CheckCircle', text: 'Ticket TKT-1032 resolved', color: '#2ECC71' },
    { type: 'meeting', icon: 'Calendar', text: 'Teams summary added to CRM', color: '#40B4E5' },
    { type: 'user', icon: 'UserPlus', text: 'New contact synced from HubSpot', color: '#9B59B6' },
    { type: 'bot', icon: 'Bot', text: 'AI draft response generated', color: '#7F8C8D' },
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    ...actions[i % actions.length],
    timestamp: new Date(Date.now() - i * 15 * 60 * 1000).toISOString(),
    id: `activity-${i}`,
  }));
};

export const generateChartData = (points: number = 12) => {
  return Array.from({ length: points }, (_, i) => ({
    name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    value: Math.floor(Math.random() * 100) + 50,
    target: 85,
  }));
};

export const generateContacts = (count: number = 20) => {
  const firstNames = ['Sarah', 'Mike', 'Alex', 'Jamie', 'Chris', 'Taylor', 'Jordan', 'Casey'];
  const lastNames = ['Chen', 'Johnson', 'Rivera', 'Lee', 'Williams', 'Brown', 'Davis', 'Martinez'];
  const companies = [
    'Acme Corp', 'TechStart Inc', 'Global Industries', 'Innovation Labs',
    'Digital Dynamics', 'Future Systems', 'Smart Solutions', 'Cloud Nine',
  ];
  const roles = ['CEO', 'CTO', 'VP Sales', 'Marketing Director', 'Product Manager', 'Engineer'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `contact-${i}`,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    email: `${firstNames[i % firstNames.length].toLowerCase()}.${lastNames[i % lastNames.length].toLowerCase()}@example.com`,
    company: companies[i % companies.length],
    role: roles[i % roles.length],
    status: ['active', 'prospect', 'customer'][i % 3],
    lastContact: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    value: Math.floor(Math.random() * 100000) + 10000,
  }));
};

export const generateAutomations = () => [
  {
    id: 'auto-1',
    name: 'HubSpot → ConnectDesk Sync',
    description: 'Sync contacts and deals from HubSpot to ConnectDesk',
    status: 'active',
    runs: 1247,
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    successRate: 98.4,
  },
  {
    id: 'auto-2',
    name: 'Freshdesk → ResolveDesk',
    description: 'Import tickets and generate AI drafts',
    status: 'active',
    runs: 892,
    lastRun: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    successRate: 96.8,
  },
  {
    id: 'auto-3',
    name: 'Teams → SyncBot',
    description: 'Summarize meetings and add notes to CRM',
    status: 'active',
    runs: 534,
    lastRun: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    successRate: 99.2,
  },
  {
    id: 'auto-4',
    name: 'SentimentScope → PulseBoard',
    description: 'Alert on sentiment trend changes',
    status: 'active',
    runs: 2341,
    lastRun: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    successRate: 97.5,
  },
  {
    id: 'auto-5',
    name: 'FlowForge → AlertOps',
    description: 'Trigger runbooks and escalations',
    status: 'paused',
    runs: 156,
    lastRun: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    successRate: 94.2,
  },
];

export const generateWorkflows = (count: number = 5) => {
  const templates = [
    { name: 'Auto-assign Tickets', trigger: 'New ticket created', actions: 3 },
    { name: 'Escalation Alert', trigger: 'Priority = Urgent', actions: 5 },
    { name: 'Welcome Email', trigger: 'New customer', actions: 2 },
    { name: 'Feedback Survey', trigger: 'Ticket resolved', actions: 4 },
    { name: 'Daily Summary', trigger: 'Schedule: 9 AM', actions: 3 },
  ];
  
  return templates.slice(0, count).map((template, i) => ({
    id: `workflow-${i}`,
    ...template,
    status: i === 4 ? 'draft' : 'active',
    enabled: i !== 4,
  }));
};

export const generateKnowledgeArticles = (count: number = 10) => {
  const topics = ['Getting Started', 'Integration', 'Troubleshooting', 'Best Practices', 'API Reference'];
  const titles = [
    'How to connect HubSpot',
    'Setting up your first automation',
    'Understanding sentiment analysis',
    'Configuring ticket routing',
    'API authentication guide',
    'Managing team permissions',
    'Creating custom workflows',
    'Interpreting analytics dashboards',
    'Optimizing automation performance',
    'Security best practices',
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `kb-${i}`,
    title: titles[i % titles.length],
    topic: topics[i % topics.length],
    views: Math.floor(Math.random() * 1000) + 100,
    helpful: Math.floor(Math.random() * 50) + 20,
    lastUpdated: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};
