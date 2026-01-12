import { SyncLog } from '../../lib/integration-types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Download, Filter, Search } from 'lucide-react';
import { useState } from 'react';

interface SyncHistoryTableProps {
  logs: SyncLog[];
}

export function SyncHistoryTable({ logs }: SyncHistoryTableProps) {
  const [filter, setFilter] = useState('');

  const filteredLogs = logs.filter(log => 
    log.serviceName.toLowerCase().includes(filter.toLowerCase()) ||
    log.details.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8B2C1]" />
          <input
            type="text"
            placeholder="Search logs..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-[#A8B2C1] focus:outline-none focus:border-[#0097A9]"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/10 text-[#A8B2C1]">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-white/10 text-[#A8B2C1]">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="border border-white/10 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5 border-b border-white/10">
            <TableRow className="hover:bg-transparent border-white/10">
              <TableHead className="text-[#A8B2C1]">Timestamp</TableHead>
              <TableHead className="text-[#A8B2C1]">Service</TableHead>
              <TableHead className="text-[#A8B2C1]">Flow</TableHead>
              <TableHead className="text-[#A8B2C1]">Records</TableHead>
              <TableHead className="text-[#A8B2C1]">Status</TableHead>
              <TableHead className="text-[#A8B2C1]">Duration</TableHead>
              <TableHead className="text-[#A8B2C1]">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id} className="border-white/10 hover:bg-white/5">
                <TableCell className="text-white font-mono text-xs">{log.timestamp}</TableCell>
                <TableCell className="text-white">{log.serviceName}</TableCell>
                <TableCell className="text-[#A8B2C1] text-xs">
                  {log.source} → {log.destination}
                </TableCell>
                <TableCell className="text-white">{log.recordsSynced}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`
                    ${log.status === 'success' ? 'border-green-500/20 text-green-500 bg-green-500/10' : ''}
                    ${log.status === 'failed' ? 'border-red-500/20 text-red-500 bg-red-500/10' : ''}
                    ${log.status === 'partial' ? 'border-yellow-500/20 text-yellow-500 bg-yellow-500/10' : ''}
                  `}>
                    {log.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-[#A8B2C1] text-xs">{log.duration}</TableCell>
                <TableCell className="text-[#A8B2C1] max-w-xs truncate" title={log.details}>
                  {log.details}
                  {log.error && <span className="block text-red-400 text-xs mt-0.5">{log.error}</span>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
