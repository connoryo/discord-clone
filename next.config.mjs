/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "utfs.io",
            },
            {
                protocol: "https",
                hostname: "uploadthing.com",
            }
        ],
    }
};

export default nextConfig;
