import { AlertTriangle, AlertCircle, X, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

interface ErrorBannerProps {
  severity: 'warning' | 'error';
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  onDismiss?: () => void;
  timestamp?: string;
}

export function ErrorBanner({ 
  severity, 
  title, 
  message, 
  action, 
  dismissible = false, 
  onDismiss,
  timestamp 
}: ErrorBannerProps) {
  const isError = severity === 'error';
  
  return (
    <div className={`
      relative overflow-hidden rounded-lg border p-4 mb-4
      ${isError ? 'bg-red-500/10 border-red-500/20' : 'bg-yellow-500/10 border-yellow-500/20'}
    `}>
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-full ${isError ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
          {isError ? <AlertCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
        </div>
        
        <div className="flex-1">
          <h4 className={`text-sm font-semibold mb-1 ${isError ? 'text-red-500' : 'text-yellow-500'}`}>
            {title}
          </h4>
          <p className="text-sm text-[#A8B2C1] mb-2">
            {message}
          </p>
          {timestamp && (
            <p className="text-xs text-[#A8B2C1]/60 mb-3">
              {timestamp}
            </p>
          )}
          
          {action && (
            <Button 
              size="sm" 
              onClick={action.onClick}
              className={`
                ${isError 
                  ? 'bg-red-500 hover:bg-red-600 text-white border-none' 
                  : 'bg-yellow-500 hover:bg-yellow-600 text-black border-none'}
              `}
            >
              {isError && <RefreshCw className="w-3.5 h-3.5 mr-2" />}
              {action.label}
            </Button>
          )}
        </div>

        {dismissible && (
          <button 
            onClick={onDismiss}
            className="text-[#A8B2C1] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
