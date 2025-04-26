import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

// -------------------------
// Initial Nodes and Edges
// -------------------------

const initialNodes: Node[] = [
  {
    id: "startup",
    type: "input",
    data: { label: "Startup Idea" },
    position: { x: 0, y: 300 },
    draggable: false,
    style: {
      background: "#6366f1",
      color: "#fff",
      fontFamily: "Bebas Neue, sans-serif",
      fontSize: "20px",
      padding: 10,
      borderRadius: 12,
      width: 180,
      textAlign: "center",
    },
  },
  {
    id: "phase-1",
    data: { label: "Phase 1: Research" },
    position: { x: 300, y: 250 },
    style: {
      background: "#f1f5f9",
      border: "2px solid #6366f1",
      fontFamily: "Bebas Neue, sans-serif",
      padding: 10,
      borderRadius: 12,
      width: 180,
      textAlign: "center",
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e-startup-phase-1", source: "startup", target: "phase-1", type: "smoothstep", animated: true },
];

// -------------------------
// Editor Component
// -------------------------

const Editor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null); // ✅ Selected Node for deletion

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const addPhase = () => {
    const phaseId = `phase-${nodes.length + 1}`;
    const newPhase: Node = {
      id: phaseId,
      data: { label: `New Phase` },
      position: { x: 300 + nodes.length * 220, y: 300 },
      style: {
        background: "#f1f5f9",
        border: "2px solid #6366f1",
        fontFamily: "Bebas Neue, sans-serif",
        padding: 10,
        borderRadius: 12,
        width: 180,
        textAlign: "center",
      },
    };

    setNodes((nds) => nds.concat(newPhase));
  };

  const addStep = (parentId: string) => {
    const stepId = `step-${nodes.length + 1}`;
    const parent = nodes.find((n) => n.id === parentId);
    if (!parent) return;

    const newStep: Node = {
      id: stepId,
      data: { label: `New Step` },
      position: { x: parent.position.x + 300, y: parent.position.y + Math.random() * 100 - 50 },
      style: {
        background: "#ffffff",
        border: "1px solid #6366f1",
        fontFamily: "Bebas Neue, sans-serif",
        padding: 8,
        borderRadius: 10,
        width: 160,
        textAlign: "center",
      },
    };

    setNodes((nds) => nds.concat(newStep));
    setEdges((eds) =>
      eds.concat({
        id: `e-${parentId}-${stepId}`,
        source: parentId,
        target: stepId,
        type: "smoothstep",
      })
    );
  };

  const handleNodeClick = (_event: any, node: Node) => {
    setEditingNodeId(node.id);
    setNewLabel(node.data.label);
    setSelectedNodeId(node.id);
  };

  const saveNodeLabel = () => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === editingNodeId
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node
      )
    );
    setEditingNodeId(null);
  };

  const deleteNode = () => {
    if (!selectedNodeId) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
    setEdges((eds) => eds.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId));
    setSelectedNodeId(null);
  };

  return (
    <div className="w-full h-screen bg-routraBg dark:bg-darkBg">
      {/* ➕ Add Phase button top left */}
      <div className="absolute top-6 left-6 z-20 flex flex-col space-y-4">
        <button
          onClick={addPhase}
          className="px-6 py-3 bg-routraAccent hover:bg-routraAccentHover text-white font-bebas tracking-wide rounded-lg shadow-md hover:shadow-lg transition-all text-lg"
        >
          ➕ Add Phase
        </button>

        {/* 🗑️ Delete Node button when a node is selected */}
        {selectedNodeId && (
          <button
            onClick={deleteNode}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bebas tracking-wide rounded-lg shadow-md hover:shadow-lg transition-all text-lg"
          >
            🗑️ Delete Node
          </button>
        )}
      </div>

      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            label:
              editingNodeId === node.id ? (
                <input
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  onBlur={saveNodeLabel}
                  onKeyDown={(e) => e.key === "Enter" && saveNodeLabel()}
                  autoFocus
                  className="text-black p-1 rounded-md border border-gray-400 w-full"
                />
              ) : (
                <div onClick={(e) => handleNodeClick(e, node)}>
                  {node.data.label}
                  {/* ➕ Add Step button only for Phases */}
                  {node.id.startsWith("phase-") && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addStep(node.id);
                      }}
                      className="block mx-auto mt-2 bg-routraAccent text-white text-xs px-2 py-1 rounded-full hover:bg-routraAccentHover transition-all"
                    >
                      + Add Step
                    </button>
                  )}
                </div>
              ),
          },
        }))}
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
