import { usePanZoom } from "./usePanZoom";
import layoutTree from "./utils/layoutTree";

export function GraphView({ graph, registry }) {
  const { zoom, pan, handlers } = usePanZoom();

  layoutTree(graph);

  const nodesArray = Object.values(graph.nodes);

  return (
    <svg
      class="w-full h-full bg-white cursor-grab active:cursor-grabbing"
      viewBox="0 0 1200 800"
      {...handlers}
    >
      <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
        
        {/* Edges */}
        {graph.edges.map((edge, i) => {
          const source = graph.nodes[edge.source];
          const target = graph.nodes[edge.target];
          const EdgeComp = registry.getEdge(edge.type);

          return (
            <EdgeComp
              key={i}
              x1={source.x}
              y1={source.y + 25}
              x2={target.x}
              y2={target.y - 25}
            />
          );
        })}

        {/* Nodes */}
        {nodesArray.map(node => {
          const NodeComp = registry.getNode(node.type);

          return (
            <NodeComp
              key={node.id}
              x={node.x}
              y={node.y}
              {...node}
            />
          );
        })}
      </g>
    </svg>
  );
}