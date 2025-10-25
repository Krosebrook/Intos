import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Settings, Copy, Trash2, MoreVertical } from 'lucide-react';
import { getIconComponent } from './utils';
import type { WorkflowNode as WorkflowNodeType } from './types';

interface WorkflowNodeProps {
  node: WorkflowNodeType;
  depth?: number;
}

export function WorkflowNode({ node, depth = 0 }: WorkflowNodeProps) {
  const Icon = getIconComponent(node.config.icon || 'Activity');
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="relative">
      {/* Node Card */}
      <div 
        className="p-4 rounded-lg border-2 transition-all hover:shadow-lg cursor-pointer"
        style={{
          backgroundColor: `${node.config.color}10`,
          borderColor: `${node.config.color}60`
        }}
      >
        <div className="flex items-start gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ 
              backgroundColor: `${node.config.color}20`,
              border: `2px solid ${node.config.color}`
            }}
          >
            <Icon className="w-5 h-5" style={{ color: node.config.color }} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <Badge 
                className="text-xs"
                style={{
                  backgroundColor: `${node.config.color}20`,
                  color: node.config.color,
                  borderColor: `${node.config.color}40`
                }}
              >
                {node.type}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
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
            </div>
            
            <h4 className="text-white mb-1">{node.config.title}</h4>
            
            {node.config.description && (
              <p className="text-xs text-gray-400 mb-2">{node.config.description}</p>
            )}
            
            {node.config.settings && (
              <div className="flex flex-wrap gap-1 mt-2">
                {Object.entries(node.config.settings).slice(0, 3).map(([key, value]) => (
                  <Badge key={key} variant="outline" className="text-xs bg-white/5 border-white/20 text-gray-400">
                    {key}: {String(value)}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Connection Line & Children */}
      {hasChildren && (
        <div className="ml-8 mt-4 border-l-2 border-white/20 pl-4 space-y-4">
          {node.children!.map((child) => (
            <div key={child.id} className="relative">
              {/* Horizontal connector */}
              <div className="absolute left-0 top-6 w-4 h-0.5 bg-white/20" />
              <WorkflowNode node={child} depth={depth + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
