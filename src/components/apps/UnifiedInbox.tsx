import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import {
  Mail,
  Search,
  Filter,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward,
  Tag,
  Clock,
  AlertCircle,
  Smile,
  Frown,
  Meh,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';

// Mock email data with sentiment analysis
const mockEmails = [
  {
    id: '1',
    provider: 'gmail',
    from: 'Sarah Chen',
    email: 'sarah.chen@acmecorp.com',
    subject: 'Urgent: Production Issue - Payment Gateway Down',
    preview: 'We\'re experiencing a critical issue with the payment gateway. Customers cannot complete purchases...',
    timestamp: '2 min ago',
    unread: true,
    flagged: true,
    sentiment: 'negative',
    tags: ['urgent', 'technical', 'payments'],
    threadCount: 5
  },
  {
    id: '2',
    provider: 'outlook',
    from: 'Michael Torres',
    email: 'michael.t@techstartup.io',
    subject: 'Thank you for the excellent support!',
    preview: 'I wanted to reach out personally to thank your team for the quick resolution yesterday...',
    timestamp: '15 min ago',
    unread: true,
    flagged: false,
    sentiment: 'positive',
    tags: ['feedback', 'support'],
    threadCount: 2
  },
  {
    id: '3',
    provider: 'gmail',
    from: 'Jennifer Park',
    email: 'jpark@enterprise.com',
    subject: 'Question about API rate limits',
    preview: 'Hi team, I have a question regarding the API rate limits mentioned in the documentation...',
    timestamp: '1 hour ago',
    unread: false,
    flagged: false,
    sentiment: 'neutral',
    tags: ['question', 'api'],
    threadCount: 1
  },
  {
    id: '4',
    provider: 'outlook',
    from: 'David Kim',
    email: 'david.kim@global-corp.com',
    subject: 'Feature request: Dark mode for mobile app',
    preview: 'We\'ve been using your platform extensively and love it! One feature request from our team...',
    timestamp: '3 hours ago',
    unread: false,
    flagged: false,
    sentiment: 'positive',
    tags: ['feature-request', 'mobile'],
    threadCount: 1
  },
  {
    id: '5',
    provider: 'gmail',
    from: 'Lisa Anderson',
    email: 'l.anderson@retailgroup.com',
    subject: 'Billing discrepancy - Need immediate attention',
    preview: 'I noticed a discrepancy in our latest invoice. The amount charged doesn\'t match our contract...',
    timestamp: '5 hours ago',
    unread: false,
    flagged: true,
    sentiment: 'negative',
    tags: ['billing', 'urgent'],
    threadCount: 3
  }
];

const sentimentConfig = {
  positive: { icon: Smile, color: '#46A57B', label: 'Positive' },
  negative: { icon: Frown, color: '#F87171', label: 'Negative' },
  neutral: { icon: Meh, color: '#CBD5E0', label: 'Neutral' }
};

export function UnifiedInbox() {
  const [selectedEmail, setSelectedEmail] = useState<typeof mockEmails[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProvider, setFilterProvider] = useState<'all' | 'gmail' | 'outlook'>('all');
  const [aiDraftShown, setAiDraftShown] = useState(false);

  const filteredEmails = mockEmails.filter(email => {
    const matchesSearch = email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         email.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvider = filterProvider === 'all' || email.provider === filterProvider;
    return matchesSearch && matchesProvider;
  });

  const getSentimentIcon = (sentiment: string) => {
    const config = sentimentConfig[sentiment as keyof typeof sentimentConfig];
    const Icon = config.icon;
    return <Icon className="w-4 h-4" style={{ color: config.color }} />;
  };

  const generateAIDraft = () => {
    setAiDraftShown(true);
  };

  return (
    <div className="h-full flex flex-col p-6 gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">Unified Inbox</h1>
          <p className="text-gray-400">Gmail & Outlook unified with AI-powered insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-white/20 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Now
          </Button>
          <Button size="sm" className="bg-[#529ADB] hover:bg-[#6AAEE5] text-white">
            <Mail className="w-4 h-4 mr-2" />
            Compose
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Unread</p>
                <p className="text-2xl text-white">127</p>
              </div>
              <Mail className="w-8 h-8 text-[#529ADB]" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Urgent</p>
                <p className="text-2xl text-white">8</p>
              </div>
              <AlertCircle className="w-8 h-8 text-[#F87171]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Response</p>
                <p className="text-2xl text-white">2.4h</p>
              </div>
              <Clock className="w-8 h-8 text-[#46A57B]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Positive</p>
                <p className="text-2xl text-white">76%</p>
              </div>
              <Smile className="w-8 h-8 text-[#46A57B]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Email List */}
        <Card className="lg:col-span-1 bg-white/5 border-white/10 flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search emails..."
                  className="pl-10 bg-white/5 border-white/10 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="border-white/20">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full bg-white/5">
                <TabsTrigger value="all" onClick={() => setFilterProvider('all')}>All</TabsTrigger>
                <TabsTrigger value="gmail" onClick={() => setFilterProvider('gmail')}>Gmail</TabsTrigger>
                <TabsTrigger value="outlook" onClick={() => setFilterProvider('outlook')}>Outlook</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent className="flex-1 min-h-0 p-0">
            <ScrollArea className="h-full">
              <div className="space-y-1 p-4">
                {filteredEmails.map((email) => (
                  <div
                    key={email.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedEmail?.id === email.id
                        ? 'bg-[#529ADB]/20 border border-[#529ADB]'
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                    onClick={() => setSelectedEmail(email)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Badge
                          variant="outline"
                          className={`text-xs px-1.5 py-0.5 ${
                            email.provider === 'gmail'
                              ? 'border-[#529ADB] text-[#529ADB]'
                              : 'border-[#E27305] text-[#E27305]'
                          }`}
                        >
                          {email.provider === 'gmail' ? 'G' : 'O'}
                        </Badge>
                        <span className={`text-sm truncate ${email.unread ? 'text-white font-medium' : 'text-gray-300'}`}>
                          {email.from}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        {email.flagged && <Star className="w-3 h-3 text-[#E27305] fill-[#E27305]" />}
                        {getSentimentIcon(email.sentiment)}
                      </div>
                    </div>
                    
                    <h4 className={`text-sm mb-1 truncate ${email.unread ? 'text-white font-medium' : 'text-gray-300'}`}>
                      {email.subject}
                    </h4>
                    
                    <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                      {email.preview}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {email.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0 bg-white/5 border-white/20 text-gray-400">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{email.timestamp}</span>
                    </div>
                    
                    {email.threadCount > 1 && (
                      <div className="mt-2 text-xs text-[#529ADB]">
                        {email.threadCount} messages in thread
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Email Detail */}
        <Card className="lg:col-span-2 bg-white/5 border-white/10 flex flex-col">
          {selectedEmail ? (
            <>
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl text-white mb-2">{selectedEmail.subject}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span><strong className="text-white">From:</strong> {selectedEmail.from}</span>
                      <span>•</span>
                      <span>{selectedEmail.timestamp}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-white/20">
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/20">
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/20 text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* AI Insights */}
                <Alert className="border-[#529ADB] bg-[#529ADB]/10">
                  <AlertCircle className="w-4 h-4 text-[#529ADB]" />
                  <AlertDescription className="text-sm text-gray-300">
                    <strong className="text-white">AI Insights:</strong> {
                      selectedEmail.sentiment === 'negative'
                        ? 'Urgent customer issue detected. High priority response recommended within 1 hour.'
                        : selectedEmail.sentiment === 'positive'
                        ? 'Positive feedback detected. Consider sharing with team and following up with case study request.'
                        : 'Neutral inquiry. Standard response time applies.'
                    }
                  </AlertDescription>
                </Alert>

                {/* Tags and Sentiment */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <div className="flex gap-1">
                      {selectedEmail.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs bg-white/5 border-white/20 text-gray-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-2">
                    {getSentimentIcon(selectedEmail.sentiment)}
                    <span className="text-sm text-gray-400">
                      {sentimentConfig[selectedEmail.sentiment as keyof typeof sentimentConfig].label} sentiment
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 min-h-0 space-y-4">
                <ScrollArea className="h-64">
                  <div className="text-gray-300 leading-relaxed">
                    <p className="mb-4">{selectedEmail.preview}</p>
                    <p className="mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                      exercitation ullamco laboris.
                    </p>
                    <p>
                      Best regards,<br />
                      {selectedEmail.from}
                    </p>
                  </div>
                </ScrollArea>

                <Separator />

                {/* Reply Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white">Reply</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#529ADB] text-[#529ADB] hover:bg-[#529ADB]/10"
                      onClick={generateAIDraft}
                    >
                      <Smile className="w-4 h-4 mr-2" />
                      AI Draft Response
                    </Button>
                  </div>

                  {aiDraftShown && (
                    <Alert className="border-[#46A57B] bg-[#46A57B]/10">
                      <CheckCircle2 className="w-4 h-4 text-[#46A57B]" />
                      <AlertDescription className="text-sm text-gray-300">
                        <strong className="text-white">AI Generated Draft:</strong> Based on the conversation context and 
                        {selectedEmail.sentiment === 'negative' ? ' urgency' : ' positive tone'}, 
                        I've prepared a response that addresses the customer's concerns professionally.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Textarea
                    placeholder="Type your reply here..."
                    className="min-h-[120px] bg-white/5 border-white/10 text-white resize-none"
                    defaultValue={aiDraftShown ? 
                      `Hi ${selectedEmail.from.split(' ')[0]},\n\nThank you for reaching out. I've reviewed your ${selectedEmail.sentiment === 'negative' ? 'issue' : 'message'} and ${selectedEmail.sentiment === 'negative' ? 'our team is prioritizing this immediately' : 'appreciate your feedback'}...\n\nBest regards,\nSupport Team` 
                      : ''
                    }
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-white/20">
                        <Tag className="w-4 h-4 mr-2" />
                        Add Tags
                      </Button>
                      <Select>
                        <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">Urgent Response</SelectItem>
                          <SelectItem value="standard">Standard Reply</SelectItem>
                          <SelectItem value="followup">Follow-up</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-white/20">
                        <Forward className="w-4 h-4 mr-2" />
                        Forward
                      </Button>
                      <Button size="sm" className="bg-[#529ADB] hover:bg-[#6AAEE5] text-white">
                        <Reply className="w-4 h-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select an email to view details</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
