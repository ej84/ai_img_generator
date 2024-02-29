import React, { useState } from "react";
import { faClose, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categories } from "./IllustFilterBox";
import { useMediaQuery } from "@mui/material";

const IllustFilter = ({ onApplyFilter, onReset }) => {
  const [filterOptions, setFilterOptions] = useState({
    style: [],
    color: "",
    mode: "",
    colorsAmount: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("common");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showFilterBox, setShowFilterBox] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isSm = useMediaQuery("(max-width:768px)");

  const categoryDisplayNames = {
    common: "Common",
    bw: "Black & White",
    logoIcons: "Logo & Icons",
    artists: "Artists",
    tattoo: "Tattoo",
  };

  const addFilter = (category, value) => {
    setSelectedFilters((prev) => ({ ...prev, [category]: value }));
  };

  const removeFilter = (category) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[category];
      return newFilters;
    });
  };

  // update category selected by user
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Reset previously selected style when category is changed.
    setSelectedStyle("");
  };

  const handleChange = (filterOption) => {
    if (filterOption !== "") {
      addFilter(filterName, filterOption);
      setFilterOptions({
        ...filterOptions,
        [filterName]: filterOption,
      });
    }
  };
  /*
  const handleChange = (e) => {
    addFilter(e.target.name, e.target.value);
    setFilterOptions({
      ...filterOptions,
      [e.target.name]: e.target.value,
    });
  };*/

  const handleFilterBox = (name) => {
    if (showFilterBox) {
      setShowFilterBox(false);
      setFilterName("");
    } else {
      setShowFilterBox(true);
      setFilterName(name);
    }
  };

  // update style selected by user
  const handleStyleChange = (style) => {
    if (selectedStyle.includes(style)) {
      setSelectedStyle(selectedStyle.filter((s) => s !== style));
    } else {
      setSelectedStyle([...selectedStyle, style]);
    }
  };

  const handleApplyFilter = () => {
    if (filterOptions !== "" && filterOptions !== null) {
      onApplyFilter(filterOptions);
    }
  };

  const handleReset = () => {
    setFilterOptions({
      style: [],
      colorMode: "",
      illustType: "",
      colorsAmount: "",
    });
    onReset();
  };

  const openDropdown = () => {
    if (isSm && !isDropdownOpen) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  return (
    <>
      {isSm ? (
        <div>
          <button>
            <FontAwesomeIcon
              onClick={() => openDropdown()}
              icon={faFilter}
              size="1x"
              className="flex inset-x-1/2 inset-y-1/2 p-3 md:hidden"
            />
          </button>
          {isDropdownOpen && (
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center z-40 md:hidden"
              style={{ maxWidth: "430px" }}
            >
              <div className="absolute bottom-0 w-full bg-white h-1/2 rounded-t-xl">
                <div className="grid grid-rows-4 justify-items-center">
                  <div className="mt-3">
                    <button
                      name="style"
                      value={filterOptions}
                      onClick={() => handleFilterBox("style")}
                      className="border border-solid w-96 h-12 rounded-full hover:cursor-pointer"
                    >
                      Illustration Style
                      {showFilterBox && filterName === "style" ? "▲" : "▼"}
                    </button>
                  </div>
                  <div className="mt-3">
                    <button
                      name="colorType"
                      value={filterOptions}
                      onClick={() => handleFilterBox("color")}
                      className="border border-solid w-96 h-12 rounded-full hover:cursor-pointer"
                    >
                      Color Mode{" "}
                      {showFilterBox && filterName === "color" ? "▲" : "▼"}
                    </button>
                  </div>
                  <div className="mt-3">
                    <button
                      name="illustType"
                      value={filterOptions}
                      onClick={() => handleFilterBox("mode")}
                      className="border border-solid w-96 h-12 rounded-full hover:cursor-pointer"
                    >
                      Illustration type
                      {showFilterBox && filterName === "mode" ? "▲" : "▼"}
                    </button>
                  </div>
                  <div className="mt-3">
                    <button
                      name="count"
                      value={filterOptions}
                      onClick={() => handleFilterBox("count")}
                      className="border border-solid w-96 h-12 rounded-full hover:cursor-pointer"
                    >
                      Colors amount{" "}
                      {showFilterBox && filterName === "count" ? "▲" : "▼"}
                    </button>
                  </div>
                </div>
                <div className="border border-t-gray-300 border-b-0 mt-5">
                  <div className="flex space-x-5 mt-2 ml-32">
                    <button
                      onClick={handleReset}
                      className="text-violet-600 underline"
                    >
                      Reset
                    </button>
                    <button
                      onClick={handleApplyFilter}
                      className="border border-solid p-2 text-white bg-violet-500 rounded-full"
                    >
                      Apply filter
                    </button>
                  </div>
                </div>
                {showFilterBox && <div className="relative bottom-60"></div>}
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="hidden md:block md:relative md:-left-20 md:mb-10 w-full space-x-4">
            <button
              name="style"
              value={filterOptions}
              onClick={() => handleFilterBox("style")}
              className="border border-solid p-2 rounded-full hover:cursor-pointer"
            >
              Illustration Style{" "}
              {showFilterBox && filterName === "style" ? "▲" : "▼"}
            </button>
            <button
              name="color"
              value={filterOptions}
              onClick={() => handleFilterBox("color")}
              className="border border-solid p-2 rounded-full hover:cursor-pointer"
            >
              Color Mode {showFilterBox && filterName === "color" ? "▲" : "▼"}
            </button>
            <button
              name="mode"
              value={filterOptions}
              onClick={() => handleFilterBox("mode")}
              className="border border-solid p-2 rounded-full hover:cursor-pointer"
            >
              Illustration type{" "}
              {showFilterBox && filterName === "mode" ? "▲" : "▼"}
            </button>
            <button
              name="count"
              value={filterOptions}
              onClick={() => handleFilterBox("count")}
              className="border border-solid p-2 rounded-full hover:cursor-pointer"
            >
              Colors amount{" "}
              {showFilterBox && filterName === "count" ? "▲" : "▼"}
            </button>
            <div className="inline md:relative md:-right-56 space-x-5">
              <button
                onClick={handleReset}
                className="text-violet-600 underline"
              >
                Reset
              </button>
              <button
                onClick={handleApplyFilter}
                className="border border-solid p-2 text-white bg-violet-500 rounded-full"
              >
                Apply filter
              </button>
            </div>
            <div>
              <div className="relative top-5 space-x-3">
                {Object.keys(selectedFilters).map((filterKey) => (
                  <div
                    key={filterKey}
                    className="inline-block bg-gray-300 rounded-full px-10 py-3"
                  >
                    {selectedFilters[filterKey]}
                    <button
                      className="relative w-3 left-4 bg-none border-none cursor-pointer"
                      onClick={() => removeFilter(filterKey)}
                    >
                      <FontAwesomeIcon
                        icon={faClose}
                        className="text-2xl relative top-1"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {showFilterBox && (
              <div className="absolute top-14 z-10">
                <div className="flex justify-center">
                  {filterName === "style" && (
                    <div className="outline outline-1 p-5 -m-2 bg-white outline-gray-300 rounded-xl">
                      <div className="flex text-start">
                        <p className="font-bold text-xl ">
                          Illustration Styles
                        </p>
                      </div>
                      <div className="border border-gray-300 mt-2"></div>
                      <div className="mt-5">
                        <div className="flex gap-1">
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

                        <div className="grid grid-cols-4 relative left-2 md:left-4">
                          {categories[selectedCategory].map((style) => (
                            <div className="group flex flex-col items-center justify-center max-[640px]:mb-2 h-10 w-10 md:h-14 md:w-14 mt-6">
                              <button
                                key={style}
                                onClick={() => handleChange(style)}
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
                              <p
                                style={{ fontSize: "10px" }}
                                className="text-center"
                              >
                                {style}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {filterName === "color" && (
                    <div className="relative bottom-14 left-32 outline outline-3 p-7 md:mr-32 md:mt-14 outline-gray-300 bg-white rounded-xl">
                      <div className="text-start pb-4 border-b-2 border-gray-300">
                        <p className="font-bold text-base">Color mode</p>
                      </div>
                      <div className="p-7 space-x-3">
                        <div>
                          <div className="float-left relative right-5">
                            <input
                              type="checkbox"
                              onClick={() => handleChange("color")}
                              value="color"
                            />
                            <label className="ml-2">Full Colored</label>
                          </div>
                          <div className="float-right">
                            <input
                              type="checkbox"
                              onClick={() => handleChange("bw")}
                              value="bw"
                            />
                            <label className="ml-2">Black & White</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {filterName === "mode" && (
                    <div className="relative bottom-14 left-64 outline outline-3 p-7 md:mr-32 md:mt-14 outline-gray-300 bg-white rounded-xl">
                      <div className="text-start pb-4 border-b-2 border-gray-300">
                        <p className="font-bold text-base">Illustration mode</p>
                      </div>
                      <div className="p-7 space-x-3">
                        <div className="mr-5">
                          <div className="float-left relative right-5">
                            <input
                              type="checkbox"
                              onClick={() => handleChange("full")}
                              value="full"
                            />
                            <label className="ml-2">Full Image</label>
                          </div>
                          <div className="float-right relative">
                            <input
                              type="checkbox"
                              onClick={() => handleChange("isolated")}
                              value="isolated"
                            />
                            <label className="ml-2">Isolated Image</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {filterName === "count" && (
                    <div className="relative bottom-14 left-64 outline outline-3 p-7 md:mr-32 md:mt-14 outline-gray-300 bg-white rounded-xl">
                      <div className="text-start pb-4 border-b-2 border-gray-300">
                        <p className="font-bold text-base">Colors amount</p>
                      </div>
                      <div className="p-7 space-x-3">
                        {Array.from({ length: 9 }, (_, i) => i + 1).map(
                          (count) => (
                            <button key={count} value={count}>
                              {count}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}
                  {/*<div>
                    <div className="relative top-5 space-x-3">
                      {Object.keys(selectedFilters).map((filterKey) => (
                        <div
                          key={filterKey}
                          className="inline-block bg-gray-300 rounded-full px-10 py-3"
                        >
                          {selectedFilters[filterKey]}
                          <button
                            className="relative w-3 left-4 bg-none border-none cursor-pointer"
                            onClick={() => removeFilter(filterKey)}
                          >
                            <FontAwesomeIcon
                              icon={faClose}
                              className="text-2xl relative top-1"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                      </div>*/}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default IllustFilter;
