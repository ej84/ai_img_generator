import React from "react";

export const StepIndicator = ({ currStep, onStepChange }) => {
  return (
    <div className="flex items-center justify-center space-x-0">
      {[2, 3, 4, 5].map((step) => (
        <>
          <div key={step} className="flex items-center">
            <div
              className={`cursor-pointer w-5 h-5 rounded-full flex items-center justify-center ${
                step <= currStep ? "bg-violet-500" : "bg-gray-300"
              }`}
              onClick={() => step <= currStep && onStepChange(step)}
            ></div>
            {step < 5 && (
              <div
                className={`${
                  step < currStep ? "bg-violet-500" : "bg-gray-300"
                } h-1 flex-1`}
              ></div>
            )}
          </div>
          <div
            className={`w-12 h-1 ${step < 5 ? "" : "hidden"} ${
              step < currStep ? "bg-violet-500" : "bg-gray-300"
            }`}
          ></div>
        </>
      ))}
    </div>
  );
};

export default StepIndicator;
