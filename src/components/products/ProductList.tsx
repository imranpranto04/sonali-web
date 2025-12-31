// "use client";

// import { useState, useMemo } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useLangStore } from "@/store/lang-store";
// import {
//   ArrowRight,
//   Search,
//   ShieldCheck,
//   SlidersHorizontal,
//   X,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// export interface ProductItem {
//   id: number;
//   policyEnglish: string;
//   policyBangla: string;
//   image: string;
//   category: string;
// }

// const FILTERS = [
//   { label: "All", value: "*" },
//   { label: "Savings & Profits", value: "cat1" },
//   { label: "Survival Benefits", value: "cat2" },
//   { label: "Guaranteed Bonus", value: "cat3" },
//   { label: "Child Scheme", value: "cat4" },
//   { label: "Pension", value: "cat6" },
//   { label: "Ritual Scheme", value: "cat7" },
//   { label: "DPS", value: "cat8" },
//   { label: "Micro Scheme", value: "cat9" },
//   { label: "Online Term", value: "cat10" },
// ];

// export default function ProductList({ products }: { products: ProductItem[] }) {
//   const { lang } = useLangStore();
//   const [activeFilter, setActiveFilter] = useState("*");
//   const [searchQuery, setSearchQuery] = useState("");

//   // Memoized filter logic
//   const filteredProducts = useMemo(() => {
//     return products.filter((item) => {
//       const matchesCategory =
//         activeFilter === "*" || item.category === activeFilter;
//       const query = searchQuery.toLowerCase();
//       const matchesSearch =
//         item.policyEnglish.toLowerCase().includes(query) ||
//         item.policyBangla.includes(query);

//       return matchesCategory && matchesSearch;
//     });
//   }, [activeFilter, searchQuery, products]);

//   return (
//     <div className="relative z-20 -mt-24 pb-20">
//       {/* --- 1. SEARCH SECTION (Separated) --- */}
//       <div className="container mx-auto px-4 mb-8">
//         <div className="max-w-xl mx-auto">
//           <div className="relative group">
//             <div className="absolute -inset-1 bg-gradient-to-r from-amber-300 to-orange-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
//             <div className="relative bg-white rounded-2xl shadow-xl flex items-center p-2 border border-slate-100">
//               <div className="pl-4 text-slate-400">
//                 <Search className="w-5 h-5" />
//               </div>
//               <input
//                 type="text"
//                 placeholder={
//                   lang === "bng" ? "পলিসি খুঁজুন..." : "Search for a plan..."
//                 }
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full bg-transparent p-3 outline-none text-slate-800 placeholder:text-slate-400 font-medium"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={() => setSearchQuery("")}
//                   className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- 2. CLEAN FILTER PILLS --- */}
//       <div className="container mx-auto px-4 mb-16">
//         <div className="flex flex-col items-center">
//           {/* Scrollable Container */}
//           <div className="w-full max-w-5xl overflow-x-auto pb-4 scrollbar-hide">
//             <div className="flex gap-2 px-4 md:justify-center min-w-max">
//               {FILTERS.map((filter) => (
//                 <button
//                   key={filter.value}
//                   onClick={() => setActiveFilter(filter.value)}
//                   className={cn(
//                     "px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap border",
//                     activeFilter === filter.value
//                       ? "bg-slate-900 text-white border-slate-900 shadow-lg scale-105"
//                       : "bg-white text-slate-500 border-slate-200 hover:border-amber-400 hover:text-amber-600"
//                   )}
//                 >
//                   {filter.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- 3. PRODUCTS GRID (New Card Design) --- */}
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-8">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((item) => {
//               // Get category label for the yellow band
//               const categoryLabel =
//                 FILTERS.find((f) => f.value === item.category)?.label || "Plan";

//               return (
//                 <Link
//                   href={`/products/${item.id}`}
//                   key={item.id}
//                   className="block h-full"
//                 >
//                   <div className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2">
//                     {/* 1. Image Area with Zoom Effect */}
//                     <div className="relative h-56 overflow-hidden bg-slate-100">
//                       <Image
//                         src={item.image}
//                         alt={item.policyEnglish}
//                         fill
//                         className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
//                         unoptimized
//                       />
//                       {/* Overlay gradient for depth */}
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                     </div>

//                     {/* 2. Title Band (The Yellow Strip) */}
//                     <div className="bg-amber-400 py-3 px-4 relative z-10">
//                       <h3 className="text-center font-bold text-slate-900 text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2">
//                         <ShieldCheck className="w-3 h-3" />
//                         {categoryLabel}
//                       </h3>
//                       {/* Little triangle arrow pointing down */}
//                       <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-amber-400"></div>
//                     </div>

//                     {/* 3. Content Body */}
//                     <div className="flex flex-col grow p-6 pt-8 text-center">
//                       <h4 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-amber-600 transition-colors duration-300 leading-snug">
//                         {lang === "bng"
//                           ? item.policyBangla
//                           : item.policyEnglish}
//                       </h4>

//                       {/* Optional: Add a subtle separator or short text if description is missing */}
//                       <div className="w-12 h-1 bg-slate-100 mx-auto rounded-full mb-6 group-hover:bg-amber-200 transition-colors" />

//                       {/* 4. Action Button with Slide Effect */}
//                       <div className="mt-auto">
//                         <div className="w-full relative overflow-hidden rounded-lg bg-amber-50 py-3 px-6 text-amber-700 font-bold transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white text-sm">
//                           <span className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
//                             {lang === "bng"
//                               ? "বিস্তারিত দেখুন"
//                               : "View Details"}
//                             <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })
//           ) : (
//             /* Empty State */
//             <div className="col-span-full py-20 text-center">
//               <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-slate-100">
//                 <SlidersHorizontal className="w-8 h-8 text-slate-300" />
//               </div>
//               <h3 className="text-xl font-bold text-slate-900">
//                 No products found
//               </h3>
//               <p className="text-slate-400 text-sm mt-2">
//                 Try changing your search or filter.
//               </p>
//               <button
//                 onClick={() => {
//                   setActiveFilter("*");
//                   setSearchQuery("");
//                 }}
//                 className="mt-6 text-amber-600 font-bold text-sm hover:underline"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ProductCard, { ProductItem } from "@/components/common/ProductCard";
import { useLangStore } from "@/store/lang-store";

// 1. Full FILTERS Array (Uncommented)
const FILTERS = [
  { label: "All", value: "*" },
  { label: "Savings & Profits", value: "cat1" },
  { label: "Survival Benefits", value: "cat2" },
  { label: "Guaranteed Bonus", value: "cat3" },
  { label: "Child Scheme", value: "cat4" },
  { label: "Pension", value: "cat6" },
  { label: "Ritual Scheme", value: "cat7" },
  { label: "DPS", value: "cat8" },
  { label: "Micro Scheme", value: "cat9" },
  { label: "Online Term", value: "cat10" },
];

export default function ProductList({ products }: { products: ProductItem[] }) {
  const { lang } = useLangStore();
  const [activeFilter, setActiveFilter] = useState("*");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        activeFilter === "*" || item.category === activeFilter;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.policyEnglish.toLowerCase().includes(query) ||
        item.policyBangla.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery, products]);

  return (
    <div className="relative z-20 -mt-24 pb-20">
      {/* 1. SEARCH SECTION */}
      <div className="container mx-auto px-4 mb-8">
        <div className="max-w-xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-amber-300 to-orange-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white rounded-2xl shadow-xl flex items-center p-1 border border-slate-100">
              <div className="pl-4 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                // Add hydration warning here too if needed, though placeholder usually doesn't trigger it as strictly
                suppressHydrationWarning={true}
                placeholder={
                  lang === "bng" ? "পলিসি খুঁজুন..." : "Search for a plan..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent p-2 outline-none text-slate-800 placeholder:text-slate-400 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. FILTER PILLS */}
      <div className="container mx-auto px-4 mb-16">
        <div className="flex flex-col items-center">
          <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-2 px-3 md:justify-center min-w-max">
              {FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap border",
                    activeFilter === filter.value
                      ? "bg-slate-900 text-white border-slate-900 shadow-lg scale-105"
                      : "bg-white text-slate-500 border-slate-200 hover:border-amber-400 hover:text-amber-600"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. PRODUCTS GRID */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-slate-100">
                <SlidersHorizontal className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                No products found
              </h3>
              <p className="text-slate-400 text-sm mt-2">
                Try changing your search or filter.
              </p>
              <button
                onClick={() => {
                  setActiveFilter("*");
                  setSearchQuery("");
                }}
                className="mt-6 text-amber-600 font-bold text-sm hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
