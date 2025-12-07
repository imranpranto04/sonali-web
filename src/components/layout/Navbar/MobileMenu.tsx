// // "use client";

// // import React, { useState, useRef, useEffect } from "react";
// // import Image from "next/image";
// // import { Button } from "@/components/ui/button";
// // import { ChevronDown, ChevronUp, X, Menu } from "lucide-react";

// // const MobileMenu = () => {
// //   const [open, setOpen] = useState(false);
// //   const [productOpen, setProductOpen] = useState(false);
// //   const menuRef = useRef<HTMLDivElement | null>(null);

// //   // Close menu on outside click
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
// //         setOpen(false);
// //       }
// //     };
// //     if (open) document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, [open]);

// //   return (
// //     <nav className="flex justify-between items-center py-3 px-4 relative">
// //       {/* Logo */}
// //       <Image src="/logo.png" alt="Insurance Logo" width={120} height={40} />

// //       {/* Hamburger Icon */}
// //       <button onClick={() => setOpen(!open)} className="text-[#0F3460] z-50">
// //         {open ? <X size={22} /> : <Menu size={22} />}
// //       </button>

// //       {/* Mobile Drawer */}
// //       {open && (
// //         <div
// //           ref={menuRef}
// //           className="absolute top-[60px] left-0 w-full bg-white shadow-lg p-6 z-40 transition-all duration-300"
// //         >
// //           <div className="flex flex-col gap-3 text-gray-700 font-medium">
// //             <a href="#" className="hover:text-[#F5A526] transition">
// //               Home
// //             </a>
// //             <a href="#" className="hover:text-[#F5A526] transition">
// //               About
// //             </a>

// //             {/* Accordion Dropdown */}
// //             <div>
// //               <button
// //                 onClick={() => setProductOpen(!productOpen)}
// //                 className="flex justify-between items-center w-full hover:text-[#F5A526] transition"
// //               >
// //                 <span>Products</span>
// //                 {productOpen ? (
// //                   <ChevronUp size={18} />
// //                 ) : (
// //                   <ChevronDown size={18} />
// //                 )}
// //               </button>

// //               <div
// //                 className={`overflow-hidden transition-all duration-300 ${
// //                   productOpen ? "max-h-40 mt-2" : "max-h-0"
// //                 }`}
// //               >
// //                 <div className="flex flex-col gap-2 pl-4 text-sm">
// //                   <a href="#" className="hover:text-[#F5A526]">
// //                     Life Insurance
// //                   </a>
// //                   <a href="#" className="hover:text-[#F5A526]">
// //                     Health Insurance
// //                   </a>
// //                   <a href="#" className="hover:text-[#F5A526]">
// //                     Travel Insurance
// //                   </a>
// //                 </div>
// //               </div>
// //             </div>

// //             <a href="#" className="hover:text-[#F5A526] transition">
// //               Calculator
// //             </a>
// //             <a href="#" className="hover:text-[#F5A526] transition">
// //               Blog
// //             </a>
// //             <a href="#" className="hover:text-[#F5A526] transition">
// //               Contact
// //             </a>

// //             <Button className="mt-3 bg-[#F5A526] text-white hover:bg-[#d6891f]">
// //               Policyholder Login
// //             </Button>
// //           </div>
// //         </div>
// //       )}
// //     </nav>
// //   );
// // };

// // export default MobileMenu;

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";

// type NavItem = {
//   label: string;
//   href?: string;
//   children?: { label: string; href: string }[];
// };

// const NAV: NavItem[] = [
//   { label: "Home", href: "/" },
//   { label: "About", href: "/about" },
//   {
//     label: "Products",
//     children: [
//       { label: "Life Insurance", href: "/products/life" },
//       { label: "Health Insurance", href: "/products/health" },
//       { label: "Travel Insurance", href: "/products/travel" },
//     ],
//   },
//   { label: "Calculator", href: "/calculator" },
//   { label: "Blog", href: "/blog" },
//   { label: "Contact", href: "/contact" },
// ];

// const MobileMenu = () => {
//   const [open, setOpen] = useState(false);
//   const [openAcc, setOpenAcc] = useState<Record<string, boolean>>({});
//   const drawerRef = useRef<HTMLDivElement | null>(null);
//   const pathname = usePathname();

//   useEffect(() => {
//     if (!open) return;
//     const handleKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setOpen(false);
//     };
//     document.addEventListener("keydown", handleKey);
//     return () => document.removeEventListener("keydown", handleKey);
//   }, [open]);

//   // close on outside click
//   useEffect(() => {
//     const handleClick = (e: MouseEvent) => {
//       if (!open) return;
//       if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, [open]);

//   const toggleAcc = (label: string) => {
//     setOpenAcc((prev) => ({ ...prev, [label]: !prev[label] }));
//   };

//   const isActive = (href?: string) => {
//     if (!href) return false;
//     return pathname === href || pathname?.startsWith(href + "/");
//   };

//   return (
//     <nav className="relative">
//       <div className="flex items-center justify-between px-4 py-3 bg-white">
//         <Link href="/" className="inline-flex items-center">
//           <Image src="/logo.png" alt="Logo" width={120} height={40} />
//         </Link>

//         <button
//           aria-label="Open menu"
//           onClick={() => setOpen(true)}
//           className="p-2 rounded-md text-[#0F3460]"
//         >
//           <Menu size={22} />
//         </button>
//       </div>

//       {/* Drawer + overlay */}
//       <div
//         className={`fixed inset-0 z-50 transition-opacity ${
//           open
//             ? "opacity-100 pointer-events-auto"
//             : "opacity-0 pointer-events-none"
//         }`}
//         aria-hidden={!open}
//       >
//         {/* overlay */}
//         <div
//           className={`absolute inset-0 bg-black/40 transition-opacity ${
//             open ? "opacity-100" : "opacity-0"
//           }`}
//         />

//         {/* drawer panel */}
//         <aside
//           ref={drawerRef}
//           className={`absolute right-0 top-0 h-full w-[85%] max-w-xs bg-white shadow-xl transform transition-transform duration-300 ${
//             open ? "translate-x-0" : "translate-x-full"
//           }`}
//         >
//           <div className="flex items-center justify-between px-4 py-3 border-b">
//             <Link href="/" onClick={() => setOpen(false)}>
//               <Image src="/logo.png" alt="Logo" width={100} height={36} />
//             </Link>
//             <button
//               aria-label="Close menu"
//               onClick={() => setOpen(false)}
//               className="p-2"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           <div className="p-4 space-y-3">
//             {NAV.map((item) => (
//               <div key={item.label}>
//                 {item.children ? (
//                   <div>
//                     <button
//                       onClick={() => toggleAcc(item.label)}
//                       className="w-full flex items-center justify-between py-2 text-left font-medium text-gray-800 hover:text-[#0F3460]"
//                     >
//                       <span>{item.label}</span>
//                       {openAcc[item.label] ? (
//                         <ChevronUp size={18} />
//                       ) : (
//                         <ChevronDown size={18} />
//                       )}
//                     </button>

//                     <div
//                       className={`overflow-hidden transition-[max-height] duration-300 ${
//                         openAcc[item.label] ? "max-h-60 mt-2" : "max-h-0"
//                       }`}
//                     >
//                       <div className="pl-3 flex flex-col gap-2">
//                         {item.children.map((c) => (
//                           <Link
//                             key={c.href}
//                             href={c.href}
//                             onClick={() => setOpen(false)}
//                             className={`block py-2 rounded-md text-sm ${
//                               isActive(c.href)
//                                 ? "text-[#0F3460] font-semibold bg-[#F5A526]/10"
//                                 : "text-gray-700"
//                             } hover:text-[#0F3460]`}
//                           >
//                             {c.label}
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <Link
//                     href={item.href || "#"}
//                     onClick={() => setOpen(false)}
//                     className={`block py-2 rounded-md text-gray-800 font-medium ${
//                       isActive(item.href)
//                         ? "text-[#0F3460] bg-[#F5A526]/10"
//                         : "hover:text-[#0F3460]"
//                     }`}
//                   >
//                     {item.label}
//                   </Link>
//                 )}
//               </div>
//             ))}

//             <div className="pt-4">
//               <Button asChild>
//                 <Link
//                   href="/login"
//                   className="w-full text-center bg-[#F5A526] text-white"
//                 >
//                   Policyholder Login
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </aside>
//       </div>
//     </nav>
//   );
// };

// export default MobileMenu;

"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  X,
  Sprout,
  ChevronDown,
  ArrowRight,
  User,
  Briefcase,
} from "lucide-react";
// import { NAV_ITEMS } from "@/lib/navData";
import Image from "next/image";
import { NavItem } from "@/types/nav";

interface MobileMenuProps {
  items: NavItem[];
  onClose: () => void;
}

export default function MobileMenu({ items, onClose }: MobileMenuProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full bg-white w-full max-w-xs ml-auto shadow-2xl transition-transform">
      <div className="flex items-center justify-between p-5 border-b border-slate-100">
        <Link href="/">
          <div className="flex items-center gap-2">
            {/* <Sprout className="w-6 h-6 text-green-600" /> */}
            <Image
              src="/logo-sm.png"
              alt="Sonali Logo"
              height={55}
              width={25}
            />
            <span className="font-extrabold text-slate-900 text-lg">
              Sonali<span className="text-orange-500"> Life Insurance</span>
            </span>
          </div>
        </Link>

        <button
          onClick={onClose}
          className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="border-b border-slate-50 last:border-0"
          >
            {!item.children ? (
              <Link
                href={item.href!}
                onClick={onClose}
                className="block py-3 px-2 font-bold text-sm text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg"
              >
                {item.label}
              </Link>
            ) : (
              <>
                <button
                  onClick={() =>
                    setOpenSection(
                      openSection === item.label ? null : item.label
                    )
                  }
                  className="flex items-center justify-between w-full py-3 px-2 text-left font-bold text-sm hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <span
                    className={cn(
                      openSection === item.label
                        ? "text-orange-600"
                        : "text-slate-700"
                    )}
                  >
                    {item.label}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      openSection === item.label && "rotate-180 text-orange-500"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openSection === item.label ? "max-h-96" : "max-h-0"
                  )}
                >
                  <div className="pb-2 pl-4 pr-2 space-y-1 border-l-2 border-slate-100 ml-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href!}
                        onClick={onClose}
                        className="block px-3 py-2 text-sm font-medium text-slate-500 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
        <p className="text-xs font-bold text-slate-400 uppercase mb-2">
          Client Access
        </p>

        {/* Policyholder */}
        <Link
          href="/login?type=policyholder"
          onClick={onClose}
          className="flex items-center justify-between px-4 py-3 bg-white border border-orange-200 rounded-xl shadow-sm hover:border-orange-400 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <p className="text-sm font-bold text-slate-900">Policyholder</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 hover:text-orange-500 transition-colors" />
        </Link>

        {/* Agent */}
        <Link
          href="/login?type=agent"
          onClick={onClose}
          className="flex items-center justify-between px-4 py-3 bg-white border border-blue-100 rounded-xl shadow-sm hover:border-blue-400 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <p className="text-sm font-bold text-slate-900">Agent Login</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 hover:text-blue-500 transition-colors" />
        </Link>
      </div>
    </div>
  );
}
