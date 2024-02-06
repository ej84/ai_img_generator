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
    if (filters !== "" && filters !== null) {
      const tempData = images.filter((illust) => illust.style[0] === filters);
      setFilteredIllust(tempData);
    }
  };
  /*
  const sortByDownloadCounts = () => {
    // 이미지 배열을 다운로드 횟수에 따라 내림차순으로 정렬합니다.
    const sortedImages = [...images].sort(
      (a, b) => b.downloadCount - a.downloadCount
    );
    setFilteredIllust(sortedImages); // 상태를 업데이트합니다.
  };*/

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

  const handleSubUser = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);
    const response = await fetch("/api/create_checkout_session/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId: "price_1OcW66Gosf4jzahcpRczT59b" }),
    });
    const { sessionId } = await response.json();

    if (sessionId) {
      stripe.redirectToCheckout({ sessionId });
    } else {
      console.error();
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
      <main className="md:pt-16 min-h-screen">
        <div className="md:absolute md:left-64 lg:left-1/4">
          <IllustFilter onApplyFilter={applyFilter} onReset={reset} />
          <SortByDropdown
            filteredIllust={filteredIllust}
            setFilteredIllust={setFilteredIllust}
          />
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-3 lg:gap-5 relative md:-left-14 lg:-left-24 text-center">
            {filteredIllust.map((illust, index) => (
              <div key={index}>
                <IllustCard illustration={illust} docRef="explore" />
                <Link
                  href="/userIllustrations"
                  className="hover:text-blue-500 font-sans"
                >
                  {illust.imagePrompt}
                </Link>
              </div>
            ))}
          </div>
          {/*
          <button className="bg-orange-500 p-14" onClick={handleSubUser}>
            Buy
          </button>
          <button className="bg-red-300 p-14" onClick={downloadImage}>
            Convert SVG to PNG
          </button>
          <div className="bg-violet-500">
            <p>PNG to SVG</p>
            <input type="file" className="inline" onChange={downloadSvg} />
            </div>*/}
        </div>

        {userStorageData && (
          <div>
            <img src={userStorageData} className="absolute right-1/2 top-1/2" />
          </div>
        )}
      </main>
    </>
  );
}
