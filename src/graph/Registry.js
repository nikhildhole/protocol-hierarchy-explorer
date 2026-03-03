export class Registry {
  constructor() {
    this.nodeTypes = {};
    this.edgeTypes = {};
  }

  registerNode(type, component) {
    this.nodeTypes[type] = component;
  }

  registerEdge(type, component) {
    this.edgeTypes[type] = component;
  }

  getNode(type) {
    return this.nodeTypes[type];
  }

  getEdge(type) {
    return this.edgeTypes[type];
  }
}