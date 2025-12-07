import React from "react";
import {
  Smartphone,
  CheckCircle2,
  Calculator,
  FileText,
  UserCheck,
  Search,
  Phone,
  Info,
  User,
  Lock,
} from "lucide-react";
import Image from "next/image";

function MobileApp() {
  return (
    <>
      <div className="w-full bg-slate-100">
        <section className="relative section_padding w-full bg-[#f97316]  overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-white to-transparent"></div>

          <div className="container">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pb-0">
              {/* LEFT: Text Content (The version you liked) */}
              <div className="lg:w-1/2 space-y-8 pb-16 lg:pb-24 relative z-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-md">
                  <Smartphone className="w-3 h-3" /> Mobile App
                </div>

                <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
                  Insurance at your <br />
                  fingertips.
                </h2>

                <p className="text-lg md:text-xl text-orange-50 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Manage your policy, pay premiums, and file claims directly
                  from your smartphone. Download the Sonali Life app today.
                </p>

                {/* <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm font-semibold text-white/90">
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" /> Fast Claims
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" /> Secure Payments
                  </div>
                </div> */}

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                  {/* Google Play */}
                  <button className="flex items-center gap-3 bg-slate-950 text-white px-6 py-3 rounded-xl hover:bg-slate-900 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 group border border-slate-800 cursor-pointer">
                    <div className="w-8 h-8 group-hover:text-green-400 transition-colors">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-full h-full"
                      >
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.3,12.5L17.38,15.69L15.13,13.44L17.38,11.19L20.3,14.38C20.53,13.96 20.53,12.92 20.3,12.5M13.69,12L3.84,2.15L6.05,2.66L16.81,8.88L13.69,12Z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">
                        Get it on
                      </div>
                      <div className="text-lg font-bold leading-none font-sans">
                        Google Play
                      </div>
                    </div>
                  </button>

                  {/* App Store */}
                  <button className="flex items-center gap-3 bg-slate-950 text-white px-6 py-3 rounded-xl hover:bg-slate-900 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 group border border-slate-800 cursor-pointer">
                    <div className="w-8 h-8 group-hover:text-gray-300 transition-colors">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-full h-full"
                      >
                        <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.37 12.36,4.26 13,3.5Z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">
                        Download on
                      </div>
                      <div className="text-lg font-bold leading-none font-sans">
                        App Store
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* RIGHT: Phone Mockup (Recreating the App UI) */}
              <div className="lg:w-1/2 flex justify-center lg:justify-end relative h-full">
                <div className="">
                  <Image
                    src="/assets/landing/app-img.png"
                    alt="Sonali App"
                    height={550}
                    width={1100}
                    className="object-contain hover:scale-105 transition-all duration-500 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default MobileApp;
