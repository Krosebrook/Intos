# INT OS Integration Suite

Complete guide to HubSpot, Freshdesk, and Microsoft Teams integrations in INT OS v2.5.

---

## 📊 Overview

INT OS provides seamless integration with leading CRM, support, and collaboration platforms to unify your operations in one place.

### Available Integrations

| Integration | Status | Type | Purpose |
|-------------|--------|------|---------|
| **HubSpot CRM** | ✅ Active | Sales & Marketing | Contacts, companies, deals, tickets |
| **Freshdesk** | ✅ Active | Customer Support | Tickets, contacts, knowledge base |
| **Microsoft Teams** | 🟡 Planned | Collaboration | Channels, messages, meetings |

---

## 🔌 HubSpot Integration

### Overview

Connect HubSpot CRM to INT OS for unified customer visibility across sales, marketing, and support.

### Features

- **Data Synchronization**: Automatic nightly sync of contacts, companies, deals, and tickets
- **Unified CRM View**: View HubSpot deals alongside support tickets in one dashboard
- **AI-Powered Search**: Natural language queries like "Show me all open deals for Acme Corp"
- **Workflow Automation**: Trigger actions when deal stages change
- **Closing Soon Alerts**: Orange highlights for deals closing within 30 days

### Setup

#### 1. Install Dependencies

```typescript
import { hubspotConnector } from './lib/integrations/hubspot';
```

#### 2. Configure API Access

The HubSpot connector uses the INT OS backend server. No additional configuration needed if you're using the hosted environment.

#### 3. API Endpoints

**Base URL**: `https://${projectId}.supabase.co/functions/v1/make-server-07d6ee5a/hubspot`

**Authentication**: Include `Authorization: Bearer ${publicAnonKey}` header

### Usage Examples

#### Search Contacts

```typescript
import { hubspotConnector } from './lib/integrations/hubspot';

// Search contacts by name
const contacts = await hubspotConnector.searchContacts({
  query: 'Jane Doe',
  limit: 10,
  sort: 'createdate',
  sortDirection: 'desc'
});

console.log(contacts);
```

#### Search Deals

```typescript
// Find all deals
const deals = await hubspotConnector.searchDeals({
  limit: 20
});

// Get deals closing soon
const closingDeals = await hubspotConnector.getDealsClosingSoon();

// Get open deals for a specific company
const companyDeals = await hubspotConnector.getOpenDealsForCompany('company-123');
```

#### Fetch Specific Records

```typescript
// Get a contact by ID
const contact = await hubspotConnector.fetchContact('contact-123');

// Get a company by ID
const company = await hubspotConnector.fetchCompany('company-456');

// Get a deal by ID
const deal = await hubspotConnector.fetchDeal('deal-789');
```

#### HubSpot Query DSL

The connector supports HubSpot's Query DSL for advanced searches:

```typescript
// Structure:
// _query_version_2_ 
// op:<describe_object|find_objects|count_objects>
// object_type:<contacts|companies|deals|tickets>
// [filters]
// limit:<number>
// sort:<field>:<asc|desc>

// Example: Find high-value deals
const queryDSL = `_query_version_2_ 
  op:find_objects 
  object_type:deals 
  amount:gt:50000 
  dealstage:neq:closedwon 
  limit:20 
  sort:amount:desc`;

// Available operators:
// eq (equals), neq (not equals), gt (greater than), lt (less than)
// gte (greater than or equal), lte (less than or equal)
// in (in list), contains
```

### AI Assistant Integration

The AI assistant can query HubSpot data using natural language:

```typescript
// User asks: "Show me all open deals for Acme Corp"
// AI processes this and calls:
const company = await hubspotConnector.searchCompanies({ query: 'Acme Corp' });
const deals = await hubspotConnector.getOpenDealsForCompany(company[0].id);

// User asks: "What's the total pipeline value?"
const allDeals = await hubspotConnector.searchDeals();
const totalValue = allDeals.reduce((sum, deal) => 
  sum + parseFloat(deal.properties.amount || '0'), 0
);
```

### Workflow Automation Examples

#### Trigger on Deal Stage Change

```typescript
// When a deal moves to "Proposal Sent" stage:
// 1. Schedule a follow-up meeting in Google Calendar
// 2. Create a Notion project page
// 3. Send Teams notification to sales channel

async function handleDealStageChange(deal: HubSpotDeal) {
  if (deal.properties.dealstage === 'proposal-sent') {
    // Create calendar event
    await calendarConnector.createEvent({
      summary: `Follow-up: ${deal.properties.dealname}`,
      start: { dateTime: getNextBusinessDay(), timeZone: 'UTC' },
      duration: 30
    });
    
    // Create Notion page
    await notionConnector.createPage({
      parent: { database_id: 'projects-db' },
      properties: {
        Name: deal.properties.dealname,
        Status: 'In Progress',
        DealID: deal.id
      }
    });
    
    // Send Teams notification
    await teamsConnector.sendChannelMessage(
      'team-sales',
      'channel-deals',
      `🎯 New proposal sent: ${deal.properties.dealname} ($${deal.properties.amount})`
    );
  }
}
```

### Security & Compliance

- ✅ **OAuth 2.0**: Secure authentication with HubSpot
- ✅ **Token Storage**: API tokens encrypted at rest in Supabase
- ✅ **GDPR/CCPA**: Respects data privacy regulations
- ✅ **Audit Logging**: All API calls logged for compliance
- ✅ **Rate Limiting**: Prevents API quota exhaustion

---

## 🎫 Freshdesk Integration

### Overview

Integrate Freshdesk support tickets into INT OS for unified customer service management.

### Features

- **Ticket Import**: Automatic sync of tickets, contacts, and conversations
- **Bi-directional Updates**: Changes in INT OS push back to Freshdesk
- **SLA Monitoring**: Track first response time and resolution time
- **AI Knowledge Base**: Search Freshdesk articles and suggest responses
- **Priority Routing**: Urgent tickets highlighted and auto-assigned

### Setup

#### 1. Install Dependencies

```typescript
import { freshdeskConnector } from './lib/integrations/freshdesk';
```

#### 2. Configure API Keys

```typescript
// Add Freshdesk API key to environment variables
// FRESHDESK_API_KEY=your-api-key
// FRESHDESK_DOMAIN=your-domain.freshdesk.com
```

#### 3. API Endpoints

**Base URL**: `https://${projectId}.supabase.co/functions/v1/make-server-07d6ee5a/freshdesk`

### Usage Examples

#### List and Search Tickets

```typescript
import { freshdeskConnector } from './lib/integrations/freshdesk';

// List all tickets
const tickets = await freshdeskConnector.listTickets({
  page: 1,
  per_page: 30,
  order_by: 'created_at',
  order_type: 'desc'
});

// Search tickets
const searchResults = await freshdeskConnector.searchTickets('API timeout');

// Get a specific ticket
const ticket = await freshdeskConnector.getTicket(1234);

// Get ticket conversations
const conversations = await freshdeskConnector.getTicketConversations(1234);
```

#### Create and Update Tickets

```typescript
// Create a new ticket
const newTicket = await freshdeskConnector.createTicket({
  subject: 'Integration Issue',
  description: 'Customer reporting API timeouts',
  priority: 4, // Urgent
  status: 2,   // Open
  requester_id: 5001,
  tags: ['api', 'urgent', 'production']
});

// Update a ticket
const updatedTicket = await freshdeskConnector.updateTicket(1234, {
  status: 4, // Resolved
  priority: 2 // Medium
});
```

#### Status and Priority Helpers

```typescript
import { 
  FRESHDESK_STATUS,
  FRESHDESK_PRIORITY,
  getStatusLabel,
  getPriorityLabel,
  getStatusColor,
  getPriorityColor
} from './lib/integrations/freshdesk';

// Use constants
const openTickets = await freshdeskConnector.listTickets({
  filters: { status: FRESHDESK_STATUS.OPEN }
});

// Get labels
const statusLabel = getStatusLabel(2); // "Open"
const priorityLabel = getPriorityLabel(4); // "Urgent"

// Get brand colors
const statusColor = getStatusColor(2); // "#529ADB"
const priorityColor = getPriorityColor(4); // "#F87171"
```

### Bi-directional Sync

```typescript
// When agent resolves ticket in INT OS, update Freshdesk
async function resolveTicket(ticketId: number, resolution: string) {
  // Update in Freshdesk
  await freshdeskConnector.updateTicket(ticketId, {
    status: FRESHDESK_STATUS.RESOLVED,
    description: resolution
  });
  
  // Update in INT OS KV store
  await kvStore.set(`ticket:${ticketId}:status`, 'resolved');
  
  // Log audit trail
  console.log(`Ticket ${ticketId} resolved at ${new Date().toISOString()}`);
}
```

### AI Knowledge Base Integration

```typescript
// Search Freshdesk KB when customer asks question
async function suggestKBArticles(customerQuery: string) {
  const articles = await freshdeskConnector.searchKnowledgeBase(customerQuery);
  
  // AI summarizes top 3 articles
  const summaries = await aiAssistant.summarize(articles.slice(0, 3));
  
  return summaries;
}
```

### SLA Metrics

```typescript
// Get SLA compliance metrics
const stats = await freshdeskConnector.getTicketStats();
// { open: 145, pending: 89, resolved: 234, closed: 1567 }

// Get SLA for specific ticket
const sla = await freshdeskConnector.getTicketSLA(1234);
// {
//   first_response_time: 3600, // seconds
//   resolution_time: 7200,
//   first_response_due_by: "2024-10-24T15:00:00Z",
//   resolution_due_by: "2024-10-25T09:00:00Z"
// }
```

---

## 👥 Microsoft Teams Integration

### Overview

Integrate Microsoft Teams for real-time collaboration, notifications, and meeting scheduling.

### Features

- **Channel Notifications**: Send automated alerts to Teams channels
- **Message Retrieval**: Display Teams conversations in INT OS
- **Meeting Integration**: Create Teams meetings from INT OS
- **Adaptive Cards**: Rich, interactive notifications
- **AI Collaboration**: Generate meeting agendas and summarize chats

### Setup

#### 1. Install Dependencies

```typescript
import { teamsConnector, createTicketNotificationCard } from './lib/integrations/teams';
```

#### 2. OAuth Configuration

```typescript
// Register app in Azure AD
// Required scopes:
// - Channel.ReadWrite.All
// - Chat.ReadWrite
// - OnlineMeetings.ReadWrite
// - Presence.Read

// Store access token in environment
// TEAMS_ACCESS_TOKEN=your-access-token
```

#### 3. API Endpoints

**Base URL**: `https://${projectId}.supabase.co/functions/v1/make-server-07d6ee5a/teams`

### Usage Examples

#### List Teams and Channels

```typescript
import { teamsConnector } from './lib/integrations/teams';

// List all teams
const teams = await teamsConnector.listTeams();

// List channels in a team
const channels = await teamsConnector.listChannels('team-id');

// Get messages from a channel
const messages = await teamsConnector.getChannelMessages('team-id', 'channel-id', 50);
```

#### Send Messages

```typescript
// Send plain text message
await teamsConnector.sendChannelMessage(
  'team-engineering',
  'channel-incidents',
  'New high-priority ticket: #1234',
  'text'
);

// Send HTML message
await teamsConnector.sendChannelMessage(
  'team-sales',
  'channel-deals',
  '<strong>Deal Update:</strong> Proposal sent to Acme Corp',
  'html'
);
```

#### Adaptive Cards

```typescript
import { createTicketNotificationCard } from './lib/integrations/teams';

// Create adaptive card for ticket notification
const card = createTicketNotificationCard({
  id: 'FD-1234',
  subject: 'Production API Timeout',
  priority: 'Urgent',
  status: 'Open',
  description: 'Customer experiencing 504 errors',
  url: 'https://intos.io/tickets/1234'
});

// Send card to channel
await teamsConnector.sendAdaptiveCard('team-id', 'channel-id', card);
```

#### Create Meetings

```typescript
// Schedule a Teams meeting
const meeting = await teamsConnector.createMeeting({
  subject: 'Customer Escalation - Acme Corp',
  body: {
    content: 'Discuss production issues and resolution plan',
    contentType: 'text'
  },
  start: {
    dateTime: '2024-10-25T10:00:00',
    timeZone: 'Pacific Standard Time'
  },
  end: {
    dateTime: '2024-10-25T11:00:00',
    timeZone: 'Pacific Standard Time'
  },
  attendees: [
    {
      emailAddress: {
        address: 'sarah@acmecorp.com',
        name: 'Sarah Chen'
      },
      type: 'required'
    }
  ]
});

console.log('Join URL:', meeting.onlineMeeting.joinUrl);
```

### Automation Examples

#### Escalation Workflow

```typescript
import { createEscalationCard } from './lib/integrations/teams';

// When high-priority ticket created, notify Teams
async function notifyTeamsOfEscalation(ticket: FreshdeskTicket) {
  if (ticket.priority === 4) { // Urgent
    const card = createEscalationCard({
      title: ticket.subject,
      description: ticket.description_text || '',
      assignedTo: 'Engineering Team',
      dueDate: ticket.due_by || '',
      priority: 'Urgent',
      url: `https://intos.io/tickets/${ticket.id}`
    });
    
    await teamsConnector.sendAdaptiveCard(
      'team-engineering',
      'channel-incidents',
      card
    );
  }
}
```

#### Meeting with AI Agenda

```typescript
import { createMeetingAgendaCard } from './lib/integrations/teams';

// Create meeting and send agenda
async function scheduleMeetingWithAgenda(dealId: string) {
  const deal = await hubspotConnector.fetchDeal(dealId);
  
  // AI generates agenda
  const aiAgenda = await aiAssistant.generateAgenda(deal);
  
  // Create meeting
  const meeting = await teamsConnector.createMeeting({
    subject: `Sales Review: ${deal.properties.dealname}`,
    start: { dateTime: getNextBusinessDay(), timeZone: 'UTC' },
    end: { dateTime: getNextBusinessDay(30), timeZone: 'UTC' },
    attendees: [/* ... */]
  });
  
  // Send agenda card
  const card = createMeetingAgendaCard({
    title: meeting.subject,
    startTime: meeting.start.dateTime,
    endTime: meeting.end.dateTime,
    attendees: ['Sarah Chen', 'Michael Torres'],
    agenda: aiAgenda,
    joinUrl: meeting.onlineMeeting.joinUrl
  });
  
  await teamsConnector.sendAdaptiveCard('team-sales', 'channel-deals', card);
}
```

---

## 🤖 AI Assistant Integration

### Natural Language Queries

The AI assistant can query all integrations using natural language:

```typescript
// Example user queries and AI responses:

"Show me all open deals for Acme Corp"
→ Searches HubSpot companies for "Acme Corp"
→ Retrieves all open deals for that company
→ Displays in unified view

"What are the urgent Freshdesk tickets?"
→ Queries Freshdesk with status=open, priority=urgent
→ Returns sorted list with SLA information

"Send a summary to the engineering channel"
→ Generates summary from context
→ Posts to Teams engineering channel via API
```

### Context-Aware Automation

```typescript
// AI understands context and triggers automations
async function aiProcessCommand(userMessage: string, context: any) {
  // User: "This deal is closing next week, set up a follow-up"
  if (userMessage.includes('closing') && context.dealId) {
    const deal = await hubspotConnector.fetchDeal(context.dealId);
    
    // AI schedules meeting
    await teamsConnector.createMeeting({
      subject: `Follow-up: ${deal.properties.dealname}`,
      start: { dateTime: getNextWeek(), timeZone: 'UTC' },
      /* ... */
    });
    
    // AI creates Notion task
    await notionConnector.createPage({
      /* ... */
    });
    
    return "✅ Scheduled follow-up meeting and created project page";
  }
}
```

---

## 🔐 Security Best Practices

### API Token Management

```typescript
// ✅ DO: Store tokens in environment variables
const HUBSPOT_API_KEY = Deno.env.get('HUBSPOT_API_KEY');

// ❌ DON'T: Hard-code tokens in source code
const apiKey = 'secret-key-12345'; // NEVER DO THIS
```

### Data Privacy

- **PII Handling**: Minimize PII storage; encrypt at rest
- **GDPR Compliance**: Support data export and deletion requests
- **Access Logging**: Log all API calls with user ID and timestamp
- **Rate Limiting**: Prevent API abuse with request throttling

### Audit Trail

```typescript
// Log all integration actions
async function auditLog(action: string, data: any, userId: string) {
  await kvStore.set(`audit:${Date.now()}`, {
    action,
    data,
    userId,
    timestamp: new Date().toISOString(),
    integration: 'hubspot' // or 'freshdesk', 'teams'
  });
}

// Example usage
await auditLog('deal.updated', { dealId: '123', stage: 'closed-won' }, 'user-456');
```

---

## 📊 Monitoring & Analytics

### Integration Health

```typescript
// Check integration status
async function checkIntegrationHealth() {
  const results = {
    hubspot: await testHubSpotConnection(),
    freshdesk: await testFreshdeskConnection(),
    teams: await testTeamsConnection()
  };
  
  return results;
}

async function testHubSpotConnection() {
  try {
    await hubspotConnector.countContacts();
    return { status: 'connected', lastSync: new Date().toISOString() };
  } catch (error) {
    return { status: 'error', error: error.message };
  }
}
```

### Usage Metrics

Track integration usage for billing and optimization:

```typescript
// Increment API call counter
async function trackAPICall(integration: string, endpoint: string) {
  const key = `metrics:${integration}:${endpoint}:${getToday()}`;
  const current = await kvStore.get(key) || 0;
  await kvStore.set(key, current + 1);
}

// Get daily usage
async function getUsageMetrics(integration: string, date: string) {
  const prefix = `metrics:${integration}:`;
  const metrics = await kvStore.getByPrefix(prefix);
  return metrics;
}
```

---

## 🚀 Next Steps

1. **Complete Setup**: Configure API keys for each integration
2. **Test Connections**: Use the Integration Hub to verify connectivity
3. **Build Workflows**: Create automation rules in WorkflowEngine
4. **Train AI**: Provide sample queries to improve AI assistant
5. **Monitor Usage**: Set up alerts for API rate limits and errors

---

## 📚 Additional Resources

- [HubSpot API Documentation](https://developers.hubspot.com/docs/api/overview)
- [Freshdesk API Documentation](https://developers.freshdesk.com/api/)
- [Microsoft Graph API Documentation](https://learn.microsoft.com/en-us/graph/overview)
- [INT OS Backend Guide](./BACKEND.md)
- [INT OS Workflow Automation](./WORKFLOWS.md)

---

**Last Updated**: October 24, 2025  
**Version**: 2.5.2
