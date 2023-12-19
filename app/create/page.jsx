"use client";
import React, { useState } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import IlluStyles from "./components/IlluStyles";
import ColorModeSelector from "./components/ColorModeSelector";
import ColorPicker from "./components/ColorPicker";

const Page = () => {
  const [step, setStep] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState([]);
  const [userInput, setUserInput] = useState({
    promptText: "",
    imageStyle: [],
    // 다른 단계에서 필요한 데이터를 추가로 저장
  });

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // Change user's prompt input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Change Illustration style
  const handleSelectedStyleChange = (selectedStyle) => {
    setUserInput((prevInput) => ({
      ...prevInput,
      imageStyle: selectedStyle,
    }));
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen">
        <Sidebar />
        {step === 1 && (
          <div className="max-[639px]:text-center md:absolute md:top-48 md:left-1/3 space-y-10">
            <h1 className="mt-5 font-bold text-xl md:mt-0 md:text-3xl">
              Describe your illustration
            </h1>
            <div className="max-[639px]:mx-auto border border-solid max-w-xs md:max-w-2xl p-3 rounded-full">
              <input
                name="promptText"
                value={userInput.promptText}
                onChange={handleChange}
                placeholder="Ex: A smiling face of a old woman"
                className="w-full pl-4"
              />
            </div>
            <button
              className="p-3 bg-blue-500 text-white rounded-full"
              onClick={handleNext}
            >
              Create illustration
            </button>
            <ColorPicker />
          </div>
        )}

        {step === 2 && (
          <>
            <div className="flex justify-center w-full h-20 bg-gray-400"></div>
            <div className="max-[639px]:text-center md:absolute md:top-48 md:left-1/3 space-y-10">
              <h1 className="mt-5 font-bold text-xl md:mt-0 md:text-3xl">
                Choose the illustration style
              </h1>
              <div className="max-[639px]:justify-center md:flex md:relative md:-left-10">
                <IlluStyles
                  selectedStyle={userInput.imageStyle}
                  setSelectedStyle={handleSelectedStyleChange}
                />
              </div>
              <button
                onClick={handleBack}
                className="text-blue-500 absolute left-10 bottom-72 md:left-0 md:-bottom-20"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-500 px-5 py-3 rounded-full text-white absolute right-16"
              >
                Continue
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="max-[639px]:text-center md:absolute md:top-48 md:left-1/3 space-y-10">
            <h1 className="mt-5 font-bold text-xl md:mt-0 md:text-3xl">
              Choose the color mode
            </h1>
            <div className="max-[639px]:justify-center md:flex md:relative">
              <ColorModeSelector />
            </div>
            <button
              onClick={handleBack}
              className="text-blue-500 absolute left-10 bottom-72 md:left-0 md:-bottom-20"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-blue-500 px-5 py-3 rounded-full text-white absolute right-16"
            >
              Continue
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="max-[639px]:text-center md:absolute md:top-48 md:left-1/3 space-y-10">
            <h1 className="mt-5 font-bold text-xl md:mt-0 md:text-3xl">
              Choose the illustration type
            </h1>
            <div className="max-[639px]:justify-center md:flex md:relative">
              types
            </div>
            <button
              onClick={handleBack}
              className="text-blue-500 absolute left-10 bottom-72 md:left-0 md:-bottom-20"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-blue-500 px-5 py-3 rounded-full text-white absolute right-16"
            >
              Continue
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="max-[639px]:text-center md:absolute md:top-48 md:right-1/4 space-y-10">
            <h1>test</h1>
            <p>Confirm your input:</p>
            <p>Prompt: {userInput.promptText}</p>
            <p>Style: {userInput.imageStyle}</p>
            {/* 다른 입력 확인 */}
            <button onClick={handleBack}>Back</button>
            <button
              onClick={() => {
                /* 이미지 생성 요청 로직 */
              }}
            >
              Generate Image
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
