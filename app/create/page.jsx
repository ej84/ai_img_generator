"use client";
import React, { useState } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import ImageGenerator from "../components/ImageGenerator";
import IlluStyles from "./components/IlluStyles";

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
      <div className="md:pt-16 min-h-screen">
        <Sidebar />
        {step === 1 && (
          <div className="max-[639px]:text-center md:relative md:left-1/4 space-y-10">
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
              className="md:absolute md:right-28 lg:right-3/4 p-3 bg-blue-500 text-white rounded-full"
              onClick={handleNext}
            >
              Create illustration
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="max-[639px]:text-center md:relative md:left-1/3 space-y-10">
            <h1 className="mt-5 font-bold text-xl md:mt-0 md:text-2xl md:relative md:-left-5">
              Choose the illustration style
            </h1>
            <div className="max-[639px]:justify-center md:flex md:relative md:-left-10">
              <IlluStyles
                selectedStyle={userInput.imageStyle}
                setSelectedStyle={handleSelectedStyleChange}
              />
            </div>
            <button onClick={handleBack} className="relative -left-5">
              Back
            </button>
            <button onClick={handleNext}>Next</button>
          </div>
        )}

        {/* 여기에 다른 단계의 UI 구성 요소를 추가 */}

        {step === 3 && (
          <div className="max-[639px]:text-center md:relative md:left-1/4 space-y-10">
            <h1>test</h1>
            <p>Confirm your input:</p>
            <p>Prompt: {userInput.promptText}</p>
            <p>Style: {userInput.imageStyle}</p>
            {/* 다른 입력 확인 */}
            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext}>Next</button>
          </div>
        )}

        {step === 4 && (
          <div className="max-[639px]:text-center md:relative md:left-1/4 space-y-10">
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
