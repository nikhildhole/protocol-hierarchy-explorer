// app.jsx
import { graph, registry } from "./data/protocols";
import { GraphView } from "./graph/GraphView";

export function App() {
  return <GraphView graph={graph} registry={registry} />;
}