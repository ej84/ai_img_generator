"use client";
import React, { useState, useRef } from "react";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import ImageGenerator from "./components/ImageGenerator";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="md:pt-24 min-h-screen">
        <Sidebar />
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-4">
            <h3 className="p-24 border border-black">Image</h3>
          </div>
        </div>
      </main>
    </>
  );
}
