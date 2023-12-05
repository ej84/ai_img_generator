import React from "react";
import "../firebase/firebaseConfig"; // Initialize Firebase
import RootLayout from "./layout";

function MyApp({ Component, pageProps }) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
