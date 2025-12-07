"use client";

import { useState } from "react";
import Link from "next/link";
import { User, ChevronDown, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const LoginDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="relative group"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg px-6 shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 transition-all flex items-center gap=2">
          <User className="w-4 h-4" />
          Login
          <ChevronDown
            className={cn(
              "w-3 h-3 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </Button>

        <div
          className={cn(
            "absolute top-full right-0 pt-2 w-56 transition-all duration-200 origin-top-right z-50",
            isOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible translate-y-2"
          )}
        >
          <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2 flex flex-col gap-1">
            <Link
              href="/login?type=policyholder"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-orange-50 group/item"
            >
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover/item:bg-orange-500 group-hover/item:text-white transition-colors">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700 group-hover/item:text-orange-700">
                  Policyholder
                </p>
                <p className="text-[10px] text-slate-400">Manage your policy</p>
              </div>
            </Link>

            <div className="h-px bg-slate-100 my-1"></div>

            <Link
              href="/login?type=agent"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 group/item"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700 group-hover/item:text-blue-700">
                  Agent Login
                </p>
                <p className="text-[10px] text-slate-400">
                  For business partners
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginDropdown;
