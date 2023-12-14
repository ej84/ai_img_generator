"use client";
import React, { useState, useRef } from "react";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import ImageGenerator from "./components/ImageGenerator";
import useAuth from "./hooks/useAuth";
import LoginWindow from "./components/LoginWindow";

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
      <main className="md:pt-24 min-h-screen">
        {/*<div className="flex">
          <div className="relative top-5 left-52 w-full h-20 space-x-20">
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
            <button className="relative left-64 text-blue-600 underline">
              Reset
            </button>
            <button className="relative left-52 border border-solid px-2 py-3 text-white bg-blue-500 rounded-full">
              Apply filter
            </button>
          </div>
          {showLoginWindow && <LoginWindow />}
        </div>
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
