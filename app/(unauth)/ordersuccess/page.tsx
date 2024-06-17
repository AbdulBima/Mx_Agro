"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const OrderSuccess = () => {
	const [trxref, setTrxref] = useState<string | null>(
		null
	);
	const [reference, setReference] = useState<
		string | null
	>(null);

	useEffect(() => {
		// Call useSearchParams directly within the useEffect hook
		const searchParams = new URLSearchParams(
			window.location.search
		);

		// Retrieve and set values using useState
		const trxrefParam = searchParams.get("trxref");
		const referenceParam =
			searchParams.get("reference");

		// Update state with the retrieved values
		setTrxref(trxrefParam);
		setReference(referenceParam);
	}, []);

	return (
		<div className='comforta w-screen h-screen md:-mt-20 flex flex-col md:space-y-10 space-y-4 items-center justify-center'>
			<h2 className='deskPara md:ml-10  text-black text-lg md:text-xl'>
				Thank you for your order!
			</h2>
			<h2 className='deskPara md:ml-10   text-black text-lg md:text-xl'>
				Transaction Reference:
			</h2>
			<h1 className='deskPara font-bold md:ml-10   text-black text-xl md:text-xl'>
				{trxref}
			</h1>
			<a
				href='/'
				className='deskPara md:ml-10   text-red-300 underline underline-offset-4 decoration-2 text-sm md:text-lg'
			>
				{" "}
				Back to Home Page{" "}
			</a>
		</div>
	);
};

export default OrderSuccess;
