"use client";

import CalculatorForm from "@/components/common/calculator/CalculatorForm";
import CalculatorContent from "@/components/common/calculator/CalculatorContent";
import { Calculator } from "lucide-react";
import { useState } from "react";

function InsuranceCalculator() {
  const [isCalculatorActive, setIsCalculatorActive] = useState(false);

  return (
    <>
      <section
        className="w-full py-20 bg-slate-900 text-white relative overflow-hidden"
        id="calculator"
      >
        {/* Background Ambience */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-3xl rounded-full translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-500/10 blur-3xl rounded-full -translate-x-1/2" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side: Static Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-orange-400 text-sm font-bold tracking-wide">
                <Calculator className="w-4 h-4" />
                <span>Premium Calculator</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                Plan your future <br />
                <span className="text-primary">financial goals</span>.
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Use our smart calculator to estimate your premium. <br />
                Tailored to your life stage and needs.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="flex flex-col gap-1">
                  <span className="text-3xl font-bold text-white">25k+</span>
                  <span className="text-sm text-slate-500">
                    Active Policies
                  </span>
                </div>
                <div className="w-px h-12 bg-slate-700" />
                <div className="flex flex-col gap-1">
                  <span className="text-3xl font-bold text-white">98%</span>
                  <span className="text-sm text-slate-500">Claim Ratio</span>
                </div>
              </div>
            </div>

            {/* Right Side: Switchable Content */}
            <div className="lg:col-span-7">
              {isCalculatorActive ? (
                <CalculatorForm onCancel={() => setIsCalculatorActive(false)} />
              ) : (
                <CalculatorContent
                  onStart={() => setIsCalculatorActive(true)}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default InsuranceCalculator;
