import { useState } from 'react';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Plus, Download, Sparkles } from 'lucide-react';
import { WorkflowStats } from './workflow/WorkflowStats';
import { WorkflowList } from './workflow/WorkflowList';
import { WorkflowBuilder } from './workflow/WorkflowBuilder';
import { WorkflowTemplates } from './workflow/WorkflowTemplates';
import { ExecutionHistory } from './workflow/ExecutionHistory';
import { MOCK_WORKFLOWS } from './workflow/constants';
import type { Workflow } from './workflow/types';

export function WorkflowEngine() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'builder' | 'templates' | 'history'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paused' | 'draft'>('all');

  const filteredWorkflows = MOCK_WORKFLOWS.filter(wf => {
    const matchesSearch = wf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         wf.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || wf.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-full flex flex-col p-6 gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">Workflow Engine</h1>
          <p className="text-gray-400">Visual automation builder - no code required</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-white/20 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-[#E27305] hover:bg-[#F08515] text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Workflow
          </Button>
        </div>
      </div>

      {/* AI Assistant */}
      <Alert className="border-[#529ADB] bg-[#529ADB]/10">
        <Sparkles className="w-4 h-4 text-[#529ADB]" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-sm text-gray-300">
            <strong className="text-white">AI Workflow Builder:</strong> Describe your automation in plain English. 
            Try: "When a customer mentions 'refund' in email, assign to finance and schedule a call within 24 hours"
          </span>
          <Button size="sm" variant="outline" className="border-[#529ADB] text-[#529ADB] hover:bg-[#529ADB]/10">
            Try AI Builder
          </Button>
        </AlertDescription>
      </Alert>

      {/* Stats */}
      <WorkflowStats />

      {/* Main Content */}
      <Tabs 
        value={viewMode} 
        onValueChange={(v: any) => setViewMode(v)} 
        className="flex-1 flex flex-col min-h-0"
      >
        <TabsList className="bg-white/5 w-full justify-start">
          <TabsTrigger value="list">My Workflows</TabsTrigger>
          <TabsTrigger value="builder">Workflow Builder</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">Execution History</TabsTrigger>
        </TabsList>

        {/* Workflows List */}
        <TabsContent value="list" className="flex-1 min-h-0 mt-6">
          <WorkflowList
            workflows={filteredWorkflows}
            selectedWorkflow={selectedWorkflow}
            searchQuery={searchQuery}
            filterStatus={filterStatus}
            onSearchChange={setSearchQuery}
            onFilterChange={setFilterStatus}
            onSelectWorkflow={setSelectedWorkflow}
          />
        </TabsContent>

        {/* Workflow Builder */}
        <TabsContent value="builder" className="flex-1 min-h-0 mt-6">
          <WorkflowBuilder selectedWorkflow={selectedWorkflow} />
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates" className="flex-1 min-h-0 mt-6">
          <WorkflowTemplates />
        </TabsContent>

        {/* Execution History */}
        <TabsContent value="history" className="flex-1 min-h-0 mt-6">
          <ExecutionHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
