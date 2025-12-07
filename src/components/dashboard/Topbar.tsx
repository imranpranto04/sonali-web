"use client";

import {
  Bell,
  Menu,
  Search,
  LogOut,
  Shield,
  Briefcase,
  User as UserIcon,
  Settings,
  User,
  ChevronDown,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePersonalDetails } from "@/hooks/use-personal-details";
import Link from "next/link";

interface TopbarProps {
  onMenuClick: () => void;
}

export function DashboardTopbar({ onMenuClick }: TopbarProps) {
  const { user, logout } = useAuthStore();

  // 2. Fetch Profile Data (This will be cached, so it's fast!)
  const { data: profile } = usePersonalDetails();

  // 3. Determine Display Name & Image
  // Use API data if available, otherwise fallback to Auth Store user, then default
  const displayName = profile?.ApplicantNameEng || user?.name || "User";
  const displayImage = profile?.ApplicantPPName || "";
  const displayRole = user?.role === "agent" ? "Agent" : "Policyholder";

  // Dynamic Role Icon
  const RoleIcon = user?.role === "agent" ? Briefcase : Shield;

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 w-full shadow-sm">
      {/* Left: Mobile Menu Trigger & Page Title */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden text-slate-600 hover:bg-slate-100"
        >
          <Menu className="w-6 h-6" />
        </Button>

        <h2 className="text-lg font-extrabold text-orange-400 hidden sm:flex items-center gap-2">
          <Link href="/policyholder">Dashboard</Link>
          {/* <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
            v2.0
          </span> */}
        </h2>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Notification Bell */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-500 hover:text-orange-600 hover:bg-orange-50 transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
        </Button>

        {/* Vertical Divider */}
        <div className="h-8 w-px bg-slate-200 mx-1"></div>

        {/* User Profile Dropdown (Premium Design) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 p-1 px-3 pr-3 rounded-full hover:bg-slate-200 transition-colors border border-transparent hover:border-slate-100 outline-none group cursor-pointer">
              {/* Text Info (Hidden on mobile) */}
              <div className="text-left hidden md:block">
                <p className="text-sm font-bold text-slate-700 leading-none group-hover:text-orange-700 transition-colors">
                  {displayName.split(" ")[0]}
                </p>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mt-0.5">
                  <RoleIcon className="w-3 h-3" /> {displayRole}
                </p>
              </div>

              {/* Avatar with Ring */}
              <div className="relative">
                <Avatar className="h-9 w-9 border-2 border-white shadow-sm ring-2 ring-orange-100 group-hover:ring-orange-200 transition-all">
                  <AvatarImage
                    src={displayImage}
                    alt={displayName}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-linear-to-br from-orange-400 to-orange-600 text-white font-bold">
                    {displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
              </div>

              <ChevronDown className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors hidden md:block" />
            </button>
          </DropdownMenuTrigger>

          {/* Dropdown Content */}
          <DropdownMenuContent
            className="w-64 p-2 bg-slate-200"
            align="end"
            forceMount
          >
            {/* Header inside Dropdown */}
            <DropdownMenuLabel className="font-normal p-3 bg-slate-50 rounded-lg mb-2 border border-slate-100">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold text-slate-900">
                  {displayName}
                </p>
                <p className="text-xs leading-none text-slate-500 truncate">
                  ID: {user?.id || "---"}
                </p>
                <span className="inline-flex items-center gap-1 mt-1.5 w-fit px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>{" "}
                  Active Now
                </span>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <Link href="/policyholder/settings?tab=profile">
              <DropdownMenuItem className="cursor-pointer py-2.5 px-3 text-slate-600 focus:text-orange-600 focus:bg-orange-50 rounded-md font-bold">
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
            </Link>

            <Link href="/policyholder/settings?tab=security">
              <DropdownMenuItem className="cursor-pointer py-2.5 px-3 text-slate-600 focus:text-orange-600 focus:bg-orange-50 rounded-md font-bold">
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer font-bold py-2.5 px-3 text-red-600 focus:text-red-700 focus:bg-red-50 rounded-md"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
