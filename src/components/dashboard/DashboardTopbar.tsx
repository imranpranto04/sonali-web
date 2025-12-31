// "use client";

// import Link from "next/link";
// import {
//   Bell,
//   LogOut,
//   User as UserIcon,
//   Settings,
//   Shield,
//   Briefcase,
//   ChevronDown,
// } from "lucide-react";
// import { useAuthStore } from "@/store/auth-store";
// import {
//   usePersonalDetails,
//   AgentDetails,
//   PolicyholderDetails,
// } from "@/hooks/use-personal-details";

// // Components
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { DashboardMobileSidebar } from "./DashboardMobileSidebar";

// export function DashboardTopbar() {
//   const { user, logout } = useAuthStore();

//   // 1. Fetch details (Cached automatically by React Query)
//   const { data } = usePersonalDetails();

//   // 2. Determine Display Values based on Role
//   const isAgent = user?.role === "agent";
//   const profile = data as AgentDetails | PolicyholderDetails;

//   // Safe access for Name and Image depending on which type of profile we got
//   const displayName = isAgent
//     ? (profile as AgentDetails)?.AgentName
//     : (profile as PolicyholderDetails)?.ApplicantNameEng ||
//       user?.name ||
//       "Valued User";

//   const displayImage = isAgent
//     ? (profile as AgentDetails)?.AgentImage
//     : (profile as PolicyholderDetails)?.ApplicantPPName || "";

//   const displayRole = isAgent ? "Agent" : "Policyholder";
//   const dashboardTitle = isAgent ? "Agent Dashboard" : "Policyholder Dashboard";

//   // Dynamic Role Icon
//   const RoleIcon = isAgent ? Briefcase : Shield;

//   // Determine Base Path for Links (Agent vs Policyholder)
//   const basePath = isAgent ? "/agent" : "/policyholder";

//   return (
//     <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 w-full shadow-sm">
//       {/* Left: Mobile Menu Trigger & Page Title */}
//       <div className="flex items-center gap-4">
//         {/* --- MOBILE SIDEBAR TRIGGER --- */}
//         <div className="lg:hidden">
//           <DashboardMobileSidebar />
//         </div>

//         <h2 className="text-lg font-extrabold text-slate-800 hidden sm:flex items-center gap-2">
//           {dashboardTitle}
//         </h2>
//       </div>

//       {/* Right: Actions & Profile */}
//       <div className="flex items-center gap-3 md:gap-5">
//         {/* Notification Bell */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="relative text-slate-500 hover:text-orange-600 hover:bg-orange-50 transition-colors"
//         >
//           <Bell className="w-5 h-5" />
//           <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
//         </Button>

//         {/* Vertical Divider */}
//         <div className="h-8 w-px bg-slate-200 mx-1"></div>

//         {/* User Profile Dropdown */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <button className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 outline-none group cursor-pointer">
//               {/* Avatar with Ring */}
//               <div className="relative">
//                 <Avatar className="h-9 w-9 border-2 border-white shadow-sm ring-2 ring-orange-100 group-hover:ring-orange-200 transition-all">
//                   <AvatarImage
//                     src={displayImage}
//                     alt={displayName}
//                     className="object-cover"
//                   />
//                   <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold">
//                     {displayName?.charAt(0)}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
//               </div>

//               {/* Text Info (Hidden on mobile for space) */}
//               <div className="text-left hidden md:block">
//                 <p className="text-sm font-bold text-slate-700 leading-none group-hover:text-orange-700 transition-colors max-w-[150px] truncate">
//                   {displayName?.split(" ")[0]}
//                 </p>
//                 <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mt-0.5">
//                   <RoleIcon className="w-3 h-3" /> {displayRole}
//                 </p>
//               </div>

//               <ChevronDown className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors hidden md:block" />
//             </button>
//           </DropdownMenuTrigger>

//           {/* Dropdown Content */}
//           <DropdownMenuContent
//             className="w-64 p-2 bg-white border-slate-100 shadow-xl"
//             align="end"
//             forceMount
//           >
//             {/* Header inside Dropdown */}
//             <DropdownMenuLabel className="font-normal p-3 bg-slate-50 rounded-lg mb-2 border border-slate-100">
//               <div className="flex flex-col space-y-1">
//                 <p className="text-sm font-bold text-slate-900 truncate">
//                   {displayName}
//                 </p>
//                 <p className="text-xs font-bold leading-none text-slate-500 truncate">
//                   ID: {user?.id || "---"}
//                 </p>
//                 <span className="inline-flex items-center gap-1 mt-1.5 w-fit px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wider">
//                   <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>{" "}
//                   Active Now
//                 </span>
//               </div>
//             </DropdownMenuLabel>

//             <DropdownMenuSeparator />

//             <Link href={`${basePath}/settings?tab=profile`}>
//               <DropdownMenuItem className="cursor-pointer font-bold py-2.5 px-3 text-slate-800 focus:text-orange-600 focus:bg-orange-50 rounded-md">
//                 <UserIcon className="mr-2 h-4 w-4" />
//                 <span>My Profile</span>
//               </DropdownMenuItem>
//             </Link>

//             <Link href={`${basePath}/settings?tab=security`}>
//               <DropdownMenuItem className="cursor-pointer font-bold py-2.5 px-3 text-slate-800 focus:text-orange-600 focus:bg-orange-50 rounded-md">
//                 <Settings className="mr-2 h-4 w-4" />
//                 <span>Account Settings</span>
//               </DropdownMenuItem>
//             </Link>

//             <DropdownMenuSeparator />

//             <DropdownMenuItem
//               onClick={logout}
//               className="cursor-pointer font-bold py-2.5 px-3 text-red-500 focus:text-red-700 focus:bg-red-50 rounded-md"
//             >
//               <LogOut className="mr-2 h-4 w-4" />
//               <span>Sign Out</span>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import {
  Bell,
  LogOut,
  User as UserIcon,
  Settings,
  Shield,
  Briefcase,
  ChevronDown,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import {
  usePersonalDetails,
  AgentDetails,
  PolicyholderDetails,
} from "@/hooks/use-personal-details";

// Components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardMobileSidebar } from "./DashboardMobileSidebar";
import { ProfileSheet } from "@/components/dashboard/agent/ProfileSheet";

export function DashboardTopbar() {
  const { user, logout } = useAuthStore();
  const { data } = usePersonalDetails();

  const isAgent = user?.role === "agent";
  const profile = data as AgentDetails | PolicyholderDetails;

  const displayName = isAgent
    ? (profile as AgentDetails)?.AgentName
    : (profile as PolicyholderDetails)?.ApplicantNameEng ||
      user?.name ||
      "Valued User";

  const displayImage = isAgent
    ? (profile as AgentDetails)?.AgentImage
    : (profile as PolicyholderDetails)?.ApplicantPPName || "";

  const displayRole = isAgent ? "Agent" : "Policyholder";
  const dashboardTitle = isAgent ? "Agent Dashboard" : "Policyholder Dashboard";
  const RoleIcon = isAgent ? Briefcase : Shield;
  const basePath = isAgent ? "/agent" : "/policyholder";

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 w-full shadow-sm">
      {/* Left: Mobile Menu Trigger & Page Title */}
      <div className="flex items-center gap-4">
        <div className="lg:hidden">
          <DashboardMobileSidebar />
        </div>
        <h2 className="text-lg font-extrabold text-slate-800 hidden sm:flex items-center gap-2">
          {dashboardTitle}
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
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </Button>

        {/* Divider */}
        <div className="h-8 w-px bg-slate-200 mx-1"></div>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* --- RESTORED BUTTON DESIGN --- */}
            <button className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 outline-none group cursor-pointer">
              {/* Avatar with Ring */}
              <div className="relative">
                <Avatar className="h-9 w-9 border-2 border-white shadow-sm ring-2 ring-orange-100 group-hover:ring-orange-200 transition-all">
                  <AvatarImage
                    src={displayImage}
                    alt={displayName}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-linear-to-br from-orange-400 to-orange-600 text-white font-bold">
                    {displayName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
              </div>

              {/* Text Info */}
              <div className="text-left hidden md:block">
                <p className="text-sm font-bold text-slate-700 leading-none group-hover:text-orange-700 transition-colors max-w-[150px] truncate">
                  {displayName?.split(" ")[0]}
                </p>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mt-0.5">
                  <RoleIcon className="w-3 h-3" /> {displayRole}
                </p>
              </div>

              <ChevronDown className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors hidden md:block" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-64 p-2 bg-white border-slate-100 shadow-xl"
            align="end"
            forceMount
          >
            {/* Header inside Dropdown */}
            <DropdownMenuLabel className="font-normal p-3 bg-slate-50 rounded-lg mb-2 border border-slate-100">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold text-slate-900 truncate">
                  {displayName}
                </p>
                <p className="text-xs font-bold leading-none text-slate-500 truncate">
                  ID: {user?.id || "---"}
                </p>
                <span className="inline-flex items-center gap-1 mt-1.5 w-fit px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Active Now
                </span>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* --- INTEGRATED PROFILE SHEET --- */}
            {isAgent ? (
              <ProfileSheet profile={profile as AgentDetails}>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="cursor-pointer font-bold py-2.5 px-3 text-slate-800 focus:text-orange-600 focus:bg-orange-50 rounded-md"
                >
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>
              </ProfileSheet>
            ) : (
              <Link href={`${basePath}/profile`}>
                <DropdownMenuItem className="cursor-pointer font-bold py-2.5 px-3 text-slate-800 focus:text-orange-600 focus:bg-orange-50 rounded-md">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>
              </Link>
            )}

            <Link href={`${basePath}/settings`}>
              <DropdownMenuItem className="cursor-pointer font-bold py-2.5 px-3 text-slate-800 focus:text-orange-600 focus:bg-orange-50 rounded-md">
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer font-bold py-2.5 px-3 text-red-500 focus:text-red-700 focus:bg-red-50 rounded-md"
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
