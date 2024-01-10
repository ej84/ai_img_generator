import React, { useState } from "react";
import { collection, doc, addDoc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, provider } from "../firebase/initFirebase";
import { getAuth, signInWithPopup } from "firebase/auth";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AuthButton = ({ title, style }) => {
  const [showLoginWindow, setShowLoginWindow] = useState(false);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      const snap = await getDoc(docRef);
      // Login Successful
      if (snap.exists()) {
        console.log("Document data:", snap.data());
      } else {
        // Add to database if new user
        await setDoc(
          docRef,
          {
            uid: user.uid,
            name: user.displayName,
          },
          { merge: true }
        );
      }
      setShowLoginWindow(false);
      window.location.reload();
      return user;
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
