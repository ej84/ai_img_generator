import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faPencil,
  faShare,
  faCopy,
  faSearchPlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
      className="relative"
    >
      <img
        src={illustration.img_url}
        width="300"
        height="300"
        alt={illustration.imagePrompt}
      />
      {isHovering && (
        <div className="absolute top-8 right-5 w-3/5">
          <div className="flex flex-col bg-white rounded-md outline outline-gray-300">
            {/*<button className="text-left" onClick={copyToClipboard}>
              Copy Link
            </button>*/}
            <Link href="/" className="px-3 my-3 text-sm font-semibold">
              <FontAwesomeIcon icon={faSearchPlus} />
              <p className="inline text-sm font-semibold pl-2">
                Open illustration
              </p>
            </Link>
            <div className="mx-2 border border-gray-300"></div>
            <button
              onClick={() => downloadImage("svg")}
              className="px-3 my-2 text-left"
            >
              <FontAwesomeIcon icon={faDownload} />
              <p className="inline text-sm font-sans font-semibold pl-2">
                Download
              </p>
            </button>
            <button className="px-3 my-2 text-left">
              <FontAwesomeIcon icon={faPencil} />
              <p className="inline text-sm font-sans font-semibold pl-2">
                Edit
              </p>
            </button>
            <button className="px-3 my-2 text-left">
              <FontAwesomeIcon icon={faShare} />
              <p className="inline text-sm font-sans font-semibold pl-2">
                Share
              </p>
            </button>
            <button className="px-3 my-2 text-left">
              <FontAwesomeIcon icon={faCopy} />
              <p className="inline text-sm font-sans font-semibold pl-2">
                Copycat
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IllustCard;
