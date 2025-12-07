// "use client";

// import React, { useState } from "react";
// import {
//   Mail,
//   Phone,
//   FacebookIcon,
//   TwitterIcon,
//   LinkedinIcon,
//   Globe,
//   ChevronDown,
// } from "lucide-react";

// import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// // import { Separator } from "@/components/ui/separator";

// const Topbar = () => {
//   // State to manage the currently selected language
//   const [language, setLanguage] = useState<"ENG" | "BEN">("ENG");

//   return (
//     <>
//       <div className="bg-secondary text-white border-b text-sm">
//         {/* Use the Tailwind container class for centered, responsive max-width */}
//         <div className="container flex items-center justify-between h-12 px-4 md:px-6">
//           {/* === Left Side: Contact Info === */}
//           {/* Hidden by default, visible on 'md' screens and up */}
//           <div className="hidden md:flex items-center gap-6">
//             <a
//               href="mailto:info@yourinsurance.com"
//               className="flex items-center gap-2 hover:text-primary transition-colors"
//               aria-label="Email us at info@yourinsurance.com"
//             >
//               <Mail className="h-4 w-4" />
//               <span>info@yourinsurance.com</span>
//             </a>
//             <a
//               href="tel:+18001234567"
//               className="flex items-center gap-2 hover:text-primary transition-colors"
//               aria-label="Call us at +1 800 123 4567"
//             >
//               <Phone className="h-4 w-4" />
//               <span>+1 800 123 4567</span>
//             </a>
//           </div>

//           {/* === Spacer for Mobile === */}
//           {/* Takes up remaining space on mobile, disappears on 'md' screens */}
//           <div className="flex-1 md:hidden"></div>

//           {/* === Right Side: Socials & Language === */}
//           <div className="flex items-center gap-4">
//             {/* Social Icons */}
//             {/* Hidden by default, visible on 'sm' screens and up */}
//             <div className="hidden sm:flex items-center gap-2">
//               <Button variant="ghost" size="icon" asChild>
//                 <a
//                   href="https://facebook.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="Facebook"
//                 >
//                   <FaFacebookF size={16} className="h-4 w-4" />
//                 </a>
//               </Button>
//               <Button variant="ghost" size="icon" asChild>
//                 <a
//                   href="https://twitter.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="Twitter"
//                 >
//                   <FaTwitter className="h-4 w-4" />
//                 </a>
//               </Button>
//               <Button variant="ghost" size="icon" asChild>
//                 <a
//                   href="https://linkedin.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="LinkedIn"
//                 >
//                   <FaLinkedinIn className="h-4 w-4" />
//                 </a>
//               </Button>
//             </div>

//             {/* Vertical Separator */}
//             {/* Hidden by default, visible on 'sm' screens and up */}
//             {/* <Separator orientation="vertical" className="h-6 hidden sm:block" /> */}

//             {/* Language Switcher */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="flex items-center gap-2"
//                 >
//                   <Globe className="h-4 w-4" />
//                   {language}
//                   <ChevronDown className="h-4 w-4 opacity-50" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem onSelect={() => setLanguage("ENG")}>
//                   English (ENG)
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onSelect={() => setLanguage("BEN")}>
//                   বাংলা (BEN)
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Topbar;

"use client";

import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Topbar = () => {
  const [language, setLanguage] = useState<"en" | "bn">("en");

  return (
    <div className="bg-blue-gradaiant text-white text-sm">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Contact Info */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <div className="flex items-center gap-1">
            <FaEnvelope size={14} />
            <a href="mailto:info@insurance.com" className="hover:underline">
              care@sonalilife.com
            </a>
          </div>
          <div className="flex items-center gap-1">
            <FaPhoneAlt size={14} />
            <a href="tel:+880123456789" className="hover:underline">
              +8801976625488
            </a>
          </div>
        </div>

        {/* Right Section: Social + Language (Hidden on mobile) */}
        <div className="hidden md:flex items-center gap-4 mt-2 md:mt-0">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#F5A526] transition"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-[#F5A526] transition"
            >
              <FaTwitter size={14} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#F5A526] transition"
            >
              <FaLinkedinIn size={14} />
            </a>
          </div>

          {/* Language Switch */}
          {/* <div className="flex items-center gap-2 border-l border-white/30 pl-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-[#F5A526] hover:bg-transparent cursor-pointer"
            >
              EN
            </Button>
            <span className="text-gray-400">|</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-[#F5A526] hover:bg-transparent cursor-pointer"
            >
              বাংলা
            </Button>
          </div> */}
          {/* Language Switch */}
          <div className="flex items-center gap-2 border-l border-white/30 pl-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage("en")}
              className={`hover:bg-transparent cursor-pointer ${
                language === "en"
                  ? "text-[#F5A526] font-semibold"
                  : "text-white hover:text-[#F5A526]"
              }`}
            >
              EN
            </Button>
            <span className="text-gray-400">|</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage("bn")}
              className={`hover:bg-transparent cursor-pointer ${
                language === "bn"
                  ? "text-[#F5A526] "
                  : "text-white hover:text-[#F5A526]"
              }`}
            >
              বাংলা
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
