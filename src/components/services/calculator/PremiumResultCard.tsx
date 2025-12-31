import { format } from "date-fns";
import { CheckCircle2 } from "lucide-react";

interface PremiumResultCardProps {
  result: any;
  formValues: any; // Or specific type
}

export function PremiumResultCard({
  result,
  formValues,
}: PremiumResultCardProps) {
  if (!result) return null;

  return (
    <div
      id="result-card"
      className="mt-8 animate-in slide-in-from-bottom-10 duration-700"
    >
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl ring-1 ring-slate-900/5">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative p-8 md:p-10">
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Estimated Premium
                </h3>
                <p className="text-emerald-400 text-sm font-medium">
                  Calculation Successful
                </p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-slate-400 text-xs uppercase tracking-wider">
                Date
              </p>
              <p className="font-mono text-white">
                {format(new Date(), "dd MMM, yyyy")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            <div className="space-y-1">
              <p className="text-slate-300 text-sm">Sum Assured Amount</p>
              <p className="text-2xl font-semibold tracking-tight text-slate-200">
                ৳{" "}
                {result.txtTotalPolicyAmount ||
                  formValues.totalPolicyAmount ||
                  formValues.ysapa ||
                  formValues.monthlyPremiumAmount ||
                  "0"}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-slate-300 text-sm">Policy Term</p>
              <p className="text-2xl font-semibold tracking-tight text-slate-200">
                {formValues.policyDuration} Years
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-slate-400 text-sm">Basic Premium</p>
              <p className="text-xl font-medium text-white/90">
                ৳ {result.lblBasicCalcValue}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-slate-400 text-sm">Supplementary Premium</p>
              <p className="text-xl font-medium text-white/90">
                ৳ {result.lblSupCalcValue}
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
            <span className="text-slate-400 font-medium">
              Total Payable Premium
            </span>
            <div className="text-right">
              <span className="text-4xl md:text-5xl font-bold text-emerald-400 tracking-tight">
                ৳ {result.lblCalculationValue}
              </span>
              <p className="text-slate-400 text-xs mt-1">
                Inclusive of all standard charges
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
