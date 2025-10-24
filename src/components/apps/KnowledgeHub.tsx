import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  BookOpen,
  Search,
  FileText,
  Folder,
  Star,
  Clock,
  Users,
  Tag,
  ExternalLink,
  Plus,
  RefreshCw,
  Sparkles,
  ChevronRight,
  BookMarked
} from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

const mockNotionPages = [
  {
    id: '1',
    title: 'Error Code 504 - Troubleshooting Guide',
    workspace: 'Engineering',
    category: 'Troubleshooting',
    lastUpdated: '2 days ago',
    author: 'Sarah Chen',
    tags: ['technical', 'errors', '504', 'gateway'],
    views: 342,
    starred: true,
    summary: 'Step-by-step guide for diagnosing and resolving 504 Gateway Timeout errors in production environments.'
  },
  {
    id: '2',
    title: 'Customer Onboarding Playbook',
    workspace: 'Customer Success',
    category: 'Playbooks',
    lastUpdated: '1 week ago',
    author: 'Michael Torres',
    tags: ['onboarding', 'playbook', 'process'],
    views: 189,
    starred: false,
    summary: 'Complete onboarding process for new enterprise customers, including kickoff meetings, training sessions, and success criteria.'
  },
  {
    id: '3',
    title: 'API Rate Limiting Best Practices',
    workspace: 'Engineering',
    category: 'Documentation',
    lastUpdated: '3 days ago',
    author: 'Jennifer Park',
    tags: ['api', 'rate-limiting', 'best-practices'],
    views: 567,
    starred: true,
    summary: 'Guidelines for implementing and configuring API rate limits, including examples and common pitfalls to avoid.'
  },
  {
    id: '4',
    title: 'Q4 Product Roadmap',
    workspace: 'Product',
    category: 'Planning',
    lastUpdated: '5 days ago',
    author: 'David Kim',
    tags: ['roadmap', 'planning', 'q4'],
    views: 891,
    starred: false,
    summary: 'Detailed product roadmap for Q4 2025, including feature priorities, timelines, and resource allocation.'
  },
  {
    id: '5',
    title: 'Security Incident Response Runbook',
    workspace: 'Security',
    category: 'Runbooks',
    lastUpdated: '1 day ago',
    author: 'Lisa Anderson',
    tags: ['security', 'incident', 'runbook'],
    views: 234,
    starred: true,
    summary: 'Standard operating procedures for responding to security incidents, including escalation paths and communication templates.'
  }
];

const recentlyAccessed = [
  {
    id: '1',
    title: 'Error Code 504 - Troubleshooting Guide',
    timestamp: '10 min ago',
    workspace: 'Engineering'
  },
  {
    id: '3',
    title: 'API Rate Limiting Best Practices',
    timestamp: '2 hours ago',
    workspace: 'Engineering'
  },
  {
    id: '5',
    title: 'Security Incident Response Runbook',
    timestamp: 'Yesterday',
    workspace: 'Security'
  }
];

export function KnowledgeHub() {
  const [selectedPage, setSelectedPage] = useState<typeof mockNotionPages[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiQueryMode, setAiQueryMode] = useState(false);

  const filteredPages = mockNotionPages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="h-full flex flex-col p-6 gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">Knowledge Hub</h1>
          <p className="text-gray-400">Notion integration and intelligent knowledge management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-white/20 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Notion
          </Button>
          <Button size="sm" className="bg-[#46A57B] hover:bg-[#58B68D] text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Page
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Pages</p>
                <p className="text-2xl text-white">1,247</p>
              </div>
              <FileText className="w-8 h-8 text-[#46A57B]" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Workspaces</p>
                <p className="text-2xl text-white">8</p>
              </div>
              <Folder className="w-8 h-8 text-[#529ADB]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Starred</p>
                <p className="text-2xl text-white">42</p>
              </div>
              <Star className="w-8 h-8 text-[#E27305]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Updated Today</p>
                <p className="text-2xl text-white">15</p>
              </div>
              <Clock className="w-8 h-8 text-[#46A57B]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Search Toggle */}
      <Alert className="border-[#529ADB] bg-[#529ADB]/10">
        <Sparkles className="w-4 h-4 text-[#529ADB]" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-sm text-gray-300">
            <strong className="text-white">AI-Powered Search:</strong> Ask questions in natural language and I'll find relevant documentation.
          </span>
          <Button
            size="sm"
            variant="outline"
            className={aiQueryMode ? 'border-[#46A57B] bg-[#46A57B]/20 text-[#46A57B]' : 'border-white/20'}
            onClick={() => setAiQueryMode(!aiQueryMode)}
          >
            {aiQueryMode ? 'Enabled' : 'Enable'}
          </Button>
        </AlertDescription>
      </Alert>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Sidebar - Search & Navigation */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search */}
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={aiQueryMode ? "Ask AI: 'How do I fix error 504?'" : "Search knowledge base..."}
                  className="pl-10 bg-white/5 border-white/10 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full bg-white/5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="starred">Starred</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Recently Accessed */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#46A57B]" />
                <h3 className="text-white">Recently Accessed</h3>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                {recentlyAccessed.map(item => (
                  <button
                    key={item.id}
                    className="w-full p-2 rounded-lg hover:bg-white/5 transition-colors text-left"
                    onClick={() => {
                      const page = mockNotionPages.find(p => p.id === item.id);
                      if (page) setSelectedPage(page);
                    }}
                  >
                    <p className="text-sm text-white truncate">{item.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="outline" className="text-xs px-1.5 py-0 bg-white/5 border-white/20 text-gray-400">
                        {item.workspace}
                      </Badge>
                      <span className="text-xs text-gray-500">{item.timestamp}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <h3 className="text-white">Categories</h3>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-1">
                {['Troubleshooting', 'Playbooks', 'Documentation', 'Runbooks', 'Planning'].map(category => (
                  <button
                    key={category}
                    className="w-full px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">{category}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-4">
          {selectedPage ? (
            /* Page Detail View */
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-[#46A57B]/20 text-[#46A57B] border-[#46A57B]/50">
                        {selectedPage.workspace}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-white/5 border-white/20 text-gray-400">
                        {selectedPage.category}
                      </Badge>
                    </div>
                    <h2 className="text-2xl text-white mb-2">{selectedPage.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{selectedPage.author}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Updated {selectedPage.lastUpdated}</span>
                      </div>
                      <span>•</span>
                      <span>{selectedPage.views} views</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-white/20">
                      <Star className={`w-4 h-4 ${selectedPage.starred ? 'fill-[#E27305] text-[#E27305]' : ''}`} />
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/20">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <div className="flex flex-wrap gap-1">
                    {selectedPage.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0 bg-white/5 border-white/20 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="prose prose-invert max-w-none">
                    {/* Summary */}
                    <div className="mb-6 p-4 rounded-lg bg-[#529ADB]/10 border border-[#529ADB]/30">
                      <p className="text-sm text-gray-300">{selectedPage.summary}</p>
                    </div>

                    {/* Page Content (Mocked Notion-style) */}
                    <div className="space-y-6 text-gray-300">
                      <div>
                        <h3 className="text-xl text-white mb-3">Overview</h3>
                        <p className="leading-relaxed">
                          This guide provides comprehensive instructions for identifying, diagnosing, and 
                          resolving common issues. Follow the steps in order for best results.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl text-white mb-3">Prerequisites</h3>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>Access to system logs and monitoring dashboard</li>
                          <li>Basic understanding of system architecture</li>
                          <li>Necessary permissions for system configuration</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl text-white mb-3">Step-by-Step Guide</h3>
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <h4 className="text-white mb-2">Step 1: Check System Logs</h4>
                            <p className="text-sm text-gray-400 mb-2">
                              Navigate to the monitoring dashboard and review recent error logs.
                            </p>
                            <div className="bg-black/40 p-3 rounded font-mono text-sm text-gray-300">
                              tail -f /var/log/application.log | grep ERROR
                            </div>
                          </div>

                          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <h4 className="text-white mb-2">Step 2: Verify Configuration</h4>
                            <p className="text-sm text-gray-400">
                              Ensure all configuration files are properly set and no recent changes were made.
                            </p>
                          </div>

                          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <h4 className="text-white mb-2">Step 3: Restart Services</h4>
                            <p className="text-sm text-gray-400 mb-2">
                              If logs indicate service degradation, perform a controlled restart.
                            </p>
                            <div className="bg-black/40 p-3 rounded font-mono text-sm text-gray-300">
                              systemctl restart application-service
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl text-white mb-3">Additional Resources</h3>
                        <div className="space-y-2">
                          <a href="#" className="flex items-center gap-2 text-[#529ADB] hover:text-[#6AAEE5]">
                            <BookMarked className="w-4 h-4" />
                            <span>Related Documentation: System Architecture</span>
                          </a>
                          <a href="#" className="flex items-center gap-2 text-[#529ADB] hover:text-[#6AAEE5]">
                            <BookMarked className="w-4 h-4" />
                            <span>Runbook: Emergency Response Procedures</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                {/* AI Summary */}
                <Alert className="mt-4 border-[#46A57B] bg-[#46A57B]/10">
                  <Sparkles className="w-4 h-4 text-[#46A57B]" />
                  <AlertDescription className="text-sm text-gray-300">
                    <strong className="text-white">AI Summary:</strong> This troubleshooting guide covers diagnostic steps, 
                    log analysis, and service restart procedures. Average completion time: 15-30 minutes. Success rate: 87%.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          ) : (
            /* Search Results */
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <h3 className="text-white">
                  {searchQuery ? `Search Results (${filteredPages.length})` : 'All Pages'}
                </h3>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-3">
                    {filteredPages.map(page => (
                      <button
                        key={page.id}
                        className="w-full p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 transition-colors text-left"
                        onClick={() => setSelectedPage(page)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-[#46A57B]/20 text-[#46A57B] border-[#46A57B]/50 text-xs">
                              {page.workspace}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-white/5 border-white/20 text-gray-400">
                              {page.category}
                            </Badge>
                          </div>
                          {page.starred && <Star className="w-4 h-4 text-[#E27305] fill-[#E27305]" />}
                        </div>

                        <h4 className="text-white mb-2">{page.title}</h4>
                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{page.summary}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {page.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0 bg-white/5 border-white/20 text-gray-400">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{page.views} views</span>
                            <span>•</span>
                            <span>{page.lastUpdated}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
