import { IntegrationState } from '../../lib/integration-types';
import { StatusBadge } from './StatusBadge';
import { Settings, RefreshCw, FileText, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import * as Icons from 'lucide-react';

interface IntegrationCardProps {
  integration: IntegrationState;
  onConfigure: (id: string) => void;
  onSync: (id: string) => void;
  onLogs: (id: string) => void;
}

export function IntegrationCard({ integration, onConfigure, onSync, onLogs }: IntegrationCardProps) {
  const IconComponent = (Icons as any)[integration.icon] as any;

  return (
    <Card className="p-4 bg-white/5 border-white/10 hover:border-white/20 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white">
            {IconComponent && <IconComponent className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="font-medium text-white">{integration.name}</h3>
            <StatusBadge 
              status={integration.status} 
              lastSync={integration.config?.lastSyncTime}
              showText={false}
              className="mt-1"
            />
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onConfigure(integration.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-[#A8B2C1] hover:text-white hover:bg-white/10"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#A8B2C1]">Status</span>
          <StatusBadge status={integration.status} showText={true} />
        </div>

        {integration.status === 'connected' && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#A8B2C1]">Synced Today</span>
            <span className="text-white font-mono">{integration.stats.syncedToday.toLocaleString()} items</span>
          </div>
        )}
        
        {integration.status === 'connected' && integration.config?.rateLimit && (
           <div className="space-y-1">
             <div className="flex justify-between text-xs text-[#A8B2C1]">
               <span>API Limit</span>
               <span>{Math.round((integration.config.rateLimit.used / integration.config.rateLimit.total) * 100)}%</span>
             </div>
             <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
               <div 
                 className={`h-full rounded-full ${
                   (integration.config.rateLimit.used / integration.config.rateLimit.total) > 0.8 
                     ? 'bg-red-500' 
                     : 'bg-green-500'
                 }`}
                 style={{ width: `${(integration.config.rateLimit.used / integration.config.rateLimit.total) * 100}%` }}
               />
             </div>
           </div>
        )}

        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-white/10 text-[#A8B2C1] hover:text-white hover:bg-white/5"
            onClick={() => onSync(integration.id)}
            disabled={integration.status === 'syncing' || integration.status === 'not_configured'}
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-2 ${integration.status === 'syncing' ? 'animate-spin' : ''}`} />
            Sync
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="w-full border-white/10 text-[#A8B2C1] hover:text-white hover:bg-white/5"
            onClick={() => onLogs(integration.id)}
          >
            <FileText className="w-3.5 h-3.5 mr-2" />
            Logs
          </Button>
        </div>
      </div>
    </Card>
  );
}
