import React, { useState } from "react";
import { faClose, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IllustFilterBox from "./IllustFilterBox";

const IllustFilter = ({ onApplyFilter, onReset }) => {
  const [filterOptions, setFilterOptions] = useState({
    style: "",
    colorMode: "",
    illustType: "",
    colorsAmount: "",
  });

  const [selectedFilters, setSelectedFilters] = useState({});
  const [showFilterBox, setShowFilterBox] = useState(false);
  const [filterName, setFilterName] = useState("");

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

  const handleChange = (e) => {
    addFilter(e.target.name, e.target.value);
    setFilterOptions({
      ...filterOptions,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilterBox = (name) => {
    if (showFilterBox) {
      setShowFilterBox(false);
      setFilterName("");
    } else {
      setShowFilterBox(true);
      setFilterName(name);
    }
  };

  const handleApplyFilter = () => {
    onApplyFilter(filterOptions);
  };

  const handleReset = () => {
    setFilterOptions({
      style: "",
      colorMode: "",
      illustType: "",
      colorsAmount: "",
    });
    onReset();
  };

  return (
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
          name="colorMode"
          value={filterOptions}
          onClick={() => handleFilterBox("colorType")}
          className="border border-solid p-2 rounded-full hover:cursor-pointer"
        >
          Color Mode {showFilterBox && filterName === "colorType" ? "▲" : "▼"}
        </button>
        <button
          name="illustType"
          value={filterOptions}
          onClick={() => handleFilterBox("illustType")}
          className="border border-solid p-2 rounded-full hover:cursor-pointer"
        >
          Illustration type{" "}
          {showFilterBox && filterName === "illustType" ? "▲" : "▼"}
        </button>
        <select
          name="colorsAmount"
          value={filterOptions}
          onChange={handleChange}
          className="border border-solid p-2 rounded-full hover:cursor-pointer"
        >
          <option>Colors amount</option>
          {Array.from({ length: 9 }, (_, i) => i + 1).map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
        <div className="inline md:relative md:-right-56 space-x-5">
          <button onClick={handleReset} className="text-violet-600 underline">
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
            <IllustFilterBox filterName={filterName} />
          </div>
        )}
      </div>
      <div className="md:hidden">
        <FontAwesomeIcon
          icon={faFilter}
          size="1x"
          className="flex inset-x-1/2 inset-y-1/2 p-3 md:hidden"
        />
      </div>
    </>
  );
};

export default IllustFilter;
