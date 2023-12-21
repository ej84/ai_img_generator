import React, { useState, useRef } from "react";

const IlluTypeSelector = () => {
  const [selectedButton, setSelectedButton] = useState("full");
  const [selectedVar, setSelectedVar] = useState(1);
  const [selectedVisibility, setSelectedVisibility] = useState("public");
  const fullModeBtn = useRef(null);
  const isolModeBtn = useRef(null);
  const variantTexts = { 1: "One", 2: "Two", 3: "Three", 4: "Four" };

  const handleSelectedMode = (mode) => {
    setSelectedButton(mode);
  };

  const handleSelectedVar = (variant) => {
    setSelectedVar(variant);
  };

  const handleSelectedVisibility = (visibleTo) => {
    setSelectedVisibility(visibleTo);
  };

  return (
    <div className="flex flex-col space-y-10">
      <div className="grid grid-rows-1">
        <div className="grid grid-cols-4 space-x-2 max-[640px]:ml-2">
          <div className="max-[639px]:text-sm text-center">
            <button
              ref={fullModeBtn}
              className={`h-20 w-20 md:h-28 md:w-28 rounded-2xl bg-red-600 ${
                selectedButton === "full"
                  ? "outline outline-blue-500 outline-4"
                  : ""
              }`}
              onClick={() => handleSelectedMode("full")}
            ></button>
            <p>Full Illustration</p>
          </div>
          <div className="max-[639px]:text-sm text-center">
            <button
              ref={isolModeBtn}
              className={`h-20 w-20 md:h-28 md:w-28 rounded-2xl bg-white shadow-2xl ${
                selectedButton === "isolated"
                  ? "outline outline-blue-500 outline-4"
                  : ""
              }`}
              onClick={() => handleSelectedMode("isolated")}
            ></button>
            <p>Isolated Objects</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="mt-5 font-bold text-xl md:mt-0 md:text-3xl md:-ml-2">
          Amount of illustration variants
        </h1>
        <div className="grid grid-rows-1 mt-5">
          <div className="grid grid-cols-4 ml-4 md:ml-2">
            {Array.from({ length: 4 }, (_, i) => i + 1).map((variant) => (
              <div className="grid grid-rows-1">
                <button
                  key={variant}
                  onClick={() => handleSelectedVar(variant)}
                  className={`h-20 w-20 md:h-28 md:w-28 rounded-2xl bg-gray-200 ${
                    selectedVar === variant
                      ? "outline outline-blue-500 outline-4"
                      : ""
                  }`}
                >
                  <h1 className="text-5xl text-center">{variant}</h1>
                </button>
                <p className="text-center mt-2">{variantTexts[variant]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-rows-1 mt-10">
          <div>
            <h1 className="font-bold text-xl md:mt-0 md:text-3xl md:-ml-2">
              Ilustration visibility
            </h1>
            <div className="grid grid-cols-4 mt-5">
              <div className="max-[639px]:text-sm text-center">
                <button
                  onClick={() => handleSelectedVisibility("public")}
                  className={`h-20 w-20 md:h-28 md:w-28 mx-2 rounded-2xl bg-gray-200 ${
                    selectedVisibility === "public"
                      ? "outline outline-blue-500 outline-4"
                      : ""
                  }`}
                >
                  Public
                </button>
                <p className="text-center mt-2">Public</p>
              </div>
              <div className="max-[639px]:text-sm text-center">
                <button
                  onClick={() => handleSelectedVisibility("private")}
                  className={`h-20 w-20 md:h-28 md:w-28 mx-2 rounded-2xl bg-gray-200 ${
                    selectedVisibility === "private"
                      ? "outline outline-blue-500 outline-4"
                      : ""
                  }`}
                ></button>
                <p className="text-center">Private</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IlluTypeSelector;
