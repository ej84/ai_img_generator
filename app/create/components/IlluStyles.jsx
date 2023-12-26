import React, { useState } from "react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const categories = {
  common: [
    "flat",
    "alegria",
    "abstract",
    "futurist",
    "comic",
    "isometric",
    "psychedelic",
    "childbook",
    "realism",
    "filmnoir",
    "lowpoly",
    "pixel",
  ],
  bw: [
    "silhouette",
    "doodle",
    "technical",
    "colouringbook",
    "scribble",
    "minimalist",
  ],
  logoIcons: [
    "logo_abstract",
    "logo_elegant",
    "logo_geometric",
    "logo_funny",
    "emoji",
    "icon_web",
  ],
  artists: [
    "picasso",
    "dali",
    "escher",
    "vangogh",
    "matisse",
    "basquiat",
    "murakami",
    "popart",
    "schiele",
    "rand",
    "mondrian",
  ],
  tattoo: [
    "tattoo_oldschool",
    "tattoo_americana",
    "tattoo_tribal",
    "tattoo_japanese",
    "tattoo_geometric",
    "tattoo_line",
  ],
};

const categoryDisplayNames = {
  common: "Common",
  bw: "Black & White",
  logoIcons: "Logo & Icons",
  artists: "Artists",
  tattoo: "Tattoo",
};

const IlluStyles = ({ selectedStyle, setSelectedStyle }) => {
  const [selectedCategory, setSelectedCategory] = useState("common");
  const [showExampleBtn, setShowExampleBtn] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [selectedExample, setSelectedExample] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Reset previously selected style when category is changed.
    setSelectedStyle("");
  };

  const handleStyleChange = (style) => {
    if (selectedStyle.includes(style)) {
      setSelectedStyle(selectedStyle.filter((s) => s !== style));
    } else {
      setSelectedStyle([...selectedStyle, style]);
    }
  };

  const showExamples = (style) => {
    // Shows style example images on pop up
    setSelectedExample(style);
    setShowExample(true);
  };

  const closePopup = () => {
    // Close the popup
    setShowExample(false);
  };

  return (
    <div>
      <div className="flex justify-center gap-3 md:gap-4">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className="flex border border-solid p-2 text-xs md:px-5 md:text-base rounded-full"
          >
            {categoryDisplayNames[category] || category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 mt-3">
        {categories[selectedCategory].map((style) => (
          <div
            className="group flex flex-col items-center justify-center h-20 w-20 md:h-32 md:w-32"
            onMouseEnter={() => setShowExampleBtn(true)}
          >
            <button
              key={style}
              onClick={() => handleStyleChange(style)}
              className={`relative bg-gray-300 rounded-xl p-7 m-2 md:p-12 ${
                selectedStyle.includes(style) ? "selected" : ""
              }`}
            >
              {selectedStyle.includes(style) && (
                <span className="check-icon absolute top-1 right-1 text-white text-sm">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    size="2x"
                    color="blue"
                  />
                </span>
              )}
              {showExampleBtn && (
                <button
                  className="absolute left-1 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity px-1 py-1 bg-blue-500 rounded-full"
                  onClick={showExamples}
                >
                  <p className="text-white text-xs text-center font-semibold">
                    See Examples
                  </p>
                </button>
              )}
            </button>

            <p style={{ fontSize: "10px" }} className="text-center">
              {style}
            </p>
          </div>
        ))}
      </div>
      {/* Style Examples Popup */}
      {showExample && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closePopup}
        >
          {/* Popup Content */}
          <div
            className="bg-white md:w-1/2 md:h-1/2 rounded"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image and Navigation */}
            <div>
              Example
              {/*<img src={getImageForStyle(selectedExample)} alt="Example" />*/}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IlluStyles;
