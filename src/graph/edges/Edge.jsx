export function SimpleEdge({ x1, y1, x2, y2 }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#999"
      strokeWidth="2"
    />
  );
}