import { useState, useEffect } from "react";
import { auth } from "../firebase/initFirebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/initFirebase";
import { firebase } from "../firebase/initFirebase";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userRef = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => userRef();
  }, []);

  return { user };
};

export default useAuth;
