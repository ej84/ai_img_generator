import React, { useState } from "react";
import { collection, doc, addDoc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, firebase } from "../firebase/initFirebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AuthButton = ({ title, style }) => {
  const [showLoginWindow, setShowLoginWindow] = useState(false);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      const result = await signInWithPopup(auth, provider); //(auth, provider);
      const user = result.user;
      const docRef = doc(db, "testData", "users");
      const snap = await getDoc(docRef);
      // Login Successful
      if (snap.exists()) {
        console.log("Document data:", snap.data());
      } else {
        // Add to database if new user
        await setDoc(doc(collection(db, "testData"), "users"), {
          uid: user.uid,
        });
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
