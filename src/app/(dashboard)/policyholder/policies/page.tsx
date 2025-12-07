// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//   Shield,
//   Search,
//   Filter,
//   ArrowUpRight,
//   Download,
//   MoreHorizontal,
//   FileText,
//   CheckCircle2,
//   XCircle,
//   Clock,
//   AlertTriangle,
//   LayoutGrid,
//   List as ListIcon,
//   Wallet,
//   PieChart,
//   TrendingUp,
// } from "lucide-react";
// import { usePolicies, PolicyData } from "@/hooks/use-policy-data";
// import { usePolicyStatus } from "@/hooks/use-policy-status";

// // Shadcn Components
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// // --- Premium Policy Card ---
// function PolicyListCard({ policy }: { policy: PolicyData }) {
//   const { data: details, isLoading } = usePolicyStatus(policy.FPRId);
//   const status = details?.Status?.trim() || "Unknown";

//   // Status Logic
//   const isActive =
//     status.toLowerCase() === "active" || status.toLowerCase() === "inforce";
//   // Check for lapsed/defaulter status based on API text
//   const isLapsed = !isActive && status !== "Unknown";

//   // Color Logic
//   const statusColor = isActive
//     ? "bg-orange-500"
//     : isLapsed
//     ? "bg-red-500"
//     : "bg-slate-300";
//   const statusBg = isActive
//     ? "bg-green-50 text-green-700"
//     : isLapsed
//     ? "bg-red-50 text-red-700"
//     : "bg-slate-100 text-slate-600";

//   return (
//     <div className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
//       {/* Status Strip */}
//       <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${statusColor}`} />

//       <div className="p-6 pl-8 flex-1">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-6">
//           <div className="flex gap-4 items-center">
//             <div
//               className={`w-12 h-12 rounded-2xl flex items-center justify-center text-slate-500 transition-colors border border-slate-100 group-hover:scale-110 duration-300 ${
//                 isActive
//                   ? "bg-orange-50 text-orange-600 border-orange-100"
//                   : "bg-slate-50"
//               }`}
//             >
//               {isLapsed ? (
//                 <AlertTriangle className="w-6 h-6" />
//               ) : (
//                 <Shield className="w-6 h-6" />
//               )}
//             </div>
//             <div>
//               <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-orange-600 transition-colors line-clamp-1">
//                 {policy.Category || "Insurance Plan"}
//               </h3>
//               <p className="text-xs text-slate-500 font-mono mt-0.5 bg-slate-50 px-2 py-0.5 rounded-md w-fit">
//                 {policy.PolicyNumber}
//               </p>
//             </div>
//           </div>

//           {isLoading ? (
//             <Skeleton className="h-6 w-20 rounded-full" />
//           ) : (
//             <Badge
//               variant="outline"
//               className={`border-0 font-bold px-3 py-1 ${statusBg}`}
//             >
//               {isActive && (
//                 <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-2 animate-pulse" />
//               )}
//               {status}
//             </Badge>
//           )}
//         </div>

//         {/* Details Grid */}
//         <div className="grid grid-cols-2 gap-6 py-4 border-t border-dashed border-slate-100">
//           <div>
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
//               Premium
//             </p>
//             <p className="text-lg font-extrabold text-slate-900">
//               ৳ {policy.PremiumAmount.toLocaleString()}
//             </p>
//           </div>

//           <div className="text-right">
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
//               Next Due
//             </p>
//             <p className="text-sm font-bold text-orange-600">
//               {policy.DueDate}
//             </p>
//           </div>

//           <div>
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
//               Paid
//             </p>
//             <p className="text-sm font-bold text-slate-700">
//               {policy.Installments} Inst.
//             </p>
//           </div>

//           {/* payment button */}
//           <div className="text-right">
//             <Link href={``}>
//               <Button
//                 size="sm"
//                 variant="outline"
//                 className="h-8 text-xs font-bold  border-orange-200 hover:bg-orange-200 hover:text-orange-600 transition-colors"
//               >
//                 Make Payment
//               </Button>
//             </Link>
//           </div>

//           {/* Only show Sum Assured if API provides it (No Mock Data) */}
//           {policy.SumAssured && (
//             <div className="text-right">
//               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
//                 Sum Assured
//               </p>
//               <p className="text-sm font-bold text-slate-700">
//                 ৳ {policy.SumAssured.toLocaleString()}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Actions Footer */}
//       <div className="bg-slate-50/80 px-6 py-3 border-t border-slate-100 flex justify-between items-center">
//         <div className="flex gap-4 text-xs font-medium text-slate-500">
//           <span className="flex items-center gap-1">
//             <Clock className="w-3.5 h-3.5 text-orange-400" /> Monthly
//           </span>
//         </div>

//         <div className="flex gap-2">
//           <Link href={`/policyholder/policies/${policy.FPRId}`}>
//             <Button
//               size="sm"
//               variant="outline"
//               className="h-8 text-xs font-bold border-slate-200 hover:bg-white hover:text-orange-600 transition-colors"
//             >
//               View Details
//             </Button>
//           </Link>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 size="icon"
//                 variant="ghost"
//                 className="h-8 w-8 rounded-full hover:bg-white"
//               >
//                 <MoreHorizontal className="w-4 h-4 text-slate-500" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem className="cursor-pointer">
//                 <Download className="w-4 h-4 mr-2 text-slate-400" /> Receipt
//               </DropdownMenuItem>
//               <DropdownMenuItem className="cursor-pointer text-orange-600 focus:text-orange-700 focus:bg-orange-50">
//                 <FileText className="w-4 h-4 mr-2" /> Pay Premium
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function MyPoliciesPage() {
//   const { data: policies, isLoading } = usePolicies();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("all");

//   // Logic for Stats (Real Data)
//   const totalPolicies = policies?.length || 0;
//   const totalPremium =
//     policies?.reduce((acc, p) => acc + (p.PremiumAmount || 0), 0) || 0;

//   // Logic for Filtering
//   const filteredPolicies =
//     policies?.filter((p) => {
//       // 1. Search Filter
//       const matchesSearch =
//         p.PolicyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         p.Category.toLowerCase().includes(searchTerm.toLowerCase());

//       // 2. Tab Filters
//       if (filter === "due") {
//         // Check if due date is passed or within next 30 days
//         const dueDate = new Date(p.DueDate);
//         const today = new Date();
//         const diffTime = dueDate.getTime() - today.getTime();
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//         return matchesSearch && diffDays <= 30;
//       }

//       // Note: 'Active' and 'Lapsed' status logic usually requires fetching detailed status.
//       // For now, 'all' shows everything to ensure data visibility.

//       return matchesSearch;
//     }) || [];

//   return (
//     <div className="space-y-8 animate-in fade-in duration-500 pb-20">
//       {/* 1. PORTFOLIO HEADER (Orange Vibe) */}
//       <div className="bg-linear-to-br from-orange-500 to-amber-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-orange-200">
//         {/* Background Art */}
//         <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-700/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

//         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
//           <div>
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
//               <Shield className="w-3 h-3" /> My Portfolio
//             </div>
//             <h1 className="text-3xl font-extrabold mb-2">All Policies</h1>
//             <p className="text-orange-50 max-w-md text-sm leading-relaxed opacity-90">
//               Track your insurance plans, premium payments, and coverage details
//               in one place.
//             </p>
//           </div>

//           <div className="flex gap-8 border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-0 md:pl-8">
//             <div className="text-right">
//               <p className="text-[10px] font-bold text-orange-100 uppercase tracking-widest mb-1">
//                 Total Policies
//               </p>
//               <p className="text-3xl font-extrabold">
//                 {totalPolicies.toString().padStart(2, "0")}
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="text-[10px] font-bold text-orange-100 uppercase tracking-widest mb-1">
//                 Total Premium
//               </p>
//               <p className="text-3xl font-extrabold">
//                 ৳ {totalPremium.toLocaleString()}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 2. CONTROLS & LIST */}
//       <div className="space-y-6">
//         {/* Toolbar */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 sticky top-20 z-20 bg-slate-50/90 backdrop-blur-sm py-2">
//           {/* Tabs */}
//           <Tabs
//             defaultValue="all"
//             className="w-full md:w-auto"
//             onValueChange={setFilter}
//           >
//             <TabsList className="bg-white border border-slate-200 rounded-xl h-12 p-1 shadow-sm">
//               <TabsTrigger
//                 value="all"
//                 className="rounded-lg text-xs font-bold px-6 h-10 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
//               >
//                 All Policies
//               </TabsTrigger>
//               <TabsTrigger
//                 value="active"
//                 className="rounded-lg text-xs font-bold px-6 h-10 data-[state=active]:bg-green-600 data-[state=active]:text-white"
//               >
//                 Active
//               </TabsTrigger>
//               <TabsTrigger
//                 value="due"
//                 className="rounded-lg text-xs font-bold px-6 h-10 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
//               >
//                 Due Policies
//               </TabsTrigger>
//             </TabsList>
//           </Tabs>

//           {/* Search */}
//           <div className="relative w-full md:w-72 group">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
//             <Input
//               placeholder="Find policy by number..."
//               className="pl-10 bg-white border-slate-200 h-12 rounded-xl focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-all shadow-sm"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Policies Grid */}
//         {isLoading ? (
//           <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {[1, 2, 3].map((i) => (
//               <Skeleton key={i} className="h-64 w-full rounded-2xl" />
//             ))}
//           </div>
//         ) : filteredPolicies.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredPolicies.map((policy) => (
//               <PolicyListCard key={policy.FPRId} policy={policy} />
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
//             <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
//               <Search className="w-8 h-8 text-orange-300" />
//             </div>
//             <h3 className="text-slate-900 font-bold text-lg">
//               No policies found
//             </h3>
//             <p className="text-slate-500 text-sm mt-1">
//               Try adjusting your filters or search terms.
//             </p>
//             <Button
//               variant="link"
//               onClick={() => setSearchTerm("")}
//               className="mt-2 text-orange-600 font-bold"
//             >
//               Clear Search
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Search,
  Filter,
  ArrowUpRight,
  Download,
  MoreHorizontal,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  LayoutGrid,
  List as ListIcon,
  Wallet,
  PieChart,
  TrendingUp,
} from "lucide-react";

// Import unified hooks
import {
  usePolicies,
  PolicyData,
  usePolicyStatus,
} from "@/hooks/use-policy-data";

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Sub-Component: Smart Policy Card ---
// This card fetches its own status and decides whether to show itself based on the filter
function PolicyListCard({
  policy,
  filter,
}: {
  policy: PolicyData;
  filter: string;
}) {
  const { data: details, isLoading } = usePolicyStatus(policy.FPRId);

  const statusText = details?.Status?.trim() || "Unknown";

  // Normalize Status Logic
  const isActive =
    statusText.toLowerCase() === "active" ||
    statusText.toLowerCase() === "inforce";
  const isDefaulter =
    statusText.toLowerCase() === "defaulter" ||
    statusText.toLowerCase() === "lapsed";

  // --- SMART FILTERING ---
  // If data is loaded AND filter is active/defaulter AND it doesn't match -> Hide Card
  if (!isLoading) {
    if (filter === "active" && !isActive) return null;
    if (filter === "defaulter" && !isDefaulter) return null;
  }

  // Visual Styles
  const statusColor = isActive
    ? "bg-orange-500"
    : isDefaulter
    ? "bg-red-500"
    : "bg-slate-300";
  const statusBadgeBg = isActive
    ? "bg-green-50 text-green-700 border-green-100"
    : isDefaulter
    ? "bg-red-50 text-red-700 border-red-100"
    : "bg-slate-100 text-slate-600";

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Status Strip */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${statusColor}`} />

      <div className="p-6 pl-8 flex-1">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4 items-center">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-slate-500 transition-colors border border-slate-100 group-hover:scale-110 duration-300 ${
                isActive
                  ? "bg-orange-50 text-orange-600 border-orange-100"
                  : "bg-slate-50"
              }`}
            >
              {isDefaulter ? (
                <AlertTriangle className="w-6 h-6" />
              ) : (
                <Shield className="w-6 h-6" />
              )}
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-orange-600 transition-colors line-clamp-1">
                {policy.Category || "Insurance Plan"}
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5 bg-slate-50 px-2 py-0.5 rounded-md w-fit border border-slate-100">
                {policy.PolicyNumber}
              </p>
            </div>
          </div>

          {isLoading ? (
            <Skeleton className="h-6 w-24 rounded-full" />
          ) : (
            <Badge
              variant="outline"
              className={`border-0 font-bold px-3 py-1 ${statusBadgeBg}`}
            >
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-2 animate-pulse" />
              )}
              {statusText}
            </Badge>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-6 py-4 border-t border-dashed border-slate-100">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Premium
            </p>
            <p className="text-lg font-extrabold text-slate-900">
              ৳ {policy.PremiumAmount.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Next Due
            </p>
            <p className="text-sm font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md inline-block border border-orange-100">
              {policy.DueDate}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Paid
            </p>
            <p className="text-sm font-bold text-slate-700">
              {policy.Installments} Inst.
            </p>
          </div>

          {/* Mobile Number Display */}
          <div className="text-right">
            <Link href={`/policyholder/payments?policyId=${policy.FPRId}`}>
              <Button className="  bg-orange-300 hover:bg-orange-400  hover:text-white">
                Pay Premium
              </Button>
            </Link>

            {/* <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Agent
            </p>
            {isLoading ? (
              <Skeleton className="h-4 w-16 ml-auto" />
            ) : (
              <p className="text-xs font-bold text-slate-700 truncate max-w-[100px] ml-auto">
                {details?.AgentName || "N/A"}
              </p>
            )} */}
          </div>
        </div>
      </div>

      {/* Actions Footer */}
      <div className="bg-slate-50/80 px-6 py-3 border-t border-slate-100 flex justify-between items-center">
        <div className="flex gap-4 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-orange-400" /> Monthly
          </span>
        </div>

        <div className="flex gap-2">
          <Link href={`/policyholder/policies/${policy.FPRId}`}>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs font-bold border-slate-200 hover:bg-white hover:text-orange-600 transition-colors"
            >
              View Details
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full hover:bg-white"
              >
                <MoreHorizontal className="w-4 h-4 text-slate-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                <Download className="w-4 h-4 mr-2 text-slate-400" /> Receipt
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-orange-600 focus:text-orange-700 focus:bg-orange-50">
                <FileText className="w-4 h-4 mr-2" /> Pay Premium
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default function MyPoliciesPage() {
  const { data: policies, isLoading } = usePolicies();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'defaulter'

  // Logic for Stats (Real Data)
  const totalPolicies = policies?.length || 0;
  const totalPremium =
    policies?.reduce((acc, p) => acc + (p.PremiumAmount || 0), 0) || 0;

  // 1. Search Filter Logic
  const filteredPolicies =
    policies?.filter(
      (p) =>
        p.PolicyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.Category.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* 1. HEADER (Premium Orange Vibe) */}
      <div className="bg-linear-to-br from-orange-500 to-amber-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-orange-200">
        {/* Background Art */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-700/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
              <Shield className="w-3 h-3" /> My Portfolio
            </div>
            <h1 className="text-3xl font-extrabold mb-2">All Policies</h1>
            <p className="text-orange-50 max-w-md text-sm leading-relaxed opacity-90">
              Track and manage your complete insurance portfolio, check status,
              and make payments.
            </p>
          </div>

          <div className="flex gap-8 border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-0 md:pl-8">
            <div className="text-right">
              <p className="text-[10px] font-bold text-orange-100 uppercase tracking-widest mb-1">
                Total Policies
              </p>
              <p className="text-3xl font-extrabold">
                {totalPolicies.toString().padStart(2, "0")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-orange-100 uppercase tracking-widest mb-1">
                Total Premium
              </p>
              <p className="text-3xl font-extrabold">
                ৳ {totalPremium.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CONTROLS & LIST */}
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 sticky top-20 z-20 bg-slate-50/90 backdrop-blur-sm py-2">
          {/* Tabs (Active vs Defaulter) */}
          <Tabs
            defaultValue="all"
            className="w-full md:w-auto"
            onValueChange={setFilter}
          >
            <TabsList className="bg-white border border-slate-200 rounded-xl h-12 p-1 shadow-sm">
              <TabsTrigger
                value="all"
                className="rounded-lg text-xs font-bold px-6 h-10 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="rounded-lg text-xs font-bold px-6 h-10 data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="defaulter"
                className="rounded-lg text-xs font-bold px-6 h-10 data-[state=active]:bg-red-500 data-[state=active]:text-white"
              >
                Defaulter
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search */}
          <div className="relative w-full md:w-72 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
            <Input
              placeholder="Find policy by number..."
              className="pl-10 bg-white border-slate-200 h-12 rounded-xl focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Policies Grid */}
        {isLoading ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        ) : filteredPolicies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPolicies.map((policy) => (
              // Pass the filter state to the card so it can decide visibility
              <PolicyListCard
                key={policy.FPRId}
                policy={policy}
                filter={filter}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-orange-300" />
            </div>
            <h3 className="text-slate-900 font-bold text-lg">
              No policies found
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              We couldn't find any policies matching your search.
            </p>
            <Button
              variant="link"
              onClick={() => setSearchTerm("")}
              className="mt-2 text-orange-600 font-bold"
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
