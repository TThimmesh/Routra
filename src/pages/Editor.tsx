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
  BackgroundVariant,
  NodeTypes,
  NodeMouseHandler,
  ConnectionLineType,
} from "reactflow";
import "reactflow/dist/style.css";
import { convertRoadmapJsonToFlow } from "../utils/convertRoadmapJsonToFlow";
import ColorPicker from "../components/ColorPicker";
import CustomEditableNode from "../components/CustomEditableNode";
import { useReactFlow } from "reactflow";

const nodeTypes: NodeTypes = {
  editableNode: CustomEditableNode,
};

const EditorInner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [colorPickerPos, setColorPickerPos] = useState<{ x: number; y: number } | null>(null);
  const [colorMode, setColorMode] = useState(false);

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
      setNodes(
        loadedNodes.map((node) => ({
          ...node,
          type: "editableNode",
        }))
      );
      setEdges(loadedEdges);

      setTimeout(() => {
        fitView({ padding: 0.3, duration: 800 });
      }, 300);
    }
  }, [roadmapFromAI, ideaText, fitView]);

  // ✅ Toggle color mode on pressing 'C'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'c') {
        setColorMode(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNodeClick: NodeMouseHandler = (event, node) => {
    event.preventDefault();

    if (colorMode) {
      setSelectedNodeId(node.id);
      setColorPickerPos({
        x: event.clientX,
        y: event.clientY + 10,
      });
    }
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
                border: `2px solid ${color}`,
              },
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
      type: "editableNode",
      data: { label: `New Phase ${nodes.length + 1}` },
      position: { x: maxX + 300, y: 200 },
      style: {
        background: "#ffffff",
        border: "2px solid #6366f1",
        borderRadius: 12,
        padding: 10,
        fontSize: "16px",
        fontFamily: "Bebas Neue, sans-serif",
        textAlign: "center",
        width: 180,
        height: 100,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Floating Add Node Button */}
      <button
        onClick={handleAddNode}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 10,
          width: 48,
          height: 48,
          borderRadius: "50%",
          backgroundColor: "#6366f1",
          color: "white",
          fontSize: "32px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "2px",
          lineHeight: 0.9,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1.0)"}
      >
        +
      </button>

      {/* Color Mode Badge */}
      {colorMode && (
        <div style={{
          position: 'absolute',
          top: 70,
          left: 10,
          backgroundColor: '#6366f1',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 10,
        }}>
          🎨 Color Mode Active
        </div>
      )}

      {/* ReactFlow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        connectionLineType={ConnectionLineType.Bezier}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>

      {/* Color Picker */}
      {colorPickerPos && selectedNodeId && (
        <ColorPicker
          position={colorPickerPos}
          onSelect={handleColorSelect}
          onClose={() => {
            setSelectedNodeId(null);
            setColorPickerPos(null);
          }}
        />
      )}
    </div>
  );
};

const Editor = () => (
  <ReactFlowProvider>
    <EditorInner />
  </ReactFlowProvider>
);

export default Editor;
