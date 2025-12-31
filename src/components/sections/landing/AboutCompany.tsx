// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   CheckCircle2,
//   HandCoins,
//   Handshake,
//   ShieldCheck,
// } from "lucide-react";
// import Image from "next/image";

// function AboutCompany() {
//   return (
//     <>
//       <section className="container section_margin mb-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//           <div>
//             <Image
//               src="/assets/landing/about-us.png"
//               alt="About us"
//               width={650}
//               height={450}
//               className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
//             />
//           </div>
//           {/* RIGHT COLUMN: Content */}
//           <div className="flex flex-col space-y-6">
//             {/* Headings */}

//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <span className="h-px w-8 bg-primary"></span>
//                 <h3 className="text-primary font-bold tracking-widest text-sm uppercase">
//                   About Our Company
//                 </h3>
//               </div>
//               <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
//                 Providing the best <br />
//                 <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-amber-500">
//                   insurance policy
//                 </span>{" "}
//                 <br />
//                 to customers
//               </h2>
//             </div>

//             {/* Description Text */}
//             <p className="text-paragraph">
//               We understand that protecting your loved ones is your top
//               priority. Our comprehensive insurance plans are designed to give
//               you peace of mind, ensuring financial stability no matter what
//               life brings. Experience transparent policies tailored to your
//               unique needs.
//             </p>

//             {/* Feature Icons Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
//               {/* Feature 1 */}
//               <div className="flex flex-col sm:items-center sm:text-center gap-3 group">
//                 <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
//                   <ShieldCheck className="w-7 h-7 text-primary" />
//                 </div>
//                 <h4 className="font-semibold text-paragraph leading-tight">
//                   Fast & Easy
//                   <br />
//                   Process
//                 </h4>
//               </div>

//               {/* Feature 2 */}
//               <div className="flex flex-col sm:items-center sm:text-center gap-3 group">
//                 <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
//                   <Handshake className="w-7 h-7 text-primary" />
//                 </div>
//                 <h4 className="font-semibold text-paragraph leading-tight">
//                   Control Over
//                   <br />
//                   Policy
//                 </h4>
//               </div>

//               {/* Feature 3 */}
//               <div className="flex flex-col sm:items-center sm:text-center gap-3 group">
//                 <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
//                   <HandCoins className="w-7 h-7 text-primary" />
//                 </div>
//                 <h4 className="font-semibold text-paragraph leading-tight">
//                   Save your
//                   <br />
//                   Money
//                 </h4>
//               </div>
//             </div>

//             {/* Checkmark List */}
//             <div className="flex items-center gap-3 pt-2">
//               <div className="bg-yellow-400 rounded-full p-0.5">
//                 <CheckCircle2 className="w-5 h-5 text-white fill-yellow-400" />
//               </div>
//               <span className="text-slate-700 font-medium text-lg">
//                 7 Days Claim settlement
//               </span>
//             </div>

//             {/* CTA Button */}
//             <div className="pt-6">
//               <Button size="lg" className="gap-2 font-semibold">
//                 Discover More <ArrowRight className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default AboutCompany;

"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Smartphone, Clock } from "lucide-react";
import Image from "next/image";
import { useAboutContent } from "@/hooks/content/use-about-content";
import Link from "next/link";

// Map icons to index for dynamic rendering
const ICONS = [Clock, Smartphone, ShieldCheck];

function AboutCompany() {
  const content = useAboutContent();

  return (
    <section className="container mx-auto px-4 py-20 lg:py-32 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* --- LEFT COLUMN: Image & Floating Badge --- */}
        <div className="relative group">
          {/* Background Decorator Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand/5 rounded-full blur-3xl -z-10" />

          <div className="relative rounded-3xl overflow-hidden border-8 border-white shadow-2xl shadow-brand/10">
            <Image
              src="/assets/landing/about-us.png" // Ensure high quality image
              alt="Sonali Life Office"
              width={650}
              height={500}
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000"
            />
          </div>

          {/* Floating 'Success' Card */}
          <div className="absolute -bottom-8 -right-4 md:-right-10 bg-white p-6 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-amber-100 max-w-[240px] animate-bounce-slow">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-3xl font-black text-brand">
                {content.imageBadge.value}
              </span>
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">
              {content.imageBadge.label}
            </p>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Content --- */}
        <div className="flex flex-col space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/10 self-start">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-brand font-bold text-xs uppercase tracking-widest">
                {content.badge}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-brand leading-[1.15]">
              {content.title.line1} <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">
                {content.title.highlight}
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            {content.description}
          </p>

          {/* Premium Feature List */}
          <div className="space-y-2 pt-2">
            {content.features.map((feature, index) => {
              const Icon = ICONS[index];
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group/item"
                >
                  <div className="shrink-0 w-12 h-12 rounded-full bg-brand/5 flex items-center justify-center group-hover/item:bg-amber-500 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-brand group-hover/item:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link href="/company/about">
              <Button
                variant="gold"
                size="pill"
                // className="h-14 px-8 text-base shadow-xl shadow-amber-500/10"
              >
                {content.cta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCompany;
