import type { Metadata } from "next";
import "@/app/globals.css";
import MobileNav from "@/components/navigation/MobileNav";
import Footer from "@/components/navigation/Footer";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { CartContextProvider } from "@/components/hooks/CartContext";

export const metadata: Metadata = {
	title: "MxAgro",
	description:
		"Explore our Agro Multivendor Ecommerce Platform, connecting farmers and vendors across Nigeria State",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className='overflow-x-hidden bodyText'>
				<CartContextProvider>
					<DesktopNav />
					<MobileNav />
					{children}
					</CartContextProvider>
				<Footer />
			</body>
		</html>
	);
}
