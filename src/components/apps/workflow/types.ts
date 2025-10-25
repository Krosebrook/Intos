// Workflow Engine Types

export type NodeType = 'trigger' | 'condition' | 'action' | 'delay';

export interface WorkflowNode {
  id: string;
  type: NodeType;
  config: {
    title: string;
    description?: string;
    icon?: string;
    color?: string;
    settings?: Record<string, any>;
  };
  children?: WorkflowNode[];
  position?: { x: number; y: number };
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'draft';
  trigger: WorkflowNode;
  createdAt: string;
  lastRun?: string;
  runCount: number;
  successRate: number;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  color: string;
}

export interface TriggerDefinition {
  id: string;
  name: string;
  icon: any;
  source: string;
  color: string;
}

export interface ActionDefinition {
  id: string;
  name: string;
  icon: any;
  target: string;
  color: string;
}

export interface ExecutionLog {
  workflow: string;
  status: 'success' | 'failed' | 'in-progress';
  time: string;
  duration: string;
}
