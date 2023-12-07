import React, { useState } from "react";

const ImageGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/illustrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputText }),
      });
      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(imageUrl);
    alert("Image URL copied to clipboard!");
  };

  return (
    <div className="fixed inset-y-1/2 right-96">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border border-indigo-700"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter a description..."
        />
        <button type="submit">Generate Image</button>
      </form>

      {loading && <p>Loading...</p>}

      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Generated" />
          <button onClick={handleCopyUrl}>Copy Image URL</button>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
