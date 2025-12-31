import { Search, Loader2, ArrowRight } from "lucide-react";

interface Props {
  policyId: string;
  setPolicyId: (val: string) => void;
  onSearch: (e: React.FormEvent) => void;
  loading: boolean;
}

export default function IndividualSearchBar({
  policyId,
  setPolicyId,
  onSearch,
  loading,
}: Props) {
  return (
    <div className="container mx-auto px-4 -mt-6 md:-mt-10 relative z-20">
      <form onSubmit={onSearch} className="max-w-2xl mx-auto relative group">
        {/* Glow Effect (Hidden on mobile to reduce visual noise) */}
        <div className="absolute -inset-1 bg-linear-to-r from-amber-400 to-orange-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-hover:duration-200 hidden md:block"></div>

        <div className="relative bg-white rounded-xl md:rounded-2xl shadow-2xl shadow-slate-200/50 flex items-center p-1.5 md:p-2 border border-slate-100 transition-transform duration-300 md:group-hover:-translate-y-1">
          {/* Input Icon */}
          <div className="pl-3 pr-2 md:pl-4 md:pr-3 text-slate-400 shrink-0">
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </div>

          <input
            type="text"
            placeholder="Enter Policy ID..."
            className="flex-1 bg-transparent border-none outline-none py-3 md:py-4 text-base md:text-lg text-slate-900 placeholder:text-slate-400 font-medium tracking-tight min-w-0"
            value={policyId}
            onChange={(e) => setPolicyId(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading || !policyId}
            className="shrink-0 bg-slate-900 text-white px-4 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl font-bold hover:bg-amber-500 transition-all duration-300 disabled:opacity-70 disabled:hover:bg-slate-900 flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 group/btn"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span className="hidden sm:inline">Track</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
