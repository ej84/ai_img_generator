"use client";
import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { auth } from "../firebase/initFirebase";
import fetchUserData from "../firebase/fetchUserData";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import IllustFilter from "../components/IllustFilter";

const Page = () => {
  //const { user } = useAuth();
  //const router = useRouter();
  const [userData, setUserData] = useState(null);


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
      }
    });

    // Removes event listner when component gets unmounted
    return () => unsubscribe();
    //fetchUserStorageData(user.uid).then(url => setUserStorageData(url));
  }, []);

  useEffect(() => {
    //if (user) {
    //fetchUserData(user.uid).then((data) => setUserData(data));
    //fetchUserStorageData(user.uid).then(url => setUserStorageData(url));
    //}
  }, []);

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
                <div className="grid grid-cols-4 gap-4 justify-center items-center">
                  {/*{images.map((url, index) => (
                    <img key={index} src={url} alt={`Image ${index}`} className="w-full h-auto" />
                  ))}*/}
                  <div className="relative left-2/3">
                    <img src={userData.img_url} width="250" height="250" />
                    <div className="mt-5 text-start">
                      <h3 className="text-lg font-bold">
                        Title: {userData.imagePrompt}
                      </h3>
                      <h3 className="text-lg font-bold">
                        Color Mode: {userData.color}
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
