import React from "react";

const UpgradePlanWindow = () => {
  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-40">
      <div
        className="bg-white p-10 rounded-lg shadow-xl z-50"
        onClick={handleModalClick}
      >
        <h2 className="text-2xl font-bold mb-4 text-start">
          Upgrade your plan
        </h2>
        <p className="text-sm font-semibold text-start">
          You need to upgrade your plan to perform this action.
        </p>
        {/*<div className="w-36 h-12 mt-5 relative left-56 rounded-full bg-blue-400 text-white">
          <a href="/" className="flex justify-center relative top-3">
            Upgrade now
          </a>
        </div>*/}
        <div>
          <a
            href="/"
            className="flex justify-center w-36 h-12 mt-5 relative left-56 rounded-full top-1 bg-blue-400 text-white"
          >
            <p className="pt-3">Upgrade now</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UpgradePlanWindow;
