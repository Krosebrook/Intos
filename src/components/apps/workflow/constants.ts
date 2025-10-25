// Workflow Engine Constants
import {
  Mail,
  Ticket,
  DollarSign,
  Users,
  Calendar,
  Upload,
  MessageSquare,
  Phone,
  FileText,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import type { TriggerDefinition, ActionDefinition, WorkflowTemplate, Workflow } from './types';

// Available Triggers
export const AVAILABLE_TRIGGERS: TriggerDefinition[] = [
  { id: 'email-received', name: 'Email Received', icon: Mail, source: 'Gmail/Outlook', color: '#529ADB' },
  { id: 'ticket-created', name: 'Ticket Created', icon: Ticket, source: 'Freshdesk', color: '#529ADB' },
  { id: 'deal-updated', name: 'Deal Updated', icon: DollarSign, source: 'HubSpot', color: '#E27305' },
  { id: 'contact-added', name: 'Contact Added', icon: Users, source: 'HubSpot', color: '#E27305' },
  { id: 'calendar-event', name: 'Calendar Event', icon: Calendar, source: 'Google Calendar', color: '#46A57B' },
  { id: 'file-uploaded', name: 'File Uploaded', icon: Upload, source: 'Drive/Dropbox', color: '#529ADB' },
  { id: 'survey-response', name: 'Survey Response', icon: MessageSquare, source: 'Survey Center', color: '#529ADB' },
  { id: 'teams-message', name: 'Teams Message', icon: Users, source: 'Microsoft Teams', color: '#46A57B' }
];

// Available Actions
export const AVAILABLE_ACTIONS: ActionDefinition[] = [
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

// Workflow Templates
export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
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

// Mock Workflows
export const MOCK_WORKFLOWS: Workflow[] = [
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
