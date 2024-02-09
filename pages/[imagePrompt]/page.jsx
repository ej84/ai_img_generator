"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Nav from "@/app/components/Nav";
import Sidebar from "@/app/components/Sidebar";
import fetchIllustData from "@/app/firebase/fetchIllustData";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const Page = () => {
  const router = useRouter();
  const [illustName, setIllustName] = useState("");
  const [illustStyle, setIllustStyle] = useState("");
  const [createdTime, setCreatedTime] = useState(null);
  const [illustUrl, setIllustUrl] = useState("");
  const [colorMode, setColorMode] = useState("");
  const [colorAmount, setColorAmount] = useState(0);
  const [donwloadCount, setDownloadCount] = useState(0);


  useEffect(() => {
    //const fetchData = async () => {
    if (router.isReady) {
      const { imagePrompt } = router.query;
      try {
        const data = fetchIllustData(imagePrompt);

        setIllustName(imagePrompt);
        setIllustUrl(data.img_url);
        setColorMode(data.color);
        setColorAmount(data.count);
        setDownloadCount(data.donwloadCount);
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };
  }, [router.isReady, router.query]);



  return (
    <div>
      <Nav />
      <Sidebar />
      <div className="md:pt-16 min-h-screen md:absolute md:left-48 lg:left-52">
        <h1 className="text-4xl font-bold">{illustName}</h1>
        <h3 className="text-2xl">{illustStyle}</h3>
      </div>
    </div>
  );
};

export default Page;
