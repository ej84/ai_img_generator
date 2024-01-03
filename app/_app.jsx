import React from "react";
import "../firebase/firebaseConfig"; // Initialize Firebase
import RootLayout from "./layout";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <RootLayout>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </RootLayout>
  );
}

export default MyApp;
