import { Metadata } from "next";
import { BranchApiResponse } from "@/types/branch";
import BranchesClient from "@/components/company/branches/BranchesClient";

export const metadata: Metadata = {
  title: "Branch Locations | Sonali Life Insurance",
  description:
    "Find your nearest Sonali Life Insurance branch. We have offices in Dhaka, Chittagong, Sylhet, and all major districts across Bangladesh.",
};

async function getBranches() {
  try {
    const res = await fetch(
      "https://www.sonalilife.com:1010/api/Webdata/Branches",
      {
        next: { revalidate: 3600 }, // Cache for 1 hour for speed
        // rejectUnauthorized: false // *Uncomment this only if you get SSL errors locally*
      }
    );
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function BranchesPage() {
  const response: BranchApiResponse | null = await getBranches();

  // Safety check: ensure 'data' is an array
  const divisions = Array.isArray(response?.data) ? response.data : [];

  // --- SEO: JSON-LD ---
  const allBranches = divisions.flatMap((div) =>
    div.Districts ? div.Districts.flatMap((dist) => dist.Branches || []) : []
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sonali Life Insurance",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+880 9678 334455",
      contactType: "customer service",
    },
    department: allBranches.map((branch) => ({
      "@type": "InsuranceAgency",
      name: `Sonali Life Insurance - ${branch.BranchName}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: branch.BranchAddress?.replace(/\n/g, ", ") || "",
        addressCountry: "BD",
        addressRegion: branch.Division,
      },
    })),
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Inject Schema for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="bg-slate-900 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Our <span className="text-amber-500">Locations</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            We are present across Bangladesh to serve you better. Find your
            nearest branch below.
          </p>
        </div>
      </section>

      {/* Interactive Client List */}
      <BranchesClient divisions={divisions} />
    </div>
  );
}
