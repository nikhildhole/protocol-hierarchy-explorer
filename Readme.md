# Protocol Hierarchy

A lightweight, extensible graph visualization system built with **Preact + SVG**.

Designed specifically for rendering **strict tree hierarchies** such as protocol stacks:

```
IP
├── TCP
│   ├── HTTP
│   └── TLS
└── UDP
```

This library provides:

* Tree layout engine
* SVG rendering
* Pan & zoom interaction
* Node/Edge registry system
* Extensible architecture

---

# ✨ Features

* Strict tree hierarchy layout
* Auto-centering on initial load
* Smooth zoom (mouse wheel)
* Drag to pan
* Registry-based node and edge types
* Clean separation of concerns
* Easily extensible

---

# 🧠 Architecture Overview

The system is separated into four independent layers:

### 1. GraphStore (Data Layer)

Responsible only for storing:

* Nodes
* Edges
* Node metadata

No UI knowledge.

---

### 2. Registry (Component Layer)

Maps types to components:

```js
registry.registerNode("protocol", ProtocolNode);
registry.registerNode("current", CurrentNode);
registry.registerEdge("line", SimpleEdge);
```

Allows dynamic extension without modifying existing state.

---

### 3. Layout Engine

`layoutTree(graph)`

* Detects root node
* Builds parent → children map
* Positions leaves evenly
* Centers parents between children

Strict tree only (no cycles supported).

---

### 4. Renderer (GraphView)

* Renders SVG
* Applies pan + zoom transform
* Renders edges first
* Renders nodes second

---

# 🎮 Interaction

### Zoom

* Mouse wheel
* Range: 0.3x – 3x

### Pan

* Click + drag
* Cursor changes automatically

---

# 🧩 Node Types

Currently implemented:

| Type     | Description             |
| -------- | ----------------------- |
| protocol | Default protocol node   |
| current  | Highlighted active node |

Future enhancements may include:

* Collapsible nodes
* Metadata nodes
* Icon-based nodes
* Interactive nodes

---

# 🔗 Edge Types

Currently implemented:

| Type | Description       |
| ---- | ----------------- |
| line | Straight SVG line |

Future possibilities:

* Curved edges
* Orthogonal edges
* Directed edges
* Animated edges

---

# ⚠️ Limitations

* Only supports strict tree (no cycles)
* Layout recalculates on mount only
* No node dragging (yet)
* No animation (yet)

---

# 🔮 Planned Enhancements

* Zoom-to-cursor
* Expand / collapse branches
* Click to set current node
* Highlight path to root
* Animated layout transitions
* Bounds-based centering
* Performance optimizations

---

# 🏗 Design Principles

* Layout and rendering are separated
* State is independent of components
* Registry allows runtime extension
* No external graph libraries used
* SVG-based for clarity and scalability

---

# 📜 License

Internal project / experimental library.

---

# 🎯 Purpose

This project serves as:

* A protocol hierarchy visualizer
* A learning exercise in graph engine design

---

Built with Preact + SVG.
Designed for clarity, extensibility, and control.
