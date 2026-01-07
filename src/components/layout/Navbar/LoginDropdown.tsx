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
      {/* <Button
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
      </Button> */}
      <Button
        onClick={handleClick}
        className={cn(
          "relative overflow-hidden group border-0",
          // 1. Gradient Background (Gold to Orange)
          "bg-linear-to-r from-amber-400 to-orange-600",
          // 2. Text & Layout
          "text-white font-bold rounded-full px-6 py-5 pl-5 pr-4",
          // 3. Shadow & Glow
          "shadow-[0_4px_20px_-5px_rgba(245,158,11,0.4)] hover:shadow-[0_8px_25px_-5px_rgba(245,158,11,0.6)]",
          // 4. Transition
          "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        )}
      >
        {/* Shine Effect Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

        <div className="flex items-center gap-2 relative z-10">
          <User className="w-4 h-4 fill-white/20" />
          <span className="tracking-wide text-sm">Login</span>
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 ml-1 transition-transform duration-300 opacity-80",
              isOpen && "rotate-180"
            )}
          />
        </div>
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
