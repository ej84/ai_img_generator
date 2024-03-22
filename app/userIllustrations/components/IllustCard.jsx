"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faPencil,
  faShare,
  faCopy,
  faSearchPlus,
  faPaperclip,
  faEllipsis,
  faPalette,
  faEarth,
  faLock,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import DownloadWindow from "./DownloadWindow";
import { useMediaQuery } from "@mui/material";
import { db } from "@/app/firebase/initFirebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const IllustCard = ({ illustration, docRef, userId }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showDownloadWindow, setShowDownloadWindow] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isSm = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    if (isSm) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  }, [isSm]);

  const imageUrl = illustration.img_url;
  const id = illustration.id;
  const targetUrl = `/create?id=${encodeURIComponent(id)}&docRef=${docRef}`;

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
          body: JSON.stringify({ email, imageUrl, id }),
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
    if (isSm) {
      if (isClicked) {
        setIsDropdownOpen(false);
      } else {
        setIsDropdownOpen(true);
      }
    }
    if (isClicked) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  };
  /*
  const handleCopyCat = (id) => {
    Navigate(`/create?id=${id}`);
  };*/

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleHovering}
      className="relative outline outline-gray-200 max-[639px]:w-40 max-[639px]:left-4"
    >
      <img
        src={illustration.img_url}
        width="250"
        height="250"
        alt={illustration.imagePrompt}
      />
      <div className="absolute bg-white bottom-2 left-2 px-2 rounded-lg space-x-1">
        <FontAwesomeIcon icon={faDownload} />
        <p className="inline text-sm">{illustration.downloadCount}</p>
        <FontAwesomeIcon icon={faPalette} />
        <p className="inline text-sm">{illustration.count}</p>
      </div>
      {isHovering && (
        <div className="absolute top-2 right-3 bg-gray-200 px-2 md:px-4 py-2 rounded-full">
          <div className="max-[640px]:mr-2 space-x-1 md:space-x-2">
            <button
              className="max-[640px]:hidden pr-2"
              onClick={copyToClipboard}
            >
              <FontAwesomeIcon icon={faPaperclip} />
            </button>
            <button className="pl-2" onClick={handleClicked}>
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
          </div>
        </div>
      )}
      {isClicked && (
        <>
          {isSm ? (
            <div>
              {isDropdownOpen && (
                <div
                  className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center z-40 md:hidden"
                  style={{ maxWidth: "430px" }}
                >
                  <div
                    className={`absolute bottom-0 w-full bg-white ${
                      docRef === "explore" ? "h-72" : "h-1/2"
                    } rounded-t-xl`}
                  >
                    <div className="">
                      <Link
                        href={`/${encodeURIComponent(illustration.id)}/page`}
                        className="flex p-5 border border-b-2 border-b-gray-300 border-t-0 px-3 my-3 font-semibold w-full h-full"
                      >
                        <div className="ml-3">
                          <FontAwesomeIcon icon={faSearchPlus} size="1x" />
                          <p className="inline text-sm ml-2 font-semibold">
                            Open illustration
                          </p>
                        </div>
                      </Link>
                      <button
                        onClick={() => setShowDownloadWindow(true)}
                        className="flex p-3 text-left w-full h-full"
                      >
                        <div className="ml-3">
                          <FontAwesomeIcon icon={faDownload} />
                          <p className="inline text-xs font-sans font-semibold pl-2">
                            Download
                          </p>
                        </div>
                      </button>
                      <button className="flex p-3 text-left w-full h-full">
                        <div className="ml-3">
                          <FontAwesomeIcon icon={faPencil} />
                          <p className="inline text-sm font-sans font-semibold pl-2">
                            Edit
                          </p>
                        </div>
                      </button>
                      <button
                        onClick={() => handleShareClick()}
                        className="flex p-3 text-left w-full h-full"
                      >
                        <div className="ml-3">
                          <FontAwesomeIcon icon={faShare} />
                          <p className="inline text-sm font-sans font-semibold pl-2">
                            Share
                          </p>
                        </div>
                      </button>
                      <Link
                        href={targetUrl}
                        className="flex p-3 text-left w-full h-full"
                      >
                        <div className="ml-3">
                          <FontAwesomeIcon icon={faCopy} />
                          <a className="inline text-sm font-sans font-semibold pl-2">
                            Copycat
                          </a>
                        </div>
                      </Link>
                      <div className="flex p-2 row-span-1 border border-t-2 border-y-0 border-t-gray-300"></div>
                      {docRef === "user" ? (
                        <div>
                          <div className="flex ml-5">
                            <p className="text-sm font-bold text-gray-400">
                              Illustration Visibility
                            </p>
                            <div className="rounded-full px-1.5 bg-violet-600 ml-2">
                              <FontAwesomeIcon
                                icon={faCrown}
                                className="text-white"
                              />
                            </div>
                          </div>
                          <button className="flex p-3 w-full h-full">
                            <div className="ml-3">
                              <FontAwesomeIcon icon={faEarth} />
                              <p className="inline text-sm font-sans font-semibold pl-2">
                                Public
                              </p>
                            </div>
                          </button>
                          <button className="flex p-3 w-full h-full">
                            <div className="ml-3">
                              <FontAwesomeIcon icon={faLock} />
                              <p className="inline text-sm font-sans font-semibold pl-2">
                                Private
                              </p>
                            </div>
                          </button>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="absolute top-14 right-5 w-3/5 z-10">
              <div className="flex flex-col bg-white rounded-md outline outline-gray-300">
                <div className="my-2 hover:bg-gray-300">
                  <Link
                    href={`/${encodeURIComponent(illustration.id)}/page`}
                    className="px-3 my-2 text-sm font-semibold"
                  >
                    <FontAwesomeIcon icon={faSearchPlus} />
                    <p className="inline text-xs ml-2 font-semibold">
                      Open illustration
                    </p>
                  </Link>
                </div>
                <div className="mx-2 border border-gray-300"></div>
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
                  <Link href={targetUrl} className="px-3 my-1 text-left">
                    <FontAwesomeIcon icon={faCopy} />
                    <a className="inline text-sm font-sans font-semibold pl-2">
                      Copycat
                    </a>
                  </Link>
                </div>
                <div className="mx-2 border border-gray-300"></div>
                {docRef === "user" && (
                  <>
                    <div className="w-full h-full">
                      <p className="text-xs ml-1 pt-1 font-bold text-gray-400">
                        Illustration Visibility
                        <FontAwesomeIcon
                          icon={faCrown}
                          className="text-white rounded-full px-1 ml-1 bg-violet-600"
                        />
                      </p>
                    </div>
                    <button className="px-3 my-1 text-left hover:bg-gray-300">
                      <FontAwesomeIcon icon={faEarth} />
                      <p className="inline text-sm font-sans font-semibold pl-2">
                        Public
                      </p>
                    </button>
                    <button className="flex p-3 w-full h-full hover:bg-gray-300">
                      <FontAwesomeIcon icon={faLock} />
                      <p className="inline text-sm font-sans font-semibold pl-2">
                        Private
                      </p>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
      {showDownloadWindow && (
        <div onClick={() => setShowDownloadWindow(false)}>
          <DownloadWindow
            illustration={illustration}
            docRef={docRef}
            userId={userId}
          />
        </div>
      )}
    </div>
  );
};

export default IllustCard;
