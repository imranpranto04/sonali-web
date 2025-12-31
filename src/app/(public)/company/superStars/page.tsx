import type { Metadata } from "next";

import { Crown } from "lucide-react";
import { getSuperstarData } from "@/lib/api/company-service";
import SuperstarView from "@/components/company/SuperstarView";

// --- 1. Dynamic SEO Metadata ---
export async function generateMetadata(): Promise<Metadata> {
  const data = await getSuperstarData();
  const title = data
    ? `Superstars of ${data.month} ${data.year} | Sonali Life Insurance`
    : "Company Superstars | Sonali Life Insurance";

  return {
    title: title,
    description:
      "Meet the top performing agents and employees of Sonali Life Insurance for this month. Celebrating excellence and dedication.",
  };
}

// --- 2. Server Component ---
export default async function SuperstarPage() {
  // Fetch data directly on the server
  const data = await getSuperstarData();

  if (!data || data.categories.length === 0) {
    return <div className="py-20 text-center">Data currently unavailable.</div>;
  }

  // --- 3. Pass data to Client Component ---
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Hero Section - Static content renders immediately for SEO */}
      <div className="relative bg-[#1e5b98] text-white py-20 overflow-hidden">
        {/* Decorative Backgrounds... */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-6">
            <Crown className="w-4 h-4 text-orange-300" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Hall of Fame
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Superstars of {data.month}{" "}
            <span className="text-orange-400">{data.year}</span>
          </h1>
          <p className="text-slate-200 max-w-2xl mx-auto text-lg">
            Honoring the exceptional dedication and outstanding achievements of
            our Sonali Life family.
          </p>
        </div>
      </div>

      {/* The Interactive Part (Tabs/Grid) */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <SuperstarView data={data} />
      </div>
    </div>
  );
}
