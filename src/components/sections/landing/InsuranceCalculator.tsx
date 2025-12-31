"use client";

import { useRouter } from "next/navigation"; // 1. Import Router
import CalculatorContent from "@/components/common/calculator/CalculatorContent";
import { Calculator } from "lucide-react";
import { useCalculatorLandingContent } from "@/hooks/content/use-calculator-landing-content.ts";

function InsuranceCalculator() {
  const router = useRouter();
  const content = useCalculatorLandingContent();

  const handleStart = () => {
    // 2. Navigate to the dedicated page
    router.push("/services/calculator");
  };

  return (
    <>
      <section
        className="w-full py-20 bg-brand text-white relative overflow-hidden"
        id="calculator"
      >
        {/* Background Ambience (Updated to Brand Colors) */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/10 blur-3xl rounded-full translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-600/10 blur-3xl rounded-full -translate-x-1/2" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side: Static Content (Dynamic Language) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400 text-sm font-bold tracking-wide">
                <Calculator className="w-4 h-4" />
                <span>{content.badge}</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">
                {content.title.line1} <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-amber-600">
                  {content.title.line2}
                </span>
                .
              </h2>

              <p className="text-slate-300 text-lg leading-relaxed">
                {content.description}
              </p>

              <div className="flex gap-4 pt-4">
                <div className="flex flex-col gap-1">
                  <span className="text-3xl font-bold text-white">25k+</span>
                  <span className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                    {content.stats.policies}
                  </span>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="flex flex-col gap-1">
                  <span className="text-3xl font-bold text-white">98%</span>
                  <span className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                    {content.stats.claimRatio}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Logic Switch */}
            <div className="lg:col-span-7 pl-0 lg:pl-12">
              {/* 3. We removed the <CalculatorForm /> and state toggle.
                     Now it only shows the "Intro Content" which triggers navigation.
              */}
              <CalculatorContent onStart={handleStart} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default InsuranceCalculator;
