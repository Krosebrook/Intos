import { Card, CardHeader, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { ScrollArea } from '../../ui/scroll-area';
import { Play, Save, GitBranch } from 'lucide-react';
import { WorkflowNode } from './WorkflowNode';
import { ComponentPalette } from './ComponentPalette';
import type { Workflow } from './types';

interface WorkflowBuilderProps {
  selectedWorkflow: Workflow | null;
}

export function WorkflowBuilder({ selectedWorkflow }: WorkflowBuilderProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
      {/* Component Palette */}
      <div className="lg:col-span-1">
        <ComponentPalette />
      </div>

      {/* Canvas */}
      <Card className="bg-white/5 border-white/10 lg:col-span-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white mb-1">Workflow Canvas</h3>
              <p className="text-sm text-gray-400">
                {selectedWorkflow ? `Editing: ${selectedWorkflow.name}` : 'Drag components to build your workflow'}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-white/20">
                <Play className="w-4 h-4 mr-2" />
                Test Run
              </Button>
              <Button size="sm" className="bg-[#46A57B] hover:bg-[#58B68D] text-white">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[600px]">
            {selectedWorkflow ? (
              <div className="p-4">
                <WorkflowNode node={selectedWorkflow.trigger} />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <GitBranch className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="mb-2">Drag a trigger to start building</p>
                  <p className="text-sm">Or select a workflow from the list</p>
                </div>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
