import { AlertCircle, Inbox, Loader2, WifiOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

export function EmptyState({
  icon: Icon = Inbox,
  title = 'No data yet',
  description = 'Get started by creating your first item',
  actionLabel,
  onAction,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-[#A8B2C1]" />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-[#A8B2C1] max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="bg-[#0097A9] hover:bg-[#00B8CC]">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function LoadingState({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-4 p-6">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full bg-white/10" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3 bg-white/10" />
            <Skeleton className="h-3 w-1/2 bg-white/5" />
          </div>
          <Skeleton className="h-8 w-24 bg-white/10" />
        </div>
      ))}
    </div>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  description = "We couldn't load this data. Please try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-[#E74C3C]/10 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-[#E74C3C]" />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-[#A8B2C1] max-w-md mb-6">{description}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="border-white/20 hover:bg-white/5"
        >
          Try again
        </Button>
      )}
    </div>
  );
}

export function OfflineState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-[#F1C40F]/10 flex items-center justify-center mb-4">
        <WifiOff className="w-8 h-8 text-[#F1C40F]" />
      </div>
      <h3 className="text-lg font-medium mb-2">You're offline</h3>
      <p className="text-sm text-[#A8B2C1] max-w-md">
        Check your internet connection and try again.
      </p>
    </div>
  );
}

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-[#0097A9]`} />
    </div>
  );
}
