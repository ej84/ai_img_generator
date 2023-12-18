import React, { useState } from "react";

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

  return (
    <div>
      <div className="flex justify-center gap-3 md:relative md:left-5 md:gap-4">
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
          <div className="flex flex-col items-center justify-center h-20 w-20 md:h-32 md:w-32">
            <button
              key={style}
              onClick={() => handleStyleChange(style)}
              className={`relative bg-blue-500 rounded-xl p-7 m-2 md:p-10 ${
                selectedStyle.includes(style) ? "selected" : ""
              }`}
            >
              {selectedStyle.includes(style) && (
                <span className="check-icon absolute top-0 right-0 text-white text-sm">
                  ✔️
                </span>
              )}
            </button>
            <p style={{ fontSize: "10px" }} className="text-center">
              {style}
            </p>
          </div>
        ))}
      </div>
      {selectedStyle && <p>{selectedStyle}</p>}
    </div>
  );
};

export default IlluStyles;
