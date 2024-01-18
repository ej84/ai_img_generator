"use client";
import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { db, auth } from "./firebase/initFirebase";
import { onAuthStateChanged } from "firebase/auth";
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
  /*
    useEffect(() => {
      const loadIllusts = async () => {
        const urls = await fetchIllustURLs();
        setIllustrations(urls);
      }
    }, []);
  */

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
    if (filters !== "" && filters !== null) {
      const tempData = illustData.filter(
        (illust) => illust.style[0] === filters
      );
      setFilteredIllust(tempData);
    }
  };

  const reset = () => {
    setFilteredIllust(illustData);
  };

  const checkUser = () => {
    if (!user) {
      setShowLoginWindow(true);
    } else {
      setShowLoginWindow(false);
    }
  };

  // Test to add to db
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({ name: "" });
  const add = async (e) => {
    e.preventDefault();
    if (newData.name !== "") {
      await addDoc(collection(db, "testData"), {
        name: newData.name.trim(),
      });
    }
  };

  // Test to read from db
  useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, "testData"));
      const querySnapshot = await getDocs(q);
      const tData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(tData);
    };

    getData();
  }, []);

  // Test to delete from db

  return (
    <>
      <Nav />
      <Sidebar setShowLoginWindow={checkUser} />
      <main className="md:pt-16 min-h-screen">
        <div className="md:absolute md:left-64 lg:left-1/4">
          <IllustFilter onApplyFilter={applyFilter} onReset={reset} />
          <div className="grid grid-cols-4 gap-1 md:gap-3 lg:gap-5 relative md:-left-14 lg:-left-24">
            {filteredIllust.map((illust, index) => (
              <div key={index}>
                <IllustCard illustration={illust} />
                <Link
                  href="/userIllustrations"
                  className="hover:text-blue-500 font-sans"
                >
                  {illust.imagePrompt}
                </Link>
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
