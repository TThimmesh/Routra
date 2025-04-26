import { Node, Edge } from "reactflow";

export function convertRoadmapJsonToFlow(
  aiRoadmapJson: any,
  ideaTitle: string = "Startup Idea"
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const baseX = 200;
  const baseY = 200;

  const phaseXSpacing = 400;
  const stepXSpacing = 200; // horizontal step distance
  const stepYSpacing = 140; // vertical step distance

  // Startup node
  nodes.push({
    id: "startup",
    type: "input",
    data: { label: ideaTitle },
    position: { x: baseX, y: baseY + 200 },
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
    const phaseX = baseX + (phaseIndex + 1) * phaseXSpacing;
    const phaseY = baseY;

    // Phase node
    nodes.push({
      id: phaseId,
      data: { label: phase.phase },
      position: { x: phaseX, y: phaseY },
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

    // Steps arranged in row under phase
    const stepY = phaseY + stepYSpacing;

    phase.steps?.forEach((step: any, stepIndex: number) => {
      const stepId = `${phaseId}-step-${stepIndex}`;

      // grid-style horizontal spread: center, left, right
      const offsetX = (stepIndex - Math.floor(phase.steps.length / 2)) * stepXSpacing;
      const stepX = phaseX + offsetX;

      nodes.push({
        id: stepId,
        data: { label: step.title },
        position: { x: stepX, y: stepY },
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

  return { nodes, edges };
}
