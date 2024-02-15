import React from "react";
import UpgradePlan from "./UpgradePlan";

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
        <div className="flex mt-5 justify-end">
          <UpgradePlan title="Upgrade now" />
        </div>
      </div>
    </div>
  );
};

export default UpgradePlanWindow;
