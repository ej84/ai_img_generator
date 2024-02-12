import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const page = () => {
  const priceInfo = { Starter: ["$7.99"] };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-4 text-white space-x-5">
        <div className="w-64 h-96 hover:bg-gray-500 rounded-xl">
          <div className="ml-7">
            <p className="text-xl mt-5">Starter</p>
            <p className="mt-8 text-3xl">$7.99</p>
            <div className="mt-4 mr-6 bg-violet-600 text-center rounded-md py-2">
              <button className="w-full">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="w-64 h-96 hover:bg-gray-500 rounded-xl">
          <div className="ml-7">
            <p className="text-xl mt-5">Plus</p>
            <p className="mt-8 text-3xl">$22.99</p>
            <div className="mt-4 mr-6 bg-violet-600 text-center rounded-md py-2">
              <button className="w-full">Subscribe</button>
            </div>
            <div className="mt-3 text-sm text-gray-300">
              <p>This includes</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p className="inline ml-2">50 credits/month</p>
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p className="inline ml-2">25 explore illustrations/month</p>
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p className="inline ml-2">Create public illustration</p>
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p className="inline ml-2">PNG</p>
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p className="inline ml-2">Priority generation</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-64 h-96 hover:bg-gray-500 rounded-xl">
          <div className="ml-7">
            <p className="text-xl mt-5">Premium</p>
            <p className="mt-8 text-3xl">$24.99</p>
            <div className="mt-4 mr-6 bg-violet-600 text-center rounded-md py-2">
              <button className="w-full">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="w-64 h-96 hover:bg-gray-500 rounded-xl">
          <div className="ml-7">
            <p className="text-xl mt-5">Enterprise</p>
            <p className="mt-8 text-3xl">$179.99</p>
            <div className="mt-4 mr-6 bg-violet-600 text-center rounded-md py-2">
              <button className="w-full">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
