"use client";
import React from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import ImageGenerator from "../components/ImageGenerator";

export default function page() {
  return (
    <>
      <Nav />
      <Sidebar />
      <main className="md:pt-16 min-h-screen">
        <div className="justify-center items-center">
          <ImageGenerator />
        </div>
      </main>
    </>
  );
}
