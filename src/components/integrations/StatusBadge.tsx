import { ConnectionStatus } from '../../lib/integration-types';
import { CheckCircle2, AlertTriangle, XCircle, PauseCircle, Loader2, Circle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatusBadgeProps {
  status: ConnectionStatus;
  lastSync?: string;
  className?: string;
  showText?: boolean;
}

export function StatusBadge({ status, lastSync, className, showText = true }: StatusBadgeProps) {
  const config = {
    connected: {
      icon: CheckCircle2,
      text: 'Connected',
      color: 'text-green-500',
      bg: 'bg-green-500/10 border-green-500/20'
    },
    limited: {
      icon: AlertTriangle,
      text: 'Limited',
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10 border-yellow-500/20'
    },
    error: {
      icon: XCircle,
      text: 'Error',
      color: 'text-red-500',
      bg: 'bg-red-500/10 border-red-500/20'
    },
    syncing: {
      icon: Loader2,
      text: 'Syncing...',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    disconnected: {
      icon: PauseCircle,
      text: 'Disconnected',
      color: 'text-gray-400',
      bg: 'bg-gray-500/10 border-gray-500/20'
    },
    not_configured: {
      icon: Circle,
      text: 'Not Configured',
      color: 'text-gray-500',
      bg: 'bg-gray-500/5 border-gray-500/10'
    }
  };

  const current = config[status];
  const Icon = current.icon;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-medium",
        current.bg,
        current.color
      )}>
        <Icon className={cn("w-3.5 h-3.5", status === 'syncing' && "animate-spin")} />
        {showText && <span>{current.text}</span>}
      </div>
      {lastSync && status === 'connected' && (
        <span className="text-xs text-[#A8B2C1]">{lastSync}</span>
      )}
    </div>
  );
}
