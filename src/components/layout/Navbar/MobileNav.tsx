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
        {/* <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-slate-800 hover:bg-orange-50 hover:text-orange-600"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button> */}

        <Button
          variant="ghost"
          size="icon"
          // Changed text-slate-800 to text-white
          // Changed hover:bg-orange-50 to hover:bg-white/10
          className="lg:hidden text-white hover:bg-white/10 hover:text-amber-400 transition-colors"
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
