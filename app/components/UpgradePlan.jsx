import React from "react";

const UpgradePlan = ({ title }) => {
  return (
    <div className="py-2 w-28 rounded-full bg-violet-200 text-violet-600 text-center">
      <a href="/subscription">
        <p>{title}</p>
      </a>
    </div>
  );
};

export default UpgradePlan;
