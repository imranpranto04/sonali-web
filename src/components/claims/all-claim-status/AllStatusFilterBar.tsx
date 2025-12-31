// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation"; // For redirection
// import { Search, Filter, RefreshCcw } from "lucide-react";
// import { AllStatusFilterParams } from "@/types/all-claim-status";

// interface Props {
//   onFilter: (params: AllStatusFilterParams) => void;
//   loading: boolean;
// }

// export default function AllStatusFilterBar({ onFilter, loading }: Props) {
//   const router = useRouter(); // Hook for navigation
//   const currentYear = new Date().getFullYear();
//   const years = Array.from(
//     { length: currentYear - 2013 + 1 },
//     (_, i) => currentYear - i
//   );

//   const [filters, setFilters] = useState<AllStatusFilterParams>({
//     year: currentYear.toString(),
//     month: "0",
//     policyId: "",
//     status: "0",
//     claimType: "Death Claim",
//   });

//   // Handle Category Change (Redirection Logic)
//   const handleCategoryChange = (val: string) => {
//     if (val === "Group Claim") {
//       // Redirect to the future Group Claim page
//       router.push("/claims/group-status");
//     }
//     // If "Individual Claim", we just stay here (default)
//   };

//   const handleChange = (field: keyof AllStatusFilterParams, value: string) => {
//     setFilters((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onFilter(filters);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 mb-8"
//     >
//       <div className="flex items-center gap-2 mb-6 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-100 pb-4">
//         <Filter className="w-4 h-4" /> Filter Criteria
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* 1. Claim Category (New Field) */}
//         <div className="space-y-2">
//           <label className="text-sm font-bold text-slate-700">
//             Claim Category
//           </label>
//           <div className="relative">
//             <select
//               className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
//               defaultValue="Individual Claim"
//               onChange={(e) => handleCategoryChange(e.target.value)}
//             >
//               <option value="Individual Claim">Individual Claim</option>
//               <option value="Group Claim">Group Claim</option>
//             </select>
//             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
//               ▼
//             </div>
//           </div>
//         </div>

//         {/* 2. Claim Type */}
//         <div className="space-y-2">
//           <label className="text-sm font-bold text-slate-700">Claim Type</label>
//           <div className="relative">
//             <select
//               className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
//               value={filters.claimType}
//               onChange={(e) => handleChange("claimType", e.target.value)}
//             >
//               <option value="Death Claim">Death Claim</option>
//               <option value="Supplementary Claim">Supplementary Claim</option>
//               <option value="Full Maturity Claim">Full Maturity Claim</option>
//               <option value="Surrender Claim">Surrender Claim</option>
//               <option value="Survival Benefit Claim">
//                 Survival Benefit Claim
//               </option>
//               <option value="Nominee Death Claim">Nominee Death Claim</option>
//             </select>
//             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
//               ▼
//             </div>
//           </div>
//         </div>

//         {/* 3. Year */}
//         <div className="space-y-2">
//           <label className="text-sm font-bold text-slate-700">Year</label>
//           <div className="relative">
//             <select
//               className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
//               value={filters.year}
//               onChange={(e) => handleChange("year", e.target.value)}
//             >
//               {years.map((y) => (
//                 <option key={y} value={y}>
//                   {y}
//                 </option>
//               ))}
//             </select>
//             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
//               ▼
//             </div>
//           </div>
//         </div>

//         {/* 4. Month */}
//         <div className="space-y-2">
//           <label className="text-sm font-bold text-slate-700">Month</label>
//           <div className="relative">
//             <select
//               className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
//               value={filters.month}
//               onChange={(e) => handleChange("month", e.target.value)}
//             >
//               <option value="0">All Months</option>
//               <option value="1">January</option>
//               <option value="2">February</option>
//               <option value="3">March</option>
//               <option value="4">April</option>
//               <option value="5">May</option>
//               <option value="6">June</option>
//               <option value="7">July</option>
//               <option value="8">August</option>
//               <option value="9">September</option>
//               <option value="10">October</option>
//               <option value="11">November</option>
//               <option value="12">December</option>
//             </select>
//             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
//               ▼
//             </div>
//           </div>
//         </div>

//         {/* 5. Status */}
//         <div className="space-y-2">
//           <label className="text-sm font-bold text-slate-700">Status</label>
//           <div className="relative">
//             <select
//               className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
//               value={filters.status}
//               onChange={(e) => handleChange("status", e.target.value)}
//             >
//               <option value="0">All Status</option>
//               <option value="2">Under Processing</option>
//               <option value="3">Approved</option>
//               <option value="5">Rejected</option>
//               <option value="6">Paid</option>
//             </select>
//             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
//               ▼
//             </div>
//           </div>
//         </div>

//         {/* 6. Policy ID */}
//         <div className="space-y-2">
//           <label className="text-sm font-bold text-slate-700">
//             Policy ID (Optional)
//           </label>
//           <input
//             type="text"
//             placeholder="e.g. 989832"
//             className="w-full bg-slate-50 border border-slate-200 text-slate-900 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
//             value={filters.policyId}
//             onChange={(e) => handleChange("policyId", e.target.value)}
//           />
//         </div>

//         {/* 7. Action Button (Full Width on Mobile) */}
//         <div className="flex items-end md:col-span-2 lg:col-span-3">
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-slate-900 text-white py-3 px-6 rounded-xl font-bold hover:bg-amber-500 transition-all duration-300 shadow-lg shadow-slate-900/20 disabled:opacity-70 flex items-center justify-center gap-2"
//           >
//             {loading ? (
//               <RefreshCcw className="w-5 h-5 animate-spin" />
//             ) : (
//               <Search className="w-5 h-5" />
//             )}
//             View Claims
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  RefreshCcw,
  Layers,
  FileType,
  Calendar,
  CalendarDays,
  Activity,
  Hash,
  ChevronDown,
} from "lucide-react";
import { AllStatusFilterParams } from "@/types/all-claim-status";
import { cn } from "@/lib/utils";

interface Props {
  onFilter: (params: AllStatusFilterParams) => void;
  loading: boolean;
}

export default function AllStatusFilterBar({ onFilter, loading }: Props) {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2013 + 1 },
    (_, i) => currentYear - i
  );

  const [filters, setFilters] = useState<AllStatusFilterParams>({
    year: currentYear.toString(),
    month: "0",
    policyId: "",
    status: "0",
    claimType: "Death Claim",
  });

  const handleCategoryChange = (val: string) => {
    if (val === "Group Claim") {
      router.push("/claims/group-status");
    }
  };

  const handleChange = (field: keyof AllStatusFilterParams, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 mb-10 relative overflow-hidden"
    >
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-6 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-sm">
          <Filter className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Filter Claims</h3>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
            Refine your search criteria
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 relative z-10">
        {/* 1. CLAIM CATEGORY */}
        <div className="group relative">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">
            Category
          </label>
          <div className="relative bg-slate-50 hover:bg-white focus-within:bg-white border border-slate-200 focus-within:border-amber-500 rounded-2xl transition-all duration-300 shadow-sm group-hover:shadow-md">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Layers className="w-4 h-4" />
            </div>
            <select
              className="w-full bg-transparent py-3.5 pl-11 pr-10 text-sm font-bold text-slate-700 outline-none appearance-none cursor-pointer"
              defaultValue="Individual Claim"
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="Individual Claim">Individual Claim</option>
              <option value="Group Claim">Group Claim</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* 2. CLAIM TYPE */}
        <div className="group relative">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">
            Claim Type
          </label>
          <div className="relative bg-slate-50 hover:bg-white focus-within:bg-white border border-slate-200 focus-within:border-amber-500 rounded-2xl transition-all duration-300 shadow-sm group-hover:shadow-md">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <FileType className="w-4 h-4" />
            </div>
            <select
              className="w-full bg-transparent py-3.5 pl-11 pr-10 text-sm font-bold text-slate-700 outline-none appearance-none cursor-pointer"
              value={filters.claimType}
              onChange={(e) => handleChange("claimType", e.target.value)}
            >
              <option value="Death Claim">Death Claim</option>
              <option value="Supplementary Claim">Supplementary Claim</option>
              <option value="Full Maturity Claim">Full Maturity Claim</option>
              <option value="Surrender Claim">Surrender Claim</option>
              <option value="Survival Benefit Claim">
                Survival Benefit Claim
              </option>
              <option value="Nominee Death Claim">Nominee Death Claim</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* 3. YEAR */}
        <div className="group relative">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">
            Year
          </label>
          <div className="relative bg-slate-50 hover:bg-white focus-within:bg-white border border-slate-200 focus-within:border-amber-500 rounded-2xl transition-all duration-300 shadow-sm group-hover:shadow-md">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Calendar className="w-4 h-4" />
            </div>
            <select
              className="w-full bg-transparent py-3.5 pl-11 pr-10 text-sm font-bold text-slate-700 outline-none appearance-none cursor-pointer"
              value={filters.year}
              onChange={(e) => handleChange("year", e.target.value)}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* 4. MONTH */}
        <div className="group relative">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">
            Month
          </label>
          <div className="relative bg-slate-50 hover:bg-white focus-within:bg-white border border-slate-200 focus-within:border-amber-500 rounded-2xl transition-all duration-300 shadow-sm group-hover:shadow-md">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <CalendarDays className="w-4 h-4" />
            </div>
            <select
              className="w-full bg-transparent py-3.5 pl-11 pr-10 text-sm font-bold text-slate-700 outline-none appearance-none cursor-pointer"
              value={filters.month}
              onChange={(e) => handleChange("month", e.target.value)}
            >
              <option value="0">All Months</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* 5. STATUS */}
        <div className="group relative">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">
            Status
          </label>
          <div className="relative bg-slate-50 hover:bg-white focus-within:bg-white border border-slate-200 focus-within:border-amber-500 rounded-2xl transition-all duration-300 shadow-sm group-hover:shadow-md">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Activity className="w-4 h-4" />
            </div>
            <select
              className="w-full bg-transparent py-3.5 pl-11 pr-10 text-sm font-bold text-slate-700 outline-none appearance-none cursor-pointer"
              value={filters.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="0">All Status</option>
              <option value="2">Under Processing</option>
              <option value="3">Approved</option>
              <option value="5">Rejected</option>
              <option value="6">Paid</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* 6. POLICY ID */}
        <div className="group relative">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">
            Policy ID{" "}
            <span className="text-slate-300 normal-case tracking-normal">
              (Optional)
            </span>
          </label>
          <div className="relative bg-slate-50 hover:bg-white focus-within:bg-white border border-slate-200 focus-within:border-amber-500 rounded-2xl transition-all duration-300 shadow-sm group-hover:shadow-md">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Hash className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="e.g. 989832"
              className="w-full bg-transparent py-3.5 pl-11 pr-4 text-sm font-bold text-slate-900 placeholder:text-slate-400 outline-none"
              value={filters.policyId}
              onChange={(e) => handleChange("policyId", e.target.value)}
            />
          </div>
        </div>

        {/* 7. ACTION BUTTON */}
        <div className="md:col-span-2 lg:col-span-3 xl:col-span-2 flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[52px] bg-slate-900 text-white rounded-2xl font-bold hover:bg-amber-500 transition-all duration-300 shadow-lg shadow-slate-900/20 disabled:opacity-70 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
          >
            {/* Hover shine effect */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />

            {loading ? (
              <RefreshCcw className="w-5 h-5 animate-spin relative z-10" />
            ) : (
              <Search className="w-5 h-5 relative z-10 group-hover/btn:scale-110 transition-transform" />
            )}
            <span className="relative z-10 uppercase tracking-wide text-xs md:text-sm">
              View Claims
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
