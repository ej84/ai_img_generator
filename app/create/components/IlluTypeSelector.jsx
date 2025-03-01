import React, { useState, useRef } from "react";
import {
  faCircleCheck,
  faEarth,
  faLock,
  fa,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpgradePlanWindow from "@/app/components/UpgradePlanWindow";

export const variantTexts = { 1: "One", 2: "Two", 3: "Three", 4: "Four" };
export const visibleModes = { public: faEarth, private: faLock };

const IlluTypeSelector = ({
  objectMode,
  setObjectMode,
  variant,
  setVariant,
  visible,
  setVisible,
  step,
  userMode,
  userVariant,
  userVisibility,
  isPrivate,
}) => {
  const [showUpgradeWindow, setShowUpgradeWindow] = useState(false);
  const fullModeBtn = useRef(null);
  const isolModeBtn = useRef(null);

  const [privateStyle, setPrivateStyle] = useState("outline-amber-500");

  const handleSelectedMode = (mode) => {
    setObjectMode(mode);
  };

  const handleVariantChange = (selectedVariant) => {
    setVariant(selectedVariant);
  };

  const handleVisible = (visibleTo) => {
    if (visibleTo === "private") {
      console.log(isPrivate);
      if (!isPrivate) {
        setPrivateStyle("outline-red-600");

        setShowUpgradeWindow(true);
      } else {
        setShowUpgradeWindow(false);
      }
    }
    setVisible(visibleTo);
  };

  return (
    <>
      {step == 4 ? (
        <div className="flex flex-col justify-center items-center space-y-10">
          <div className="grid grid-rows-1">
            <div className="grid grid-cols-4 space-x-2 max-[640px]:ml-2">
              <div className="max-[639px]:text-sm text-center">
                <button
                  key="full"
                  ref={fullModeBtn}
                  className={`relative h-20 w-20 md:h-28 md:w-28 rounded-2xl bg-red-600 ${
                    objectMode === "full"
                      ? "outline outline-amber-500 outline-4"
                      : ""
                  }`}
                  onClick={() => handleSelectedMode("full")}
                >
                  {objectMode === "full" && (
                    <span className="check-icon absolute top-2 right-2 text-white text-sm">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        size="2x"
                        className="text-amber-500"
                      />
                    </span>
                  )}
                </button>
                <p>Full Illustration</p>
              </div>
              <div className="max-[639px]:text-sm text-center">
                <button
                  key="isolated"
                  ref={isolModeBtn}
                  className={`relative h-20 w-20 md:h-28 md:w-28 rounded-2xl bg-white shadow-2xl ${
                    objectMode === "isolated"
                      ? "outline outline-amber-500 outline-4"
                      : ""
                  }`}
                  onClick={() => handleSelectedMode("isolated")}
                >
                  {objectMode === "isolated" && (
                    <span className="check-icon absolute top-2 right-2 text-white text-sm">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        size="2x"
                        className="text-violet-500"
                      />
                    </span>
                  )}
                </button>
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
                {Array.from({ length: 4 }, (_, i) => i + 1).map((v) => (
                  <div className="grid grid-rows-1">
                    <button
                      key={variant}
                      onClick={() => handleVariantChange(v)}
                      className={`relative h-20 w-20 md:h-28 md:w-28 rounded-2xl bg-gray-200 ${
                        variant === v
                          ? "outline outline-violet-500 outline-4"
                          : ""
                      }`}
                    >
                      {variant === v && (
                        <span className="check-icon absolute top-1 right-1 text-white text-sm">
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            size="2x"
                            className="text-violet-500"
                          />
                        </span>
                      )}
                      <h1 className="text-5xl text-center">{v}</h1>
                    </button>
                    <p className="text-center mt-2">{variantTexts[v]}</p>
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
                      key="public"
                      onClick={() => handleVisible("public")}
                      className={`relative h-20 w-20 md:h-28 md:w-28 mx-2 rounded-2xl bg-gray-200 ${
                        visible === "public"
                          ? "outline outline-violet-500 outline-4"
                          : ""
                      }`}
                    >
                      {visible === "public" && (
                        <span className="check-icon absolute top-2 right-2 text-white text-sm">
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            size="2x"
                            className="text-violet-500"
                          />
                        </span>
                      )}
                      <FontAwesomeIcon
                        icon={faEarth}
                        size="3x"
                        className="justify-center"
                      />
                    </button>
                    <p className="text-center">Public</p>
                  </div>
                  <div className="max-[639px]:text-sm text-center">
                    <button
                      key="private"
                      onClick={() => handleVisible("private")}
                      className={`relative h-20 w-20 md:h-28 md:w-28 mx-2 rounded-2xl bg-gray-200 ${
                        visible === "private"
                          ? `outline ${privateStyle} outline-4`
                          : ""
                      }`}
                    >
                      {visible === "private" && (
                        <span className="check-icon absolute top-2 right-2 text-white text-sm">
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            size="2x"
                            className="text-violet-500"
                          />
                        </span>
                      )}
                      <FontAwesomeIcon
                        icon={faLock}
                        size="3x"
                        className="justify-center"
                      />
                    </button>
                    <p className="text-center">Private</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showUpgradeWindow && (
            <div>
              <UpgradePlanWindow />
            </div>
          )}
        </div>
      ) : (
        <div className="flex max-[639px]:gap-0 md:gap-2 lg:relative lg:-right-1/3 lg:space-x-5">
          {userMode === "full" ? (
            <div>
              <button className="h-20 w-20 md:h-28 md:w-28 rounded-2xl bg-red-600" />
              <p>Full Object</p>
            </div>
          ) : (
            <div>
              <button className="outline outline-gray-300 h-20 w-20 md:h-28 md:w-28 rounded-2xl bg-white"></button>
              <p>Isolated Object</p>
            </div>
          )}
          <div>
            <button className="h-20 w-20 md:h-28 md:w-28 rounded-2xl bg-gray-300">
              <h1 className="text-5xl text-center">{userVariant}</h1>
            </button>
            <p>{variantTexts[userVariant]}</p>
          </div>
          <div>
            <button className="h-20 w-20 md:h-28 md:w-28 rounded-2xl bg-gray-300">
              <FontAwesomeIcon
                icon={visibleModes[userVisibility]}
                size="3x"
                className="justify-center"
              />
            </button>
            <p>{userVisibility}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default IlluTypeSelector;
