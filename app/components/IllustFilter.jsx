import React, { useState } from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categories } from "../create/components/IlluStyles";

const IllustFilter = ({ onApplyFilter, onReset }) => {
  const [filterOptions, setFilterOptions] = useState({
    style: "",
    colorMode: "",
    illustType: "",
    colorsAmount: "",
  });

  const handleChange = (e) => {
    setFilterOptions({
      ...filterOptions,
      [e.target.name]: e.target.value,
    });
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
        <select
          value={filterOptions}
          onChange={handleChange}
          className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer"
        >
          <option value="">Illustration style</option>
          <option value="comic">comic</option>
          <option value="filmnoir">filmnoir</option>
        </select>
        <select
          value={filterOptions}
          onChange={handleChange}
          className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer"
        >
          <option value="">Color mode</option>
          <option value="color">Full Color</option>
          <option value="bw">Black & White</option>
        </select>
        <select
          value={filterOptions}
          onChange={handleChange}
          className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer"
        >
          <option value="">Illustration type</option>
          <option value="full">Full</option>
          <option value="isolated">Isolated</option>
        </select>
        <select
          value={filterOptions}
          onChange={handleChange}
          className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer"
        >
          <option value="">Colors amount</option>
          {Array.from({ length: 9 }, (_, i) => i + 1).map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
        <div className="inline md:relative md:-right-56 space-x-5">
          <button onClick={handleReset} className="text-blue-600 underline">
            Reset
          </button>
          <button
            onClick={handleApplyFilter}
            className="border border-solid px-2 py-3 text-white bg-blue-500 rounded-full"
          >
            Apply filter
          </button>
        </div>
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
