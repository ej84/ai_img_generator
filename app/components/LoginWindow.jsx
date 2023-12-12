import React from "react";
import AuthButton from "./AuthButton";

const LoginWindow = () => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl mb-4">Sign in with Google</h2>
        <AuthButton />
      </div>
    </div>
  );
};

export default LoginWindow;
