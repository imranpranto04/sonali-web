import { FileText, Search, Users } from "lucide-react";
import { IndividualClaimData } from "@/types/individual-claim";

export default function IndividualInfoList({
  data,
}: {
  data: IndividualClaimData;
}) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-900">Claim Summary</h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          {data.ClaimSummary}
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-900">Investigation Findings</h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed italic">
          "{data.InvestigationSummary}"
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-900">Committee Members</h3>
        </div>
        <p className="text-sm text-slate-600 font-medium">
          {data.ClaimComMemberName}
        </p>
      </div>
    </div>
  );
}
