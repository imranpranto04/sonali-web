"use client";

import { useState } from "react";
import Image from "next/image";
import { usePublicContent } from "@/hooks/use-public-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MetroAdmin {
  name: string;
  designation: string;
  image: string;
}

interface MetroAdminListProps {
  initialData: MetroAdmin[];
  dynamicFilters: string[]; // e.g. ["Executive Officer", "DGM"]
}

export default function MetroAdminList({
  initialData,
  dynamicFilters,
}: MetroAdminListProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  // Fetch logic:
  // If "all", send "all".
  // If specific designation selected, send that designation text.
  const { data: members, isLoading } = usePublicContent<MetroAdmin[]>(
    "officeinfo/metroadmin",
    {
      searchfor: activeFilter,
    }
  );

  const showData =
    activeFilter === "all" && !members ? initialData : members || [];

  return (
    <div className="space-y-10">
      {/* Dynamic Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {/* Always show 'All' option first */}
        <Button
          onClick={() => setActiveFilter("all")}
          variant={activeFilter === "all" ? "default" : "outline"}
          className={cn(
            "rounded-full px-6 transition-all duration-300",
            activeFilter === "all"
              ? "bg-orange-600 hover:bg-orange-700 text-white border-orange-600 shadow-md"
              : "text-slate-600 border-slate-200 hover:border-orange-200 hover:bg-orange-50"
          )}
        >
          All Admins
        </Button>

        {/* Render Dynamic Filters from API */}
        {dynamicFilters.map((designation) => (
          <Button
            key={designation}
            onClick={() => setActiveFilter(designation)}
            variant={activeFilter === designation ? "default" : "outline"}
            className={cn(
              "rounded-full px-6 transition-all duration-300",
              activeFilter === designation
                ? "bg-orange-600 hover:bg-orange-700 text-white border-orange-600 shadow-md"
                : "text-slate-600 border-slate-200 hover:border-orange-200 hover:bg-orange-50"
            )}
          >
            {designation}
          </Button>
        ))}
      </div>

      {/* Grid Content */}
      {isLoading && activeFilter !== "all" ? (
        <AdminSkeleton />
      ) : showData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showData.map((member: MetroAdmin, idx: number) => (
            <AdminCard key={`${member.name}-${idx}`} member={member} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-400 italic">
            No administrators found for "{activeFilter}".
          </p>
        </div>
      )}
    </div>
  );
}

// --- CARD COMPONENT (Same as before) ---

function AdminCard({ member }: { member: MetroAdmin }) {
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

        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      </div>

      <CardContent className="p-6 text-center relative -mt-8">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 relative z-10 mx-2">
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

function AdminSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden bg-white shadow-sm h-80 border border-slate-100"
        >
          <Skeleton className="h-60 w-full bg-slate-100" />
          <div className="p-4 flex flex-col items-center gap-2 -mt-10 relative z-10">
            <Skeleton className="h-16 w-3/4 bg-white rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
