"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { userSigninAction } from "../features/auth/authSlice";
import SpniningBtn from "../../../components/SpniningBtn";

export default function Login() {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => dispatch(userSigninAction(data));

  useEffect(() => {
    if (success) {
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        if (userInfo?.role === "USER") {
          push("/dashboard/user");
        } else {
          push("/dashboard/admin");
        }
      }, 2000);
    }
  }, [push, success, userInfo?.role]);

  return (
    <div className="container mx-auto py-8 mt-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
        <h1 className="text-center font-bold mb-3">AS SUNNAH FOUNDATION</h1>
        <h2 className="text-md mb-6 text-center text-gray-400">Login</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            id="email"
            {...register("email", {
              required: "Email is required",
              validate: {
                maxLength: (v) =>
                  v.length <= 50 ||
                  "The email should have at most 50 characters",
                matchPattern: (v) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  "Email address must be a valid address",
              },
            })}
            type="email"
            placeholder="user@example.com"
          />
          {errors.email?.message && (
            <small className="text-xs text-red-600">
              {errors.email.message}
            </small>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            id="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message:
                  "Password must contain at least 8 characters, including uppercase, lowercase, and numbers",
              },
            })}
            type="password"
            placeholder="********"
          />
          {errors.password && (
            <span className="text-xs text-red-600">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between my-5">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required=""
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="remember"
                className="text-gray-500 dark:text-gray-300">
                Remember me
              </label>
            </div>
          </div>
          <Link
            href="/forgot-password"
            className="text-blue-500 text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
            Forgot password?
          </Link>
        </div>
        <p className="text-sm text-red-600 text-center pb-3">
          {error && error}
        </p>
        {!saving ? (
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Login
          </button>
        ) : (
          <SpniningBtn text="sending..." />
        )}

        <p className="my-3 text-sm font-light text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-500 font-medium text-primary-600 hover:underline dark:text-primary-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
