import { useState } from "react";
import { User, FileCheck, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { IndividualClaimData } from "@/types/individual-claim";
import Image from "next/image";

export default function IndividualClaimHeader({
  data,
  policyId,
}: {
  data: IndividualClaimData;
  policyId: string;
}) {
  const [imgError, setImgError] = useState(false);

  // Construct the full image URL
  // Note: We check if ApplicantPPName exists to avoid broken link calls
  const imageUrl = data.ApplicantPPName
    ? `https://erp.sonalilife.com/PolicyUI/ApplicantImageUpload/${data.ApplicantPPName}`
    : null;

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("paid") || s.includes("approved"))
      return "bg-emerald-50 text-emerald-700 border-emerald-100 ring-4 ring-emerald-50/50";
    if (s.includes("reject"))
      return "bg-red-50 text-red-700 border-red-100 ring-4 ring-red-50/50";
    return "bg-amber-50 text-amber-700 border-amber-100 ring-4 ring-amber-50/50";
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden mb-8 relative">
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Top Bar */}
      <div className="relative p-8 pb-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex items-center gap-6">
          {/* User Photo with Fallback */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-linear-to-br from-amber-400 to-orange-500 rounded-full opacity-30 blur group-hover:opacity-50 transition duration-500" />
            <div className="relative w-25 h-25 rounded-full bg-slate-100 flex items-center justify-center border-[3px] border-white shadow-md overflow-hidden">
              {!imgError && imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={data.PolicyHolderName}
                  height={100}
                  width={100}
                  className="w-full h-full object-cover"
                  unoptimized={true}
                  onError={() => setImgError(true)}
                />
              ) : (
                <User className="w-8 h-8 text-slate-400" />
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-1">
              {data.PolicyHolderName}
            </h2>
            <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
              <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-bold tracking-wider">
                #{policyId}
              </span>
              <span>•</span>
              <span>Individual Policy</span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={cn(
            "px-6 py-2.5 rounded-full border text-sm font-bold uppercase tracking-widest flex items-center gap-2 self-start",
            getStatusColor(data.Status)
          )}
        >
          {data.Status.toLowerCase().includes("paid") ? (
            <ShieldCheck className="w-4 h-4" />
          ) : (
            <FileCheck className="w-4 h-4" />
          )}
          {data.Status}
        </div>
      </div>

      {/* Metrics Grid (No change in logic, just styling polish) */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-slate-50">
        <div className="p-8 border-b md:border-b-0 md:border-r border-slate-50 hover:bg-slate-50/50 transition-colors">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Claim Type
          </p>
          <p className="text-lg font-bold text-slate-900">
            {data.ClaimTypeName}
          </p>
        </div>
        <div className="p-8 border-b md:border-b-0 md:border-r border-slate-50 hover:bg-slate-50/50 transition-colors">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Settled Amount
          </p>
          <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
            ৳ {data.SuggestedAmount?.toLocaleString()}
          </p>
        </div>
        <div className="p-8 hover:bg-slate-50/50 transition-colors">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Payment Date
          </p>
          <p className="text-lg font-bold text-slate-900">
            {data.paiddate || "Pending"}
          </p>
        </div>
      </div>
    </div>
  );
}
