"use client";
import React, { useState, useRef } from "react";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
//import ImageGenerator from "./components/ImageGenerator";

export default function Home() {
  const [renderedImages, setRenderedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const resp = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputText }),
      });

      console.log(resp);

      if (!resp.ok) {
        throw new Error("Unable to generate the image");
      }

      const data = await resp.json();
      console.log(data);

      setRenderedImages(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <main className="md:pt-24 min-h-screen">
        <Sidebar />

        <h2 className="fixed right-2/3">Prompt</h2>
        <input
          type="text"
          className="fixed right-2/3 outline-none py-2 px-6 bg-gray-600 rounded-3xl text-sm"
          placeholder="enter description"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={handleGenerateImage}
          className="fixed right-1/2 bottom-1/2 bg-lime-600 rounded-3xl uppercase"
        >
          {loading ? "Generating, please wait" : "Generate"}
        </button>

        {renderedImages.length === 0 && (
          <div className="bg-gray-600 p-10 fixed right-1/2">
            Image will show up here
          </div>
        )}

        {renderedImages.map((image) => {
          return <img key={image.url} src={image.url} />;
        })}

        {/*flex-col items-center justify-between p-24">*/}
      </main>
    </>
  );
}
