"use client";
import React, { useEffect, useState } from "react";
//import { useRouter } from "next/router";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { db, storage, auth } from "../firebase/initFirebase";
import fetchUserData from "../firebase/fetchUserData";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import IllustFilter from "../components/IllustFilter";

const Page = () => {
  //const { user } = useAuth();
  //const router = useRouter();
  const [userData, setUserData] = useState(null);
  //const [userStorageData, setUserStorageData] = useState(null);

  //console.log(user);
  /*useEffect(() => {
    console.log(user);
    if (user == null) {
      router.push("/");
    }
  }, []);*/

  useEffect(() => {
    // Checks if user is logged in with auth state change detection
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData("users").then((data) => setUserData(data));
        //fetchUserStorageData(user.uid).then(url => setUserStorageData(url));
      }
    });

    // Removes event listner when component gets unmounted
    return () => unsubscribe();
    //fetchUserStorageData(user.uid).then(url => setUserStorageData(url));
  }, []);
  //console.log(docSnap.data());
  /*
  useEffect(() => {
    //if (user) {
    //fetchUserData(user.uid).then((data) => setUserData(data));
    //fetchUserStorageData(user.uid).then(url => setUserStorageData(url));
    //}
  }, []);
  
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
*/
  return (
    <>
      <Nav />
      <Sidebar />
      <div className="md:pt-16 min-h-screen">
        <>
          <div className="text-center ">
            {userData && (
              <div>
                <h1 className="mb-10 font-bold text-xl md:mt-0 md:text-3xl">
                  {userData.uid}
                </h1>
                <IllustFilter />
                <div className="absolute left-44">
                  <img src={userData.img_url} width="250" height="250" />
                  <div className="mt-5 text-center">
                    <h3 className="text-lg font-bold">
                      Color Mode: {userData.color}
                    </h3>
                    <h3 className="text-lg font-bold">
                      Title: {userData.imagePrompt}
                    </h3>
                  </div>
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
