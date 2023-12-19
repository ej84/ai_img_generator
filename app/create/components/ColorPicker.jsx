import React, { useState } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = () => {
  const [colorLimit, setColorLimit] = useState(2);
  const [colorPalette, setColorPalette] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  const handleColorLimitChange = (newLimit) => {
    setColorLimit(newLimit);
  };

  const handleAddColor = (color) => {
    if (colorPalette.length < colorLimit) {
      setColorPalette([...colorPalette, color.hex]);
      setShowPicker(false); // Close the Color Picker
    } else {
      alert("Color limit reached");
    }
  };

  const handleRemoveColor = (color) => {
    setColorPalette(colorPalette.filter((c) => c !== color));
  };

  return (
    <div className="space-y-4">
      {/* Color Limit Buttons */}
      <div className="flex space-x-2">
        {Array.from({ length: 8 }, (_, i) => i + 2).map((limit) => (
          <button
            key={limit}
            onClick={() => handleColorLimitChange(limit)}
            className={`py-1 px-3 rounded-full ${
              colorLimit === limit ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {limit}
          </button>
        ))}
      </div>

      {/* Color Palette */}
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
        {colorPalette.length < colorLimit && (
          <button
            onClick={() => setShowPicker(true)}
            className="add-color-button"
          >
            +
          </button>
        )}
      </div>
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
