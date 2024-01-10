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
  const router = useRouter();

  useEffect(() => {
    // Checks if user is logged in with auth state change detection
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName);
        fetchUserData(user.uid).then((data) => {
          setIllustData(data);
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
                <IllustFilter />
                <div className="grid grid-cols-4 gap-3 md:gap-5">
                  {illustData.map((illust, index) => (
                    <div key={index}>
                      <IllustCard illustration={illust} />
                    </div>
                  ))}
                </div>
                {/*
                  {illustData.map((illust, index) => (
                    <div
                      key={index}
                      className="md:relative md:-left-20 md:top-7"
                    >
                      <img
                        src={illust.img_url}
                        width="250"
                        height="250"
                        alt={`Image ${index}`}
                      />
                      <div className="mt-5 text-start">
                        <h3 className="text-base font-bold">
                          Title: {illust.imagePrompt}
                        </h3>
                        <h3 className="text-base">Style: {illust.style[0]}</h3>
                      </div>
                    </div>
                  ))}
                  </div>*/}
              </div>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default Page;
