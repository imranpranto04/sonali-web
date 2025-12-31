"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle, // <--- REQUIRED IMPORT
  SheetDescription, // <--- REQUIRED IMPORT
  SheetHeader, // <--- REQUIRED IMPORT
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";

export function DashboardMobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-slate-600 hover:bg-slate-100"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0 w-[270px] border-r-0 bg-white">
        {/* --- FIX: Hidden Header for Accessibility --- */}
        <SheetHeader className="sr-only">
          <SheetTitle>Mobile Navigation Menu</SheetTitle>
          <SheetDescription>
            Main menu for navigating the agent dashboard.
          </SheetDescription>
        </SheetHeader>
        {/* ------------------------------------------- */}

        <Sidebar onLinkClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
