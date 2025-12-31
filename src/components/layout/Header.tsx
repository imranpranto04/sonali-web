// // new
// "use client";

// import * as React from "react";
// import { cn } from "@/lib/utils";
// import { NavTopbar } from "./Navbar/NavTopbar";
// import { Navbar } from "./Navbar/Navbar";
// // The new component below

// export function Header() {
//   const [isScrolled, setIsScrolled] = React.useState(false);

//   React.useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header className="fixed top-0 z-50 w-full">
//       <NavTopbar />

//       {/* The Main Navbar */}
//       <div
//         className={cn(
//           "w-full transition-all duration-300 ease-in-out border-b backdrop-blur-md",
//           isScrolled
//             ? "bg-white/80 border-slate-200 shadow-md py-2"
//             : "bg-white border-transparent py-4 "
//         )}
//       >
//         <Navbar />
//       </div>
//     </header>
//   );
// }

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { NavTopbar } from "./Navbar/NavTopbar";
import { Navbar } from "./Navbar/Navbar";

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
    // Changed bg-white to bg-slate-900 (Dark Theme)
    <header className="fixed top-0 z-50 w-full bg-brand transition-all duration-300">
      {/* Topbar: We pass 'isScrolled' to hide it smoothly when scrolling down */}
      {/* Topbar Container */}
      <div
        className={cn(
          "transition-all duration-500 ease-in-out overflow-hidden border-b border-white/10",
          isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        )}
      >
        <NavTopbar />
      </div>

      {/* Main Navbar */}
      <div
        className={cn(
          "w-full transition-all duration-300 ease-in-out",
          isScrolled
            ? "py-2 bg-brand/95 backdrop-blur-md border-b border-white/5 shadow-2xl"
            : "py-4 bg-brand"
        )}
      >
        <Navbar />
      </div>
    </header>
  );
}
