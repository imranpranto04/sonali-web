import { Calculator } from "lucide-react";
import { IndividualClaimData } from "@/types/individual-claim";

export default function IndividualFinancials({
  data,
}: {
  data: IndividualClaimData;
}) {
  return (
    <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 rounded-full blur-[60px] opacity-20 pointer-events-none" />
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <Calculator className="w-5 h-5 text-amber-400" />
        <h3 className="font-bold">Payout Calculation</h3>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
          <span className="text-slate-400">Sum Assured</span>
          <span className="font-bold">
            ৳ {data.CalcSumAssuredAmount?.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
          <span className="text-slate-400">Bonus Amount</span>
          <span className="font-bold">
            ৳ {data.BonusAmount?.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
          <span className="text-slate-400">Supplementary</span>
          <span className="font-bold">
            ৳ {data.SuppPolClaimAmount?.toLocaleString()}
          </span>
        </div>
        {data.LienAmountDeduct && (
          <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2 text-red-300">
            <span>Lien Deduction</span>
            <span className="font-bold">
              - ৳ {data.LienAmountDeduct.toLocaleString()}
            </span>
          </div>
        )}
        <div className="pt-2 flex justify-between items-center text-lg">
          <span className="font-bold text-amber-400">Final Payout</span>
          <span className="font-black">
            ৳ {data.SuggestedAmount?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
