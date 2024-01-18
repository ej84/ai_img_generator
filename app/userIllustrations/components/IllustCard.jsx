"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faPencil,
  faShare,
  faCopy,
  faSearchPlus,
  faPaperclip,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import sendEmail from "@/app/utils/email";

const IllustCard = ({ illustration }) => {
  const [isHovering, setIsHovering] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(illustration.img_url);
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

  const handleShareClick = async () => {
    sendEmail();
  };

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative outline outline-gray-200"
    >
      <img
        src={illustration.img_url}
        width="300"
        height="300"
        alt={illustration.imagePrompt}
      />
      {isHovering && (
        <>
          <div className="absolute top-2 right-3 bg-gray-200 px-4 py-2 rounded-full">
            <div className="space-x-2">
              <button className="pr-2" onClick={copyToClipboard}>
                <FontAwesomeIcon icon={faPaperclip} />
              </button>
              <button className="pl-2" onClick={copyToClipboard}>
                <FontAwesomeIcon icon={faEllipsis} />
              </button>
            </div>
          </div>
          <div className="absolute top-14 right-5 w-3/5 ">
            <div className="flex flex-col bg-white rounded-md outline outline-gray-300">
              <div className="my-2 hover:bg-gray-300">
                <Link href="/" className="px-3 my-2 text-sm font-semibold">
                  <FontAwesomeIcon icon={faSearchPlus} />
                  <p className="inline text-sm font-semibold pl-2">
                    Open illustration
                  </p>
                </Link>
              </div>
              <div className="mx-2 border border-gray-300"></div>
              <div className="my-1 hover:bg-gray-300">
                <button
                  onClick={() => downloadImage("svg")}
                  className="px-3 my-1 text-left"
                >
                  <FontAwesomeIcon icon={faDownload} />
                  <p className="inline text-sm font-sans font-semibold pl-2">
                    Download
                  </p>
                </button>
              </div>
              <div className="my-1 hover:bg-gray-300">
                <button className="px-3 my-1 text-left">
                  <FontAwesomeIcon icon={faPencil} />
                  <p className="inline text-sm font-sans font-semibold pl-2">
                    Edit
                  </p>
                </button>
              </div>
              <div className="my-1 hover:bg-gray-300">
                <button
                  className="px-3 my-1 text-left"
                  onClick={() => handleShareClick()}
                >
                  <FontAwesomeIcon icon={faShare} />
                  <p className="inline text-sm font-sans font-semibold pl-2">
                    Share
                  </p>
                </button>
              </div>
              <div className="my-1 hover:bg-gray-300">
                <button className="px-3 my-1 text-left">
                  <FontAwesomeIcon icon={faCopy} />
                  <p className="inline text-sm font-sans font-semibold pl-2">
                    Copycat
                  </p>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IllustCard;
