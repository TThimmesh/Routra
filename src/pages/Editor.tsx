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
import ColorPicker from "../components/ColorPicker";

const EditorInner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [colorPickerPos, setColorPickerPos] = useState<{ x: number; y: number } | null>(null);

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

  const handleDoubleClick: NodeMouseHandler = (event, node) => {
    event.preventDefault(); // prevent weird browser behavior sometimes

    setSelectedNodeId(null);
    setColorPickerPos(null);

    setTimeout(() => {
      setSelectedNodeId(node.id);
      setColorPickerPos({
        x: event.clientX,
        y: event.clientY + 10, // small offset so picker is BELOW mouse
      });
    }, 0);
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

  const handleAddNode = () => {
    const maxX = nodes.reduce((max, node) => (node.position.x > max ? node.position.x : max), 0);

    const newNode: Node = {
      id: `node-${nodes.length + 1}`,
      type: "default",
      data: { label: `New Phase ${nodes.length + 1}` },
      position: {
        x: maxX + 300,
        y: 200,
      },
      style: {
        background: "#ffffff",
        border: "2px solid #6366f1",
        borderRadius: 12,
        padding: 10,
        fontSize: "16px",
        fontFamily: "Bebas Neue, sans-serif",
        textAlign: "center",
        width: 180,
        height: 80,
      },
      draggable: true,
    };

    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div className="relative w-full h-screen bg-routraBg dark:bg-darkBg transition-all duration-500">

      {/* ➕ Add Phase Button */}
      <button
        onClick={handleAddNode}
        className="absolute top-4 left-4 z-50 px-4 py-2 bg-routraAccent hover:bg-routraAccentHover text-white font-bebas rounded-lg shadow-md transition-all"
      >
        + Add Phase
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={handleDoubleClick}
        fitView
        fitViewOptions={{ padding: 0.5 }}
        proOptions={{ hideAttribution: true }}
        snapToGrid
        snapGrid={[20, 20]}
        elementsSelectable
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#fecaca"
        />
        <Controls showInteractive={true} />
        <MiniMap
          nodeColor={(n) => (n.type === "input" ? "#f87171" : "#6366f1")}
          maskColor="rgba(0,0,0,0.15)"
          nodeStrokeWidth={3}
          zoomable
          pannable
        />

        {/* 🎨 Color Picker Floating */}
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
