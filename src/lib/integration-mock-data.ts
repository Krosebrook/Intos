import { IntegrationState, SyncLog, DataFlowLink, IntegrationError } from './integration-types';

export const INTEGRATION_STATES: IntegrationState[] = [
  {
    id: 'hubspot',
    name: 'HubSpot',
    icon: 'Share2',
    status: 'connected',
    config: {
      id: 'conf-hubspot',
      serviceId: 'hubspot',
      isEnabled: true,
      authMethod: 'oauth',
      syncDirection: 'two-way',
      syncFrequency: '15-min',
      fieldMapping: { 'email': 'contact_email', 'firstname': 'first_name' },
      conflictResolution: 'newest',
      rateLimit: { used: 4800, total: 6000, resetTime: '2026-01-13T00:00:00Z' },
      lastSyncTime: '2 minutes ago'
    },
    stats: {
      syncedToday: 1240,
      successRate: 99.8
    }
  },
  {
    id: 'freshdesk',
    name: 'Freshdesk',
    icon: 'Headphones',
    status: 'error',
    error: {
      code: 'freshdesk_auth_expired',
      title: 'Freshdesk authentication expired',
      message: 'Your Freshdesk session expired. Click below to reconnect.',
      severity: 'error',
      recovery: 'manual',
      timestamp: 'Started failing 2 hours ago'
    },
    config: {
      id: 'conf-freshdesk',
      serviceId: 'freshdesk',
      isEnabled: true,
      authMethod: 'api-key',
      syncDirection: 'one-way-in',
      syncFrequency: 'hourly',
      fieldMapping: {},
      conflictResolution: 'manual'
    },
    stats: {
      syncedToday: 0,
      successRate: 0
    }
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    icon: 'MessageSquare',
    status: 'syncing',
    config: {
      id: 'conf-teams',
      serviceId: 'teams',
      isEnabled: true,
      authMethod: 'oauth',
      syncDirection: 'one-way-out',
      syncFrequency: 'real-time',
      fieldMapping: {},
      conflictResolution: 'skip',
      lastSyncTime: 'Syncing now...'
    },
    stats: {
      syncedToday: 56,
      successRate: 100
    }
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    icon: 'Calendar',
    status: 'connected',
    config: {
      id: 'conf-gcal',
      serviceId: 'google-calendar',
      isEnabled: true,
      authMethod: 'oauth',
      syncDirection: 'two-way',
      syncFrequency: 'real-time',
      fieldMapping: {},
      conflictResolution: 'newest',
      lastSyncTime: '10 minutes ago'
    },
    stats: {
      syncedToday: 8,
      successRate: 100
    }
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: 'Hash',
    status: 'not_configured',
    stats: {
      syncedToday: 0,
      successRate: 0
    }
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    icon: 'Cloud',
    status: 'disconnected',
    config: {
      id: 'conf-sf',
      serviceId: 'salesforce',
      isEnabled: false,
      authMethod: 'oauth',
      syncDirection: 'two-way',
      syncFrequency: 'daily',
      fieldMapping: {},
      conflictResolution: 'manual',
      lastSyncTime: '3 days ago'
    },
    stats: {
      syncedToday: 0,
      successRate: 0
    }
  }
];

export const SYNC_LOGS: SyncLog[] = [
  {
    id: 'log-1',
    integrationId: 'hubspot',
    serviceName: 'HubSpot',
    timestamp: '2026-01-12 10:30 AM',
    source: 'HubSpot',
    destination: 'ConnectDesk',
    recordsSynced: 45,
    status: 'success',
    duration: '2.3s',
    details: 'Contacts synced successfully'
  },
  {
    id: 'log-2',
    integrationId: 'hubspot',
    serviceName: 'HubSpot',
    timestamp: '2026-01-12 10:15 AM',
    source: 'HubSpot',
    destination: 'ConnectDesk',
    recordsSynced: 12,
    status: 'success',
    duration: '1.1s',
    details: 'Contacts synced successfully'
  },
  {
    id: 'log-3',
    integrationId: 'freshdesk',
    serviceName: 'Freshdesk',
    timestamp: '2026-01-12 09:45 AM',
    source: 'Freshdesk',
    destination: 'ResolveDesk',
    recordsSynced: 0,
    status: 'failed',
    duration: '0.5s',
    details: 'Authentication failed: 401 Unauthorized',
    error: 'Invalid API Key'
  },
  {
    id: 'log-4',
    integrationId: 'teams',
    serviceName: 'Microsoft Teams',
    timestamp: '2026-01-12 09:30 AM',
    source: 'SyncBot',
    destination: 'Microsoft Teams',
    recordsSynced: 1,
    status: 'success',
    duration: '0.2s',
    details: 'Daily summary posted'
  },
  {
    id: 'log-5',
    integrationId: 'google-calendar',
    serviceName: 'Google Calendar',
    timestamp: '2026-01-12 09:00 AM',
    source: 'Google Calendar',
    destination: 'CalendarSync',
    recordsSynced: 5,
    status: 'partial',
    duration: '1.5s',
    details: '3 events synced, 2 skipped due to conflicts'
  }
];

export const DATA_FLOW_LINKS: DataFlowLink[] = [
  { source: 'HubSpot', target: 'ConnectDesk', value: 1200, status: 'active' },
  { source: 'ConnectDesk', target: 'InsightHub', value: 800, status: 'active' },
  { source: 'Freshdesk', target: 'ResolveDesk', value: 0, status: 'error' },
  { source: 'ResolveDesk', target: 'InsightHub', value: 450, status: 'active' },
  { source: 'Teams', target: 'SyncBotPanel', value: 150, status: 'active' },
  { source: 'Google Calendar', target: 'CalendarSync', value: 30, status: 'active' },
  { source: 'Slack', target: 'PulseChat', value: 0, status: 'disabled' },
];

export const ERROR_MESSAGES: Record<string, IntegrationError> = {
  'hubspot_rate_limit': {
    code: 'hubspot_rate_limit',
    title: 'HubSpot API rate limit reached',
    message: 'Sync paused until tomorrow at 12:00 AM EST. Consider upgrading your HubSpot plan.',
    severity: 'warning',
    recovery: 'auto',
    timestamp: new Date().toISOString()
  },
  'freshdesk_auth_expired': {
    code: 'freshdesk_auth_expired',
    title: 'Freshdesk authentication expired',
    message: 'Your Freshdesk session expired. Click below to reconnect.',
    severity: 'error',
    recovery: 'manual',
    timestamp: new Date().toISOString()
  },
  'teams_webhook_failed': {
    code: 'teams_webhook_failed',
    title: 'Microsoft Teams webhook unreachable',
    message: 'Cannot send notifications to Teams. Check your webhook URL.',
    severity: 'error',
    recovery: 'manual',
    timestamp: new Date().toISOString()
  }
};
