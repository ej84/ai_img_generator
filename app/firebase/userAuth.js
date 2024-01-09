import { useState, useEffect } from "react";
import { auth } from "./initFirebase";
import { onAuthStateChanged } from "firebase/auth";
//import { useRouter } from "next/navigation";

const userAuth = () => {
  const [user, setUser] = useState(null);
  //const router = useRouter();

  useEffect(() => {
    // Checks if user is logged in with auth state change detection
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }

      // If not logged in, redirect the user to main page
      /*else {
        setUser(null);
        router.push("/");
      }*/
    });

    // Removes event listner when component gets unmounted
    return () => unsubscribe();
  }, []);

  return { user };
};

export default userAuth;
