import React, { useState } from "react";
import { faCirclePlus, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { faWpexplorer } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import userAuth from "../firebase/userAuth";
import LoginWindow from "./LoginWindow";

const Sidebar = () => {
  const { user } = userAuth();
  const [showLoginWindow, setShowLoginWindow] = useState(false);

  const handleLoginWindow = (e) => {
    if (!user) {
      e.preventDefault();
      setShowLoginWindow(true);
    } else {
      setShowLoginWindow(false);
    }
  };

  return (
    <div className="fixed md:flex md:absolute md:h-full max-[639px]:inset-x-0 max-[639px]:bottom-0 max-[639px]:border max-[639px]:border-t-gray-300 md:top-16 md:left-0 md:border-r bg-white z-10">
      <div className="max-[639px]:flex">
        <div
          className="p-3 mt-4 text-center text-sm w-full text-gray-500 hover:text-violet-500"
          onClick={handleLoginWindow}
        >
          <a href="/create">
            <FontAwesomeIcon
              icon={faCirclePlus}
              size="2x"
              style={{ width: "30px", height: "30px" }}
            />
            <p>Create</p>
          </a>
        </div>
        <div className="p-3 mt-4 text-center text-sm w-full text-gray-500 hover:text-violet-500 focus:text-violet-500">
          <a href="/">
            <FontAwesomeIcon icon={faWpexplorer} size="2x" />
            <p>Explore</p>
          </a>
        </div>
        <div
          className="p-3 mt-4 text-center text-sm w-full text-gray-500 hover:text-violet-500 focus:text-violet-500"
          onClick={handleLoginWindow}
        >
          <a href="/userIllustrations">
            <FontAwesomeIcon
              icon={faFaceSmile}
              size="2x"
              style={{ width: "30px", height: "30px" }}
            />
            <p>My Illustrations</p>
          </a>
        </div>
      </div>
      {showLoginWindow && (
        <div onClick={() => setShowLoginWindow(false)}>
          <LoginWindow />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
