import { FileCheck } from "lucide-react";

export default function IndividualDecision({ text }: { text: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <FileCheck className="w-5 h-5 text-amber-500" />
        <h3 className="font-bold text-slate-900">Committee Decision</h3>
      </div>
      <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap overflow-x-auto border border-slate-200">
        {text}
      </div>
    </div>
  );
}
