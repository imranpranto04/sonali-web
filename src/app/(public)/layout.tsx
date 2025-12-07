// import type { Metadata } from "next";
// import { Manrope } from "next/font/google";
// import { Oswald } from "next/font/google";
// import "../globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
// import Topbar from "@/components/layout/Topbar";
import Footer from "@/components/common/Footer";
// import Topbar from "@/components/layout/Topbar";

// const manrope = Manrope({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   display: "swap",
// });

// const oswald = Oswald({
//   // variable: "--font-manrope",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Sonali Life Insurancep",
//   description: "Secure with Sonali Life Insurance.",
// };

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Topbar /> */}
      {/* <Topbar /> */}

      {/* Premiun Navbar + Topbar */}
      <Navbar />
      {/* !Premiun Navbar + Topbar */}

      <main className="min-h-screen mt-42">{children}</main>

      <footer>
        <Footer />
      </footer>

      {/* <body className={` ${manrope.variable} antialiased`}>{children}</body> */}
    </>
  );
}
