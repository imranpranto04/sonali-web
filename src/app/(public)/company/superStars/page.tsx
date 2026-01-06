// import type { Metadata } from "next";

// import { Crown } from "lucide-react";
// import { getSuperstarData } from "@/lib/api/company-service";
// import SuperstarView from "@/components/company/SuperstarView";

// // --- 1. Dynamic SEO Metadata ---
// export async function generateMetadata(): Promise<Metadata> {
//   const data = await getSuperstarData();
//   const title = data
//     ? `Superstars of ${data.month} ${data.year} | Sonali Life Insurance`
//     : "Company Superstars | Sonali Life Insurance";

//   return {
//     title: title,
//     description:
//       "Meet the top performing agents and employees of Sonali Life Insurance for this month. Celebrating excellence and dedication.",
//   };
// }

// // --- 2. Server Component ---
// export default async function SuperstarPage() {
//   // Fetch data directly on the server
//   const data = await getSuperstarData();

//   if (!data || data.categories.length === 0) {
//     return <div className="py-20 text-center">Data currently unavailable.</div>;
//   }

//   // --- 3. Pass data to Client Component ---
//   return (
//     <div className="min-h-screen bg-slate-50/50 pb-20">
//       {/* Hero Section - Static content renders immediately for SEO */}
//       <div className="relative bg-[#1e5b98] text-white py-20 overflow-hidden">
//         {/* Decorative Backgrounds... */}
//         <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

//         <div className="container mx-auto px-4 relative z-10 text-center">
//           <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-6">
//             <Crown className="w-4 h-4 text-orange-300" />
//             <span className="text-xs font-bold uppercase tracking-widest">
//               Hall of Fame
//             </span>
//           </div>
//           <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
//             Superstars of {data.month}{" "}
//             <span className="text-orange-400">{data.year}</span>
//           </h1>
//           <p className="text-slate-200 max-w-2xl mx-auto text-lg">
//             Honoring the exceptional dedication and outstanding achievements of
//             our Sonali Life family.
//           </p>
//         </div>
//       </div>

//       {/* The Interactive Part (Tabs/Grid) */}
//       <div className="container mx-auto px-4 -mt-8 relative z-20">
//         <SuperstarView data={data} />
//       </div>
//     </div>
//   );
// }
import type { Metadata } from "next";
import { Crown } from "lucide-react";
import { getSuperstarData } from "@/lib/api/company-service";
import SuperstarView from "@/components/company/SuperstarView";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSuperstarData();
  const title = data
    ? `Superstars - ${data.month} ${data.year} | Sonali Life`
    : "Superstars | Sonali Life";

  return {
    title: title,
    description:
      "Honoring the top performing employees and agents of Sonali Life Insurance.",
  };
}

export default async function SuperstarPage() {
  const data = await getSuperstarData();

  if (!data || data.categories.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 text-slate-400 gap-4">
        <Crown className="w-10 h-10 opacity-20" />
        <p>Superstar data is currently being updated.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* --- PREMIUM HERO SECTION --- */}
      <div className="relative bg-brand pt-32 pb-40 overflow-hidden">
        {/* Abstract Background Art */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/4" />
        <div className="absolute inset-0 bg-[url('/assets/bg/grid-pattern.svg')] bg-size-[40px_40px] opacity-[0.03] mix-blend-overlay" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-5 py-2 rounded-full mb-8 shadow-2xl animate-fade-in">
            <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-100">
              Wall of Excellence
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none animate-fade-in-up">
            Superstars of <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-400 to-amber-600">
              {data.month} {data.year}
            </span>
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed animate-fade-in-up delay-100">
            Celebrating the visionaries and top performers driving our success.
          </p>
        </div>
      </div>

      {/* --- CONTENT AREA (Overlapping) --- */}
      <div className="relative z-20 -mt-24 pb-24">
        <div className="container mx-auto px-4">
          <SuperstarView data={data} />
        </div>
      </div>
    </div>
  );
}
