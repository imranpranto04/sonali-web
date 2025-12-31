import ClaimsInfo from "@/components/claims/ClaimsInfo";
import { CLAIM_TYPES } from "@/data/claims-info-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claim Requirements | Sonali Life Insurance",
  description:
    "Check the required documents for Death, Maturity, and Supplementary claims. Fast settlement within 7 days.",
};

export default function ClaimsPage() {
  // --- SEO: GENERATE FAQ SCHEMA ---
  // This helps you get those "Accordion" questions in Google Search Results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CLAIM_TYPES.flatMap((type) =>
      type.sections.map((section) => ({
        "@type": "Question",
        name: `What documents are needed for ${section.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The required documents are: ${section.items.join(", ")}.`,
        },
      }))
    ),
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-slate-900 pt-32 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/10 text-amber-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
            Customer Service
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Claim{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500">
              Requirements
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Simple, transparent, and fast. Find the checklist for your specific
            claim type below.
          </p>
        </div>
      </section>

      {/* Client Interaction Area */}
      <ClaimsInfo />
    </div>
  );
}
