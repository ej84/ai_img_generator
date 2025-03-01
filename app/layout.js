import React from "react";
import { Inter } from "next/font/google";
import "./firebase/initFirebase";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Image Generator",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  config.autoAddCss = false;
  return (
    <html lang="en">
      <head>
        {/*<link
          href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
          rel="stylesheet"
  />*/}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
