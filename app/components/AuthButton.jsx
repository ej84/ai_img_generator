import React, { useState } from "react";
import firebase from "../firebase/initFirebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AuthButton = ({ title, style }) => {
  const [showLoginWindow, setShowLoginWindow] = useState(false);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      await signInWithPopup(auth, provider);
      // Login Successful
      setShowLoginWindow(false);
      window.location.reload();
    } catch (error) {
      // Login Failed
      console.log(error);
    }
  };

  return (
    <button
      className={style + " px-6 py-2 rounded-full bg-sky-100 text-blue-500"}
      onClick={handleLogin}
    >
      <p className="inline">{title}</p>
      <FontAwesomeIcon icon={faArrowRight} className="ml-3" />
    </button>
  );
};

export default AuthButton;
