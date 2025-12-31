"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Calendar,
  FileClock,
  TrendingUp,
  Banknote,
  ScrollText,
  PlusCircle,
  ChevronRight,
  X,
  Shield,
} from "lucide-react";
import { usePolicies } from "@/hooks/use-policy-data";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// 1. Define Menu Items with their destination TABS
const SERVICE_MENU = [
  {
    label: "Nominee Info",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
    tab: "nominee",
  },
  {
    label: "Policy Schedule",
    icon: Calendar,
    color: "text-purple-600",
    bg: "bg-purple-50",
    tab: "overview",
  },
  {
    label: "Payment History",
    icon: FileClock,
    color: "text-green-600",
    bg: "bg-green-50",
    tab: "history",
  },
  {
    label: "Maturity Details",
    icon: TrendingUp,
    color: "text-orange-600",
    bg: "bg-orange-50",
    tab: "overview", // Maturity info is usually in Overview section
  },
  {
    label: "Customer Loan",
    icon: Banknote,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    tab: "loan",
  },
  {
    label: "Benefits",
    icon: ScrollText,
    color: "text-pink-600",
    bg: "bg-pink-50",
    tab: "benefits",
  },
  {
    label: "Supp. Claim",
    icon: PlusCircle,
    color: "text-red-600",
    bg: "bg-red-50",
    tab: "claims",
  },
];

export default function DashboardServiceGrid() {
  const router = useRouter();
  const { data: policies } = usePolicies();

  const [showModal, setShowModal] = useState(false);
  const [targetTab, setTargetTab] = useState<string>("overview"); // Default to overview

  // --- SMART NAVIGATION HANDLER ---
  const handleServiceClick = (tabName: string) => {
    if (!policies || policies.length === 0) {
      // Optional: Handle 'no policies' case (e.g., show toast)
      return;
    }

    // Determine destination URL
    // If only 1 policy, go directly. If multiple, open modal.
    if (policies.length === 1) {
      const url = `/policyholder/policies/${policies[0].FPRId}?tab=${tabName}`;
      router.push(url);
    } else {
      setTargetTab(tabName); // Store the intended tab
      setShowModal(true); // Ask user to pick a policy
    }
  };

  return (
    <>
      {/* 1. THE GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {SERVICE_MENU.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleServiceClick(item.tab)}
            className="group h-full text-left w-full"
          >
            <Card className="h-full border-slate-200 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center min-h-[110px]">
              <div
                className={`p-2.5 rounded-full ${item.bg} ${item.color} mb-2 group-hover:scale-110 transition-transform`}
              >
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-600 group-hover:text-slate-900 uppercase tracking-wide">
                {item.label}
              </span>
            </Card>
          </button>
        ))}
      </div>

      {/* 2. POLICY SELECTION MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Select Policy
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  View{" "}
                  <span className="font-bold text-orange-600 uppercase">
                    {targetTab}
                  </span>{" "}
                  for which policy?
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 bg-white rounded-full text-slate-400 hover:text-red-500 shadow-sm hover:shadow-md transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Policy List */}
            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
              {policies?.map((policy) => {
                const targetUrl = `/policyholder/policies/${policy.FPRId}?tab=${targetTab}`;

                return (
                  <button
                    key={policy.FPRId}
                    onClick={() => {
                      router.push(targetUrl);
                      setShowModal(false);
                    }}
                    className="w-full text-left p-4 rounded-xl border border-slate-100 hover:border-orange-500 hover:bg-orange-50 transition-all group flex items-center justify-between bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-700 group-hover:text-orange-700 truncate">
                          {policy.Category || "Insurance Plan"}
                        </p>
                        <p className="text-xs text-slate-400 font-mono mt-0.5 bg-slate-100 px-2 py-0.5 rounded w-fit group-hover:bg-white">
                          {policy.PolicyNumber}
                        </p>
                      </div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-orange-200 group-hover:text-orange-700 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
