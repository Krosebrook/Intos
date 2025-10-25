# INT OS Integration Apps Suite

Complete documentation for all 9 integration applications in INT OS v2.5.

---

## 📊 Overview

INT OS v2.5 includes a comprehensive integration suite that connects all your business tools into one unified platform. These apps provide seamless data flow between HubSpot, Freshdesk, Microsoft Teams, Gmail, Outlook, Notion, Google Calendar, Drive, and Dropbox.

### Complete App List

1. **UnifiedInbox** - Unified email management (Gmail + Outlook)
2. **KnowledgeHub** - Notion integration and knowledge management
3. **IntegrationHub** - CRM connectors (HubSpot, Freshdesk, Teams)
4. **WorkflowEngine** - Visual automation builder
5. **CalendarSync** - Google Calendar smart scheduling
6. **FileVault** - Drive & Dropbox file management
7. **AnalyticsStudio** - Advanced analytics and pivot tables
8. **SurveyCenter** - Customer feedback surveys
9. *(Planned: Slack, Zoom, Salesforce integrations)*

---

## 🎯 App Details

### 1. UnifiedInbox

**Path**: `/inbox`  
**Purpose**: Unified email hub with AI sentiment analysis  
**Integrations**: Gmail, Outlook

#### Key Features
- ✅ Multi-account email management
- ✅ AI sentiment analysis on all messages
- ✅ Priority inbox with smart filtering
- ✅ Quick actions (archive, star, flag)
- ✅ Auto-categorization (sales, support, urgent)
- ✅ Linked to CRM entities (deals, tickets, contacts)
- ✅ Conversation threading
- ✅ Rich text composition

#### Stats Tracked
- **Unread Count**: Total unread emails
- **Urgent Count**: High-priority messages
- **Avg Sentiment**: Overall email sentiment
- **Response Time**: Average time to respond

#### AI Capabilities
- Sentiment scoring (-1 to +1)
- Auto-categorization by content
- Smart reply suggestions
- Priority detection
- Spam filtering

---

### 2. KnowledgeHub

**Path**: `/knowledge`  
**Purpose**: Notion workspace integration  
**Integrations**: Notion

#### Key Features
- ✅ Browse Notion databases and pages
- ✅ Full-text search across all content
- ✅ Create new pages and databases
- ✅ Real-time sync with Notion
- ✅ Rich formatting support
- ✅ Collaborative editing
- ✅ Version history
- ✅ Templates library

#### Stats Tracked
- **Total Documents**: All pages/databases
- **Recent Activity**: Pages updated this week
- **Shared Pages**: Collaborative documents
- **Quick Access**: Favorite pages

#### Use Cases
- Team documentation
- Product wikis
- Meeting notes
- Project planning
- Knowledge base management

---

### 3. IntegrationHub

**Path**: `/integrations`  
**Purpose**: Central hub for all CRM integrations  
**Integrations**: HubSpot, Freshdesk, Microsoft Teams

#### Key Features
- ✅ HubSpot: Contacts, Companies, Deals management
- ✅ Freshdesk: Tickets, SLA tracking, Agent performance
- ✅ Teams: Channels, messaging, meetings
- ✅ Real-time sync status
- ✅ Connection health monitoring
- ✅ Bulk operations
- ✅ Custom field mapping
- ✅ Webhook management

#### Stats Tracked
- **Connected Integrations**: Active connections
- **Sync Status**: Last sync time
- **API Usage**: Calls remaining
- **Error Rate**: Failed requests

#### Integration Details

**HubSpot**
- Contacts: Full CRUD operations
- Companies: Organization management
- Deals: Pipeline tracking
- Custom properties support

**Freshdesk**
- Tickets: Create, update, resolve
- SLA monitoring
- Agent assignment
- Priority management

**Microsoft Teams**
- Channel management
- Message posting
- Meeting scheduling
- Adaptive card support

---

### 4. WorkflowEngine

**Path**: `/workflows`  
**Purpose**: Visual automation builder (no-code)  
**Integrations**: All platforms

#### Key Features
- ✅ Drag-and-drop workflow builder
- ✅ 8 triggers (email, ticket, deal, contact, calendar, file, survey, Teams)
- ✅ 9 actions (create ticket, send email, schedule meeting, notify Teams, etc.)
- ✅ Conditional logic (if/else, filters)
- ✅ Delays and scheduling
- ✅ AI-powered workflow suggestions
- ✅ Pre-built templates (6 included)
- ✅ Test mode and debugging
- ✅ Execution history with logs

#### Workflow Components

**Triggers**
1. Email Received (Gmail/Outlook)
2. Ticket Created/Updated (Freshdesk)
3. Deal Updated (HubSpot)
4. Contact Added (HubSpot)
5. Calendar Event (Google Calendar)
6. File Uploaded (Drive/Dropbox)
7. Survey Response (Survey Center)
8. Teams Message (Microsoft Teams)

**Actions**
1. Create Ticket (Freshdesk)
2. Send Email (Gmail/Outlook)
3. Schedule Meeting (Google Calendar)
4. Notify Teams Channel
5. Update Deal (HubSpot)
6. Create Notion Page
7. Upload File (Drive/Dropbox)
8. Send SMS (Twilio)
9. Call Webhook (Custom API)

#### Example Workflows

**High-Priority Email Escalation**
```
TRIGGER: Email Received (priority: high)
  ↓
CONDITION: Sentiment < -0.5?
  ↓ YES
ACTION: Create Urgent Ticket
  ↓
ACTION: Notify Teams #urgent
  ↓
ACTION: Schedule Escalation Call (2 hours)
```

**Deal Stage Automation**
```
TRIGGER: Deal Updated (stage: proposal-sent)
  ↓
ACTION: Schedule Follow-up Meeting (+3 days)
  ↓
ACTION: Create Notion Project Page
  ↓
ACTION: Send Proposal Email
```

#### Stats Tracked
- **Active Workflows**: Currently running
- **Executions Today**: Total runs
- **Success Rate**: % successful
- **Time Saved**: Automation hours

---

### 5. CalendarSync

**Path**: `/calendar`  
**Purpose**: Smart scheduling with Google Calendar  
**Integrations**: Google Calendar, HubSpot, Freshdesk

#### Key Features
- ✅ Multi-calendar view (day/week/month)
- ✅ Google Calendar sync
- ✅ CRM-linked events (deals, tickets, contacts)
- ✅ AI meeting suggestions based on activity
- ✅ Conflict detection
- ✅ Availability tracking
- ✅ Video conference links (Meet, Teams)
- ✅ Smart scheduling (find best times)
- ✅ Recurring event management
- ✅ Calendar sharing

#### Event Types
- **Meeting**: Customer/team meetings
- **Call**: Phone calls
- **Task**: To-do items
- **Focus**: Deep work blocks
- **Escalation**: Urgent customer calls

#### AI Suggestions
- Follow-up meetings after deal stage changes
- Check-in calls after ticket resolution
- Recurring team meetings
- Optimal meeting times based on availability

#### Stats Tracked
- **Today's Events**: Scheduled meetings
- **Meeting Hours**: Total time in meetings
- **CRM Synced**: Auto-created events
- **Conflicts**: Scheduling overlaps

---

### 6. FileVault

**Path**: `/files`  
**Purpose**: Unified file management  
**Integrations**: Google Drive, Dropbox

#### Key Features
- ✅ Browse files from Drive and Dropbox
- ✅ Unified search across both platforms
- ✅ Grid and list view modes
- ✅ File preview (PDF, images, videos)
- ✅ Drag-and-drop upload
- ✅ File associations with CRM entities
- ✅ Version history
- ✅ AI-powered file categorization
- ✅ Secure file sharing links
- ✅ Storage analytics

#### File Operations
- **Upload**: Drag & drop or browse
- **Download**: Single or bulk
- **Share**: Generate secure links
- **Star**: Mark important files
- **Trash**: Soft delete with restore

#### Smart Features
- AI suggests files to link to deals/tickets
- Auto-categorization by content
- Duplicate detection
- Storage optimization suggestions

#### Stats Tracked
- **Google Drive**: Used/Total storage
- **Dropbox**: Used/Total storage
- **Total Files**: Combined file count
- **CRM Linked**: Associated files

---

### 7. AnalyticsStudio

**Path**: `/analytics`  
**Purpose**: Advanced analytics and pivot tables  
**Integrations**: HubSpot, Freshdesk, Gmail, Outlook

#### Key Features
- ✅ Interactive charts (line, bar, pie, area)
- ✅ Pivot tables with drill-down
- ✅ Multi-source data aggregation
- ✅ Real-time updates
- ✅ Custom date ranges
- ✅ Sentiment analysis trends
- ✅ Sales performance dashboards
- ✅ Support metrics (CSAT, SLA, resolution time)
- ✅ Export to CSV/Excel
- ✅ AI-powered insights

#### Dashboard Tabs

**Sales Performance**
- Revenue trend (area chart)
- Deals closed (bar chart)
- Average deal size (line chart)
- Rep performance comparison

**Support Metrics**
- Tickets by category (bar chart)
- Average resolution time
- Customer satisfaction scores
- SLA compliance

**Deal Pipeline**
- Deals by stage (pie chart)
- Pipeline value breakdown
- Win rate analysis
- Forecast vs. actual

**Pivot Table**
- Sales rep quarterly breakdown
- Custom dimensions and measures
- Drag-and-drop configuration
- Trend calculations

#### Metrics Tracked
- **Total Revenue**: Sales performance
- **Active Deals**: Pipeline health
- **Support Tickets**: Volume trends
- **Avg Close Time**: Sales cycle

#### AI Insights
- Anomaly detection
- Trend predictions
- Performance recommendations
- Outlier identification

---

### 8. SurveyCenter

**Path**: `/surveys`  
**Purpose**: Customer feedback and surveys  
**Integrations**: Gmail, Outlook, Freshdesk

#### Key Features
- ✅ Survey builder (drag-and-drop)
- ✅ Multiple question types (rating, scale, multiple-choice, text, yes/no)
- ✅ CSAT, NPS, CES, and custom surveys
- ✅ AI sentiment analysis on responses
- ✅ Auto-send after triggers (ticket resolved, deal closed)
- ✅ Response rate tracking
- ✅ Anonymous responses option
- ✅ Export results to CSV
- ✅ Real-time analytics
- ✅ Follow-up automation

#### Survey Types

**CSAT (Customer Satisfaction)**
- 1-5 star rating
- "How satisfied were you?"
- Auto-sent after ticket resolution

**NPS (Net Promoter Score)**
- 0-10 scale
- "How likely are you to recommend us?"
- Calculates promoters vs. detractors

**CES (Customer Effort Score)**
- 1-5 scale
- "How easy was it to...?"
- Measures ease of interaction

**Custom**
- Build your own questions
- Mix question types
- Conditional logic

#### Question Types
1. **Rating**: 1-5 stars
2. **Scale**: 0-10 numeric
3. **Multiple Choice**: Select one or many
4. **Text Response**: Open-ended
5. **Yes/No**: Binary choice

#### Distribution Methods
- **Email**: Send via Gmail/Outlook
- **Link**: Shareable URL
- **Automatic**: Trigger-based (e.g., after ticket resolution)

#### Stats Tracked
- **Active Surveys**: Currently running
- **Total Responses**: All-time count
- **Avg CSAT Score**: Customer satisfaction
- **NPS Score**: Net promoter score

#### AI Features
- Sentiment analysis on text responses
- Trend detection (scores going up/down)
- Common complaint identification
- Actionable insights generation

---

## 🔄 Integration Data Flow

### Email → Ticket Workflow
```
Gmail/Outlook (UnifiedInbox)
  ↓ AI analyzes sentiment
  ↓ Negative sentiment detected
WorkflowEngine triggers
  ↓
Freshdesk creates urgent ticket (IntegrationHub)
  ↓
Teams notifies support channel (IntegrationHub)
  ↓
Calendar schedules escalation call (CalendarSync)
  ↓
After resolution, SurveyCenter sends CSAT
```

### Deal → Meeting → Documentation Workflow
```
HubSpot deal moves to "Proposal Sent" (IntegrationHub)
  ↓
WorkflowEngine triggers
  ↓
Calendar schedules follow-up (CalendarSync)
  ↓
Notion creates project page (KnowledgeHub)
  ↓
Drive creates shared folder (FileVault)
  ↓
Gmail sends proposal email (UnifiedInbox)
```

### Support → Analytics → Survey Workflow
```
Freshdesk ticket resolved (IntegrationHub)
  ↓
AnalyticsStudio updates metrics
  ↓
WorkflowEngine waits 24 hours
  ↓
SurveyCenter sends CSAT survey
  ↓
Response analyzed for sentiment
  ↓
If negative, WorkflowEngine creates follow-up ticket
```

---

## 🔐 Security & Compliance

### Authentication
- ✅ OAuth 2.0 for all integrations
- ✅ Secure token storage (encrypted)
- ✅ Token refresh automation
- ✅ Multi-factor authentication support

### Data Privacy
- ✅ GDPR compliant
- ✅ Data encryption at rest
- ✅ Encryption in transit (TLS 1.3)
- ✅ PII handling policies
- ✅ Right to be forgotten (data deletion)

### Access Control
- ✅ Role-based permissions (Viewer, Agent, Manager, Admin)
- ✅ Integration-level access control
- ✅ Audit logs for all actions
- ✅ IP whitelisting support

### Compliance
- ✅ SOC 2 Type II
- ✅ GDPR
- ✅ CCPA
- ✅ HIPAA (available for enterprise)

---

## 📈 Performance Metrics

### API Rate Limits

| Integration | Requests/Day | Requests/Hour | Burst Limit |
|------------|--------------|---------------|-------------|
| HubSpot | 250,000 | 10,000 | 100/10s |
| Freshdesk | 3,000/hour | 3,000 | 50/min |
| Gmail | 1 billion/day | 250/user/s | - |
| Outlook | Unlimited | 10,000/app | - |
| Notion | 3 requests/s | - | - |
| Google Calendar | 1 million/day | - | 10/s |
| Google Drive | 12,000/min | - | - |
| Dropbox | 5,000/min | - | - |

### Sync Intervals

- **Real-time**: Email, Teams messages (webhooks)
- **5 minutes**: Calendar events, file changes
- **15 minutes**: CRM data (contacts, deals, tickets)
- **1 hour**: Analytics aggregation
- **On-demand**: Manual refresh available

### Caching Strategy

- **API Responses**: 5-minute cache for read operations
- **Static Data**: 1-hour cache for templates, schemas
- **User Preferences**: Session-based cache
- **Analytics**: 15-minute rolling window

---

## 🚀 Best Practices

### Integration Setup

1. **Connect in Order**:
   - Start with IntegrationHub (HubSpot, Freshdesk, Teams)
   - Add UnifiedInbox (Gmail, Outlook)
   - Connect CalendarSync
   - Add FileVault (Drive, Dropbox)
   - Configure WorkflowEngine last

2. **Test Connections**:
   - Use "Test Connection" button in each app
   - Verify permissions are granted
   - Check sync status indicators

3. **Configure Workflows**:
   - Start with templates
   - Test in sandbox mode before activating
   - Monitor execution logs

### Data Management

1. **Regular Cleanup**:
   - Archive old emails (6+ months)
   - Delete unused Notion pages
   - Clean up Drive/Dropbox duplicates

2. **Storage Optimization**:
   - Use FileVault's AI suggestions
   - Move large files to appropriate storage
   - Compress old attachments

3. **Analytics Hygiene**:
   - Set up custom date ranges
   - Export historical data monthly
   - Archive old survey responses

### Security Tips

1. **API Keys**:
   - Rotate keys quarterly
   - Never share access tokens
   - Use environment variables

2. **Permissions**:
   - Grant least privilege access
   - Review team permissions monthly
   - Revoke inactive user access

3. **Monitoring**:
   - Check error logs weekly
   - Monitor API usage
   - Set up alerts for failures

---

## 🛠️ Troubleshooting

### Common Issues

**"Connection Failed"**
- ✅ Check OAuth permissions granted
- ✅ Verify API key is valid
- ✅ Confirm network connectivity
- ✅ Check rate limits not exceeded

**"Sync Not Working"**
- ✅ Manually trigger refresh
- ✅ Check webhook configuration
- ✅ Verify integration status is "Active"
- ✅ Review error logs

**"Workflow Not Executing"**
- ✅ Check workflow status is "Active"
- ✅ Verify trigger conditions are met
- ✅ Review execution history for errors
- ✅ Test workflow in sandbox mode

**"Missing Data"**
- ✅ Check filter settings
- ✅ Verify date range is correct
- ✅ Confirm permissions to access data
- ✅ Refresh cache

### Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 401 | Unauthorized | Re-authenticate integration |
| 403 | Forbidden | Check permissions granted |
| 429 | Rate limited | Wait and retry, or upgrade plan |
| 500 | Server error | Contact support |
| 503 | Service unavailable | Check integration status page |

---

## 📖 API Documentation

Each app exposes a REST API for programmatic access:

### UnifiedInbox API
```typescript
GET /api/emails?filter=unread&limit=50
POST /api/emails/send
PUT /api/emails/:id/archive
DELETE /api/emails/:id
```

### IntegrationHub API
```typescript
GET /api/integrations/hubspot/contacts
POST /api/integrations/freshdesk/tickets
GET /api/integrations/teams/channels
```

### WorkflowEngine API
```typescript
GET /api/workflows
POST /api/workflows/create
PUT /api/workflows/:id/activate
POST /api/workflows/:id/execute
```

### CalendarSync API
```typescript
GET /api/calendar/events?start=2025-01-01
POST /api/calendar/events/create
PUT /api/calendar/events/:id
DELETE /api/calendar/events/:id
```

### FileVault API
```typescript
GET /api/files?source=drive&path=/folder
POST /api/files/upload
GET /api/files/:id/download
DELETE /api/files/:id
```

### AnalyticsStudio API
```typescript
GET /api/analytics/sales?start=2025-01-01&end=2025-12-31
GET /api/analytics/support?metric=csat
POST /api/analytics/reports/export
```

### SurveyCenter API
```typescript
GET /api/surveys
POST /api/surveys/create
GET /api/surveys/:id/responses
POST /api/surveys/:id/send
```

---

## 🎓 Training Resources

- **Video Tutorials**: [INT OS Academy](https://intos.io/academy)
- **Live Demos**: [Schedule a Demo](https://intos.io/demo)
- **Community Forum**: [Ask Questions](https://community.intos.io)
- **Knowledge Base**: [Help Center](https://help.intos.io)
- **API Docs**: [Developer Portal](https://developers.intos.io)

---

## 🆘 Support

Need help with integrations?

- **Documentation**: [Full Integration Guide](https://intos.io/docs/integrations)
- **Support Ticket**: [Contact Support](https://intos.io/support)
- **AI Assistant**: Press `Cmd/Ctrl + I` in any app
- **Email**: integrations@intinc.com
- **Phone**: +1 (555) 123-4567

---

**Last Updated**: October 25, 2025  
**Version**: 2.5.0  
**Total Apps**: 8 (4 new apps added)
