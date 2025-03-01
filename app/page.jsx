"use client";
import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "./firebase/initFirebase";
import { onAuthStateChanged } from "firebase/auth";
import { watchUserSubscription } from "./firebase/initFirebase";
import fetchPublicImages from "./firebase/fetchPublicImages";
import IllustFilter from "./components/IllustFilter";
import { SortByDropdown } from "./components/SortByDropdown";
import fetchUserData from "./firebase/fetchUserData";
import IllustCard from "./userIllustrations/components/IllustCard";
import { loadStripe } from "@stripe/stripe-js";
import UpgradePlanWindow from "./components/UpgradePlanWindow";

export default function Home() {
  //const [session] = useSession();
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [userStorageData, setUserStorageData] = useState(null);
  const [illustData, setIllustData] = useState([]);
  const [filteredIllust, setFilteredIllust] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [images, setImages] = useState([]);
  const [showUpgradeWindow, setShowUpgradeWindow] = useState(false);

  const router = useRouter();
  /*const { user } = */

  useEffect(() => {
    fetchPublicImages().then((data) => {
      setImages(data);
      setFilteredIllust(data);
    });
  }, []);

  useEffect(() => {
    // Checks if user is logged in with auth state change detection
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeUser = watchUserSubscription(user, (userData) => {
          if (userData) {
            setUserId(userData.uid);
            setSubscriptionStatus(userData.subscriptionStatus);
          }
        });
        // Removes event listner when component gets unmounted
        return () => unsubscribeUser();
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const applyFilter = (filters) => {
    const tempData = images.filter((image) => {
      return Object.keys(filters).every((key) => {
        const filterValue = filters[key];

        // 필터 값이 비어있는 경우는 무시하고 모든 값 허용
        if (filterValue === "") return true;

        const imageValue = image[key];

        // imageValue가 배열인 경우 (예: style)
        if (Array.isArray(imageValue)) {
          console.log(imageValue);
          // filterValue도 배열일 수 있으니, 배열인지 확인 후 적절히 처리
          if (Array.isArray(filterValue)) {
            // 모든 filterValue가 illustValue 배열에 포함되어야 함
            return filterValue.every((val) => imageValue.includes(val));
          } else {
            // 단일 filterValue가 illustValue 배열에 포함되어 있는지 확인
            return imageValue.includes(filterValue);
          }
        } else {
          // illustValue와 filterValue가 모두 문자열이거나 숫자인 경우
          // 문자열 비교 혹은 숫자 비교를 수행
          if (key === "colorsAmount") {
            // colorsAmount와 같은 숫자 비교
            return Number(imageValue) === Number(filterValue);
          } else {
            // 일반 문자열 비교
            console.log(typeof imageValue + " " + filterValue);
            return imageValue === filterValue;
          }
        }
      });
    });
    setFilteredIllust(tempData);
  };

  const reset = () => {
    setFilteredIllust(images);
  };

  const checkUser = () => {
    if (!user) {
      setShowLoginWindow(true);
    } else {
      setShowLoginWindow(false);
    }
  };

  const downloadImage = async () => {
    try {
      const response = await fetch("/api/svg2png", { method: "POST" });
      const imageBase64 = await response.text();

      // Base64 데이터를 이용하여 이미지 다운로드
      const link = document.createElement("a");
      link.href = `data:image/png;base64,${imageBase64}`;
      link.download = "converted-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error converting image:", error);
    }
  };

  const convertImage = async () => {
    try {
      const response = await fetch("/api/png2svg", { method: "POST" });
      const svgData = await response.text();
      // 문자열 이스케이프 처리된 데이터를 디코딩 (필요한 경우)
      const decodedSvgData = decodeURIComponent(svgData);

      // SVG 데이터를 DOM에 삽입
      document.getElementById("svgContainer").innerHTML = decodedSvgData;
    } catch (error) {
      console.error("Error converting image:", error);
    }
  };

  const downloadSvg = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    try {
      // API 라우트 호출
      const response = await fetch("/api/png2svg", {
        method: "POST",
        body: formData,
      });
      const svgData = await response.text();
      //const decodedSvgData = decodeURIComponent(svgData);

      //document.getElementById('svgContainer').innerHTML = decodedSvgData;

      // SVG 데이터를 이용하여 파일 다운로드
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "converted-image.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // URL 객체 해제
    } catch (error) {
      console.error("Error converting image:", error);
    }
  };

  // Test to delete from db

  return (
    <>
      <Nav />
      <Sidebar setShowLoginWindow={checkUser} />
      <main className="flex w-fit md:pt-10 min-h-screen">
        <div className="md:absolute md:left-64 lg:left-1/4">
          <div className="max-[640px]:grid max-[640px]:grid-cols-2 md:relative">
            <div className="max-[640px]:relative max-[640px]:left-12 md:relative md:top-14">
              <SortByDropdown
                filteredIllust={filteredIllust}
                setFilteredIllust={setFilteredIllust}
              />
            </div>
            <div className="max-[640px]:relative max-[640px]:left-28 max-[640px]:top-3 w-fit">
              <IllustFilter onApplyFilter={applyFilter} onReset={reset} />
            </div>
          </div>
          <div className="relative p-5 mt-5 grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-3 lg:gap-5 md:-left-14 lg:-left-24 text-start">
            {filteredIllust.map((illust, index) => (
              <div key={index}>
                <IllustCard illustration={illust} docRef="explore" />
                <Link href="/" className="hover:text-violet-500 font-sans">
                  {illust.imagePrompt}
                </Link>
              </div>
            ))}
          </div>
          {showUpgradeWindow && (
            <div onClick={() => setShowUpgradeWindow(false)}>
              <UpgradePlanWindow />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
