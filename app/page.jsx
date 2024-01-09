"use client";
import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import ImageGenerator from "./components/ImageGenerator";
//import useAuth from "./hooks/useAuth";
import LoginWindow from "./components/LoginWindow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "./hooks/useAuth";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { db, auth } from "./firebase/initFirebase";
import IllustFilter from "./components/IllustFilter";
import fetchIllustURLs from "./firebase/fetchIllustURLs";

export default function Home() {
  const [showLoginWindow, setShowLoginWindow] = useState(false);
  const [userStorageData, setUserStorageData] = useState(null);
  const [illustrations, setIllustrations] = useState([]);
  /*
    useEffect(() => {
      const loadIllusts = async () => {
        const urls = await fetchIllustURLs();
        setIllustrations(urls);
      }
    }, []);
  */
  const { user } = useAuth();

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
        <IllustFilter />
        {userStorageData && (
          <div>
            <img src={userStorageData} className="absolute right-1/2 top-1/2" />
          </div>
        )}
        {showLoginWindow && (
          <div onClick={() => setShowLoginWindow(false)}>
            <LoginWindow />
          </div>
        )}
      </main>
    </>
  );
}
