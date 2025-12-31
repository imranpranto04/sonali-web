// import { Button } from "@/components/ui/button";

// function Consultation() {
//   return (
//     <>
//       <section className="container mt-15">
//         <div className="">
//           {/* THE CARD CONTAINER
//            - rounded-3xl: Modern, soft corners
//            - overflow-hidden: Keeps the linear contained
//         */}
//           <div className="relative overflow-hidden rounded-3xl px-6 py-12 lg:px-16 lg:py-16">
//             <div className="absolute inset-0 bg-linear-to-r from-orange-100/80 via-white to-teal-100/80 z-0 pointer-events-none" />

//             {/* CONTENT WRAPPER (z-10 to sit on top of background) */}
//             <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 text-center lg:text-left">
//               {/* Left Side: Text */}
//               <div className="flex flex-col gap-4 max-w-3xl">
//                 <h2 className="text-3xl md:text-4xl font-bold text-secondary">
//                   Get Immediate{" "}
//                   <span className="text-primary">Free Consultation!</span>
//                 </h2>
//                 <p className="">
//                   This online plan advisor help you to choose appropriate plan.
//                   Tell us a little about you and we will guide you to get the
//                   best plan.
//                 </p>
//               </div>

//               {/* Right Side: Button */}
//               <div className="shrink-0">
//                 <Button variant="gold" size="pill">
//                   Get Your Free Quote
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Consultation;

"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useConsultationContent } from "@/hooks/content/use-consultation-content";

function Consultation() {
  const content = useConsultationContent();

  return (
    <section className="container mt-20 relative z-20 mb-20">
      {/* PREMIUM DESIGN STRATEGY:
        Instead of a light background, we use your Brand Navy (#111240) 
        to create a high-contrast block that stands out on the white page.
      */}
      <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-brand/20 group">
        {/* --- 1. Background Layers --- */}
        {/* Base Dark Brand Color */}
        <div className="absolute inset-0 bg-brand z-0" />

        {/* linear Overlay (Gold Glow from right) */}
        <div className="absolute inset-0 bg-linear-to-l from-amber-600/20 via-transparent to-transparent z-0 pointer-events-none" />

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 bg-size-[30px_30px] opacity-10 z-0 mix-blend-overlay" />

        {/* Decorative Circle (Bottom Left Glow) */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl z-0" />

        {/* --- 2. Content Wrapper --- */}
        <div className="relative z-10 px-8 py-12 lg:px-16 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          {/* Left: Text Content */}
          <div className="flex flex-col gap-4 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {content.title.main}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-amber-500">
                {content.title.highlight}
              </span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
              {content.description}
            </p>
          </div>

          {/* Right: Action Button */}
          <div className="shrink-0">
            <Button
              variant="gold"
              size="pill"
              // className="h-16 px-10 text-lg shadow-[0_0_40px_-10px_rgba(245,158,11,0.6)] hover:shadow-[0_0_60px_-10px_rgba(245,158,11,0.8)] transition-shadow duration-500"
            >
              <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
              {content.cta}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Consultation;
