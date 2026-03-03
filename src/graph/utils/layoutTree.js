// layoutTree.js
function buildTree(graph) {
  const childrenMap = {};
  const hasParent = new Set();

  graph.edges.forEach(edge => {
    if (!childrenMap[edge.source]) {
      childrenMap[edge.source] = [];
    }
    childrenMap[edge.source].push(edge.target);
    hasParent.add(edge.target);
  });

  // Root = node that has no parent
  const rootId = Object.keys(graph.nodes).find(
    id => !hasParent.has(id)
  );

  return { rootId, childrenMap };
}

export default function layoutTree(graph) {
  const { rootId, childrenMap } = buildTree(graph);

  const levelHeight = 150;
  const siblingSpacing = 180;

  let leafIndex = 0;

  function dfs(nodeId, depth = 0) {
    const children = childrenMap[nodeId] || [];

    if (children.length === 0) {
      // Leaf node
      graph.nodes[nodeId].x = leafIndex * siblingSpacing;
      graph.nodes[nodeId].y = depth * levelHeight;
      leafIndex++;
    } else {
      children.forEach(child => dfs(child, depth + 1));

      // Center parent between children
      const first = graph.nodes[children[0]];
      const last = graph.nodes[children[children.length - 1]];

      graph.nodes[nodeId].x = (first.x + last.x) / 2;
      graph.nodes[nodeId].y = depth * levelHeight;
    }
  }

  if (rootId) dfs(rootId);
}