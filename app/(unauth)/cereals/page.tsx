"use client";

import ProductCard from "@/components/ProductCard";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the type for product items
interface Product {
  id: string;
  productCategory: string;
  imageSrc: string;
  title: string;
  brand: string;
  price: number;
  originalPrice: number;
}

// Function to format the price with commas
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', { style: 'decimal' }).format(price);
};

export default function Cereals() {
  const [selectedCategory, setSelectedCategory] = useState<string>('cereals');
  const [cartItems, setCartItems] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://mxagro-backend.onrender.com/api/products");
        const data = response.data;
        // Transform the data to match the structure expected by ProductCard component
        const transformedData: Product[] = data.map((item: any) => ({
          id: item._id,
          productCategory: item.productCategory,
          imageSrc: item.productImage,
          title: item.productName,
          brand: item.productVendor._id, // assuming the brand name is the vendor ID for now
          price: item.productPrice,
          originalPrice: item.productPrice // assuming originalPrice is the same as price for now
        }));
        setCartItems(transformedData);
				setIsLoading(false);
      } catch (error) {
				console.error('Failed to fetch products:', error);
				setIsLoading(false);

      }
    };

    fetchProducts();
  }, []);

 

  const filteredItems = selectedCategory
    ? cartItems.filter((item) => item.productCategory === selectedCategory)
    : cartItems;

  return (
    <main className='comforta flex min-h-screen flex-col items-center justify-between pb-40 '>
      <div className='bg-white py-6 md:py-8'>
        <div className='mx-auto w-full md:max-w-screen-2xl pt-20 px-4 md:px-8'>
          {/* text - start */}
          <div className='mb-10 md:mb-16'>
            <p className=' mx-auto mb-6 max-w-screen-md text-2xl font-bold text-center text-black '>
             Cereals
            </p>

            <p className='hidden md:flex mx-auto max-w-screen-md text-sm text-center text-gray-500 '>
            Discover a diverse selection of cereals on our Agro Multivendor Ecommerce Platform. Connect with farmers and vendors across Niger State to find the best quality grains. Join us in fostering a thriving cereal market and supporting sustainable agriculture. Learn more.
            </p>

            <p className=' md:hidden mx-auto max-w-screen-md text-sm text-center text-gray-500 '>
            Discover a diverse selection of cereals on our Agro Multivendor Ecommerce Platform. 
            </p>
          </div>
          {/* text - end */}

       


					{isLoading ?   ( <div className='flex justify-center items-center '> <div className="loader">
                                        <span className="bar"></span>
                                        <span className="bar"></span>
                                        <span className="bar"></span>
					</div></div>) :
						(<div className='grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4'>
						{filteredItems.map((item) => (
							<ProductCard
								key={item.id}
								id={item.id}
								imageSrc={item.imageSrc}
								title={item.title}
								productCategory={item.productCategory}
								price={formatPrice(item.price)} // Format the price
								originalPrice={formatPrice(item.originalPrice)} // Format the original price if needed
							/>
						))}
					</div>)}
        </div>
      </div>

  
    </main>
  );
}
