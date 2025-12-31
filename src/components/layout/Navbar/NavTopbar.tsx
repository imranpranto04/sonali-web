// // new
// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { Mail, Phone, Facebook, Twitter, Linkedin } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useLangStore } from "@/store/lang-store";

// export function NavTopbar() {
//   const { lang, setLang } = useLangStore();
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsVisible(window.scrollY < 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div
//       className={cn(
//         "bg-[#1e5b98] text-white text-sm font-medium tracking-wide transition-all duration-500 ease-in-out overflow-hidden z-50 relative",
//         isVisible ? "max-h-12 opacity-100" : "max-h-0 opacity-0"
//       )}
//     >
//       <div className="container mx-auto h-10 flex justify-between items-center">
//         {/* Left: Contact */}
//         <div className="flex items-center gap-6 text-xs md:text-sm">
//           <Link
//             href="mailto:care@sonalilife.com"
//             className="flex items-center gap-2 hover:text-orange-300 transition-colors group"
//           >
//             <Mail className="h-3.5 w-3.5 opacity-80 group-hover:opacity-100" />
//             <span className="hidden xs:inline">care@sonalilife.com</span>
//           </Link>
//           <span className="h-3 w-px bg-white/20 hidden sm:block"></span>
//           <Link
//             href="tel:+8801976625488"
//             className="hidden sm:flex items-center gap-2 hover:text-orange-300 transition-colors group"
//           >
//             <Phone className="h-3.5 w-3.5 opacity-80 group-hover:opacity-100" />
//             <span>+880 1976 625 488</span>
//           </Link>
//         </div>

//         {/* Right: Socials + Lang */}
//         <div className="flex items-center gap-5">
//           <div className="hidden sm:flex items-center gap-2 pr-4 border-r border-white/20">
//             {[Facebook, Twitter, Linkedin].map((Icon, idx) => (
//               <Link
//                 key={idx}
//                 href="#"
//                 className="p-1.5 rounded-full hover:bg-white/10 hover:text-orange-300 transition-all"
//               >
//                 <Icon className="h-3 w-3" />
//               </Link>
//             ))}
//           </div>

//           <div className="flex items-center gap-1">
//             <button
//               onClick={() => setLang("eng")}
//               className={cn(
//                 "px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all",
//                 lang === "eng"
//                   ? "bg-orange-500 text-white shadow-sm"
//                   : "text-slate-300 hover:text-white"
//               )}
//             >
//               EN
//             </button>
//             <span className="text-white/20 text-xs">/</span>
//             <button
//               onClick={() => setLang("bng")}
//               className={cn(
//                 "px-2 py-0.5 rounded text-[10px] font-bold font-sans transition-all",
//                 lang === "bng"
//                   ? "bg-orange-500 text-white shadow-sm"
//                   : "text-slate-300 hover:text-white"
//               )}
//             >
//               বাংলা
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Briefcase,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLangStore } from "@/store/lang-store";

export function NavTopbar() {
  const { lang, setLang } = useLangStore();

  return (
    <div className="relative z-50">
      <div className="container mx-auto h-11 flex justify-between items-center text-xs font-medium tracking-wide text-slate-300">
        {/* LEFT: Contact Info */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="mailto:care@sonalilife.com"
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <Mail className="h-3.5 w-3.5 text-amber-500/80 group-hover:text-amber-400" />
            <span className="hidden sm:inline font-sans opacity-90">
              care@sonalilife.com
            </span>
          </Link>

          <div className="h-3 w-px bg-white/20 hidden sm:block" />

          <Link
            href="tel:+8801976625488"
            className="hidden sm:flex items-center gap-2 hover:text-white transition-colors group"
          >
            <Phone className="h-3.5 w-3.5 text-amber-500/80 group-hover:text-amber-400" />
            <span className="font-sans opacity-90">+880 1976 625 488</span>
          </Link>
        </div>

        {/* RIGHT: Actions & Language */}
        <div className="flex items-center gap-4 md:gap-5">
          {/* Quick Links (Premium Touch) */}
          <div className="hidden lg:flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <Link
              href="/career"
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <Briefcase className="w-3 h-3" />
              <span>Career</span>
            </Link>
            <div className="h-3 w-px bg-white/10" />
            <Link
              href="/news"
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <FileText className="w-3 h-3" />
              <span>Media</span>
            </Link>
          </div>

          {/* Social Icons (Simplified) */}
          <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-white/10">
            {[Facebook, Twitter, Linkedin].map((Icon, idx) => (
              <Link
                key={idx}
                href="#"
                className="hover:text-amber-400 transition-colors"
              >
                <Icon className="h-3 w-3" />
              </Link>
            ))}
          </div>

          {/* Language Switcher (Pill Design) */}
          <div className="flex items-center bg-black/20 rounded-full p-0.5 border border-white/30">
            <button
              onClick={() => setLang("eng")}
              className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all duration-300",
                lang === "eng"
                  ? "bg-amber-500 text-brand shadow-sm" // Gold active background
                  : "text-slate-400 hover:text-white"
              )}
            >
              ENG
            </button>
            <button
              onClick={() => setLang("bng")}
              className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold font-sans transition-all duration-300",
                lang === "bng"
                  ? "bg-amber-500 text-brand shadow-sm"
                  : "text-slate-300 hover:text-white"
              )}
            >
              বাং
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
