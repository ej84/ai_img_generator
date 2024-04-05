"use client";
import React, { useEffect, useState } from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadStripe } from "@stripe/stripe-js";
import { auth } from "../firebase/initFirebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const page = () => {
  const priceInfo = {
    Starter: ["$7.99", 25, 20, false, "price_1"],
    Plus: ["$22.99", 30, 25, false, "price_2"],
    Premium: ["$24.99", 80, 150, true, "price_3"],
    Enterprise: ["$179.99", 500, 99999, true, "price_4"],
  };

  const [userId, setUserId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    // Checks if user is logged in with auth state change detection
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);

        //fetchUserInfo(user.uid).then((data) => setUserInfo(data));
      }

      // If not logged in, redirect the user to main page
      else {
        router.push("/");
      }
    });

    // Removes event listner when component gets unmounted
    return () => unsubscribe();
  }, [router]);

  const handleSubUser = async (planName, priceId) => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

    const planData = {
      status: planName,
      price: priceInfo[planName][0],
      credits: priceInfo[planName][1],
      explores: priceInfo[planName][2],
      private: priceInfo[planName][3],
    };

    const response = await fetch("/api/create_checkout_session/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId: priceId,
        userId: userId,
        planData,
      }),
    });

    const { sessionId } = await response.json();

    if (sessionId) {
      stripe.redirectToCheckout({ sessionId });
    } else {
      console.error();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-4 text-white space-x-5">
        {Object.entries(priceInfo).map(([title, info]) => (
          <div key={title} className="w-64 h-96 hover:bg-gray-500 rounded-xl">
            <div className="ml-7">
              <p className="text-xl mt-5">{title}</p>
              <p className="mt-8 text-3xl">{info[0]}</p>
              <div className="mt-4 mr-6 bg-violet-600 text-center rounded-md py-2">
                <button
                  onClick={() => handleSubUser(title, info[4])}
                  className="w-full"
                >
                  Subscribe
                </button>
              </div>
              <div className="mt-3 text-sm text-gray-300">
                <p>This includes</p>
                <ul className="mt-2 space-y-2">
                  <li>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <p className="inline ml-2">{info[1]} credits/month</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <p className="inline ml-2">
                      {info[2]} explore illustrations/month
                    </p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <p className="inline ml-2">
                      Create{" "}
                      {title === "Starter" || title === "Plus"
                        ? "public "
                        : "private "}
                      illustration
                    </p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <p className="inline ml-2">
                      PNG
                      {title.includes("Premium") || title.includes("Enterprise")
                        ? ", VECTOR(SVG)"
                        : ""}
                    </p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <p className="inline ml-2">Priority generation</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
