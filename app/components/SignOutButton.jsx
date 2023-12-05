import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignOutButton = () => {
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Log Out Successful
      })
      .catch((error) => {
        // Log Out Failed
      });
  };

  return (
    <FontAwesomeIcon icon={faCircleUser}>
      <button
        onClick={handleSignOut}
        className="text-white text-5xl p-10 w-full"
      />
    </FontAwesomeIcon>
  );
};

export default SignOutButton;
