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
      <div className="flex space-x-2 items-center">
        {colorPalette.map((color, index) => (
          <div key={index} className="relative group">
            <div
              className="w-10 h-10 rounded-full"
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
            className="add-color-button"
          >
            +
          </button>
        {/* Color Picker */}
        {showPicker && (
          <SketchPicker
            color={colorPalette[colorPalette.length - 1] || "#000"}
            onChangeComplete={handleAddColor}
          />
        )}
      </div>
  );
};

export default ColorPicker;
