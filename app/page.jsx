"use client";
import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { db, auth } from "./firebase/initFirebase";
import { onAuthStateChanged } from "firebase/auth";
import fetchPublicImages from "./firebase/fetchPublicImages";
import IllustFilter from "./components/IllustFilter";
import fetchUserData from "./firebase/fetchUserData";
import IllustCard from "./userIllustrations/components/IllustCard";
import Link from "next/link";

export default function Home() {
  const [showLoginWindow, setShowLoginWindow] = useState(false);
  const [userStorageData, setUserStorageData] = useState(null);
  const [illustData, setIllustData] = useState([]);
  const [filteredIllust, setFilteredIllust] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [images, setImages] = useState([]);

  const router = useRouter();

  useEffect(() => {
    fetchPublicImages().then((data) => {
      setImages(data);
      setFilteredIllust(data);
    });
  }, []);

  const applyFilter = (filters) => {
    if (filters !== "" && filters !== null) {
      const tempData = images.filter((illust) => illust.style[0] === filters);
      setFilteredIllust(tempData);
    }
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

  // Test to delete from db

  return (
    <>
      <Nav />
      <Sidebar setShowLoginWindow={checkUser} />
      <main className="md:pt-16 min-h-screen">
        <div className="md:absolute md:left-64 lg:left-1/4">
          <IllustFilter onApplyFilter={applyFilter} onReset={reset} />
          <div className="grid grid-cols-4 gap-1 md:gap-3 lg:gap-5 relative md:-left-14 lg:-left-24">
            {filteredIllust.map((image, index) => (
              <div key={index}>
                <img src={image.img_url} alt={image.imagePrompt} />
                <p>{image.imagePrompt}</p>
              </div>
            ))}
          </div>
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
