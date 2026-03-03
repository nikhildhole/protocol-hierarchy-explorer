import { useState, useRef } from "preact/hooks";

export function usePanZoom() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const isDragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  function onWheel(e) {
    e.preventDefault();

    const zoomSpeed = 0.001;
    const newZoom = Math.min(
      3,
      Math.max(0.3, zoom - e.deltaY * zoomSpeed)
    );

    setZoom(newZoom);
  }

  function onMouseDown(e) {
    isDragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
  }

  function onMouseMove(e) {
    if (!isDragging.current) return;

    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;

    setPan(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));

    last.current = { x: e.clientX, y: e.clientY };
  }

  function onMouseUp() {
    isDragging.current = false;
  }

  return {
    zoom,
    pan,
    handlers: {
      onWheel,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave: onMouseUp
    }
  };
}