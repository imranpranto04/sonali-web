"use client";

import Link from "next/link";
import { Home, ArrowRight, ShieldQuestion, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] relative overflow-hidden p-4">
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />{" "}
      {/* Optional grid texture */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* --- MAIN CARD --- */}
        <div className="bg-white/80 backdrop-blur-2xl border border-white/50 shadow-2xl shadow-slate-200/50 rounded-4xl overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            {/* 404 Text Gradient */}
            <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-linear-to-br from-red-200 to-red-500 select-none leading-none mb-2">
              404
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              Page Not Found
            </h2>
            {/* <p className="text-slate-500 max-w-md mx-auto mb-8 text-base leading-relaxed">
              We can't seem to find the page you're looking for. It might have
              been moved or doesn't exist anymore.
            </p> */}

            <div className="h-px w-full bg-slate-100 mb-8" />

            <div className="flex justify-center mb-7">
              <button
                onClick={() => window.history.back()}
                className="text-md font-bold cursor-pointer text-orange-400 hover:text-orange-500 flex items-center justify-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </div>

            <div>
              <Link href="/" className="inline-block">
                <Image
                  src="/logo-new-eng.png"
                  alt="Logo"
                  width={230}
                  height={80}
                  className="mx-auto mb-6 rounded-xl"
                />
              </Link>
            </div>

            {/* --- HELPFUL LINKS GRID --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {/* Option 1: Go Home */}
              <Link
                href="/"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all bg-white shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    Return Home
                  </h3>
                  <p className="text-xs text-slate-400">
                    Go back to the beginning
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-orange-500 transition-colors" />
              </Link>

              {/* Option 2: Pay Premium */}
              {/* <Link
                href="/pay-premium"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all bg-white shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    Pay Premium
                  </h3>
                  <p className="text-xs text-slate-400">Pay your policy bill</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-blue-500 transition-colors" />
              </Link> */}

              {/* Option 3: Client Login */}
              {/* <Link
                href="/login"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-green-200 hover:bg-green-50/50 transition-all bg-white shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <UserCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    Client Login
                  </h3>
                  <p className="text-xs text-slate-400">
                    Access your dashboard
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-green-500 transition-colors" />
              </Link> */}

              {/* Option 4: Help & Support */}
              <Link
                href="/contact"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all bg-white shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldQuestion className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    Help Center
                  </h3>
                  <p className="text-xs text-slate-400">Contact our support</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-purple-500 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
            <p className="text-xs text-slate-400 font-medium">
              Need urgent assistance? Call us at{" "}
              <span className="text-slate-600 font-bold hover:underline cursor-pointer">
                01976625488
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
