export type ConnectionStatus = 'connected' | 'limited' | 'disconnected' | 'not_configured' | 'syncing' | 'error';

export type SyncDirection = 'one-way-in' | 'one-way-out' | 'two-way';

export type SyncFrequency = 'real-time' | '15-min' | 'hourly' | 'daily' | 'manual';

export interface IntegrationConfig {
  id: string;
  serviceId: string;
  isEnabled: boolean;
  authMethod: 'oauth' | 'api-key';
  syncDirection: SyncDirection;
  syncFrequency: SyncFrequency;
  fieldMapping: Record<string, string>;
  conflictResolution: 'newest' | 'oldest' | 'manual' | 'skip';
  filters?: Record<string, any>;
  lastSyncTime?: string;
  nextSyncTime?: string;
  rateLimit?: {
    used: number;
    total: number;
    resetTime: string;
  };
}

export interface IntegrationError {
  code: string;
  title: string;
  message: string;
  severity: 'warning' | 'error';
  recovery: 'auto' | 'manual';
  timestamp: string;
}

export interface SyncLog {
  id: string;
  integrationId: string;
  serviceName: string;
  timestamp: string;
  source: string;
  destination: string;
  recordsSynced: number;
  status: 'success' | 'failed' | 'partial';
  duration: string;
  details: string;
  error?: string;
}

export interface DataFlowLink {
  source: string;
  target: string;
  value: number; // Volume of data
  status: 'active' | 'idle' | 'error' | 'disabled';
}

export interface IntegrationState {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  status: ConnectionStatus;
  config?: IntegrationConfig;
  error?: IntegrationError;
  stats: {
    syncedToday: number;
    successRate: number; // Percentage
  };
}
