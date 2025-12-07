import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { Shield } from "lucide-react";
import { PolicyData, usePolicyStatus } from "@/hooks/use-policy-data";

// --- Enhanced Policy Card Component ---
export default function PolicyCard({ policy }: { policy: PolicyData }) {
  const { data: details, isLoading } = usePolicyStatus(policy.FPRId);
  const isActive = details?.Status === "Active";
  const mobileNumber = details?.MobileNo;

  console.log("check policy status details", details, mobileNumber);

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 hover:border-orange-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col relative">
      {/* Soft Header Background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-cyan-500 opacity-80" />

      <div className="p-5 pb-0 pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100/50 shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm leading-tight group-hover:text-orange-600 transition-colors line-clamp-1">
                {policy.Category || "Insurance Plan"}
              </h4>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5 bg-slate-50 px-1.5 py-0.5 rounded w-fit">
                {policy.PolicyNumber}
              </p>
            </div>
          </div>
          {isLoading ? (
            <Skeleton className="h-5 w-16 rounded-full" />
          ) : (
            <Badge
              className={`px-2 py-0.5 h-5 text-[10px] font-bold uppercase border shadow-none animate-pulse ${
                isActive
                  ? "bg-green-50 text-green-700 border-green-100"
                  : "bg-red-50 text-red-700 border-red-100"
              }`}
            >
              {isActive ? "Active" : details?.Status}
            </Badge>
          )}
        </div>

        {/* Metrics Grid - Cleaner Layout */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-50">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Premium Amount
            </p>
            <p className="text-lg font-extrabold text-slate-900">
              ৳ {policy.PremiumAmount.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Next Due
            </p>
            <p className="text-sm font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md inline-block">
              {policy.DueDate}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Actions - Simplified & Cool */}
      <div className="mt-auto p-4 bg-slate-50/50 border-t border-slate-100 flex items-center gap-3">
        <Link
          href={`/policyholder/policies/${policy.FPRId}`}
          className="flex-1"
        >
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-bold text-slate-700 bg-slate-300 hover:text-white hover:bg-slate-500 border border-transparent hover:border-slate-200 transition-all"
          >
            View Details
          </Button>
        </Link>

        <Link href={`/policyholder/payments?policyId=${policy.FPRId}`}>
          <Button
            size="sm"
            className=" w-full flex-1 bg-orange-400 hover:bg-orange-500 text-white text-xs font-bold shadow-sm h-9 transition-all"
          >
            Pay Premium
          </Button>
        </Link>
      </div>
    </div>
  );
}
