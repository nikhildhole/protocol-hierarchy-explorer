// GraphView.jsx
import { useEffect, useRef, useState, useMemo } from "preact/hooks";
import { usePanZoom } from "./usePanZoom";
import layoutTree from "./utils/layoutTree";
import features from "./data/features";

export function GraphView({ graph, registry }) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const { zoom, setZoom, pan, setPan, handlers } = usePanZoom();
  const init = useRef(false);
  const dragNodeId = useRef(null);
  const lastPointerPos = useRef({ x: 0, y: 0 });
  const [, forceRender] = useState({});
  let [currentInfoNodeId, setcurrentInfoNodeId] = useState(null);

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

      const graphWidth = maxX - minX + 150;
      const graphHeight = maxY - minY + 100;

      const viewWidth = width;
      const viewHeight = height;

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

  const onNodePointerDown = (id, e) => {

    setcurrentInfoNodeId(id);
    if (features.dragableElement) {
      e.stopPropagation();
      dragNodeId.current = id;
      lastPointerPos.current = { x: e.clientX, y: e.clientY };
    }
    return
  };

  const customHandlers = {
    ...handlers,
    onPointerMove: (e) => {
      if (dragNodeId.current) {
        const dx = (e.clientX - lastPointerPos.current.x) / zoom;
        const dy = (e.clientY - lastPointerPos.current.y) / zoom;

        graph.nodes[dragNodeId.current].x += dx;
        graph.nodes[dragNodeId.current].y += dy;

        lastPointerPos.current = { x: e.clientX, y: e.clientY };
        forceRender({});
      } else if (handlers.onPointerMove) {
        handlers.onPointerMove(e);
      }
    },
    onPointerUp: (e) => {
      dragNodeId.current = null;
      handlers.onPointerUp?.(e);
    },
    onPointerLeave: (e) => {
      dragNodeId.current = null;
      handlers.onPointerLeave?.(e);
    },
  };

  return (
    <>
      <div className="relative w-full h-full">
        <div className="w-full h-full">
          <svg
            className="w-full h-full bg-white cursor-grab active:cursor-grabbing"
            style={{ touchAction: "none" }}
            viewBox={`0 0 ${width} ${height}`}
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
                    onPointerDown={(e) => onNodePointerDown(node.id, e)}
                    {...node}
                  />
                );
              })}
            </g>
          </svg>
        </div>
        {
          currentInfoNodeId && (
            <div className="w-full h-full md:w-1/3 md:h-full absolute top-0 md:right-0 bg-black/40 text-white backdrop-blur-sm z-10 wrap overflow-auto">
              {graph.nodes[currentInfoNodeId].description({ onClose: () => setcurrentInfoNodeId(null) }) || "No description available"}
            </div>
          )
        }
      </div>
    </>
  );
}