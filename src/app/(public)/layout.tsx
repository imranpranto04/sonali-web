// import type { Metadata } from "next";
// import { Manrope } from "next/font/google";
// import { Oswald } from "next/font/google";
// import "../globals.css";
import { Navbar } from "@/components/layout/Navbar/Navbar";
// import Topbar from "@/components/layout/Topbar";
import Footer from "@/components/common/Footer";
import { Header } from "@/components/layout/Header";
// import Topbar from "@/components/layout/Topbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Premiun Navbar + Topbar */}
      {/* <Navbar /> */}
      <Header />
      {/* !Premiun Navbar + Topbar */}

      <main className="min-h-screen mt-45">{children}</main>

      <footer>
        <Footer />
      </footer>

      {/* <body className={` ${manrope.variable} antialiased`}>{children}</body> */}
    </>
  );
}
