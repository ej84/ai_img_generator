import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import AuthButton from "./AuthButton";
import UserProfile from "./UserProfile";
import Link from "next/link";
import UpgradePlan from "./UpgradePlan";

const Nav = () => {
  const { user } = useAuth();
  const loginStyle = "md:hidden";
  const loginStyle2 = "hidden md:block";

  return (
    <nav className="bg-white px-2 py-2 border border-x-transparent border-b-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Logo */}
        <div className="flex justify-between md:justify-start">
          <Link href="/">
            <h1 className="text-2xl mt-1 font-bold">LOGO</h1>
          </Link>
          {user ? (
            <UserProfile style={loginStyle} />
          ) : (
            <AuthButton
              title="Log in for more"
              style={loginStyle}
              user={user}
            />
          )}
        </div>

        {/* Search Bar */}
        <div className="flex mt-2 md:mt-0 md:w-1/2 lg:w-1/3">
          <input
            className="flex-grow p-2 pl-5 border border-gray-300 rounded-full md:mx-4"
            type="search"
            placeholder="Search for an illustration..."
          />
          <button className="hidden lg:block relative right-28 px-4 my-1 border border-violet-500 bg-white text-violet-500 rounded-full hover:bg-violet-500 hover:text-white">
            Search
          </button>

          {/* Upgrade Button */}
          <UpgradePlan title="Upgrade" />
        </div>

        {/* Login Button - hidden on small screens, shown on medium screens and above */}
        {user ? (
          <UserProfile style={loginStyle2} />
        ) : (
          <AuthButton title="Log in for more" style={loginStyle2} />
        )}
      </div>
    </nav>
  );
};

export default Nav;
