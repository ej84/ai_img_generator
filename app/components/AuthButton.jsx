"use client";
import React from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { session } from "../session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import db from "../firebase/initFirebase";
import { SessionProvider } from "next-auth/react";

const AuthButton = () => {
  let { userSession } = session();
  const handleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      // Login Successful
      console.log("Success");
      console.log(db);
    } catch (error) {
      // Login Failed
      console.log(error);
    }
  };

  return (
    <SessionProvider session={session}>
      {userSession ? (
        <button
          className="px-6 py-4 rounded-full bg-sky-100 text-blue-500"
          onClick={handleLogin}
        >
          <p className="inline">Log in for more</p>
          <FontAwesomeIcon icon={faArrowRight} className="ml-3" />
        </button>
      ) : (
        <p>Sing out</p>
      )}
    </SessionProvider>
  );
};

export default AuthButton;
