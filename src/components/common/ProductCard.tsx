import {
  ArrowRight,
  GraduationCap,
  Shield,
  HeartHandshake,
} from "lucide-react";
import Image from "next/image";

// --- TYPES ---
interface InsurancePlan {
  id: string;
  title: string;
  image: string;
  headline: string;
  description: string;
  icon?: React.ReactNode; // Optional icon for visual flair
}

function ProductCard({ plan }: { plan: InsurancePlan }) {
  return (
    <>
      <div className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2">
        {/* 1. Image Area with Zoom Effect */}
        <div className="relative h-56 overflow-hidden">
          {/* <div className="absolute inset-0 bg-slate-200 animate-pulse" /> */}
          <div className="absolute inset-0" />
          {/* Loading Skeleton Placeholder */}
          <Image
            src={plan.image}
            alt={plan.headline}
            height={450}
            width={500}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          {/* Overlay gradient for depth */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* 2. Title Band (The Yellow Strip) */}
        <div className="bg-amber-400 py-3 px-4 relative z-10">
          <h3 className="text-center font-bold text-slate-900 text-sm md:text-base uppercase tracking-wide flex items-center justify-center gap-2">
            {plan.icon}
            {plan.title}
          </h3>
          {/* Little triangle arrow pointing down from the band (CSS trick) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-amber-400"></div>
        </div>

        {/* 3. Content Body */}
        <div className="flex flex-col grow p-6 pt-8 text-center">
          <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-amber-600 transition-colors duration-300">
            {plan.headline}
          </h4>
          <p className="text-slate-600 text-sm leading-relaxed mb-6 grow">
            {plan.description}
          </p>

          {/* 4. Action Button with Slide Effect */}
          <div className="mt-auto">
            <button className="w-full relative overflow-hidden rounded-lg bg-amber-400/20 py-3 px-6 text-goldenrod font-bold transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
              <span className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                View Details
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
