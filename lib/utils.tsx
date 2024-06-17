import { clsx } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { twMerge } from "tailwind-merge";

export function cn(
	...inputs: (string | AppRouterInstance)[]
) {
	return twMerge(clsx(inputs));
}
