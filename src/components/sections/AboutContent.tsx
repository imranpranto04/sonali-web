"use client";

import Image from "next/image";
import { Users } from "lucide-react";

// Define the shape of the API response for About Us, using only requested fields
export interface AboutData {
  title: string;
  description: string;
  image: string; // URL for the main image
}

export function AboutContent({ msg }: { msg: AboutData }) {
  // Construct Image URL
  const imageUrl = msg.image
    ? `https://erp.sonalilife.com/Utilities/AboutUsImg/${msg.image}`
    : "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000";

  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative group">
            {/* Orange accent background blob */}
            <div className="absolute top-0 right-0 w-full h-full bg-orange-100/60 rounded-[3rem] transform translate-x-6 translate-y-6 -z-10 transition-transform duration-500 group-hover:translate-x-8 group-hover:translate-y-8"></div>

            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-4/3 border-4 border-white">
              <Image
                src={imageUrl}
                alt={msg.title || "About Sonali Life"}
                fill
                className="object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
                unoptimized
              />
              {/* Subtle overlay for better text contrast if needed, and premium feel */}
              <div className="absolute inset-0 bg-linear-to-t from-orange-900/10 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest border border-orange-100">
                <Users className="w-4 h-4" /> Who We Are
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                {msg.title}
              </h2>
            </div>

            <div className="prose prose-lg text-slate-600 leading-relaxed prose-headings:text-slate-800 prose-a:text-orange-600 hover:prose-a:text-orange-700 prose-strong:text-slate-900 font-sans">
              {/* Render HTML from API content safely */}
              <div dangerouslySetInnerHTML={{ __html: msg.description }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
