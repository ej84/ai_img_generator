import React, { useState } from "react";
import { db } from "@/app/firebase/initFirebase";
import {
  collection,
  doc,
  updateDoc,
  setDoc,
  increment,
} from "firebase/firestore";

const DownloadWindow = ({ illustration, docRef, userId }) => {
  const [format, setFormat] = useState("SVG");
  const [resolution, setResolution] = useState("1024px");

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handleResolutionChange = (event) => {
    setResolution(event.target.value);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleDownload = () => {
    onDownload(format);
  };

  const incrementDownloadCount = async (illustrationId) => {
    console.log(userId);
    if (docRef === "explore") {
      await updateDoc(doc(db, "publicImages", illustrationId), {
        downloadCount: increment(1),
      });
    } else if (docRef === "user") {
      await setDoc(
        doc(db, "users", userId, "illustrations", illustrationId),
        {
          downloadCount: increment(1),
        },
        { merge: true }
      );
    }
  };

  const downloadSvgFile = async () => {
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
    incrementDownloadCount(illustration.id);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-40">
      <div
        className="absolute top-28 bg-white p-10 rounded-md shadow-xl z-50"
        onClick={handleModalClick}
      >
        <div className="relative bottom-3">
          <h2 className="font-bold text-2xl">Download illustration</h2>
        </div>
        <div className="mt-3 grid grid-cols-4 space-x-3">
          <button
            className="outline outline-1 outline-gray-300 rounded-full p-2"
            value="1024px"
            checked={format === "PNG"}
            onChange={handleFormatChange}
          >
            PNG(1024px)
          </button>
          <button
            className="outline outline-1 outline-gray-300 rounded-full p-2"
            value="256px"
            checked={format === "PNG"}
            onChange={handleFormatChange}
          >
            PNG(256px)
          </button>
          <button
            className="outline outline-1 outline-gray-300 rounded-full p-2"
            value="512px"
            checked={format === "PNG"}
            onChange={handleFormatChange}
          >
            PNG(512px)
          </button>
          <button
            className="outline outline-1 outline-gray-300 rounded-full p-2"
            value="SVG"
            checked={format === "SVG"}
            onChange={handleFormatChange}
          >
            VECTOR(SVG)
          </button>
        </div>
        <div className="text-end mt-7">
          <button
            className="bg-blue-500 rounded-full px-5 py-3 text-white"
            onClick={downloadSvgFile}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadWindow;
