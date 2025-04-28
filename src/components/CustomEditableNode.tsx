// src/components/CustomEditableNode.tsx
import { Handle, Position, NodeProps, useReactFlow } from 'reactflow';
import { useState } from 'react';

export default function CustomEditableNode({ data, id }: NodeProps) {
  const { setNodes } = useReactFlow();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(data.label);

  const handleBlur = () => {
    setEditing(false);
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label: value } } : node
      )
    );
  };

  return (
    <div
      onDoubleClick={() => setEditing(true)}
      style={{
        padding: 10,
        cursor: "pointer",
        textAlign: "center",
        fontFamily: "Bebas Neue, sans-serif",
        fontSize: "16px",
        borderRadius: 12,
        minWidth: 150,
        background: data.background || "#ffffff",
        border: "2px solid #6366f1",
        position: "relative",
      }}
    >
      {/* Target handle (where connections come into this node) */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555", width: 10, height: 10 }}
        id="target"
      />
      
      {/* Editable label or input */}
      {editing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{ width: "90%", fontSize: "16px", textAlign: "center" }}
        />
      ) : (
        <div>{value}</div>
      )}

      {/* Source handle (where connections start from this node) */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555", width: 10, height: 10 }}
        id="source"
      />
    </div>
  );
}
