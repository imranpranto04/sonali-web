// import {
//   ArrowRight,
//   GraduationCap,
//   Shield,
//   HeartHandshake,
// } from "lucide-react";
// import Image from "next/image";

// // --- TYPES ---
// interface InsurancePlan {
//   id: string;
//   title: string;
//   image: string;
//   headline: string;
//   description: string;
//   icon?: React.ReactNode; // Optional icon for visual flair
// }

// function ProductCard({ plan }: { plan: InsurancePlan }) {
//   return (
//     <>
//       <div className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2">
//         {/* 1. Image Area with Zoom Effect */}
//         <div className="relative h-56 overflow-hidden">
//           {/* <div className="absolute inset-0 bg-slate-200 animate-pulse" /> */}
//           <div className="absolute inset-0" />
//           {/* Loading Skeleton Placeholder */}
//           <Image
//             src={plan.image}
//             alt={plan.headline}
//             height={450}
//             width={500}
//             className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
//           />
//           {/* Overlay gradient for depth */}
//           <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//         </div>

//         {/* 2. Title Band (The Yellow Strip) */}
//         <div className="bg-amber-400 py-3 px-4 relative z-10">
//           <h3 className="text-center font-bold text-slate-900 text-sm md:text-base uppercase tracking-wide flex items-center justify-center gap-2">
//             {plan.icon}
//             {plan.title}
//           </h3>
//           {/* Little triangle arrow pointing down from the band (CSS trick) */}
//           <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-amber-400"></div>
//         </div>

//         {/* 3. Content Body */}
//         <div className="flex flex-col grow p-6 pt-8 text-center">
//           <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-amber-600 transition-colors duration-300">
//             {plan.headline}
//           </h4>
//           <p className="text-slate-600 text-sm leading-relaxed mb-6 grow">
//             {plan.description}
//           </p>

//           {/* 4. Action Button with Slide Effect */}
//           <div className="mt-auto">
//             <button className="w-full relative overflow-hidden rounded-lg bg-amber-400/20 py-3 px-6 text-goldenrod font-bold transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
//               <span className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
//                 View Details
//                 <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProductCard;
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useLangStore } from "@/store/lang-store";

export interface ProductItem {
  id: number;
  policyEnglish: string;
  policyBangla: string;
  image: string;
  category: string;
}

// 1. Updated Category Map with ALL options
const getCategoryLabel = (cat: string) => {
  const map: Record<string, string> = {
    cat1: "Savings & Profit",
    cat2: "Survival Benefit",
    cat3: "Guaranteed Bonus",
    cat4: "Child Protection",
    cat6: "Pension Plan",
    cat7: "Ritual Scheme",
    cat8: "DPS",
    cat9: "Micro Scheme",
    cat10: "Online Term",
    "*": "Insurance Plan",
  };
  return map[cat] || "Life Insurance";
};

export default function ProductCard({ item }: { item: ProductItem }) {
  const { lang } = useLangStore();

  return (
    <Link href={`/products/${item.id}`} className="block h-full group">
      <article className="relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-all duration-500 ease-out group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] group-hover:-translate-y-2">
        {/* Image Area */}
        <div className="relative h-56 overflow-hidden bg-slate-100">
          <Image
            src={item.image}
            alt={item.policyEnglish}
            fill
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Category Band */}
        <div className="bg-amber-400 py-2.5 px-4 relative z-10">
          <span className="flex items-center justify-center gap-1.5 text-center font-bold text-slate-900 text-[11px] uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            {getCategoryLabel(item.category)}
          </span>
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-amber-400"></div>
        </div>

        {/* Content Body */}
        <div className="flex flex-col grow p-6 pt-8 text-center">
          {/* 2. HYDRATION FIX: 
             Added suppressHydrationWarning because this text changes between 
             server (English default) and client (Bangla preference).
          */}
          <h3
            suppressHydrationWarning={true}
            className="text-lg font-bold text-slate-800 mb-4 group-hover:text-amber-600 transition-colors duration-300 leading-snug"
          >
            {lang === "bng" ? item.policyBangla : item.policyEnglish}
          </h3>

          <div className="w-10 h-1 bg-slate-100 mx-auto rounded-full mb-6 group-hover:bg-amber-300 transition-colors" />

          <div className="mt-auto">
            <div className="w-full rounded-xl bg-slate-50 border border-slate-500 py-3 px-6 text-slate-600 font-bold text-sm transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 flex items-center justify-center gap-2 overflow-hidden">
              {/* 3. HYDRATION FIX for Button Text */}
              <span suppressHydrationWarning={true}>
                {lang === "bng" ? "বিস্তারিত দেখুন" : "View Details"}
              </span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
