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
    <button onClick={handleSignOut} className="p-5">
      <FontAwesomeIcon icon={faCircleUser} size="3x" />
    </button>
  );
};

export default SignOutButton;
