"use client";

import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";

// Define the Product interface to type the product object

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
  

// Define the CartContextType interface to type the context value
interface CartContextType {
    cartProducts: Product[];
    setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    addProductToCart: (product: Product) => void;
    removeProduct: (product: Product) => void;
    reduceProductQuantityInCart: (product: Product) => void;
    clearCart: () => void;
    totalAmount: number;
}

// Create the CartContext with undefined initial value
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the props for the CartContextProvider component
interface CartContextProviderProps {
    children: ReactNode;
}

// Custom hook to use the CartContext
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartContextProvider");
    }
    return context;
};

// CartContextProvider component to provide cart context to its children
export const CartContextProvider: React.FC<CartContextProviderProps> = ({ children }) => {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);

    // Load cart products from localStorage on component mount
    // This code runs only in the browser (client side) because useEffect is not executed during server-side rendering
    useEffect(() => {
        if (typeof window !== "undefined") { // Ensure localStorage is accessed only in the browser
            const savedCart = localStorage.getItem("cart");
            if (savedCart) {
                setCartProducts(JSON.parse(savedCart) as Product[]);
            }
        }
    }, []);

    // Save cart products to localStorage whenever they change
    useEffect(() => {
        if (cartProducts.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cartProducts));
        } else {
            localStorage.removeItem("cart");
        }
    }, [cartProducts]);

    // Add a product to the cart
    const addProductToCart = (product: Product) => {
        setCartProducts((prevCartProducts) => {
            const productExists = prevCartProducts.find((item) => item._id === product._id);
            if (productExists) {
                // If product exists, increase the purchased quantity and update total amount
                return prevCartProducts.map((cartItem) =>
                    cartItem._id === product._id
                        ? {
                              ...cartItem,
                              productQuantityPurchased: cartItem.productQuantityPurchased + 1,
                              totalProductPurchasedAmount: (cartItem.productQuantityPurchased + 1) * cartItem.productPrice,
                          }
                        : cartItem
                );
            } else {
                // If product doesn't exist, add it to the cart with initial quantity and amount
                return [
                    ...prevCartProducts,
                    { 
                        ...product, 
                        productQuantityPurchased: 1, 
                        totalProductPurchasedAmount: product.productPrice 
                    },
                ];
            }
        });
    };

    // Reduce the quantity of a product in the cart
    const reduceProductQuantityInCart = (product: Product) => {
        setCartProducts((prevCartProducts) => {
            return prevCartProducts.map((cartItem) =>
                cartItem._id === product._id
                    ? {
                          ...cartItem,
                          productQuantityPurchased:
                              cartItem.productQuantityPurchased > 1
                                  ? cartItem.productQuantityPurchased - 1
                                  : cartItem.productQuantityPurchased,
                          totalProductPurchasedAmount: cartItem.productQuantityPurchased > 1
                              ? (cartItem.productQuantityPurchased - 1) * cartItem.productPrice
                              : cartItem.totalProductPurchasedAmount,
                      }
                    : cartItem
            );
        });
    };

    // Remove a product from the cart
    const removeProduct = (product: Product) => {
        setCartProducts((prevCartProducts) =>
            prevCartProducts.filter((cartItem) => cartItem._id !== product._id)
        );
    };

    // Clear the cart
    const clearCart = () => {
        setCartProducts([]);
    };

    // Calculate the total amount whenever the cart products change
    useEffect(() => {
        const newTotalAmount = cartProducts.reduce(
            (sum, item) => sum + item.totalProductPurchasedAmount,
            0
        );
        setTotalAmount(newTotalAmount);
    }, [cartProducts]);

    // Provide the cart context value to children components
    return (
        <CartContext.Provider
            value={{
                cartProducts,
                setCartProducts,
                addProductToCart,
                reduceProductQuantityInCart,
                removeProduct,
                clearCart,
                totalAmount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
