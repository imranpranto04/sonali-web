import { Star, Quote, Sprout } from "lucide-react";
import Image from "next/image";

// 1. Define the shape of your data
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

function ReviewCard({ item }: { item: Testimonial }) {
  return (
    <>
      {/* <div className="h-full p-2">
        <div className="h-full bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 relative flex flex-col group overflow-hidden">
          Top Accent
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-orange-400 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity" />
          Header
          <div className="flex justify-between items-start mb-6">
            <div className="relative">
              Image Shape
              <div className="w-16 h-16 rounded-br-2xl rounded-tl-xl rounded-bl-lg rounded-tr-lg overflow-hidden border-2 border-slate-100 group-hover:border-orange-200 transition-colors">
                <Image
                  height={150}
                  width={150}
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            Brand Logo
            <div className="flex flex-col items-center opacity-60 group-hover:opacity-100 transition-opacity">
              <Sprout className="w-6 h-6 text-green-600 fill-green-600" />
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-1">
                SLI
              </span>
            </div>
          </div>
          Rating
          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < item.rating
                    ? "text-orange-400 fill-orange-400"
                    : "text-slate-200 fill-slate-200"
                }`}
              />
            ))}
          </div>
          Content
          <p className="text-slate-600 text-sm leading-relaxed italic grow">
            "{item.content}"
          </p>
          Footer
          <div className="mt-6 pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-900">{item.name}</h4>
            <p className="text-xs text-orange-500 font-bold uppercase tracking-wide">
              {item.role}
            </p>
          </div>
        </div>
      </div> */}
      <div className="h-full p-3 select-none">
        <div className="group h-full relative bg-white rounded-4xl p-8 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(249,115,22,0.15)] hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col">
          {/* Decorative Top Gradient Line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-orange-500 via-orange-300 to-slate-100 opacity-80 group-hover:opacity-100 transition-opacity" />

          {/* Background Quote Watermark (Subtle) */}
          <Quote className="absolute top-6 right-6 w-16 h-16 text-slate-50 group-hover:text-orange-500/50 transition-colors duration-500 -rotate-12 pointer-events-none" />

          {/* Header: User Profile & Rating */}
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="relative shrink-0">
              {/* Image Ring Effect */}
              <div className="absolute -inset-1 bg-linear-to-br from-orange-400 to-transparent rounded-full opacity-30 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md relative">
                <Image
                  height={150}
                  width={150}
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Verified Badge */}
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-slate-100">
                <Sprout className="w-3 h-3 text-green-600 fill-green-600" />
                {/* <Image height={40} width={10} src="/logo-sm.png" alt="SLi" /> */}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-orange-600 transition-colors duration-300">
                {item.name}
              </h4>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {item.role}
              </p>

              {/* Compact Star Rating */}
              <div className="flex gap-0.5 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < item.rating
                        ? "text-orange-400 fill-orange-400"
                        : "text-slate-200 fill-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial Content */}
          <p className="text-slate-600 text-[15px] leading-relaxed italic grow relative z-10 group-hover:text-slate-800 transition-colors duration-300">
            "{item.content}"
          </p>

          {/* Bottom decorative dash */}
          <div className="w-12 h-1 bg-orange-100 rounded-full mt-6 group-hover:w-20 group-hover:bg-orange-400 transition-all duration-500" />
        </div>
      </div>
    </>
  );
}

export default ReviewCard;
