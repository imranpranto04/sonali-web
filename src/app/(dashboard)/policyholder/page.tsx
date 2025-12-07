// "use client";

// import {
//   Shield,
//   TrendingUp,
//   FileText,
//   CreditCard,
//   Calendar,
//   AlertCircle,
//   User,
//   ArrowRight,
//   Users,
//   FileClock,
//   Banknote,
//   ScrollText,
//   PlusCircle,
//   LayoutDashboardIcon,
//   CheckCircle2,
//   XCircle,
//   MoreHorizontal,
//   ChevronRight,
//   PiggyBank,
//   Activity,
// } from "lucide-react";
// import Link from "next/link";
// import { usePersonalDetails } from "@/hooks/use-personal-details";
// import { usePolicies, PolicyData } from "@/hooks/use-policy-data";
// import { usePolicyStatus } from "@/hooks/use-policy-status";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// // --- Enhanced Policy Card Component ---
// function PolicyCard({ policy }: { policy: PolicyData }) {
//   const { data: details, isLoading } = usePolicyStatus(policy.FPRId);
//   const isActive = details?.Status === "Active";

//   return (
//     <div className="group bg-white rounded-2xl border border-slate-100 hover:border-orange-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col relative">
//       {/* Soft Header Background */}
//       <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-cyan-500 opacity-80" />

//       <div className="p-5 pb-0 pt-6">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex gap-3 items-center">
//             <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100/50 shadow-sm">
//               <Shield className="w-5 h-5" />
//             </div>
//             <div>
//               <h4 className="font-bold text-slate-900 text-sm leading-tight group-hover:text-orange-600 transition-colors line-clamp-1">
//                 {policy.Category || "Insurance Plan"}
//               </h4>
//               <p className="text-[11px] text-slate-500 font-mono mt-0.5 bg-slate-50 px-1.5 py-0.5 rounded w-fit">
//                 {policy.PolicyNumber}
//               </p>
//             </div>
//           </div>
//           {isLoading ? (
//             <Skeleton className="h-5 w-16 rounded-full" />
//           ) : (
//             <Badge
//               className={`px-2 py-0.5 h-5 text-[10px] font-bold uppercase border shadow-none ${
//                 isActive
//                   ? "bg-green-50 text-green-700 border-green-100"
//                   : "bg-red-50 text-red-700 border-red-100"
//               }`}
//             >
//               {isActive ? "Active" : details?.Status}
//             </Badge>
//           )}
//         </div>

//         {/* Metrics Grid - Cleaner Layout */}
//         <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-50">
//           <div>
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
//               Premium Amount
//             </p>
//             <p className="text-lg font-extrabold text-slate-900">
//               ৳ {policy.PremiumAmount.toLocaleString()}
//             </p>
//           </div>
//           <div className="text-right">
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
//               Next Due
//             </p>
//             <p className="text-sm font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md inline-block">
//               {policy.DueDate}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Footer Actions - Simplified & Cool */}
//       <div className="mt-auto p-4 bg-slate-50/50 border-t border-slate-100 flex items-center gap-3">
//         <Link
//           href={`/policyholder/policies/${policy.FPRId}`}
//           className="flex-1"
//         >
//           <Button
//             variant="ghost"
//             size="sm"
//             className="w-full text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-400 border border-transparent hover:border-slate-200 transition-all"
//           >
//             View Details
//           </Button>
//         </Link>
//         <Button
//           size="sm"
//           className="flex-1 bg-orange-400 hover:bg-orange-500 text-white text-xs font-bold shadow-sm h-9 transition-all"
//         >
//           Pay Premium
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default function PolicyholderDashboard() {
//   const {
//     data: profile,
//     isLoading: profileLoading,
//     isError: profileError,
//   } = usePersonalDetails();
//   const { data: policies, isLoading: policiesLoading } = usePolicies();

//   const isLoading = profileLoading || policiesLoading;

//   // 1. Sort Policies by Due Date (Dynamic Logic)
//   const sortedPolicies = policies
//     ? [...policies].sort((a, b) => {
//         // Convert "DD MMM YYYY" to Date object for sorting
//         const dateA = new Date(a.DueDate);
//         const dateB = new Date(b.DueDate);
//         return dateA.getTime() - dateB.getTime();
//       })
//     : [];

//   // Find the most urgent payment (first in sorted list)
//   const nextPremium = sortedPolicies.length > 0 ? sortedPolicies[0] : null;

//   // 2. Financial Stats Calculation (Dynamic from Policies Data)
//   const totalPolicies = policies?.length || 0;

//   // Sum up all premiums as "Total Premium Paid" (Estimation for now based on active policies)
//   // In a real app, you might fetch a separate 'total-paid' endpoint.
//   const totalPremiumValue =
//     policies?.reduce((acc, p) => acc + (p.PremiumAmount || 0), 0) || 0;

//   // Placeholder logic for Sum Assured & Bonus (Replace with real API logic when available)
//   // For example, if `SumAssured` is part of the policy data, we would sum it up.
//   // Assuming `PremiumAmount * 10` as a rough estimate for Sum Assured for this demo.
//   const totalSumAssured = totalPremiumValue * 10;
//   const totalBonus = totalPremiumValue * 0.05; // 5% Bonus estimate

//   const menuItems = [
//     {
//       label: "Nominee Info",
//       icon: Users,
//       color: "text-blue-600",
//       bg: "bg-blue-50",
//       href: "/policyholder/nominee",
//     },
//     {
//       label: "Policy Schedule",
//       icon: Calendar,
//       color: "text-purple-600",
//       bg: "bg-purple-50",
//       href: "/policyholder/schedule",
//     },
//     {
//       label: "Payment History",
//       icon: FileClock,
//       color: "text-green-600",
//       bg: "bg-green-50",
//       href: "/policyholder/history",
//     },
//     {
//       label: "Maturity Details",
//       icon: TrendingUp,
//       color: "text-orange-600",
//       bg: "bg-orange-50",
//       href: "/policyholder/maturity",
//     },
//     {
//       label: "Customer Loan",
//       icon: Banknote,
//       color: "text-cyan-600",
//       bg: "bg-cyan-50",
//       href: "/policyholder/loan",
//     },
//     {
//       label: "Benefits",
//       icon: ScrollText,
//       color: "text-pink-600",
//       bg: "bg-pink-50",
//       href: "/policyholder/benefits",
//     },
//     {
//       label: "Supp. Claim",
//       icon: PlusCircle,
//       color: "text-red-600",
//       bg: "bg-red-50",
//       href: "/policyholder/claim-apply",
//     },
//   ];

//   if (isLoading)
//     return (
//       <div className="p-8 flex justify-center">
//         <Skeleton className="h-96 w-full rounded-3xl" />
//       </div>
//     );

//   if (profileError) {
//     return (
//       <div className="p-8 text-center bg-red-50 text-red-600 rounded-2xl border border-red-100">
//         <p className="font-bold">Failed to load profile data.</p>
//         <Button
//           variant="outline"
//           onClick={() => window.location.reload()}
//           className="mt-4 bg-white"
//         >
//           Retry
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8 animate-in fade-in duration-500 pb-10">
//       {/* 1. HEADER & PROFILE */}
//       <Card className="border-none shadow-sm bg-white overflow-hidden">
//         <div className="bg-linear-to-r from-orange-500 to-amber-500 h-24 md:h-32 relative">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
//         </div>

//         <CardContent className="px-6 md:px-8 pb-8 relative">
//           <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-12">
//             <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-lg">
//               <AvatarImage
//                 src={profile?.ApplicantPPName}
//                 alt={profile?.ApplicantNameEng}
//                 className="object-cover"
//               />
//               <AvatarFallback className="bg-orange-100 text-orange-600 text-3xl font-bold">
//                 {profile?.ApplicantNameEng?.charAt(0) || "U"}
//               </AvatarFallback>
//             </Avatar>

//             <div className="flex-1 text-center md:text-left mb-2">
//               <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
//                 {profile?.ApplicantNameEng || "Valued Client"}
//               </h1>
//               <p className="text-slate-500 text-sm max-w-xl mx-auto md:mx-0 mt-1 line-clamp-1">
//                 {profile?.PresentAddress || "Address not available"}
//               </p>
//               <div className="flex flex-wrap gap-3 mt-3 justify-center md:justify-start">
//                 <Badge
//                   variant="secondary"
//                   className="bg-slate-100 text-slate-600 border-slate-200 gap-1.5"
//                 >
//                   <User className="w-3 h-3" /> {profile?.MobileNo}
//                 </Badge>
//                 <Badge
//                   variant="secondary"
//                   className="bg-slate-100 text-slate-600 border-slate-200 gap-1.5"
//                 >
//                   <Calendar className="w-3 h-3" /> {profile?.DOB}
//                 </Badge>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* 2. SERVICES GRID */}
//       <div>
//         <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
//           <LayoutDashboardIcon className="w-5 h-5 text-orange-500" /> Services
//         </h3>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
//           {menuItems.map((item, idx) => (
//             <Link key={idx} href={item.href} className="group">
//               <Card className="h-full border-slate-200 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center min-h-[110px]">
//                 <div
//                   className={`p-2.5 rounded-full ${item.bg} ${item.color} mb-2 group-hover:scale-110 transition-transform`}
//                 >
//                   <item.icon className="w-5 h-5" />
//                 </div>
//                 <span className="text-[11px] font-bold text-slate-600 group-hover:text-slate-900 uppercase tracking-wide">
//                   {item.label}
//                 </span>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* 3. DASHBOARD WIDGETS */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Column: Active Policies */}
//         <div className="lg:col-span-2 space-y-6">
//           <div className="flex justify-between items-center px-1">
//             <div className="flex items-center gap-3">
//               <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
//                 <Shield className="w-5 h-5 text-blue-600" /> Active Policies
//               </h3>
//               <Badge className="bg-slate-900 text-white hover:bg-slate-800">
//                 {totalPolicies}
//               </Badge>
//             </div>
//             <Link
//               href="/policyholder/policies"
//               className="text-sm font-bold text-orange-600 hover:underline flex items-center gap-1"
//             >
//               View All <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             {sortedPolicies?.slice(0, 4).map((policy) => (
//               <PolicyCard key={policy.FPRId} policy={policy} />
//             ))}
//             {(!policies || policies.length === 0) && (
//               <div className="col-span-full p-8 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
//                 No active policies found.
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Column: Financials & Next Due */}
//         <div className="space-y-8">
//           {/* Next Premium Due Card (Dynamic Data) */}
//           <Card className="border-orange-200 bg-linear-to-br from-white to-orange-50 shadow-sm p-6 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full -mr-10 -mt-10 blur-2xl" />
//             <div className="relative z-10">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-2">
//                   <div className="p-1.5 bg-white rounded-md text-orange-600 shadow-sm border border-orange-100">
//                     <AlertCircle className="w-4 h-4" />
//                   </div>
//                   <span className="text-xs font-extrabold text-orange-700 uppercase tracking-wider">
//                     Payment Due
//                   </span>
//                 </div>
//                 {nextPremium && (
//                   <Badge
//                     variant="outline"
//                     className="bg-white text-orange-600 border-orange-200 text-[10px] animate-pulse"
//                   >
//                     Action Needed
//                   </Badge>
//                 )}
//               </div>

//               {nextPremium ? (
//                 <div>
//                   <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
//                     Policy
//                   </p>
//                   <p
//                     className="text-sm font-bold text-slate-800 line-clamp-1"
//                     title={nextPremium.Category}
//                   >
//                     {nextPremium.Category}
//                   </p>
//                   <p className="text-[10px] text-slate-500 font-mono mb-4">
//                     #{nextPremium.PolicyNumber}
//                   </p>

//                   <div className="flex justify-between items-end border-t border-orange-200/50 pt-3 mt-2">
//                     <div>
//                       <p className="text-[10px] text-slate-500 font-medium mb-0.5">
//                         Due Date
//                       </p>
//                       <p className="text-sm font-bold text-slate-900">
//                         {nextPremium.DueDate}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-[10px] text-slate-500 font-medium mb-0.5">
//                         Amount
//                       </p>
//                       <p className="text-xl font-extrabold text-slate-900">
//                         ৳ {nextPremium.PremiumAmount.toLocaleString()}
//                       </p>
//                     </div>
//                   </div>

//                   <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-md shadow-orange-500/20">
//                     Pay Now
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="py-4 text-center">
//                   <p className="text-sm font-bold text-slate-600">
//                     All caught up!
//                   </p>
//                   <p className="text-xs text-slate-400 mt-1">
//                     No pending payments.
//                   </p>
//                 </div>
//               )}
//             </div>
//           </Card>

//           {/* Financial Overview List (Dynamic Calculation) */}
//           <Card className="border-slate-100 shadow-sm bg-white">
//             <CardHeader className="pb-3 border-b border-slate-50 px-5 pt-5">
//               <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
//                 <Activity className="w-4 h-4" /> Financial Summary
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-0">
//               <div className="flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
//                     <Shield className="w-4 h-4" />
//                   </div>
//                   <div>
//                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
//                       Sum Assured
//                     </p>
//                     <p className="text-[10px] text-slate-400">Life Coverage</p>
//                   </div>
//                 </div>
//                 <span className="text-sm font-extrabold text-slate-900">
//                   ৳ {totalSumAssured.toLocaleString()}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-green-50 text-green-600 rounded-lg">
//                     <PiggyBank className="w-4 h-4" />
//                   </div>
//                   <div>
//                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
//                       Total Paid
//                     </p>
//                     <p className="text-[10px] text-slate-400">Premiums</p>
//                   </div>
//                 </div>
//                 <span className="text-sm font-extrabold text-slate-900">
//                   ৳ {totalPremiumValue.toLocaleString()}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
//                     <TrendingUp className="w-4 h-4" />
//                   </div>
//                   <div>
//                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
//                       Bonus
//                     </p>
//                     <p className="text-[10px] text-slate-400">Accumulated</p>
//                   </div>
//                 </div>
//                 <span className="text-sm font-extrabold text-green-600">
//                   + ৳ {totalBonus.toLocaleString()}
//                 </span>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  Shield,
  TrendingUp,
  FileText,
  CreditCard,
  Calendar,
  AlertCircle,
  User,
  ArrowRight,
  Users,
  FileClock,
  Banknote,
  ScrollText,
  PlusCircle,
  LayoutDashboardIcon,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePersonalDetails } from "@/hooks/use-personal-details";
import {
  usePolicies,
  PolicyData,
  usePolicyStatus,
} from "@/hooks/use-policy-data";
// import { usePolicyStatus } from "@/hooks/use-policy-status";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PolicyCard from "@/components/dashboard/PolicyCard";
import DashboardServiceGrid from "@/components/dashboard/DashboardServiceGrid";

// // --- Enhanced Policy Card Component ---
// function PolicyCard({ policy }: { policy: PolicyData }) {
//   const { data: details, isLoading } = usePolicyStatus(policy.FPRId);
//   const isActive = details?.Status === "Active";
//   const mobileNumber = details?.MobileNo;

//   console.log("check policy status details", details, mobileNumber);

//   return (
//     <div className="group bg-white rounded-2xl border border-slate-100 hover:border-orange-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col relative">
//       {/* Soft Header Background */}
//       <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-cyan-500 opacity-80" />

//       <div className="p-5 pb-0 pt-6">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex gap-3 items-center">
//             <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100/50 shadow-sm">
//               <Shield className="w-5 h-5" />
//             </div>
//             <div>
//               <h4 className="font-bold text-slate-900 text-sm leading-tight group-hover:text-orange-600 transition-colors line-clamp-1">
//                 {policy.Category || "Insurance Plan"}
//               </h4>
//               <p className="text-[11px] text-slate-500 font-mono mt-0.5 bg-slate-50 px-1.5 py-0.5 rounded w-fit">
//                 {policy.PolicyNumber}
//               </p>
//             </div>
//           </div>
//           {isLoading ? (
//             <Skeleton className="h-5 w-16 rounded-full" />
//           ) : (
//             <Badge
//               className={`px-2 py-0.5 h-5 text-[10px] font-bold uppercase border shadow-none ${
//                 isActive
//                   ? "bg-green-50 text-green-700 border-green-100"
//                   : "bg-red-50 text-red-700 border-red-100"
//               }`}
//             >
//               {isActive ? "Active" : details?.Status}
//             </Badge>
//           )}
//         </div>

//         {/* Metrics Grid - Cleaner Layout */}
//         <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-50">
//           <div>
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
//               Premium Amount
//             </p>
//             <p className="text-lg font-extrabold text-slate-900">
//               ৳ {policy.PremiumAmount.toLocaleString()}
//             </p>
//           </div>
//           <div className="text-right">
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
//               Next Due
//             </p>
//             <p className="text-sm font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md inline-block">
//               {policy.DueDate}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Footer Actions - Simplified & Cool */}
//       <div className="mt-auto p-4 bg-slate-50/50 border-t border-slate-100 flex items-center gap-3">
//         <Link
//           href={`/policyholder/policies/${policy.FPRId}`}
//           className="flex-1"
//         >
//           <Button
//             variant="ghost"
//             size="sm"
//             className="w-full text-xs font-bold text-slate-700 bg-slate-300 hover:text-white hover:bg-slate-500 border border-transparent hover:border-slate-200 transition-all"
//           >
//             View Details
//           </Button>
//         </Link>
//         <Button
//           size="sm"
//           className="flex-1 bg-orange-300 hover:bg-orange-500 text-white text-xs font-bold shadow-sm h-9 transition-all"
//         >
//           Pay Premium
//         </Button>
//       </div>
//     </div>
//   );
// }

export default function PolicyholderDashboard() {
  const {
    data: profile,
    isLoading: profileLoading,
    isError: profileError,
  } = usePersonalDetails();
  const { data: policies, isLoading: policiesLoading } = usePolicies();

  const isLoading = profileLoading || policiesLoading;

  // 1. Sort Policies by Due Date (Dynamic Logic)
  const sortedPolicies = policies
    ? [...policies].sort((a, b) => {
        // Convert "DD MMM YYYY" to Date object for sorting
        const dateA = new Date(a.DueDate);
        const dateB = new Date(b.DueDate);
        return dateA.getTime() - dateB.getTime();
      })
    : [];

  // Find the most urgent payment (first in sorted list)
  const nextPremium = sortedPolicies.length > 0 ? sortedPolicies[0] : null;

  const totalPolicies = policies?.length || 0;

  // Service Grid
  const menuItems = [
    {
      label: "Nominee Info",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      href: "/policyholder/nominee",
    },
    {
      label: "Policy Schedule",
      icon: Calendar,
      color: "text-purple-600",
      bg: "bg-purple-50",
      href: "/policyholder/schedule",
    },
    {
      label: "Payment History",
      icon: FileClock,
      color: "text-green-600",
      bg: "bg-green-50",
      href: "/policyholder/history",
    },
    {
      label: "Maturity Details",
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-50",
      href: "/policyholder/maturity",
    },
    {
      label: "Customer Loan",
      icon: Banknote,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      href: "/policyholder/loan",
    },
    {
      label: "Benefits",
      icon: ScrollText,
      color: "text-pink-600",
      bg: "bg-pink-50",
      href: "/policyholder/benefits",
    },
    {
      label: "Supp. Claim",
      icon: PlusCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      href: "/policyholder/claim-apply",
    },
  ];

  if (isLoading)
    return (
      <div className="p-8 flex justify-center">
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    );

  if (profileError) {
    return (
      <div className="p-8 text-center bg-red-50 text-red-600 rounded-2xl border border-red-100">
        <p className="font-bold">Failed to load profile data.</p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="mt-4 bg-white"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* 1. HEADER & PROFILE */}
      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <div className="bg-linear-to-r from-orange-500 to-amber-500 h-24 md:h-32 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        </div>

        <CardContent className="px-6 md:px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-12">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-lg">
              <AvatarImage
                src={profile?.ApplicantPPName}
                alt={profile?.ApplicantNameEng}
                className="object-cover"
              />
              <AvatarFallback className="bg-orange-100 text-orange-600 text-3xl font-bold">
                {profile?.ApplicantNameEng?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left mb-2">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                {profile?.ApplicantNameEng || "Valued Client"}
              </h1>
              <p className="text-slate-500 text-sm max-w-xl mx-auto md:mx-0 mt-1 line-clamp-1">
                {profile?.PresentAddress || "Address not available"}
              </p>
              <div className="flex flex-wrap gap-3 mt-3 justify-center md:justify-start">
                <Badge
                  variant="secondary"
                  className="bg-slate-100 text-slate-600 border-slate-200 gap-1.5"
                >
                  <User className="w-3 h-3" /> {profile?.MobileNo}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-slate-100 text-slate-600 border-slate-200 gap-1.5"
                >
                  <Calendar className="w-3 h-3" /> {profile?.DOB}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Dashboard SERVICES GRID */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 ">
          <LayoutDashboardIcon className="w-5 h-5 text-orange-500" /> Services
        </h3>

        <DashboardServiceGrid />
      </div>

      {/* 3. DASHBOARD WIDGETS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10 items-center">
        {/* Left Column: total Policies */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" /> Total Policies
              </h3>
              <Badge className="bg-orange-400 text-white hover:bg-slate-800">
                {totalPolicies}
              </Badge>
            </div>
            <Link
              href="/policyholder/policies"
              className="text-sm font-bold text-orange-600 hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedPolicies?.slice(0, 4).map((policy) => (
              <PolicyCard key={policy.FPRId} policy={policy} />
            ))}
            {(!policies || policies.length === 0) && (
              <div className="col-span-full p-8 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                No active policies found.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Next Due Card (Financial Summary REMOVED) */}
        <div className="space-y-6">
          {/* Next Premium Due Card */}
          {/* <Card className="border-orange-200 bg-linear-to-br from-white to-orange-50 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full -mr-10 -mt-10 blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white rounded-md text-orange-600 shadow-sm border border-orange-100">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-extrabold text-orange-700 uppercase tracking-wider">
                    Payment Due
                  </span>
                </div>
                {nextPremium && (
                  <Badge
                    variant="outline"
                    className="bg-white text-orange-600 border-orange-200 text-[10px] animate-pulse"
                  >
                    Action Needed
                  </Badge>
                )}
              </div>

              {nextPremium ? (
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Policy
                  </p>
                  <p
                    className="text-sm font-bold text-slate-800 line-clamp-1"
                    title={nextPremium.Category}
                  >
                    {nextPremium.Category}
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono mb-4">
                    #{nextPremium.PolicyNumber}
                  </p>

                  <div className="flex justify-between items-end border-t border-orange-200/50 pt-3 mt-2">
                    <div>
                      <p className="text-[10px] text-slate-500 font-medium mb-0.5">
                        Due Date
                      </p>
                      <p className="text-sm font-bold text-slate-900">
                        {nextPremium.DueDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 font-medium mb-0.5">
                        Amount
                      </p>
                      <p className="text-xl font-extrabold text-slate-900">
                        ৳ {nextPremium.PremiumAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>

               
                  <Link href="">
                    <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-md shadow-orange-500/20">
                      Pay Now
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="py-4 text-center">
                  <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-bold text-slate-600">
                    All caught up!
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    No pending payments.
                  </p>
                </div>
              )}
            </div>
          </Card> */}

          {/* Support Card (Replaced Financial Summary) */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-2">Need Help?</h4>
              <p className="text-sm text-slate-400 mb-4">
                Contact our support for any queries regarding your policy.
              </p>
              <div className="flex gap-2">
                {/* <Button
                  variant="outline"
                  className="flex-1 bg-transparent border-slate-700 text-white hover:bg-slate-800 hover:text-white"
                >
                  Chat
                </Button> */}
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                  Call 09678-200004
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
