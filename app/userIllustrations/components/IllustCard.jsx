import React, { useState } from "react";

const IllustCard = ({ illustration }) => {
  const [isHovering, setIsHovering] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(illustration.img_url);
    console.log("Link copied to clipboard!");
  };

  const downloadImage = async (format) => {
    const response = await fetch(illustration.img_url);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `illustration.${format}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img
        src={illustration.img_url}
        width="240"
        height="240"
        alt={illustration.imagePrompt}
      />
      {isHovering && (
        <div className="popup">
          <button onClick={copyToClipboard}>Copy Link</button>
          <button onClick={() => downloadImage("svg")}>Download SVG</button>
          <button onClick={() => downloadImage("png")}>Download PNG</button>
          {/* Share link 버튼은 별도의 로직이 필요할 수 있습니다. */}
        </div>
      )}
    </div>
  );
};

export default IllustCard;
