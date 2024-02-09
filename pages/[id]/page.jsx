"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Nav from "@/app/components/Nav";
import Sidebar from "@/app/components/Sidebar";
import { db } from "@/app/firebase/initFirebase";
import { doc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faFileLines,
  faFillDrip,
  faHeart,
  faImage,
  faPalette,
  faPaperPlane,
  faPaperclip,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

const Page = () => {
  const router = useRouter();
  const [illustName, setIllustName] = useState("");
  const [illustStyle, setIllustStyle] = useState("");
  const [createdTime, setCreatedTime] = useState("");
  const [illustUrl, setIllustUrl] = useState("");
  const [colorMode, setColorMode] = useState("");
  const [colorAmount, setColorAmount] = useState(0);
  const [downloadCount, setDownloadCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;

        if (id) {
          // `id` 값이 존재하는지 확인
          try {
            const docRef = doc(db, "publicImages", id); // 문서 참조 생성
            const docSnap = await getDoc(docRef); // 문서 데이터 가져오기

            if (docSnap.exists()) {
              const data = docSnap.data();
              const createdAt = data.created_at.toDate();
              const formattedDate = createdAt.toLocaleDateString("en-US", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              });
              setIllustName(data.imagePrompt);
              setIllustStyle(data.style[0]);
              setCreatedTime(formattedDate);
              setIllustUrl(data.img_url);
              setColorMode(data.color);
              setColorAmount(data.count);
              setDownloadCount(data.downloadCount);
            } else {
              // 문서가 존재하지 않음
              console.log("No such document!");
            }
          } catch (error) {
            console.error("Error getting document:", error);
          }
        }
      }
    };

    fetchData();
  }, [router.isReady, router.query]);

  return (
    <div>
      <Nav />
      <Sidebar />
      <div className="md:pt-16 min-h-screen md:absolute md:left-48 lg:left-72 w-full">
        <div className="float-left">
          <p className="text-sm text-gray-400">Created at {createdTime}</p>
          <h1 className="text-4xl font-bold">{illustName}</h1>
          <h3 className="text-2xl mt-2">{illustStyle}</h3>
          <div className="relative right-2 mt-5 space-x-2">
            <button className="px-7 py-3 rounded-full bg-violet-600 text-white">
              <FontAwesomeIcon
                icon={faPencil}
                size="1x"
                className="relative right-2"
              />
              Edit
            </button>
            <button className="px-9 py-3 rounded-full bg-violet-200 text-violet-600">
              <FontAwesomeIcon
                icon={faPaperPlane}
                size="1x"
                className="relative right-4"
              />
              Share
            </button>
            <button className="px-9 py-3 rounded-full bg-violet-200 text-violet-600">
              <FontAwesomeIcon
                icon={faPaperclip}
                size="1x"
                className="relative right-4"
              />
              Copy link
            </button>
            <button className="px-9 py-3 rounded-full bg-violet-200 text-violet-600">
              <FontAwesomeIcon
                icon={faDownload}
                size="1x"
                className="relative right-4"
              />
              Download
            </button>
          </div>
          <div className="mt-9 border border-y-1"></div>
          <div className="space-y-1">
            <h2 className="mt-2 font-bold">
              <FontAwesomeIcon icon={faFileLines} size="1x" className="mr-1" />
              Illustration Prompt
            </h2>
            <p>{illustName}</p>
          </div>
          <div className="mt-7 border border-y-1"></div>
          <div className="space-y-1">
            <h2 className="mt-2 font-bold">
              <FontAwesomeIcon
                icon={faHeart}
                size="1x"
                className="inline-block mr-1"
              />
              Illustration Name
            </h2>
            <p>{illustName}</p>
          </div>
          <div className="mt-7 border border-y-1"></div>
          <div className="space-y-1">
            <h2 className="mt-2 font-bold">
              <FontAwesomeIcon icon={faImage} size="1x" className="mr-1" />
              Illustration Style
            </h2>
            <p>{illustStyle}</p>
          </div>
          <div className="mt-7 border border-y-1"></div>
          <div className="space-y-1">
            <h2 className="mt-2 font-bold">
              <FontAwesomeIcon icon={faPalette} size="1x" className="mr-1" />
              Colors amount
            </h2>
            <p>{colorAmount}</p>
          </div>
          <div className="mt-7 border border-y-1"></div>
          <div className="space-y-1">
            <h2 className="mt-2 font-bold">
              <FontAwesomeIcon icon={faFillDrip} size="1x" className="mr-1" />
              Color mode
            </h2>
            <p>{colorMode}</p>
          </div>
        </div>
        <div className="float-right relative right-1/3">
          <img src={illustUrl} width="300" height="300" alt="illust" />
          <div className="absolute bg-white bottom-2 left-2 px-2 rounded-lg space-x-1">
            <FontAwesomeIcon icon={faDownload} />
            <p className="inline text-sm">{downloadCount}</p>
            <FontAwesomeIcon icon={faPalette} />
            <p className="inline text-sm">{colorAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
