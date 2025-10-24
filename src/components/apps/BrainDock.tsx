import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  Brain,
  Search,
  FileText,
  FolderOpen,
  Star,
  Clock,
  Eye,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  TrendingUp,
  Users,
  Zap,
  Sparkles,
  BookOpen,
  Link2,
  Tag,
  Filter,
  Plus,
  Edit,
  MoreVertical,
} from 'lucide-react';
import { MetricCard } from '../int-os/MetricCard';

const documents = [
  {
    id: 1,
    title: 'HubSpot Integration Setup Guide',
    category: 'Integration',
    tags: ['HubSpot', 'Setup', 'Tutorial'],
    author: 'Sarah Chen',
    lastUpdated: '2025-10-20',
    views: 1247,
    likes: 89,
    comments: 12,
    rating: 4.8,
    status: 'published',
    aiSummary: 'Comprehensive guide for setting up HubSpot integration with step-by-step instructions and troubleshooting tips.',
    relatedDocs: 3,
  },
  {
    id: 2,
    title: 'Automation Best Practices 2025',
    category: 'Best Practices',
    tags: ['Automation', 'Workflows', 'Best Practices'],
    author: 'Mike Rodriguez',
    lastUpdated: '2025-10-22',
    views: 892,
    likes: 67,
    comments: 8,
    rating: 4.9,
    status: 'published',
    aiSummary: 'Updated best practices for building efficient automations, including common pitfalls and optimization strategies.',
    relatedDocs: 5,
  },
  {
    id: 3,
    title: 'Customer Escalation Procedures',
    category: 'Process',
    tags: ['Support', 'Escalation', 'SOP'],
    author: 'Emily Park',
    lastUpdated: '2025-10-18',
    views: 2134,
    likes: 156,
    comments: 24,
    rating: 4.7,
    status: 'published',
    aiSummary: 'Standard operating procedures for handling customer escalations with decision trees and communication templates.',
    relatedDocs: 8,
  },
  {
    id: 4,
    title: 'Freshdesk API Reference',
    category: 'Technical',
    tags: ['Freshdesk', 'API', 'Reference'],
    author: 'Alex Turner',
    lastUpdated: '2025-10-23',
    views: 645,
    likes: 42,
    comments: 5,
    rating: 4.6,
    status: 'published',
    aiSummary: 'Complete API reference for Freshdesk integration with code examples and authentication details.',
    relatedDocs: 4,
  },
  {
    id: 5,
    title: 'Team Onboarding Checklist',
    category: 'Onboarding',
    tags: ['Onboarding', 'Training', 'New Hire'],
    author: 'Jordan Lee',
    lastUpdated: '2025-10-21',
    views: 1567,
    likes: 124,
    comments: 18,
    rating: 4.9,
    status: 'published',
    aiSummary: '30-day onboarding checklist for new team members with training modules and milestone checkpoints.',
    relatedDocs: 6,
  },
  {
    id: 6,
    title: 'AI Sentiment Analysis Overview',
    category: 'Product',
    tags: ['AI', 'Sentiment', 'Analytics'],
    author: 'Dr. Emily Park',
    lastUpdated: '2025-10-24',
    views: 423,
    likes: 31,
    comments: 3,
    rating: 4.5,
    status: 'draft',
    aiSummary: 'Overview of AI-powered sentiment analysis features and how to interpret results for customer insights.',
    relatedDocs: 2,
  },
];

const folders = [
  { id: 1, name: 'Integrations', count: 23, icon: Link2, color: '#0097A9' },
  { id: 2, name: 'Best Practices', count: 18, icon: Star, color: '#F1C40F' },
  { id: 3, name: 'Processes & SOPs', count: 34, icon: FileText, color: '#9B59B6' },
  { id: 4, name: 'Technical Docs', count: 45, icon: BookOpen, color: '#40B4E5' },
  { id: 5, name: 'Training Materials', count: 28, icon: Users, color: '#2ECC71' },
  { id: 6, name: 'Product Updates', count: 12, icon: Sparkles, color: '#FF6B35' },
];

const recentActivity = [
  {
    id: 1,
    type: 'created',
    user: 'Sarah Chen',
    document: 'Q4 Strategy Overview',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    type: 'updated',
    user: 'Mike Rodriguez',
    document: 'Automation Best Practices 2025',
    timestamp: '5 hours ago',
  },
  {
    id: 3,
    type: 'commented',
    user: 'Emily Park',
    document: 'Customer Escalation Procedures',
    timestamp: '1 day ago',
  },
  {
    id: 4,
    type: 'liked',
    user: 'Alex Turner',
    document: 'HubSpot Integration Setup Guide',
    timestamp: '1 day ago',
  },
];

const popularSearches = [
  'HubSpot setup',
  'escalation process',
  'API documentation',
  'onboarding checklist',
  'automation workflows',
  'sentiment analysis',
];

const aiSuggestions = [
  {
    id: 1,
    title: 'Similar to: HubSpot Integration',
    docs: ['Freshdesk API Reference', 'Teams Integration Guide', 'Slack Setup Tutorial'],
  },
  {
    id: 2,
    title: 'Frequently accessed together',
    docs: ['Customer Escalation Procedures', 'Support Ticket Templates', 'Communication Guidelines'],
  },
  {
    id: 3,
    title: 'Recommended for you',
    docs: ['Automation Best Practices 2025', 'Workflow Optimization Tips', 'Advanced Triggers Guide'],
  },
];

export function BrainDock() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || doc.category === selectedCategory;
    
    const matchesTab =
      selectedTab === 'all' ||
      (selectedTab === 'published' && doc.status === 'published') ||
      (selectedTab === 'drafts' && doc.status === 'draft');

    return matchesSearch && matchesCategory && matchesTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-8 h-8 text-[#9B59B6]" />
          <h1>BrainDock</h1>
        </div>
        <p className="text-[#A8B2C1]">
          AI knowledge base and documentation hub
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Documents"
          value="160"
          change="+12 this month"
          trend="up"
          icon={<FileText className="w-5 h-5 text-[#9B59B6]" />}
        />
        <MetricCard
          label="Total Views"
          value="15.2K"
          change="+23% vs last month"
          trend="up"
          icon={<Eye className="w-5 h-5 text-[#40B4E5]" />}
        />
        <MetricCard
          label="Contributors"
          value="24"
          change="3 active today"
          trend="neutral"
          icon={<Users className="w-5 h-5 text-[#2ECC71]" />}
        />
        <MetricCard
          label="Avg Rating"
          value="4.7"
          change="+0.2 this quarter"
          trend="up"
          icon={<Star className="w-5 h-5 text-[#F1C40F]" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Folders */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-4 card-gradient border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm">Folders</h3>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {folders.map((folder) => {
                  const IconComponent = folder.icon;
                  return (
                    <button
                      key={folder.id}
                      onClick={() => setSelectedCategory(folder.name)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-white/5 ${
                        selectedCategory === folder.name ? 'bg-white/10' : ''
                      }`}
                    >
                      <IconComponent
                        className="w-5 h-5"
                        style={{ color: folder.color }}
                      />
                      <div className="flex-1 text-left">
                        <div className="text-sm">{folder.name}</div>
                        <div className="text-xs text-[#A8B2C1]">
                          {folder.count} docs
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </Card>

          {/* Popular Searches */}
          <Card className="p-4 card-gradient border-white/10">
            <h3 className="text-sm mb-3">Popular Searches</h3>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, i) => (
                <Button
                  key={i}
                  size="sm"
                  variant="outline"
                  className="text-xs h-7"
                  onClick={() => setSearchQuery(search)}
                >
                  {search}
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search Bar */}
          <Card className="p-4 card-gradient border-white/10">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8B2C1]" />
                <Input
                  placeholder="Search documents, tags, or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10"
                />
              </div>
              <Button className="bg-[#9B59B6] hover:bg-[#9B59B6]/80">
                <Zap className="w-4 h-4 mr-2" />
                AI Search
              </Button>
              <Button variant="outline">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
            {selectedCategory && (
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="outline">
                  {selectedCategory}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedCategory(null)}
                  className="h-6 text-xs"
                >
                  Clear
                </Button>
              </div>
            )}
          </Card>

          {/* AI Suggestions */}
          {!searchQuery && (
            <Card className="p-4 card-gradient border-white/10 border-l-4 border-l-[#9B59B6]">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#9B59B6]" />
                <h3 className="text-sm">AI Suggestions for You</h3>
              </div>
              <div className="space-y-2">
                {aiSuggestions.map((suggestion) => (
                  <div key={suggestion.id}>
                    <p className="text-xs text-[#A8B2C1] mb-1">
                      {suggestion.title}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestion.docs.map((doc, i) => (
                        <Button
                          key={i}
                          size="sm"
                          variant="ghost"
                          className="text-xs h-7 text-[#9B59B6]"
                        >
                          {doc}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Documents Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="all">All Documents</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="space-y-3 mt-4">
              {filteredDocs.length === 0 ? (
                <Card className="p-12 card-gradient border-white/10 text-center">
                  <FileText className="w-12 h-12 text-[#A8B2C1] mx-auto mb-4" />
                  <h3 className="text-lg mb-2">No documents found</h3>
                  <p className="text-sm text-[#A8B2C1] mb-4">
                    Try adjusting your search or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                    }}
                  >
                    Clear Filters
                  </Button>
                </Card>
              ) : (
                filteredDocs.map((doc) => (
                  <Card
                    key={doc.id}
                    className="p-5 card-gradient border-white/10 hover:border-[#9B59B6]/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-base">{doc.title}</h3>
                              {doc.status === 'draft' && (
                                <Badge variant="outline" className="text-xs text-[#F1C40F] border-[#F1C40F]/50">
                                  Draft
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-[#A8B2C1] mb-3">
                              {doc.aiSummary}
                            </p>
                          </div>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {doc.category}
                          </Badge>
                          {doc.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-white/5">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center gap-4 text-sm text-[#A8B2C1] mb-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-5 h-5">
                              <AvatarFallback className="text-xs">
                                {doc.author.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span>{doc.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(doc.lastUpdated).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {doc.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-[#F1C40F] text-[#F1C40F]" />
                            {doc.rating}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="gap-1">
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                          <Button size="sm" variant="ghost" className="gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {doc.likes}
                          </Button>
                          <Button size="sm" variant="ghost" className="gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {doc.comments}
                          </Button>
                          <Button size="sm" variant="ghost" className="gap-1">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="gap-1">
                            <Share2 className="w-4 h-4" />
                          </Button>
                          {doc.relatedDocs > 0 && (
                            <span className="text-xs text-[#A8B2C1] ml-auto">
                              {doc.relatedDocs} related docs
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 card-gradient border-white/10">
        <h2 className="mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <span className="text-sm">
                  <span className="text-white">{activity.user}</span>
                  <span className="text-[#A8B2C1]"> {activity.type} </span>
                  <span className="text-[#9B59B6]">{activity.document}</span>
                </span>
              </div>
              <span className="text-xs text-[#A8B2C1]">{activity.timestamp}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
