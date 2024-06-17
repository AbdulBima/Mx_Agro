import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductProps {
  id: string;
  imageSrc: string;
  title: string;
  productCategory: string;
  price: string; // Changed from number to string
  originalPrice: string; // Changed from number to string
}

const ProductCard: React.FC<ProductProps> = ({ id, imageSrc, title, productCategory, price }) => {
  return (
    <div>
      <Link href={`/products/${id}`}>
        <div className="group relative mb-2 block h-96 overflow-hidden hover:scale-95 bg-white shadow-sm lg:mb-3">
          <Image className="object-contain mt-14" width={900} height={900} unoptimized src={imageSrc} alt={title} />
          <div className="absolute left-0 bottom-2 flex gap-2"></div>
        </div>
      </Link>

      <div className="flex items-start justify-between gap-2 px-2">
        <div className="flex flex-col">
          <Link href={`/products/${id}`}>
            <div className="text-sm font-bold text-gray-800 transition duration-100 hover:text-gray-500 md:text-sm">{title}</div>
          </Link>
          <span className="text-green-500 text-sm "> {productCategory}</span>
        </div>

        <div className="flex flex-col items-end">
          <span className=" text-black font-semibold text-lg ">N{price}</span> {/* Changed to render the price directly */}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
