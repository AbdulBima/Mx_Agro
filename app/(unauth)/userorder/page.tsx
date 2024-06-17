"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import useTokenVerification from "../../../components/hooks/useTokenVerification";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  _id: string;
  productName: string;
  productVendor: string;
  productLocation: string;
  productPrice: number;
  productQuantity: number;
  productQuantityPurchased: number;
  productDescription: string;
  productImage: string;
  productCategory: "cereals" | "vegetables" | "tubers";
  totalProductPurchasedAmount: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface Order {
  _id: string;
  buyerId: string;
  buyerEmail: string;
  buyerContact: string;
  buyerAddress: string;
  buyerCity: string;
  buyerState: string;
  orderAmount: number;
  order: Product[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const UserOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { userId, isLoading } = useTokenVerification();
  const router = useRouter();

  useEffect(() => {
    if (userId) { // Check if userId is not null
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `https://mxagro-backend.onrender.com/api/order/orders/${userId}`
          );
          setOrders(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUser();
    }
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
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

  // Function to add thousand separators
  const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="comforta pt-10 pb-40 overflow-y-scroll overscroll-y-auto md:overflow-x-hidden mx-auto px-20 flex flex-col  w-screen h-screen ">
      <h2 className="md:text-2xl pt-20 text-xl font-extrabold text-center  text-black">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="md:text-xl text-sm py-8  text-black">
          No orders found
        </p>
      ) : (
        orders.map((order, index) => (
          <div key={order._id} className="md:mt-10 mt-4">
            <div className="flex flex-row w-full ml-36 space-x-16">
              <h2 className="whitespace-nowrap md:text-xl  font-bold text-lg py-8  text-black">
                Order: {index + 1}
              </h2>
              <h2 className="whitespace-nowrap md:text-xl font-bold text-lg py-8  text-black">
                Order ID: {order._id}
              </h2>
              <h2 className="whitespace-nowrap md:text-xl font-bold text-lg py-8  text-black">
								Order Amount: N{numberWithCommas( order.orderAmount / 100)}
              </h2>
            </div>
            <table className="w-80 divide-y-2 mx-auto divide-green-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr className="bg-green-500">
                  <th className="whitespace-nowrap px-4 py-2 font-bold text-white">
                    Product Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-bold text-white">
                    Vendor
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-bold text-white">
                     Quantity 
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-bold text-white">
                    Product Price
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-bold text-white">
                    Total Amount
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 ffont-bold text-white">
                    Status
                  </th>

                  <th className="whitespace-nowrap px-4 py-2 ffont-bold text-white">
                    Review
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {order.order.map((orderItem) => (
                  <tr className="bg-green-100 bg-opacity-50" key={orderItem._id}>
                    <td className="whitespace-nowrap px-4 py-2">
                      {orderItem.productName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
    <a href={`https://mxagro.pages.dev/vendor/${orderItem.productVendor}`} target="_blank" className="text-orange-400 underline underline-offset-4">
       Vendor info
    </a>
</td>

                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {orderItem.productQuantityPurchased}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      N{orderItem.productPrice}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      N{numberWithCommas(orderItem.totalProductPurchasedAmount)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Delivered
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-orange-400 underline underline-offset-4">
                      Add a Review
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrder;
