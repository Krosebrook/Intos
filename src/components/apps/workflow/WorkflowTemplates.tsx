import { Card, CardHeader, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { WORKFLOW_TEMPLATES } from './constants';

export function WorkflowTemplates() {
  return (
    <Card className="bg-white/5 border-white/10 h-full">
      <CardHeader>
        <h3 className="text-white">Workflow Templates</h3>
        <p className="text-sm text-gray-400">Pre-built workflows to get started quickly</p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WORKFLOW_TEMPLATES.map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.id}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 transition-all cursor-pointer group"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                    style={{
                      backgroundColor: `${template.color}20`,
                      border: `2px solid ${template.color}40`
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: template.color }} />
                  </div>

                  <Badge className="mb-2 text-xs" variant="outline">
                    {template.category}
                  </Badge>

                  <h4 className="text-white mb-2">{template.name}</h4>
                  <p className="text-sm text-gray-400 mb-4">{template.description}</p>

                  <Button 
                    size="sm" 
                    className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      backgroundColor: template.color,
                      color: 'white'
                    }}
                  >
                    Use Template
                  </Button>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
