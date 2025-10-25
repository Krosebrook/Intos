import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Calendar } from '../ui/calendar';
import { Alert, AlertDescription } from '../ui/alert';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Video,
  MapPin,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Bell,
  Settings,
  Trash2,
  Edit,
  Copy,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Zap,
  TrendingUp,
  Sparkles,
  Mail,
  Phone
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  calendar: 'work' | 'personal' | 'hubspot' | 'freshdesk';
  type: 'meeting' | 'call' | 'task' | 'focus' | 'escalation';
  attendees: string[];
  location?: string;
  videoUrl?: string;
  description?: string;
  status: 'confirmed' | 'tentative' | 'cancelled';
  source?: string;
  linkedEntity?: {
    type: 'deal' | 'ticket' | 'contact';
    id: string;
    name: string;
  };
}

const mockEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Customer Onboarding - Acme Corp',
    start: new Date(2025, 9, 25, 10, 0),
    end: new Date(2025, 9, 25, 11, 0),
    calendar: 'hubspot',
    type: 'meeting',
    attendees: ['john@acme.com', 'sarah@intinc.com'],
    videoUrl: 'https://meet.google.com/abc-defg-hij',
    description: 'Kickoff meeting for new customer onboarding',
    status: 'confirmed',
    source: 'HubSpot Deal: Acme Corp - $50k',
    linkedEntity: { type: 'deal', id: 'deal-123', name: 'Acme Corp Deal' }
  },
  {
    id: 'evt-2',
    title: 'Ticket Escalation Call - RefundRequest',
    start: new Date(2025, 9, 25, 14, 0),
    end: new Date(2025, 9, 25, 14, 30),
    calendar: 'freshdesk',
    type: 'escalation',
    attendees: ['support@intinc.com', 'customer@example.com'],
    location: 'Phone: +1-555-0123',
    description: 'Discuss refund request - urgent',
    status: 'confirmed',
    source: 'Freshdesk Ticket #FD-4567',
    linkedEntity: { type: 'ticket', id: 'ticket-456', name: 'Refund Request' }
  },
  {
    id: 'evt-3',
    title: 'Team Standup',
    start: new Date(2025, 9, 25, 9, 0),
    end: new Date(2025, 9, 25, 9, 30),
    calendar: 'work',
    type: 'meeting',
    attendees: ['team@intinc.com'],
    videoUrl: 'https://teams.microsoft.com/l/meetup-join/abc',
    status: 'confirmed'
  },
  {
    id: 'evt-4',
    title: 'Focus Time - Project Planning',
    start: new Date(2025, 9, 25, 13, 0),
    end: new Date(2025, 9, 25, 15, 0),
    calendar: 'personal',
    type: 'focus',
    attendees: [],
    description: 'Deep work session for Q4 planning',
    status: 'confirmed'
  },
  {
    id: 'evt-5',
    title: 'Sales Call - Enterprise Lead',
    start: new Date(2025, 9, 25, 16, 0),
    end: new Date(2025, 9, 25, 17, 0),
    calendar: 'hubspot',
    type: 'call',
    attendees: ['lead@enterprise.com', 'sales@intinc.com'],
    location: 'Phone',
    status: 'tentative',
    source: 'HubSpot Contact: Enterprise Lead',
    linkedEntity: { type: 'contact', id: 'contact-789', name: 'Enterprise Lead' }
  }
];

const mockSuggestions = [
  {
    id: 'sug-1',
    title: 'Follow-up with Acme Corp',
    reason: 'Deal moved to "Proposal Sent" 3 days ago',
    suggestedTime: new Date(2025, 9, 26, 14, 0),
    type: 'hubspot',
    confidence: 0.92
  },
  {
    id: 'sug-2',
    title: 'Customer Check-in Call',
    reason: 'Ticket resolved 7 days ago, no follow-up',
    suggestedTime: new Date(2025, 9, 26, 10, 0),
    type: 'freshdesk',
    confidence: 0.85
  },
  {
    id: 'sug-3',
    title: 'Team Retrospective',
    reason: 'Recurring event missing this week',
    suggestedTime: new Date(2025, 9, 27, 15, 0),
    type: 'work',
    confidence: 0.78
  }
];

export function CalendarSync() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 9, 25));
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [filterCalendar, setFilterCalendar] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getCalendarColor = (calendar: string) => {
    const colors = {
      work: '#529ADB',
      personal: '#46A57B',
      hubspot: '#E27305',
      freshdesk: '#529ADB'
    };
    return colors[calendar as keyof typeof colors] || '#CBD5E0';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      meeting: Video,
      call: Phone,
      task: CheckCircle2,
      focus: Clock,
      escalation: AlertCircle
    };
    return icons[type as keyof typeof icons] || CalendarIcon;
  };

  const filteredEvents = mockEvents.filter(event => {
    const matchesCalendar = filterCalendar === 'all' || event.calendar === filterCalendar;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = event.start.toDateString() === selectedDate.toDateString();
    return matchesCalendar && matchesSearch && matchesDate;
  });

  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="h-full flex flex-col p-6 gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">CalendarSync</h1>
          <p className="text-gray-400">Smart scheduling with Google Calendar integration</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-white/20 text-white">
            <Settings className="w-4 h-4 mr-2" />
            Sync Settings
          </Button>
          <Button size="sm" className="bg-[#E27305] hover:bg-[#F08515] text-white" onClick={() => setShowNewEvent(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      {/* AI Suggestions Alert */}
      <Alert className="border-[#529ADB] bg-[#529ADB]/10">
        <Sparkles className="w-4 h-4 text-[#529ADB]" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-sm text-gray-300">
            <strong className="text-white">AI Smart Scheduling:</strong> {mockSuggestions.length} suggested meetings based on your CRM activity
          </span>
          <Button size="sm" variant="outline" className="border-[#529ADB] text-[#529ADB] hover:bg-[#529ADB]/10">
            View Suggestions
          </Button>
        </AlertDescription>
      </Alert>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Today's Events</p>
                <p className="text-2xl text-white">{mockEvents.length}</p>
              </div>
              <CalendarIcon className="w-8 h-8 text-[#E27305]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Meeting Hours</p>
                <p className="text-2xl text-white">5.5h</p>
              </div>
              <Clock className="w-8 h-8 text-[#529ADB]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">CRM Synced</p>
                <p className="text-2xl text-white">3</p>
              </div>
              <Zap className="w-8 h-8 text-[#46A57B]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Conflicts</p>
                <p className="text-2xl text-white">0</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-[#46A57B]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Calendar Sidebar */}
        <Card className="bg-white/5 border-white/10 lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white">Calendar</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Mini Calendar */}
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border border-white/10"
            />

            {/* Calendar Filters */}
            <div className="space-y-2">
              <h4 className="text-sm text-gray-400">Calendars</h4>
              {[
                { id: 'work', name: 'Work Calendar', color: '#529ADB', count: 12 },
                { id: 'personal', name: 'Personal', color: '#46A57B', count: 8 },
                { id: 'hubspot', name: 'HubSpot Deals', color: '#E27305', count: 24 },
                { id: 'freshdesk', name: 'Support Queue', color: '#529ADB', count: 6 }
              ].map((cal) => (
                <div key={cal.id} className="flex items-center justify-between p-2 rounded hover:bg-white/5 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: cal.color }} />
                    <span className="text-sm text-white">{cal.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs bg-white/5 border-white/20">
                    {cal.count}
                  </Badge>
                </div>
              ))}
            </div>

            {/* AI Suggestions */}
            <div className="space-y-2">
              <h4 className="text-sm text-gray-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#529ADB]" />
                Smart Suggestions
              </h4>
              {mockSuggestions.map((sug) => (
                <div key={sug.id} className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="text-sm text-white">{sug.title}</h5>
                    <Badge className="text-xs" style={{ backgroundColor: `${getCalendarColor(sug.type)}20`, color: getCalendarColor(sug.type) }}>
                      {Math.round(sug.confidence * 100)}%
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{sug.reason}</p>
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="h-6 text-xs bg-[#46A57B] hover:bg-[#58B68D]">
                      Schedule
                    </Button>
                    <Button size="sm" variant="ghost" className="h-6 text-xs">
                      Dismiss
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Schedule View */}
        <Card className="bg-white/5 border-white/10 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white mb-1">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h3>
                <p className="text-sm text-gray-400">{filteredEvents.length} events scheduled</p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search events..."
                    className="pl-10 w-64 bg-white/5 border-white/10 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={viewMode} onValueChange={(v: any) => setViewMode(v)}>
                  <SelectTrigger className="w-[120px] bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="relative">
                {/* Time Grid */}
                {timeSlots.map((hour) => (
                  <div key={hour} className="flex border-b border-white/5" style={{ height: '60px' }}>
                    <div className="w-20 flex-shrink-0 pr-2 text-right">
                      <span className="text-xs text-gray-400">
                        {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                      </span>
                    </div>
                    <div className="flex-1 border-l border-white/10 relative">
                      {/* Events in this hour */}
                      {filteredEvents
                        .filter(event => event.start.getHours() === hour)
                        .map((event, idx) => {
                          const Icon = getTypeIcon(event.type);
                          const duration = (event.end.getTime() - event.start.getTime()) / (1000 * 60);
                          const height = (duration / 60) * 60; // 60px per hour

                          return (
                            <div
                              key={event.id}
                              className="absolute left-2 right-2 rounded-lg p-2 cursor-pointer hover:opacity-90 transition-opacity"
                              style={{
                                backgroundColor: `${getCalendarColor(event.calendar)}20`,
                                border: `2px solid ${getCalendarColor(event.calendar)}`,
                                top: `${(event.start.getMinutes() / 60) * 60}px`,
                                height: `${height}px`,
                                zIndex: 10 + idx
                              }}
                              onClick={() => setSelectedEvent(event)}
                            >
                              <div className="flex items-start gap-2">
                                <Icon className="w-4 h-4 flex-shrink-0" style={{ color: getCalendarColor(event.calendar) }} />
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm text-white truncate">{event.title}</h4>
                                  <p className="text-xs text-gray-400">
                                    {event.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - 
                                    {event.end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                                  </p>
                                  {event.attendees.length > 0 && (
                                    <div className="flex items-center gap-1 mt-1">
                                      <Users className="w-3 h-3 text-gray-400" />
                                      <span className="text-xs text-gray-400">{event.attendees.length}</span>
                                    </div>
                                  )}
                                  {event.videoUrl && (
                                    <Badge className="mt-1 text-xs" variant="outline">
                                      <Video className="w-3 h-3 mr-1" />
                                      Video
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedEvent(null)}>
          <Card className="bg-[#172235] border-white/10 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {(() => {
                      const Icon = getTypeIcon(selectedEvent.type);
                      return <Icon className="w-5 h-5" style={{ color: getCalendarColor(selectedEvent.calendar) }} />;
                    })()}
                    <h3 className="text-white">{selectedEvent.title}</h3>
                  </div>
                  <Badge style={{ backgroundColor: `${getCalendarColor(selectedEvent.calendar)}20`, color: getCalendarColor(selectedEvent.calendar) }}>
                    {selectedEvent.calendar}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)}>×</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Start Time</p>
                  <p className="text-white">
                    {selectedEvent.start.toLocaleString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      hour: 'numeric', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">End Time</p>
                  <p className="text-white">
                    {selectedEvent.end.toLocaleString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      hour: 'numeric', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>

              {selectedEvent.attendees.length > 0 && (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Attendees ({selectedEvent.attendees.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.attendees.map((attendee, idx) => (
                      <Badge key={idx} variant="outline" className="bg-white/5 border-white/20">
                        {attendee}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white">{selectedEvent.location}</p>
                  </div>
                </div>
              )}

              {selectedEvent.videoUrl && (
                <div className="flex items-start gap-2">
                  <Video className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Video Conference</p>
                    <a href={selectedEvent.videoUrl} className="text-[#529ADB] hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                      Join Meeting <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              {selectedEvent.description && (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Description</p>
                  <p className="text-white text-sm">{selectedEvent.description}</p>
                </div>
              )}

              {selectedEvent.linkedEntity && (
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm text-gray-400 mb-1">Linked to CRM</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">{selectedEvent.linkedEntity.name}</p>
                      <p className="text-xs text-gray-400">{selectedEvent.linkedEntity.type}</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-white/20">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View in {selectedEvent.calendar === 'hubspot' ? 'HubSpot' : 'Freshdesk'}
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button className="flex-1 bg-[#529ADB] hover:bg-[#6AABEB] text-white">
                  {selectedEvent.videoUrl ? 'Join Meeting' : 'Open Calendar'}
                </Button>
                <Button variant="outline" className="border-white/20">
                  <Bell className="w-4 h-4 mr-2" />
                  Remind Me
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* New Event Modal */}
      {showNewEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowNewEvent(false)}>
          <Card className="bg-[#172235] border-white/10 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-white">Create New Event</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowNewEvent(false)}>×</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Event Title</label>
                <Input placeholder="e.g., Customer Meeting" className="bg-white/5 border-white/10 text-white" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Start Time</label>
                  <Input type="datetime-local" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">End Time</label>
                  <Input type="datetime-local" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Calendar</label>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select calendar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="work">Work Calendar</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="hubspot">HubSpot Deals</SelectItem>
                    <SelectItem value="freshdesk">Support Queue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Attendees</label>
                <Input placeholder="Add email addresses..." className="bg-white/5 border-white/10 text-white" />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Description</label>
                <Textarea placeholder="Add event details..." className="bg-white/5 border-white/10 text-white" rows={3} />
              </div>

              <div className="flex items-center gap-2">
                <Switch id="video" />
                <label htmlFor="video" className="text-sm text-white">Add video conference link</label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1 bg-[#46A57B] hover:bg-[#58B68D] text-white">
                  Create Event
                </Button>
                <Button variant="outline" className="border-white/20" onClick={() => setShowNewEvent(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
