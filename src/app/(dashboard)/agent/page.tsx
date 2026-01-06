// "use client";

// import { useState } from "react";
// import {
//   Users,
//   DollarSign,
//   TrendingUp,
//   Target,
//   Briefcase,
//   Building2,
//   Phone,
//   Calendar,
//   CreditCard,
//   User,
//   FileText,
//   AlertCircle,
//   PieChart,
//   Wallet,
//   ShieldCheck,
//   XCircle,
//   Activity,
// } from "lucide-react";
// import { usePersonalDetails, AgentDetails } from "@/hooks/use-personal-details";
// import { useAgentSummary, AgentSummaryItem } from "@/hooks/use-agent-data";

// // Shadcn Components
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// // Helper to find specific summary type from API response
// const getSummary = (
//   data: AgentSummaryItem[] | undefined | null,
//   type: string
// ) => data?.find((item) => item.PayType === type);

// // --- SUB-COMPONENT: Summary Card ---
// function SummaryCard({ item }: { item: AgentSummaryItem }) {
//   // Determine color theme based on PayType or Performance
//   const isGoodPerformance = item.Percentage >= 80;

//   let icon = Activity;
//   let colorClass = "text-blue-600 bg-blue-50";

//   if (item.PayType.includes("First Year")) {
//     icon = User;
//     colorClass = "text-green-600 bg-green-50";
//   } else if (item.PayType.includes("Renewal")) {
//     icon = RefreshCcw;
//     colorClass = "text-purple-600 bg-purple-50";
//   } else if (item.PayType.includes("Deferred")) {
//     icon = AlertCircle;
//     colorClass = "text-orange-600 bg-orange-50";
//   } else if (item.PayType.includes("PR")) {
//     icon = FileText;
//     colorClass = "text-pink-600 bg-pink-50";
//   }

//   return (
//     <Card className="border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
//       {/* Top Accent Line */}
//       <div
//         className={`absolute top-0 left-0 w-full h-1 ${
//           isGoodPerformance ? "bg-green-500" : "bg-orange-500"
//         }`}
//       />

//       <CardContent className="p-6">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex items-center gap-3">
//             <div className={`p-2.5 rounded-xl ${colorClass}`}>
//               <icon className="w-5 h-5" />
//             </div>
//             <div>
//               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
//                 {item.PayType}
//               </p>
//               <h3 className="text-lg font-extrabold text-slate-900">
//                 ৳ {item.TotalPremium.toLocaleString()}
//               </h3>
//             </div>
//           </div>
//           {item.Percentage > 0 && (
//             <Badge
//               variant="outline"
//               className={`border-0 font-bold ${
//                 isGoodPerformance
//                   ? "bg-green-100 text-green-700"
//                   : "bg-orange-100 text-orange-700"
//               }`}
//             >
//               {item.Percentage.toFixed(1)}%
//             </Badge>
//           )}
//         </div>

//         {/* Details Grid */}
//         <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm border-t border-slate-50 pt-4">
//           <div>
//             <p className="text-[10px] text-slate-400 font-bold uppercase">
//               Total Qty
//             </p>
//             <p className="font-bold text-slate-700">{item.TotalQty}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-[10px] text-slate-400 font-bold uppercase">
//               Due Qty
//             </p>
//             <p className="font-bold text-orange-600">{item.DueQty}</p>
//           </div>

//           {item.LapseAmount > 0 && (
//             <div className="col-span-2 bg-red-50 rounded-lg p-2 flex justify-between items-center mt-1 border border-red-100">
//               <div className="flex items-center gap-1.5">
//                 <XCircle className="w-3.5 h-3.5 text-red-500" />
//                 <span className="text-xs font-bold text-red-700">Lapse</span>
//               </div>
//               <div className="text-right">
//                 <span className="text-xs font-bold text-red-700 block">
//                   ৳ {item.LapseAmount.toLocaleString()}
//                 </span>
//                 <span className="text-[10px] text-red-500 block">
//                   {item.LapseQty} Policies
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function RefreshCcw(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
//       <path d="M3 3v5h5" />
//       <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
//       <path d="M16 16h5v5" />
//     </svg>
//   );
// }

// // --- SUB-COMPONENT: Business Stats ---
// function BusinessStats({
//   filterType,
//   setFilterType,
// }: {
//   filterType: string;
//   setFilterType: (val: string) => void;
// }) {
//   const { data: summaryData, isLoading } = useAgentSummary(filterType);

//   return (
//     <div className="space-y-6">
//       {/* Filter Tabs */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
//           <Briefcase className="w-5 h-5 text-blue-600" /> Business Summary
//         </h3>
//         <Tabs
//           value={filterType}
//           onValueChange={setFilterType}
//           className="w-full sm:w-auto"
//         >
//           <TabsList className="bg-white border border-slate-200 h-10 p-1 w-full sm:w-auto grid grid-cols-4 sm:flex">
//             <TabsTrigger
//               value="Month"
//               className="text-xs px-3 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
//             >
//               Month
//             </TabsTrigger>
//             <TabsTrigger
//               value="Quater"
//               className="text-xs px-3 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
//             >
//               Quarter
//             </TabsTrigger>
//             <TabsTrigger
//               value="Year"
//               className="text-xs px-3 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
//             >
//               Year
//             </TabsTrigger>
//             <TabsTrigger
//               value="Last Two Years"
//               className="text-xs px-3 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
//             >
//               2 Years
//             </TabsTrigger>
//           </TabsList>
//         </Tabs>
//       </div>

//       {/* Summary Grid */}
//       {isLoading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[1, 2, 3, 4].map((i) => (
//             <Skeleton key={i} className="h-48 w-full rounded-2xl" />
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {summaryData && summaryData.length > 0 ? (
//             summaryData.map((item, index) => (
//               <SummaryCard key={index} item={item} />
//             ))
//           ) : (
//             <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
//               <p className="text-slate-400 font-medium">
//                 No business data found for this period.
//               </p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// // --- MAIN PAGE ---
// export default function AgentDashboard() {
//   const {
//     data: profileData,
//     isLoading: profileLoading,
//     isError,
//   } = usePersonalDetails();
//   const profile = profileData as AgentDetails;

//   // Lifted state for filters
//   const [filterType, setFilterType] = useState("Month");

//   if (profileLoading)
//     return (
//       <div className="p-8">
//         <Skeleton className="h-64 w-full rounded-4xl" />
//       </div>
//     );

//   if (isError)
//     return (
//       <div className="p-8 text-center bg-red-50 text-red-600 rounded-2xl border border-red-100">
//         <p className="font-bold">Failed to load profile.</p>
//         <Button
//           variant="outline"
//           onClick={() => window.location.reload()}
//           className="mt-4 bg-white border-red-200 text-red-600"
//         >
//           Retry
//         </Button>
//       </div>
//     );

//   return (
//     <div className="space-y-10 animate-in fade-in duration-500 pb-20">
//       {/* 1. AGENT PROFILE HEADER (First Priority) */}
//       <Card className="border-none shadow-sm bg-white overflow-hidden rounded-4xl">
//         <div className="bg-linear-to-r from-blue-600 to-indigo-600 h-32 relative">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
//         </div>

//         <CardContent className="px-6 md:px-8 pb-8 relative">
//           <div className="flex flex-col md:flex-row items-center md:items-end gap-8 -mt-16">
//             <Avatar className="w-32 h-32 border-4 border-white shadow-xl bg-white">
//               <AvatarImage
//                 src={profile?.AgentImage}
//                 alt={profile?.AgentName}
//                 className="object-cover"
//               />
//               <AvatarFallback className="bg-blue-100 text-blue-600 text-4xl font-bold">
//                 {profile?.AgentName?.charAt(0) || "A"}
//               </AvatarFallback>
//             </Avatar>

//             <div className="flex-1 text-center md:text-left mb-2">
//               <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
//                 {profile?.AgentName}
//               </h1>

//               <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
//                 <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100 px-3 py-1 font-bold">
//                   {profile?.BranchOfficeCode || "Agent"}
//                 </Badge>
//                 <Badge
//                   variant="outline"
//                   className="text-slate-500 border-slate-200 font-mono"
//                 >
//                   ID: {profile?.AgentIdNo}
//                 </Badge>
//                 {profile?.jobPeriodYear !== undefined && (
//                   <Badge
//                     variant="secondary"
//                     className="bg-orange-50 text-orange-700 border-orange-100"
//                   >
//                     Exp: {profile.jobPeriodYear}Y {profile.jobPeriodMonth}M
//                   </Badge>
//                 )}
//               </div>

//               <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start text-sm text-slate-500 font-medium">
//                 {profile?.Mobile && (
//                   <span className="flex items-center gap-1.5">
//                     <Phone className="w-4 h-4 text-blue-500" /> {profile.Mobile}
//                   </span>
//                 )}
//                 {profile?.Job_Start_Date && (
//                   <span className="flex items-center gap-1.5">
//                     <Calendar className="w-4 h-4 text-blue-500" /> Joined:{" "}
//                     {profile.Job_Start_Date}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* 2. BUSINESS STATS (Dynamic) */}
//       <BusinessStats filterType={filterType} setFilterType={setFilterType} />

//       {/* 3. DETAILS & BANK INFO */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <Card className="border-slate-100 shadow-sm p-6">
//           <h3 className="font-bold text-slate-900 border-b border-slate-50 pb-4 mb-4 flex items-center gap-2">
//             <User className="w-4 h-4 text-blue-500" /> Personal Details
//           </h3>
//           <div className="space-y-4">
//             <div>
//               <p className="text-xs text-slate-400 uppercase font-bold">
//                 Parents
//               </p>
//               <p className="font-medium">
//                 {profile?.AgentFatherName} & {profile?.AgentMotherName}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-slate-400 uppercase font-bold">
//                 Address
//               </p>
//               <p className="font-medium">{profile?.PresentAddress}</p>
//             </div>
//           </div>
//         </Card>

//         <Card className="border-slate-100 shadow-sm p-6">
//           <h3 className="font-bold text-slate-900 border-b border-slate-50 pb-4 mb-4 flex items-center gap-2">
//             <Wallet className="w-4 h-4 text-green-500" /> Bank Info
//           </h3>
//           <div className="space-y-4">
//             <div>
//               <p className="text-xs text-slate-400 uppercase font-bold">Bank</p>
//               <p className="font-medium">
//                 {profile?.BankName} - {profile?.BankBranch}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-slate-400 uppercase font-bold">
//                 Account No
//               </p>
//               <p className="font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 w-fit font-bold text-slate-800">
//                 {profile?.BankACNo}
//               </p>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }

// worakable

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//   Users,
//   Briefcase,
//   Phone,
//   Calendar,
//   User,
//   FileText,
//   AlertCircle,
//   Activity,
//   RefreshCcw,
//   XCircle,
//   TrendingUp,
//   MapPin,
//   Award,
//   ChevronRight,
//   Wallet,
// } from "lucide-react";

// // Hooks
// import { usePersonalDetails, AgentDetails } from "@/hooks/use-personal-details";
// import { useAgentSummary, AgentSummaryItem } from "@/hooks/use-agent-data";

// // UI Components
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Separator } from "@/components/ui/separator";

// // --- 1. SKELETON LOADERS (Premium Look) ---
// function DashboardSkeleton() {
//   return (
//     <div className="space-y-8 animate-pulse">
//       {/* Profile Skeleton */}
//       <div className="h-72 rounded-[2.5rem] bg-slate-100 w-full overflow-hidden relative">
//         <div className="h-32 bg-slate-200 w-full" />
//         <div className="px-8 -mt-12 flex gap-6 items-end">
//           <div className="w-32 h-32 rounded-full bg-white p-1">
//             <div className="w-full h-full bg-slate-300 rounded-full" />
//           </div>
//           <div className="space-y-2 mb-4">
//             <div className="h-8 w-64 bg-slate-300 rounded-lg" />
//             <div className="h-4 w-40 bg-slate-200 rounded-lg" />
//           </div>
//         </div>
//       </div>

//       {/* Stats Grid Skeleton */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {[1, 2, 3, 4].map((i) => (
//           <div
//             key={i}
//             className="h-48 rounded-2xl bg-slate-100 border border-slate-200 p-6 space-y-4"
//           >
//             <div className="flex justify-between">
//               <div className="h-10 w-10 bg-slate-200 rounded-xl" />
//               <div className="h-6 w-16 bg-slate-200 rounded-full" />
//             </div>
//             <div className="space-y-2 pt-4">
//               <div className="h-8 w-32 bg-slate-300 rounded-lg" />
//               <div className="h-4 w-24 bg-slate-200 rounded-lg" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // --- 2. PREMIUM SUMMARY CARD ---
// function SummaryCard({ item }: { item: AgentSummaryItem }) {
//   const isGoodPerformance = item.Percentage >= 80;

//   // Icon & Color Logic
//   let Icon = Activity;
//   let theme = {
//     bg: "bg-blue-50",
//     text: "text-blue-700",
//     border: "group-hover:border-blue-200",
//     iconBg: "bg-blue-100 text-blue-600",
//   };

//   if (item.PayType.includes("First Year")) {
//     Icon = User;
//     theme = {
//       bg: "bg-emerald-50",
//       text: "text-emerald-700",
//       border: "group-hover:border-emerald-200",
//       iconBg: "bg-emerald-100 text-emerald-600",
//     };
//   } else if (item.PayType.includes("Renewal")) {
//     Icon = RefreshCcw;
//     theme = {
//       bg: "bg-violet-50",
//       text: "text-violet-700",
//       border: "group-hover:border-violet-200",
//       iconBg: "bg-violet-100 text-violet-600",
//     };
//   } else if (item.PayType.includes("Deferred")) {
//     Icon = AlertCircle;
//     theme = {
//       bg: "bg-amber-50",
//       text: "text-amber-700",
//       border: "group-hover:border-amber-200",
//       iconBg: "bg-amber-100 text-amber-600",
//     };
//   }

//   return (
//     <Link
//       href={`/agent/business?type=${item.PayType}`}
//       className="block h-full"
//     >
//       <Card
//         className={`h-full border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden ${theme.border}`}
//       >
//         <CardContent className="p-6 flex flex-col justify-between h-full relative z-10">
//           {/* Header */}
//           <div className="flex justify-between items-start mb-6">
//             <div
//               className={`p-3 rounded-2xl ${theme.iconBg} shadow-sm group-hover:scale-110 transition-transform duration-300`}
//             >
//               <Icon className="w-5 h-5" />
//             </div>
//             {item.Percentage > 0 && (
//               <Badge
//                 variant="secondary"
//                 className={`font-bold ${
//                   isGoodPerformance
//                     ? "bg-emerald-50 text-emerald-700"
//                     : "bg-amber-50 text-amber-700"
//                 }`}
//               >
//                 <TrendingUp className="w-3 h-3 mr-1" />
//                 {item.Percentage.toFixed(1)}%
//               </Badge>
//             )}
//           </div>

//           {/* Main Stats */}
//           <div>
//             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
//               {item.PayType}
//             </p>
//             <h3 className="text-2xl font-black text-slate-900 tracking-tight">
//               ৳ {item.TotalPremium.toLocaleString()}
//             </h3>
//             <p className="text-sm font-medium text-slate-500 mt-1">
//               Collected from{" "}
//               <span className="text-slate-900 font-bold">{item.TotalQty}</span>{" "}
//               policies
//             </p>
//           </div>

//           {/* Divider */}
//           <Separator className="my-4 bg-slate-100" />

//           {/* Footer Metrics (The "Business" Details) */}
//           <div className="flex justify-between items-end">
//             <div className="space-y-1">
//               <p className="text-[10px] font-bold text-slate-400 uppercase">
//                 Due Amount
//               </p>
//               <p
//                 className={`text-sm font-bold ${
//                   item.DueQty > 0 ? "text-amber-600" : "text-slate-600"
//                 }`}
//               >
//                 ৳ {item.DuePremium.toLocaleString()}
//                 {item.DueQty > 0 && (
//                   <span className="text-[10px] ml-1 bg-amber-100 px-1.5 py-0.5 rounded-full text-amber-700">
//                     {item.DueQty} due
//                   </span>
//                 )}
//               </p>
//             </div>

//             {/* CTA Arrow */}
//             <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-colors">
//               <ChevronRight className="w-4 h-4" />
//             </div>
//           </div>
//         </CardContent>

//         {/* Decorative Background linear */}
//         <div
//           className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity ${theme.bg.replace(
//             "bg-",
//             "bg-"
//           )}`}
//         />
//       </Card>
//     </Link>
//   );
// }

// // --- 3. MAIN DASHBOARD PAGE ---
// export default function AgentDashboard() {
//   const { data: profileData, isLoading: profileLoading } = usePersonalDetails();
//   const profile = profileData as AgentDetails | undefined;

//   const [timePeriod, setTimePeriod] = useState("Month");
//   const { data: summaryData, isLoading: summaryLoading } =
//     useAgentSummary(timePeriod);

//   // Show Skeleton while initial profile loads
//   if (profileLoading) return <DashboardSkeleton />;

//   return (
//     <div className="space-y-10 pb-20 animate-in fade-in duration-700">
//       {/* SECTION 1: PROFESSIONAL AGENT PROFILE */}
//       <div className="relative group">
//         {/* Background Banner with Glassmorphism */}
//         <div className="h-64 w-full rounded-[2.5rem] bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden shadow-2xl">
//           <div className="absolute inset-0 bg-[url('https://grainy-linears.vercel.app/noise.svg')] opacity-20 brightness-100 mix-blend-overlay"></div>
//           <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-black/50 to-transparent"></div>
//         </div>

//         {/* Profile Content Card - Floating Over Banner */}
//         <div className="relative px-8 -mt-20">
//           <div className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-4xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
//             {/* Avatar with Status Ring */}
//             <div className="relative">
//               <div className="p-1.5 bg-white rounded-full shadow-lg">
//                 <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-slate-50">
//                   <AvatarImage
//                     src={profile?.AgentImage}
//                     alt={profile?.AgentName}
//                     className="object-cover"
//                   />
//                   <AvatarFallback className="bg-slate-100 text-slate-400 text-4xl font-bold">
//                     {profile?.AgentName?.charAt(0)}
//                   </AvatarFallback>
//                 </Avatar>
//               </div>
//               {/* Online/Active Indicator */}
//               <div
//                 className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-4 border-white rounded-full"
//                 title="Active Agent"
//               ></div>
//             </div>

//             {/* Agent Info */}
//             <div className="flex-1 space-y-3 text-center md:text-left">
//               <div>
//                 <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
//                   <h1 className="text-3xl font-black text-slate-800 tracking-tight">
//                     {profile?.AgentName}
//                   </h1>
//                   <Award className="w-6 h-6 text-blue-500 fill-blue-500/10" />
//                 </div>
//                 <p className="text-slate-500 font-medium text-lg">
//                   {profile?.Designation || "Financial Associate"}
//                 </p>
//               </div>

//               {/* Data Chips */}
//               <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
//                 <Badge
//                   variant="outline"
//                   className="px-3 py-1.5 border-slate-200 bg-slate-50 text-slate-600 gap-2 text-sm font-medium shadow-sm"
//                 >
//                   <Briefcase className="w-3.5 h-3.5 text-blue-600" />
//                   {profile?.BranchOfficeCode || "Head Office"}
//                 </Badge>
//                 <Badge
//                   variant="outline"
//                   className="px-3 py-1.5 border-slate-200 bg-slate-50 text-slate-600 gap-2 text-sm font-medium shadow-sm"
//                 >
//                   <User className="w-3.5 h-3.5 text-indigo-600" />
//                   ID:{" "}
//                   <span className="font-mono text-slate-900">
//                     {profile?.AgentIdNo}
//                   </span>
//                 </Badge>
//                 {profile?.Mobile && (
//                   <Badge
//                     variant="outline"
//                     className="px-3 py-1.5 border-slate-200 bg-slate-50 text-slate-600 gap-2 text-sm font-medium shadow-sm"
//                   >
//                     <Phone className="w-3.5 h-3.5 text-green-600" />
//                     {profile?.Mobile}
//                   </Badge>
//                 )}
//               </div>
//             </div>

//             {/* Quick Stats (Mini) */}
//             <div className="hidden lg:flex gap-8 border-l border-slate-200 pl-8">
//               <div className="text-center">
//                 <p className="text-xs font-bold text-slate-400 uppercase">
//                   Experience
//                 </p>
//                 <p className="text-xl font-bold text-slate-800">
//                   {profile?.jobPeriodYear || 0} Yrs
//                 </p>
//               </div>
//               <div className="text-center">
//                 <p className="text-xs font-bold text-slate-400 uppercase">
//                   Joined
//                 </p>
//                 <p className="text-xl font-bold text-slate-800">
//                   {profile?.Job_Start_Date}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* SECTION 2: BUSINESS PERFORMANCE (Cards) */}
//       <div className="space-y-6">
//         {/* Controls Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-end gap-4 border-b border-slate-100 pb-2">
//           <div>
//             <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
//               <Wallet className="w-6 h-6 text-blue-600" /> Performance Overview
//             </h3>
//             <p className="text-slate-500 text-sm mt-1">
//               Track your premium collection and due payments.
//             </p>
//           </div>

//           <Tabs
//             value={timePeriod}
//             onValueChange={setTimePeriod}
//             className="w-full sm:w-auto"
//           >
//             <TabsList className="bg-slate-100 p-1 rounded-xl w-full sm:w-auto h-11">
//               {["Month", "Quarter", "Year", "Last Two Years"].map((tab) => (
//                 <TabsTrigger
//                   key={tab}
//                   value={tab}
//                   className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm transition-all px-4 h-9"
//                 >
//                   {tab}
//                 </TabsTrigger>
//               ))}
//             </TabsList>
//           </Tabs>
//         </div>

//         {/* Content Grid */}
//         {summaryLoading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((i) => (
//               <Skeleton key={i} className="h-56 w-full rounded-3xl" />
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {summaryData && summaryData.length > 0 ? (
//               summaryData.map((item, index) => (
//                 <SummaryCard key={index} item={item} />
//               ))
//             ) : (
//               <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
//                 <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FileText className="w-8 h-8 text-slate-300" />
//                 </div>
//                 <h4 className="text-slate-900 font-semibold text-lg">
//                   No Data Available
//                 </h4>
//                 <p className="text-slate-500 max-w-sm mx-auto mt-2">
//                   There are no business records found for the{" "}
//                   <span className="font-bold">{timePeriod}</span> period.
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// workable 2
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//   Users,
//   Briefcase,
//   Phone,
//   User,
//   AlertCircle,
//   Activity,
//   RefreshCcw,
//   XCircle,
//   TrendingUp,
//   Award,
//   ChevronRight,
//   Wallet,
//   FileText,
// } from "lucide-react";

// // Hooks
// import { usePersonalDetails, AgentDetails } from "@/hooks/use-personal-details";
// import { useAgentSummary, AgentSummaryItem } from "@/hooks/use-agent-data";

// // UI Components
// import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Separator } from "@/components/ui/separator";
// import { ProfileSheet } from "@/components/dashboard/agent/ProfileSheet";

// // Custom Components

// // --- 1. SKELETON LOADERS (Premium Look) ---
// function DashboardSkeleton() {
//   return (
//     <div className="space-y-8 animate-pulse">
//       {/* Profile Skeleton */}
//       <div className="h-72 rounded-[2.5rem] bg-slate-100 w-full overflow-hidden relative">
//         <div className="h-32 bg-slate-200 w-full" />
//         <div className="px-8 -mt-12 flex gap-6 items-end">
//           <div className="w-32 h-32 rounded-full bg-white p-1">
//             <div className="w-full h-full bg-slate-300 rounded-full" />
//           </div>
//           <div className="space-y-2 mb-4">
//             <div className="h-8 w-64 bg-slate-300 rounded-lg" />
//             <div className="h-4 w-40 bg-slate-200 rounded-lg" />
//           </div>
//         </div>
//       </div>

//       {/* Stats Grid Skeleton */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {[1, 2, 3, 4].map((i) => (
//           <div
//             key={i}
//             className="h-48 rounded-2xl bg-slate-100 border border-slate-200 p-6 space-y-4"
//           >
//             <div className="flex justify-between">
//               <div className="h-10 w-10 bg-slate-200 rounded-xl" />
//               <div className="h-6 w-16 bg-slate-200 rounded-full" />
//             </div>
//             <div className="space-y-2 pt-4">
//               <div className="h-8 w-32 bg-slate-300 rounded-lg" />
//               <div className="h-4 w-24 bg-slate-200 rounded-lg" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // --- 2. PREMIUM SUMMARY CARD ---
// function SummaryCard({ item }: { item: AgentSummaryItem }) {
//   const isGoodPerformance = item.Percentage >= 80;

//   // Icon & Color Logic
//   let Icon = Activity;
//   let theme = {
//     bg: "bg-blue-50",
//     border: "group-hover:border-blue-200",
//     iconBg: "bg-blue-100 text-blue-600",
//   };

//   if (item.PayType.includes("First Year")) {
//     Icon = User;
//     theme = {
//       bg: "bg-emerald-50",
//       border: "group-hover:border-emerald-200",
//       iconBg: "bg-emerald-100 text-emerald-600",
//     };
//   } else if (item.PayType.includes("Renewal")) {
//     Icon = RefreshCcw;
//     theme = {
//       bg: "bg-violet-50",
//       border: "group-hover:border-violet-200",
//       iconBg: "bg-violet-100 text-violet-600",
//     };
//   } else if (item.PayType.includes("Deferred")) {
//     Icon = AlertCircle;
//     theme = {
//       bg: "bg-amber-50",
//       border: "group-hover:border-amber-200",
//       iconBg: "bg-amber-100 text-amber-600",
//     };
//   }

//   return (
//     <Link
//       href={`/agent/business?type=${item.PayType}`}
//       className="block h-full"
//     >
//       <Card
//         className={`h-full border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden ${theme.border}`}
//       >
//         <CardContent className="p-6 flex flex-col justify-between h-full relative z-10">
//           {/* Header */}
//           <div className="flex justify-between items-start mb-6">
//             <div
//               className={`p-3 rounded-2xl ${theme.iconBg} shadow-sm group-hover:scale-110 transition-transform duration-300`}
//             >
//               <Icon className="w-5 h-5" />
//             </div>
//             {item.Percentage > 0 && (
//               <Badge
//                 variant="secondary"
//                 className={`font-bold ${
//                   isGoodPerformance
//                     ? "bg-emerald-50 text-emerald-700"
//                     : "bg-amber-50 text-amber-700"
//                 }`}
//               >
//                 <TrendingUp className="w-3 h-3 mr-1" />
//                 {item.Percentage.toFixed(1)}%
//               </Badge>
//             )}
//           </div>

//           {/* Main Stats */}
//           <div>
//             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
//               {item.PayType}
//             </p>
//             <h3 className="text-2xl font-black text-slate-900 tracking-tight">
//               ৳ {item.TotalPremium.toLocaleString()}
//             </h3>
//             <p className="text-sm font-medium text-slate-500 mt-1">
//               Collected from{" "}
//               <span className="text-slate-900 font-bold">{item.TotalQty}</span>{" "}
//               policies
//             </p>
//           </div>

//           {/* Divider */}
//           <Separator className="my-4 bg-slate-100" />

//           {/* Footer Metrics */}
//           <div className="flex justify-between items-end">
//             <div className="space-y-1">
//               <p className="text-[10px] font-bold text-slate-400 uppercase">
//                 Due Amount
//               </p>
//               <p
//                 className={`text-sm font-bold ${
//                   item.DueQty > 0 ? "text-amber-600" : "text-slate-600"
//                 }`}
//               >
//                 ৳ {item.DuePremium.toLocaleString()}
//                 {item.DueQty > 0 && (
//                   <span className="text-[10px] ml-1 bg-amber-100 px-1.5 py-0.5 rounded-full text-amber-700">
//                     {item.DueQty} due
//                   </span>
//                 )}
//               </p>
//             </div>

//             {/* CTA Arrow */}
//             <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-colors">
//               <ChevronRight className="w-4 h-4" />
//             </div>
//           </div>
//         </CardContent>

//         {/* Decorative Background linear */}
//         <div
//           className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity ${theme.bg}`}
//         />
//       </Card>
//     </Link>
//   );
// }

// // --- 3. MAIN DASHBOARD PAGE ---
// export default function AgentDashboard() {
//   const { data: profileData, isLoading: profileLoading } = usePersonalDetails();
//   const profile = profileData as AgentDetails | undefined;

//   const [timePeriod, setTimePeriod] = useState("Month");
//   const { data: summaryData, isLoading: summaryLoading } =
//     useAgentSummary(timePeriod);

//   // Show Skeleton while initial profile loads
//   if (profileLoading) return <DashboardSkeleton />;

//   return (
//     <div className="space-y-10 pb-20 animate-in fade-in duration-700">
//       {/* SECTION 1: PROFESSIONAL AGENT PROFILE */}
//       <div className="relative group">
//         {/* Background Banner with Glassmorphism */}
//         <div className="h-64 w-full rounded-[2.5rem] bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden shadow-2xl">
//           <div className="absolute inset-0 bg-[url('https://grainy-linears.vercel.app/noise.svg')] opacity-20 brightness-100 mix-blend-overlay"></div>
//           <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-black/50 to-transparent"></div>
//         </div>

//         {/* Profile Content Card - Floating Over Banner */}
//         <div className="relative px-8 -mt-20">
//           <div className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-4xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
//             {/* Avatar with Status Ring */}
//             <div className="relative">
//               <div className="p-1.5 bg-white rounded-full shadow-lg">
//                 <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-slate-50">
//                   <AvatarImage
//                     src={profile?.AgentImage}
//                     alt={profile?.AgentName}
//                     className="object-cover"
//                   />
//                   <AvatarFallback className="bg-slate-100 text-slate-400 text-4xl font-bold">
//                     {profile?.AgentName?.charAt(0)}
//                   </AvatarFallback>
//                 </Avatar>
//               </div>
//               <div
//                 className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-4 border-white rounded-full"
//                 title="Active Agent"
//               ></div>
//             </div>

//             {/* Agent Info */}
//             <div className="flex-1 space-y-3 text-center md:text-left">
//               <div>
//                 <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
//                   <h1 className="text-3xl font-black text-slate-800 tracking-tight">
//                     {profile?.AgentName}
//                   </h1>
//                   <Award className="w-6 h-6 text-blue-500 fill-blue-500/10" />
//                 </div>
//                 <p className="text-slate-500 font-medium text-lg">
//                   {profile?.Designation || "Financial Associate"}
//                 </p>
//               </div>

//               {/* Data Chips */}
//               <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
//                 <Badge
//                   variant="outline"
//                   className="px-3 py-1.5 border-slate-200 bg-slate-50 text-slate-600 gap-2 text-sm font-medium shadow-sm"
//                 >
//                   <Briefcase className="w-3.5 h-3.5 text-blue-600" />
//                   {profile?.BranchOfficeCode || "Head Office"}
//                 </Badge>
//                 <Badge
//                   variant="outline"
//                   className="px-3 py-1.5 border-slate-200 bg-slate-50 text-slate-600 gap-2 text-sm font-medium shadow-sm"
//                 >
//                   <User className="w-3.5 h-3.5 text-indigo-600" />
//                   ID:{" "}
//                   <span className="font-mono text-slate-900">
//                     {profile?.AgentIdNo}
//                   </span>
//                 </Badge>
//                 {profile?.Mobile && (
//                   <Badge
//                     variant="outline"
//                     className="px-3 py-1.5 border-slate-200 bg-slate-50 text-slate-600 gap-2 text-sm font-medium shadow-sm"
//                   >
//                     <Phone className="w-3.5 h-3.5 text-green-600" />
//                     {profile?.Mobile}
//                   </Badge>
//                 )}
//               </div>

//               {/* View Full Profile Button */}
//               <div className="flex justify-center md:justify-start pt-2">
//                 {profile && <ProfileSheet profile={profile} />}
//               </div>
//             </div>

//             {/* Quick Stats (Desktop Only) */}
//             <div className="hidden lg:flex gap-8 border-l border-slate-200 pl-8">
//               <div className="text-center">
//                 <p className="text-xs font-bold text-slate-400 uppercase">
//                   Experience
//                 </p>
//                 <p className="text-xl font-bold text-slate-800">
//                   {profile?.jobPeriodYear || 0} Yrs
//                 </p>
//               </div>
//               <div className="text-center">
//                 <p className="text-xs font-bold text-slate-400 uppercase">
//                   Joined
//                 </p>
//                 <p className="text-xl font-bold text-slate-800">
//                   {profile?.Job_Start_Date?.split("-")[2] || "2023"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* SECTION 2: BUSINESS PERFORMANCE (Cards) */}
//       <div className="space-y-6">
//         {/* Controls Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-end gap-4 border-b border-slate-100 pb-2">
//           <div>
//             <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
//               <Wallet className="w-6 h-6 text-blue-600" /> Performance Overview
//             </h3>
//             <p className="text-slate-500 text-sm mt-1">
//               Track your premium collection and due payments.
//             </p>
//           </div>

//           <Tabs
//             value={timePeriod}
//             onValueChange={setTimePeriod}
//             className="w-full sm:w-auto"
//           >
//             <TabsList className="bg-slate-100 p-1 rounded-xl w-full sm:w-auto h-11">
//               {["Month", "Quarter", "Year", "Last Two Years"].map((tab) => (
//                 <TabsTrigger
//                   key={tab}
//                   value={tab}
//                   className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm transition-all px-4 h-9"
//                 >
//                   {tab}
//                 </TabsTrigger>
//               ))}
//             </TabsList>
//           </Tabs>
//         </div>

//         {/* Content Grid */}
//         {summaryLoading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((i) => (
//               <Skeleton key={i} className="h-56 w-full rounded-[1.5rem]" />
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {summaryData && summaryData.length > 0 ? (
//               summaryData.map((item, index) => (
//                 <SummaryCard key={index} item={item} />
//               ))
//             ) : (
//               <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
//                 <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FileText className="w-8 h-8 text-slate-300" />
//                 </div>
//                 <h4 className="text-slate-900 font-semibold text-lg">
//                   No Data Available
//                 </h4>
//                 <p className="text-slate-500 max-w-sm mx-auto mt-2">
//                   There are no business records found for the{" "}
//                   <span className="font-bold">{timePeriod}</span> period.
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//   Users,
//   Briefcase,
//   Phone,
//   Award,
//   Wallet,
//   Activity,
//   RefreshCcw,
//   User,
//   AlertCircle,
//   ChevronRight,
//   TrendingUp,
// } from "lucide-react";

// // Hooks
// import { usePersonalDetails, AgentDetails } from "@/hooks/use-personal-details";
// import { useAgentSummary, AgentSummaryItem } from "@/hooks/use-agent-data";

// // Components
// import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Separator } from "@/components/ui/separator";
// import { ProfileSheet } from "@/components/dashboard/agent/ProfileSheet";

// // Custom Components

// // --- COMPONENT: Dashboard Skeleton (Loading State) ---
// function DashboardSkeleton() {
//   return (
//     <div className="space-y-6 md:space-y-8 animate-pulse pb-20">
//       {/* Profile Skeleton */}
//       <div className="h-auto md:h-72 rounded-4xl bg-slate-900 w-full overflow-hidden p-6 md:p-0 relative flex flex-col justify-end">
//         <div className="hidden md:block absolute top-0 left-0 w-full h-32 bg-slate-200" />
//         <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6 md:px-8 md:pb-8">
//           <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-slate-300 border-4 border-white" />
//           <div className="flex-1 space-y-3 text-center md:text-left w-full">
//             <div className="h-6 md:h-8 w-3/4 md:w-64 bg-slate-300 rounded mx-auto md:mx-0" />
//             <div className="h-4 w-1/2 md:w-40 bg-slate-200 rounded mx-auto md:mx-0" />
//           </div>
//         </div>
//       </div>
//       {/* Stats Skeleton */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {[1, 2, 3, 4].map((i) => (
//           <div
//             key={i}
//             className="h-48 rounded-2xl bg-slate-100 border border-slate-200"
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // --- COMPONENT: Summary Card ---
// function SummaryCard({ item }: { item: AgentSummaryItem }) {
//   const isGood = item.Percentage >= 80;

//   // Theme Logic
//   let Icon = Activity;
//   let theme = {
//     bg: "bg-blue-50",
//     text: "text-blue-700",
//     border: "group-hover:border-blue-300",
//     icon: "bg-blue-100 text-blue-600",
//   };

//   if (item.PayType.includes("First Year")) {
//     Icon = User;
//     theme = {
//       bg: "bg-emerald-50",
//       text: "text-emerald-700",
//       border: "group-hover:border-emerald-300",
//       icon: "bg-emerald-100 text-emerald-600",
//     };
//   } else if (item.PayType.includes("Renewal")) {
//     Icon = RefreshCcw;
//     theme = {
//       bg: "bg-violet-50",
//       text: "text-violet-700",
//       border: "group-hover:border-violet-300",
//       icon: "bg-violet-100 text-violet-600",
//     };
//   } else if (item.PayType.includes("Deferred")) {
//     Icon = AlertCircle;
//     theme = {
//       bg: "bg-amber-50",
//       text: "text-amber-700",
//       border: "group-hover:border-amber-300",
//       icon: "bg-amber-100 text-amber-600",
//     };
//   }

//   return (
//     <Link
//       href={`/agent/business?type=${item.PayType}`}
//       className="block h-full"
//     >
//       <Card
//         className={`h-full border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden ${theme.border}`}
//       >
//         <CardContent className="p-5 md:p-6 flex flex-col justify-between h-full relative z-10">
//           <div className="flex justify-between items-start mb-4">
//             <div
//               className={`p-3 rounded-2xl ${theme.icon} shadow-sm group-hover:scale-110 transition-transform`}
//             >
//               <Icon className="w-5 h-5" />
//             </div>
//             {item.Percentage > 0 && (
//               <Badge
//                 variant="secondary"
//                 className={`font-bold ${
//                   isGood
//                     ? "bg-emerald-50 text-emerald-700"
//                     : "bg-amber-50 text-amber-700"
//                 }`}
//               >
//                 <TrendingUp className="w-3 h-3 mr-1" />
//                 {item.Percentage.toFixed(1)}%
//               </Badge>
//             )}
//           </div>
//           <div>
//             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
//               {item.PayType}
//             </p>
//             <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
//               ৳ {item.TotalPremium.toLocaleString()}
//             </h3>
//             <p className="text-xs md:text-sm font-medium text-slate-500 mt-1">
//               Collected from{" "}
//               <span className="text-slate-900 font-bold">{item.TotalQty}</span>{" "}
//               policies
//             </p>
//           </div>
//           <Separator className="my-4 bg-slate-100" />
//           <div className="flex justify-between items-end">
//             <div className="space-y-0.5">
//               <p className="text-[10px] font-bold text-slate-400 uppercase">
//                 Due Amount
//               </p>
//               <p
//                 className={`text-sm font-bold ${
//                   item.DueQty > 0 ? "text-amber-600" : "text-slate-600"
//                 }`}
//               >
//                 ৳ {item.DuePremium.toLocaleString()}
//               </p>
//             </div>
//             <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-colors">
//               <ChevronRight className="w-4 h-4" />
//             </div>
//           </div>
//         </CardContent>
//         {/* Hover linear Effect */}
//         <div
//           className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-10 transition-opacity blur-3xl ${theme.bg.replace(
//             "bg-",
//             "bg-"
//           )}`}
//         />
//       </Card>
//     </Link>
//   );
// }

// // --- MAIN PAGE ---
// export default function AgentDashboard() {
//   const { data: profileData, isLoading: profileLoading } = usePersonalDetails();
//   const profile = profileData as AgentDetails | undefined;

//   const [timePeriod, setTimePeriod] = useState("Month");
//   const { data: summaryData, isLoading: summaryLoading } =
//     useAgentSummary(timePeriod);

//   // Responsive Skeleton
//   if (profileLoading) return <DashboardSkeleton />;

//   return (
//     <div className="space-y-6 md:space-y-10 pb-24 animate-in fade-in duration-700">
//       {/* 1. AGENT PROFILE HERO */}
//       <div className="relative group rounded-4xl overflow-hidden bg-white shadow-xl shadow-slate-200/50">
//         {/* Banner Background */}
//         <div className="h-48 md:h-64 w-full bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
//           <div className="absolute inset-0 bg-[url('https://grainy-linears.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
//           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
//         </div>

//         {/* Profile Content */}
//         <div className="relative px-6 md:px-10 -mt-16 md:-mt-20 pb-8 flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-8">
//           {/* Avatar */}
//           <div className="relative shrink-0">
//             <div className="p-1.5 bg-white rounded-full shadow-lg">
//               <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-slate-50 bg-white">
//                 <AvatarImage
//                   src={profile?.AgentImage}
//                   alt={profile?.AgentName}
//                   className="object-cover"
//                 />
//                 <AvatarFallback className="bg-slate-100 text-slate-400 text-4xl font-bold">
//                   {profile?.AgentName?.charAt(0)}
//                 </AvatarFallback>
//               </Avatar>
//             </div>
//             <div className="absolute bottom-4 right-4 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
//           </div>

//           {/* Info Block */}
//           <div className="flex-1 text-center md:text-left space-y-2 w-full">
//             <div>
//               <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
//                 {profile?.AgentName}
//               </h1>
//               {/* <p className="text-slate-500 font-medium text-base md:text-lg">
//                 {profile?.Designation || "Financial Associate"}
//               </p> */}
//             </div>

//             {/* Badges */}
//             <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 py-2">
//               <Badge
//                 variant="outline"
//                 className="py-1.5 px-3 bg-slate-50 border-slate-200 text-slate-600 gap-1.5"
//               >
//                 <Briefcase className="w-3.5 h-3.5 text-blue-600" />{" "}
//                 {profile?.BranchOfficeCode}
//               </Badge>
//               <Badge
//                 variant="outline"
//                 className="py-1.5 px-3 bg-slate-50 border-slate-200 text-slate-600 gap-1.5"
//               >
//                 <Phone className="w-3.5 h-3.5 text-emerald-600" />{" "}
//                 {profile?.Mobile}
//               </Badge>
//             </div>

//             {/* Actions */}
//             <div className="flex justify-center md:justify-start pt-2">
//               {profile && <ProfileSheet profile={profile} />}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 2. BUSINESS PERFORMANCE SECTION */}
//       <div className="space-y-6">
//         {/* Header Controls */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-100 pb-4">
//           <div>
//             <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
//               <Wallet className="w-6 h-6 text-blue-600" /> Performance
//             </h3>
//             <p className="text-slate-500 text-sm">
//               Real-time business updates.
//             </p>
//           </div>

//           <Tabs
//             value={timePeriod}
//             onValueChange={setTimePeriod}
//             className="w-full md:w-auto"
//           >
//             <TabsList className="bg-slate-100 p-1 rounded-xl w-full h-11 grid grid-cols-4">
//               {["Month", "Quarter", "Year", "Last Two Years"].map((tab) => (
//                 <TabsTrigger
//                   key={tab}
//                   value={tab}
//                   className="text-[10px] md:text-xs font-semibold rounded-lg h-9 truncate px-1"
//                 >
//                   {tab === "Last Two Years" ? "2 Years" : tab}
//                 </TabsTrigger>
//               ))}
//             </TabsList>
//           </Tabs>
//         </div>

//         {/* Data Grid */}
//         {summaryLoading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//             {[1, 2, 3, 4].map((i) => (
//               <Skeleton key={i} className="h-56 w-full rounded-3xl" />
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//             {summaryData && summaryData.length > 0 ? (
//               summaryData.map((item, index) => (
//                 <SummaryCard key={index} item={item} />
//               ))
//             ) : (
//               <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
//                 <p className="text-slate-400 font-medium">
//                   No business data found for {timePeriod}.
//                 </p>
//               </div>
//             )}
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
  Briefcase,
  Phone,
  Wallet,
  Activity,
  RefreshCcw,
  User,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  XCircle,
} from "lucide-react";

// Hooks
import { usePersonalDetails, AgentDetails } from "@/hooks/use-personal-details";
import { useAgentSummary, AgentSummaryItem } from "@/hooks/use-agent-data";

// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProfileSheet } from "@/components/dashboard/agent/ProfileSheet";

// --- 1. SKELETON LOADER ---
function DashboardSkeleton() {
  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto animate-pulse">
      <div className="h-64 rounded-4xl bg-slate-100 w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-72 rounded-3xl bg-slate-100" />
        ))}
      </div>
    </div>
  );
}

// --- 2. PREMIUM SUMMARY CARD (With Lapse & Due Highlight) ---
function SummaryCard({ item }: { item: AgentSummaryItem }) {
  // Theme Logic
  let theme = {
    icon: Activity,
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "group-hover:border-blue-300",
    accent: "bg-blue-600",
  };

  if (item.PayType.includes("First Year")) {
    theme = {
      icon: User,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "group-hover:border-emerald-300",
      accent: "bg-emerald-600",
    };
  } else if (item.PayType.includes("Renewal")) {
    theme = {
      icon: RefreshCcw,
      bg: "bg-violet-50",
      text: "text-violet-600",
      border: "group-hover:border-violet-300",
      accent: "bg-violet-600",
    };
  } else if (item.PayType.includes("Deferred")) {
    theme = {
      icon: AlertCircle,
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "group-hover:border-amber-300",
      accent: "bg-amber-600",
    };
  }

  const Icon = theme.icon;
  const hasDue = item.DueQty > 0;
  const hasLapse = item.LapseQty > 0;

  return (
    // <Link
    //   href={`/agent/business?type=${item.PayType}`}
    //   className="block h-full group"
    // >
    <Card
      className={`h-full border border-slate-100 shadow-md ${theme.border} transition-all duration-300 hover:shadow-xl bg-white rounded-3xl overflow-hidden flex flex-col relative`}
    >
      {/* Top accent line */}
      <div className={`h-1.5 w-full ${theme.accent}`} />

      {/* 1. HEADER: Type & Collection % */}
      <div className="p-5 pb-2 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${theme.bg}`}>
            <Icon className={`w-5 h-5 ${theme.text}`} />
          </div>
          <div>
            <p
              className={`text-[12px] font-bold ${theme.text} uppercase tracking-wider`}
            >
              {item.PayType}
            </p>
            <p className="text-xs font-semibold text-slate-500">
              {item.TotalQty} Total Policies
            </p>
          </div>
        </div>
        {item.Percentage > 0 && (
          <Badge
            variant="secondary"
            className="bg-slate-50 text-slate-700 font-bold border-slate-100 shadow-sm"
          >
            {item.Percentage.toFixed(0)}%
          </Badge>
        )}
      </div>

      {/* 2. MAIN STAT: Collected Amount */}
      <div className="px-5 pb-4">
        <h3 className="text-2xl font-black text-slate-800 tracking-tight mt-1">
          ৳ {item.TotalPremium.toLocaleString()}
        </h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
          Total Collected
        </p>
      </div>

      <Separator className="mb-0 mt-auto opacity-50" />

      {/* 3. NECESSARY STEPS GRID (Due & Lapse) */}
      <div className="bg-slate-50/50 divide-y divide-slate-100">
        {/* A. DUE SECTION (Warning) */}
        <div
          className={`px-5 py-3 flex items-center justify-between group-hover:bg-amber-50/30 transition-colors`}
        >
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  hasDue ? "bg-amber-500 animate-pulse" : "bg-slate-300"
                }`}
              />
              <p className="text-[10px] font-bold text-slate-500 uppercase">
                Due Pending
              </p>
            </div>
            <p
              className={`text-sm font-bold ${
                hasDue ? "text-amber-600" : "text-slate-400"
              }`}
            >
              ৳ {item.DuePremium.toLocaleString()}
              <span className="text-[12px] ml-1 opacity-80 font-medium">
                ({item.DueQty})
              </span>
            </p>
          </div>
          {hasDue && <ChevronRight className="w-4 h-4 text-amber-400" />}
        </div>

        {/* B. LAPSE SECTION (Critical) - Only show if relevant or explicitly show 0 */}
        <div
          className={`px-5 py-3 flex items-center justify-between group-hover:bg-red-50/30 transition-colors`}
        >
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  hasLapse ? "bg-red-500" : "bg-slate-300"
                }`}
              />
              <p className="text-[10px] font-bold text-slate-500 uppercase">
                Lapsed
              </p>
            </div>
            <p
              className={`text-sm font-bold ${
                hasLapse ? "text-red-600" : "text-slate-400"
              }`}
            >
              ৳ {item.LapseAmount.toLocaleString()}
              <span className="text-[12px] ml-1 opacity-80 font-medium">
                ({item.LapseQty})
              </span>
            </p>
          </div>
          {hasLapse && <AlertTriangle className="w-4 h-4 text-red-400" />}
        </div>
      </div>
    </Card>
    // </Link>
  );
}

// --- 3. MAIN DASHBOARD PAGE ---
export default function AgentDashboard() {
  const { data: profileData, isLoading: profileLoading } = usePersonalDetails();
  const profile = profileData as AgentDetails | undefined;

  const [timePeriod, setTimePeriod] = useState("Month");
  const { data: summaryData, isLoading: summaryLoading } =
    useAgentSummary(timePeriod);

  const isLoading = profileLoading || summaryLoading;

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-700 bg-slate-50/30 min-h-screen p-4 md:p-8">
      {/* 1. AGENT PROFILE HERO */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-white shadow-xl shadow-slate-200/40 border border-white">
        <div className="h-40 w-full bg-slate-900 relative">
          <div className="absolute inset-0 bg-linear-to-r from-blue-900 to-slate-900 opacity-90" />
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        </div>

        <div className="px-6 md:px-10 pb-6 -mt-12 relative z-10 flex flex-col md:flex-row items-end gap-6">
          <div className="relative">
            <div className="p-1 bg-white rounded-full shadow-lg">
              <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-slate-50 bg-white">
                <AvatarImage
                  src={profile?.AgentImage}
                  className="object-cover"
                />
                <AvatarFallback className="bg-slate-100 text-2xl font-bold text-slate-400">
                  AG
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="absolute bottom-3 right-3 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
          </div>

          <div className="flex-1 text-center md:text-left pb-1">
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              {profile?.AgentName}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-1 text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                {/* {profile?.Designation} */}
              </span>
              {/* <span className="w-1 h-1 bg-slate-300 rounded-full" /> */}
              <span>{profile?.AgentIdNo}</span>
              <span>{profile?.BranchOfficeCode}</span>
            </div>
          </div>

          <div className="pb-2">
            {profile && <ProfileSheet profile={profile} />}
          </div>
        </div>
      </div>

      {/* 2. BUSINESS OVERVIEW SECTION */}
      <div className="space-y-6 max-w-7xl mx-auto mt-25">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
              <Wallet className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Business Overview
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Summary for {timePeriod}
              </p>
            </div>
          </div>

          <Tabs
            value={timePeriod}
            onValueChange={setTimePeriod}
            className="w-full md:w-auto"
          >
            <TabsList className="bg-white p-1 rounded-xl shadow-sm border border-slate-100 w-full md:w-auto grid grid-cols-4 md:flex">
              {["Month", "Quarter", "Year", "Last Two Years"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-lg px-4 py-2 text-xs font-bold text-slate-500 data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all"
                >
                  {tab === "Last Two Years" ? "2Y" : tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {summaryData && summaryData.length > 0 ? (
            summaryData.map((item, index) => (
              <SummaryCard key={index} item={item} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-slate-100">
              <p className="text-slate-400 font-medium">
                No business data found for {timePeriod}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
