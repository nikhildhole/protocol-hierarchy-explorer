// usePan
import { useState, useRef } from "preact/hooks";

export function usePanZoom() {
  const pointers = useRef(new Map());
  const pinchStartDistance = useRef(null);
  const pinchStartZoom = useRef(1);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const isDragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  function onWheel(e) {
    e.preventDefault();

    const zoomSpeed = 0.003;
    const newZoom = Math.min(
      3,
      Math.max(0.3, zoom - e.deltaY * zoomSpeed)
    );

    const rect = e.currentTarget.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const worldX = (mouseX - pan.x) / zoom;
    const worldY = (mouseY - pan.y) / zoom;

    const newPanX = mouseX - worldX * newZoom;
    const newPanY = mouseY - worldY * newZoom;

    setZoom(newZoom);
    setPan({ x: newPanX, y: newPanY });
  }

  function onPointerDown(e) {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 1) {
      isDragging.current = true;
      last.current = { x: e.clientX, y: e.clientY };
    }

    if (pointers.current.size === 2) {
      const pts = [...pointers.current.values()];
      pinchStartDistance.current = Math.hypot(
        pts[0].x - pts[1].x,
        pts[0].y - pts[1].y
      );
      pinchStartZoom.current = zoom;
    }
  }

  function onPointerMove(e) {
    if (!pointers.current.has(e.pointerId)) return;

    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      const pts = [...pointers.current.values()];

      const dist = Math.hypot(
        pts[0].x - pts[1].x,
        pts[0].y - pts[1].y
      );

      const scale = dist / pinchStartDistance.current;
      const newZoom = Math.min(3, Math.max(0.3, pinchStartZoom.current * scale));

      const rect = e.currentTarget.getBoundingClientRect();

      const centerX = (pts[0].x + pts[1].x) / 2 - rect.left;
      const centerY = (pts[0].y + pts[1].y) / 2 - rect.top;

      const worldX = (centerX - pan.x) / zoom;
      const worldY = (centerY - pan.y) / zoom;

      const newPanX = centerX - worldX * newZoom;
      const newPanY = centerY - worldY * newZoom;

      setZoom(newZoom);
      setPan({ x: newPanX, y: newPanY });

      setZoom(newZoom);
      return;
    }

    if (!isDragging.current) return;

    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;

    setPan(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));

    last.current = { x: e.clientX, y: e.clientY };
  }

  function onPointerUp(e) {
    pointers.current.delete(e.pointerId);

    if (pointers.current.size < 2) {
      pinchStartDistance.current = null;
    }

    if (pointers.current.size === 0) {
      isDragging.current = false;
    }
  }

  return {
    zoom,
    setZoom,
    pan,
    setPan,
    handlers: {
      onWheel,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerLeave: onPointerUp
    }
  };
}