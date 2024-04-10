import React, { useState, useEffect } from "react";
import { generateImage } from "../utils/illustroke";
import {
  collection,
  addDoc,
  getDocs,
  QuerySnapshot,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/initFirebase";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await generateImage(
        "flat",
        "a pink rose",
        "full",
        "color",
        1
      );
      const respText = await data.text();
      console.log(respText);

      const svgString = respText.match(/<svg.*<\/svg>/);

      const cleanedSvgStr = svgString[0].replace(/\\/g, "");

      const svgData = cleanedSvgStr;

      const blob = new Blob([svgData], { type: "image/svg+xml" });

      const url = URL.createObjectURL(blob);

      setImageUrl(url);

      console.log(url);

      await addDoc(collection(db, "testData"), {
        img_url: url,
      });

      return () => URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt"
          className="border border-amber-700"
        />
        <button type="submit">Generate Image</button>
      </form>
      {/*
      <div className="fixed top-1/2 right-1/2">
        {fetchData && <a href={fetchData}>{fetchData}</a>}
      </div>
  */}
      {loading && <p>Loading...</p>}

      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt="SVG Image"
            width="100"
            height="100"
            className="fixed inset-x-1/3 bottom-10"
          />
          <p>
            Image URL: <a href={imageUrl}>{imageUrl}</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
