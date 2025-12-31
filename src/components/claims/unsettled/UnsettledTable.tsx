"use client";

import { UnsettledClaimItem } from "@/types/unsettled-claim";
import {
  FileText,
  Calendar,
  Hash,
  Clock,
  FileInput,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function UnsettledTable({
  data,
  loading,
}: {
  data: UnsettledClaimItem[];
  loading: boolean;
}) {
  const parsePolicyInfo = (raw: string) => {
    const parts = raw.split("-");
    const id = parts[0]?.trim();
    const name = parts.slice(1).join("-").trim();
    return { id, name };
  };

  const getDurationStyle = (days: number) => {
    if (days > 30) return "text-red-600 bg-red-50 border-red-100";
    if (days > 15) return "text-orange-600 bg-orange-50 border-orange-100";
    return "text-emerald-600 bg-emerald-50 border-emerald-100";
  };

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
        <p className="text-slate-500 font-bold text-sm animate-pulse">
          Loading Pending Claims...
        </p>
      </div>
    );
  }

  // --- EMPTY STATE ---
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 border-dashed animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-slate-900 font-bold text-lg">
          No Unsettled Claims
        </h3>
        <p className="text-slate-500 text-sm">
          Great job! All individual claims have been processed.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <th className="p-5 whitespace-nowrap">Sl</th>
              <th className="p-5 whitespace-nowrap">Claim Info</th>
              <th className="p-5 whitespace-nowrap">Policy Holder</th>
              <th className="p-5 whitespace-nowrap">Timeline</th>
              <th className="p-5 whitespace-nowrap text-center">Pending For</th>
              <th className="p-5 whitespace-nowrap text-right">Amount</th>
              <th className="p-5 whitespace-nowrap">Status</th>
              <th className="p-5 whitespace-nowrap">UW Comment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {data.map((item, idx) => {
              const { id, name } = parsePolicyInfo(item.PolicyNo);
              return (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="p-5 text-slate-400 font-mono">{item.Sl}</td>

                  <td className="p-5">
                    <div className="flex flex-col gap-1">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wide w-fit border border-slate-200">
                        {item.ClaimType}
                      </span>

                      <div className="flex items-center gap-1.5 text-slate-900 font-bold font-mono">
                        <Hash className="w-3.5 h-3.5 text-slate-400" />
                        {item.ClaimId}
                      </div>
                    </div>
                  </td>

                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{name}</span>
                      <span className="text-base font-semibold text-slate-500">
                        #{id || item.PolicyNo}
                      </span>
                    </div>
                  </td>

                  <td className="p-5">
                    <div className="space-y-2">
                      <div
                        className="flex items-center gap-2"
                        title="Notification Date"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                          <Calendar className="w-3 h-3" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">
                            Notified
                          </span>
                          <span className="font-medium text-slate-700">
                            {item.NotificationDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2" title="OCF Date">
                        <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                          <FileInput className="w-3 h-3" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">
                            OCF Date
                          </span>
                          <span className="font-medium text-slate-700">
                            {item.OCFdate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-5 text-center">
                    <div
                      className={cn(
                        "inline-flex flex-col items-center justify-center w-16 h-16 rounded-2xl border",
                        getDurationStyle(item.UnsettledDuration)
                      )}
                    >
                      <span className="text-xl font-black leading-none">
                        {item.UnsettledDuration}
                      </span>
                      <span className="text-[10px] font-bold uppercase mt-1">
                        Days
                      </span>
                    </div>
                  </td>

                  <td className="p-5 text-right">
                    <span className="font-black text-slate-900 text-base">
                      {/* FIX: Force 'en-US' locale to ensure Server/Client match "1,000" format */}
                      ৳ {item.ClaimAmount?.toLocaleString("en-US")}
                    </span>
                  </td>

                  <td className="p-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                      <Clock className="w-3.5 h-3.5" /> {item.ClaimStatus}
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="max-w-[200px] bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed italic">
                      "{item.UWComment}"
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
