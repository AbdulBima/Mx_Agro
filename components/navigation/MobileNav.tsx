"use client";
import React, { useState, useContext } from "react";
import GeneralSiteMenu from "./GeneralSiteMenu";
import Link from "next/link";
import { CartContext } from "@/components/hooks/CartContext";


const MobileNav = () => {
	const [isMenuOpen, setMenuOpen] = useState(false);
	
	const { cartProducts } = useContext(CartContext) ?? {};


	// Function to toggle the menu state
	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	return (
		<>
			<div className='md:hidden fixed top-0 z-50 flex w-screen h-14 px-4 pb-4 pt-3 flex-row justify-between mt-0 bg-green-700 shadow-sm border-b border-green-200'>
				<div className='flex'>
					<div
						className='dropdown'
						onClick={toggleMenu}
					>
						<div
							tabIndex={0}
							role='button'
							className='btn btn-ghost btn-circle'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								fill='white'
								viewBox='0 0 24 24'
								stroke='white'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h16M4 18h7'
								/>
							</svg>
						</div>
					</div>
				</div>
				<div className='flex'>
					<Link
						href='/'
						className='btn btn-ghost myFont font-bold text-xl text-white '
					>
						MxAgro
					</Link>
				</div>
				<div className='flex'>
				<Link href="/cart" className=" flex items-center justify-center rounded-3xl bg-transparent text-white  ">
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
          </svg>{cartProducts?.length}
        </Link>
				</div>
			</div>

			{isMenuOpen && (
				<GeneralSiteMenu closeMenu={closeMenu} />
			)}
		</>
	);
};

export default MobileNav;
