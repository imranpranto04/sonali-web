"use client";

import { useState } from "react";
import { AlertCircle, Search } from "lucide-react";
import {
  IndividualClaimData,
  IndividualClaimResponse,
} from "@/types/individual-claim";

// IMPORTS FROM INDIVIDUAL FOLDER
import IndividualSearchBar from "@/components/claims/individual/IndividualSearchBar";
import IndividualClaimHeader from "@/components/claims/individual/IndividualClaimHeader";
import IndividualFinancials from "@/components/claims/individual/IndividualFinancials";
import IndividualInfoList from "@/components/claims/individual/IndividualInfoList";
import IndividualDecision from "@/components/claims/individual/IndividualDecision";

export default function IndividualClaimPage() {
  const [policyId, setPolicyId] = useState("");
  const [loading, setLoading] = useState(false);
  const [claimData, setClaimData] = useState<IndividualClaimData | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!policyId.trim()) return;

    setLoading(true);
    setError("");
    setClaimData(null);

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://www.sonalilife.com:1010/api/Webdata";

      // Sending 'reqFor' as 'individual' as requested
      const res = await fetch(
        `${baseUrl}/claims?reqFor=individual&policyId=${policyId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reqFor: "individual", policyId: policyId }),
        }
      );

      const json: IndividualClaimResponse = await res.json();

      if (json.success === "true" && json.data.length > 0) {
        setClaimData(json.data[0]);
      } else {
        setError("No individual claim record found for this Policy ID.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to fetch claim details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <section className="bg-slate-900 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"></div>
        <div className="container relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
            Individual <span className="text-amber-500">Claim Details</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Enter your Policy ID to view full settlement details.
          </p>
        </div>
      </section>

      {/* Components */}
      <IndividualSearchBar
        policyId={policyId}
        setPolicyId={setPolicyId}
        onSearch={handleSearch}
        loading={loading}
      />

      <div className="container py-12">
        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-600 flex flex-col items-center gap-2 animate-in fade-in zoom-in-95">
            <AlertCircle className="w-8 h-8" />
            <p className="font-bold">{error}</p>
          </div>
        )}

        {claimData && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-700">
            <IndividualClaimHeader data={claimData} policyId={policyId} />

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <IndividualInfoList data={claimData} />

              {/* Right Column */}
              <div className="space-y-6">
                <IndividualFinancials data={claimData} />
                <IndividualDecision text={claimData.DecisionofClaimCommittee} />
              </div>
            </div>

            {/* <div className="mt-6">
              <IndividualDecision text={claimData.DecisionofClaimCommittee} />
            </div> */}
          </div>
        )}

        {!claimData && !loading && !error && (
          <div className="text-center py-20 opacity-40">
            <Search className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="text-slate-500">
              Enter a Policy ID above to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
