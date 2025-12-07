"use client";

import { Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { NavItem } from "@/types/nav";

interface MobileWrapperProps {
  items: NavItem[]; // menu array
  open: boolean; // drawer open/close state
  setOpen: (value: boolean) => void; // function to update state
}

export default function MobileWrapper({
  items,
  open,
  setOpen,
}: MobileWrapperProps) {
  return (
    <>
      {/* Mobile Menu Button */}
      <button className="lg:hidden" onClick={() => setOpen(true)}>
        <Menu className="w-7 h-7" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-90"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      {open && (
        <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-100 p-4">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4"
          >
            <X className="w-6 h-6" />
          </button>

          <MobileMenu items={items} onClose={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
