"use client";

import { useEffect, useState } from "react";
import { Menu, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";
import NavTopbar from "./NavTopbar";
import MobileMenu from "./MobileMenu";
import LoginDropdown from "./LoginDropdown";
import DesktopMenu from "./DesktopMenu";
import Image from "next/image";
import Link from "next/link";
import { NavItem } from "@/types/nav";
import MobileWrapper from "./MobileWrapper";
// import { NAV_ITEMS } from "@/lib/navData";

interface Props {
  items: NavItem[];
}

function ClientNavbarController({ items }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 font-sans transition-all duration-300">
        <NavTopbar scrolled={scrolled} />
        <nav
          className={cn(
            "bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all shadow-md",
            scrolled ? "py-2 shadow-lg" : "py-3 lg:py-4"
          )}
        >
          <div className="container mx-auto px-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Sonali Life Insurance Logo"
                  height={55}
                  width={250}
                  // className="object-cover"
                  priority
                />
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {items.map((item) => (
                <DesktopMenu key={item.label} item={item} />
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <LoginDropdown />
            </div>

            <button
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-50 rounded-lg"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileWrapper
        items={items}
        open={mobileMenuOpen}
        setOpen={setMobileMenuOpen}
      />

      {/* {mobileMenuOpen && (
        <div className="fixed inset-0 z-60 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          <div className="absolute top-0 right-0 bottom-0 w-full max-w-[300px]">
            <MobileMenu onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )} */}
    </>
  );
}

export default ClientNavbarController;
