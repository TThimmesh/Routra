// utils/layoutWithDagre.ts
import dagre from "@dagrejs/dagre";
import { Node, Edge, Position } from "reactflow";

// Define a consistent size for all nodes
const nodeWidth = 200;
const nodeHeight = 80;

/**
 * Auto-layout the nodes and edges using Dagre for clean flow.
 *
 * @param nodes List of React Flow nodes
 * @param edges List of React Flow edges
 * @param direction Flow direction: "LR" (left-right) or "TB" (top-bottom)
 * @returns { nodes, edges } Updated nodes and edges with layout applied
 */
export const layoutWithDagre = (
  nodes: Node[],
  edges: Edge[],
  direction: "LR" | "TB" = "LR"
): { nodes: Node[]; edges: Edge[] } => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Layout configuration
  dagreGraph.setGraph({
    rankdir: direction, // "LR" = Left-to-Right, "TB" = Top-to-Bottom
    ranksep: 120,        // space between different phases
    nodesep: 80,         // space between sibling steps
    marginx: 40,         // graph left/right margin
    marginy: 40,         // graph top/bottom margin
  });

  // Add all nodes to Dagre
  nodes.forEach((node) => {
    const width = (node.style?.width as number) || nodeWidth;
    const height = (node.style?.height as number) || nodeHeight;
    dagreGraph.setNode(node.id, { width, height });
  });

  // Add all edges to Dagre
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Run Dagre layout calculation
  dagre.layout(dagreGraph);

  // Update node positions based on Dagre output
  const laidOutNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const width = (node.style?.width as number) || nodeWidth;
    const height = (node.style?.height as number) || nodeHeight;

    return {
      ...node,
      position: {
        x: nodeWithPosition.x - width / 2,   // Center horizontally
        y: nodeWithPosition.y - height / 2,  // Center vertically
      },
      sourcePosition: direction === "LR" ? Position.Right : Position.Bottom,
      targetPosition: direction === "LR" ? Position.Left : Position.Top,
    };
  });

  return { nodes: laidOutNodes, edges };
};
