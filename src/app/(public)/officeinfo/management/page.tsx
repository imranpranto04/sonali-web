import type { Metadata } from "next";

import { ShieldCheck } from "lucide-react";
import { getManagementTeam } from "@/lib/api/company-service";
import ManagementGrid from "@/components/OfficeInfo/ManagementGrid";

export const metadata: Metadata = {
  title: "Management Team | Sonali Life Insurance",
  description:
    "Meet the executive leadership team driving innovation and trust.",
};

export default async function ManagementPage() {
  const team = await getManagementTeam();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* --- 1. IMMERSIVE HERO SECTION --- */}
      <div className="relative h-[60vh] min-h-[500px] w-full bg-[#1e5b98] overflow-hidden flex flex-col items-center justify-center text-white">
        {/* Abstract Background Art */}
        <div className="absolute inset-0 opacity-[0.05]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center -mt-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full mb-8 shadow-xl">
            <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-50">
              Leadership
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Visionary{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-200 to-orange-400">
              Leaders
            </span>
          </h1>

          <p className="text-slate-200 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Guiding Sonali Life with integrity, innovation, and a commitment to
            your secure future.
          </p>
        </div>
      </div>

      {/* --- 2. FLOATING CONTENT CONTAINER --- */}
      <div className="container mx-auto px-4 relative z-20 -mt-32 pb-24">
        <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-white/60 p-8 md:p-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-200/60 pb-10 mb-16">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-slate-800">
                Management Department
              </h2>
              <p className="text-slate-500 mt-2">
                The minds behind our success strategy
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
              <div className="p-2 bg-green-100 text-green-600 rounded-full">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Experience
                </p>
                <p className="text-sm font-bold text-slate-700">Leadership</p>
              </div>
            </div>
          </div>

          {/* Grid Component */}
          <ManagementGrid team={team} />
        </div>
      </div>
    </div>
  );
}
