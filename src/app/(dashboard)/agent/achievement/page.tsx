"use client";

import { useState, useMemo } from "react";
import {
  Download,
  Target,
  Award,
  BarChart3,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { useAgentAchievement } from "@/hooks/agent/use-agent-achievement";

// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- UTILS ---
const getProgressColor = (percent: number) => {
  if (percent >= 100) return "bg-emerald-500";
  if (percent >= 80) return "bg-blue-500";
  return "bg-amber-500";
};

export default function AgentAchievementPage() {
  const currentYear = new Date().getFullYear();
  const startYear = 2013;
  // Generate years descending [2025, 2024, ... 2013]
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) =>
    (currentYear - i).toString()
  );

  // 1. State for Year
  const [year, setYear] = useState(currentYear.toString());

  // 2. Data Hook (Reacts to year change)
  const { data, isLoading, isFetching, isError, refetch } =
    useAgentAchievement(year);

  // 3. Logic: Show skeleton on Initial Load OR when Refetching (Changing Year)
  const showSkeleton = isLoading || isFetching;

  // 4. Calculate Totals
  const totals = useMemo(() => {
    if (!data) return { target: 0, achieved: 0, percent: 0 };
    const t = data.reduce((acc, curr) => acc + Number(curr.Target || 0), 0);
    const a = data.reduce((acc, curr) => acc + Number(curr.Achieved || 0), 0);
    return { target: t, achieved: a, percent: t > 0 ? (a / t) * 100 : 0 };
  }, [data]);

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-500 max-w-7xl mx-auto p-4 md:p-8 bg-slate-50/30 min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100">
              <Award className="w-6 h-6 text-amber-500" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Achievement Report
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-1">
            Performance breakdown for{" "}
            <span className="font-extrabold text-emerald-600">{year}</span>
          </p>
        </div>

        <div className="flex gap-4 items-end w-full md:w-auto">
          {/* YEAR SELECTOR */}
          <div className="flex flex-col gap-1.5 w-full md:w-auto">
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
              Select Year
            </label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-full md:w-[140px] h-11 bg-white border-2 border-slate-200 font-bold text-emerald-600 shadow-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-100 shadow-xl max-h-[300px] z-50">
                {years.map((y) => (
                  <SelectItem
                    key={y}
                    value={y}
                    className="cursor-pointer font-medium focus:bg-slate-50 py-2.5 mx-1 rounded-lg transition-colors"
                  >
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* <Button className="bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20 h-11 px-6 font-bold">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button> */}
        </div>
      </div>

      {/* ERROR STATE */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center text-red-700">
          <AlertCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p className="font-bold text-lg">Unable to load data</p>
          <p className="text-sm opacity-80 mb-4">
            We couldn't fetch the achievement records for {year}.
          </p>
          <Button
            variant="outline"
            onClick={() => refetch()}
            className="bg-white border-red-200 hover:bg-red-50 text-red-700 font-bold"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* MAIN CONTENT */}
      {!isError && (
        <>
          {/* 1. ANNUAL SUMMARY HERO */}
          <Card className="border-0 shadow-xl shadow-indigo-500/10 bg-linear-to-br from-indigo-600 to-violet-700 text-white relative overflow-hidden rounded-3xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

            <CardContent className="p-8 relative z-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-8 h-full">
              <div className="space-y-2 text-center md:text-left flex-1">
                <p className="text-indigo-100 font-bold uppercase tracking-widest text-xs mb-2">
                  Total Achievement for {year}
                </p>

                {showSkeleton ? (
                  <Skeleton className="h-16 w-64 bg-white/20 rounded-lg" />
                ) : (
                  <h2 className="text-4xl font-black tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-500">
                    ৳ {totals.achieved.toLocaleString()}
                  </h2>
                )}

                <div className="pt-2 flex items-center justify-center md:justify-start gap-3 opacity-90">
                  <Target className="w-5 h-5 text-indigo-200" />
                  {showSkeleton ? (
                    <Skeleton className="h-6 w-32 bg-white/20 rounded" />
                  ) : (
                    <span className="text-lg font-medium">
                      Target: ৳ {totals.target.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Circular Progress */}
              <div className="relative flex items-center justify-center shrink-0">
                {showSkeleton ? (
                  <Skeleton className="w-36 h-36 rounded-full bg-white/20" />
                ) : (
                  <div className="w-36 h-36 rounded-full border-8 border-white/20 flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm shadow-2xl">
                    <span className="text-3xl font-bold">
                      {totals.target > 0 ? totals.percent.toFixed(0) : "0"}%
                    </span>
                    <span className="text-[10px] uppercase font-bold text-indigo-100 mt-1">
                      Completed
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 2. MONTHLY BREAKDOWN GRID */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2 pl-1">
              <Calendar className="w-5 h-5 text-slate-400" /> Monthly Breakdown
            </h3>

            {showSkeleton ? (
              // SKELETON GRID (Shows on Load & Change)
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Card
                    key={i}
                    className="border border-slate-100 rounded-2xl overflow-hidden"
                  >
                    <div className="h-1.5 w-full bg-slate-100" />
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                      <Skeleton className="h-3 w-full rounded-full" />
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-10" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : data && data.length > 0 ? (
              // DATA GRID
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {data.map((item, idx) => {
                  const percent = Number(item.Percentage);
                  const barColor = getProgressColor(percent);

                  return (
                    <Card
                      key={idx}
                      className="border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden group"
                    >
                      <div className={`h-1.5 w-full ${barColor}`} />
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-5">
                          <h4 className="font-bold text-slate-800 text-lg">
                            {item.Month}
                            {/* <span className="text-[12px] text-slate-300">
                              - {item.SL}
                            </span> */}
                          </h4>
                          <div className="text-right">
                            <p className="text-[10px] uppercase text-slate-400 font-bold mb-0.5">
                              Achieved
                            </p>
                            <p
                              className={`font-black text-lg ${
                                percent >= 100
                                  ? "text-emerald-600"
                                  : "text-slate-700"
                              }`}
                            >
                              {Number(item.Achieved).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Clean Progress Section */}
                        <div className="space-y-2">
                          <div className="h-3 w-full bg-slate-100 rounded-full relative overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                              style={{ width: `${Math.min(percent, 100)}%` }}
                            />
                          </div>
                          <div className="flex justify-between items-center text-xs pt-1">
                            <span className="text-slate-500 font-medium">
                              Target:{" "}
                              <span className="text-slate-900">
                                {Number(item.Target).toLocaleString()}
                              </span>
                            </span>
                            <span className="font-bold text-slate-700">
                              {percent}%
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              // EMPTY STATE
              <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 border-dashed">
                <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">
                  No achievement data found for {year}.
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Try selecting a different year from the top right.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
