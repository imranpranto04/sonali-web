// import React from "react";
// import {
//   Smartphone,
//   CheckCircle2,
//   Calculator,
//   FileText,
//   UserCheck,
//   Search,
//   Phone,
//   Info,
//   User,
//   Lock,
// } from "lucide-react";
// import Image from "next/image";

// function MobileApp() {
//   return (
//     <>
//       <div className="w-full bg-slate-100">
//         <section className="relative section_padding w-full bg-[#f97316]  overflow-hidden">
//           {/* Background Pattern */}
//           <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-linear(circle_at_top_right,var(--tw-linear-stops))] from-white to-transparent"></div>

//           <div className="container">
//             <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pb-0">
//               {/* LEFT: Text Content (The version you liked) */}
//               <div className="lg:w-1/2 space-y-8 pb-16 lg:pb-24 relative z-10 text-center lg:text-left">
//                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-md">
//                   <Smartphone className="w-3 h-3" /> Mobile App
//                 </div>

//                 <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
//                   Insurance at your <br />
//                   fingertips.
//                 </h2>

//                 <p className="text-lg md:text-xl text-orange-50 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
//                   Manage your policy, pay premiums, and file claims directly
//                   from your smartphone. Download the Sonali Life app today.
//                 </p>

//                 {/* <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm font-semibold text-white/90">
//                   <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg">
//                     <CheckCircle2 className="w-4 h-4" /> Fast Claims
//                   </div>
//                   <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg">
//                     <CheckCircle2 className="w-4 h-4" /> Secure Payments
//                   </div>
//                 </div> */}

//                 <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
//                   {/* Google Play */}
//                   <button className="flex items-center gap-3 bg-slate-950 text-white px-6 py-3 rounded-xl hover:bg-slate-900 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 group border border-slate-800 cursor-pointer">
//                     <div className="w-8 h-8 group-hover:text-green-400 transition-colors">
//                       <svg
//                         viewBox="0 0 24 24"
//                         fill="currentColor"
//                         className="w-full h-full"
//                       >
//                         <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.3,12.5L17.38,15.69L15.13,13.44L17.38,11.19L20.3,14.38C20.53,13.96 20.53,12.92 20.3,12.5M13.69,12L3.84,2.15L6.05,2.66L16.81,8.88L13.69,12Z" />
//                       </svg>
//                     </div>
//                     <div className="text-left">
//                       <div className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">
//                         Get it on
//                       </div>
//                       <div className="text-lg font-bold leading-none font-sans">
//                         Google Play
//                       </div>
//                     </div>
//                   </button>

//                   {/* App Store */}
//                   <button className="flex items-center gap-3 bg-slate-950 text-white px-6 py-3 rounded-xl hover:bg-slate-900 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 group border border-slate-800 cursor-pointer">
//                     <div className="w-8 h-8 group-hover:text-gray-300 transition-colors">
//                       <svg
//                         viewBox="0 0 24 24"
//                         fill="currentColor"
//                         className="w-full h-full"
//                       >
//                         <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.37 12.36,4.26 13,3.5Z" />
//                       </svg>
//                     </div>
//                     <div className="text-left">
//                       <div className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">
//                         Download on
//                       </div>
//                       <div className="text-lg font-bold leading-none font-sans">
//                         App Store
//                       </div>
//                     </div>
//                   </button>
//                 </div>
//               </div>

//               {/* RIGHT: Phone Mockup (Recreating the App UI) */}
//               <div className="lg:w-1/2 flex justify-center lg:justify-end relative h-full">
//                 <div className="">
//                   <Image
//                     src="/assets/landing/app-img.png"
//                     alt="Sonali App"
//                     height={550}
//                     width={1100}
//                     className="object-contain hover:scale-105 transition-all duration-500 rounded-xl"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }

// export default MobileApp;
"use client";

import { useEffect, useState } from "react";
import { Smartphone, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useMobileAppContent } from "@/hooks/use-mobile-app-content";

export default function MobileApp() {
  const content = useMobileAppContent();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    // REDUCED PADDING: py-16 instead of py-24
    <section className="w-full bg-brand relative overflow-hidden py-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-linear-to-br from-brand via-slate-900 to-brand" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute inset-0 bg-[url('/assets/bg/grid-pattern.svg')] bg-size-[30px_30px] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* REDUCED GAP: gap-8 instead of gap-20 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* --- LEFT COLUMN: CONTENT --- */}
          {/* REDUCED SPACING: space-y-5 instead of space-y-8 */}
          <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
            {/* Badge & Title */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 text-[11px] font-bold uppercase tracking-widest shadow-lg">
                <Smartphone className="w-3 h-3" />
                {content.badge}
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                {content.title.line1} <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-amber-600">
                  {content.title.line2}
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-base text-slate-300 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              {content.description}
            </p>

            {/* Features (Compact Row) */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2">
              {content.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm font-bold text-white/90"
                >
                  <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                  </div>
                  {feature}
                </div>
              ))}
            </div>

            {/* Download Buttons (Smaller Padding) */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
              <StoreButton
                type="google"
                href="https://play.google.com/store/apps/details?id=com.sonalilife.sonalilife" // 👈 PASTE GOOGLE LINK HERE
                sub={content.buttons.google.sub}
                main={content.buttons.google.main}
              />
              <StoreButton
                type="apple"
                href="https://apps.apple.com/us/app/sonali-life-insurance/id123456789" // 👈 PASTE APPLE LINK HERE
                sub={content.buttons.apple.sub}
                main={content.buttons.apple.main}
              />
            </div>
          </div>

          {/* --- RIGHT COLUMN: IMAGE --- */}
          {/* REDUCED HEIGHT: min-h-[400px] instead of 600px */}
          <div className="relative flex justify-center lg:justify-end h-[400px] lg:h-[500px] order-1 lg:order-2">
            <div className="relative w-full max-w-[350px] h-full">
              <Image
                src="https://images.unsplash.com/photo-1556656793-02715d8dd6f8?q=80&w=2000&auto=format&fit=crop"
                alt="Sonali Life Mobile App"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper Component for cleaner code
function StoreButton({
  type,
  href, // New Prop
  sub,
  main,
}: {
  type: "google" | "apple";
  href: string;
  sub: string;
  main: string;
}) {
  const isGoogle = type === "google";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 rounded-xl border border-white/10 transition-all hover:border-amber-500/30 group cursor-pointer"
    >
      <svg
        className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        {isGoogle ? (
          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.3,12.5L17.38,15.69L15.13,13.44L17.38,11.19L20.3,14.38C20.53,13.96 20.53,12.92 20.3,12.5M13.69,12L3.84,2.15L6.05,2.66L16.81,8.88L13.69,12Z" />
        ) : (
          <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.37 12.36,4.26 13,3.5Z" />
        )}
      </svg>
      <div className="text-left">
        <div className="text-[9px] uppercase font-bold text-slate-400 mb-0.5">
          {sub}
        </div>
        <div className="text-sm font-bold font-sans">{main}</div>
      </div>
    </a>
  );
}
