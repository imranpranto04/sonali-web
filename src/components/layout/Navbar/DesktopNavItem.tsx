// "use client";

// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import { MenuItem } from "@/lib/api/menu";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";
// import React from "react";

// interface DesktopNavItemProps {
//   item: MenuItem;
//   isActive?: boolean;
// }

// export function DesktopNavItem({ item, isActive }: DesktopNavItemProps) {
//   const hasChildren = item.children && item.children.length > 0;

//   // Logic: Use Mega Menu grid if items > 11
//   const isMegaMenu = hasChildren && item.children!.length > 11;
//   const safeHref = item.href || "#";

//   // CASE 1: Dropdown / Mega Menu
//   // This uses NavigationMenu components because it has content
//   if (hasChildren) {
//     return (
//       <NavigationMenu>
//         <NavigationMenuList>
//           <NavigationMenuItem>
//             <NavigationMenuTrigger
//               className={cn(
//                 "bg-transparent hover:bg-slate-50 data-[state=open]:bg-slate-50 text-slate-700 hover:text-orange-600 font-bold uppercase text-[10px] lg:text-xs tracking-wider px-2 lg:px-3 h-9 lg:h-10 transition-colors",
//                 isActive && "text-orange-600 bg-orange-50/50"
//               )}
//             >
//               {item.label}
//             </NavigationMenuTrigger>

//             <NavigationMenuContent>
//               <ul
//                 className={cn(
//                   "gap-3 p-4 bg-white",
//                   isMegaMenu
//                     ? "grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[700px] lg:grid-cols-3" // Mega Menu Grid
//                     : "w-56 flex flex-col" // Simple List
//                 )}
//               >
//                 {/* Header for Menu */}
//                 <li className="col-span-full border-b border-slate-200 pb-2 mb-1 px-2">
//                   <span className="text-[10px] font-extrabold text-orange-500 uppercase tracking-widest">
//                     {item.label}
//                   </span>
//                 </li>

//                 {item.children!.map((child) => (
//                   <ListItem
//                     key={child.label + child.href}
//                     title={child.label}
//                     href={child.href || "#"}
//                   ></ListItem>
//                 ))}
//               </ul>
//             </NavigationMenuContent>
//           </NavigationMenuItem>
//         </NavigationMenuList>
//       </NavigationMenu>
//     );
//   }

//   // CASE 2: Simple Link (No Children)
//   // FIX: Removed NavigationMenuLink wrapper to solve "FocusGroupItem" error
//   // FIX: Removed legacyBehavior to solve console warning
//   return (
//     <Link
//       href={safeHref}
//       className={cn(
//         navigationMenuTriggerStyle(), // We still use the style function for consistency
//         "bg-transparent hover:bg-slate-50 text-slate-700 hover:text-orange-600 font-bold uppercase text-[11px] lg:text-xs tracking-wider px-2 lg:px-3 h-9 lg:h-10 transition-colors cursor-pointer",
//         isActive && "text-orange-600 bg-orange-50/50"
//       )}
//     >
//       {item.label}
//     </Link>
//   );
// }

// // Helper List Item Component
// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, href, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <Link
//           ref={ref}
//           href={href || "#"}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 group",
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-bold leading-none group-hover:text-orange-700 text-slate-700">
//             {title}
//           </div>
//           {children && (
//             <p className="line-clamp-2 text-sm leading-snug text-slate-500 group-hover:text-orange-600/80">
//               {children}
//             </p>
//           )}
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";

// new
// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import { useMenu } from "@/hooks/use-menu";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";

// export default function DesktopNavItem() {
//   const { data: menuItems, isLoading } = useMenu();

//   if (isLoading)
//     return <div className="h-10 w-64 bg-slate-100 animate-pulse rounded-md" />;
//   if (!menuItems || menuItems.length === 0) return null;

//   return (
//     <NavigationMenu>
//       <NavigationMenuList>
//         {menuItems.map((item, index) => (
//           <NavigationMenuItem key={index}>
//             {/* CASE A: Dropdown (Item has children) */}
//             {item.children && item.children.length > 0 ? (
//               <>
//                 <NavigationMenuTrigger className="bg-transparent hover:bg-orange-50 hover:text-orange-600 font-medium text-slate-700">
//                   {item.label}
//                 </NavigationMenuTrigger>
//                 <NavigationMenuContent>
//                   <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
//                     {item.children.map((child, childIdx) => (
//                       <ListItem
//                         key={childIdx}
//                         title={child.label}
//                         href={child.href}
//                       >
//                         {/* Add description here if available in API */}
//                       </ListItem>
//                     ))}
//                   </ul>
//                 </NavigationMenuContent>
//               </>
//             ) : (
//               /* CASE B: Single Link (Fixed for Next.js 13+) */
//               <NavigationMenuLink asChild>
//                 <Link
//                   href={item.href}
//                   className={cn(
//                     navigationMenuTriggerStyle(),
//                     "bg-transparent hover:bg-orange-50 hover:text-orange-600 font-medium text-slate-700 cursor-pointer"
//                   )}
//                 >
//                   {item.label}
//                 </Link>
//               </NavigationMenuLink>
//             )}
//           </NavigationMenuItem>
//         ))}
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// }

// // Fixed ListItem Component
// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, href, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <Link
//           href={href || "#"} // Fallback to avoid errors
//           ref={ref as any} // Type casting to satisfy the ref
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700",
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-semibold leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-slate-500 mt-1">
//             {children}
//           </p>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";

// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import { useMenu } from "@/hooks/use-menu";
// import { ChevronRight } from "lucide-react";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
//   NavigationMenuViewport,
// } from "@/components/ui/navigation-menu";

// export function DesktopNavItem() {
//   const { data: menuItems, isLoading } = useMenu();

//   if (isLoading)
//     return <div className="h-10 w-64 bg-slate-100 animate-pulse rounded-md" />;
//   if (!menuItems || menuItems.length === 0) return null;

//   return (
//     <NavigationMenu className="relative z-50">
//       <NavigationMenuList>
//         {menuItems.map((item, index) => {
//           // LOGIC: If items > 5, use "Mega Menu" Grid. Otherwise, use simple List.
//           const isMegaMenu = item.children && item.children.length > 5;

//           return (
//             <NavigationMenuItem key={index}>
//               {/* CASE A: Has Dropdown */}
//               {item.children && item.children.length > 0 ? (
//                 <>
//                   <NavigationMenuTrigger className="bg-transparent text-slate-700 hover:bg-orange-50 hover:text-orange-600 focus:bg-orange-50 focus:text-orange-600 data-[state=open]:bg-orange-50 data-[state=open]:text-orange-600 font-medium transition-colors">
//                     {item.label}
//                   </NavigationMenuTrigger>

//                   <NavigationMenuContent>
//                     {/* SMART LAYOUT: Grid for many, Flex for few */}
//                     <ul
//                       className={cn(
//                         "p-3 md:p-4 gap-2",
//                         isMegaMenu
//                           ? "grid w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2"
//                           : "flex flex-col w-[260px]" // Perfect width for simple lists
//                       )}
//                     >
//                       {/* Optional: Add a subtle label for small lists to look polished */}
//                       {!isMegaMenu && (
//                         <li className="px-3 pb-2 mb-1 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
//                           {item.label} Options
//                         </li>
//                       )}

//                       {item.children.map((child, childIdx) => (
//                         <ListItem
//                           key={childIdx}
//                           title={child.label}
//                           href={child.href}
//                         >
//                           {/* Only show description for Mega Menus to reduce clutter in small lists */}
//                           {isMegaMenu
//                             ? "Explore our comprehensive coverage plans."
//                             : null}
//                         </ListItem>
//                       ))}
//                     </ul>
//                   </NavigationMenuContent>
//                 </>
//               ) : (
//                 /* CASE B: Single Link */
//                 <NavigationMenuLink asChild>
//                   <Link
//                     href={item.href}
//                     className={cn(
//                       navigationMenuTriggerStyle(),
//                       "bg-transparent text-slate-700 hover:bg-orange-50 hover:text-orange-600 font-medium cursor-pointer"
//                     )}
//                   >
//                     {item.label}
//                   </Link>
//                 </NavigationMenuLink>
//               )}
//             </NavigationMenuItem>
//           );
//         })}
//       </NavigationMenuList>

//       {/* IMPORTANT: Your component ALREADY has the wrapper.
//         So we just place this self-closing tag here.
//         It will automatically anchor to the NavigationMenu root.
//       */}
//       <NavigationMenuViewport />
//     </NavigationMenu>
//   );
// }

// // ----------------------------------------------------------------------
// // REUSABLE COMPONENT: Refined List Item with Hover Animation
// // ----------------------------------------------------------------------
// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, href, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <Link
//           href={href || "#"}
//           ref={ref as any}
//           className={cn(
//             "group block select-none rounded-lg p-3 leading-none no-underline outline-none transition-all hover:bg-orange-50",
//             className
//           )}
//           {...props}
//         >
//           <div className="flex items-center justify-between">
//             <div className="text-sm font-semibold text-slate-700 group-hover:text-orange-700 transition-colors">
//               {title}
//             </div>
//             {/* Sliding Arrow Animation */}
//             <ChevronRight className="h-4 w-4 text-orange-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
//           </div>

//           {/* Description text only renders if passed (used in Grid view) */}
//           {children && (
//             <p className="line-clamp-2 text-xs leading-snug text-slate-500 mt-1.5 group-hover:text-slate-600">
//               {children}
//             </p>
//           )}
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";

"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMenu } from "@/hooks/use-menu";

export function DesktopNavItem() {
  const { data: menuItems, isLoading } = useMenu();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lastHoverTime = useRef<number>(0); // Keeps track of when we last hovered

  if (isLoading)
    return <div className="h-10 w-64 bg-slate-100 animate-pulse rounded-md" />;
  if (!menuItems || menuItems.length === 0) return null;

  // --- THE SIMPLE LOGIC ---
  const handleMouseEnter = (index: number) => {
    setOpenIndex(index);
    lastHoverTime.current = Date.now(); // Record time
  };

  const handleMouseLeave = () => {
    setOpenIndex(null);
  };

  const handleClick = (index: number) => {
    const now = Date.now();
    // If hover happened less than 500ms ago, it's a touch event "double-fire".
    // We ignore this click so the menu stays OPEN.
    if (now - lastHoverTime.current < 500) return;

    // Otherwise, it's a deliberate click (to close or toggle)
    setOpenIndex(openIndex === index ? null : index);
  };
  // ------------------------

  return (
    <nav className="flex items-center gap-1">
      {menuItems.map((item, index) => {
        const isMegaMenu = item.children && item.children.length > 6;
        const isOpen = openIndex === index;

        // 1. Simple Link
        if (!item.children || item.children.length === 0) {
          return (
            <Link
              key={index}
              href={item.href}
              className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all "
              onMouseEnter={() => setOpenIndex(null)}
            >
              {item.label}
            </Link>
          );
        }

        // 2. Dropdown (Hybrid)
        return (
          <div
            key={index}
            className="relative z-50"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevent link jump, handle toggle manually
                handleClick(index);
              }}
              className={cn(
                "flex items-center gap-1 px-4 py-2 text-sm font-bold rounded-lg transition-all select-none",
                isOpen
                  ? "text-orange-600 bg-orange-50"
                  : "text-slate-600 hover:text-orange-600 hover:bg-orange-50"
              )}
            >
              {item.label}
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  isOpen ? "rotate-180 text-orange-600" : "text-slate-400"
                )}
              />
            </button>

            {/* Dropdown Content */}
            <div
              className={cn(
                "absolute top-full left-0 pt-3 transition-all duration-300 ease-out origin-top-left ",
                isOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible translate-y-2"
              )}
            >
              <div
                className={cn(
                  "bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 p-2 overflow-hidden ",
                  isMegaMenu
                    ? "w-[600px] grid grid-cols-2 gap-2 p-4"
                    : "w-[260px] flex flex-col gap-1"
                )}
              >
                {!isMegaMenu && (
                  <div className="px-3 py-2 text-[10px] font-bold text-orange-500 uppercase tracking-wider bg-orange-50/50 rounded-lg mb-1">
                    {item.label}
                  </div>
                )}

                {item.children.map((child, idx) => (
                  <Link
                    key={idx}
                    href={child.href}
                    onClick={() => setOpenIndex(null)} // Close when clicking a link
                    className={cn(
                      "group/item flex items-center justify-between px-3 py-3 rounded-lg transition-all border border-transparent",
                      // Grid Item Design: White background with subtle border on hover
                      isMegaMenu
                        ? "hover:bg-orange-50/50 hover:border-orange-100"
                        : "hover:bg-slate-50"
                    )}
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-700 group-hover/item:text-orange-600 transition-colors">
                        {child.label}
                      </p>
                      {(isMegaMenu || child.type) && (
                        <p className="text-[10px] text-slate-400 font-medium line-clamp-1 group-hover/item:text-orange-400/80">
                          {child.type}
                          {/* {child.type || "Explore this section"} */}
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
