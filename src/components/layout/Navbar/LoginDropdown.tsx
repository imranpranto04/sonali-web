// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { User, ChevronDown, Briefcase } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";

// export function LoginDropdown() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div
//       className="relative z-50"
//       onMouseEnter={() => setIsOpen(true)}
//       onMouseLeave={() => setIsOpen(false)}
//     >
//       <Button className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold rounded-lg px-6 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all flex items-center gap-2">
//         <User className="w-4 h-4" />
//         <span>Login</span>
//         <ChevronDown
//           className={cn(
//             "w-3 h-3 transition-transform duration-300",
//             isOpen && "rotate-180"
//           )}
//         />
//       </Button>

//       {/* Dropdown Menu */}
//       <div
//         className={cn(
//           "absolute top-full right-0 pt-3 w-64 transition-all duration-300 origin-top-right",
//           isOpen
//             ? "opacity-100 visible translate-y-0"
//             : "opacity-0 invisible translate-y-2 pointer-events-none"
//         )}
//       >
//         <div className="bg-white rounded-xl shadow-2xl border border-slate-100 p-2 flex flex-col gap-1 overflow-hidden ring-1 ring-black/5">
//           {/* Policyholder */}
//           <Link
//             href="/login?type=policyholder"
//             className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-orange-50 group transition-colors"
//           >
//             <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors shrink-0">
//               <User className="w-5 h-5" />
//             </div>
//             <div>
//               <p className="text-sm font-bold text-slate-700 group-hover:text-orange-700">
//                 Policyholder
//               </p>
//               <p className="text-[10px] text-slate-400 font-medium group-hover:text-slate-500">
//                 Manage your policy
//               </p>
//             </div>
//           </Link>

//           <div className="h-px bg-slate-100 mx-2" />

//           {/* Agent */}
//           <Link
//             href="/login?type=agent"
//             className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-blue-50 group transition-colors"
//           >
//             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0">
//               <Briefcase className="w-5 h-5" />
//             </div>
//             <div>
//               <p className="text-sm font-bold text-slate-700 group-hover:text-blue-700">
//                 Agent Login
//               </p>
//               <p className="text-[10px] text-slate-400 font-medium group-hover:text-slate-500">
//                 For business partners
//               </p>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// new with click and hover
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { User, ChevronDown, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function LoginDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const lastHoverTime = useRef<number>(0);

  // LOGIC
  const handleMouseEnter = () => {
    setIsOpen(true);
    lastHoverTime.current = Date.now();
  };

  const handleClick = () => {
    const now = Date.now();
    // If hover just happened, ignore this click (prevent flicker)
    if (now - lastHoverTime.current < 500) return;
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="relative z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Button
        onClick={handleClick}
        className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold rounded-lg px-6 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all flex items-center gap-2"
      >
        <User className="w-4 h-4" />
        <span>Login</span>
        <ChevronDown
          className={cn(
            "w-3 h-3 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </Button>

      <div
        className={cn(
          "absolute top-full right-0 pt-3 w-64 transition-all duration-300 origin-top-right",
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-2 pointer-events-none"
        )}
      >
        <div className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 p-2 flex flex-col gap-1 overflow-hidden">
          <Link
            href="/login?type=policyholder"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-orange-50 group transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700 group-hover:text-orange-700">
                Policyholder
              </p>
              <p className="text-[10px] text-slate-400 font-medium group-hover:text-slate-500">
                Manage your policy
              </p>
            </div>
          </Link>

          <div className="h-px bg-slate-50 mx-2" />

          <Link
            href="/login?type=agent"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-blue-50 group transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700 group-hover:text-blue-700">
                Agent Login
              </p>
              <p className="text-[10px] text-slate-400 font-medium group-hover:text-slate-500">
                For business partners
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
