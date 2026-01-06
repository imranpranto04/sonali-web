"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { usePublicContent } from "@/hooks/use-public-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Award } from "lucide-react";
import { cn } from "@/lib/utils";

// --- TYPES ---
export interface BoardMember {
  EmpName: string;
  DesignationName: string;
  ImageName: string;
}

interface BoardAffairsListProps {
  initialData: BoardMember[];
}

export default function BoardAffairsList({
  initialData,
}: BoardAffairsListProps) {
  // Fetch "all" and filter client-side for instant switching
  const { data: apiData, isLoading } = usePublicContent<any>(
    "officeinfo/secretaria",
    { searchfor: "all" }
  );

  const [activeTab, setActiveTab] = useState("All");

  // 1. Prepare Data
  const rawMembers = apiData?.data || apiData || [];
  const allMembers: BoardMember[] =
    rawMembers.length > 0 ? rawMembers : initialData;

  // 2. Extract Designations Dynamically
  const designations = useMemo(() => {
    const unique = Array.from(
      new Set(allMembers.map((m) => m.DesignationName))
    ).filter(Boolean);
    return ["All", ...unique.sort()];
  }, [allMembers]);

  // 3. Filter & Sort (Leader First)
  const filteredMembers = useMemo(() => {
    let members =
      activeTab === "All"
        ? allMembers
        : allMembers.filter((m) => m.DesignationName === activeTab);

    return members.sort((a, b) => {
      const getRank = (d: string) => {
        const lower = d?.toLowerCase() || "";
        if (
          lower.includes("sevp") ||
          (lower.includes("secretary") && !lower.includes("deputy"))
        )
          return 1;
        if (lower.includes("deputy")) return 2;
        if (lower.includes("manager")) return 3;
        return 4;
      };
      return getRank(a.DesignationName) - getRank(b.DesignationName);
    });
  }, [activeTab, allMembers]);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* --- FILTER TABS --- */}
      {!isLoading && allMembers.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {designations.map((desig) => (
            <Button
              key={desig}
              onClick={() => setActiveTab(desig)}
              variant={activeTab === desig ? "default" : "outline"}
              className={cn(
                "rounded-full px-6 transition-all duration-300 border",
                activeTab === desig
                  ? "bg-brand hover:bg-slate-800 text-white border-brand shadow-md shadow-brand/20"
                  : "text-slate-500 border-slate-200 hover:border-amber-200 hover:bg-amber-50"
              )}
            >
              {desig}
            </Button>
          ))}
        </div>
      )}

      {/* --- GRID CONTENT --- */}
      {isLoading && allMembers.length === 0 ? (
        <ListSkeleton />
      ) : filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member, idx) => (
            <BoardMemberCard key={`${member.EmpName}-${idx}`} member={member} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-400 italic">No members found.</p>
          {activeTab !== "All" && (
            <Button
              variant="link"
              onClick={() => setActiveTab("All")}
              className="text-amber-600 mt-2"
            >
              View All
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// --- CARD COMPONENT (Matching Metro Style + New Colors) ---
function BoardMemberCard({ member }: { member: BoardMember }) {
  const imageUrl = member.ImageName
    ? `https://erp.sonalilife.com/PayRollUI/UploadEmpImage/${member.ImageName}`
    : null;

  const lowerDesig = member.DesignationName?.toLowerCase() || "";
  const isLeader =
    lowerDesig.includes("sevp") ||
    (lowerDesig.includes("secretary") && !lowerDesig.includes("deputy"));

  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-2xl hover:shadow-brand/10 transition-all duration-500 bg-white rounded-[1.5rem] h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-80 w-full bg-slate-50 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={member.EmpName}
            fill
            className="object-contain object-top transition-transform duration-700 group-hover:scale-110"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <User className="w-20 h-20 opacity-20" />
          </div>
        )}

        {/* Gradient Overlay (Dark Navy) */}
        <div className="absolute inset-0 bg-linear-to-t from-brand/90 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Leader Badge */}
        {/* {isLeader && (
          <div className="absolute top-4 right-4 z-20">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
              <Award className="w-3 h-3" /> Head
            </span>
          </div>
        )} */}
      </div>

      {/* Floating Info Box (Overlapping) */}
      <CardContent className="p-6 text-center relative -mt-16 grow flex flex-col">
        <div className="bg-white rounded-2xl p-5 shadow-lg shadow-slate-200/50 border border-slate-100 relative z-10 mx-2 transition-transform duration-300 group-hover:-translate-y-1 h-full flex flex-col justify-center">
          <h3 className="font-bold text-lg text-brand mb-2 group-hover:text-amber-600 transition-colors leading-tight">
            {member.EmpName}
          </h3>

          <div className="h-0.5 w-8 bg-amber-200 mx-auto mb-2 rounded-full" />

          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest line-clamp-2 group-hover:text-amber-600 transition-colors">
            {member.DesignationName}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// --- SKELETON ---
function ListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-3xl overflow-hidden bg-white shadow-sm h-96 border border-slate-100"
        >
          <Skeleton className="h-72 w-full bg-slate-100" />
          <div className="p-6 -mt-16 relative z-10 px-8">
            <div className="bg-white p-4 rounded-2xl shadow-sm h-24 flex flex-col items-center justify-center gap-2">
              <Skeleton className="h-5 w-3/4 bg-slate-100 rounded-full" />
              <Skeleton className="h-3 w-1/2 bg-slate-100 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
