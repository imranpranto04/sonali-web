"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Users,
  Settings,
  LogOut,
  Shield,
  LifeBuoy,
  Sprout,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  // --- 1. SIMPLIFIED MENU (High-level Categories Only) ---
  const policyholderLinks = [
    { label: "Dashboard", href: "/policyholder", icon: LayoutDashboard },
    { label: "My Policies", href: "/policyholder/policies", icon: Shield },
    { label: "Payments", href: "/policyholder/payments", icon: CreditCard },
    { label: "Claims", href: "/policyholder/claims", icon: FileText },
    { label: "Support", href: "/policyholder/support", icon: LifeBuoy },
  ];

  // Agent Menu (Kept separate for future expansion)
  const agentLinks = [
    { label: "Overview", href: "/agent", icon: LayoutDashboard },
    { label: "Clients", href: "/agent/clients", icon: Users },
    { label: "Commissions", href: "/agent/commissions", icon: CreditCard },
  ];

  const links = user?.role === "agent" ? agentLinks : policyholderLinks;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-center gap-2">
        {/* <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-orange-500/20">
          <Sprout className="w-5 h-5" />
        </div> */}
        <Link href="/policyholder">
          <div className="space-y-4">
            {/* <span className="text-lg font-extrabold text-slate-900 tracking-tight">
            Sonali<span className="text-orange-500">Life</span>
          </span> */}
            <div className="justify-center flex">
              <Image
                src="/logo-sm.png"
                alt="Sonali Life"
                width={30}
                height={40}
                className=""
              />
            </div>
            <span className="text-[10px] block font-bold text-amber-600 uppercase tracking-widest leading-none">
              {user?.role === "agent" ? "Agent Portal" : "Customer Portal"}
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          // Active state logic: Matches if the URL starts with the link path
          // Special case for root '/policyholder' to not match everything
          const isActive =
            link.href === pathname ||
            (link.href !== "/policyholder" &&
              link.href !== "/agent" &&
              pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200",
                isActive
                  ? "bg-orange-50 text-orange-600 shadow-sm ring-1 ring-orange-100"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  isActive ? "text-orange-600" : "text-slate-400"
                )}
              />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/30">
        <Link href="/policyholder/settings">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors rounded-lg hover:bg-white">
            <Settings className="w-5 h-5" /> Settings
          </button>
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-1"
        >
          <LogOut className="w-5 h-5" /> Log Out
        </button>
      </div>
    </aside>
  );
}
