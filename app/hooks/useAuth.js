import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/initFirebase";
import { onAuthStateChanged } from "firebase/auth";

const authContext = createContext();

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
