"use client"

import ProductCard from "@/components/ProductCard";
import React, { useState, useEffect, useMemo, useCallback } from 'react';
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

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
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

  const handleCategoryChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  }, []);

  const filteredItems = useMemo(() => {
    return selectedCategory
      ? cartItems.filter((item) => item.productCategory === selectedCategory)
      : cartItems;
  }, [selectedCategory, cartItems]);

  return (
    <main className='comforta flex min-h-screen flex-col items-center justify-between pb-40 '>
      <div className='bg-white py-6 md:py-8'>
        <div className='mx-auto w-full md:max-w-screen-2xl pt-20 px-4 md:px-8'>
          {/* text - start */}
          <div className='mb-10 md:mb-16'>
            <p className='md:hidden mx-auto max-w-screen-md text-sm font-bold text-center text-gray-500 '>
              Explore our Agro Multivendor Ecommerce Platform, connecting farmers and vendors across Niger State.
            </p>

            <p className='hidden md:flex mx-auto max-w-screen-md text-sm text-center text-gray-500 '>
              Explore our Agro Multivendor Ecommerce Platform, connecting farmers and vendors across Niger State.
              Discover a seamless marketplace tailored to agricultural needs. Join us to cultivate a
              sustainable farming community. Learn more.
            </p>
          </div>
          {/* text - end */}

          {/* Category Buttons - start */}
          <div className="hidden md:flex justify-center text-sm space-x-8 pb-16">
            <button
              className={`py-2 px-4 rounded-full transition-colors duration-200 ${selectedCategory === '' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setSelectedCategory('')}
            >
              All Categories
            </button>
            <button
              className={`py-2 px-4 rounded-full transition-colors duration-200 ${selectedCategory === 'cereals' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setSelectedCategory('cereals')}
            >
              Cereals
            </button>
            <button
              className={`py-2 px-4 rounded-full transition-colors duration-200 ${selectedCategory === 'tubers' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setSelectedCategory('tubers')}
            >
              Tubers
            </button>
            <button
              className={`py-2 px-4 rounded-full transition-colors duration-200 ${selectedCategory === 'vegetables' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setSelectedCategory('vegetables')}
            >
              Vegetables
            </button>
            <button
              className={`py-2 px-4 rounded-full transition-colors duration-200 ${selectedCategory === 'processed' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setSelectedCategory('unprocessed')}
            >
              Unprocessed
            </button>
          </div>
          {/* Category Buttons - end */}

          {/* Mobile Category Select - start */}
          <div className="md:hidden flex justify-center pb-8">
            <select
              className='select select-bordered text-gray-500 comforta flex h-10 w-72 items-center justify-between rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value=''>All Categories</option>
              <option value='cereals'>Cereals</option>
              <option value='tubers'>Tubers</option>
              <option value='vegetables'>Vegetables</option>
              <option value='unprocessed'>Unprocessed</option>
            </select>
          </div>
          {/* Mobile Category Select - end */}

          {isLoading ? (
            <div className='flex justify-center items-center h-80'>
              <div className="loader">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </div>
          ) : (
            <div className='grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4'>
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
            </div>
          )}
        </div>
      </div>

      {/* <Collection /> */}
    </main>
  );
}
