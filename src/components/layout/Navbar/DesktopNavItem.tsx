// "use client";

// import { useState, useRef } from "react";
// import Link from "next/link";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useMenu } from "@/hooks/use-menu";

// export function DesktopNavItem() {
//   const { data: menuItems, isLoading } = useMenu();
//   const [openIndex, setOpenIndex] = useState<number | null>(null);
//   const lastHoverTime = useRef<number>(0); // Keeps track of when we last hovered

//   if (isLoading)
//     return <div className="h-10 w-64 bg-slate-100 animate-pulse rounded-md" />;
//   if (!menuItems || menuItems.length === 0) return null;

//   // --- THE SIMPLE LOGIC ---
//   const handleMouseEnter = (index: number) => {
//     setOpenIndex(index);
//     lastHoverTime.current = Date.now(); // Record time
//   };

//   const handleMouseLeave = () => {
//     setOpenIndex(null);
//   };

//   const handleClick = (index: number) => {
//     const now = Date.now();
//     // If hover happened less than 500ms ago, it's a touch event "double-fire".
//     // We ignore this click so the menu stays OPEN.
//     if (now - lastHoverTime.current < 500) return;

//     // Otherwise, it's a deliberate click (to close or toggle)
//     setOpenIndex(openIndex === index ? null : index);
//   };
//   // ------------------------

//   return (
//     <nav className="flex items-center gap-1">
//       {menuItems.map((item, index) => {
//         const isMegaMenu = item.children && item.children.length > 6;
//         const isOpen = openIndex === index;

//         // 1. Simple Link
//         if (!item.children || item.children.length === 0) {
//           return (
//             <Link
//               key={index}
//               href={item.href}
//               className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all "
//               onMouseEnter={() => setOpenIndex(null)}
//             >
//               {item.label}
//             </Link>
//           );
//         }

//         // 2. Dropdown (Hybrid)
//         return (
//           <div
//             key={index}
//             className="relative z-50"
//             onMouseEnter={() => handleMouseEnter(index)}
//             onMouseLeave={handleMouseLeave}
//           >
//             <button
//               onClick={(e) => {
//                 e.preventDefault(); // Prevent link jump, handle toggle manually
//                 handleClick(index);
//               }}
//               className={cn(
//                 "flex items-center gap-1 px-4 py-2 text-sm font-bold rounded-lg transition-all select-none",
//                 isOpen
//                   ? "text-orange-600 bg-orange-50"
//                   : "text-slate-600 hover:text-orange-600 hover:bg-orange-50"
//               )}
//             >
//               {item.label}
//               <ChevronDown
//                 className={cn(
//                   "w-4 h-4 transition-transform duration-300",
//                   isOpen ? "rotate-180 text-orange-600" : "text-slate-400"
//                 )}
//               />
//             </button>

//             {/* Dropdown Content */}
//             <div
//               className={cn(
//                 "absolute top-full left-0 pt-3 transition-all duration-300 ease-out origin-top-left ",
//                 isOpen
//                   ? "opacity-100 visible translate-y-0"
//                   : "opacity-0 invisible translate-y-2"
//               )}
//             >
//               <div
//                 className={cn(
//                   "bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 p-2 overflow-hidden ",
//                   isMegaMenu
//                     ? "w-[600px] grid grid-cols-2 gap-2 p-4"
//                     : "w-[260px] flex flex-col gap-1"
//                 )}
//               >
//                 {!isMegaMenu && (
//                   <div className="px-3 py-2 text-[10px] font-bold text-orange-500 uppercase tracking-wider bg-orange-50/50 rounded-lg mb-1">
//                     {item.label}
//                   </div>
//                 )}

//                 {item.children.map((child, idx) => (
//                   <Link
//                     key={idx}
//                     href={child.href}
//                     onClick={() => setOpenIndex(null)} // Close when clicking a link
//                     className={cn(
//                       "group/item flex items-center justify-between px-3 py-3 rounded-lg transition-all border border-transparent",
//                       // Grid Item Design: White background with subtle border on hover
//                       isMegaMenu
//                         ? "hover:bg-orange-50/50 hover:border-orange-100"
//                         : "hover:bg-slate-50"
//                     )}
//                   >
//                     <div>
//                       <p className="text-sm font-bold text-slate-700 group-hover/item:text-orange-600 transition-colors">
//                         {child.label}
//                       </p>
//                       {(isMegaMenu || child.type) && (
//                         <p className="text-[10px] text-slate-400 font-medium line-clamp-1 group-hover/item:text-orange-400/80">
//                           {child.type}
//                           {/* {child.type || "Explore this section"} */}
//                         </p>
//                       )}
//                     </div>
//                     <ChevronRight className="w-4 h-4 text-orange-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-x-0" />
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </nav>
//   );
// }

"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMenu } from "@/hooks/use-menu";

export function DesktopNavItem() {
  const { data: menuItems, isLoading } = useMenu();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lastHoverTime = useRef<number>(0);

  if (isLoading)
    return <div className="h-10 w-64 bg-white/10 animate-pulse rounded-md" />;
  if (!menuItems || menuItems.length === 0) return null;

  const handleMouseEnter = (index: number) => {
    setOpenIndex(index);
    lastHoverTime.current = Date.now();
  };

  const handleMouseLeave = () => {
    setOpenIndex(null);
  };

  const handleClick = (index: number) => {
    if (Date.now() - lastHoverTime.current < 500) return;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <nav className="flex items-center gap-1">
      {menuItems.map((item, index) => {
        const isMegaMenu = item.children && item.children.length > 6;
        const isOpen = openIndex === index;
        const hasChildren = item.children && item.children.length > 0;

        // Base class for links
        const linkClass = cn(
          "flex items-center gap-1 px-4 py-2 text-sm font-bold rounded-lg transition-all select-none",
          isOpen
            ? "text-amber-400 bg-white/10" // Active State (Dark Theme)
            : "text-slate-200 hover:text-amber-400 hover:bg-white/5" // Inactive State
        );

        // 1. Simple Link
        if (!hasChildren) {
          return (
            <Link
              key={index}
              href={item.href}
              className={linkClass}
              onMouseEnter={() => setOpenIndex(null)}
            >
              {item.label}
            </Link>
          );
        }

        // 2. Dropdown Trigger
        return (
          <div
            key={index}
            className="relative z-50"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                handleClick(index);
              }}
              className={linkClass}
            >
              {item.label}
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  isOpen ? "rotate-180 text-amber-400" : "text-slate-500"
                )}
              />
            </button>

            {/* Dropdown Content (Keep White for readability) */}
            <div
              className={cn(
                "absolute top-full left-0 pt-4 transition-all duration-300 ease-out origin-top-left",
                isOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible translate-y-2"
              )}
            >
              <div
                className={cn(
                  "bg-white rounded-xl shadow-2xl shadow-black/20 border border-slate-100 p-2 overflow-hidden",
                  isMegaMenu
                    ? "w-[600px] grid grid-cols-2 gap-2 p-4"
                    : "w-[260px] flex flex-col gap-1"
                )}
              >
                {/* ... (Keep existing dropdown content logic same as before) ... */}
                {/* Just ensure text inside here is dark (slate-700) because background is white */}

                {item.children?.map((child, idx) => (
                  <Link
                    key={idx}
                    href={child.href}
                    onClick={() => setOpenIndex(null)}
                    className={cn(
                      "group/item flex items-center justify-between px-3 py-3 rounded-lg transition-all border border-transparent hover:bg-slate-50",
                      isMegaMenu &&
                        "hover:border-orange-100 hover:bg-orange-50/30"
                    )}
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-700 group-hover/item:text-orange-600 transition-colors">
                        {child.label}
                      </p>
                      {(isMegaMenu || child.type) && (
                        <p className="text-[10px] text-slate-400 font-medium line-clamp-1 group-hover/item:text-orange-400/80">
                          {child.type}
                        </p>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-orange-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-x-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
