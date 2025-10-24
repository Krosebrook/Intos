# INT OS Workflow Engine

Complete guide to building and managing automated workflows in INT OS v2.5.

---

## 📊 Overview

The Workflow Engine is INT OS's most powerful feature - a visual, no-code automation builder that connects all your integrations (HubSpot, Freshdesk, Teams, Gmail, Outlook, Notion, Calendar, Drive, Dropbox) into intelligent, multi-step workflows.

### Key Features

- ✅ **Visual Builder**: Drag-and-drop interface, no coding required
- ✅ **Multi-Step Workflows**: Chain multiple actions with conditional logic
- ✅ **AI-Powered**: Natural language workflow creation
- ✅ **Real-Time Execution**: Instant triggers and actions
- ✅ **Pre-Built Templates**: 20+ ready-to-use workflow templates
- ✅ **Testing & Debugging**: Sandbox mode for safe testing
- ✅ **Execution History**: Complete audit trail
- ✅ **High Success Rate**: 98.3% average success rate

---

## 🎯 Core Concepts

### Workflow Components

Every workflow consists of four types of components:

1. **Triggers** - Events that start the workflow
2. **Conditions** - Logic that determines the workflow path
3. **Actions** - Tasks performed automatically
4. **Delays** - Wait periods between steps

### Workflow Structure

```
[TRIGGER] → [CONDITION?] → [YES] → [ACTION 1] → [ACTION 2]
                        ↓
                      [NO] → [ACTION 3]
```

---

## 🚀 Quick Start

### Create Your First Workflow

1. **Navigate** to Workflow Engine (sidebar or Cmd/Ctrl + K → "Workflows")
2. **Click** "New Workflow" button
3. **Select** a trigger from the component palette
4. **Drag** trigger onto the canvas
5. **Add** conditions and actions
6. **Configure** each component's settings
7. **Test** in sandbox mode
8. **Activate** your workflow

### Example: High-Priority Email Escalation

```typescript
// Workflow: Auto-escalate negative emails to urgent queue

TRIGGER: Email Received (Gmail/Outlook)
  ↓
CONDITION: Sentiment < -0.5?
  ↓ YES
ACTION 1: Create Urgent Ticket (Freshdesk)
  Priority: Urgent
  Tags: ['escalation', 'negative-sentiment']
  ↓
ACTION 2: Notify Teams Channel (#urgent)
  Card Type: Adaptive Card
  Include: Ticket link, sentiment score, email preview
  ↓
ACTION 3: Schedule Escalation Call (Google Calendar)
  Duration: 30 minutes
  Timeframe: Within 2 hours
  Attendees: Support manager, agent
```

---

## 🔧 Component Reference

### Triggers

Triggers start workflows when specific events occur.

#### Available Triggers

| Trigger | Source | Use Case | Configuration |
|---------|--------|----------|---------------|
| **Email Received** | Gmail/Outlook | New email arrives | Filter by: sender, subject, priority |
| **Ticket Created** | Freshdesk | Support ticket opened | Filter by: status, priority, tags |
| **Deal Updated** | HubSpot | Deal stage changes | Filter by: stage, amount, owner |
| **Contact Added** | HubSpot | New contact created | Filter by: lifecycle stage, source |
| **Calendar Event** | Google Calendar | Meeting scheduled/updated | Filter by: attendees, title |
| **File Uploaded** | Drive/Dropbox | New file added | Filter by: folder, file type |
| **Survey Response** | Survey Center | Customer submits feedback | Filter by: score, question |
| **Teams Message** | Microsoft Teams | Message posted in channel | Filter by: channel, sender, keywords |

#### Trigger Configuration Example

```typescript
// Email Received Trigger
{
  type: 'trigger',
  integration: 'gmail',
  event: 'email.received',
  filters: {
    priority: 'high',
    sentimentThreshold: -0.5,
    excludeSenders: ['noreply@*']
  }
}
```

---

### Conditions

Conditions create branches in workflows based on logic.

#### Condition Types

1. **If/Else** - Binary decision making
2. **Filter** - Continue only if condition met
3. **Switch** - Multiple branches based on value
4. **Loop** - Repeat actions for each item

#### Operators

- `eq` (equals)
- `neq` (not equals)
- `gt` (greater than)
- `lt` (less than)
- `gte` (greater than or equal)
- `lte` (less than or equal)
- `contains` (string contains)
- `in` (value in list)
- `not_in` (value not in list)

#### Condition Examples

```typescript
// Sentiment Check
{
  type: 'condition',
  field: 'email.sentiment',
  operator: 'lt',
  value: -0.5,
  branches: {
    yes: [/* actions */],
    no: [/* actions */]
  }
}

// Deal Amount Check
{
  type: 'condition',
  field: 'deal.amount',
  operator: 'gte',
  value: 50000,
  branches: {
    yes: [/* high-value deal actions */],
    no: [/* standard deal actions */]
  }
}

// Priority Filter
{
  type: 'condition',
  field: 'ticket.priority',
  operator: 'in',
  value: ['urgent', 'high'],
  branches: {
    yes: [/* escalate */],
    no: [/* standard queue */]
  }
}
```

---

### Actions

Actions perform tasks automatically.

#### Available Actions

| Action | Target | Description | Configuration |
|--------|--------|-------------|---------------|
| **Create Ticket** | Freshdesk | Open support ticket | Subject, priority, assignee, tags |
| **Send Email** | Gmail/Outlook | Send email message | To, subject, body, template |
| **Schedule Meeting** | Google Calendar | Create calendar event | Duration, attendees, time |
| **Notify Teams** | Microsoft Teams | Post to channel | Team, channel, message type |
| **Update Deal** | HubSpot | Modify deal fields | Stage, amount, owner, notes |
| **Create Page** | Notion | Add document | Workspace, database, properties |
| **Upload File** | Drive/Dropbox | Store file | Folder, filename, permissions |
| **Send SMS** | Twilio | Text message | To, body, from |
| **Call Webhook** | Custom API | HTTP request | URL, method, headers, body |

#### Action Configuration Examples

```typescript
// Create Freshdesk Ticket
{
  type: 'action',
  integration: 'freshdesk',
  action: 'tickets.create',
  config: {
    subject: '{{email.subject}}',
    description: '{{email.body}}',
    priority: 4, // Urgent
    status: 2,   // Open
    tags: ['escalation', 'auto-created'],
    requester_id: '{{email.sender.id}}'
  }
}

// Notify Teams with Adaptive Card
{
  type: 'action',
  integration: 'teams',
  action: 'channel.sendCard',
  config: {
    team: 'support',
    channel: 'urgent',
    card: {
      title: '🚨 High Priority Ticket',
      fields: [
        { label: 'Subject', value: '{{ticket.subject}}' },
        { label: 'Priority', value: '{{ticket.priority}}' },
        { label: 'Created', value: '{{ticket.created_at}}' }
      ],
      actions: [
        { type: 'openUrl', title: 'View Ticket', url: '{{ticket.url}}' }
      ]
    }
  }
}

// Schedule Calendar Meeting
{
  type: 'action',
  integration: 'google-calendar',
  action: 'events.create',
  config: {
    summary: 'Customer Escalation - {{ticket.subject}}',
    description: 'Discuss and resolve: {{ticket.description}}',
    start: { dateTime: '{{NOW + 2 hours}}', timeZone: 'UTC' },
    end: { dateTime: '{{NOW + 2.5 hours}}', timeZone: 'UTC' },
    attendees: [
      { email: '{{ticket.assignee.email}}' },
      { email: 'manager@intinc.com' }
    ]
  }
}
```

---

### Delays

Delays pause workflow execution for a specified time.

```typescript
{
  type: 'delay',
  duration: 24,
  unit: 'hours'
}

// Options: 'seconds', 'minutes', 'hours', 'days', 'weeks'
```

**Use Cases**:
- Wait 24 hours before sending follow-up survey
- Delay 5 minutes before checking if ticket was resolved
- Wait 1 week before sending contract renewal reminder

---

## 📚 Workflow Templates

### 1. Email to Ticket Automation

**Purpose**: Convert high-priority emails to support tickets automatically

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

### 2. Lead Nurturing Sequence

**Purpose**: Multi-step email sequence for new leads

```
TRIGGER: Contact Added (lifecycle: lead)
  ↓
ACTION: Send Welcome Email (immediate)
  ↓
DELAY: 2 days
  ↓
ACTION: Send Product Overview Email
  ↓
DELAY: 3 days
  ↓
ACTION: Send Case Study Email
  ↓
DELAY: 4 days
  ↓
CONDITION: Contact engaged?
  ↓ YES
ACTION: Assign to Sales Rep
```

### 3. Deal Stage Change Automation

**Purpose**: Automate follow-ups when deal moves to "Proposal Sent"

```
TRIGGER: Deal Updated (stage: proposal-sent)
  ↓
ACTION: Schedule Follow-up Meeting (+3 days)
  ↓
ACTION: Create Notion Project Page
  ↓
ACTION: Send Proposal Email to Contact
  ↓
ACTION: Notify Sales Channel
```

### 4. Customer Feedback Survey

**Purpose**: Send CSAT survey after ticket resolution

```
TRIGGER: Ticket Updated (status: resolved)
  ↓
DELAY: 24 hours
  ↓
ACTION: Send CSAT Survey
  ↓
CONDITION: Score < 3?
  ↓ YES
ACTION: Create Follow-up Ticket
  ↓
ACTION: Notify Customer Success Manager
```

### 5. Incident Response

**Purpose**: Alert on-call team for critical incidents

```
TRIGGER: Ticket Created (priority: urgent, tags: incident)
  ↓
ACTION: Create Teams War Room Channel
  ↓
ACTION: Post Incident Details to Channel
  ↓
ACTION: Page On-Call Engineer (SMS)
  ↓
ACTION: Schedule Incident Review Meeting
  ↓
ACTION: Create Notion Incident Report
```

### 6. Contract Renewal Reminder

**Purpose**: Alert sales team 30 days before contract expires

```
TRIGGER: Deal Close Date - 30 days
  ↓
CONDITION: Deal Status = closed-won?
  ↓ YES
ACTION: Create Renewal Task
  ↓
ACTION: Notify Account Manager
  ↓
ACTION: Schedule Renewal Discussion Call
  ↓
ACTION: Update Deal Stage to "Renewal Discussion"
```

---

## 🤖 AI Workflow Builder

### Natural Language Workflow Creation

Instead of manually building workflows, describe them in plain English:

**Example 1**:
```
User: "When a customer mentions 'refund' in an email, assign the ticket to 
      the finance team and schedule a call within 24 hours"

AI Generates:
TRIGGER: Email Received
  Filter: Body contains "refund"
  ↓
ACTION: Create Ticket
  Assignee: Finance Team
  Priority: High
  ↓
ACTION: Schedule Meeting
  Duration: 30 min
  Timeframe: Within 24 hours
  Attendees: [Customer, Finance Rep]
```

**Example 2**:
```
User: "If a deal over $50k moves to negotiation stage, notify the sales 
      director and create a strategy doc in Notion"

AI Generates:
TRIGGER: Deal Updated
  Stage: negotiation
  Amount >= 50000
  ↓
ACTION: Notify Teams
  User: @sales-director
  Channel: #high-value-deals
  ↓
ACTION: Create Notion Page
  Database: Strategy Docs
  Template: High-Value Deal Template
  Properties: [Deal Name, Amount, Stage, Owner]
```

### How to Use AI Builder

1. Click **"Try AI Builder"** button
2. Describe your workflow in natural language
3. Review AI-generated workflow structure
4. Modify components as needed
5. Test and activate

---

## 🧪 Testing & Debugging

### Test Mode

Before activating a workflow, test it in sandbox mode:

1. Click **"Test Run"** button
2. Provide sample input data
3. Watch step-by-step execution
4. Review output and logs
5. Fix any errors
6. Re-test until successful

### Debugging Tips

**Problem**: Workflow not triggering
- ✅ Check trigger filters are correct
- ✅ Verify integration is connected
- ✅ Confirm trigger event is firing

**Problem**: Action fails
- ✅ Check action configuration
- ✅ Verify required fields are populated
- ✅ Test integration connection
- ✅ Review error logs

**Problem**: Condition not working
- ✅ Verify field path is correct (e.g., `email.sentiment`)
- ✅ Check operator matches data type
- ✅ Confirm value format

---

## 📊 Monitoring & Analytics

### Execution History

View all workflow executions:

- **Status**: Success, Failed, In Progress
- **Duration**: Execution time
- **Timestamp**: When it ran
- **Logs**: Detailed step-by-step output

### Workflow Metrics

Each workflow displays:
- **Run Count**: Total executions
- **Success Rate**: % of successful runs
- **Avg Duration**: Average execution time
- **Last Run**: Most recent execution
- **Error Rate**: % of failed runs

### Performance Optimization

**Tips for fast workflows**:
1. Minimize delays when not needed
2. Use filters early to reduce processing
3. Batch actions when possible
4. Cache frequently accessed data
5. Avoid nested loops

---

## 🔐 Security & Compliance

### Access Control

- ✅ **Role-Based Permissions**: Only admins can create/modify workflows
- ✅ **Audit Logging**: All workflow actions are logged
- ✅ **Data Encryption**: Workflow configs encrypted at rest
- ✅ **Secure Secrets**: API keys stored in encrypted vault

### Data Privacy

- ✅ **PII Handling**: Workflows respect data privacy policies
- ✅ **GDPR Compliance**: Support data deletion and export
- ✅ **Access Logs**: Track who modified each workflow
- ✅ **Retention Policies**: Auto-delete old execution logs

### Best Practices

1. **Test Before Deploying**: Always test in sandbox mode
2. **Use Descriptive Names**: Name workflows clearly
3. **Add Comments**: Document complex logic
4. **Version Control**: Keep backup copies
5. **Monitor Regularly**: Check execution logs weekly
6. **Review Permissions**: Audit access quarterly

---

## 💡 Advanced Features

### Variables & Dynamic Values

Use variables to reference data from previous steps:

```typescript
// Reference trigger data
{{trigger.email.subject}}
{{trigger.ticket.id}}
{{trigger.deal.amount}}

// Reference previous action output
{{action1.ticket.id}}
{{action2.meeting.joinUrl}}

// Use functions
{{NOW}}                    // Current timestamp
{{NOW + 2 hours}}          // 2 hours from now
{{UPPER(email.subject)}}   // Uppercase transformation
{{FORMAT_DATE(deal.closedate, 'MM/DD/YYYY')}}
```

### Error Handling

Add error handlers to workflows:

```typescript
{
  type: 'action',
  action: 'tickets.create',
  onError: {
    retry: 3,              // Retry 3 times
    retryDelay: 60,        // Wait 60 seconds between retries
    fallback: {            // Fallback action if all retries fail
      type: 'action',
      action: 'teams.notify',
      config: { message: 'Ticket creation failed for {{email.subject}}' }
    }
  }
}
```

### Parallel Actions

Execute multiple actions simultaneously:

```typescript
{
  type: 'parallel',
  actions: [
    { type: 'action', action: 'teams.notify' },
    { type: 'action', action: 'email.send' },
    { type: 'action', action: 'calendar.create' }
  ]
}
```

### Workflow Versioning

- Each workflow save creates a new version
- Roll back to previous versions if needed
- Compare versions side-by-side
- Export/import workflows as JSON

---

## 🚀 Integration Examples

### HubSpot → Freshdesk → Teams

```
TRIGGER: HubSpot Deal Updated (stage: closed-won)
  ↓
ACTION: Create Freshdesk Ticket
  Type: Onboarding
  Priority: High
  Subject: "Onboard {{deal.company}}"
  ↓
ACTION: Notify Teams #customer-success
  Message: "New customer won! {{deal.company}} - ${{deal.amount}}"
  Card: Include deal details and ticket link
  ↓
ACTION: Schedule Kickoff Call
  Duration: 60 min
  Within: 3 business days
  Attendees: [Customer contact, CS manager]
```

### Gmail → Notion → Calendar

```
TRIGGER: Gmail Email Received
  Filter: From VIP customer list
  ↓
ACTION: Create Notion Note
  Database: Customer Communications
  Properties: [Customer, Subject, Date, Priority]
  ↓
CONDITION: Email mentions "urgent" or "asap"?
  ↓ YES
ACTION: Create Calendar Event
  Title: "Follow-up: {{email.subject}}"
  Time: Next available slot (within 4 hours)
  ↓
ACTION: Send Auto-Reply
  Message: "Received your urgent request. We'll call at {{meeting.time}}"
```

### Survey → Freshdesk → HubSpot

```
TRIGGER: Survey Response Received
  ↓
CONDITION: CSAT Score <= 2?
  ↓ YES
ACTION: Create Freshdesk Ticket
  Priority: High
  Tags: ['negative-feedback', 'csat']
  ↓
ACTION: Update HubSpot Contact
  Property: Health Score = "At Risk"
  Add Note: "Low CSAT score: {{survey.score}}"
  ↓
ACTION: Notify Account Manager
  Via: Email + Teams
  Message: "Customer {{contact.name}} gave low CSAT score"
```

---

## 📖 API Reference

### Programmatic Workflow Creation

Create workflows via API:

```typescript
import { createWorkflow } from './lib/workflows';

const workflow = await createWorkflow({
  name: 'My Workflow',
  description: 'Automated task',
  trigger: {
    type: 'email.received',
    config: { /* filters */ }
  },
  steps: [
    {
      type: 'action',
      action: 'tickets.create',
      config: { /* settings */ }
    }
  ]
});
```

### Execute Workflow Manually

```typescript
import { executeWorkflow } from './lib/workflows';

const result = await executeWorkflow('workflow-id', {
  email: {
    subject: 'Test Email',
    body: 'This is a test',
    sender: 'test@example.com'
  }
});

console.log('Workflow result:', result);
```

---

## 🎓 Learning Resources

- **Video Tutorial**: [Building Your First Workflow](https://intos.io/docs/tutorials/first-workflow)
- **Live Demo**: [Interactive Workflow Builder](https://intos.io/demo/workflows)
- **Community Templates**: [Browse 100+ Templates](https://intos.io/workflows/templates)
- **Best Practices Guide**: [Workflow Design Patterns](https://intos.io/docs/workflow-patterns)

---

## 🆘 Support

Need help with workflows?

- **Documentation**: [Full API Reference](https://intos.io/docs/api/workflows)
- **Community Forum**: [Ask Questions](https://community.intos.io/workflows)
- **Support Ticket**: [Contact Support](https://intos.io/support)
- **AI Assistant**: Press `Cmd/Ctrl + I` and ask!

---

**Last Updated**: October 24, 2025  
**Version**: 2.5.0
