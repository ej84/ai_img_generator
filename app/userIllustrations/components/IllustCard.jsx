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
import DownloadWindow from "./DownloadWindow";

const IllustCard = ({ illustration }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showDownloadWindow, setShowDownloadWindow] = useState(false);

  const imageUrl = illustration.img_url;

  const handleDownloadWindow = (e) => {
    if (!showDownloadWindow) {
      e.preventDefault();
      setShowDownloadWindow(true);
    } else {
      setShowDownloadWindow(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(imageUrl);
  };

  const downloadSvgFile = async (format) => {
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
    const email = prompt("Enter email address to share this illustration");

    if (email && /\S+@\S+\.\S+/.test(email)) {
      try {
        await fetch("/api/sendShareLink/route", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, imageUrl }),
        });

        // 성공 시 로그
        console.log("POST request successful");
      } catch (error) {
        // 오류 시 로그
        console.error("Error sending POST request:", error.message);
      }
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const handleHovering = () => {
    setIsHovering(false);
    if (isClicked) {
      setIsClicked(false);
    }
  };

  const handleClicked = () => {
    if (isClicked) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleHovering}
      className="relative outline outline-gray-200"
    >
      <img
        src={illustration.img_url}
        width="300"
        height="300"
        alt={illustration.imagePrompt}
      />
      <div className="absolute bottom-2 left-2 space-x-1">
        <FontAwesomeIcon icon={faDownload} />
        <p className="inline text-sm">{illustration.downloadCount}</p>
      </div>
      {isHovering && (
        <div className="absolute top-2 right-3 bg-gray-200 px-4 py-2 rounded-full">
          <div className="space-x-2">
            <button className="pr-2" onClick={copyToClipboard}>
              <FontAwesomeIcon icon={faPaperclip} />
            </button>
            <button className="pl-2" onClick={handleClicked}>
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
          </div>
        </div>
      )}
      {isClicked && (
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
            {/*<div className="my-1 hover:bg-gray-300">
              <button
                onClick={() => setShowDownloadWindow(true)}
                className="px-3 my-1 text-left"
              >
                <FontAwesomeIcon icon={faDownload} />
                <p className="inline text-sm font-sans font-semibold pl-2">
                  Download
                </p>
              </button>
      </div>*/}
            <div className="my-1 hover:bg-gray-300">
              <button
                onClick={() => setShowDownloadWindow(true)}
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
      )}
      {showDownloadWindow && (
        <div onClick={() => setShowDownloadWindow(false)}>
          <DownloadWindow illustration={illustration} />
        </div>
      )}
    </div>
  );
};

export default IllustCard;
