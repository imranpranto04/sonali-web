"use client";

import { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronRight,
  AlertCircle,
  X,
} from "lucide-react";
import { Division, Branch } from "@/types/branch";
import { cn } from "@/lib/utils";
import BranchCard from "./BranchCard";

export default function BranchesClient({
  divisions,
}: {
  divisions: Division[];
}) {
  // --- STATE ---
  const [activeDivisionId, setActiveDivisionId] = useState<number>(
    divisions.length > 0 ? divisions[0].DivisionId : 0
  );
  const [activeDistrictId, setActiveDistrictId] = useState<number | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  // --- MEMOIZED DATA LOGIC ---
  const currentDivision = useMemo(
    () => divisions.find((d) => d.DivisionId === activeDivisionId),
    [divisions, activeDivisionId]
  );

  const filteredBranches = useMemo(() => {
    const results: { data: Branch; districtName: string }[] = [];

    // 1. GLOBAL SEARCH MODE
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      divisions.forEach((div) => {
        if (div.Districts) {
          div.Districts.forEach((dist) => {
            if (dist.Branches) {
              dist.Branches.forEach((branch) => {
                if (
                  branch.BranchName?.toLowerCase().includes(q) ||
                  branch.BranchAddress?.toLowerCase().includes(q)
                ) {
                  results.push({
                    data: branch,
                    districtName: dist.DistrictName,
                  });
                }
              });
            }
          });
        }
      });
      return results;
    }

    // 2. TAB FILTER MODE
    if (!currentDivision) return [];

    const collect = (distName: string, list: Branch[]) => {
      if (Array.isArray(list)) {
        list.forEach((b) => results.push({ data: b, districtName: distName }));
      }
    };

    if (activeDistrictId === "all") {
      if (currentDivision.Districts && currentDivision.Districts.length > 0) {
        currentDivision.Districts.forEach((dist) =>
          collect(dist.DistrictName, dist.Branches)
        );
      }
    } else {
      const dist = currentDivision.Districts?.find(
        (d) => d.DistrictId === activeDistrictId
      );
      if (dist) collect(dist.DistrictName, dist.Branches);
    }

    return results;
  }, [divisions, currentDivision, activeDistrictId, searchQuery]);

  const clearSearch = () => setSearchQuery("");

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 overflow-x-hidden">
      {/* --- STICKY FILTER DOCK --- */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-30 shadow-sm transition-all">
        <div className="container mx-auto px-4 py-5 space-y-5">
          {/* 1. SEARCH ROW */}
          <div className="max-w-2xl mx-auto w-full">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-linear-to-r from-amber-300 to-orange-400 rounded-2xl blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
              <div className="relative flex items-center bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="pl-4 text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search any branch (e.g. Sylhet, Motijheel)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-3.5 bg-transparent outline-none text-slate-800 placeholder:text-slate-400 font-medium text-sm md:text-base"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="pr-4 text-slate-400 hover:text-amber-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-1"></div>

          {/* CONDITIONALLY RENDER FILTERS 
             We reduce opacity/pointer-events when searching to indicate global search
          */}
          <div
            className={cn(
              "transition-all duration-500",
              searchQuery
                ? "opacity-50 pointer-events-none grayscale"
                : "opacity-100"
            )}
          >
            {/* 2. DIVISION ROW (Fixed Scrolling) */}
            <div className="relative mb-5">
              <div className="flex justify-center items-center gap-2 mb-4">
                <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Select Division
                </span>
              </div>

              {/* SCROLL CONTAINER WRAPPER */}
              <div className="relative -mx-4 md:mx-0">
                {/* Scroll linears */}
                <div className="absolute left-0 top-0 bottom-0 w-6 bg-linear-to-r from-white to-transparent z-10 pointer-events-none md:hidden" />
                <div className="absolute right-0 top-0 bottom-0 w-6 bg-linear-to-l from-white to-transparent z-10 pointer-events-none md:hidden" />

                {/* FIX: 
                     1. px-4: Padding starts content away from edge.
                     2. scroll-pl-4: Snapping respects the left padding.
                     3. snap-x & snap-start: Ensures items lock to the left.
                  */}
                <div className="flex md:justify-center gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x scroll-pl-4 px-4 md:px-0">
                  {divisions.map((div) => (
                    <button
                      key={div.DivisionId}
                      onClick={() => {
                        setActiveDivisionId(div.DivisionId);
                        setActiveDistrictId("all");
                      }}
                      className={cn(
                        "cursor-pointer snap-start shrink-0 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 whitespace-nowrap border",
                        activeDivisionId === div.DivisionId
                          ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200 transform scale-[1.02]"
                          : "bg-slate-200 text-slate-900 border-slate-200 hover:bg-white hover:border-amber-400 hover:text-amber-600"
                      )}
                    >
                      {div.DivisionName}
                    </button>
                  ))}
                  {/* Spacer element to ensure last item isn't cut off on mobile */}
                  <div className="w-2 shrink-0 md:hidden"></div>
                </div>
              </div>
            </div>

            {/* 3. DISTRICT ROW */}
            {currentDivision && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Filter by District
                  </span>
                </div>

                <div className="flex gap-2 flex-wrap justify-between md:justify-normal">
                  <button
                    onClick={() => setActiveDistrictId("all")}
                    className={cn(
                      "cursor-pointer px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wide transition-all border",
                      activeDistrictId === "all"
                        ? "bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-200"
                        : "bg-white text-slate-500 border-slate-200 hover:border-amber-400 hover:text-amber-600"
                    )}
                  >
                    All Districts
                  </button>
                  {currentDivision.Districts &&
                  currentDivision.Districts.length > 0 ? (
                    currentDivision.Districts.map((dist) => (
                      <button
                        key={dist.DistrictId}
                        onClick={() => setActiveDistrictId(dist.DistrictId)}
                        className={cn(
                          "cursor-pointer px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all border",
                          activeDistrictId === dist.DistrictId
                            ? "bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-200"
                            : "bg-white text-slate-700 border-slate-300 hover:border-amber-400 hover:text-amber-600"
                        )}
                      >
                        {dist.DistrictName}
                      </button>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic py-2">
                      No districts available
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- RESULTS GRID --- */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div
            className={cn(
              "w-10 h-10 rounded-full border shadow-sm flex items-center justify-center transition-colors",
              searchQuery
                ? "bg-amber-500 border-amber-600 text-white"
                : "bg-white border-slate-200 text-amber-500"
            )}
          >
            {searchQuery ? (
              <Search className="w-5 h-5" />
            ) : (
              <MapPin className="w-5 h-5" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {filteredBranches.length} Branches Found
            </h2>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
              {searchQuery
                ? "Searching across All Divisions"
                : `${currentDivision?.DivisionName || "Unknown"} Division`}
            </p>
          </div>
        </div>

        {filteredBranches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBranches.map((item, idx) => (
              <BranchCard
                key={`${item.data.BranchName}-${idx}`}
                branch={item.data}
                districtName={item.districtName}
              />
            ))}
          </div>
        ) : (
          <div className="col-span-full py-24 text-center bg-white rounded-3xl border border-dashed border-slate-200 mx-auto max-w-2xl">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <AlertCircle className="w-6 h-6 text-slate-300" />
            </div>
            <h3 className="text-slate-900 font-bold mb-1 text-lg">
              No branches found
            </h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">
              {searchQuery
                ? `We couldn't find any branch matching "${searchQuery}"`
                : "Try selecting a different district."}
            </p>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="mt-4 text-amber-600 font-bold text-sm hover:underline"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
