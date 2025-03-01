import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ColorModeSelector = ({ colorMode, setColorMode, step, userColor }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [colorLimit, setColorLimit] = useState(2);

  const imgColor =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeCAYAAADNK3caAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATHSURBVHgB7dRRFUBQFADBSyoldFCD8ijx9mvmbIbd3pk/lniGVc5hkeu4h7X2ASBlvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYh8irAaSol7uvAAAAABJRU5ErkJggg==";
  const imgBW =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeCAYAAADNK3caAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAS9SURBVHgB7dQBCQAwDMCw/f497y4Kh0RD6ZmZHfjMrmz51x0AUsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyBmvAAx4wWIGS9AzHgBYsYLEDNegJjxAsSMFyD2ADUABriZDAYyAAAAAElFTkSuQmCC";

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleColorLimitChange = (newLimit) => {
    setColorLimit(newLimit);
  };

  const handleSelectedButton = (color) => {
    setColorMode(color);
  };

  return (
    <>
      {step == 3 ? (
        <div className="flex flex-col justify-center items-center space-y-10">
          <div className="grid grid-cols-2 space-x-3 md:mr-56">
            <div className="max-[639px]:text-sm text-center">
              <button
                key="color"
                className={`relative h-20 w-20 md:h-28 md:w-28 rounded-2xl ${
                  colorMode === "color"
                    ? "outline outline-violet-500 outline-4"
                    : ""
                }`}
                onClick={() => handleSelectedButton("color")}
              >
                {colorMode === "color" && (
                  <span className="check-icon absolute top-3 right-3 text-white text-sm">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      size="2x"
                      className="text-violet-600"
                    />
                  </span>
                )}
                <img src={imgColor} className="rounded-2xl" />
              </button>
              <p>Full Colored</p>
            </div>
            <div className="max-[639px]:text-sm text-center">
              <button
                key="bw"
                className={`relative h-20 w-20 md:h-28 md:w-28 rounded-2xl ${
                  colorMode === "bw"
                    ? "outline outline-violet-600 outline-4"
                    : ""
                }`}
                onClick={() => handleSelectedButton("bw")}
              >
                {colorMode === "bw" && (
                  <span className="check-icon absolute top-3 right-3 text-white text-sm">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      size="2x"
                      className="text-violet-500"
                    />
                  </span>
                )}
                <img src={imgBW} className="rounded-2xl shadow-2xl"></img>
              </button>
              <p>Black and White</p>
            </div>
          </div>
          <div className="md:relative md:right-36">
            {/* Advanced Settings Button */}
            <button
              onClick={toggleDropdown}
              className="text-violet-500 underline focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-opacity-50"
            >
              Advanced settings
            </button>
            <span className="ml-2 text-violet-500">
              {isDropdownOpen ? "▲" : "▼"}
            </span>
          </div>
          {/* Advnaced Options */}
          {isDropdownOpen && (
            <div className="relative mt-2 py-2 w-full bg-white">
              <h1 className="text-xl md:text-3xl font-bold">
                Choose one of the options
              </h1>
              <div className="flex flex-col space-y-3 mt-10">
                <div className="flex space-x-2">
                  <button className="border border-gray-300 rounded-full w-7 h-7 m-3 focus:bg-violet-500" />
                  <div className="flex flex-1 border border-gray-300 px-5 py-4 text-sm text-gray-700 hover:bg-gray-100 w-full md:w-auto text-left rounded-full">
                    <p>No settings applied</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="border border-gray-300 rounded-full w-7 h-7 m-3 focus:bg-violet-500" />
                  <div className="flex md:flex-1 border border-gray-300 px-5 py-4 text-sm text-gray-700 hover:bg-gray-100 w-full md:w-auto text-left rounded-full">
                    <div>Color limit</div>
                    <span className="flex absolute right-2 space-x-2">
                      {/* Color Limit Buttons */}
                      {Array.from({ length: 8 }, (_, i) => i + 2).map(
                        (limit) => (
                          <button
                            key={limit}
                            onClick={() => handleColorLimitChange(limit)}
                            className={`py-1 px-3 -mt-1 rounded-full ${
                              colorLimit === limit
                                ? "bg-violet-500 text-white"
                                : "bg-gray-200"
                            }`}
                          >
                            {limit}
                          </button>
                        )
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="border border-gray-300 rounded-full w-7 h-7 m-3 focus:bg-violet-500" />
                  <div className="flex flex-1 border border-gray-300 px-5 py-4 text-sm text-gray-700 hover:bg-gray-100 w-auto text-left rounded-full">
                    <div className="block">Color palette</div>
                    <span className="flex">
                      <ColorPicker />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {userColor === "color" ? (
            <div className="md:absolute md:left-16 lg:-left-0">
              <button className="h-20 w-20 md:h-28 md:w-28 rounded-2xl">
                <img src={imgColor} className="rounded-2xl" />
              </button>
              <p>Full Colored</p>
            </div>
          ) : (
            <div className="md:absolute">
              <button className="h-20 w-20 md:h-28 md:w-28 rounded-2xl">
                <img src={imgBW} className="rounded-2xl shadow-2xl" />
              </button>
              <p>Black and White</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ColorModeSelector;
