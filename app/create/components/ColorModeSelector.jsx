import React, { useState } from "react";
import ColorPicker from "./ColorPicker";

const ColorModeSelector = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-10">
      <div className="grid grid-cols-2 space-x-3 md:mr-56">
        <div className="max-[639px]:text-sm text-center">
          <button className="h-20 w-20 md:h-28 md:w-28 rounded-2xl">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeCAYAAADNK3caAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATHSURBVHgB7dRRFUBQFADBSyoldFCD8ijx9mvmbIbd3pk/lniGVc5hkeu4h7X2ASBlvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYh8irAaSol7uvAAAAABJRU5ErkJggg=="
              className="rounded-2xl"
            />
          </button>
          <p>Full Colored</p>
        </div>
        <div className="max-[639px]:text-sm text-center">
          <button className="h-20 w-20 md:h-28 md:w-28 rounded-2xl">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeCAYAAADNK3caAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAS9SURBVHgB7dQBCQAwDMCw/f497y4Kh0RD6ZmZHfjMrmz51x0AUsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyD2ADUABriZDAYyAAAAAElFTkSuQmCC"
              className="rounded-2xl shadow-2xl"
            />
          </button>
          <p>Black and White</p>
        </div>
      </div>
      <div className="md:relative md:right-36">
        {/* Advanced Settings Button */}
        <button
          onClick={toggleDropdown}
          className="text-blue-500 underline focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Advanced settings
        </button>
        <span className="ml-2 text-blue-500">{isDropdownOpen ? "▲" : "▼"}</span>
      </div>
      {/* Advnaced Options */}
      {isDropdownOpen && (
        <div className="relative mt-2 py-2 w-full bg-white">
          <h1 className="text-xl md:text-3xl font-bold">
            Choose one of the options
          </h1>
          <div className="flex flex-col space-y-3 mt-10">
            <button className="block border border-gray-300 px-5 py-4 text-sm text-gray-700 hover:bg-gray-100 w-full text-left rounded-full">
              No settings applied
            </button>
            <button className="block border border-gray-300 px-5 py-4 text-sm text-gray-700 hover:bg-gray-100 w-full text-left rounded-full">
              Color limit
            </button>
            <button className="block border border-gray-300 px-5 py-4 text-sm text-gray-700 hover:bg-gray-100 w-full text-left rounded-full">
              Color palette
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorModeSelector;
