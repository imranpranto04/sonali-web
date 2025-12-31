"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const SECTIONS = [
  { id: "1", title: "1. Information Collection" },
  { id: "2", title: "2. How We Use Information" },
  { id: "3", title: "3. Sharing Information" },
  { id: "4", title: "4. Data Retention" },
  { id: "5", title: "5. Data Safety" },
  { id: "6", title: "6. Minors" },
  { id: "7", title: "7. Your Privacy Rights" },
  { id: "8", title: "8. Do-Not-Track Controls" },
  { id: "9", title: "9. California Rights" },
  { id: "10", title: "10. Updates to Notice" },
  { id: "11", title: "11. Contact Us" },
  { id: "12", title: "12. Review/Update Data" },
];

export function TermSidebar() {
  const [activeId, setActiveId] = useState("1");

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  // Optional: Auto-detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Simple logic to set active state based on scroll
      // (Simplified for performance, can be expanded with IntersectionObserver)
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="hidden lg:block sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-4">
      <h3 className="font-bold text-slate-900 mb-4 px-2 uppercase tracking-wider text-xs">
        Table of Contents
      </h3>
      <ul className="space-y-1">
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center justify-between group",
                activeId === section.id
                  ? "bg-orange-50 text-orange-700 font-bold"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <span className="truncate mr-2">{section.title}</span>
              {activeId === section.id && (
                <ChevronRight className="w-3 h-3 shrink-0" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
