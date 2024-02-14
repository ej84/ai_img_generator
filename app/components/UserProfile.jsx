import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserProfile = ({ style }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div>
      <button
        onClick={() => setIsMenuOpen(true)}
        className={`${style} md:relative md:right-5`}
      >
        <FontAwesomeIcon icon={faCircleUser} size="3x" />
      </button>
      {isMenuOpen && (
        <div className="absolute right-2 w-28 h-40 outline outline-1 outline-gray-400 bg-white rounded-lg space-y-2">
          <div className="flex justify-center">
            <button onClick={handleSignOut}>
              <p>Profile</p>
            </button>
          </div>
          <div className="flex justify-center">
            <button onClick={handleSignOut}>
              <p>Log Out</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
