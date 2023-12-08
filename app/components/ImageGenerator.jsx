import React, { useState, useRef } from "react";

const ImageGenerator = () => {
  const promptRef = useRef();

  const appendPrompt = (word) => {
    promptRef.current.value = promptRef.current.value.concat(", ", word);
  };

  const [inputText, setInputText] = useState("");
  const [renderedImage, setRenderedImage] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputText }),
      });

      if (!response.ok) {
        throw new Error("Error generating an image");
      }
      console.log(response);
      const data = await response.json();
      setRenderedImage(data.data);
      setImageUrl(data.imageUrl);
      console.log(data);
    } catch (error) {
      console.log(error.message);
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

      {renderedImage.length === 0 && (
        <div className="bg-gray-600 aspect-square flex items-center justify-center">
          Image will show up here
        </div>
      )}

      {renderedImage.map((image) => {
        return <img key={image.url} src={image.url} />;
      })}

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
