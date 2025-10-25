import { Card, CardHeader, CardContent } from '../../ui/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { Switch } from '../../ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Search, Settings, Copy, GitBranch } from 'lucide-react';
import { getStatusColor } from './utils';
import type { Workflow } from './types';

interface WorkflowListProps {
  workflows: Workflow[];
  selectedWorkflow: Workflow | null;
  searchQuery: string;
  filterStatus: 'all' | 'active' | 'paused' | 'draft';
  onSearchChange: (query: string) => void;
  onFilterChange: (status: 'all' | 'active' | 'paused' | 'draft') => void;
  onSelectWorkflow: (workflow: Workflow) => void;
}

export function WorkflowList({
  workflows,
  selectedWorkflow,
  searchQuery,
  filterStatus,
  onSearchChange,
  onFilterChange,
  onSelectWorkflow
}: WorkflowListProps) {
  return (
    <Card className="bg-white/5 border-white/10 h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search workflows..."
              className="pl-10 bg-white/5 border-white/10 text-white"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={(v: any) => onFilterChange(v)}>
            <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="paused">Paused Only</SelectItem>
              <SelectItem value="draft">Drafts Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  selectedWorkflow?.id === workflow.id
                    ? 'bg-white/10 border-[#529ADB]'
                    : 'bg-white/5 border-white/10 hover:border-white/30'
                }`}
                onClick={() => onSelectWorkflow(workflow)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-white">{workflow.name}</h3>
                      <Badge
                        className="text-xs"
                        style={{
                          backgroundColor: `${getStatusColor(workflow.status)}20`,
                          color: getStatusColor(workflow.status),
                          borderColor: `${getStatusColor(workflow.status)}40`
                        }}
                      >
                        {workflow.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{workflow.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch checked={workflow.status === 'active'} />
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                  <div>
                    <p className="text-gray-400">Executions</p>
                    <p className="text-white">{workflow.runCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Success Rate</p>
                    <p className="text-white">{workflow.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Last Run</p>
                    <p className="text-white">{workflow.lastRun || 'Never'}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    <Badge variant="outline" className="text-xs bg-white/5 border-white/20 text-gray-400">
                      Created {workflow.createdAt}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-white/20 text-white h-7">
                      <Copy className="w-3 h-3 mr-1" />
                      Duplicate
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/20 text-white h-7">
                      <GitBranch className="w-3 h-3 mr-1" />
                      View Flow
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
