// components/ColorPicker.tsx
import React from "react";

type ColorPickerProps = {
  position: { x: number; y: number };
  onSelect: (color: string) => void;
  onClose: () => void;
};

const colors = [
  "#f87171", // pastel red
  "#fb923c", // pastel orange
  "#facc15", // pastel yellow
  "#4ade80", // pastel green
  "#60a5fa", // pastel blue
  "#a78bfa", // pastel purple
  "#f472b6", // pastel pink
  "#94a3b8"  // slate gray
];

const ColorPicker: React.FC<ColorPickerProps> = ({ onSelect }) => {
  return (
    <div className="bg-white dark:bg-darkPanel p-2 rounded-lg shadow-lg flex gap-2 flex-wrap w-48">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onSelect(color)}
          style={{ backgroundColor: color }}
          className="w-8 h-8 rounded-full border-2 border-gray-200 hover:scale-110 transition"
        />
      ))}
    </div>
  );
};

export default ColorPicker;
