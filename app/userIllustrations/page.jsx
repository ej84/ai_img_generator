"use client";
import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { auth } from "../firebase/initFirebase";
import fetchUserData from "../firebase/fetchUserData";
import IllustFilter from "../components/IllustFilter";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import IllustCard from "./components/IllustCard";
import { SortByDropdown } from "../components/SortByDropdown";
import Link from "next/link";

const Page = () => {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [illustData, setIllustData] = useState([]);
  const [filteredIllust, setFilteredIllust] = useState([]);

  const router = useRouter();

  useEffect(() => {
    // Checks if user is logged in with auth state change detection
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName);
        fetchUserData(user.uid).then((data) => {
          setIllustData(data);
          setFilteredIllust(data);
        });
      }

      // If not logged in, redirect the user to main page
      else {
        router.push("/");
      }
    });

    // Removes event listner when component gets unmounted
    return () => unsubscribe();
  }, [router]);

  const applyFilter = (filters) => {
    const tempData = illustData.filter((illust) => {
      return Object.entries(filters).every(([key, value]) => {
        console.log(key);
        // 필터링 조건이 비어있는 경우, 모든 illust를 포함
        if (value === "") return true;

        // 특정 필드에 대한 비교 로직 구현
        switch (key) {
          case "style":
            // style이 배열인 경우, includes를 사용하여 값 포함 여부 확인
            return Array.isArray(illust.style)
              ? illust.style.includes(value)
              : illust.style === value;
          case "colorType":
            console.log(illust.color === value);
            return illust.color === value;
          case "illustType":
            return illust.mode === value;
          case "colorsAmount":
            // colorsAmount가 숫자인 경우, 타입 변환 후 비교
            return Number(illust.count) === Number(value);
          default:
            // 정의되지 않은 필터 키에 대해서는 true 반환
            return true;
        }
        /*
      return (
        (filters.style === "" || illust.style.includes(filters.style)) &&
        (filters.colorType === "" || illust.color === filters.colorType) &&
        (filters.illustType === "" || illust.mode === filters.illustType) &&
        (filters.colorsAmount === "" || illust.count == filters.colorsAmount)
      );
      */
      });
    });
    setFilteredIllust(tempData);
  };

  const reset = () => {
    setFilteredIllust(illustData);
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen">
        <Sidebar />
        <>
          <div className="max-[639px]:text-center md:absolute md:top-24 md:left-1/4 space-y-10">
            {userId && (
              <div>
                <h1 className="md:relative md:-left-20 mb-10 font-bold text-xl md:mt-0 md:text-3xl">
                  {userName}
                </h1>
                <div className="max-[639px]:inline-flex">
                  <IllustFilter onApplyFilter={applyFilter} onReset={reset} />
                  <SortByDropdown
                    filteredIllust={filteredIllust}
                    setFilteredIllust={setFilteredIllust}
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-3 lg:gap-5 relative md:-left-14 md:top-10 lg:-left-24">
                  {filteredIllust.map((illust, index) => (
                    <div key={index}>
                      <IllustCard
                        illustration={illust}
                        docRef="user"
                        userId={userId}
                      />
                      <Link
                        href="/userIllustrations"
                        className="max-[639px]:text-xs hover:text-blue-500 font-sans"
                      >
                        {illust.imagePrompt}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default Page;
