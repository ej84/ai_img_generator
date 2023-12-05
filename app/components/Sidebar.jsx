import React from "react";

const Sidebar = () => {
  return (
    <div className="fixed inset-y-24 left-0 bg-white border-r">
      <button className="block p-3 mt-4 text-center text-sm w-full hover:bg-gray-100">
        Create
      </button>
      <button className="block p-3 mt-4 text-center text-sm w-full hover:bg-gray-100">
        Explore
      </button>
      <button className="block p-3 mt-4 text-center text-sm w-full hover:bg-gray-100">
        My Illustrations
      </button>
    </div>
  );
};

export default Sidebar;
