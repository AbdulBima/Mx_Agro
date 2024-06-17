"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import Link from "next/link";

const signUpSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  contact: z.string().min(1, { message: "Contact is required" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  confirmPassword: z.string().min(6, {
    message: "Confirm Password must be at least 6 characters long",
  }),
  marketingAccept: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [marketingAccept, setMarketingAccept] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = { firstName, lastName, email, contact, password, confirmPassword, marketingAccept };
    const validation = signUpSchema.safeParse(formData);

    if (!validation.success) {
      validation.error.errors.forEach((error) => {
        toast.error(error.message, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3002/api/vendors/register", {
        firstName,
        lastName,
        email,
        contact,
        password,
        marketingAccept,
      });
      router.prefetch("/login");

      toast.success(`Vendor successfully created`, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setContact("");
      setPassword("");
      setConfirmPassword("");
      setMarketingAccept(false);
      setIsLoading(false);
      router.push("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Error signing up. Please try again.", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white flex md:overflow-hidden md:h-[100vh] w-[100vw] md:*:overscroll-none comforta flex-row">
        <div className="flex items-center w-full pb-20 mt-4 md:mt-0 px-6 mx-auto md:w-[40vw]">
          <div className="flex-1">
            <div className="text-center">
              <p className="mt-12 md:hidden text-gray-500 text-xl bodyFont dark:text-gray-300">
                Sign up
              </p>
            </div>

            <div className="mt-6 md:mt-20 bodyFont">
              <form onSubmit={handleSubmit}>
                <div className="flex md:space-x-8 md:flex-row space-y-2 md:space-y-0 flex-col">
                  <div>
                    <div className="mt-6">
                      <label htmlFor="firstName" className="block bodyFont mb-2 text-sm text-gray-600">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div className="mt-6">
                      <label htmlFor="lastName" className="block bodyFont mb-2 text-sm text-gray-600">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div className="mt-6">
                      <label htmlFor="email" className="block bodyFont mb-2 text-sm text-gray-600">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div className="mt-6">
                      <label htmlFor="contact" className="block bodyFont mb-2 text-sm text-gray-600">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="contact"
                        id="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mt-6">
                      <label htmlFor="password" className="block bodyFont mb-2 text-sm text-gray-600">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div className="mt-6">
                      <label htmlFor="confirmPassword" className="block bodyFont mb-2 text-sm text-gray-600">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div className="mt-6">
                      <label htmlFor="marketingAccept" className="inline-flex items-center bodyFont mb-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          name="marketingAccept"
                          id="marketingAccept"
                          checked={marketingAccept}
                          onChange={(e) => setMarketingAccept(e.target.checked)}
                          className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                        />
                        <span className="ml-2">Accept marketing communications</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-16">
                  {isLoading ? (
                    <div className="loader">
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                    </div>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-400 focus:outline-none focus:bg-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                      >
                        Sign up
                      </button>
                      <div className="mt-6 text-sm text-center text-gray-400">
                        Already have an account?
                        <Link href="/login" className="ml-2 text-blue-500 focus:outline-none focus:underline hover:underline">
                          Login
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden relative md:flex bg-cover h-screen w-[60vw] bg-[url('/images/farmergovernor.webp')]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-60 bg-gradient-to-t from-black to-transparent"></div>

          <h6 className="absolute myFont mt-32 inset-0 flex items-center justify-center text-7xl font-bold text-white">
            MxAgro
          </h6>
          <h3 className="absolute inset-0 text-center flex items-center justify-center mt-72 px-20 text-white text-xl bodyFont">
            Join our Agro Multivendor Ecommerce Platform and connect with farmers and vendors across Nigeria.
          </h3>
        </div>
      </div>

      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default SignUp;
