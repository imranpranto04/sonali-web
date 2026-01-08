import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. HERO SKELETON (Matches your Navy Header) */}
      <div className="relative h-[400px] w-full bg-slate-900 overflow-hidden">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center gap-6 pt-20">
          {/* Badge Placeholder */}
          <Skeleton className="h-8 w-40 rounded-full bg-white/10" />

          {/* Title Placeholder */}
          <div className="space-y-3 flex flex-col items-center">
            <Skeleton className="h-12 md:h-16 w-3/4 max-w-2xl bg-white/10" />
            <Skeleton className="h-12 md:h-16 w-1/2 max-w-lg bg-white/10" />
          </div>
        </div>
      </div>

      {/* 2. CONTENT GRID SKELETON */}
      <div className="container mx-auto px-4 -mt-20 relative z-10 pb-20">
        {/* Filter Bar / Search Bar Placeholder */}
        <div className="flex justify-center mb-10">
          <Skeleton className="h-12 w-full max-w-md rounded-full bg-white shadow-sm" />
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-[350px] w-full rounded-3xl bg-white border border-slate-100 p-6 space-y-4 shadow-sm"
            >
              {/* Image Area */}
              <Skeleton className="h-40 w-full rounded-2xl bg-slate-100" />

              {/* Text Lines */}
              <div className="space-y-2 pt-4">
                <Skeleton className="h-6 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-1/2 rounded-lg" />
              </div>

              {/* Button Area */}
              <div className="pt-4">
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
