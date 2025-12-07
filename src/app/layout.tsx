import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Oswald } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar/Navbar";
import Topbar from "@/components/layout/Topbar";
import Footer from "@/components/common/Footer";
import QueryProvider from "@/components/providers/QueryProvider";
// import Topbar from "@/components/layout/Topbar";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sonali Life Insurancep",
  description: "Secure with Sonali Life Insurance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className} suppressHydrationWarning={true}>
        {/* Notice: No Header/Footer here. 
            This keeps the Login page clean! 
            The Header/Footer are only in (public)/layout.tsx
        */}

        {/* Wrap the entire app in QueryProvider so useQuery works everywhere */}
        <QueryProvider>{children}</QueryProvider>
      </body>

      {/* <body className={` ${manrope.variable} antialiased`}>{children}</body> */}
    </html>
  );
}
