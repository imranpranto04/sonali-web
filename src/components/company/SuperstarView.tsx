"use client";

import { useState } from "react";
import Image from "next/image";
import { SuperstarData, Achiever } from "@/lib/api/company-service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, Building2, TrendingUp, User, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SuperstarView({ data }: { data: SuperstarData }) {
  if (!data.categories || data.categories.length === 0) return null;

  const [activeTab, setActiveTab] = useState<string>(data.categories[0].id);

  return (
    <div className="w-full">
      <Tabs
        defaultValue={data.categories[0].id}
        onValueChange={setActiveTab}
        className="w-full"
      >
        {/* --- TABS NAVIGATION --- */}
        <div className="relative w-full mb-8 group">
          <div className="w-full overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            <TabsList className="bg-white shadow-md p-1.5 h-auto rounded-xl border border-slate-100 inline-flex w-auto min-w-full md:min-w-0 justify-start md:justify-center">
              {data.categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="px-5 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all capitalize"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
              <div className="w-2 md:hidden"></div>
            </TabsList>
          </div>
          <div className="absolute right-0 top-0 h-full w-8 bg-linear-to-l from-slate-50 to-transparent pointer-events-none md:hidden" />
        </div>

        {/* --- CONTENT --- */}
        {data.categories.map((cat) => (
          <TabsContent
            key={cat.id}
            value={cat.id}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            {/* 1. DATE HEADER */}
            {cat.dateLabel && (
              <div className="flex justify-center mb-10">
                <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full border border-orange-100 shadow-sm text-orange-900/80">
                  <CalendarDays className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-bold">
                    Achievers of{" "}
                    <span className="text-orange-600">{cat.dateLabel}</span>
                  </span>
                </div>
              </div>
            )}

            {/* 2. THE PODIUM (Smart Ordering) */}
            {/* MOBILE: Flex Column -> Shows Rank 1, then 2, then 3.
               DESKTOP: Flex Row + Order Utils -> Shows Rank 2 (Left), Rank 1 (Center), Rank 3 (Right).
            */}
            <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-16 max-w-5xl mx-auto pt-4">
              {/* RANK 1 (Winner) */}
              {/* Desktop Order-2 puts it in the CENTER */}
              {cat.achievers[0] && (
                <div className="w-full md:w-1/3 order-1 md:order-2 z-10 mt-0 md:-mt-10">
                  <PodiumCard achiever={cat.achievers[0]} rank={1} isWinner />
                </div>
              )}

              {/* RANK 2 */}
              {/* Desktop Order-1 puts it on the LEFT */}
              {cat.achievers[1] && (
                <div className="w-full md:w-1/3 order-2 md:order-1 opacity-90">
                  <PodiumCard achiever={cat.achievers[1]} rank={2} />
                </div>
              )}

              {/* RANK 3 */}
              {/* Desktop Order-3 puts it on the RIGHT */}
              {cat.achievers[2] && (
                <div className="w-full md:w-1/3 order-3 md:order-3 opacity-90">
                  <PodiumCard achiever={cat.achievers[2]} rank={3} />
                </div>
              )}
            </div>

            {/* 3. THE GRID (Rank 4+) */}
            {cat.achievers.length > 3 && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10">
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div className="h-px bg-slate-100 flex-1" />
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-sm font-bold uppercase tracking-widest">
                      All Achievers
                    </span>
                    {cat.dateLabel && (
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full font-semibold hidden sm:inline-block">
                        {cat.dateLabel}
                      </span>
                    )}
                  </div>
                  <div className="h-px bg-slate-100 flex-1" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {cat.achievers.slice(3).map((person) => (
                    <GridCard key={person.id} achiever={person} />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

// --- PODIUM CARD ---
function PodiumCard({
  achiever,
  rank,
  isWinner,
}: {
  achiever: Achiever;
  rank: number;
  isWinner?: boolean;
}) {
  return (
    <div className="flex flex-col items-center w-full">
      {isWinner && (
        <Crown className="w-10 h-10 text-yellow-400 mb-4 animate-bounce drop-shadow-md" />
      )}

      <div
        className={cn(
          "w-full bg-white rounded-2xl shadow-xl overflow-hidden border transition-all hover:-translate-y-2",
          isWinner
            ? "border-orange-200 shadow-orange-500/20"
            : "border-slate-100"
        )}
      >
        <div
          className={cn(
            "relative w-full bg-slate-50 flex items-end justify-center overflow-hidden",
            isWinner ? "h-72" : "h-60"
          )}
        >
          {achiever.image ? (
            <Image
              src={achiever.image}
              alt={achiever.name}
              fill
              unoptimized={true}
              className="object-contain object-bottom"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <User className="w-24 h-24" />
            </div>
          )}

          <div
            className={cn(
              "absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-sm z-10",
              rank === 1
                ? "bg-yellow-400"
                : rank === 2
                ? "bg-slate-400"
                : "bg-amber-600"
            )}
          >
            {rank}
          </div>
        </div>

        <div className="pt-6 pb-6 px-4 text-center">
          <h3 className="font-bold text-slate-800 line-clamp-1 text-lg">
            {achiever.name}
          </h3>
          <p className="text-xs font-bold text-orange-600 uppercase mb-2 line-clamp-1">
            {achiever.designation}
          </p>

          <p className="text-xs font-bold text-slate-500 uppercase mb-2 line-clamp-1">
            {achiever.DeptName}
          </p>

          {achiever.branch && (
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1 mb-2">
              <Building2 className="w-3 h-3" /> {achiever.branch}
            </p>
          )}

          {achiever.performance && (
            <p className="text-sm font-bold text-slate-600 border-t border-dashed pt-2 mt-2">
              {achiever.performance}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// --- GRID CARD ---
function GridCard({ achiever }: { achiever: Achiever }) {
  return (
    <div className="flex flex-col gap-3 p-3 rounded-xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all bg-white group text-center items-center">
      <div className="relative w-24 h-28 rounded-lg overflow-hidden border bg-slate-50 shrink-0 shadow-sm">
        {achiever.image ? (
          <Image
            src={achiever.image}
            alt={achiever.name}
            fill
            unoptimized={true}
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <User className="w-8 h-8" />
          </div>
        )}
        <div className="absolute bottom-0 right-0 bg-slate-800 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-tl-lg font-bold">
          {achiever.rank}
        </div>
      </div>

      <div className="min-w-0 w-full">
        <h4 className="font-bold text-slate-700 text-sm truncate group-hover:text-orange-700">
          {achiever.name}
        </h4>
        <p className="text-[10px] font-bold text-slate-400 uppercase truncate">
          {achiever.designation}
        </p>
        {achiever.performance && (
          <div className="flex items-center justify-center gap-1 mt-1 text-[10px] font-medium text-slate-500">
            <TrendingUp className="w-3 h-3 text-green-500" />
            {achiever.performance}
          </div>
        )}
      </div>
    </div>
  );
}
