"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useTokenVerification from "@/components/hooks/useTokenVerification";

interface User {
    _id: string;
    name: string;
    email: string;
    contact: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}

const UserProfile = () => {
    const [user, setUser] = useState<User | null>(null);
    const { userId, userContact, userEmail, error, isLoading } = useTokenVerification();
    const router = useRouter();

    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get(
                        `https://mxagro-backend.onrender.com/api/users/${userId}`
                    );
                    setUser(response.data);
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
    }
    
    return (
        <div className="flex comforta pt-28 md:pt-10 pb-40 px-0 md:w-screen w-[80vw] mx-auto">
            <div className="w-full flex items-center justify-center flex-col">
                <Image
                    width={60}
                    height={60}
                    className="object-cover mb-16 mt-5 mx-auto w-60 h-60 rounded-full"
                    src="https://images.unsplash.com/photo-1614807536394-cd67bd4a634b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User Profile Picture"
                    unoptimized
                />
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                    <div className="grid grid-cols-2 gap-1  md:grid-cols-3 md:gap-10 p-3 even:bg-gray-50 ">
                        <dt className="font-medium text-gray-900">Name:</dt>
                        <dd className="text-gray-700 -ml-12 md:ml-0 sm:col-span-2">{user?.name}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-2 md:gap-10 p-3 even:bg-gray-50 ">
                        <dt className="font-medium text-gray-900">Email:</dt>
                        <dd className="text-gray-700 sm:col-span-2">{user?.email}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-2 md:gap-10 p-3 even:bg-gray-50 ">
                        <dt className="font-medium text-gray-900">Contact:</dt>
                        <dd className="text-gray-700 sm:col-span-2">{user?.contact}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-2 md:gap-10 p-3 even:bg-gray-50 ">
                        <dt className="font-medium text-gray-900">Address:</dt>
                        <dd className="text-gray-700 sm:col-span-2">{user?.address}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-2 md:gap-10 p-3 even:bg-gray-50 ">
                        <dt className="font-medium text-gray-900">Joined At:</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                        </dd>
                    </div>
                    <div className="grid grid-cols-3 gap-2 md:gap-10 p-3 even:bg-gray-50 ">
                        <dt className="font-medium text-gray-900">Verified:</dt>
                        <dd className="text-gray-700 sm:col-span-2">True</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default UserProfile;
export const runtime = "edge";
