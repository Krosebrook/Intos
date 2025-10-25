import { AppLandingPage } from './AppLandingPage';
import { BookOpen, Search, Users, Zap, Lock, Sparkles } from 'lucide-react';

export function KnowledgeHubPage() {
  return (
    <AppLandingPage
      appName="KnowledgeHub"
      tagline="Notion Workspace Integration & Knowledge Management"
      description="Centralize your team's knowledge with seamless Notion integration. Search, collaborate, and share documentation effortlessly."
      primaryColor="#46A57B"
      category="Knowledge Management"
      features={[
        {
          title: 'Notion Integration',
          description: 'Full integration with Notion. Browse databases, edit pages, and create content without leaving INT OS.',
          icon: BookOpen
        },
        {
          title: 'Powerful Search',
          description: 'Full-text search across all Notion pages and databases. Find information instantly.',
          icon: Search
        },
        {
          title: 'Team Collaboration',
          description: 'Real-time collaborative editing. See who\'s viewing and editing pages live.',
          icon: Users
        },
        {
          title: 'Quick Access',
          description: 'Pin frequently used pages for one-click access. Organize with custom collections.',
          icon: Zap
        },
        {
          title: 'AI Content Suggestions',
          description: 'AI suggests related articles and documentation based on your current context.',
          icon: Sparkles
        },
        {
          title: 'Granular Permissions',
          description: 'Control who can view, edit, or share documentation with role-based access control.',
          icon: Lock
        }
      ]}
      benefits={[
        {
          title: 'Find Answers 10x Faster',
          description: 'Powerful search and AI suggestions help teams find documentation in seconds, not minutes.'
        },
        {
          title: 'Reduce Support Tickets',
          description: 'Self-service knowledge base reduces internal support tickets by 40%.'
        },
        {
          title: 'Onboard New Hires Faster',
          description: 'Centralized documentation cuts onboarding time from weeks to days.'
        },
        {
          title: 'Keep Knowledge Fresh',
          description: 'Version history and update notifications ensure documentation stays current.'
        }
      ]}
      integrations={['Notion', 'Slack', 'Teams', 'Google Drive', 'Confluence']}
      stats={{ users: '16K+', rating: '4.9', timeSaved: '7 hrs/week' }}
    />
  );
}
