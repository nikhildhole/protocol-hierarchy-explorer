export class GraphStore {
  constructor() {
    this.nodes = {};
    this.edges = [];
  }

  addNode(id, config) {
    this.nodes[id] = {
      id,
      x: 0,
      y: 0,
      ...config
    };
  }

  addEdge(edge) {
    this.edges.push(edge);
  }

  getNodes() {
    return this.nodes;
  }

  getEdges() {
    return this.edges;
  }
}