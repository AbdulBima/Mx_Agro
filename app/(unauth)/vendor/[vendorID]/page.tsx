"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Vendor {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    contact: string;
    createdAt: string;
    updatedAt: string;
}

const VendorProfile = () => {
    const { vendorID } = useParams();
    const [vendor, setVendor] = useState<Vendor | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchVendor = async () => {
            try {
                const response = await axios.get(
                    `https://mxagro-backend.onrender.com/api/vendor/vendorId/${vendorID}`
                );
                setVendor(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching vendor data:", error);
                setLoading(false);
            }
        };

        if (vendorID) {
            fetchVendor();
        }
    }, [vendorID]);

    if (loading) {
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

    if (!vendor) {
        return <p className="mx-auto mt-60">Vendor not found</p>;
    }

    return (
        <div className="flex bodyText pt-20 pb-40 px-0 md:w-screen w-[80vw] mx-auto">
            <div className="w-full flex items-center justify-center flex-col">
                <Image
                    width={60}
                    height={60}
                    className="object-cover mb-16 mt-5 mx-auto w-60 h-60 rounded-full"
                    src="https://images.unsplash.com/photo-1614807536394-cd67bd4a634b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Vendor Profile Picture"
                    unoptimized
                />
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                    {/* <div className="grid grid-cols-3 gap-2 md:gap-10 p-3 even:bg-gray-50 ">
                        <dt className="font-medium text-gray-900">Vendor ID:</dt>
                        <dd className="text-gray-700 sm:col-span-2">{vendor._id}</dd>
                    </div> */}
                    <div className="grid grid-cols-3 gap-2 md:gap-10 p-3 even:bg-gray-50 ">
                        <dt className="font-medium text-gray-900">Name:</dt>
                        <dd className="text-gray-700 sm:col-span-2">{vendor.first_name} {vendor.last_name}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-2 md:gap-10 p-3 even:bg-gray-50 ">
                        <dt className="font-medium text-gray-900">Email:</dt>
                        <dd className="text-gray-700 sm:col-span-2">{vendor.email}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-2 md:gap-10 p-3 even:bg-gray-50 ">
                        <dt className="font-medium text-gray-900">Contact:</dt>
                        <dd className="text-gray-700 sm:col-span-2">{vendor.contact}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-2 md:gap-10 p-3 even:bg-gray-50 ">
                        <dt className="font-medium text-gray-900">Joined At:</dt>
                        <dd className="text-gray-700 sm:col-span-2">{new Date(vendor.createdAt).toLocaleDateString()}</dd>
                    </div>

										<div className="grid grid-cols-3 gap-2 md:gap-10 p-3 even:bg-gray-50 ">
                        <dt className="font-medium text-gray-900">Verified: </dt>
                        <dd className="text-gray-700 sm:col-span-2">True</dd>
                    </div>
                    {/* Uncomment if updated date is needed */}
                    {/* <div className="grid grid-cols-3 gap-2 md:gap-10 p-3 even:bg-gray-50 ">
                        <dt className="font-medium text-gray-900">Updated At:</dt>
                        <dd className="text-gray-700 sm:col-span-2">{new Date(vendor.updatedAt).toLocaleDateString()}</dd>
                    </div> */}
                </dl>
            </div>
        </div>
    );
};

export default VendorProfile;
export const runtime = "edge";
