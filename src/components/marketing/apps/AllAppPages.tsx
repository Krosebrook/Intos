// Export all app landing pages for easy import
export { InsightHubPage } from './InsightHubPage';
export { WorkflowEnginePage } from './WorkflowEnginePage';
export { UnifiedInboxPage } from './UnifiedInboxPage';
export { CalendarSyncPage } from './CalendarSyncPage';
export { FileVaultPage } from './FileVaultPage';
export { AnalyticsStudioPage } from './AnalyticsStudioPage';
export { SurveyCenterPage } from './SurveyCenterPage';
export { KnowledgeHubPage } from './KnowledgeHubPage';
export { IntegrationHubPage } from './IntegrationHubPage';
export { ResolveDeskPage } from './ResolveDeskPage';
export { ConnectDeskPage } from './ConnectDeskPage';
export { FlowForgePage } from './FlowForgePage';
export { SentimentScopePage } from './SentimentScopePage';
export { AlertOpsPage } from './AlertOpsPage';
export { SyncBotPanelPage } from './SyncBotPanelPage';
export { AcademyPortalPage } from './AcademyPortalPage';
export { PulseBoardPage } from './PulseBoardPage';
export { BrainDockPage } from './BrainDockPage';
export { TriageLensPage } from './TriageLensPage';

// Helper to get page by app name
export const getAppPage = (appName: string) => {
  const pages: Record<string, any> = {
    'InsightHub': InsightHubPage,
    'WorkflowEngine': WorkflowEnginePage,
    'UnifiedInbox': UnifiedInboxPage,
    'CalendarSync': CalendarSyncPage,
    'FileVault': FileVaultPage,
    'AnalyticsStudio': AnalyticsStudioPage,
    'SurveyCenter': SurveyCenterPage,
    'KnowledgeHub': KnowledgeHubPage,
    'IntegrationHub': IntegrationHubPage,
    'ResolveDesk': ResolveDeskPage,
    'ConnectDesk': ConnectDeskPage,
    'FlowForge': FlowForgePage,
    'SentimentScope': SentimentScopePage,
    'AlertOps': AlertOpsPage,
    'SyncBotPanel': SyncBotPanelPage,
    'AcademyPortal': AcademyPortalPage,
    'PulseBoard': PulseBoardPage,
    'BrainDock': BrainDockPage,
    'TriageLens': TriageLensPage,
  };
  return pages[appName];
};
