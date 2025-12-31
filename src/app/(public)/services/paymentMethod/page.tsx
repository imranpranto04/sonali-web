import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, CreditCard, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Methods | Sonali Life Insurance",
  description:
    "View our secure and convenient payment options for your insurance premium.",
};

export default function PaymentMethodPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center py-20 px-4 relative overflow-hidden">
      {/* --- BACKGROUND DECORATION (Premium Feel) --- */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-linear-to-b from-[#1e5b98]/10 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 w-full max-w-5xl">
        {/* 1. Header Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100 mb-2">
            <Lock className="w-3.5 h-3.5 text-green-600" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
              Secure Transaction
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 tracking-tight">
            Payment <span className="text-orange-500">Methods</span>
          </h1>

          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            We accept a variety of secure payment options to make your premium
            payment hassle-free.
          </p>
        </div>

        {/* 2. The Main Image Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-white/50 overflow-hidden backdrop-blur-sm p-4 md:p-8 relative group">
          {/* Decorative Corner Accent */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-orange-500/10 to-transparent rounded-bl-full -mr-4 -mt-4 transition-all group-hover:scale-110" />

          {/* THE STATIC IMAGE */}
          <div className="relative w-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
            {/* REPLACE '/images/payment-methods.jpg' with your actual image path.
               width={1200} height={800} defines the aspect ratio, but 'w-full h-auto' makes it responsive.
            */}
            <Image
              src="/assets/inner/Payment-Method.jpg"
              alt="Sonali Life Payment Methods"
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              priority // Loads instantly for SEO/LCP
            />
          </div>

          {/* Footer Info inside Card */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-slate-300" />
              <span>SSL Encrypted</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-slate-300" />
              <span>Instant Processing</span>
            </div>
          </div>
        </div>

        {/* 3. Bottom Help Text */}
        <div className="text-center mt-10">
          <p className="text-slate-400 text-sm">
            Need help with payment? Contact our{" "}
            <span className="text-orange-500 font-bold cursor-pointer hover:underline">
              Support
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
