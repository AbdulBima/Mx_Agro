"use client";
import { useState, useEffect, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { CartContext } from "@/components/hooks/CartContext";

export const DesktopNav = () => {
	const router = useRouter();
	const pathname = usePathname();

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const { cartProducts } = useContext(CartContext) ?? {};

	const handleDashboardAccess = () => {
		const nkt = window.localStorage.getItem("nkt");
		if (nkt) {
			router.push("/profile/user");
		} else {
			router.push("/login");
		}
	};

	return (
		<>
			<div className="hidden md:flex md:justify-center bodyFont px-12 py-2 mx-auto w-screen">
				<div className="relative flex items-center space-x-56 justify-center">
					<Link
						href="/"
						aria-label="Company"
						title="Company"
						className="inline-flex items-center"
					>
						<span className="ml-2 text-2xl myFont font-bold tracking-wide text-green-600 ">
							MxAgro
						</span>
					</Link>
					<ul className="flex items-center space-x-16">
						<li>
							<Link
								href="/"
								aria-label="Home"
								title="Home"
								className={`text-[11px] font-[600] comforta tracking-wide transition-colors duration-200 ${
									pathname === "/"
										? "text-gray-700 border-b-2 border-green-600"
										: "text-gray-700 hover:text-deep-purple-accent-400"
								}`}
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								href="/products"
								aria-label="Products"
								title="Products"
								className={`text-[11px] font-[600] comforta tracking-wide transition-colors duration-200 ${
									pathname === "/products"
										? "text-gray-700 border-b-2 border-green-600"
										: "text-gray-700 hover:text-deep-purple-accent-400"
								}`}
							>
								Products
							</Link>
						</li>
						<li>
							<Link
								href="/userorder"
								aria-label="User Orders"
								title="User Orders"
								className={`text-[11px] font-[600] comforta tracking-wide transition-colors duration-200 ${
									pathname === "/userorder"
										? "text-gray-700 border-b-2 border-green-600"
										: "text-gray-700 hover:text-deep-purple-accent-400"
								}`}
							>
								My Orders
							</Link>
						</li>
						<li>
							<a
								href="https://vendor-mxagro.pages.dev/signup"
								aria-label="Become a Vendor"
								title="Become a Vendor"
								target="_blank"
								className={`text-[11px] font-[600] comforta tracking-wide transition-colors duration-200 ${
									pathname === "/become-a-vendor"
										? "text-gray-700 border-b-2 border-green-600"
										: "text-gray-700 hover:text-deep-purple-accent-400"
								}`}
							>
								Become a Vendor
							</a>
						</li>
					</ul>
					<ul className="flex items-center space-x-6 text-black">
						<li>
							<div
								onClick={handleDashboardAccess}
								className="cursor-pointer"
								aria-label="Profile"
								title="Profile"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-5 h-5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 15.75c-4.793 0-8.25 2.125-8.25 4.125m16.5 0c0-2-3.457-4.125-8.25-4.125m0 0a4.125 4.125 0 100-8.25 4.125 4.125 0 000 8.25zM12 21.75a9.75 9.75 0 100-19.5 9.75 9.75 0 000 19.5z"
									/>
								</svg>
							</div>
						</li>
						<li>
							<Link
								className="flex flex-row"
								href="/cart"
								aria-label="Shopping Bag"
								title="Shopping Bag"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-5 h-5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.5 9V7.5A4.5 4.5 0 0012 3a4.5 4.5 0 00-4.5 4.5V9M3.75 9h16.5m-16.5 0l1.5 10.5A2.25 2.25 0 007.5 21.75h9a2.25 2.25 0 002.25-2.25L19.5 9m-16.5 0h16.5"
									/>
								</svg>
								<span>({cartProducts?.length})</span>
							</Link>
						</li>
						<li>
							<Link href="#" aria-label="Search" title="Search">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-5 h-5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 21l-4.35-4.35m1.1-6.35A7.35 7.35 0 1110.35 3.65a7.35 7.35 0 017.35 7.35z"
									/>
								</svg>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};
