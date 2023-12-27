"use client";
import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import ImageGenerator from "./components/ImageGenerator";
//import useAuth from "./hooks/useAuth";
import LoginWindow from "./components/LoginWindow";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  collection,
  addDoc,
  getDocs,
  QuerySnapshot,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase/initFirebase";

export default function Home() {
  const [showLoginWindow, setShowLoginWindow] = useState(false);
  //const { user } = useAuth();
  /*
  const checkUser = () => {
    if (!user) {
      console.log("You must log in first!");
      setShowLoginWindow(true);
    } else {
      setShowLoginWindow(false);
    }
  };
*/
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
      <Sidebar />
      <main className="md:pt-16 min-h-screen">
        <div className="hidden md:block md:mb-10 text-center w-full space-x-14">
          <select className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer">
            <option value="">Illustration style</option>
          </select>
          <select className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer">
            <option value="">Color mode</option>
          </select>
          <select className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer">
            <option value="">Illustration type</option>
          </select>
          <select className="border border-solid px-2 py-3 rounded-full hover:cursor-pointer">
            <option value="">Colors amount</option>
          </select>
          <button className=" text-blue-600 underline">Reset</button>
          <button className="border border-solid px-2 py-3 text-white bg-blue-500 rounded-full">
            Apply filter
          </button>

          {showLoginWindow && <LoginWindow />}
        </div>
        <FontAwesomeIcon
          icon={faFilter}
          size="1x"
          className="flex inset-x-1/2 inset-y-1/2 p-3 md:hidden"
        />
        {/*<input
          className="border border-black p-10 absolute right-1/2"
          type="text"
          placeholder="enter something"
          value={newData.name}
          onChange={(e) => setNewData({ ...newData, name: e.target.value })}
        />
        <button
          onClick={add}
          className="text-black border border-black p-5 absolute right-2/3"
        >
          +
        </button>
        
        <div className="border border-black absolute right-1/2 top-1/2">
          {data.map((d) => (
            <div className="mt-5" key={d.id}>
              <p>{d.name}</p>
            </div>
          ))}
          </div>*/}
        <div className="fixed right-1/2 top-1/2">
          <ImageGenerator />
        </div>
        {/*
        <div className="flex w-full justify-center mt-14">
          <div className="grid grid-cols-4">
            <button
              onClick={checkUser}
              className="p-24 mx-7 border border-black"
            >
              <h3>Image</h3>
            </button>
            <button
              onClick={checkUser}
              className="p-24 mx-7 border border-black"
            >
              <h3>Image</h3>
            </button>
            <button
              onClick={checkUser}
              className="p-24 mx-7 border border-black"
            >
              <h3>Image</h3>
            </button>
            <button
              onClick={checkUser}
              className="p-24 mx-7 border border-black"
            >
              <h3>Image</h3>
            </button>
          </div>
  </div>*/}
      </main>
    </>
  );
}
