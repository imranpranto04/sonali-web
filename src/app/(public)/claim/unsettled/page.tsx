"use client";

import { useState, useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { UnsettledResponse, UnsettledClaimItem } from "@/types/unsettled-claim";

import UnsettledStats from "@/components/claims/unsettled/UnsettledStats";
import UnsettledTable from "@/components/claims/unsettled/UnsettledTable";

export default function UnsettledPage() {
  const [individualData, setIndividualData] = useState<UnsettledClaimItem[]>(
    []
  );
  const [counts, setCounts] = useState({ individual: 0, group: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://www.sonalilife.com:1010/api/Webdata";

      const res = await fetch(`${baseUrl}/claims`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reqFor: "unsattled" }),
      });

      const json: UnsettledResponse = await res.json();

      if (json.success === "true") {
        setIndividualData(json.unsattledIndividual || []);
        setCounts({
          individual: json.unsattledIndividualCount || 0,
          group: json.unsattledGroupCount || 0,
        });
      } else {
        setError("Failed to load unsettled claims data.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try refreshing the page.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <section className="bg-slate-900 pt-32 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />{" "}
            Live Status
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Unsettled{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">
              Claims
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Monitoring pending individual and group claims that require
            attention.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-20 relative z-20">
        {/* Dashboard Stats */}
        <UnsettledStats
          individualCount={counts.individual}
          groupCount={counts.group}
          loading={loading}
        />

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-600 flex flex-col items-center gap-2 mb-8">
            <AlertCircle className="w-8 h-8" />
            <p className="font-bold">{error}</p>
            <button
              onClick={fetchData}
              className="mt-2 text-sm font-bold underline hover:text-red-800 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Try Again
            </button>
          </div>
        )}

        {/* Data Table */}
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-xl font-bold text-slate-900">
            Pending Individual Claims
            {!loading && (
              <span className="text-slate-400 text-sm font-normal ml-2">
                ({individualData.length} records)
              </span>
            )}
          </h2>
        </div>

        <UnsettledTable data={individualData} loading={loading} />
      </div>
    </div>
  );
}
