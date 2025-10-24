import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Card } from '../ui/card';

interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function MetricCard({ label, value, change, trend = 'neutral', icon, onClick }: MetricCardProps) {
  const isPositive = trend === 'up';
  const trendColor = isPositive ? '#2ECC71' : trend === 'down' ? '#E74C3C' : '#A8B2C1';

  return (
    <Card
      className={`card-gradient p-6 border-white/10 transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-[#0097A9]/50 hover:shadow-lg hover:scale-105' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-sm text-[#A8B2C1]">{label}</div>
        {icon && <div className="text-[#0097A9]">{icon}</div>}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-semibold mb-1">{value}</div>
          {change && (
            <div className="flex items-center gap-1 text-sm" style={{ color: trendColor }}>
              {trend === 'up' && <TrendingUp className="w-4 h-4" />}
              {trend === 'down' && <TrendingDown className="w-4 h-4" />}
              <span>{change}</span>
            </div>
          )}
        </div>

        {onClick && (
          <ArrowRight className="w-5 h-5 text-[#A8B2C1] group-hover:text-[#0097A9] transition-colors" />
        )}
      </div>
    </Card>
  );
}
