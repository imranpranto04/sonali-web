import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone",
  // new for image
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**", // Allows all paths from Unsplash
      },
      {
        protocol: "https",
        hostname: "erp.sonalilife.com",
        pathname: "/**", // Allow all paths under this domain
      },
      // {
      //   protocol: "https",
      //   hostname: "erp.sonalilife.com",
      // },
    ],
  },
  // !new for image
};

export default nextConfig;
