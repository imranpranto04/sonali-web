"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Building2,
  Navigation,
  Check,
  Copy,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Branch } from "@/types/branch";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

// --- HELPER TO FIX API URLS ---
const getCleanMapUrl = (url: string) => {
  if (!url) return null;
  // 1. Remove backslashes used for escaping in some DBs
  let clean = url.replace(/\\/g, "");
  // 2. Validate it's a real google maps embed link
  if (clean.includes("google.com/maps/embed")) {
    return clean;
  }
  return null;
};

export default function BranchCard({
  branch,
  districtName,
}: {
  branch: Branch;
  districtName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Clean the data for display
  const cleanAddress = branch.BranchAddress.replace(/\\n/g, ", ");
  const validMapUrl = getCleanMapUrl(branch.MapLocation);

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 relative">
      {/* Visual Cue Top Bar */}
      <div className="h-2 w-full bg-linear-to-r from-slate-200 via-amber-200 to-orange-400 opacity-70 group-hover:opacity-100 transition-opacity" />

      {/* Header */}
      <div className="px-6 pt-6 pb-2 flex justify-between items-start">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:bg-amber-50 group-hover:text-amber-700 group-hover:border-amber-100 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-current" />
            {districtName || branch.Division}
          </span>
          <h3 className="text-lg font-bold text-slate-900 leading-tight pt-2 group-hover:text-amber-600 transition-colors">
            {branch.BranchName}
          </h3>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
          <Building2 className="w-5 h-5" />
        </div>
      </div>

      {/* Body */}
      <div className="p-6 pt-2 flex flex-col gap-5 grow">
        <div className="relative pl-4 border-l-2 border-slate-100 group-hover:border-amber-400 transition-colors duration-500">
          <p className="text-sm text-slate-600 leading-relaxed font-medium line-clamp-3">
            {cleanAddress}
          </p>
          <button
            onClick={handleCopy}
            className="mt-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-900 transition-colors"
          >
            {copied ? (
              <Check className="w-3 h-3 text-green-500" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            {copied ? "Copied" : "Copy Address"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 bg-slate-50/50 border-t border-slate-100 grid grid-cols-2 gap-3">
        {/* Call */}
        {branch.BranchContactNumber ? (
          <a
            href={`tel:${branch.BranchContactNumber}`}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wide hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" /> Call
          </a>
        ) : (
          <button
            disabled
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 border border-transparent text-slate-300 text-xs font-bold uppercase tracking-wide cursor-not-allowed"
          >
            <Phone className="w-3.5 h-3.5" /> N/A
          </button>
        )}

        {/* Map */}
        {validMapUrl ? (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wide hover:bg-amber-500 hover:shadow-lg hover:shadow-amber-200 transition-all shadow-md group/map">
                <Navigation className="w-3.5 h-3.5 transition-transform group-hover/map:-translate-y-0.5 group-hover/map:translate-x-0.5" />
                Map
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl h-[80vh] p-0 overflow-hidden bg-white border-none rounded-2xl shadow-2xl">
              <VisuallyHidden.Root>
                <DialogTitle>{branch.BranchName} Map</DialogTitle>
              </VisuallyHidden.Root>
              <iframe
                src={validMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </DialogContent>
          </Dialog>
        ) : (
          <button
            disabled
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 border border-transparent text-slate-300 text-xs font-bold uppercase tracking-wide cursor-not-allowed"
          >
            <AlertCircle className="w-3.5 h-3.5" /> No Map
          </button>
        )}
      </div>
    </article>
  );
}
