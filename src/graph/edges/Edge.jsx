export function SimpleEdge({ x1, y1, x2, y2 }) {
  return (
    <svg style={{ overflow: "visible" }}>
      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          refX="10"
          refY="5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L10,5 L0,10 Z" fill="#999" />
        </marker>
      </defs>

      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#999"
        strokeWidth="2"
        markerEnd="url(#arrow)"
      />
    </svg>
  );
}