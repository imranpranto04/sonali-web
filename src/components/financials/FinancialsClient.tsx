"use client";

import { useState } from "react";
import { FinancialsResponse, DocumentItem } from "@/types/financials";
import DocumentCard from "./DocumentCard";
import ContactCard from "./ContactCard";
import {
  PieChart,
  Scale,
  Megaphone,
  FileCheck,
  Users,
  Search,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- CONFIGURATION ---
const SHOW_INVESTOR_RELATIONS = false; // Toggle Investor Relations Section

// --- TRANSLATION DICTIONARY ---
const LABELS = {
  eng: {
    tabs: {
      reports: "Financial Reports",
      governance: "Governance & PSI",
      notices: "AGM & Notices",
      ipo: "IPO Information",
      contacts: "Contacts",
    },
    sections: {
      annual: "Annual Reports",
      quarterly: "Quarterly Reports",
      halfYearly: "Half Yearly Reports",
      audited: "Audited Financial Reports",
      psi: "Price Sensitive Information (PSI)",
      corpGov: "Corporate Governance",
      shareholding: "Shareholding Reports",
      disclosure: "Principles of Disclosure",
      creditRating: "Credit Rating",
      agmNotices: "AGM & Financial Notices",
      prospectus: "Prospectus",
      ipoNotices: "IPO Notices",
      finalStatus: "Final Application Status",
      proRata: "Pro-Rata Allotment",
      investorRel: "Investor Relations",
      rti: "RTI Department",
    },
    empty: "No financial data available.",
  },
  bng: {
    tabs: {
      reports: "আর্থিক প্রতিবেদন",
      governance: "গভার্নেন্স এবং পিএসআই",
      notices: "এজিএম এবং নোটিশ",
      ipo: "আইপিও তথ্য",
      contacts: "যোগাযোগ",
    },
    sections: {
      annual: "বার্ষিক প্রতিবেদন",
      quarterly: "ত্রৈমাসিক প্রতিবেদন",
      halfYearly: "অর্ধবার্ষিক প্রতিবেদন",
      audited: "নিরীক্ষিত আর্থিক প্রতিবেদন",
      psi: "মূল্য সংবেদনশীল তথ্য (PSI)",
      corpGov: "কর্পোরেট গভার্নেন্স",
      shareholding: "শেয়ারহোল্ডিং প্রতিবেদন",
      disclosure: "প্রকাশের নীতি",
      creditRating: "ক্রেডিট রেটিং",
      agmNotices: "এজিএম এবং আর্থিক নোটিশ",
      prospectus: "প্রসপেক্টাস",
      ipoNotices: "আইপিও নোটিশ",
      finalStatus: "চূড়ান্ত আবেদনের স্থিতি",
      proRata: "প্রো-রাটা বরাদ্দ",
      investorRel: "বিনিয়োগকারী সম্পর্ক",
      rti: "আরটিআই বিভাগ",
    },
    empty: "কোনো আর্থিক তথ্য পাওয়া যায়নি।",
  },
};

interface Props {
  data: FinancialsResponse;
  lang: "eng" | "bng"; // <--- Added this prop
}

export default function FinancialsClient({ data, lang }: Props) {
  const [activeTab, setActiveTab] = useState("reports");

  // Select the correct language labels (default to English if undefined)
  const t = LABELS[lang] || LABELS.eng;

  // Tabs Configuration (Dynamic based on language)
  const TABS = [
    { id: "reports", label: t.tabs.reports, icon: PieChart },
    { id: "governance", label: t.tabs.governance, icon: Scale },
    { id: "notices", label: t.tabs.notices, icon: Megaphone },
    { id: "ipo", label: t.tabs.ipo, icon: FileCheck },
    { id: "contacts", label: t.tabs.contacts, icon: Users },
  ];

  // Helper to Render a Document Section
  const renderSection = (title: string, items: DocumentItem[]) => {
    const safeItems = items || [];
    if (safeItems.length === 0) return null;

    return (
      <div className="mb-14 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-1 w-1 rounded-full bg-amber-500"></div>
          <h3 className="text-2xl font-black text-amber-600 tracking-tight">
            {title}
          </h3>
          <div className="h-px flex-1 bg-slate-100"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {safeItems.map((doc, i) => (
            <DocumentCard key={i} doc={doc} />
          ))}
        </div>
      </div>
    );
  };

  if (!data || !data.success) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-slate-400 container mx-auto">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <Search className="w-8 h-8 opacity-40" />
        </div>
        <p className="font-medium">{t.empty}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 -mt-12 relative z-20 pb-24">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR */}
        <div className="lg:w-1/4 shrink-0">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-3 sticky top-24 border border-slate-100">
            <nav className="space-y-1">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group",
                      isActive
                        ? "bg-slate-900 text-white shadow-md"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          "w-5 h-5",
                          isActive ? "text-amber-400" : "opacity-70"
                        )}
                      />
                      <span className="font-bold text-sm">{tab.label}</span>
                    </div>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 text-amber-400" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="lg:w-3/4 min-h-[600px]">
          {activeTab === "reports" && (
            <div>
              {renderSection(t.sections.annual, data.annualReport)}
              {renderSection(t.sections.quarterly, data.quarterlyReport)}
              {renderSection(t.sections.halfYearly, data.halfyearlyReport)}
              {renderSection(t.sections.audited, data.auditFinancialReport)}
            </div>
          )}

          {activeTab === "governance" && (
            <div>
              {renderSection(t.sections.psi, data.priceSensitiveInfo)}
              {renderSection(t.sections.corpGov, data.corporateGovernance)}
              {renderSection(t.sections.shareholding, data.shareholdingReport)}
              {renderSection(
                t.sections.disclosure,
                data.principlesOfDisclosure
              )}
              {renderSection(t.sections.creditRating, data.creditRating)}
            </div>
          )}

          {activeTab === "notices" && (
            <div>
              {renderSection(t.sections.agmNotices, data.financialNotice)}
            </div>
          )}

          {activeTab === "ipo" && (
            <div>
              {renderSection(t.sections.prospectus, data.prospectus)}
              {renderSection(t.sections.ipoNotices, data.ipoNotice)}
              {renderSection(
                t.sections.finalStatus,
                data.finalApplicationSatus
              )}
              {renderSection(t.sections.proRata, data.proRataAllotment)}
            </div>
          )}

          {/* --- CONTACTS SECTION (VERTICAL STACK) --- */}
          {activeTab === "contacts" && (
            <div className="flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* 1. RTI DEPARTMENT */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 border-b border-slate-100 pb-4 relative z-10">
                  <span className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                    <FileCheck className="w-5 h-5" />
                  </span>
                  {t.sections.rti}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 relative z-10">
                  {(data.rtiDept || []).map((person, i) => (
                    <ContactCard key={i} person={person} />
                  ))}
                </div>
              </div>

              {/* 2. INVESTOR RELATIONS (Conditional) */}
              {SHOW_INVESTOR_RELATIONS && (
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 border-b border-slate-100 pb-4 relative z-10">
                    <span className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                      <Users className="w-5 h-5" />
                    </span>
                    {t.sections.investorRel}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 relative z-10">
                    {(data.investorRelation || []).map((person, i) => (
                      <ContactCard key={i} person={person} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
