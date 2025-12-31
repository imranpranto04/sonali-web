"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import {
  AllClaimItem,
  AllClaimStatusResponse,
  AllStatusFilterParams,
} from "@/types/all-claim-status";

// NEW COMPONENT IMPORTS
import AllStatusFilterBar from "@/components/claims/all-claim-status/AllStatusFilterBar";
import AllStatusTable from "@/components/claims/all-claim-status/AllStatusTable";

export default function AllClaimStatusPage() {
  const [data, setData] = useState<AllClaimItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const fetchClaims = async (filters: AllStatusFilterParams) => {
    setLoading(true);
    setError("");
    setHasSearched(true);
    setData([]);

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://www.sonalilife.com:1010/api/Webdata";

      const payload = {
        reqFor: "all",
        policyId: filters.policyId || "0",
        year: filters.year,
        month: filters.month,
        status: filters.status,
        claimType: filters.claimType,
      };

      const res = await fetch(`${baseUrl}/claims`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json: AllClaimStatusResponse = await res.json();

      if (json.success === "true") {
        setData(json.data);
      } else {
        setError(json.message || "No data found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch claims. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <section className="bg-slate-900 pt-32 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            All Claims <span className="text-amber-500">Status</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            View and filter the entire history of settled and pending claims.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <AllStatusFilterBar onFilter={fetchClaims} loading={loading} />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-600 flex items-center gap-2 mb-6 max-w-2xl mx-auto">
            <AlertCircle className="w-5 h-5" />
            <span className="font-bold">{error}</span>
          </div>
        )}

        {hasSearched && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-xl font-bold text-slate-900">
                Search Results
                {/* Hide count while loading to avoid "0 records" flashing */}
                {!loading && (
                  <span className="text-slate-400 text-sm font-normal ml-2">
                    ({data.length} records found)
                  </span>
                )}
              </h2>
            </div>

            {/* VITAL: Pass the loading prop here! */}
            <AllStatusTable data={data} loading={loading} />
          </div>
        )}
      </div>
    </div>
  );
}
