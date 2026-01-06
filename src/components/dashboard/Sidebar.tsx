"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  TrendingUp,
  Columns4,
  Users,
  FileText,
  AlertCircle,
  Award,
  LogOut,
  ChevronRight,
  UserPlus,
  Building2,
  Clock,
  Shield,
  CreditCard,
  LifeBuoy,
  Wallet,
  Trophy,
  Star,
  CalendarCheck,
  PieChart,
  Hourglass,
  PiggyBank,
  Send,
  PenTool,
  Package,
} from "lucide-react";
import Image from "next/image";

// Props for Mobile Handling
interface SidebarProps {
  onLinkClick?: () => void;
}

// --- 1. PREMIUM MENU LINK ---
function MenuLink({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}: {
  href: string;
  icon: any;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 px-3 py-2.5 mx-3 text-sm rounded-lg transition-all duration-200",
        active
          ? "bg-emerald-200 text-slate-900 font-bold shadow-sm ring-1 ring-slate-200/50"
          : "text-slate-700 font-medium hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 bg-emerald-600 rounded-r-md" />
      )}

      <Icon
        className={cn(
          "w-[18px] h-[18px] transition-colors",
          active
            ? "text-emerald-600"
            : "text-slate-400 group-hover:text-slate-600"
        )}
      />

      <span className="tracking-tight">{label}</span>

      <ChevronRight
        className={cn(
          "w-3.5 h-3.5 ml-auto transition-opacity",
          active
            ? "text-slate-400 opacity-100"
            : "opacity-0 group-hover:opacity-50"
        )}
      />
    </Link>
  );
}

// --- 2. SECTION HEADER ---
function MenuSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 mt-6">
      <h3 className="px-6 text-[12px] font-bold uppercase tracking-wider text-emerald-700 mb-2 select-none">
        {title}
      </h3>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

// --- 3. MAIN SIDEBAR ---
export function Sidebar({ onLinkClick }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const isAgent = user?.role === "agent";
  const roleLabel = isAgent ? "Agent Portal" : "Client Portal";
  const homeLink = isAgent ? "/agent" : "/policyholder";

  return (
    <aside className="w-[270px] bg-slate-100 h-screen sticky top-0 flex flex-col border-r border-slate-200/60 shadow-[2px_0_8px_-4px_rgba(0,0,0,0.02)] z-50">
      {/* BRAND HEADER */}
      <div className="h-[72px] flex items-center px-5 border-b border-slate-100">
        <Link
          href={homeLink}
          onClick={onLinkClick}
          className="flex items-center gap-3 group w-full"
        >
          <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-100/50">
            <Image
              src="/logo-sm.png"
              alt="Logo"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
            />
          </div>
          <div>
            <span className="block text-base font-extrabold text-slate-800 leading-tight tracking-tight">
              Sonali Life
            </span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              {roleLabel}
            </span>
          </div>
        </Link>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto py-5 scrollbar-thin scrollbar-thumb-slate-200/50 scrollbar-track-transparent">
        {isAgent ? (
          <>
            <div className="px-0 mb-2">
              <MenuLink
                href="/agent"
                icon={LayoutDashboard}
                label="Dashboard"
                active={pathname === "/agent"}
                onClick={onLinkClick}
              />
            </div>

            <MenuSection title="Performance">
              <MenuLink
                href="/agent/performance"
                icon={Columns4}
                label="Policy List"
                active={pathname === "/agent/performance"}
                onClick={onLinkClick}
              />
              <MenuLink
                href="/agent/business-commission"
                icon={TrendingUp}
                label="Business & Commission"
                active={pathname === "/agent/business-commission"}
                onClick={onLinkClick}
              />
              <MenuLink
                href="/agent/pay-benefits"
                icon={Wallet}
                label="Pay & Benefits"
                active={pathname === "/agent/pay-benefits"}
                onClick={onLinkClick}
              />
              <MenuLink
                href="/agent/ranking"
                icon={Trophy}
                label="Ranking"
                active={pathname === "/agent/ranking"}
                onClick={onLinkClick}
              />
              <MenuLink
                href="/agent/commission-schedule"
                icon={FileText}
                label="Commission Schedule"
                active={pathname === "/agent/commission-schedule"}
                onClick={onLinkClick}
              />
              <MenuLink
                href="/agent/achievement"
                icon={Star}
                label="My Achievement"
                active={pathname === "/agent/achievement"}
                onClick={onLinkClick}
              />
              {/* <MenuLink
                href="/agent/activity"
                icon={CalendarCheck}
                label="Daily Activity"
                active={pathname === "/agent/activity"}
                onClick={onLinkClick}
              /> */}
            </MenuSection>

            <MenuSection title="Team Management">
              <MenuLink
                href="/agent/team"
                icon={Users}
                label="My Team"
                active={pathname === "/agent/team"}
                onClick={onLinkClick}
              />
              <MenuLink
                href="/agent/recruitment"
                icon={UserPlus}
                label="New Recruitment"
                active={pathname === "/agent/recruitment"}
                onClick={onLinkClick}
              />
              <MenuLink
                href="/agent/branch-cost"
                icon={Building2}
                label="My Branch"
                active={pathname === "/agent/branch-cost"}
                onClick={onLinkClick}
              />
              <MenuLink
                href="/agent/deferred-renewal-percentage"
                icon={PieChart}
                label="Deferred and Renewal Percentage"
                active={pathname === "/agent/deferred-renewal-percentage"}
                onClick={onLinkClick}
              />
            </MenuSection>

            <MenuSection title="Policy Info">
              <MenuLink
                href="/agent/due-policies"
                icon={AlertCircle}
                label="Due Policies"
                active={pathname === "/agent/due-policies"}
                onClick={onLinkClick}
              />
              <MenuLink
                href="/agent/lapse-policies"
                icon={Clock}
                label="Lapse Policies"
                active={pathname === "/agent/lapse-policies"}
                onClick={onLinkClick}
              />
              <MenuLink
                href="/agent/policy-claims"
                icon={FileText}
                label="Policy Claims"
                active={pathname === "/agent/policy-claims"}
                onClick={onLinkClick}
              />
              <MenuLink
                href="/agent/policy-maturity"
                icon={Hourglass}
                label="Policy Maturity"
                active={pathname === "/agent/policy-maturity"}
                onClick={onLinkClick}
              />
              {/* <MenuLink
                href="/agent/provident-fund"
                icon={PiggyBank}
                label="Provident Fund"
                active={pathname === "/agent/provident-fund"}
                onClick={onLinkClick}
              /> */}
              <MenuLink
                href="/agent/forwarding"
                icon={Send}
                label="Forwarding Entry"
                active={pathname === "/agent/forwarding"}
                onClick={onLinkClick}
              />
            </MenuSection>

            <MenuSection title="Tools">
              <MenuLink
                href="/agent/apply"
                icon={PenTool}
                label="Apply Online"
                active={pathname === "/agent/apply"}
                onClick={onLinkClick}
              />
              <MenuLink
                href="/products"
                icon={Package}
                label="Products"
                active={pathname === "/products"}
                onClick={onLinkClick}
              />
            </MenuSection>
          </>
        ) : (
          /* POLICYHOLDER MENU */
          <>
            <div className="px-0 mb-2">
              <MenuLink
                href="/policyholder"
                icon={LayoutDashboard}
                label="Dashboard"
                active={pathname === "/policyholder"}
                onClick={onLinkClick}
              />
            </div>

            <MenuSection title="Insurance">
              <MenuLink
                href="/policyholder/policies"
                icon={Shield}
                label="My Policies"
                active={pathname === "/policyholder/policies"}
                onClick={onLinkClick}
              />
              <MenuLink
                href="/policyholder/payments"
                icon={CreditCard}
                label="Make Payment"
                active={pathname === "/policyholder/payments"}
                onClick={onLinkClick}
              />
              <MenuLink
                href="/policyholder/claims"
                icon={FileText}
                label="Claims"
                active={pathname === "/policyholder/claims"}
                onClick={onLinkClick}
              />
            </MenuSection>

            <MenuSection title="Support">
              <MenuLink
                href="/policyholder/support"
                icon={LifeBuoy}
                label="Help Center"
                active={pathname === "/policyholder/support"}
                onClick={onLinkClick}
              />
            </MenuSection>
          </>
        )}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-slate-200/60 bg-slate-50/50">
        <button
          onClick={() => {
            logout();
            if (onLinkClick) onLinkClick();
          }}
          className="flex items-center gap-3 px-4 py-2.5 w-full text-xs font-bold text-slate-500 hover:text-red-600 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200 group border border-transparent hover:border-red-100"
        >
          <LogOut className="w-4 h-4 group-hover:scale-105 transition-transform" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
