"use client";

import Link from "next/link";
import { DownloadForm } from "@/lib/api/company-service";
import {
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDownFormsContent } from "@/hooks/content/use-downloadForms-content";

export default function DownloadFormsView({
  forms,
}: {
  forms: DownloadForm[];
}) {
  const content = useDownFormsContent();

  return (
    <div className="animate-in fade-in duration-700">
      {/* --- 1. HERO HEADER (Unchanged) --- */}
      <div className="relative bg-brand pt-32 pb-24 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
        <div className="absolute inset-0 bg-size-[40px_40px] opacity-[0.05] mix-blend-overlay" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-5 py-2 rounded-full mb-8 shadow-xl">
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-100">
              {content.hero.subtitle}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            {content.hero.title}
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
            {content.hero.desc}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 pb-24 relative z-20 space-y-16">
        {/* --- 2. STATIC SECTION: WHY CHOOSE US (Unchanged) --- */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
          {/* Section Header */}
          <div className="text-center mb-10 relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-50 text-amber-600 mb-4 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-black text-brand mb-2">
              {content.whyChoose.title}
            </h2>
            <p className="text-slate-500 font-medium">
              {content.whyChoose.subtitle}
            </p>
          </div>

          {/* Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 relative z-10">
            {content.whyChoose.points.map((point, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-medium group-hover:text-brand">
                  {point}
                </p>
              </div>
            ))}
          </div>
          {/* Decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        </div>

        {/* --- 3. COMPACT FORMS GRID --- */}
        <div>
          <div className="flex items-center gap-3 mb-6 px-1">
            <FileText className="w-5 h-5 text-amber-500" />
            <h3 className="text-xl font-bold text-brand">
              {content.downloads.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {forms && forms.length > 0 ? (
              forms.map((form) => (
                <div
                  key={form.id}
                  className="group bg-white rounded-2xl border border-slate-200 p-5 hover:border-amber-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden"
                >
                  {/* Top Row: Icon + Meta */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                      <FileText className="w-5 h-5" />{" "}
                      {/* <span className="text-[10px] ml-2">{form.id}</span> */}
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100 uppercase tracking-wider">
                      PDF
                    </span>
                  </div>

                  {/* Content */}
                  <h4
                    className="text-base font-bold text-brand mb-1 line-clamp-1 group-hover:text-amber-600 transition-colors text-center"
                    title={form.title}
                  >
                    {form.title}
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 h-8 leading-relaxed text-center">
                    {form.description || "Official document."}
                  </p>

                  {/* Action Button - Compact */}
                  <div className="mt-auto pt-4 border-t border-slate-100 border-dashed">
                    {form.pdfUrl ? (
                      <Link
                        href={form.pdfUrl}
                        target="_blank"
                        className="w-full"
                      >
                        <Button
                          size="sm"
                          className="w-full bg-slate-300 hover:bg-brand text-brand hover:text-white font-semibold h-9 rounded-lg transition-colors text-xs gap-2"
                        >
                          <Download className="w-3.5 h-3.5" />{" "}
                          {content.downloads.btnPdf}
                        </Button>
                      </Link>
                    ) : form.link ? (
                      <Link href={form.link} target="_blank" className="w-full">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full h-9 rounded-lg text-xs gap-2"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />{" "}
                          {content.downloads.btnLink}
                        </Button>
                      </Link>
                    ) : null}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-400 text-sm italic">
                  {content.downloads.empty}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
