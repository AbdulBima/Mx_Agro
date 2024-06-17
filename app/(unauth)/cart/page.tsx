"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { CartContext } from "@/components/hooks/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface ProductData {
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

const Cart = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return <p className="text-center text-gray-500">Error: Cart context not found.</p>;
  }

  const {
    cartProducts,
    addProductToCart,
    reduceProductQuantityInCart,
    removeProduct,
    totalAmount,
  } = cartContext;

  const handleReduceProductQuantity = (product: ProductData) => {
    reduceProductQuantityInCart(product);
  };

  const handleDeleteProductInCart = (product: ProductData) => {
    removeProduct(product);
    toast.success(`${product.productName} removed`, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleIncreaseProductQuantity = (product: ProductData) => {
    addProductToCart(product);
  };

  return (
    <>
      <div className="comforta  text-center md:text-left  md:px-20 pt-20  pb-32 md:pt-10 bg-gray-100 h-auto md:h-full">
        <div className="w-full md:max-w-7xl mx-auto ">
          <h2 className="text-3xl md:mt-o mt-10 font-extrabold text-gray-900">Cart</h2>

          {cartProducts && cartProducts.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-12 relative mt-10">
              <div className="lg:col-span-2 space-y-6">
                {cartProducts.map((item) => (
                  <div key={item._id} className="p-2 bg-white shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] rounded-md relative">
                    <div className="grid sm:grid-cols-2 items-center gap-4">
                      <div className="w-full h-full p-4 shrink-0 bg-gray-100">
                        <Image
                          width={500}
                          height={600}
                          unoptimized
                          src={item.productImage}
                          className="w-full h-full object-contain"
                          alt="Product"
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="text-xl font-bold text-gray-900">{item.productName}</h3>
                        <ul className="text-lg list-none md:list-disc text-gray-900 space-y-2.5  pl-4">
                          <li>Category: {item.productCategory}</li>
                          <li>Price: N{formatNumber(item.productPrice)}</li>
                          <li>{item.productDescription}</li>
                        </ul>

                        <div className="flex comforta items-center justify-between flex-wrap gap-4 mt-6">
                          <div className="flex items-center gap-4">
                            <h4 className="text-base font-bold text-gray-900">Qty:</h4>
                            <button
                              onClick={() => handleReduceProductQuantity(item)}
                              type="button"
                              className="bg-transparent py-2 font-semibold text-gray-900"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current" viewBox="0 0 124 124">
                                <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleIncreaseProductQuantity(item)}
                              type="button"
                              className="bg-transparent px-4 py-2 font-semibold text-gray-900 text-md shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)]"
                            >
                              {item.productQuantityPurchased}
                            </button>
                            <button
                              onClick={() => handleIncreaseProductQuantity(item)}
                              type="button"
                              className="bg-transparent py-2 font-semibold text-gray-900"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current" viewBox="0 0 42 42">
                                <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" />
                              </svg>
                            </button>
                          </div>

                          <div>
                            <h4 className="text-base font-bold text-gray-900">Total: N{formatNumber(item.totalProductPurchasedAmount)}</h4>
                          </div>
                        </div>

                        <div className="divide-x comforta border-y mt-6 grid grid-cols-2 text-center">
                          <Link
                            className="bg-transparent font-semibold py-3 text-gray-500 text-sm"
                            href={`/products/${item._id}`}
                          >
                            View details
                          </Link>
                          <button
                            onClick={() => handleDeleteProductInCart(item)}
                            type="button"
                            className="bg-transparent font-semibold py-3 text-gray-500 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white comforta pb-20  w-full mx-auto md:w-96 h-max rounded-md p-6 shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] sticky top-0">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-4">Order Summary</h3>

                <ul className="text-gray-900 text-sm mb-8 divide-y mt-6">
                  <li className="flex flex-wrap gap-4 py-3">
                    Subtotal
                    <span className="ml-auto font-bold">N{formatNumber(totalAmount)}</span>
                  </li>
                  <li className="flex flex-wrap gap-4 py-3">
                    Shipping
                    <span className="ml-auto font-bold">Free</span>
                  </li>
                  <li className="flex flex-wrap gap-4 py-3 font-bold">
                    Total
                    <span className="ml-auto">N{formatNumber(totalAmount)}</span>
                  </li>
                </ul>

                <Link
                  href={'/checkout'}
                  className="mt-28 mb-10  text-lg px-20 py-2.5 w-full bg-green-900 hover:bg-green-700 text-white rounded-md"
                >
                  Check out
                </Link>

                <div className="mt-20 space-y-6">
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-2">Secure payment</h4>
                    <p className="text-sm comforta text-gray-900">
                      Experience peace of mind with our secure payment options, ensuring your transactions are protected and reliable.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-2">Free delivery</h4>
                    <p className="text-sm text-gray-900">
                      Enjoy the convenience of free delivery on all your orders, providing a cost-effective and seamless shopping experience.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-2">Easy to return</h4>
                    <p className="text-sm text-gray-900">
                      Simplify your shopping experience with hassle-free returns. Our easy return process ensures convenience and customer satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center -mt-20 comforta h-screen w-screen  text-gray-500"><p>Your cart is empty.</p></div>
          )}
        </div>
      </div>

      <ToastContainer
        position="top-left"
        autoClose={3000} // Close toast automatically after 3 seconds
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

export default Cart;
export const runtime = 'edge';
