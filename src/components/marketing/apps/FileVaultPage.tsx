import { AppLandingPage } from './AppLandingPage';
import { FolderOpen, Cloud, Lock, Search, Link2, Sparkles } from 'lucide-react';

export function FileVaultPage() {
  return (
    <AppLandingPage
      appName="FileVault"
      tagline="Unified File Management for Drive & Dropbox"
      description="Manage all your cloud files in one place. Search across Google Drive and Dropbox, link files to CRM entities, and organize with AI."
      primaryColor="#529ADB"
      category="File Management"
      features={[
        {
          title: 'Unified File Browser',
          description: 'Browse files from Google Drive and Dropbox in one interface. No more switching tabs.',
          icon: FolderOpen
        },
        {
          title: 'Multi-Cloud Support',
          description: 'Connect unlimited Drive and Dropbox accounts. Seamless cross-platform file management.',
          icon: Cloud
        },
        {
          title: 'Advanced Search',
          description: 'Search across all connected accounts. Find files by name, content, or metadata instantly.',
          icon: Search
        },
        {
          title: 'CRM File Linking',
          description: 'Attach files to HubSpot deals, Freshdesk tickets, or customer contacts automatically.',
          icon: Link2
        },
        {
          title: 'AI Organization',
          description: 'AI suggests file categorization and detects duplicates. Keep your storage organized.',
          icon: Sparkles
        },
        {
          title: 'Secure Sharing',
          description: 'Generate secure share links with expiration dates and password protection.',
          icon: Lock
        }
      ]}
      benefits={[
        {
          title: 'Save 5 Hours per Week',
          description: 'Stop wasting time searching for files across multiple platforms and folders.'
        },
        {
          title: 'Reduce Storage Costs',
          description: 'AI duplicate detection and smart archiving helps reduce cloud storage expenses by 30%.'
        },
        {
          title: 'Complete File Context',
          description: 'See which files are linked to active deals or support tickets for better collaboration.'
        },
        {
          title: 'Automatic Backup',
          description: 'Critical files automatically backed up across both Drive and Dropbox for redundancy.'
        }
      ]}
      integrations={['Google Drive', 'Dropbox', 'HubSpot', 'Freshdesk', 'Notion']}
      stats={{ users: '11K+', rating: '4.7', timeSaved: '5 hrs/week' }}
    />
  );
}
