/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getTokenFromLocalStorage } from "@/app/helpers/mixin";
import { useDispatch, useSelector } from "react-redux";
import { userSignoutAction } from "@/app/features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const toggleUserLogin = () => {
    setIsUserLoggedIn((prevIsLoggedIn) => !prevIsLoggedIn);
  };

  const localStore = getTokenFromLocalStorage("userInfo");
  let userInfo = useSelector((state) => state.auth.userInfo);
  userInfo = userInfo?.name ? userInfo : localStore;

  const handleSignOut = () => {
    dispatch(userSignoutAction());
    setIsUserLoggedIn(false);
  };

  const router = useRouter();

  const handleSignInClick = () => {
    router.push("/login");
  };

  // useEffect to listen for changes in userInfo and update the isUserLoggedIn state
  useEffect(() => {
    if (userInfo && userInfo.name) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [userInfo]);

  return (
    <nav className="fixed top-0 z-50 w-full bg-blue-600 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-white">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            {/* <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button> */}
            <Link href="/" className="flex ml-2 md:mr-24">
              {/* <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 mr-3"
                  alt="FlowBite Logo"
                /> */}
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Donation Funding
              </span>
            </Link>
          </div>
          {userInfo?.name ? (
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user">
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none">
                      {userInfo.name}
                    </p>
                    <Link
                      href={
                        userInfo.role === "USER"
                          ? "/dashboard/user"
                          : "/dashboard/admin"
                      }>
                      <p
                        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300 cursor-pointer"
                        role="none">
                        {userInfo.role}
                        <small> (profile)</small>
                      </p>
                    </Link>
                  </div>
                  <ul className="py-1" role="none">
                    <li onClick={handleSignOut}>
                      <Link
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem">
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={handleSignInClick}
                className="bg-transparent hover:bg-blue-500 text-white hover:text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
