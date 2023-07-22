/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { useRouter } from "next/navigation";
import { getTokenFromLocalStorage } from "./helpers/mixin";
import img1 from "../../public/images/img1.jpg";
import img2 from "../../public/images/img2.jpg";
import img3 from "../../public/images/img3.jpg";

const Home = () => {
  const { push } = useRouter();
  const handleDonate = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  // Parallax effect on the hero section
  const { scrollYProgress } = useViewportScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const localStore = getTokenFromLocalStorage("userInfo");
  const changeRouteHandler = () => {
    if (localStore?.token) {
      push(`/dashboard/${localStore.role.toLowerCase()}`);
    } else {
      push("/login");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-100">
      {/* Header */}

      {/* Hero Section with Parallax Effect */}
      <motion.section
        style={{ y }}
        className="bg-blue-200 text-blue-800 py-40 px-8 text-center">
        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }} // Adjust the duration here (e.g., 1.5 seconds)
          className="text-4xl font-bold mb-4">
          Sunnah Foundation
        </motion.h2>
        <motion.p
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }} // Adjust the duration here (e.g., 1.5 seconds)
          className="text-lg">
          Help us make a difference in the world by donating to our cause.
        </motion.p>
        <div className="flex justify-center mt-8">
          <img
            src={img1.src}
            alt="Donation 1"
            className="w-20 h-20 rounded-full mx-2"
          />
          <img
            src={img2.src}
            alt="Donation 2"
            className="w-20 h-20 rounded-full mx-2"
          />
          <img
            src={img3.src}
            alt="Donation 3"
            className="w-20 h-20 rounded-full mx-2"
          />
        </div>
      </motion.section>

      {/* Donation Form */}
      <section className="bg-white flex-1 py-20 px-8">
        <h2 className="text-3xl font-semibold mb-4 text-center text-blue-800">
          Donate Now
        </h2>
        <div
          onSubmit={handleDonate}
          className="max-w-md mx-auto bg-white shadow-md p-8">
          {/* Add donation form fields here */}
          <button
            onClick={changeRouteHandler}
            type="button"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Donate
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4 px-8 text-center">
        <p>
          © {new Date().getFullYear()} For Testing purpose. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
