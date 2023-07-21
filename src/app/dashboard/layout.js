/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import { getTokenFromLocalStorage } from "../helpers/mixin";

export default function DashboardSidebarLayout({ children }) {
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    //get current url path
    setActiveLink(pathname);
    //init flowbite
    initFlowbite();
  }, [pathname]);

  const localStore = getTokenFromLocalStorage("userInfo");
  const route = localStore?.role?.toLowerCase();

  return (
    <div>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li
              className={`py-1 ${
                activeLink === `/dashboard/${route}`
                  ? "bg-blue-700 text-white"
                  : "bg-white text-gray-700"
              }`}>
              <Link
                href={`/dashboard/${route}`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700">
                <span
                  className={`py-1 ${
                    activeLink === `/dashboard/${route}`
                      ? "text-white ml-3"
                      : "ml-3"
                  }`}>
                  Donations
                </span>
              </Link>
            </li>
            {localStore?.role === "ADMIN" && (
              <li
                className={`py-1 ${
                  activeLink === `/dashboard/${route}/userlist`
                    ? "bg-blue-700 text-white"
                    : "bg-white text-gray-700"
                }`}>
                <Link
                  href={`/dashboard/${route}/userlist`}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700">
                  <span
                    className={`py-1 ${
                      activeLink === `/dashboard/${route}/userlist`
                        ? "text-white ml-3"
                        : "ml-3"
                    }`}>
                    Users
                  </span>
                </Link>
              </li>
            )}
            <li
              className={`py-1 ${
                activeLink === `/dashboard/${route}/profile`
                  ? "bg-blue-700 text-white"
                  : "bg-white text-gray-700"
              }`}>
              <Link
                href={`/dashboard/${route}/profile`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700">
                <span
                  className={`py-1 ${
                    activeLink === `/dashboard/${route}/profile`
                      ? "text-white ml-3"
                      : "ml-3"
                  }`}>
                  Profile
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-2 sm:ml-64 mt-14">{children}</div>
    </div>
  );
}
