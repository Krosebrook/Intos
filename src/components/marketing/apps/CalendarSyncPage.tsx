import { AppLandingPage } from './AppLandingPage';
import { Calendar, Sparkles, Users, Video, Clock, CheckCircle2 } from 'lucide-react';

export function CalendarSyncPage() {
  return (
    <AppLandingPage
      appName="CalendarSync"
      tagline="Smart Scheduling with Google Calendar Integration"
      description="Never double-book again. AI-powered meeting suggestions, CRM integration, and conflict detection make scheduling effortless."
      primaryColor="#E27305"
      category="Scheduling & Calendar"
      features={[
        {
          title: 'Google Calendar Sync',
          description: 'Real-time two-way sync with Google Calendar. All changes reflect instantly.',
          icon: Calendar
        },
        {
          title: 'AI Meeting Suggestions',
          description: 'AI recommends follow-up meetings based on deal stages and customer interactions.',
          icon: Sparkles
        },
        {
          title: 'CRM-Linked Events',
          description: 'Every meeting links to HubSpot deals, Freshdesk tickets, or customer contacts.',
          icon: Users
        },
        {
          title: 'Video Conference Links',
          description: 'Auto-generate Google Meet or Teams links for every meeting. One-click join.',
          icon: Video
        },
        {
          title: 'Smart Conflict Detection',
          description: 'Prevent double-bookings and scheduling conflicts with intelligent time checking.',
          icon: Clock
        },
        {
          title: 'Automatic Reminders',
          description: 'Set custom reminders for meetings. Never forget an important call or demo.',
          icon: CheckCircle2
        }
      ]}
      benefits={[
        {
          title: 'Reduce No-Shows by 40%',
          description: 'Automatic reminders and calendar invites reduce meeting no-shows significantly.'
        },
        {
          title: 'Schedule 3x Faster',
          description: 'AI suggests optimal meeting times based on availability and context from your CRM.'
        },
        {
          title: 'Complete Meeting Context',
          description: 'See deal history, ticket details, and customer notes right in your calendar event.'
        },
        {
          title: 'Team Coordination',
          description: 'View team calendars, find common availability, and schedule group meetings effortlessly.'
        }
      ]}
      integrations={['Google Calendar', 'HubSpot', 'Freshdesk', 'Google Meet', 'Microsoft Teams', 'Zoom']}
      stats={{ users: '14K+', rating: '4.8', timeSaved: '8 hrs/week' }}
    />
  );
}
