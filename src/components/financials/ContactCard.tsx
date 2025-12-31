"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, User, ShieldCheck } from "lucide-react";
import { ContactPerson } from "@/types/financials";

export default function ContactCard({ person }: { person: ContactPerson }) {
  const [imgError, setImgError] = useState(false);

  // console.log("Investor Relations", person);
  return (
    <div className="group relative bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
      {/* Decorative linear Background (Top) */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-slate-50 to-transparent opacity-50" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Avatar Container */}
        <div className="relative w-28 h-28 mb-5">
          {/* Outer Ring Effect */}
          <div className="absolute -inset-1 rounded-full bg-linear-to-tr from-amber-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-md" />

          <div className="relative w-full h-full rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-100 flex items-center justify-center">
            {!imgError && person.image ? (
              <Image
                src={person.image}
                alt={person.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                onError={() => setImgError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized={true}
              />
            ) : (
              <User className="w-10 h-10 text-slate-300" />
            )}
          </div>

          {/* Verification Badge */}
          <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-500 fill-emerald-50" />
          </div>
        </div>

        {/* Info */}
        <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
          {person.name}
        </h3>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 px-3 py-1 rounded-full bg-slate-50 border border-slate-100">
          {person.designation}
        </p>

        {/* Actions */}
        <div className="w-full space-y-3">
          <a
            href={`tel:${person.mobile}`}
            className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-900 hover:text-white transition-all duration-300 group/btn border border-slate-100 hover:border-slate-900"
          >
            <Phone className="w-4 h-4 text-amber-500 group-hover/btn:text-amber-400" />
            <span className="text-sm font-bold">{person.mobile}</span>
          </a>

          <a
            href={`mailto:${person.email}`}
            className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-900 hover:text-white transition-all duration-300 group/btn border border-slate-100 hover:border-slate-900"
          >
            <Mail className="w-4 h-4 text-amber-500 group-hover/btn:text-amber-400" />
            <span className="text-sm font-bold truncate max-w-[200px]">
              {person.email}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
