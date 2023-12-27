import React, { useState } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = () => {
  const [colorLimit, setColorLimit] = useState(2);
  const [colorPalette, setColorPalette] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  const handleAddColor = (color) => {
    setColorPalette([...colorPalette, color.hex]);
    setShowPicker(false); // Close the Color Picker
  };

  const handleRemoveColor = (color) => {
    setColorPalette(colorPalette.filter((c) => c !== color));
  };

  return (
    <div className="flex space-x-2 ">
      {colorPalette.map((color, index) => (
        <div key={index} className="relative group">
          <div
            className="w-6 h-6 rounded-full"
            style={{ backgroundColor: color }}
          />
          <button
            onClick={() => handleRemoveColor(color)}
            className="absolute top-0 right-0 hidden group-hover:block"
          >
            🗑️
          </button>
        </div>
      ))}
      <button
        onClick={() => setShowPicker(true)}
        className="relative right-0 add-color-button w-3 h-3 self-start"
      >
        +
      </button>
      {/* Color Picker */}
      {showPicker && (
        <SketchPicker
          color={colorPalette[colorPalette.length - 1] || "#000"}
          onChangeComplete={handleAddColor}
          className="absolute md:bottom-1/4 md:left-1/3"
        />
      )}
    </div>
  );
};

export default ColorPicker;
