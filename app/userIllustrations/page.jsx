"use client";
import React, { useState, useEffect, useReducer } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { auth } from "../firebase/initFirebase";
import fetchUserData from "../firebase/fetchUserData";
import IllustFilter from "../components/IllustFilter";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

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

  console.log(illustData);

  return (
    <>
      <Nav />
      <Sidebar />
      <div className="md:pt-16 min-h-screen">
        <>
          <div className="text-center ">
            {illustData[0] && (
              <div>
                <h1 className="mb-10 font-bold text-xl md:mt-0 md:text-3xl">
                  {userName}
                </h1>
                <IllustFilter />
                <div className="grid grid-cols-4 gap-4 justify-center items-center">
                  {/*{images.map((url, index) => (
                    <img key={index} src={url} alt={`Image ${index}`} className="w-full h-auto" />
                  ))}*/}
                  <div className="relative left-2/3">
                    <img src={illustData.img_url} width="250" height="250" />
                    <div className="mt-5 text-start">
                      <h3 className="text-lg font-bold">
                        Title: {illustData.imagePrompt}
                      </h3>
                      <h3 className="text-lg font-bold">
                        Color Mode: {illustData.color}
                      </h3>
                    </div>
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
