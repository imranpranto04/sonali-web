"use client";

import { useState } from "react";
import Image from "next/image";
import { usePublicContent } from "@/hooks/use-public-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a class merger, or standard strings

export interface MetroMember {
  name: string;
  designation: string;
  image: string;
}

const FILTERS = [
  { label: "All Members", value: "all" },
  { label: "Deputy Managing Director (DMD)", value: "dmd" },
  { label: "Assistant Managing Director (AMD)", value: "amd" },
];

export default function MetroProjectList({
  initialData,
}: {
  initialData: MetroMember[];
}) {
  const [activeFilter, setActiveFilter] = useState("all");

  // Fetch data based on the active filter
  // The query key will automatically update when 'activeFilter' changes
  const { data: members, isLoading } = usePublicContent<MetroMember[]>(
    "officeinfo/metroproject", // This maps to {{base_url}}/officeinfo/metroproject
    {
      searchfor: activeFilter,
    }
  );

  // Use initial data only on first load (when filter is 'all'), otherwise use fetched data
  const showData =
    activeFilter === "all" && !members ? initialData : members || [];

  return (
    <div className="space-y-10">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {FILTERS.map((filter) => (
          <Button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            variant={activeFilter === filter.value ? "default" : "outline"}
            className={cn(
              "rounded-full px-6 transition-all duration-300",
              activeFilter === filter.value
                ? "bg-slate-900 hover:bg-slate-700 text-white border-orange-600 shadow-md"
                : "text-slate-600 border-slate-200 hover:border-orange-200 hover:bg-orange-50 cursor-pointer"
            )}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Grid Content */}
      {isLoading && activeFilter !== "all" ? (
        <MetroSkeleton />
      ) : showData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showData.map((member: MetroMember, idx: number) => (
            <MemberCard key={`${member.name}-${idx}`} member={member} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-400 italic">
            No members found for this category.
          </p>
        </div>
      )}
    </div>
  );
}

// --- Sub-Components ---

function MemberCard({ member }: { member: MetroMember }) {
  // Construct Image URL
  const imageUrl = member.image
    ? `https://erp.sonalilife.com/PayRollUI/UploadEmpImage/${member.image}`
    : null;

  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 group bg-white rounded-2xl h-full">
      <div className="relative h-72 w-full bg-slate-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={member.name}
            fill
            className="object-contain object-top transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <User className="w-20 h-20 opacity-20" />
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      </div>

      <CardContent className="p-6 text-center relative -mt-12">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 relative z-10 mx-2">
          <h3 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
            {member.name}
          </h3>
          <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">
            {member.designation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function MetroSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden bg-white shadow-sm h-80"
        >
          <Skeleton className="h-60 w-full bg-slate-100" />
          <div className="p-4 flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
