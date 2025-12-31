"use client";

import Link from "next/link";
// Your existing file
import { Button } from "@/components/ui/button";
import { LoginDropdown } from "./LoginDropdown";
import { MobileNav } from "./MobileNav";
import { DesktopNavItem } from "./DesktopNavItem";
import Image from "next/image";

export function Navbar() {
  return (
    <div className="container mx-auto flex items-center justify-between">
      {/* 1. Logo Section */}
      <Link href="/" className="flex items-center gap-2 group">
        {/* Replace with actual <Image /> if you have one */}
        <Image
          src="/logo-sm-bg.png"
          alt="Sonali Life"
          height={80}
          width={120}
        />
      </Link>

      {/* 2. Desktop Navigation (Dynamic) */}
      <div className="hidden lg:flex">
        <DesktopNavItem />
      </div>

      {/* 3. Right Actions */}
      <div className="flex items-center gap-3">
        {/* Your Login Logic */}
        <div className="hidden sm:block">
          <LoginDropdown />
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}
