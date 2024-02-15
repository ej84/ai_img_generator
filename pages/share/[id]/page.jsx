"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "@/app/firebase/initFirebase";
import { doc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faFillDrip,
  faHeart,
  faImage,
  faPalette,
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
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="outline outline-2 outline-gray-300 rounded-2xl">
        <div className="flex">
          <div className="float-left w-1/2 p-5 m-12">
            <div>
              <h2 className="mt-2 font-bold">
                <FontAwesomeIcon
                  icon={faFileLines}
                  size="1x"
                  className="mr-1"
                />
                Illustration Prompt
              </h2>
              <p>{illustName}</p>
            </div>
            <div className="mt-7 border border-y-1"></div>
            <div>
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
            <div>
              <h2 className="mt-2 font-bold">
                <FontAwesomeIcon icon={faImage} size="1x" className="mr-1" />
                Illustration Style
              </h2>
              <p>{illustStyle}</p>
            </div>
            <div className="mt-7 border border-y-1"></div>
            <div>
              <h2 className="mt-2 font-bold">
                <FontAwesomeIcon icon={faPalette} size="1x" className="mr-1" />
                Colors amount
              </h2>
              <p>{colorAmount}</p>
            </div>
            <div className="mt-7 border border-y-1"></div>
            <div>
              <h2 className="mt-2 font-bold">
                <FontAwesomeIcon icon={faFillDrip} size="1x" className="mr-1" />
                Color mode
              </h2>
              <p>{colorMode}</p>
            </div>
          </div>
          <div className="float-right p-5 mt-14">
            <img src={illustUrl} width="300" height="300" alt="illust" />
          </div>
        </div>
        <div className="clear-both text-center flex justify-center bg-gray-200 w-full rounded-xl py-5 mb-14">
          <p className="float-left w-1/2 text-xl font-bold text-start">
            Want to download it or create your own illustrations?
          </p>
          <div className="float-right px-4 py-1 bg-violet-600 text-white text-center rounded-full">
            <a href="/">
              <p className="mt-3">Yes, I want!</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
