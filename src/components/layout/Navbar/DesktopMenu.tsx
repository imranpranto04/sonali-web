"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/nav";
import { getIcon } from "@/lib/get-icon";
// import { NavItem, NAV_ITEMS } from "@/lib/navData";

export default function DesktopMenu({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);

  {
    /* new */
  }

  // const Icon = getIcon(item.icon);

  // Simple Link
  if (!item.children) {
    return (
      <Link
        href={item.href!}
        className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors whitespace-nowrap"
      >
        {/* new */}
        {/* {Icon && <Icon className="w-4 h-4 inline mr-1" />} */}

        {item.label}
      </Link>
    );
  }

  // Dropdown
  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-bold transition-colors rounded-lg whitespace-nowrap",
          isOpen
            ? "text-orange-600 bg-orange-50"
            : "text-slate-600 hover:text-orange-600 hover:bg-orange-50"
        )}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "absolute top-full left-0 pt-2 transition-all duration-200 origin-top-left z-50",
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-2"
        )}
      >
        <div className="w-56 bg-white rounded-xl shadow-xl border border-slate-100 p-2 overflow-hidden">
          <p className="px-3 py-2 text-[10px] font-bold text-orange-500 uppercase tracking-wider bg-orange-50/50 rounded-lg mb-1 flex items-center gap-2">
            {/* {item.icon && <item.icon className="w-3 h-3" />} */}
            {item.label}
          </p>

          {item.children.map((child, idx) => (
            <Link
              key={idx}
              href={child.href!}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 group/item transition-colors"
            >
              <p className="text-sm font-bold text-slate-700 group-hover/item:text-orange-600">
                {child.label}
              </p>
              {child.type && (
                <p className="text-[10px] text-slate-400 line-clamp-1">
                  {child.type}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
