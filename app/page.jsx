"use client";
import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import ImageGenerator from "./components/ImageGenerator";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="md:pt-24 min-h-screen">
        <Sidebar />

        <ImageGenerator />

        {/*flex-col items-center justify-between p-24">*/}
      </main>
    </>
  );
}
