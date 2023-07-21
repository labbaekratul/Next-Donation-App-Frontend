"use client";

export const getTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      return JSON.parse(userInfo);
    }
  }
  return null;
};
