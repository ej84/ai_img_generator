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
  const [currentPage, setCurrentPage] = useState(1);
  const [imgsPerPage] = useState(8);

  const router = useRouter();

  useEffect(() => {
    // Checks if user is logged in with auth state change detection
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName);
        fetchUserData(user.uid).then((data) => {
          const dataLimit = data.slice(0, 100); // Limits up to 100 imgs
          setIllustData(dataLimit);
          setFilteredIllust(dataLimit.slice(0, imgsPerPage));
        });
      }

      // If not logged in, redirect the user to main page
      else {
        router.push("/");
      }
    });

    // Removes event listner when component gets unmounted
    return () => unsubscribe();
  }, [router, imgsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * imgsPerPage;
    const endIndex = startIndex + imgsPerPage;
    setFilteredIllust(illustData.slice(startIndex, endIndex));
  };

  const renderPageNumbers = () => {
    const pageCount = Math.ceil(illustData.length / imgsPerPage);
    return Array.from({ length: pageCount }, (_, index) => (
      <button key={index} onClick={() => handlePageChange(index + 1)}>
        |{index + 1}|
      </button>
    ));
  };

  const applyFilter = (filters) => {
    const tempData = illustData.filter((illust) => {
      return Object.keys(filters).every((key) => {
        const filterValue = filters[key];

        // 필터 값이 비어있는 경우는 무시하고 모든 값 허용
        if (filterValue === "") return true;

        const illustValue = illust[key];
        console.log(key);

        // illustValue가 배열인 경우 (예: style)
        if (Array.isArray(illustValue)) {
          console.log(illustValue);
          // filterValue도 배열일 수 있으니, 배열인지 확인 후 적절히 처리
          if (Array.isArray(filterValue)) {
            // 모든 filterValue가 illustValue 배열에 포함되어야 함
            return filterValue.every((val) => illustValue.includes(val));
          } else {
            // 단일 filterValue가 illustValue 배열에 포함되어 있는지 확인
            return illustValue.includes(filterValue);
          }
        } else {
          // illustValue와 filterValue가 모두 문자열이거나 숫자인 경우
          // 문자열 비교 혹은 숫자 비교를 수행
          if (key === "colorsAmount") {
            // colorsAmount와 같은 숫자 비교
            return Number(illustValue) === Number(filterValue);
          } else {
            // 일반 문자열 비교
            console.log(typeof illustValue + " " + filterValue);
            return illustValue === filterValue;
          }
        }
      });
    });
    console.log(tempData);
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
            <>
              <div className="mr-7 md:pt-10 md:-ml-24">
                {renderPageNumbers()}
              </div>
            </>
          </div>
        </>
      </div>
    </>
  );
};

export default Page;
