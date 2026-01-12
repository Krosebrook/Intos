import { DataFlowLink } from '../../lib/integration-types';

interface DataFlowDiagramProps {
  links: DataFlowLink[];
}

export function DataFlowDiagram({ links }: DataFlowDiagramProps) {
  // Simple grouping by source/target to determine columns
  // In a real app we'd use D3-sankey
  
  // Hardcoded positions for the demo visualization
  const nodes = [
    { id: 'HubSpot', x: 50, y: 50, type: 'source' },
    { id: 'Freshdesk', x: 50, y: 150, type: 'source' },
    { id: 'Teams', x: 50, y: 250, type: 'source' },
    { id: 'Google Calendar', x: 50, y: 350, type: 'source' },
    
    { id: 'ConnectDesk', x: 300, y: 50, type: 'app' },
    { id: 'ResolveDesk', x: 300, y: 150, type: 'app' },
    { id: 'SyncBotPanel', x: 300, y: 250, type: 'app' },
    { id: 'CalendarSync', x: 300, y: 350, type: 'app' },
    
    { id: 'InsightHub', x: 550, y: 100, type: 'hub' },
  ];

  const getNode = (id: string) => nodes.find(n => n.id === id);

  return (
    <div className="w-full overflow-x-auto p-8 bg-[#0F213C]/50 rounded-lg border border-white/10">
      <svg width="800" height="450" className="mx-auto">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#33475B" />
          </marker>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E27305" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#46A57B" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Links */}
        {links.map((link, i) => {
          const source = getNode(link.source);
          const target = getNode(link.target);
          if (!source || !target) return null;

          const strokeColor = link.status === 'error' ? '#EF4444' : 
                            link.status === 'disabled' ? '#4B5563' : 
                            'url(#flowGradient)';
          
          return (
            <g key={i}>
              <path
                d={`M ${source.x + 100} ${source.y + 25} C ${source.x + 200} ${source.y + 25}, ${target.x - 100} ${target.y + 25}, ${target.x} ${target.y + 25}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth={Math.max(2, Math.min(10, link.value / 100))}
                strokeOpacity={0.6}
                markerEnd="url(#arrowhead)"
              />
              <text x={(source.x + target.x) / 2} y={(source.y + target.y) / 2 - 10} textAnchor="middle" fill="#A8B2C1" fontSize="10">
                {link.value > 0 ? `${link.value} items` : ''}
              </text>
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
            <rect
              width="140"
              height="50"
              rx="8"
              fill={node.type === 'hub' ? '#33475B' : '#1E293B'}
              stroke={node.type === 'hub' ? '#46A57B' : '#E27305'}
              strokeWidth="1"
              fillOpacity="0.8"
            />
            <text
              x="70"
              y="30"
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="500"
            >
              {node.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
