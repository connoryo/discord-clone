import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Merge tailwind classes dynamically
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
