"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import CustomerReviews from "@/components/Reviews";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/hooks/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const ProductDetail: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { cartProducts, addProductToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://mxagro-backend.onrender.com/api/products/${productId}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = (product: Product) => {
    addProductToCart(product);
    toast.success(`${product.productName} added to cart`, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className="loader">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='flex comforta justify-center items-center h-screen'>
        <p>Product not found</p>
      </div>
    );
  }

  const isProductInCart = cartProducts.some((cartProduct) => cartProduct._id === product._id);

  return (
    <>
      <section className="comforta text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <Image
              width={900}
              height={900}
              unoptimized
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={product.productImage}
            />
            <div className="mt-10 md:mt-0 lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h1 className="text-gray-900 text-xl title-font font-medium mb-4">
                {product.productName}
              </h1>
              <div className="flex mb-4">
                <a className="flex-grow text-gray-500 border-b border-green-500 py-2 text-sm px-1">
                  Description
                </a>
              </div>
              <p className="leading-relaxed text-sm mb-4">
                {product.productDescription}
              </p>
              <div className="flex text-sm border-t mt-8 border-gray-200 py-2">
                <span className="text-gray-500">Category</span>
                <span className="ml-auto text-gray-900">
                  {product.productCategory}
                </span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Size</span>
                <span className="ml-auto text-gray-900">
                  50 kg
                </span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Location</span>
                <span className="ml-auto text-gray-900">
                  {product.productLocation}
                </span>
              </div>
              <div className="flex border-b mb-10 border-gray-200 py-2">
                <span className="">
                  <Link className="flex flex-row" href={`/vendor/${product.productVendor._id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                    </svg>
                    <p className="text-orange-500 text-sm mt-1 ml-2">Vendor</p>
                  </Link>
                </span>
              </div>
              <div className="flex mt-4">
                <span className="title-font font-medium text-2xl text-gray-900">
                  N{product.productPrice}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`flex ml-auto text-white border-0 py-2 px-6 focus:outline-none rounded ${
                    isProductInCart ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                  }`}
                  disabled={isProductInCart}
                >
                  {isProductInCart ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
           
          </div>
        </div>
        <CustomerReviews />
      </section>

      <ToastContainer
        position='top-left'
        autoClose={3000}
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

export default ProductDetail;
export const runtime = "edge";
