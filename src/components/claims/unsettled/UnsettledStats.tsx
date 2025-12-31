import { Users, User } from "lucide-react";

interface Props {
  individualCount: number;
  groupCount: number;
  loading: boolean;
}

export default function UnsettledStats({
  individualCount,
  groupCount,
  loading,
}: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="h-32 bg-slate-100 rounded-3xl animate-pulse" />
        <div className="h-32 bg-slate-100 rounded-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      {/* Individual Card */}
      <div className="bg-white rounded-4xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-32 h-32 bg-amber-50 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-100 transition-colors" />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Individual Pending
            </p>
            <h3 className="text-4xl font-black text-slate-900">
              {individualCount}
            </h3>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Claims waiting for settlement
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm">
            <User className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Group Card */}
      <div className="bg-slate-900 rounded-4xl p-6 border border-slate-800 shadow-xl shadow-slate-900/20 relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-32 h-32 bg-white rounded-full blur-[50px] opacity-10 -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Group Pending
            </p>
            <h3 className="text-4xl font-black text-white">{groupCount}</h3>
            <p className="text-sm text-slate-400 font-medium mt-1">
              Corporate claims in queue
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center border border-white/10">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
