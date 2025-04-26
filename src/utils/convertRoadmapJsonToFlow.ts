import { Node, Edge } from "reactflow";
import { layoutWithDagre } from "../utils/layoutWithDagre";

export function convertRoadmapJsonToFlow(
  aiRoadmapJson: any,
  ideaTitle: string = "Startup Idea"
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Startup node (always first)
  nodes.push({
    id: "startup",
    type: "input",
    data: { label: ideaTitle },
    position: { x: 0, y: 0 },
    draggable: false,
    style: {
      background: "#6366f1",
      color: "#fff",
      fontFamily: "Bebas Neue, sans-serif",
      fontSize: "20px",
      padding: 10,
      borderRadius: 12,
      width: 200,
      textAlign: "center",
    },
  });

  let previousPhaseId = "startup";

  aiRoadmapJson.roadmap.forEach((phase: any, phaseIndex: number) => {
    const phaseId = `phase-${phaseIndex}`;

    // Phase node
    nodes.push({
      id: phaseId,
      data: { label: phase.phase },
      position: { x: 0, y: 0 }, // will be replaced by dagre layout
      style: {
        background: "#f1f5f9",
        border: "2px solid #6366f1",
        fontFamily: "Bebas Neue, sans-serif",
        padding: 10,
        borderRadius: 12,
        width: 200,
        textAlign: "center",
      },
    });

    edges.push({
      id: `e-${previousPhaseId}-${phaseId}`,
      source: previousPhaseId,
      target: phaseId,
      type: "smoothstep",
    });

    previousPhaseId = phaseId;

    // Step nodes
    phase.steps?.forEach((step: any, stepIndex: number) => {
      const stepId = `${phaseId}-step-${stepIndex}`;

      nodes.push({
        id: stepId,
        data: { label: step.title },
        position: { x: 0, y: 0 }, // will be updated by layout
        style: {
          background: "#ffffff",
          border: "1px solid #6366f1",
          fontFamily: "Bebas Neue, sans-serif",
          padding: 8,
          borderRadius: 10,
          width: 180,
          textAlign: "center",
        },
      });

      edges.push({
        id: `e-${phaseId}-${stepId}`,
        source: phaseId,
        target: stepId,
        type: "smoothstep",
      });
    });
  });

  return layoutWithDagre(nodes, edges, "LR"); // Apply dagre layout, Left-to-Right
}
