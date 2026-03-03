import { useEffect, useRef, useState, useMemo } from "preact/hooks";
import { usePanZoom } from "./usePanZoom";
import layoutTree from "./utils/layoutTree";

export function GraphView({ graph, registry }) {
  const { zoom, setZoom, pan, setPan, handlers } = usePanZoom();
  const init = useRef(false);
  const dragNodeId = useRef(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const [, forceRender] = useState({});

  useMemo(() => {
    layoutTree(graph);
  }, [graph]);

  const nodesArray = Object.values(graph.nodes);

  useEffect(() => {
    if (nodesArray.length > 0 && !init.current) {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        nodesArray.forEach(n => {
            if (n.x < minX) minX = n.x;
            if (n.x > maxX) maxX = n.x;
            if (n.y < minY) minY = n.y;
            if (n.y > maxY) maxY = n.y;
        });
        const graphWidth = maxX - minX + 300; 
        const graphHeight = maxY - minY + 300; 
        // 1200x800 is the svg viewBox setting in the render below
        const viewWidth = 1200;
        const viewHeight = 800;

        const zoomX = viewWidth / graphWidth;
        const zoomY = viewHeight / graphHeight;
        let finalZoom = Math.min(zoomX, zoomY, 1.2);
        
        finalZoom = Math.max(0.2, finalZoom);

        const graphCenterX = (minX + maxX) / 2;
        const graphCenterY = (minY + maxY) / 2;

        setZoom(finalZoom);
        setPan({
            x: (viewWidth / 2) - graphCenterX * finalZoom,
            y: (viewHeight / 2) - graphCenterY * finalZoom
        });
        init.current = true;
    }
  }, [nodesArray]);

  const onNodeMouseDown = (id, e) => {
    e.stopPropagation();
    dragNodeId.current = id;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const customHandlers = {
    ...handlers,
    onMouseMove: (e) => {
      if (dragNodeId.current) {
        const dx = (e.clientX - lastMousePos.current.x) / zoom;
        const dy = (e.clientY - lastMousePos.current.y) / zoom;
        
        graph.nodes[dragNodeId.current].x += dx;
        graph.nodes[dragNodeId.current].y += dy;
        
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        forceRender({});
      } else if (handlers.onMouseMove) {
        handlers.onMouseMove(e);
      }
    },
    onMouseUp: (e) => {
      if (dragNodeId.current) {
        dragNodeId.current = null;
      }
      if (handlers.onMouseUp) {
        handlers.onMouseUp(e);
      }
    },
    onMouseLeave: (e) => {
      if (dragNodeId.current) {
        dragNodeId.current = null;
      }
      if (handlers.onMouseLeave) {
        handlers.onMouseLeave(e);
      }
    }
  };

  return (
    <svg
      class="w-full h-full bg-white cursor-grab active:cursor-grabbing"
      viewBox="0 0 1200 800"
      {...customHandlers}
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
              onMouseDown={(e) => onNodeMouseDown(node.id, e)}
              {...node}
            />
          );
        })}
      </g>
    </svg>
  );
}