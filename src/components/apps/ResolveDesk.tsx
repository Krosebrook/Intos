import { Ticket, Clock, CheckCircle, AlertCircle, Search, Filter, Plus, Sparkles } from 'lucide-react';
import { MetricCard } from '../int-os/MetricCard';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { generateTickets } from '../../lib/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

export function ResolveDesk() {
  const tickets = generateTickets(15);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-[#E74C3C] text-white';
      case 'high': return 'bg-[#FF6B35] text-white';
      case 'medium': return 'bg-[#F1C40F] text-black';
      default: return 'bg-[#A8B2C1] text-black';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-[#2ECC71]/20 text-[#2ECC71] border-[#2ECC71]/30';
      case 'in-progress': return 'bg-[#40B4E5]/20 text-[#40B4E5] border-[#40B4E5]/30';
      case 'waiting': return 'bg-[#F1C40F]/20 text-[#F1C40F] border-[#F1C40F]/30';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero KPIs */}
      <div>
        <h1 className="mb-6">ResolveDesk</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Open Tickets"
            value="127"
            change="-15"
            trend="up"
            icon={<Ticket className="w-5 h-5" />}
          />
          <MetricCard
            label="Avg Response Time"
            value="2.4m"
            change="-8%"
            trend="up"
            icon={<Clock className="w-5 h-5" />}
          />
          <MetricCard
            label="Resolution Rate"
            value="94.2%"
            change="+5%"
            trend="up"
            icon={<CheckCircle className="w-5 h-5" />}
          />
          <MetricCard
            label="Customer Satisfaction"
            value="4.8/5"
            change="+0.3"
            trend="up"
            icon={<Sparkles className="w-5 h-5" />}
          />
        </div>
      </div>

      {/* Ticket Management */}
      <Card className="card-gradient border-white/10">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8B2C1]" />
                <Input
                  placeholder="Search tickets..."
                  className="pl-10 bg-white/5 border-white/10"
                />
              </div>
              <Button variant="outline" className="border-white/10 hover:bg-white/5">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
            <Button className="bg-[#0097A9] hover:bg-[#00B8CC] w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead>ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="font-mono text-sm text-[#0097A9]">
                    {ticket.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{ticket.title}</span>
                      {ticket.sentiment === 'negative' && (
                        <AlertCircle className="w-4 h-4 text-[#E74C3C]" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-[#A8B2C1]">
                    {ticket.customer}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-[#0097A9] text-white text-xs">
                          {ticket.assignee.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{ticket.assignee}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-[#A8B2C1]">
                    {new Date(ticket.created).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="hover:bg-white/10">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* AI Draft Demo */}
      <Card className="p-6 card-gradient border-white/10 bg-gradient-to-br from-[#0097A9]/5 to-transparent">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#0097A9]/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-[#0097A9]" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium mb-2">AI Draft Ready</h3>
            <p className="text-sm text-[#A8B2C1] mb-4">
              I've analyzed ticket TKT-1047 and generated a response draft based on similar resolved tickets.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
              <p className="text-sm leading-relaxed">
                "Hi there! I understand you're experiencing login issues. This is typically caused by browser cache. 
                Try clearing your cache and cookies, then restart your browser. If the issue persists, please try 
                accessing the platform in an incognito window..."
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button className="bg-[#0097A9] hover:bg-[#00B8CC]">
                Use Draft
              </Button>
              <Button variant="outline" className="border-white/20">
                Refine
              </Button>
              <div className="flex items-center gap-2 ml-auto text-sm text-[#A8B2C1]">
                <span>Confidence:</span>
                <span className="text-[#2ECC71]">92%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
