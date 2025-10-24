import { Users, UserPlus, TrendingUp, DollarSign, Search, Plus, Mail, Phone } from 'lucide-react';
import { MetricCard } from '../int-os/MetricCard';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { generateContacts } from '../../lib/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

export function ConnectDesk() {
  const contacts = generateContacts(12);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'customer': return 'bg-[#2ECC71]/20 text-[#2ECC71] border-[#2ECC71]/30';
      case 'prospect': return 'bg-[#40B4E5]/20 text-[#40B4E5] border-[#40B4E5]/30';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero KPIs */}
      <div>
        <h1 className="mb-6">ConnectDesk</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Total Contacts"
            value="8,472"
            change="+234"
            trend="up"
            icon={<Users className="w-5 h-5" />}
          />
          <MetricCard
            label="New This Month"
            value="184"
            change="+12%"
            trend="up"
            icon={<UserPlus className="w-5 h-5" />}
          />
          <MetricCard
            label="Engagement Rate"
            value="67%"
            change="+5%"
            trend="up"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <MetricCard
            label="Pipeline Value"
            value="$1.2M"
            change="+18%"
            trend="up"
            icon={<DollarSign className="w-5 h-5" />}
          />
        </div>
      </div>

      {/* Contacts Table */}
      <Card className="card-gradient border-white/10">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8B2C1]" />
              <Input
                placeholder="Search contacts..."
                className="pl-10 bg-white/5 border-white/10"
              />
            </div>
            <Button className="bg-[#0097A9] hover:bg-[#00B8CC] w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead>Contact</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id} className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-[#0097A9] text-white text-sm">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-xs text-[#A8B2C1]">{contact.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#A8B2C1]">
                    {contact.company}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{contact.role}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(contact.status)}>
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-[#A8B2C1]">
                    {new Date(contact.lastContact).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-[#2ECC71]">
                    ${(contact.value / 1000).toFixed(1)}K
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="hover:bg-white/10 h-8 w-8">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-white/10 h-8 w-8">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* HubSpot Sync Status */}
      <Card className="p-6 card-gradient border-white/10 bg-gradient-to-br from-[#0097A9]/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#FF8F66] flex items-center justify-center">
              <span className="text-white font-bold text-sm">HS</span>
            </div>
            <div>
              <h3 className="font-medium">HubSpot Sync</h3>
              <p className="text-sm text-[#A8B2C1]">Last synced 5 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-[#A8B2C1]">234 contacts synced</div>
              <div className="text-xs text-[#2ECC71]">Success rate: 98.4%</div>
            </div>
            <Button variant="outline" className="border-white/20">
              Sync Now
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
