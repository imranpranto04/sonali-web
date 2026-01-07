import { Metadata } from "next";
import FinancialsClient from "@/components/financials/FinancialsClient";
import { FinancialsResponse } from "@/types/financials";
import { fetchPublicSingle } from "@/lib/api/api-server-public";

export const metadata: Metadata = {
  title: "Financial Reports & Disclosures | Sonali Life Insurance",
  description:
    "Annual Reports, Quarterly Statements, and Corporate Governance.",
};

// FIX: Type definition for Next.js 15+ searchParams
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function FinancialsPage({ searchParams }: Props) {
  // 1. Await the params before accessing properties
  const params = await searchParams;

  // 2. Safely access the lang property
  const lang = params?.lang === "bng" ? "bng" : "eng";

  // 3. Fetch Data Server-Side
  const data = await fetchPublicSingle<FinancialsResponse>("financials", {
    method: "POST",
    body: { lang },
    revalidate: 0,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 pt-36 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" />
        <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 border border-white/10 text-amber-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
            Public Disclosure
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Financial{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500">
              Reports
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Access our latest Annual Reports, Quarterly Statements, PSI, and
            Corporate Governance disclosures in real-time.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <FinancialsClient data={data} lang="eng" />
    </div>
  );
}
