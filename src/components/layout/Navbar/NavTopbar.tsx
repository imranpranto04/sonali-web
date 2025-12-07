// "use client";

// import React from "react";
// import { Mail, Phone, Facebook, Twitter, Linkedin } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useLangStore } from "@/store/lang-store"; // This import should now work perfectly
// import Link from "next/link";

// const NavTopbar = () => {
//   // Access the global language state
//   const { lang, setLang } = useLangStore();

//   return (
//     <div className="bg-[#1e5b98] text-white text-sm font-medium tracking-wide">
//       <div className="container mx-auto px-4 md:px-8 h-10 flex justify-between items-center">
//         {/* Left Section: Contact Info */}
//         <div className="flex items-center gap-6 text-xs md:text-sm">
//           <Link
//             href="mailto:care@sonalilife.com"
//             className="flex items-center gap-2 hover:text-orange-300 transition-colors group"
//           >
//             <Mail className="h-3.5 w-3.5 opacity-80 group-hover:opacity-100" />
//             <span>care@sonalilife.com</span>
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

//         {/* Right Section: Socials + Language */}
//         <div className="flex items-center gap-5">
//           {/* Social Icons */}
//           <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-white/20">
//             {[
//               { icon: Facebook, href: "https://facebook.com" },
//               { icon: Twitter, href: "https://twitter.com" },
//               { icon: Linkedin, href: "https://linkedin.com" },
//             ].map((item, idx) => (
//               <Link
//                 key={idx}
//                 href={item.href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-1.5 rounded-full hover:bg-white/10 hover:text-orange-300 transition-all duration-300"
//               >
//                 <item.icon className="h-3 w-3" />
//               </Link>
//             ))}
//           </div>

//           {/* Language Switcher */}
//           <div className="flex items-center gap-1">
//             <button
//               onClick={() => setLang("eng")}
//               className={cn(
//                 "px-2 py-0.5 rounded text-[11px] font-bold uppercase transition-all duration-300 cursor-pointer",
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
//                 "px-2 py-0.5 rounded text-[11px] font-bold transition-all duration-300 font-sans cursor-pointer",
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
// };

// export default NavTopbar;

"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, Facebook, Twitter, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLangStore } from "@/store/lang-store";
import Link from "next/link";

const NavTopbar = () => {
  const { lang, setLang } = useLangStore();
  const [isVisible, setIsVisible] = useState(true);

  // Handle Scroll to hide Topbar
  useEffect(() => {
    const handleScroll = () => {
      // Hide topbar if scrolled down more than 40px
      setIsVisible(window.scrollY < 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "bg-[#1e5b98] text-white text-sm font-medium tracking-wide transition-all duration-300 ease-in-out overflow-hidden",
        isVisible ? "max-h-12 opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 h-10 flex justify-between items-center">
        {/* Left Section: Contact Info */}
        <div className="flex items-center gap-6 text-xs md:text-sm">
          <Link
            href="mailto:care@sonalilife.com"
            className="flex items-center gap-2 hover:text-orange-300 transition-colors group"
          >
            <Mail className="h-3.5 w-3.5 opacity-80 group-hover:opacity-100" />
            <span>care@sonalilife.com</span>
          </Link>
          {/* Vertical Separator */}
          <span className="h-3 w-px bg-white/20 hidden sm:block"></span>
          <Link
            href="tel:+8801976625488"
            className="hidden sm:flex items-center gap-2 hover:text-orange-300 transition-colors group"
          >
            <Phone className="h-3.5 w-3.5 opacity-80 group-hover:opacity-100" />
            <span>+880 1976 625 488</span>
          </Link>
        </div>

        {/* Right Section: Socials + Language */}
        <div className="flex items-center gap-5">
          {/* Social Icons */}
          <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-white/20">
            {[
              { icon: Facebook, href: "https://facebook.com" },
              { icon: Twitter, href: "https://twitter.com" },
              { icon: Linkedin, href: "https://linkedin.com" },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-white/10 hover:text-orange-300 transition-all duration-300"
              >
                <item.icon className="h-3 w-3" />
              </Link>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLang("eng")}
              className={cn(
                "px-2 py-0.5 rounded text-[11px] font-bold uppercase transition-all duration-300 cursor-pointer",
                lang === "eng"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              )}
            >
              EN
            </button>
            <span className="text-white/20 text-xs">/</span>
            <button
              onClick={() => setLang("bng")}
              className={cn(
                "px-2 py-0.5 rounded text-[11px] font-bold transition-all duration-300 font-sans cursor-pointer",
                lang === "bng"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              )}
            >
              বাংলা
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavTopbar;
