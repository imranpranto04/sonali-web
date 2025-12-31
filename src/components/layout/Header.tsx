// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Sprout, Menu } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { useLangStore } from "@/store/lang-store";
// import { useMenu } from "@/hooks/use-menu";
// import { LoginDropdown } from "./Navbar/LoginDropdown";
// import { MobileNav } from "./Navbar/MobileNav";
// import { DesktopNavItem } from "./Navbar/DesktopNavItem";
// import NavTopbar from "./Navbar/NavTopbar";

// export default function Header() {
//   const [scrolled, setScrolled] = React.useState(false);
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const pathname = usePathname();

//   const { lang } = useLangStore();

//   // Use Hook for Dynamic Data
//   // Default to empty array to prevent undefined errors
//   const { data: menuItems = [], isLoading } = useMenu();

//   // console.log("Data Nav", menuItems); // Debugging

//   const loginText = lang === "bng" ? "পলিসিহোল্ডার লগইন" : "Policyholder Login";
//   const logoSubtitle =
//     lang === "bng" ? "ইনস্যুরেন্স কোম্পানি" : "Insurance Company";

//   // Scroll effect for sticky header
//   React.useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header className="fixed top-0 left-0 right-0 z-40 font-sans">
//       {/* 1. Top Bar (Collapses on scroll) */}
//       <div
//         className={cn(
//           "transition-all duration-500 ease-in-out overflow-hidden",
//           scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
//         )}
//       >
//         <NavTopbar />
//       </div>

//       {/* 2. Main Navbar */}
//       <nav
//         className={cn(
//           "bg-white transition-all duration-300 border-b border-slate-100",
//           scrolled ? "py-2 shadow-lg" : "py-3 lg:py-4"
//         )}
//       >
//         <div className="container mx-auto px-4 flex items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-3 group shrink-0">
//             <div className="relative w-10 h-10 flex items-center justify-center">
//               <Sprout className="w-full h-full text-[#65a30d]" />
//               <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#f97316] rounded-full border-2 border-white"></div>
//             </div>
//             <div className="flex flex-col leading-none">
//               <span className="text-xl md:text-2xl font-bold text-[#b45309] tracking-tight whitespace-nowrap">
//                 সোনালী লাইফ
//               </span>
//               <span
//                 className={cn(
//                   "text-[9px] md:text-[10px] font-bold text-[#15803d] uppercase tracking-[0.25em] mt-0.5",
//                   lang === "bng" ? "font-sans" : ""
//                 )}
//               >
//                 {logoSubtitle}
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden lg:flex items-center gap-1 xl:gap-2">
//             {isLoading ? (
//               <div className="flex gap-4">
//                 {[1, 2, 3, 4, 5].map((i) => (
//                   <div
//                     key={i}
//                     className="h-8 w-20 bg-slate-100 rounded-lg animate-pulse"
//                   />
//                 ))}
//               </div>
//             ) : (
//               menuItems &&
//               menuItems.length > 0 &&
//               menuItems.map((link) => (
//                 <DesktopNavItem
//                   key={link.label + link.href}
//                   item={link}
//                   isActive={
//                     pathname === link.href ||
//                     (link.href !== "/" && pathname.startsWith(link.href))
//                   }
//                 />
//               ))
//             )}
//           </div>

//           {/* Desktop Login Button */}
//           <div className="hidden lg:block shrink-0 ml-4">
//             <LoginDropdown />
//           </div>

//           {/* Mobile Toggle Button */}
//           <button
//             className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
//             onClick={() => setMobileOpen(true)}
//           >
//             <Menu className="w-7 h-7" />
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Drawer */}
//       {/* Passing isOpen and onClose to match your updated MobileNav component */}
//       <MobileNav
//         isOpen={mobileOpen}
//         onClose={() => setMobileOpen(false)}
//         items={menuItems || []}
//         loginText={loginText}
//       />
//     </header>
//   );
// }

// workable down

// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Sprout, Menu } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { useLangStore } from "@/store/lang-store";
// import { useMenu } from "@/hooks/use-menu";
// import { LoginDropdown } from "./Navbar/LoginDropdown";
// import { MobileNav } from "./Navbar/MobileNav";
// import { DesktopNavItem } from "./Navbar/DesktopNavItem";
// import NavTopbar from "./Navbar/NavTopbar";
// import Image from "next/image";

// export default function Header() {
//   const [scrolled, setScrolled] = React.useState(false);
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const pathname = usePathname();

//   const { lang } = useLangStore();

//   // Use Hook for Dynamic Data
//   // Default to empty array to prevent undefined errors
//   const { data: menuItems = [], isLoading } = useMenu();

//   // console.log("Data Nav", menuItems); // Debugging

//   const loginText = lang === "bng" ? "পলিসিহোল্ডার লগইন" : "Policyholder Login";

//   // Scroll effect for sticky header
//   React.useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header className="fixed top-0 left-0 right-0 z-40 font-sans">
//       {/* 1. Top Bar (Collapses on scroll) */}
//       <div
//         className={cn(
//           "transition-all duration-500 ease-in-out overflow-hidden",
//           scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
//         )}
//       >
//         <NavTopbar />
//       </div>

//       {/* 2. Main Navbar */}
//       <nav
//         className={cn(
//           "bg-white transition-all duration-300 border-b border-slate-100",
//           scrolled ? "py-2 shadow-lg" : "py-3 lg:py-4"
//         )}
//       >
//         <div className="container mx-auto px-4 flex items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-3 group shrink-0">
//             <Image src="/logo.png" alt="Sonali life" height={75} width={250} />
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden lg:flex items-center gap-1 xl:gap-2">
//             {isLoading ? (
//               <div className="flex gap-4">
//                 {[1, 2, 3, 4, 5].map((i) => (
//                   <div
//                     key={i}
//                     className="h-8 w-20 bg-slate-100 rounded-lg animate-pulse"
//                   />
//                 ))}
//               </div>
//             ) : (
//               menuItems &&
//               menuItems.length > 0 &&
//               menuItems.map((link) => (
//                 <DesktopNavItem
//                   key={link.label + link.href}
//                   item={link}
//                   isActive={
//                     pathname === link.href ||
//                     (link.href !== "/" && pathname.startsWith(link.href))
//                   }
//                 />
//               ))
//             )}
//           </div>

//           {/* Desktop Login Button */}
//           <div className="hidden lg:block shrink-0 ml-4">
//             <LoginDropdown />
//           </div>

//           {/* Mobile Toggle Button */}
//           <button
//             className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
//             onClick={() => setMobileOpen(true)}
//           >
//             <Menu className="w-7 h-7" />
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Drawer */}
//       {/* Passing isOpen and onClose to match your updated MobileNav component */}
//       <MobileNav
//         isOpen={mobileOpen}
//         onClose={() => setMobileOpen(false)}
//         items={menuItems || []}
//         loginText={loginText}
//       />
//     </header>
//   );
// }

// new
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { NavTopbar } from "./Navbar/NavTopbar";
import { Navbar } from "./Navbar/Navbar";
// The new component below

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* The Topbar handles its own visibility state internally 
        based on your code, so we just place it here.
      */}
      <NavTopbar />

      {/* The Main Navbar */}
      <div
        className={cn(
          "w-full transition-all duration-300 ease-in-out border-b backdrop-blur-md",
          isScrolled
            ? "bg-white/80 border-slate-200 shadow-md py-2"
            : "bg-white border-transparent py-4 "
        )}
      >
        <Navbar />
      </div>
    </header>
  );
}
