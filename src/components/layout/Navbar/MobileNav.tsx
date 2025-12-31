// "use client";

// import Link from "next/link";
// import {
//   X,
//   ChevronDown,
//   Sprout,
//   User,
//   Briefcase,
//   ArrowRight,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { MenuItem } from "@/lib/api/menu";
// import { useState, useEffect } from "react";
// import { cn } from "@/lib/utils";

// // Updated Props Interface
// interface MobileNavProps {
//   items: MenuItem[];
//   loginText: string;
//   isOpen: boolean; // Added
//   onClose: () => void; // Added
// }

// export function MobileNav({
//   items,
//   loginText,
//   isOpen,
//   onClose,
// }: MobileNavProps) {
//   const [expandedItem, setExpandedItem] = useState<string | null>(null);

//   // Lock body scroll when menu is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//   }, [isOpen]);

//   return (
//     <div className="lg:hidden">
//       {/* Overlay */}
//       <div
//         className={cn(
//           "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300",
//           isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         )}
//         onClick={onClose}
//       />

//       {/* Drawer */}
//       <div
//         className={cn(
//           "fixed top-0 right-0 bottom-0 w-[85vw] max-w-[320px] bg-white z-60 shadow-2xl transition-transform duration-300 ease-out flex flex-col",
//           isOpen ? "translate-x-0" : "translate-x-full"
//         )}
//       >
//         {/* Header */}
//         <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
//           <div className="flex items-center gap-2">
//             <Sprout className="w-6 h-6 text-green-600" />
//             <span className="font-extrabold text-slate-900 text-lg tracking-tight">
//               Menu
//             </span>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-red-500 hover:border-red-200 transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Menu Items */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-2">
//           {items.map((item) => (
//             <div
//               key={item.label}
//               className="border-b border-slate-50 pb-2 last:border-0"
//             >
//               {item.children && item.children.length > 0 ? (
//                 <div>
//                   <button
//                     onClick={() =>
//                       setExpandedItem(
//                         expandedItem === item.label ? null : item.label
//                       )
//                     }
//                     className="flex items-center justify-between w-full px-2 py-3 text-left group"
//                   >
//                     <span
//                       className={cn(
//                         "text-sm font-bold uppercase tracking-wide transition-colors",
//                         expandedItem === item.label
//                           ? "text-orange-600"
//                           : "text-slate-700"
//                       )}
//                     >
//                       {item.label}
//                     </span>
//                     <ChevronDown
//                       className={cn(
//                         "w-4 h-4 text-slate-400 transition-transform duration-300",
//                         expandedItem === item.label &&
//                           "rotate-180 text-orange-500"
//                       )}
//                     />
//                   </button>

//                   {/* Submenu */}
//                   <div
//                     className={cn(
//                       "overflow-hidden transition-all duration-300 ease-in-out",
//                       expandedItem === item.label
//                         ? "max-h-[500px] opacity-100"
//                         : "max-h-0 opacity-0"
//                     )}
//                   >
//                     <div className="ml-4 pl-4 border-l-2 border-slate-100 space-y-1 pb-2">
//                       {item.children.map((child) => (
//                         <Link
//                           key={child.label}
//                           href={child.href || "#"}
//                           onClick={onClose}
//                           className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
//                         >
//                           {child.label}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <Link
//                   href={item.href || "#"}
//                   onClick={onClose}
//                   className="block px-2 py-3 text-sm font-bold uppercase tracking-wide text-slate-700 hover:text-orange-600 rounded-lg transition-colors"
//                 >
//                   {item.label}
//                 </Link>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Footer Actions (Dual Login) */}
//         <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
//           <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
//             Login Access
//           </p>

//           <Link
//             href="/login?type=policyholder"
//             onClick={onClose}
//             className="flex items-center justify-between w-full p-3 bg-white border border-orange-200 rounded-xl hover:shadow-md transition-all group"
//           >
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
//                 <User className="w-4 h-4" />
//               </div>
//               <span className="text-sm font-bold text-slate-700 group-hover:text-orange-700">
//                 Policyholder
//               </span>
//             </div>
//             <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500" />
//           </Link>

//           <Link
//             href="/login?type=agent"
//             onClick={onClose}
//             className="flex items-center justify-between w-full p-3 bg-white border border-blue-200 rounded-xl hover:shadow-md transition-all group"
//           >
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
//                 <Briefcase className="w-4 h-4" />
//               </div>
//               <span className="text-sm font-bold text-slate-700 group-hover:text-blue-700">
//                 Agent Login
//               </span>
//             </div>
//             <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { useMenu } from "@/hooks/use-menu";
// // import { LoginDropdown } from "./login-dropdown"; // Reusing your login component logic specifically or adapting

// export function MobileNav() {
//   const [open, setOpen] = useState(false);
//   const { data: menuItems } = useMenu();

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger asChild>
//         <Button
//           variant="ghost"
//           size="icon"
//           className="lg:hidden text-slate-800"
//         >
//           <Menu className="h-6 w-6" />
//           <span className="sr-only">Toggle menu</span>
//         </Button>
//       </SheetTrigger>

//       <SheetContent
//         side="left"
//         className="w-[300px] sm:w-[350px] overflow-y-auto"
//       >
//         <SheetHeader className="text-left border-b pb-4 mb-4">
//           <SheetTitle className="font-bold text-xl">
//             Sonali<span className="text-orange-500">Life</span>
//           </SheetTitle>
//         </SheetHeader>

//         <div className="flex flex-col gap-4">
//           {/* Mobile Menu Items */}
//           <nav className="flex flex-col gap-2">
//             {menuItems?.map((item, index) => {
//               // Case A: Has Children (Accordion)
//               if (item.children && item.children.length > 0) {
//                 return (
//                   <Accordion
//                     type="single"
//                     collapsible
//                     key={index}
//                     className="w-full"
//                   >
//                     <AccordionItem
//                       value={`item-${index}`}
//                       className="border-none"
//                     >
//                       <AccordionTrigger className="py-2 text-base font-medium hover:text-orange-600 hover:no-underline">
//                         {item.label}
//                       </AccordionTrigger>
//                       <AccordionContent className="pl-4 border-l-2 border-slate-100 ml-1">
//                         <div className="flex flex-col gap-2 pt-2">
//                           {item.children.map((child, cIdx) => (
//                             <Link
//                               key={cIdx}
//                               href={child.href}
//                               onClick={() => setOpen(false)}
//                               className="text-sm text-slate-600 hover:text-orange-600 py-1"
//                             >
//                               {child.label}
//                             </Link>
//                           ))}
//                         </div>
//                       </AccordionContent>
//                     </AccordionItem>
//                   </Accordion>
//                 );
//               }

//               // Case B: Single Link
//               return (
//                 <Link
//                   key={index}
//                   href={item.href}
//                   onClick={() => setOpen(false)}
//                   className="py-2 text-base font-medium text-slate-800 hover:text-orange-600 transition-colors block"
//                 >
//                   {item.label}
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Mobile Login Button Area */}
//           <div className="mt-6 border-t pt-6">
//             <p className="text-sm text-slate-500 font-medium mb-3 uppercase tracking-wider">
//               Access Account
//             </p>
//             {/* We can't easily use the hovering LoginDropdown on mobile.
//               It's better to show the two buttons directly.
//             */}
//             <div className="grid grid-cols-1 gap-3">
//               <Button
//                 asChild
//                 className="w-full bg-orange-500 hover:bg-orange-600"
//               >
//                 <Link
//                   href="/login?type=policyholder"
//                   onClick={() => setOpen(false)}
//                 >
//                   Policyholder Login
//                 </Link>
//               </Button>
//               <Button asChild variant="outline" className="w-full">
//                 <Link href="/login?type=agent" onClick={() => setOpen(false)}>
//                   Agent Login
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronRight, UserCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMenu } from "@/hooks/use-menu";
import Image from "next/image";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { data: menuItems } = useMenu();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-slate-800 hover:bg-orange-50 hover:text-orange-600"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[320px] sm:w-[380px] p-0 flex flex-col bg-slate-50"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-5 bg-white border-b border-slate-100 text-left ">
          <SheetTitle className="font-bold text-xl flex items-center gap-2 justify-center">
            <Link href="/" className="flex">
              <Image
                src="/logo-mobile.png"
                height={80}
                width={200}
                alt="Sonali Life"
                className="rounded"
              />
            </Link>
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="flex flex-col gap-2">
            {/* The Accordion handles the "One Open at a Time" logic */}
            <Accordion type="single" collapsible className="w-full space-y-2">
              {menuItems?.map((item, index) => {
                // CASE A: Has Children (Accordion Item)
                if (item.children && item.children.length > 0) {
                  return (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-none bg-white rounded-xl shadow-sm px-2 data-[state=open]:ring-1 data-[state=open]:ring-orange-200"
                    >
                      <AccordionTrigger className="px-2 py-3 text-base font-bold text-slate-700 hover:text-orange-600 hover:no-underline data-[state=open]:text-orange-600 transition-colors">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="pb-3 pt-1">
                        <div className="flex flex-col gap-1 pl-2 border-l-2 border-orange-100 ml-2">
                          {item.children.map((child, cIdx) => (
                            <Link
                              key={cIdx}
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className="flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium text-slate-500 hover:text-orange-700 hover:bg-orange-50 transition-all"
                            >
                              {child.label}
                              <ChevronRight className="w-3 h-3 opacity-50" />
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                }

                // CASE B: Single Link (Simple Button)
                return (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between w-full px-4 py-3.5 text-base font-bold text-slate-700 bg-white rounded-xl shadow-sm hover:text-orange-600 hover:shadow-md transition-all"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </Accordion>
          </nav>
        </div>

        {/* Footer: Login Buttons */}
        <div className="p-6 bg-white border-t border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Client Access
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/login?type=policyholder"
              onClick={() => setOpen(false)}
            >
              <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-orange-100 bg-orange-50 hover:bg-orange-100 transition-colors text-center cursor-pointer">
                <UserCircle2 className="w-6 h-6 text-orange-600" />
                <span className="text-xs font-bold text-orange-800">
                  Policyholder Login
                </span>
              </div>
            </Link>

            <Link href="/login?type=agent" onClick={() => setOpen(false)}>
              <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-center cursor-pointer">
                <ShieldCheck className="w-6 h-6 text-slate-600" />
                <span className="text-xs font-bold text-slate-700">
                  Agent Login
                </span>
              </div>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
