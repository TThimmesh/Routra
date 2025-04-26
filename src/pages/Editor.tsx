import React, { useCallback, useEffect, useState } from "react";
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
  ReactFlowProvider,
  useReactFlow,
  BackgroundVariant,
  NodeMouseHandler
} from "reactflow";
import "reactflow/dist/style.css";
import { convertRoadmapJsonToFlow } from "../utils/convertRoadmapJsonToFlow";
import ColorPicker from "../components/ColorPicker"; // ✅ new import

const EditorInner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null); // ✅ which node editing
  const [colorPickerPos, setColorPickerPos] = useState<{ x: number; y: number } | null>(null); // ✅ color picker location
  const location = useLocation();
  const { fitView } = useReactFlow();

  const roadmapFromAI = location.state?.roadmapData;
  const ideaText = location.state?.ideaText || "Startup Idea";

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

      setTimeout(() => {
        fitView({ padding: 0.3, duration: 800 });
      }, 300);
    }
  }, [roadmapFromAI, ideaText, fitView]);

  const handleDoubleClick: NodeMouseHandler = (_, node) => {
    setSelectedNodeId(node.id);
    setColorPickerPos({ x: node.position.x + 250, y: node.position.y });
  };

  const handleColorSelect = (color: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId
          ? {
              ...node,
              style: {
                ...node.style,
                background: color,
                border: `2px solid ${color}`
              }
            }
          : node
      )
    );
    setSelectedNodeId(null);
    setColorPickerPos(null);
  };

  return (
    <div className="w-full h-screen bg-routraBg dark:bg-darkBg transition-all duration-500">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={handleDoubleClick} // ✅ double-click support
        fitView
        fitViewOptions={{ padding: 0.5 }}
        proOptions={{ hideAttribution: true }}
        snapToGrid
        snapGrid={[20, 20]}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#fecaca"
        />
        <Controls showInteractive={true} />
        <MiniMap
          nodeColor={(n) =>
            n.type === "input" ? "#f87171" : "#fecaca"
          }
          maskColor="rgba(0,0,0,0.15)"
          nodeStrokeWidth={3}
          zoomable
          pannable
        />

        {/* Color Picker floating on screen */}
        {colorPickerPos && (
          <div
            className="absolute z-50"
            style={{ left: colorPickerPos.x, top: colorPickerPos.y }}
          >
            <ColorPicker onSelectColor={handleColorSelect} />
          </div>
        )}
      </ReactFlow>
    </div>
  );
};

const Editor = () => (
  <ReactFlowProvider>
    <EditorInner />
  </ReactFlowProvider>
);

export default Editor;
