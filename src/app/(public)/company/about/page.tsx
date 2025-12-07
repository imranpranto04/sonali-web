import { Metadata } from "next";
import { fetchPublicContent } from "@/lib/api/api-server-public";
import { AboutData } from "@/components/sections/AboutContent";
import DynamicContent from "@/components/common/DynamicContent";

export const metadata: Metadata = {
  title: "About Us | Sonali Life Insurance",
  description:
    "Learn about our mission, vision, and commitment to securing your future.",
};

export default async function AboutPage() {
  // 1. Server Fetch (English) for SEO
  // This ensures Google sees the content immediately
  const initialData = await fetchPublicContent<AboutData>("aboutus");

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section with Premium Orange Vibe */}
      <section className="bg-white border-b border-slate-100 pt-20 pb-14 relative overflow-hidden">
        {/* Ambient Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <span className="text-orange-600 font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            About Sonali Life
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed font-medium">
            Building trust and securing futures across Bangladesh since 2013.
          </p>
        </div>
      </section>

      {/* Dynamic Content Section */}
      <section>
        {/* The Wrapper handles client-side language switching automatically */}
        <DynamicContent<AboutData>
          apiType="aboutus"
          initialData={initialData}
        />
      </section>
    </div>
  );
}
