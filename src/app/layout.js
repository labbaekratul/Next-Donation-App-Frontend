"use client";
import "./globals.css";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import Script from "next/script";
import Navbar from "../../components/Navbar";
import { ReduxProvider } from "./features/provider";

export default function RootLayout({ children }) {
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <html lang="en">
      <head>
        {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css" rel="stylesheet" />
         */}
      </head>
      <body className="bg-gray-100">
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></Script>
      </body>
    </html>
  );
}
