export function SimpleNode({ x, y, label }) {
  return (
    <>
      <rect
        x={x - 50}
        y={y - 25}
        width="100"
        height="50"
        rx="8"
        fill="#e3f2fd"
        stroke="#1976d2"
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
      >
        {label}
      </text>
    </>
  );
}