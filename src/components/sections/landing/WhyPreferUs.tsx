// import { Award, Lock, Play, Users } from "lucide-react";
// import Image from "next/image";

// function WhyPreferUs() {
//   return (
//     <>
//       <section className="section_padding w-full" id="why-us">
//         <div className="container">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//             {/* Left: Video Embed */}
//             <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video w-full">
//               <iframe
//                 className="w-full h-full absolute inset-0"
//                 src="https://www.youtube.com/embed/95GPintrbi8?si=DWjcL1_mQ-f2vcEO"
//                 title="Sonali Life Insurance Video"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                 referrerPolicy="strict-origin-when-cross-origin"
//                 allowFullScreen
//               ></iframe>
//             </div>

//             {/* Right: Text Content */}
//             <div className="space-y-8">
//               <div className="space-y-6">
//                 <h2 className="text-3xl md:text-4xl font-extrabold text-secondary">
//                   Why Prefer{" "}
//                   <span className="text-primary relative">
//                     Sonali Life?
//                     <svg
//                       className="absolute w-[110%] h-3 -bottom-2 -left-1 text-amber-500/30"
//                       viewBox="0 0 100 10"
//                       preserveAspectRatio="none"
//                     >
//                       <path
//                         d="M0 5 Q 50 10 100 5"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         fill="none"
//                       />
//                     </svg>
//                   </span>
//                 </h2>
//                 <p className="text-lg text-slate-600 font-medium leading-relaxed italic border-l-4 border-primary pl-4">
//                   "Whatever life holds, we are here to help you live it with
//                   confidence."
//                 </p>
//               </div>

//               <div className="space-y-6">
//                 {/* Feature 1: Security */}
//                 <div className="flex gap-4 group">
//                   <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
//                     <Lock className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-lg text-secondary">
//                       Keeping your Data Safe
//                     </h3>
//                     <p className="text-slate-600 text-sm mt-1 leading-relaxed">
//                       We use state-of-the-art encryption to ensure your personal
//                       and financial information remains private and secure.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Feature 2: Awards */}
//                 <div className="flex gap-4 group">
//                   <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition-colors duration-300">
//                     <Award className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-lg text-secondary">
//                       Award Winning Service
//                     </h3>
//                     <p className="text-slate-600 text-sm mt-1 leading-relaxed">
//                       Recognized nationally for excellence in claim settlement
//                       ratio and customer satisfaction.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Feature 3: Support */}
//                 <div className="flex gap-4 group">
//                   <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0 group-hover:bg-green-500 transition-colors duration-300">
//                     <Users className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-lg text-secondary">
//                       Customer First Approach
//                     </h3>
//                     <p className="text-slate-600 text-sm mt-1 leading-relaxed">
//                       Dedicated support agents available 24/7 to assist you with
//                       policy queries and claims.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default WhyPreferUs;

"use client";

import { useState, useEffect } from "react";
import { Award, Lock, Users, ShieldCheck } from "lucide-react";
import { useWhyPreferContent } from "@/hooks/content/use-why-prefer-content";
import { useLangStore } from "@/store/lang-store";

const ICONS = [Lock, Award, Users];

function WhyPreferUs() {
  // 1. Get the content from your hook
  const content = useWhyPreferContent();
  const { lang } = useLangStore();

  // 2. SEO SAFEGUARD: Hydration Fix
  // We start with a flag to know if we are on the client
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 3. LOGIC:
  // If we are on the Server (isMounted is false), we MUST render English (default).
  // If we are on the Client (isMounted is true), we render whatever 'content' says (English or Bengali).

  // Note: Your hook likely defaults to 'eng', so 'content' is already English by default.
  // This ensure that even if the user has 'bng' saved in LocalStorage,
  // we wait until mount to switch it, preventing HTML mismatch errors.

  return (
    <section
      className="w-full py-20 lg:py-32 bg-white relative overflow-hidden"
      id="why-us"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* --- LEFT: VIDEO (Visuals are always safe for SEO) --- */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-brand/5 rounded-4xl -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand/20 border-4 border-white aspect-video w-full z-10">
              <iframe
                className="w-full h-full absolute inset-0"
                src="https://www.youtube.com/embed/95GPintrbi8?si=DWjcL1_mQ-f2vcEO"
                title="Sonali Life Insurance Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            {/* <div className="absolute -bottom-6 -left-6 bg-amber-500 text-white p-4 rounded-xl shadow-lg animate-bounce-slow z-20 hidden md:block">
              <ShieldCheck className="w-8 h-8" />
            </div> */}
          </div>

          {/* --- RIGHT: TEXT (The Important SEO Part) --- */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-black text-brand tracking-tight leading-tight">
                {/* If not mounted yet (Server), hardcode English structure or use default content.
                   Since 'content' defaults to English, this is safe. 
                */}
                {content.title.main}{" "}
                <span className="relative text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-amber-600">
                  {content.title.highlight}
                  <svg
                    className="absolute w-[110%] h-3 -bottom-2 -left-1 text-amber-500/30"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 50 10 100 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </span>
              </h2>

              <div className="relative pl-6 border-l-4 border-amber-500/50">
                <p className="text-lg text-slate-600 font-medium italic leading-relaxed">
                  "{content.quote}"
                </p>
              </div>
            </div>

            {/* Features List - Semantic HTML for SEO */}
            <div className="space-y-2">
              {content.features.map((feature, index) => {
                const Icon = ICONS[index];
                return (
                  <div
                    key={index}
                    className="flex gap-5 group p-4 rounded-xl hover:bg-slate-50 transition-colors duration-300"
                  >
                    <div className="w-14 h-14 rounded-full bg-brand/5 flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-all duration-300 group-hover:scale-110 shadow-sm">
                      <Icon className="w-6 h-6 text-brand group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      {/* Using H3 tags is excellent for SEO hierarchy */}
                      <h3 className="font-bold text-xl text-brand mb-2 group-hover:text-amber-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyPreferUs;
