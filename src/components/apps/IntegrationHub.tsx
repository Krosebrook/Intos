import { useState, useEffect } from 'react';
import { IntegrationCard } from '../integrations/IntegrationCard';
import { SyncHistoryTable } from '../integrations/SyncHistoryTable';
import { DataFlowDiagram } from '../integrations/DataFlowDiagram';
import { ConnectionWizard } from '../integrations/ConnectionWizard';
import { ErrorBanner } from '../integrations/ErrorBanner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Plus, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { INTEGRATION_STATES, SYNC_LOGS, DATA_FLOW_LINKS, ERROR_MESSAGES } from '../../lib/integration-mock-data';
import { IntegrationState } from '../../lib/integration-types';

export function IntegrationHub() {
  const [integrations, setIntegrations] = useState<IntegrationState[]>(INTEGRATION_STATES);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Simulate polling
  useEffect(() => {
    const interval = setInterval(() => {
      setIntegrations(prev => prev.map(integration => {
        // Simulate random sync updates for connected apps
        if (integration.status === 'connected' && Math.random() > 0.7) {
          return {
            ...integration,
            config: {
              ...integration.config!,
              lastSyncTime: 'Just now'
            },
            stats: {
              ...integration.stats,
              syncedToday: integration.stats.syncedToday + Math.floor(Math.random() * 5)
            }
          };
        }
        return integration;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSyncAll = () => {
    setIsSyncing(true);
    // Set all connected to syncing
    setIntegrations(prev => prev.map(i => 
      i.status === 'connected' ? { ...i, status: 'syncing' } : i
    ));

    setTimeout(() => {
      setIntegrations(prev => prev.map(i => 
        i.status === 'syncing' ? { ...i, status: 'connected', config: { ...i.config!, lastSyncTime: 'Just now' } } : i
      ));
      setIsSyncing(false);
    }, 2000);
  };

  const handleConfigure = (id: string) => {
    setSelectedService(id);
    setIsWizardOpen(true);
  };

  const handleSync = (id: string) => {
    setIntegrations(prev => prev.map(i => 
      i.id === id ? { ...i, status: 'syncing' } : i
    ));
    setTimeout(() => {
      setIntegrations(prev => prev.map(i => 
        i.id === id ? { ...i, status: 'connected', config: { ...i.config!, lastSyncTime: 'Just now' } } : i
      ));
    }, 2000);
  };

  const handleLogs = (id: string) => {
    setActiveTab('history');
    // Ideally filter logs for this ID
  };

  const errorIntegrations = integrations.filter(i => i.status === 'error');
  const rateLimitedIntegrations = integrations.filter(i => 
    i.status === 'connected' && i.config?.rateLimit && (i.config.rateLimit.used / i.config.rateLimit.total) > 0.8
  );

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Integration Hub</h1>
          <p className="text-[#A8B2C1]">Manage connections, monitor data flow, and troubleshoot sync issues.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="border-white/10 text-white hover:bg-white/5"
            onClick={handleSyncAll}
            disabled={isSyncing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            Sync All
          </Button>
          <Button 
            className="bg-[#E27305] hover:bg-[#FF8811] text-white"
            onClick={() => {
              setSelectedService('New Service');
              setIsWizardOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Connection
          </Button>
        </div>
      </div>

      {/* Global Alerts */}
      {errorIntegrations.map(integration => (
        integration.error && (
          <ErrorBanner
            key={integration.id}
            severity={integration.error.severity}
            title={integration.error.title}
            message={integration.error.message}
            timestamp={integration.error.timestamp}
            action={integration.error.recovery === 'manual' ? {
              label: 'Reconnect',
              onClick: () => handleConfigure(integration.id)
            } : undefined}
          />
        )
      ))}

      {rateLimitedIntegrations.map(integration => (
        <ErrorBanner
          key={integration.id + '-limit'}
          severity="warning"
          title={`${integration.name} API Usage High`}
          message={`You have used ${Math.round((integration.config!.rateLimit!.used / integration.config!.rateLimit!.total) * 100)}% of your API limit.`}
          action={{
            label: 'Upgrade Plan',
            onClick: () => {}
          }}
          dismissible
        />
      ))}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="flow">Data Flow</TabsTrigger>
          <TabsTrigger value="history">Sync History</TabsTrigger>
          <TabsTrigger value="settings">Global Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {integrations.map(integration => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onConfigure={handleConfigure}
                onSync={handleSync}
                onLogs={handleLogs}
              />
            ))}
            
            {/* Add New Placeholder */}
            <button 
              onClick={() => {
                setSelectedService('');
                setIsWizardOpen(true);
              }}
              className="border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-[#A8B2C1] hover:text-white hover:border-white/30 hover:bg-white/5 transition-all min-h-[200px]"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Plus className="w-6 h-6" />
              </div>
              <span className="font-medium">Connect New App</span>
            </button>
          </div>
        </TabsContent>

        <TabsContent value="flow" className="mt-6">
          <div className="bg-[#0F213C]/30 p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-medium text-white mb-6">Live Data Flow</h3>
            <DataFlowDiagram links={DATA_FLOW_LINKS} />
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <SyncHistoryTable logs={SYNC_LOGS} />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <div className="bg-[#0F213C]/30 p-8 rounded-xl border border-white/10 max-w-2xl">
             <div className="space-y-6">
               <h3 className="text-xl font-bold text-white flex items-center gap-2">
                 <ShieldCheck className="w-6 h-6 text-[#0097A9]" />
                 Security & Compliance
               </h3>
               
               <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                   <div>
                     <div className="font-medium text-white">Audit Log Retention</div>
                     <div className="text-sm text-[#A8B2C1]">How long to keep sync logs</div>
                   </div>
                   <select className="bg-[#0F213C] border border-white/10 rounded px-2 py-1 text-white">
                     <option>30 Days</option>
                     <option selected>90 Days</option>
                     <option>1 Year</option>
                   </select>
                 </div>

                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                   <div>
                     <div className="font-medium text-white">Error Notifications</div>
                     <div className="text-sm text-[#A8B2C1]">Email alerts for failed syncs</div>
                   </div>
                   <div className="flex items-center gap-2">
                     <input type="checkbox" checked className="w-4 h-4 rounded border-white/20 bg-white/5" />
                     <span className="text-sm text-white">Enabled</span>
                   </div>
                 </div>

                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                   <div>
                     <div className="font-medium text-white">API Rate Limiting</div>
                     <div className="text-sm text-[#A8B2C1]">Auto-pause at 80% usage</div>
                   </div>
                   <div className="flex items-center gap-2">
                     <input type="checkbox" checked className="w-4 h-4 rounded border-white/20 bg-white/5" />
                     <span className="text-sm text-white">Enabled</span>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </TabsContent>
      </Tabs>

      <ConnectionWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        serviceId={selectedService || 'Service'}
        onSave={(config) => {
          console.log('Saved config:', config);
          // In a real app, update state/backend
        }}
      />
    </div>
  );
}
