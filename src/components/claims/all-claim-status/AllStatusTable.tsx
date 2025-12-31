import { AllClaimItem } from "@/types/all-claim-status";
import {
  FileText,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Hash,
  FileInput,
  Loader2,
} from "lucide-react";

// 1. Accept 'loading' in props
export default function AllStatusTable({
  data,
  loading,
}: {
  data: AllClaimItem[];
  loading: boolean;
}) {
  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("paid") || s.includes("delivered"))
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold uppercase tracking-wider">
          <CheckCircle2 className="w-3.5 h-3.5" /> {status}
        </span>
      );
    if (s.includes("reject"))
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-100 text-xs font-bold uppercase tracking-wider">
          <XCircle className="w-3.5 h-3.5" /> {status}
        </span>
      );
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-xs font-bold uppercase tracking-wider">
        <Clock className="w-3.5 h-3.5" /> {status}
      </span>
    );
  };

  const parsePolicyInfo = (raw: string) => {
    const parts = raw.split("-");
    const id = parts[0]?.trim();
    const name = parts.slice(1).join("-").trim();
    return { id, name };
  };

  // --- FIX: CHECK LOADING FIRST ---
  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden min-h-[300px] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
        <p className="text-slate-500 font-bold text-sm animate-pulse">
          Searching Records...
        </p>
      </div>
    );
  }

  // --- THEN CHECK EMPTY ---
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 border-dashed animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-slate-900 font-bold text-lg">No Claims Found</h3>
        <p className="text-slate-500 text-sm">
          Try adjusting your filters to see results.
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
              <th className="p-5 whitespace-nowrap">Claim ID & Type</th>
              <th className="p-5 whitespace-nowrap">Policy Holder</th>
              <th className="p-5 whitespace-nowrap">Timeline (Dates)</th>
              <th className="p-5 whitespace-nowrap text-right">Amount</th>
              <th className="p-5 whitespace-nowrap">Status</th>
              <th className="p-5 whitespace-nowrap">Comment</th>
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
                      <span className="inline-block px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wide w-fit">
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
                        title="Claim Notification Date"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                          <Calendar className="w-3 h-3" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">
                            Notification
                          </span>
                          <span className="font-medium text-slate-700">
                            {item.ClaimNotificationDate}
                          </span>
                        </div>
                      </div>
                      <div
                        className="flex items-center gap-2"
                        title="OCF Receiving Date"
                      >
                        <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                          <FileInput className="w-3 h-3" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">
                            OCF Received
                          </span>
                          <span className="font-medium text-slate-700">
                            {item.OCFreceivingDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <span className="font-black text-slate-900 text-base">
                      ৳ {item.ClaimAmount?.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-5">
                    {getStatusBadge(item.ClaimStatus)}
                    {item.PaidDate && (
                      <div className="mt-2 text-xs text-emerald-600 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Paid:{" "}
                        {item.PaidDate}
                      </div>
                    )}
                  </td>
                  <td className="p-5">
                    <div className="max-w-[200px] group/tooltip relative">
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed cursor-help">
                        {item.Comment}
                      </p>
                      <div className="absolute right-0 bottom-full mb-2 w-64 bg-slate-800 text-white text-xs p-3 rounded-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                        {item.Comment}
                        <div className="absolute top-full right-4 border-4 border-transparent border-t-slate-800"></div>
                      </div>
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
