"use client";

import { useRef } from "react";
import { Star, Quote, Sprout } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ReviewCard from "@/components/common/ReviewCard";

// --- DATA ---
const TESTIMONIALS = [
  {
    id: 1,
    name: "Smith Vectoria",
    role: "CEO & Co-Founder",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    content:
      "It is sometimes furnished unwilling as additions so. Blessing resolved peculiar fat graceful ham. Sussex on at really ladies in as elinor.",
    rating: 5,
  },
  {
    id: 2,
    name: "John Doe",
    role: "Business Owner",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    content:
      "Advice branch vanity or do thirty living. Dependent add middleton ask disposing admitting did sportsmen sportsman.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Khan",
    role: "School Teacher",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
    content:
      "Sonali Life made the claim process incredibly smooth. I received the settlement within 5 days as promised.",
    rating: 4,
  },
  {
    id: 4,
    name: "Michael Smith",
    role: "Chief Architect",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
    content:
      "The best investment decision I've made. The returns on my DPS policy are higher than what banks offer.",
    rating: 5,
  },
  {
    id: 5,
    name: "Emily Blunt",
    role: "Doctor",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    content:
      "I feel secure knowing my family is protected. The app makes managing my premiums so easy.",
    rating: 5,
  },
];

function Testimonials() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <>
      <section
        className="section_padding bg-slate-50 relative overflow-hidden"
        id="testimonials"
      >
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-blue-500/5 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
          <svg width="100%" height="100%" className="opacity-[0.03]">
            <pattern
              id="dots"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="2"
                cy="2"
                r="1"
                className="text-slate-900"
                fill="currentColor"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="container relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                <Quote className="w-3 h-3" /> Success Stories
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
                Trusted by{" "}
                <span className="text-orange-500 relative whitespace-nowrap">
                  25,000+
                  <svg
                    className="absolute w-full h-3 -bottom-1 left-0 text-orange-300/50 -z-10"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 50 10 100 5"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                  </svg>
                </span>{" "}
                Families
              </h2>
              <p className="text-lg text-slate-600 font-medium max-w-xl">
                See why thousands of families across Bangladesh trust Sonali
                Life for their financial security.
              </p>
            </div>
          </div>

          {/* Slider Window */}
          {/* Carousel */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.play()}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {TESTIMONIALS.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <ReviewCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Controls */}
            <div className="flex justify-center gap-4 mt-8 md:justify-end md:mt-0 md:absolute md:top-0 md:right-0 md:-translate-y-[88px]">
              <CarouselPrevious className="static translate-y-0 h-12 w-12 border-slate-200 hover:border-orange-500 hover:text-orange-600" />
              <CarouselNext className="static translate-y-0 h-12 w-12 border-slate-200 hover:border-orange-500 hover:text-orange-600" />
            </div>
          </Carousel>

          {/* Pagination Dots */}
        </div>
      </section>
    </>
  );
}

export default Testimonials;
