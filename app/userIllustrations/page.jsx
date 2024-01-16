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
    const tempData = illustData.filter((illust) => illust.style[0] === filters);
    setFilteredIllust(tempData);
  };

  const reset = () => {
    setIllustData(illustData);
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
                <IllustFilter onApplyFilter={applyFilter} onReset={reset} />
                <div className="grid grid-cols-4 gap-1 md:gap-3 lg:gap-5 relative md:-left-14 lg:-left-24">
                  {/*"grid grid-cols-4 gap-3 md:gap-5">*/}
                  {filteredIllust.map((illust, index) => (
                    <div key={index}>
                      <IllustCard illustration={illust} />
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
