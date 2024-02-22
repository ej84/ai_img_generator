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

const IllustFilterBox = ({ filterName }) => {
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
    <div>
      {filterName === "style" && (
        <div className="outline outline-1 p-5 -m-2 bg-white outline-gray-300 rounded-xl">
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
                  className={`flex max-[640px]:items-center border border-solid text-xs md:p-1 md:text-base rounded-full ${
                    selectedCategory.includes(category)
                      ? "outline outline-violet-500 outline-3 bg-violet-200 text-violet-500"
                      : ""
                  }`}
                >
                  {categoryDisplayNames[category] || category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-5 relative left-2 md:left-4">
              {categories[selectedCategory].map((style) => (
                <div className="group flex flex-col items-center justify-center max-[640px]:mb-2 h-10 w-10 md:h-14 md:w-14 mt-6">
                  <button
                    key={style}
                    onClick={() => handleStyleChange(style)}
                    className={`relative bg-gray-300 rounded-xl p-6 md:p-8 md:mt-2 ${
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
      )}
      {filterName === "colorType" && (
        <div className="relative bottom-14 left-32 outline outline-3 p-7 md:mr-32 md:mt-14 outline-gray-300 bg-white rounded-xl">
          <div className="text-start pb-4 border-b-2 border-gray-300">
            <p className="font-bold text-base">Color mode</p>
          </div>
          <div className="p-7 space-x-3">
            <div>
              <div className="float-left relative right-5">
                <input type="checkbox" value="color" />
                <label className="ml-2">Full Colored</label>
              </div>
              <div className="float-right">
                <input type="checkbox" value="bw" />
                <label className="ml-2">Black & White</label>
              </div>
            </div>
          </div>
        </div>
      )}
      {filterName === "illustType" && (
        <div className="relative bottom-14 left-64 outline outline-3 p-7 md:mr-32 md:mt-14 outline-gray-300 bg-white rounded-xl">
          <div className="text-start pb-4 border-b-2 border-gray-300">
            <p className="font-bold text-base">Illustration mode</p>
          </div>
          <div className="p-7 space-x-3">
            <div className="mr-5">
              <div className="float-left relative right-5">
                <input type="checkbox" value="color" />
                <label className="ml-2">Full Image</label>
              </div>
              <div className="float-right relative">
                <input type="checkbox" value="bw" />
                <label className="ml-2">Isolated Image</label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IllustFilterBox;
