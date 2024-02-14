"use client";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

const page = () => {
  const priceInfo = {
    Starter: ["$7.99", 25, 20, "price_1Oj3hMGosf4jzahcBMCYuxhP"],
    Plus: ["$22.99", 30, 25, "price_1Oj464Gosf4jzahcBhmmgjY7"],
    Premium: ["$24.99", 80, 150, "price_1Oj4h6Gosf4jzahcrscMRWC4"],
    Enterprise: ["$179.99", 500, "Unlimited", "price_1Oj5PgGosf4jzahcHUuRfJEK"],
  };

  const handleSubUser = async (priceId) => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);
    const response = await fetch("/api/create_checkout_session/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId: priceId }),
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
                  onClick={() => handleSubUser(info[3])}
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
