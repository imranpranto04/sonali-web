"use client";

import {
  ArrowRight,
  Coins,
  Shield,
  TrendingUp,
  Calculator,
} from "lucide-react";
import Link from "next/link";
import { useCalculatorIntroContent } from "@/hooks/content/use-calculator-intro-content";

const CalculatorContent = ({ onStart }: { onStart?: () => void }) => {
  const content = useCalculatorIntroContent();

  return (
    <>
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl shadow-black/20 p-8 md:p-12 min-h-[450px] flex flex-col justify-center items-center text-center animate-in fade-in zoom-in-95 duration-500 relative overflow-hidden border border-white/20">
        {/* Optional: Subtle Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-brand via-amber-500 to-brand" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />

        {/* Icon Header */}
        <div className="mb-6 p-4 rounded-full bg-brand/5 border border-brand/10">
          <Calculator className="w-8 h-8 text-brand" />
        </div>

        <h3 className="text-3xl font-black mb-4 text-brand">{content.title}</h3>

        <p className="text-slate-500 max-w-md mb-8 leading-relaxed font-medium">
          {content.description}
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-3 gap-3 w-full mb-10">
          {/* Feature 1 */}
          <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-500/5 transition-all group">
            <div className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-slate-700 uppercase tracking-wide">
              {content.features.tax}
            </span>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-500/5 transition-all group">
            <div className="p-2 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-slate-700 uppercase tracking-wide">
              {content.features.return}
            </span>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-500/5 transition-all group">
            <div className="p-2 rounded-full bg-amber-50 group-hover:bg-amber-100 transition-colors">
              <Coins className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-slate-700 uppercase tracking-wide">
              {content.features.cost}
            </span>
          </div>
        </div>

        {/* Action Button - Gold linear */}
        <Link
          href="/services/calculator"
          className="w-full flex justify-center"
        >
          <button
            className="w-full max-w-xs bg-linear-to-r from-amber-400 to-amber-500 text-brand py-4 px-6 rounded-full font-bold text-base shadow-xl shadow-amber-500/20 hover:scale-[1.02] hover:shadow-amber-500/40 hover:from-amber-300 hover:to-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
            onClick={onStart} // If passed, it can also track analytics
          >
            {content.cta} <ArrowRight className="w-5 h-5" />
          </button>
        </Link>

        <p className="mt-5 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          {content.note}
        </p>
      </div>
    </>
  );
};

export default CalculatorContent;
