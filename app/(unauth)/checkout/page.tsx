"use client";

import Image from 'next/image';
import React, { useContext, useState, ChangeEvent } from "react";
import { CartContext } from "@/components/hooks/CartContext";
import useTokenVerification from "../../../components/hooks/useTokenVerification";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { z, ZodError } from 'zod';

interface Product {
  _id: string;
  productName: string;
  productVendor: {
    _id: string;
  };
  productLocation: string;
  productPrice: number;
  productQuantity: number;
  productQuantityPurchased: number;
  productDescription: string;
  productImage: string;
  productCategory: string;
  totalProductPurchasedAmount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const formatNumber = (number: number) => {
  return new Intl.NumberFormat('en-US').format(number);
};

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
];

const nigerianCities = [
  "Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt", "Benin City", "Kaduna",
  "Onitsha", "Maiduguri", "Zaria", "Aba", "Jos", "Ilorin", "Oyo", "Enugu",
  "Abeokuta", "Owerri", "Warri", "Calabar", "Uyo", "Asaba", "Sokoto", "Minna",
  "Yola", "Makurdi", "Awka", "Ado Ekiti", "Bauchi", "Katsina", "Akure",
];

const Checkout: React.FC = () => {
  const { userId, userContact, userEmail, error, isLoading } = useTokenVerification();
  const [isCLoading, setIsCLoading] = useState(false);
  const [cerror, setCError] = useState<string | null>(null);
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const cartContext = useContext(CartContext);

  if (!cartContext) {
    console.log("error");
    return null;
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-[100vh]'>
        <div className="loader">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    );
  }

  if (!userId) {
    router.push('/login');
  };

  const { cartProducts, totalAmount } = cartContext;

  const formSchema = z.object({
    addressLine: z.string().min(1, "Address Line is required"),
    city: z.string().min(1, "City is required").refine(value => nigerianCities.includes(value), {
      message: "Invalid city",
    }),
    state: z.string().min(1, "State is required").refine(value => nigerianStates.includes(value), {
      message: "Invalid state",
    }),
  });

  const validateForm = () => {
    try {
      formSchema.parse({ addressLine, city, state });
      setFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            const path = err.path[0];
            errors[path] = err.message;
          }
        });
        setFormErrors(errors);
      }
      return false;
    }
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const initiatePayment = async () => {
    if (!validateForm()) return;

    setIsCLoading(true);
    setCError(null);

    const paymentData = {
      amount: totalAmount * 100,
      email: userEmail,
      metadata: {
        custom_fields: [
          { display_name: "Cart Products", variable_name: "cart_products", value: JSON.stringify(cartProducts) },
          { display_name: "Buyer Id", variable_name: "buyer_id", value: userId },
          { display_name: "Buyer Contact", variable_name: "buyer_contact", value: userContact },
          { display_name: "Buyer Address", variable_name: "buyer_address", value: addressLine },
          { display_name: "Buyer City", variable_name: "buyer_city", value: city },
          { display_name: "Buyer State", variable_name: "buyer_state", value: state },
        ],
      },
    };

    try {
      const response = await axios.post("https://mxagro-paystack.onrender.com/api/initiate-payment", paymentData);
      localStorage.removeItem("cart");
      window.location.href = response.data.authorization_url;
    } catch (error) {
      console.error("Error initiating payment:", error);
      setCError("There was an issue initiating the payment. Please try again.");
      setIsCLoading(false);
    }
  };

  return (
    <div className="comforta pt-14 pb-40 md:px-20 w-[100vw] text-gray-900 bg-gray-50">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-w-full h-full">
        <div className="bg-gray-50 md:w-auto mx-auto md:mx-0 w-[90vw] md:border-r md:border-opacity-10 md:h-auto ">
          <div className="p-8 md:overscroll-y-none w-full lg:h-auto">
            <h2 className="text-2xl text-center font-bold text-black">Order Summary</h2>
            <div className="space-y-6 mt-10">
              {cartProducts.map((item) => (
                <div key={item._id} className="grid sm:grid-cols-2 items-start gap-6 mb-4">
                  <div className="border border-gray-700 px-4 py-6 shrink-0 bg-gray-50">
                    <Image
                      width={500}
                      height={600}
                      src={item.productImage}
                      className="w-full object-contain"
                      alt="Product"
                    />
                  </div>
                  <div>
                    <h3 className="text-base text-black">{item.productName}</h3>
                    <ul className="text-xs text-black space-y-3 mt-4">
                      <li className="flex flex-wrap gap-4">Category <span className="ml-auto">{item.productCategory}</span></li>
                      <li className="flex flex-wrap gap-4">Quantity <span className="ml-auto">{item.productQuantityPurchased}</span></li>
                      <li className="flex flex-wrap gap-4">Total Price <span className="ml-auto">N{formatNumber(item.totalProductPurchasedAmount)}</span></li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-between bg-transparent border-t-2 w-full p-4">
            <h4 className="flex flex-wrap gap-4 text-lg text-black">Total </h4>
            <h4 className="ml-auto text-lg text-black">N{formatNumber(totalAmount)}</h4>
          </div>
        </div>

        <div className="xl:col-span-2 h-max mt-20 md:mt-0 rounded-md p-8 sticky top-0">
          <h2 className="text-2xl font-bold text-[#333]">Complete your order</h2>
          <form className="mt-10">
            <div className="mt-6">
              <h3 className="text-lg font-bold text-[#333] mb-6">Shipping Address</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Address Line"
                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                    value={addressLine}
                    onChange={handleInputChange(setAddressLine)}
                  />
                  {formErrors.addressLine && <p className="text-red-500 mt-2">{formErrors.addressLine}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                    value={city}
                    onChange={handleInputChange(setCity)}
                  />
                  {formErrors.city && <p className="text-red-500 mt-2">{formErrors.city}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="State"
                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                    value={state}
                    onChange={handleInputChange(setState)}
                  />
                  {formErrors.state && <p className="text-red-500 mt-2">{formErrors.state}</p>}
                </div>
              </div>
              <div className="flex gap-6 flex-col md:flex-row mt-10">
                {isCLoading ? (
                  <div className="w-full flex justify-center items-center loader">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                  </div>
                ) : (
                  <button
                    onClick={initiatePayment}
                    type="button"
                    className="rounded-md px-6 py-3 w-72 text-sm font-semibold bg-green-600 text-white hover:bg-green-700"
                  >
                    Complete Purchase
                  </button>
                )}
              </div>
              {cerror && <p className="text-red-500 mt-4">{cerror}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
export const runtime = 'edge';
