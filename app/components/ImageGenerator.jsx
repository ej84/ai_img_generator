import React, { useState } from "react";
import { generateImage } from "../utils/illustroke";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await generateImage(prompt);
      setImageUrl(data.data[0].url); // Retrieve the first image data
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-1/2 right-96">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt"
          className="border border-indigo-700"
        />
        <button type="submit">Generate Image</button>
      </form>

      {loading && <p>Loading...</p>}

      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt="Generated"
            width="230"
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
