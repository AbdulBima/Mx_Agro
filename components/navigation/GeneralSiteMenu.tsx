"use client";

import React, { useEffect, useState, useContext } from "react";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import useTokenVerification from "../hooks/useTokenVerification";
import { CartContext } from "@/components/hooks/CartContext";



interface SiteMenuProps {
	closeMenu: () => void; // Prop to close the menu
}

const GeneralSiteMenu: React.FC<SiteMenuProps> = ({ closeMenu }) => {
	const router = useRouter();
	const pathname = usePathname();
	const [menuItems, setMenuItems] = useState<{ link: string; label: string }[]>([]);
  const { userId, isLoading } = useTokenVerification();

	useEffect(() => {
		const fetchMenuItems = async () => {
			try {
				const items = await getMenuItems(userId);
				setMenuItems(items);
			} catch (error) {
				console.error("Error fetching menu items:", error);
			}
		};

		fetchMenuItems();
	}, [userId]);

	// if (isLoading) {
	// 	return (
	// 		<div className='comforta fixed bg-transparent h-screen w-[100vw] border-b border-opacity-20 shadow-md orange-950 z-40 overflow-hidden'>
	// 			<div className="loader">
  //                                       <span className="bar"></span>
  //                                       <span className="bar"></span>
  //                                       <span className="bar"></span>
	// 				</div>
	// 		</div>
	// 	);
	// }


	const handleLogout = () => {
		window.localStorage.removeItem("nkt");
		router.push("/");
		closeMenu();
	};


	const handleVendorRedirect = () => {
		
		window.location.href = "https://vendor-mxagro.pages.dev/signup"
		closeMenu();
	};
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { y: "100%" },
		show: { y: "0%", transition: { duration: 0.4 } },
	};

	return (
		<div className='comforta fixed bg-green-700 h-screen w-[100vw] border-b border-opacity-20 shadow-md orange-950 z-40 overflow-hidden'>
			<motion.ul className='fixed  space-y-1 w-screen mx-auto px-5 pt-28' aria-label='Sidebar' variants={container} initial='hidden' animate='show'>
				{menuItems.map((menuItem, index) => (
					<div className='overflow-hidden z-40' key={index}>
						<motion.li variants={item} className=' text-white text-bold flex border-b border-white border-opacity-10 items-center px-3 py-2'>
							<Link href={menuItem.link}>
								<span className={cn("truncate text-xl", pathname === menuItem.link ? "text-white" : "")} onClick={closeMenu}>
									{menuItem.label}
								</span>
							</Link>
						</motion.li>
					</div>
				))}
				{userId ? (
					<motion.li variants={item} className=' text-white text-bold flex border-b border-white border-opacity-10 items-center px-3 py-2'>
						<button onClick={handleLogout} className='truncate text-xl text-white'>
							Logout
						</button>
					</motion.li>
				) : (
					<motion.li variants={item} className=' text-white text-bold flex border-b border-white border-opacity-10 items-center px-3 py-2'>
						<Link href='/login' className='truncate text-xl text-white'>
							Login
						</Link>
					</motion.li>
				)}

<motion.li  className=' text-white text-bold flex border-b border-white border-opacity-10 items-center px-3 py-2'>
						<button onClick={handleVendorRedirect} className='truncate text-xl text-white'>
							Become a Vendor
						</button>
					</motion.li>
			</motion.ul>
		</div>
	);
};

// Function to fetch menu items based on authentication status
const getMenuItems = async (userId: string | null): Promise<{ link: string; label: string }[]> => {
	let items: { link: string; label: string }[] = [];
	// Fetch menu items from API based on authentication status
	if (userId) {
		items = [
			{ link: "/", label: "Home" },
			{ link: "/userorder", label: "My Orders" },
			{ link: "/profile/user", label: "My Profile" },
			{ link: "/cereals", label: "Cereals" },
			{ link: "/tubers", label: "Tubers" },
			{ link: "/vegetables", label: "Vegetables" },
			{ link: "/faq", label: "FAQ" },
			{ link: "/terms", label: "Terms" },
			
		];
	} else {
		items = [
			{ link: "/", label: "Home" },
			{ link: "/cereals", label: "Cereals" },
			{ link: "/tubers", label: "Tubers" },
			{ link: "/vegetables", label: "Vegetables" },
			{ link: "/faq", label: "FAQ" },
			{ link: "/terms", label: "Terms" },
		];
	}
	return items;
};

export default GeneralSiteMenu;
