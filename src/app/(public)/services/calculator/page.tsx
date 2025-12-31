import CalculatorForm from "@/components/services/calculator/CalculatorForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Calculator | Sonali Life Insurance",
  description:
    "Calculate your insurance premium instantly with our advanced tools.",
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Abstract Background Shapes for Premium Feel */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/40 blur-3xl" />
      </div>

      <div className="w-full max-w-4xl relative z-10">
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Premium <span className="text-orange-500">Calculator</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Plan your future with precision. Get an instant estimate for your
            life insurance policy.
          </p>
        </div>

        <CalculatorForm />

        {/* <p className="text-center text-slate-400 text-sm mt-8">
          © {new Date().getFullYear()} Sonali Life Insurance Company Limited.
          All rights reserved.
        </p> */}
      </div>
    </div>
  );
}
