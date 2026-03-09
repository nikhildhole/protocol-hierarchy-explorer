import { useState, useRef, useEffect } from "react";

export function SimpleNode({ x, y, label, info = "abcd", onPointerDown }) {
  const nodeRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      return
    }

    window.addEventListener("pointerdown", handleClickOutside);
    return () => {
      window.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);


  return (
    <g
      ref={nodeRef}
      onPointerDown={(e) => {
        e.stopPropagation(); // prevent outside handler
        onPointerDown?.(e);
      }}
      style={{ cursor: "grab", userSelect: "none" }}
    >
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
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
        style={{ userSelect: "none", pointerEvents: "none" }}
      >
        {String(label).split(" - ")[0]}
      </text>
    </g>
  );
}