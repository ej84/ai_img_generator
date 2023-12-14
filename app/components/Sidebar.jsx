import React from "react";
import { faCirclePlus, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { faWpexplorer } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () => {
  return (
    <div className="fixed md:absolute md:h-full max-[639px]:inset-x-0 max-[639px]:bottom-0 max-[639px]:border max-[639px]:border-t-gray-300 md:top-16 md:left-0 md:border-r bg-white">
      <div className="max-[639px]:flex">
        <div className="p-3 mt-4 text-center text-sm w-full text-gray-500 hover:text-blue-500">
          <button>
            <FontAwesomeIcon icon={faCirclePlus} size="2x" />
            <p>Create</p>
          </button>
        </div>
        <div className="p-3 mt-4 text-center text-sm w-full text-gray-500 hover:text-blue-500">
          <button>
            <FontAwesomeIcon icon={faWpexplorer} size="2x" />
            <p>Explore</p>
          </button>
        </div>
        <div className="p-3 mt-4 text-center text-sm w-full text-gray-500 hover:text-blue-500">
          <button>
            <FontAwesomeIcon icon={faFaceSmile} size="2x" />
            <p>My Illustrations</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
