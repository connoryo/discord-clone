import { useEffect, useState } from "react"

// Simple hook to get the website's origin URL
export const useOrigin = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

    if (!mounted) {
        return "";
    }

    return origin;
}