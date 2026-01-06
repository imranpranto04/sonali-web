import type { Metadata } from "next";
import { Scale } from "lucide-react";
import BoardAffairsList from "@/components/OfficeInfo/BoardAffairsList";

export const metadata: Metadata = {
  title: "Board Affairs | Sonali Life Insurance",
  description: "Meet the Board Affairs and Secretariat team.",
};

export default function BoardAffairsPage() {
  // We are skipping server fetch here because it was failing.
  // The client component will fetch data immediately on mount.

  return (
    <div className="min-h-screen bg-slate-50">
      {/* --- HEADER --- */}
      <div className="relative bg-brand pt-32 pb-40 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/4" />
        <div className="absolute inset-0 bg-size-[40px_40px] opacity-[0.05] mix-blend-overlay" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-5 py-2 rounded-full mb-8 shadow-xl animate-fade-in">
            <Scale className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-100">
              Corporate Governance
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight animate-fade-in-up">
            Board Affairs <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500">
              Secretariat
            </span>
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed animate-fade-in-up delay-100">
            Ensuring transparency, compliance, and excellence in corporate
            governance.
          </p>
        </div>
      </div>

      {/* --- CONTENT --- */}
      <div className="container mx-auto px-4 mt-15 relative z-20 pb-20">
        <BoardAffairsList initialData={[]} />
      </div>
    </div>
  );
}
