"use client";

import { ShieldCheck, CheckCircle2, Sprout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AuthBannerProps {
  userType: "policyholder" | "agent";
  isAnimating: boolean;
}

export function AuthBanner({ userType, isAnimating }: AuthBannerProps) {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 text-white p-12 flex-col justify-between overflow-hidden group">
      {/* Dynamic Background Image */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          isAnimating ? "opacity-90" : "opacity-60"
        }`}
      >
        <Image
          src={
            userType === "policyholder"
              ? "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop" // Family/Bangladeshi Context
              : "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop" // Professional/Office
          }
          height={500}
          width={500}
          alt="Background"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-800 via-slate-900/70 to-slate-900/40"></div>
      </div>

      {/* Brand Header */}
      <Link href="/">
        <div className="relative z-10 flex items-center justify-center bg-white py-2 rounded-xl gap-2 opacity-85 hover:opacity-100 transform transition-transform duration-[3s]">
          {/* <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
          <Sprout className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-extrabold tracking-tight">
          Sonali<span className="text-orange-500">Life</span>
        </span> */}
          <Image src="/logo.png" alt="Sonali Life" width={250} height={55} />
        </div>
      </Link>

      {/* Dynamic Text Content */}
      <div
        className={`relative z-10 space-y-4 transition-all duration-500 ${
          isAnimating ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-2 ${
            userType === "policyholder"
              ? "bg-orange-500/10 border-orange-500/30 text-orange-300"
              : "bg-slate-500/10 border-slate-500/30 text-blue-300"
          }`}
        >
          {userType === "policyholder" ? "Customer Portal" : "Business Portal"}
        </div>

        <h2 className="text-4xl font-extrabold leading-tight">
          {userType === "policyholder" ? (
            <>
              Surakshit Jibon, <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-200">
                Nischit Bhabishyat.
              </span>
            </>
          ) : (
            <>
              Building a Stronger <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-200">
                Bangladesh Together.
              </span>
            </>
          )}
        </h2>

        <p className="text-slate-300 text-lg max-w-md leading-relaxed">
          {userType === "policyholder"
            ? "Login to access your policy status, pay premiums online, and view your maturity benefits."
            : "Access your agent dashboard, track new businesses, and manage client portfolios."}
        </p>
      </div>

      {/* Footer Features */}
      <div className="relative z-10 space-y-4 border-t border-white/10 pt-8">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
            <ShieldCheck className="w-4 h-4 text-green-400" />
          </div>
          <span>Secured by IDRA Regulations</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-orange-400" />
          </div>
          <span>Trusted by 5 Million+ Families</span>
        </div>
      </div>
    </div>
  );
}
