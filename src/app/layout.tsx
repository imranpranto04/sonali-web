import type { Metadata } from "next";
import { Manrope, Noto_Sans_Bengali } from "next/font/google";
// import { Oswald } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar/Navbar";
// import Topbar from "@/components/layout/Topbar";
// import Footer from "@/components/common/Footer";
import QueryProvider from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

// import Topbar from "@/components/layout/Topbar";

// 1. Setup Manrope (English)
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope", // This name is important
  display: "swap",
});

// 2. Setup Noto Sans Bengali (Bengali)
const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali", // This name is important
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sonali Life Insurance",
  description: "Secure with Sonali Life Insurance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={manrope.className} suppressHydrationWarning={true}> */}
      <body
        className={`${manrope.variable} ${notoSansBengali.variable} font-sans antialiased bg-slate-50 text-slate-900`}
        suppressHydrationWarning={true}
      >
        {/* Notice: No Header/Footer here. 
            This keeps the Login page clean! 
            The Header/Footer are only in (public)/layout.tsx
        */}

        {/* Wrap the entire app in QueryProvider so useQuery works everywhere */}
        <QueryProvider>{children}</QueryProvider>

        {/* Add this line at the bottom. It renders the toast popups. */}
        <Toaster position="top-center" richColors />
      </body>

      {/* <body className={` ${manrope.variable} antialiased`}>{children}</body> */}
    </html>
  );
}
