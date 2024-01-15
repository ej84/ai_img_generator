import React, { useState, useEffect } from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categories } from "../create/components/IlluStyles";

const IllustFilter = ({ illusts }) => {
  //const [illusts, setIllusts] = useState([]);
  const [filteredIllusts, setFilteredIllusts] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");

  const filterByCategory = (event) => {
    setFilterCategory(event.target.value);
  };

  const applyFilter = () => {
    let tempIllusts = illusts;

    if (filterCategory) {
      tempIllusts = illusts.filter((illust) => illust.style === filterCategory);
    }

    setFilteredIllusts(tempIllusts);
  };

  const resetFilter = () => {
    setFilterCategory("");
    setFilteredIllusts(illusts);
  };

  return (
    <>
      <div className="hidden md:block md:relative md:-left-20 md:mb-10 w-full space-x-4">
        <select
          value={filterCategory}
          onChange={filterByCategory}
          className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer"
        >
          <option value="">Illustration style</option>
          <option value="comic">comic</option>
        </select>
        <select
          value={filterCategory}
          onChange={filterByCategory}
          className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer"
        >
          <option value="">Color mode</option>
          <option value="color">Full Color</option>
          <option value="bw">Black & White</option>
        </select>
        <select
          value={filterCategory}
          onChange={filterByCategory}
          className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer"
        >
          <option value="">Illustration type</option>
        </select>
        <select
          value={filterCategory}
          onChange={filterByCategory}
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
          <button onClick={resetFilter} className="text-blue-600 underline">
            Reset
          </button>
          <button
            onClick={applyFilter}
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
