"use client";

import { useState } from "react";
import {
  ChevronDown,
  Download,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CLAIM_TYPES } from "@/data/claims-info-data";

export default function ClaimsInfo() {
  const [activeTab, setActiveTab] = useState(CLAIM_TYPES[0].id);
  // Default the first accordion to be open for better UX
  const [openSection, setOpenSection] = useState<string | null>(
    CLAIM_TYPES[0].sections[0].title
  );

  const activeData = CLAIM_TYPES.find((c) => c.id === activeTab);

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <div className="container mx-auto px-4 -mt-20 relative z-20 pb-20">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* --- LEFT SIDEBAR --- */}
        <div className="md:w-1/3 lg:w-1/4 bg-slate-50 border-r border-slate-100 p-6 flex flex-col gap-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 pl-2">
            Claim Categories
          </h3>
          {CLAIM_TYPES.map((type) => {
            const Icon = type.icon;
            const isActive = activeTab === type.id;
            return (
              <button
                key={type.id}
                onClick={() => {
                  setActiveTab(type.id);
                  setOpenSection(type.sections[0].title); // Auto-open first section
                }}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 relative overflow-hidden group",
                  isActive
                    ? "bg-white shadow-lg shadow-slate-200/50 text-slate-900 ring-1 ring-slate-200"
                    : "text-slate-500 hover:bg-white hover:text-slate-700"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />
                )}
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0",
                    isActive
                      ? "bg-amber-500 text-white"
                      : "bg-slate-200 text-slate-400 group-hover:bg-slate-100"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-sm">{type.label}</span>
                </div>
              </button>
            );
          })}

          {/* Download Box */}
          <div className="mt-auto pt-8">
            <div className="bg-slate-900 rounded-2xl p-5 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500 rounded-full blur-[50px] opacity-20 -translate-y-1/2 translate-x-1/2" />
              <h4 className="font-bold mb-2 text-sm relative z-10">
                Start Your Claim
              </h4>
              <p className="text-xs text-slate-400 mb-4 relative z-10 leading-relaxed">
                Download the official claim form pdf to submit offline.
              </p>
              <button className="w-full py-2.5 bg-white text-slate-900 rounded-xl text-xs font-bold uppercase tracking-wide hover:bg-amber-500 hover:text-white transition-colors flex items-center justify-center gap-2 shadow-lg">
                <Download className="w-3.5 h-3.5" /> Download Form
              </button>
            </div>
          </div>
        </div>

        {/* --- RIGHT CONTENT --- */}
        <div className="flex-1 p-8 md:p-12 bg-white">
          {activeData && (
            <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Header */}
              <div className="mb-8 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <activeData.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {activeData.label}
                  </h2>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  {activeData.description}
                </p>
              </div>

              {/* Accordions */}
              <div className="space-y-4">
                {activeData.sections.map((section, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "rounded-2xl border transition-all duration-300 overflow-hidden",
                      openSection === section.title
                        ? "border-amber-200 bg-amber-50/30 shadow-sm"
                        : "border-slate-100 bg-white hover:border-slate-200"
                    )}
                  >
                    <button
                      onClick={() => toggleSection(section.title)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span
                        className={cn(
                          "font-bold text-sm md:text-base transition-colors",
                          openSection === section.title
                            ? "text-amber-900"
                            : "text-slate-700"
                        )}
                      >
                        {section.title}
                      </span>
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                          openSection === section.title
                            ? "bg-amber-100 text-amber-600 rotate-180"
                            : "bg-slate-50 text-slate-400"
                        )}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-out",
                        openSection === section.title
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="p-5 pt-0">
                          <ul className="space-y-3">
                            {section.items.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed group/item"
                              >
                                <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Footer */}
              <div className="mt-10 p-5 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4">
                <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    7-Day Settlement Guarantee
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    All valid claims will be settled within{" "}
                    <strong className="text-slate-900">07 days</strong> after
                    all required documentation has been submitted.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
