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
      onClick={(e) => {
        e.stopPropagation();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setEditing(true);
      }}
      style={{
        padding: 10,
        cursor: "pointer",
        textAlign: "center",
        fontFamily: "Bebas Neue, sans-serif",
        fontSize: "16px",
        borderRadius: 12,
        minWidth: 150,
        maxWidth: 300,
        background: data.background || "#ffffff",  // always white node background
        border: "2px solid #6366f1",
        color: "#111111", // always black text
        wordWrap: "break-word",
        overflowWrap: "break-word",
        whiteSpace: "pre-wrap",
        position: "relative",
      }}
    >
      {/* Target handle (incoming connections) */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555", width: 10, height: 10 }}
        id="target"
      />

      {/* Editable text or textarea */}
      {editing ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          rows={1}
          style={{
            width: "100%",
            fontSize: "16px",
            textAlign: "center",
            resize: "none",
            overflow: "hidden",
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#111111", // always black text in edit mode too
            whiteSpace: "pre-wrap",
          }}
        />
      ) : (
        <div>{value}</div>
      )}

      {/* Source handle (outgoing connections) */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555", width: 10, height: 10 }}
        id="source"
      />
    </div>
  );
}
