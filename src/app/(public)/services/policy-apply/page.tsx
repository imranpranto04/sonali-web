import PolicyForm from "@/components/ApplyOnlinePolicy/PolicyForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply for Policy | Sonali Life Insurance",
  description: "Begin your journey with Sonali Life Insurance.",
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden selection:bg-emerald-100">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-linear-to-b from-emerald-900 to-slate-900 -z-10" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-emerald-500 blur-3xl" />
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-600 tracking-tight">
            Policy <span className="text-emerald-400">Application</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Step 1 of 4: Let's start with your basic details.
          </p>
        </div>

        {/* The Form Card */}
        <div className="max-w-4xl mx-auto">
          <PolicyForm />
        </div>
      </div>
    </div>
  );
}
