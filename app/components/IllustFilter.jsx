import React from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IllustFilter = () => {
  return (
    <>
      <div className="hidden md:block md:relative md:-left-20 md:mb-10 w-full space-x-4">
        <select className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer">
          <option value="">Illustration style</option>
        </select>
        <select className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer">
          <option value="">Color mode</option>
          <option value="color">Full Color</option>
          <option value="bw">Black & White</option>
        </select>
        <select className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer">
          <option value="">Illustration type</option>
        </select>
        <select className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer">
          <option value="">Colors amount</option>
          {Array.from({ length: 9 }, (_, i) => i + 1).map((count) => (
            <option key={count} value={count}>{count}</option>
          ))}
        </select>
        <div className="inline md:relative md:-right-56 space-x-5">
          <button className="text-blue-600 underline">Reset</button>
          <button className="border border-solid px-2 py-3 text-white bg-blue-500 rounded-full">
            Apply filter
          </button>
        </div>
      </div>
      <FontAwesomeIcon
        icon={faFilter}
        size="1x"
        className="flex inset-x-1/2 inset-y-1/2 p-3 md:hidden"
      />
    </>
  );
};

export default IllustFilter;
