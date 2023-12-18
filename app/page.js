"use client";
import React, { useState, useRef } from "react";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import ImageGenerator from "./components/ImageGenerator";
import useAuth from "./hooks/useAuth";
import LoginWindow from "./components/LoginWindow";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  const [showLoginWindow, setShowLoginWindow] = useState(false);
  const { user } = useAuth();

  const checkUser = () => {
    if (!user) {
      console.log("You must log in first!");
      setShowLoginWindow(true);
    } else {
      setShowLoginWindow(false);
    }
  };

  return (
    <>
      <Nav />
      <Sidebar />
      <main className="md:pt-16 min-h-screen">
        <div className="hidden md:block md:mb-10 text-center w-full space-x-14">
          <select className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer">
            <option value="">Illustration style</option>
          </select>
          <select className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer">
            <option value="">Color mode</option>
          </select>
          <select className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer">
            <option value="">Illustration type</option>
          </select>
          <select className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer">
            <option value="">Colors amount</option>
          </select>
          <button className=" text-blue-600 underline">Reset</button>
          <button className="border border-solid px-2 py-3 text-white bg-blue-500 rounded-full">
            Apply filter
          </button>

          {showLoginWindow && <LoginWindow />}
        </div>
        <FontAwesomeIcon
          icon={faFilter}
          size="1x"
          className="flex inset-x-1/2 inset-y-1/2 p-3 md:hidden"
        />
        {/*
        <div className="flex w-full justify-center mt-14">
          <div className="grid grid-cols-4">
            <button
              onClick={checkUser}
              className="p-24 mx-7 border border-black"
            >
              <h3>Image</h3>
            </button>
            <button
              onClick={checkUser}
              className="p-24 mx-7 border border-black"
            >
              <h3>Image</h3>
            </button>
            <button
              onClick={checkUser}
              className="p-24 mx-7 border border-black"
            >
              <h3>Image</h3>
            </button>
            <button
              onClick={checkUser}
              className="p-24 mx-7 border border-black"
            >
              <h3>Image</h3>
            </button>
          </div>
  </div>*/}
      </main>
    </>
  );
}
