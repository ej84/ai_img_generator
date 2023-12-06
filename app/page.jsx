"use client";
import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="md:pt-24 min-h-screen">
        <Sidebar />
        {/*flex-col items-center justify-between p-24">*/}
      </main>
    </>
  );
}
