import { Trophy, CheckCircle2, ArrowRight, Star } from "lucide-react";
import Image from "next/image";

// Data derived from your request
const AWARD_CATEGORIES = [
  "Sustainable Life Insurance Company of the Year",
  "Best Life Insurance Company in Public Sector",
  "Best use of Mobile Technology",
  "Best use of IT & Technology",
];

function AwardSection() {
  return (
    <>
      <section
        className="bg-slate-50 relative overflow-hidden py-10 "
        id="awards"
      >
        {/* Background Decor (Subtle) */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 translate-x-20 z-0"></div>

        <div className="absolute -left-[10%] top-[20%] w-[30%] h-[30%] bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-[10%] bottom-[20%] w-[30%] h-[30%] bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* LEFT: Trophy Image (Hero Visual) */}
            <div className="w-full lg:w-1/2 relative group">
              {/* Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10">
                {/* Overlay Gradient for Text Readability if needed, or just hover effect */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>

                {/* Main Image */}
                <Image
                  src="/assets/landing/award.png"
                  alt="South Asian Business Excellence Awards Trophies"
                  height={350}
                  width={625}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* "4th Consecutive Year" Floating Badge */}
              <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-orange-500 text-white p-6 rounded-2xl shadow-xl z-20 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-3 h-3 fill-white text-white" />
                  ))}
                </div>
                <span className="text-4xl font-extrabold leading-none">
                  4th
                </span>
                <span className="text-xs font-bold uppercase tracking-wider mt-1 opacity-90">
                  Consecutive Year
                </span>
                <span className="text-[10px] opacity-75 mt-1">
                  (2021 - 2024)
                </span>
              </div>

              {/* Background Blob for Depth */}
              <div className="absolute -z-10 top-10 -left-10 w-full h-full bg-orange-200 rounded-3xl hidden lg:block"></div>
            </div>

            {/* RIGHT: Content & List */}
            <div className="w-full lg:w-1/2 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-orange-600 font-bold uppercase tracking-widest text-xs bg-orange-50 px-3 py-1 rounded-full w-fit">
                  <Trophy className="w-4 h-4" /> Global Recognition
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                  Excellence Recognized at <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-500">
                    SAPE Awards 2024
                  </span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  We are honored to receive the South Asian Business Excellence
                  Award for our unwavering commitment to innovation, stability,
                  and service.
                </p>
              </div>

              {/* Award Categories List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {AWARD_CATEGORIES.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-orange-200 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm group-hover:border-orange-500 group-hover:bg-orange-500 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-green-500 group-hover:text-white" />
                    </div>
                    <span className="font-bold text-slate-700 group-hover:text-slate-900 text-sm md:text-base">
                      {category}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA / Footer */}
              <div className="pt-4 flex items-center gap-6">
                <button className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-orange-600 transition-all flex items-center gap-2 group">
                  View Full Journey{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AwardSection;
