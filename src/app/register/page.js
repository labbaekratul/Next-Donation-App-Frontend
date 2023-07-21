"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { userSignupAction } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import SpniningBtn from "../../../components/SpniningBtn";

export default function Register() {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => dispatch(userSignupAction(data));

  useEffect(() => {
    if (success) {
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        if (userInfo?.id) {
          push("/dashboard/user");
        }
      }, 2000);
    }
  }, [push, success, userInfo?.id]);

  return (
    <div className="container mx-auto py-8 mt-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
        <h1 className="text-center font-bold mb-3">AS SUNNAH FOUNDATION</h1>
        <h2 className="text-md mb-6 text-center text-gray-400">Registration</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name">
            Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            id="name"
            {...register("name", {
              required: "Please add your name",
              maxLength: {
                value: 100,
                message: "That's way too long to be a real name, try again",
              },
            })}
            placeholder="User name"
          />
          {errors.name && (
            <small className="text-xs text-red-600">
              {errors.name.message}
            </small>
          )}
        </div>
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
            htmlFor="email">
            Phone
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="phone"
            id="phone"
            {...register("phone", {
              required: "Please add your mobile phone number",
              pattern: {
                value: /^[0-9+-]{11,14}$/,
                message: "Invalid phone number. It should be 11 to 14 digits.",
              },
            })}
            placeholder="017********"
          />
          {errors.phone && (
            <small className="text-xs text-red-600">
              {errors.phone.message}
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="password"
            id="confirm-password"
            name="confirm-password"
            {...register("confirm-password", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            placeholder="********"
          />
          {errors["confirm-password"] && (
            <span className="text-xs text-red-600">
              {errors["confirm-password"].message}
            </span>
          )}
        </div>
        <p className="text-sm text-red-600 text-center pb-3">
          {error && error}
        </p>
        {!saving ? (
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Register
          </button>
        ) : (
          <SpniningBtn text="submitting..." />
        )}

        <p className="my-3 text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-500 font-medium text-primary-600 hover:underline dark:text-primary-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
