// Workflow Engine Utilities
import {
  Mail,
  Calendar,
  Users,
  FileText,
  DollarSign,
  Ticket,
  CheckCircle2,
  Filter,
  MessageSquare,
  Phone,
  Upload,
  Clock,
  Zap,
  Activity
} from 'lucide-react';

export const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    Mail,
    Calendar,
    Users,
    FileText,
    DollarSign,
    Ticket,
    CheckCircle2,
    Filter,
    MessageSquare,
    Phone,
    Upload,
    Clock,
    Zap,
    Activity
  };
  return icons[iconName] || Activity;
};

export const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    active: '#46A57B',
    paused: '#E27305',
    draft: '#CBD5E0'
  };
  return colors[status] || '#CBD5E0';
};
