import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AuthButton from "./AuthButton";
import UserProfile from "./UserProfile";
import Link from "next/link";
import UpgradePlan from "./UpgradePlan";
import LoginWindow from "./LoginWindow";
import { auth } from "../firebase/initFirebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import fetchUserInfo from "../firebase/fetchUserInfo";

const Nav = () => {
  const { user } = useAuth();
  const [showLoginWindow, setShowLoginWindow] = useState(false);
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [userCredit, setUserCredit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Checks if user is logged in with auth state change detection
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);

        fetchUserInfo(user.uid).then((data) => setUserInfo(data));
      }

      // If not logged in, redirect the user to main page
      else {
        router.push("/");
      }
    });
    // Removes event listner when component gets unmounted
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!userInfo || userInfo.length === 0) return;

    const setTotalAndUserCredits = async () => {
      if (userInfo.subscriptionStatus === "Starter") {
        setTotalCredit(20);
      } else if (userInfo.subscriptionStatus === "Plus") {
        setTotalCredit(25);
      } else if (userInfo.subscriptionStatus === "Premium") {
        setTotalCredit(150);
      } else if (userInfo.subscriptionStatus === "Enterprise") {
        setTotalCredit(9999);
      }
      setUserCredit(userInfo.explores);
    };
    setTotalAndUserCredits();
  }, [userInfo]);

  const loginStyle = "md:hidden";
  const loginStyle2 = "hidden md:block";

  const handleLoginWindow = (e) => {
    if (!user) {
      e.preventDefault();
      setShowLoginWindow(true);
    } else {
      setShowLoginWindow(false);
    }
  };

  return (
    <nav className="bg-white px-2 py-2 border border-x-transparent border-b-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Logo */}
        <div className="flex justify-between md:justify-start">
          <Link href="/">
            <h1 className="text-2xl mt-1 font-bold">LOGO</h1>
          </Link>
          {user ? (
            <UserProfile style={loginStyle} />
          ) : (
            <AuthButton
              title="Log in for more"
              style={loginStyle}
              user={user}
            />
          )}
        </div>

        {/* Search Bar */}
        <div className="flex mt-2 md:mt-0 md:w-1/2 lg:w-2/4">
          <input
            className="flex-grow p-2 pl-5 border border-gray-300 rounded-full md:mx-4"
            type="search"
            placeholder="Search for an illustration..."
          />
          <button className="hidden lg:block relative right-28 px-4 my-1 border border-amber-500 bg-white text-amber-500 rounded-full hover:bg-amber-500 hover:text-white">
            Search
          </button>

          {/* Upgrade Button */}

          {user && (
            <div
              onClick={handleLoginWindow}
              className="flex md:relative md:right-14"
            >
              <UpgradePlan title="Upgrade" />
              <div className="relative top-3 left-20 inline">
                <div
                  className="text-start rounded-full bg-gray-300"
                  style={{ height: "0.5rem", width: "100%" }}
                >
                  <div
                    className="px-0.5 rounded-full bg-amber-500"
                    style={{
                      height: "100%",
                      width: `${(userCredit / totalCredit) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs mt-1">
                  {userCredit}/{totalCredit}
                  credits
                </p>
              </div>
            </div>
          )}
          {showLoginWindow && (
            <div onClick={() => setShowLoginWindow(false)}>
              <LoginWindow />
            </div>
          )}
        </div>

        {/* Login Button - hidden on small screens, shown on medium screens and above */}
        {user ? (
          <UserProfile style={loginStyle2} />
        ) : (
          <AuthButton title="Log in for more" style={loginStyle2} />
        )}
      </div>
    </nav>
  );
};

export default Nav;
