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
      <main className="md:pt-24 min-h-screen">
        <Sidebar />
        <div className="relative top-5 left-52 w-full h-20 space-x-20">
          <select className="border border-solid px-2 py-3 rounded-full">
            <option value="">Illustration style</option>
          </select>
          <select className="border border-solid px-2 py-3 rounded-full">
            <option value="">Color mode</option>
          </select>
          <select className="border border-solid px-2 py-3 rounded-full">
            <option value="">Illustration type</option>
          </select>
          <select className="border border-solid px-2 py-3 rounded-full">
            <option value="">Colors amount</option>
          </select>
          <button className="relative left-64 text-blue-600 underline">
            Reset
          </button>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-4">
            <button onClick={checkUser}>
              <h3 className="p-24 border border-black">Image</h3>
            </button>
          </div>
        </div>
        {showLoginWindow && <LoginWindow />}
      </main>
    </>
  );
}
