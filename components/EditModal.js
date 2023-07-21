import React, { useState } from "react";
import SpniningBtn from "./SpniningBtn";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";

function EditModal({ showEditModal, setShowEditModal }) {
  const [saving, setSaving] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // dispatch(createNewDonation(data));
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex  items-center justify-center mx-auto  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
      <div
        className={`${
          showEditModal ? "drop-shadow-sm" : ""
        }  relative w-full max-w-2xl mx-auto  max-h-full`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action="#"
          className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Donatation form
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setShowEditModal(false)}>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Donation Title
                </label>
                <input
                  className={`shadow-sm bg-gray-50 border rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  id="description"
                  {...register("description", {
                    required: "Donation title is required",
                    maxLength: {
                      value: 100,
                      message:
                        "The donation title should have at most 100 characters",
                    },
                  })}
                  type="text"
                  placeholder="Donation for mosque"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Donation Type
                </label>
                <select
                  className={`shadow-sm bg-gray-50 border rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.donatedTo ? "border-red-500" : "border-gray-300"
                  }`}
                  id="donatedTo"
                  {...register("donatedTo", {
                    required: "Please select a donation place",
                  })}>
                  <option value="" disabled>
                    Select donation place
                  </option>
                  <option value="ORPHAN">ORPHAN</option>
                  <option value="MOSQUE">MOSQUE</option>
                  <option value="MADRASA">MADRASA</option>
                  {/* Add more options as needed */}
                </select>
                {errors.donatedTo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.donatedTo.message}
                  </p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="phone-number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Donation Amount
                </label>
                <input
                  className={`shadow-sm bg-gray-50 border rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.donationAmount ? "border-red-500" : "border-gray-300"
                  }`}
                  type="number"
                  id="donationAmount"
                  {...register("donationAmount", {
                    required: "Donation amount is required",
                    min: {
                      value: 50,
                      message: "The minimum donation amount is 50 taka",
                    },
                    max: {
                      value: 10000,
                      message: "The maximum donation amount is 10000 taka",
                    },
                  })}
                  placeholder="100 taka"
                />
                {errors.donationAmount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.donationAmount.message}
                  </p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3 flex justify-center items-center flex-col">
                <label
                  htmlFor="phone-number"
                  className="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white">
                  Cancel Donation
                </label>
                <Button variant="outlined" color="error">
                  Cancel donation
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            {!saving ? (
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Submit
              </button>
            ) : (
              <SpniningBtn text="sending..." />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
