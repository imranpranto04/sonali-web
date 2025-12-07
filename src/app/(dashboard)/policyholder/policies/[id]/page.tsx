// "use client";

// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   Shield,
//   CreditCard,
//   FileText,
//   Download,
//   CheckCircle2,
//   AlertCircle,
//   TrendingUp,
//   PiggyBank,
//   User,
//   History,
//   ChevronLeft,
//   ChevronRight,
//   Search,
// } from "lucide-react";

// // FIX: Import everything from the unified hook file
// // We removed 'use-policy-status.ts', so we import from 'use-policy-data'
// import { usePolicyDetailsFull, usePolicyStatus } from "@/hooks/use-policy-data";

// // Shadcn Components
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// export default function PolicyDetailsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const id = params.id as string;

//   // 1. Fetch Full Details
//   const {
//     data: fullDetails,
//     isLoading: isDetailsLoading,
//     error,
//   } = usePolicyDetailsFull(id);

//   // 2. Fetch Live Status (using the unified hook from use-policy-data)
//   const { data: statusDetails, isLoading: isStatusLoading } = usePolicyStatus(
//     Number(id)
//   );

//   const isLoading = isDetailsLoading || isStatusLoading;

//   // Pagination State for History
//   const [historyPage, setHistoryPage] = useState(1);
//   const [historySearch, setHistorySearch] = useState("");
//   const itemsPerPage = 10;

//   if (isLoading)
//     return (
//       <div className="p-8 max-w-6xl mx-auto space-y-8 animate-pulse">
//         <div className="h-8 w-32 bg-slate-200 rounded"></div>
//         <div className="h-64 w-full bg-slate-200 rounded-4xl"></div>
//         <div className="grid grid-cols-3 gap-6">
//           <div className="h-32 w-full bg-slate-200 rounded-xl"></div>
//           <div className="h-32 w-full bg-slate-200 rounded-xl"></div>
//           <div className="h-32 w-full bg-slate-200 rounded-xl"></div>
//         </div>
//       </div>
//     );

//   // Error Handling
//   if (
//     typeof fullDetails === "string" ||
//     !fullDetails ||
//     !fullDetails.PolicyInfo?.PolicyDetails?.length
//   ) {
//     return (
//       <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
//         <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
//           <AlertCircle className="w-10 h-10 text-slate-400" />
//         </div>
//         <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
//           Policy Not Found
//         </h2>
//         <p className="text-slate-500 mb-8 max-w-md text-center">
//           We couldn't retrieve information for Policy ID:{" "}
//           <span className="font-mono text-slate-700 font-bold">{id}</span>.
//         </p>
//         <Button
//           onClick={() => router.back()}
//           variant="outline"
//           className="font-bold"
//         >
//           Go Back
//         </Button>
//       </div>
//     );
//   }

//   // --- Data Extraction ---
//   const overview = fullDetails.OverView?.[0] || {};
//   const info = fullDetails.PolicyInfo?.PolicyDetails?.[0] || {};

//   // Prioritize live status, fallback to static detail status
//   const currentStatus =
//     statusDetails?.Status?.trim() ||
//     fullDetails.PolicyInfo?.PolicyStatus?.[0]?.Status?.trim() ||
//     "Unknown";

//   const bonus =
//     fullDetails.FinancialBenefits?.Bonus?.[0]?.CummulativeBonusAmt || 0;

//   // Sort History (Recent to Oldest)
//   const history = [...(fullDetails.PaymentsHistory || [])].sort((a, b) => {
//     // Parse "DD/MM/YYYY"
//     const [dayA, monthA, yearA] = a.DepositDate.split("/");
//     const [dayB, monthB, yearB] = b.DepositDate.split("/");
//     // Note: This parsing assumes API sends DD/MM/YYYY. If it sends MM/DD, swap day/month.
//     return (
//       new Date(`${yearB}-${monthB}-${dayA}`).getTime() -
//       new Date(`${yearA}-${monthA}-${dayA}`).getTime()
//     );
//   });

//   const nomineeList = fullDetails.PolicyInfo?.Nominee || [];

//   const isActive = currentStatus.toLowerCase() === "active";
//   // If not Active, assume Defaulter/Lapsed for red color
//   const isDefaulter = !isActive && currentStatus !== "Unknown";

//   const statusColor = isActive
//     ? "bg-green-100 text-green-700 hover:bg-green-200"
//     : "bg-red-100 text-red-700 hover:bg-red-200";

//   // --- Pagination Logic ---
//   const filteredHistory = history.filter(
//     (item) =>
//       item.FPR_ORMultiId.toLowerCase().includes(historySearch.toLowerCase()) ||
//       item.DepositDate.includes(historySearch)
//   );
//   const totalHistoryPages = Math.ceil(filteredHistory.length / itemsPerPage);
//   const paginatedHistory = filteredHistory.slice(
//     (historyPage - 1) * itemsPerPage,
//     historyPage * itemsPerPage
//   );

//   return (
//     <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
//       {/* 1. Navigation Header */}
//       <button
//         onClick={() => router.back()}
//         className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-600 transition-colors group"
//       >
//         <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
//         Back to Dashboard
//       </button>

//       {/* 2. Hero Card (Premium Design) */}
//       <Card className="border-none shadow-xl bg-white overflow-hidden rounded-4xl">
//         {/* Gradient Header */}
//         <div className="h-40 bg-linear-to-r from-orange-500 to-amber-500 relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
//           <div className="absolute bottom-0 left-0 w-full h-20 bg-linear-to-t from-black/20 to-transparent"></div>
//         </div>

//         <CardContent className="px-8 pb-10 relative">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 -mt-16">
//             <div className="flex items-end gap-6">
//               <div className="w-28 h-28 bg-white rounded-3xl p-1.5 shadow-xl flex items-center justify-center relative z-10">
//                 <div className="w-full h-full bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 border border-orange-100">
//                   <Shield className="w-12 h-12" />
//                 </div>
//               </div>
//               <div className="mb-2 space-y-1">
//                 <div className="flex items-center gap-3">
//                   <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
//                     {info.PolicyName || overview.PolicyName}
//                   </h1>
//                   <Badge
//                     className={`text-xs px-2.5 py-0.5 font-bold border-none shadow-none ${statusColor}`}
//                   >
//                     {isActive && <CheckCircle2 className="w-3 h-3 mr-1.5" />}
//                     {currentStatus}
//                   </Badge>
//                 </div>
//                 <p className="text-slate-500 font-mono text-sm bg-slate-100 px-3 py-1 rounded-md w-fit border border-slate-200 font-medium">
//                   {overview.PolicyNumber || id}
//                 </p>
//               </div>
//             </div>

//             <div className="flex gap-3 w-full md:w-auto">
//               <Button
//                 variant="outline"
//                 className="gap-2 border-slate-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 font-bold text-slate-700"
//               >
//                 <Download className="w-4 h-4" /> Statement
//               </Button>
//               <Button className="bg-slate-900 hover:bg-orange-600 text-white gap-2 shadow-lg font-bold transition-all">
//                 <CreditCard className="w-4 h-4" /> Pay Premium
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* 3. Key Financials Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card className="border-slate-100 shadow-sm hover:shadow-md transition-all group">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 group-hover:text-orange-500 transition-colors">
//               <CreditCard className="w-4 h-4" /> Premium
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-extrabold text-slate-900">
//               ৳ {info.BasicPremiumAmount?.toLocaleString()}
//             </p>
//             <p className="text-xs text-slate-500 mt-1 font-medium">
//               {info.InstallmentTypeName}
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="border-slate-100 shadow-sm hover:shadow-md transition-all group">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 group-hover:text-orange-500 transition-colors">
//               <Shield className="w-4 h-4" /> Sum Assured
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-extrabold text-slate-900">
//               ৳ {info.TotalPolicyAmount?.toLocaleString()}
//             </p>
//             <p className="text-xs text-slate-500 mt-1 font-medium">
//               Guaranteed Coverage
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="border-slate-100 shadow-sm hover:shadow-md transition-all group">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 group-hover:text-orange-500 transition-colors">
//               <PiggyBank className="w-4 h-4" /> Total Paid
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-extrabold text-slate-900">
//               ৳ {info.SoFarPaidAmount?.toLocaleString()}
//             </p>
//             <p className="text-xs text-slate-500 mt-1 font-medium">
//               {info.TotalInstallmentsPaid} / {info.TotalNumberOfInstallments}{" "}
//               Installments
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="border-orange-100 bg-orange-50/30 shadow-sm hover:shadow-md transition-all">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-xs font-bold text-orange-600 uppercase tracking-wider flex items-center gap-2">
//               <TrendingUp className="w-4 h-4" /> Bonus
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-extrabold text-slate-900">
//               ৳ {bonus.toLocaleString()}
//             </p>
//             <p className="text-xs text-orange-600/80 mt-1 font-medium">
//               Profit Share
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* 4. Deep Dive Tabs (Improved Design) */}
//       <Tabs defaultValue="history" className="w-full pt-8">
//         <div className="border-b border-slate-200">
//           <TabsList className="flex w-full justify-start bg-transparent p-0 h-auto space-x-8">
//             <TabsTrigger
//               value="history"
//               className="rounded-xl border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:text-orange-600 pb-3 pt-2 font-bold text-slate-900 bg-transparent shadow-none hover:text-slate-700 transition-colors px-0"
//             >
//               Payment History
//             </TabsTrigger>
//             <TabsTrigger
//               value="nominee"
//               className="rounded-xl border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:text-orange-600 pb-3 pt-2 font-bold text-slate-900 bg-transparent shadow-none hover:text-slate-700 transition-colors px-0"
//             >
//               Nominee
//             </TabsTrigger>
//           </TabsList>
//         </div>

//         {/* Payment History Tab */}
//         <TabsContent value="history" className="space-y-4 mt-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div className="relative w-full sm:w-72">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//               <Input
//                 placeholder="Search receipts..."
//                 className="pl-9 bg-white border-slate-200 focus-visible:ring-orange-500"
//                 value={historySearch}
//                 onChange={(e) => {
//                   setHistorySearch(e.target.value);
//                   setHistoryPage(1);
//                 }}
//               />
//             </div>
//             <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
//               Showing {paginatedHistory.length} of {filteredHistory.length}{" "}
//               records
//             </span>
//           </div>

//           <Card className="overflow-hidden border-orange-300 shadow-md">
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader className="bg-slate-50">
//                   <TableRow>
//                     <TableHead className="font-bold text-slate-600">
//                       Date
//                     </TableHead>
//                     <TableHead className="font-bold text-slate-600">
//                       Inst. No
//                     </TableHead>
//                     <TableHead className="font-bold text-slate-600">
//                       Receipt No
//                     </TableHead>
//                     <TableHead className="font-bold text-slate-600">
//                       Amount
//                     </TableHead>
//                     <TableHead className="text-right font-bold text-slate-600">
//                       Status
//                     </TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {paginatedHistory.length > 0 ? (
//                     paginatedHistory.map((pay, i) => (
//                       <TableRow
//                         key={i}
//                         className="hover:bg-orange-300 transition-colors"
//                       >
//                         <TableCell className="font-medium text-slate-900">
//                           {pay.DepositDate}
//                         </TableCell>
//                         <TableCell className="font-mono text-slate-600">
//                           #{pay.InsNo}
//                         </TableCell>
//                         <TableCell className="font-mono text-xs text-slate-500">
//                           {pay.FPR_ORMultiId}
//                         </TableCell>
//                         <TableCell className="font-bold text-slate-900">
//                           ৳ {pay.DepAmt.toLocaleString()}
//                         </TableCell>
//                         <TableCell className="text-right">
//                           <Badge
//                             variant="outline"
//                             className="bg-green-50 text-green-700 border-green-200 font-bold"
//                           >
//                             Paid
//                           </Badge>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell
//                         colSpan={5}
//                         className="h-32 text-center text-slate-400"
//                       >
//                         No payment history found matching your search.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </div>
//           </Card>

//           {/* Pagination Controls */}
//           {totalHistoryPages > 1 && (
//             <div className="flex justify-end items-center gap-2 mt-4">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setHistoryPage((p) => Math.max(1, p - 1))}
//                 disabled={historyPage === 1}
//                 className="h-8 w-8 p-0"
//               >
//                 <ChevronLeft className="w-4 h-4" />
//               </Button>
//               <span className="text-sm text-slate-500 font-medium px-2">
//                 Page {historyPage} of {totalHistoryPages}
//               </span>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() =>
//                   setHistoryPage((p) => Math.min(totalHistoryPages, p + 1))
//                 }
//                 disabled={historyPage === totalHistoryPages}
//                 className="h-8 w-8 p-0"
//               >
//                 <ChevronRight className="w-4 h-4" />
//               </Button>
//             </div>
//           )}
//         </TabsContent>

//         {/* Nominee Tab */}
//         <TabsContent value="nominee" className="mt-6">
//           <Card className="border-slate-200 shadow-sm">
//             <CardHeader className="border-b border-slate-50 pb-4">
//               <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
//                 <User className="w-4 h-4 text-slate-400" /> Nominees
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="pt-6">
//               {nomineeList.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {nomineeList.map((nom: any, i: number) => (
//                     <div
//                       key={i}
//                       className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group"
//                     >
//                       {/* Check if image exists, else fallback to Initial */}
//                       {nom.NomineePPName ? (
//                         // eslint-disable-next-line @next/next/no-img-element
//                         <img
//                           src={nom.NomineePPName}
//                           alt={nom.NomineeName}
//                           className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
//                         />
//                       ) : (
//                         <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-2xl border-2 border-white shadow-sm">
//                           {nom.NomineeName?.charAt(0)}
//                         </div>
//                       )}
//                       <div>
//                         <p className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
//                           {nom.NomineeName}
//                         </p>
//                         <p className="text-sm text-slate-500 font-medium">
//                           {nom.NomineeRelation} • {nom.NomineeAge} Yrs
//                         </p>
//                         <Badge
//                           variant="secondary"
//                           className="mt-2 text-[10px] bg-blue-50 text-blue-700 border-blue-100"
//                         >
//                           {nom.NomineeAllocation}% Share
//                         </Badge>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
//                   <User className="w-10 h-10 mx-auto mb-3 opacity-20" />
//                   <p>No nominee details available.</p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Shield,
  Calendar,
  CreditCard,
  FileText,
  Download,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  PiggyBank,
  User,
  History,
  ChevronLeft,
  ChevronRight,
  Search,
  Banknote,
  ScrollText,
  PlusCircle,
  Hourglass,
  Info,
} from "lucide-react";

// Import from the unified hook file
import { usePolicyDetailsFull, usePolicyStatus } from "@/hooks/use-policy-data";

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Helper for formatted text
const FormattedText = ({ text }: { text: string }) => {
  if (!text) return null;
  return (
    <p className="whitespace-pre-line text-slate-600 leading-relaxed text-sm">
      {text}
    </p>
  );
};

// Helper Info Card
function InfoCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
  valueClassName,
}: any) {
  return (
    <Card className="border-slate-100 shadow-sm hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} /> {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className={`text-2xl font-extrabold ${
            valueClassName || "text-slate-900"
          }`}
        >
          {value}
        </p>
        <p className="text-xs text-slate-500 mt-1 font-medium">{sub}</p>
      </CardContent>
    </Card>
  );
}

export default function PolicyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = params.id as string;
  const defaultTab = searchParams.get("tab") || "overview";

  // 1. Fetch Full Details
  const { data: fullDetails, isLoading, error } = usePolicyDetailsFull(id);
  const { data: statusDetails } = usePolicyStatus(Number(id));

  // Pagination State
  const [historyPage, setHistoryPage] = useState(1);
  const [historySearch, setHistorySearch] = useState("");
  const itemsPerPage = 10;

  if (isLoading)
    return (
      <div className="p-8 max-w-6xl mx-auto space-y-8 animate-pulse">
        <div className="h-8 w-32 bg-slate-200 rounded"></div>
        <div className="h-64 w-full bg-slate-200 rounded-4xl"></div>
        <div className="grid grid-cols-3 gap-6">
          <div className="h-32 w-full bg-slate-200 rounded-xl"></div>
          <div className="h-32 w-full bg-slate-200 rounded-xl"></div>
          <div className="h-32 w-full bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    );

  if (
    typeof fullDetails === "string" ||
    !fullDetails ||
    !fullDetails.PolicyInfo?.PolicyDetails?.length
  ) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <AlertCircle className="w-10 h-10 text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Policy Not Found
        </h2>
        <p className="text-slate-500 mb-6">ID: {id}</p>
        <Button onClick={() => router.back()} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  // --- Data Extraction ---
  const overview = fullDetails.OverView[0];
  const info = fullDetails.PolicyInfo.PolicyDetails[0];
  const currentStatus =
    statusDetails?.Status ||
    fullDetails.PolicyInfo.PolicyStatus?.[0]?.Status?.trim() ||
    "Unknown";

  // Sort History (Recent to Oldest)
  const history = [...(fullDetails.PaymentsHistory || [])].sort((a, b) => {
    const [dayA, monthA, yearA] = a.DepositDate.split("/");
    const [dayB, monthB, yearB] = b.DepositDate.split("/");
    return (
      new Date(`${yearB}-${monthB}-${dayB}`).getTime() -
      new Date(`${yearA}-${monthA}-${dayA}`).getTime()
    );
  });

  const nomineeList = fullDetails.PolicyInfo.Nominee || [];
  const bonus =
    fullDetails.FinancialBenefits?.Bonus?.[0]?.CummulativeBonusAmt || 0;

  // Maturity & Benefits
  const maturityInfo = (fullDetails.FinancialBenefits as any)?.OnMaturity?.[0];
  const maturityAmount = maturityInfo?.TotalMaturityPaymentAmount || 0;
  const maturityDate = maturityInfo?.MaturityDate || "N/A";

  // Product Text Descriptions
  const benefits = (fullDetails.FinancialBenefits as any)?.OnDeath?.[0];

  const isActive = currentStatus.toLowerCase() === "active";
  const statusColor = isActive
    ? "bg-green-100 text-green-700 hover:bg-green-200"
    : "bg-red-100 text-red-700 hover:bg-red-200";

  // --- Pagination Logic ---
  const filteredHistory = history.filter(
    (item) =>
      item.FPR_ORMultiId.toLowerCase().includes(historySearch.toLowerCase()) ||
      item.DepositDate.includes(historySearch)
  );
  const totalHistoryPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const paginatedHistory = filteredHistory.slice(
    (historyPage - 1) * itemsPerPage,
    historyPage * itemsPerPage
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* 1. Navigation Header */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-600 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
        Back to Dashboard
      </button>

      {/* 2. Hero Card */}
      <Card className="border-none shadow-xl bg-white overflow-hidden rounded-4xl">
        <div className="h-40 bg-linear-to-r from-orange-500 to-amber-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-linear-to-t from-black/20 to-transparent"></div>
        </div>

        <CardContent className="px-8 pb-10 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 -mt-16">
            <div className="flex items-end gap-6">
              <div className="w-28 h-28 bg-white rounded-3xl p-1.5 shadow-xl flex items-center justify-center relative z-10">
                <div className="w-full h-full bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 border border-orange-100">
                  <Shield className="w-12 h-12" />
                </div>
              </div>
              <div className="mb-2 space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                    {info.PolicyName || overview.PolicyName}
                  </h1>
                  <Badge
                    className={`text-xs px-2.5 py-0.5 font-bold border-none shadow-none ${statusColor}`}
                  >
                    {isActive && <CheckCircle2 className="w-3 h-3 mr-1.5" />}
                    {currentStatus}
                  </Badge>
                </div>
                <p className="text-slate-500 font-mono text-sm bg-slate-100 px-3 py-1 rounded-md w-fit border border-slate-200 font-medium">
                  {overview.PolicyNumber || id}
                </p>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <Button
                variant="outline"
                className="gap-2 border-slate-200 hover:bg-orange-50 hover:text-orange-600 font-bold text-slate-700"
              >
                <Download className="w-4 h-4" /> Statement
              </Button>
              <Button className="bg-slate-900 hover:bg-orange-600 text-white gap-2 shadow-lg font-bold transition-all">
                <CreditCard className="w-4 h-4" /> Pay Premium
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Key Financials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoCard
          label="Premium"
          value={`৳ ${info.BasicPremiumAmount?.toLocaleString()}`}
          sub={`${info.InstallmentTypeName} Mode`}
          icon={CreditCard}
          color="text-blue-500"
        />
        <InfoCard
          label="Sum Assured"
          value={`৳ ${info.TotalPolicyAmount?.toLocaleString()}`}
          sub="Guaranteed Coverage"
          icon={Shield}
          color="text-purple-500"
        />
        <InfoCard
          label="Total Paid"
          value={`৳ ${info.SoFarPaidAmount?.toLocaleString()}`}
          sub={`${info.TotalInstallmentsPaid} / ${info.TotalNumberOfInstallments} Inst.`}
          icon={PiggyBank}
          color="text-green-500"
        />

        {/* Replaced "Outstanding" with "Maturity Details" */}
        <InfoCard
          label="Maturity Value"
          value={
            maturityAmount > 0
              ? `৳ ${maturityAmount.toLocaleString()}`
              : "Active"
          }
          sub={
            maturityDate !== "N/A" ? `Date: ${maturityDate}` : "Running Policy"
          }
          icon={Hourglass}
          color="text-amber-500"
          valueClassName="text-amber-600"
        />
      </div>

      {/* 4. Deep Dive Tabs */}
      <Tabs defaultValue={defaultTab} className="w-full">
        <div className="border-b border-slate-200 overflow-x-auto">
          <TabsList className="flex w-full justify-start bg-transparent p-0 h-auto space-x-6 min-w-max">
            {[
              { id: "overview", label: "Overview", icon: FileText },
              { id: "history", label: "Payment History", icon: History },
              { id: "nominee", label: "Nominee", icon: User },
              { id: "benefits", label: "Benefits", icon: ScrollText },
              { id: "loan", label: "Loan Status", icon: Banknote },
            ].map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="rounded-md border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:text-white data-[state=active]:bg-orange-500 pb-3 pt-2 font-bold text-slate-500 bg-transparent shadow-none hover:text-slate-700 transition-colors px-2 gap-2"
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* -- TAB CONTENT -- */}

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Policy Schedule</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Commencement</p>
                  <p className="font-bold">{info.CommencementDate}</p>
                </div>
                <div>
                  <p className="text-slate-500">Term</p>
                  <p className="font-bold">{info.TermOfYear} Years</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50/50 border-orange-100">
              <CardHeader>
                <CardTitle className="text-base text-orange-700">
                  Accrued Bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-orange-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-slate-900">
                      ৳ {bonus.toLocaleString()}
                    </p>
                    <p className="text-xs text-orange-600 font-medium">
                      Total Profit Share
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment History Tab */}
        <TabsContent value="history" className="space-y-4 mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search receipts..."
                className="pl-9 bg-white border-slate-200 focus-visible:ring-orange-500"
                value={historySearch}
                onChange={(e) => {
                  setHistorySearch(e.target.value);
                  setHistoryPage(1);
                }}
              />
            </div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Showing {paginatedHistory.length} of {history.length} records
            </span>
          </div>
          <Card className="overflow-hidden border-slate-200 shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-bold text-slate-600">
                    Date
                  </TableHead>
                  <TableHead className="font-bold text-slate-600">
                    Inst. No
                  </TableHead>
                  <TableHead className="font-bold text-slate-600">
                    Receipt No
                  </TableHead>
                  <TableHead className="font-bold text-slate-600">
                    Amount
                  </TableHead>
                  <TableHead className="text-right font-bold text-slate-600">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedHistory.length > 0 ? (
                  paginatedHistory.map((pay, i) => (
                    <TableRow
                      key={i}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <TableCell className="font-medium text-slate-900">
                        {pay.DepositDate}
                      </TableCell>
                      <TableCell className="font-mono text-slate-600">
                        #{pay.InsNo}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-slate-500">
                        {pay.FPR_ORMultiId}
                      </TableCell>
                      <TableCell className="font-bold text-slate-900">
                        ৳ {pay.DepAmt.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200 font-bold"
                        >
                          Paid
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-slate-500"
                    >
                      No payment history found matching search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
          {/* Pagination Controls */}
          {totalHistoryPages > 1 && (
            <div className="flex justify-end items-center gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setHistoryPage((p) => Math.max(1, p - 1))}
                disabled={historyPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-slate-500 font-medium px-2">
                Page {historyPage} of {totalHistoryPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setHistoryPage((p) => Math.min(totalHistoryPages, p + 1))
                }
                disabled={historyPage === totalHistoryPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Benefits Tab */}
        <TabsContent value="benefits" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ScrollText className="w-5 h-5 text-orange-500" /> Plan Features
                & Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {benefits ? (
                <>
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-800 border-l-4 border-orange-500 pl-3">
                      Term of Policy
                    </h4>
                    <FormattedText text={benefits.TermOfThePolicy} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-800 border-l-4 border-green-500 pl-3">
                        Maturity Benefit
                      </h4>
                      <FormattedText text={benefits.OnMaturity} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-800 border-l-4 border-red-500 pl-3">
                        Death Benefit
                      </h4>
                      <FormattedText text={benefits.InCaseOfAssuredDeath} />
                    </div>
                  </div>

                  {benefits.SupplementaryCover && (
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" /> Supplementary Cover
                      </h4>
                      <FormattedText text={benefits.SupplementaryCover} />
                    </div>
                  )}
                </>
              ) : (
                <p className="text-slate-500">Benefit details not available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Nominee Tab */}
        <TabsContent value="nominee" className="mt-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-50 pb-4">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" /> Nominees
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {nomineeList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {nomineeList.map((nom: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      {/* Check if image exists, else fallback to Initial */}
                      {nom.NomineePPName ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={nom.NomineePPName}
                          alt={nom.NomineeName}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-2xl border-2 border-white shadow-sm">
                          {nom.NomineeName?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                          {nom.NomineeName}
                        </p>
                        <p className="text-sm text-slate-500 font-medium">
                          {nom.NomineeRelation} • {nom.NomineeAge} Yrs
                        </p>
                        <Badge
                          variant="secondary"
                          className="mt-2 text-[10px] bg-blue-50 text-blue-700 border-blue-100"
                        >
                          {nom.NomineeAllocation}% Share
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
                  No nominee details available.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Loan Placeholder */}
        <TabsContent value="loan" className="mt-6">
          <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
            <p className="text-slate-500 font-medium">
              Loan information not available for this policy.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
