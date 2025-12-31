// "use client";

// import Link from "next/link";
// // Your existing file
// import { Button } from "@/components/ui/button";
// import { LoginDropdown } from "./LoginDropdown";
// import { MobileNav } from "./MobileNav";
// import { DesktopNavItem } from "./DesktopNavItem";
// import Image from "next/image";

// export function Navbar() {
//   return (
//     <div className="container mx-auto flex items-center justify-between">
//       {/* 1. Logo Section */}
//       <Link href="/" className="flex items-center gap-2 group">
//         {/* Replace with actual <Image /> if you have one */}
//         <Image
//           src="/logo-sm-bg.png"
//           alt="Sonali Life"
//           height={80}
//           width={120}
//         />
//       </Link>

//       {/* 2. Desktop Navigation (Dynamic) */}
//       <div className="hidden lg:flex">
//         <DesktopNavItem />
//       </div>

//       {/* 3. Right Actions */}
//       <div className="flex items-center gap-3">
//         {/* Your Login Logic */}
//         <div className="hidden sm:block">
//           <LoginDropdown />
//         </div>

//         {/* Mobile Toggle */}
//         <div className="lg:hidden">
//           <MobileNav />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { LoginDropdown } from "./LoginDropdown";
import { MobileNav } from "./MobileNav";
import { DesktopNavItem } from "./DesktopNavItem";
import Image from "next/image";
import { useLangStore } from "@/store/lang-store"; // Import store

export function Navbar() {
  const { lang } = useLangStore(); // Get current language

  // Logic to choose logo file
  const logoSrc = lang === "bng" ? "/logo-new-bng.png" : "/logo-new-eng.png";

  return (
    <div className="container mx-auto flex items-center justify-between">
      {/* 1. Logo Section (Dynamic) */}
      <Link
        href="/"
        className="flex items-center gap-2 group relative z-10 shrink-0"
      >
        <Image
          key={lang} // Forces React to re-render image when lang changes (prevents glitch)
          src={logoSrc}
          alt="Sonali Life"
          width={0}
          height={0}
          sizes="100vw"
          // 'h-16 w-auto' allows natural width based on image ratio
          className="h-16 w-auto md:h-20 transition-transform duration-300 group-hover:scale-105 object-contain object-left"
          priority
        />
      </Link>

      {/* 2. Desktop Navigation */}
      <div className="hidden lg:flex">
        <DesktopNavItem />
      </div>

      {/* 3. Right Actions */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <LoginDropdown />
        </div>

        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}
