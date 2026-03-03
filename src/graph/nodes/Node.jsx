export function SimpleNode({ x, y, label, onMouseDown }) {
  return (
    <g onMouseDown={onMouseDown} style={{ cursor: "grab", userSelect: "none" }}>
      <circle cx={x} cy={y} r="4" fill="red" />

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
        text-anchor="middle"
        dominant-baseline="middle"
        fontSize="14"
        style={{ userSelect: "none", pointerEvents: "none" }}
      >
        {label}
      </text>
    </g>
  );
}