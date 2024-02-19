import React, { useState } from "react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const categories = {
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

const IlluStyleFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState("common");
  const [selectedStyle, setSelectedStyle] = useState("");

  // update category selected by user
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Reset previously selected style when category is changed.
    setSelectedStyle("");
  };

  // update style selected by user
  const handleStyleChange = (style) => {
    if (selectedStyle.includes(style)) {
      setSelectedStyle(selectedStyle.filter((s) => s !== style));
    } else {
      setSelectedStyle([...selectedStyle, style]);
    }
  };

  return (
    <div className="outline outline-1 p-5 outline-gray-300 rounded-xl">
      <div className="flex text-start">
        <p className="font-bold text-xl">Illustration Styles</p>
      </div>
      <div className="border border-gray-300 mt-2"></div>
      <div className="mt-5">
        <div className="flex gap-2">
          {Object.keys(categories).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`flex max-[640px]:items-center border border-solid text-xs px-2 py-1 md:p-1 md:text-base rounded-full ${
                selectedCategory.includes(category)
                  ? "outline outline-violet-500 outline-3 bg-violet-200 text-violet-500"
                  : ""
              }`}
            >
              {categoryDisplayNames[category] || category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-5 relative left-4">
          {categories[selectedCategory].map((style) => (
            <div className="group flex flex-col items-center justify-center h-10 w-10 md:h-14 md:w-14 mt-6">
              <button
                key={style}
                onClick={() => handleStyleChange(style)}
                className={`relative bg-gray-300 rounded-xl p-7 md:p-8 md:mt-2 ${
                  selectedStyle.includes(style)
                    ? "outline outline-violet-500 outline-2"
                    : ""
                }`}
              >
                {/*<img
                src="https://cdn-icons-png.freepik.com/256/2939/2939047.png"
                className="rounded-2xl"
                alt="illustIcon"
            />*/}
                {selectedStyle.includes(style) && (
                  <span className="check-icon absolute top-1 right-1 text-white text-sm">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      size="1x"
                      className="text-violet-500"
                    />
                  </span>
                )}
              </button>
              <p style={{ fontSize: "10px" }} className="text-center">
                {style}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IlluStyleFilter;
