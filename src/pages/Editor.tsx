import React, { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  useEdgesState,
  useNodesState,
  BackgroundVariant
} from "reactflow";
import "reactflow/dist/style.css";
import { convertRoadmapJsonToFlow } from "../utils/convertRoadmapJsonToFlow";

const Editor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const location = useLocation();
  const roadmapFromAI = location.state?.roadmapData;
  const ideaText = location.state?.ideaText || "Startup Idea"; // fallback

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  useEffect(() => {
    if (roadmapFromAI) {
      const { nodes: loadedNodes, edges: loadedEdges } = convertRoadmapJsonToFlow(
        { roadmap: roadmapFromAI },
        ideaText
      );
      setNodes(loadedNodes);
      setEdges(loadedEdges);
    }
  }, [roadmapFromAI, ideaText]);

  return (
    <div className="w-full h-screen bg-routraBg dark:bg-darkBg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 0.5 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        <Controls showInteractive={false} />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default Editor;
