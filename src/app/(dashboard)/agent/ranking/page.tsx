"use client";

import { useState } from "react";
import {
  Trophy,
  Filter,
  Download,
  Crown,
  TrendingUp,
  Layers,
  DollarSign,
  Target,
  Award,
  Calendar,
} from "lucide-react";
import {
  useAgentRanking,
  RankingParams,
} from "@/hooks/agent/use-agent-ranking";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AgentRankingPage() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const startYear = 2013;
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) =>
    (currentYear - i).toString()
  );

  // --- STATE ---
  const [filters, setFilters] = useState<RankingParams>({
    PolicyStatus: "Renewal",
    year: currentYear.toString(),
    month: (today.getMonth() + 1).toString(),
  });

  const { data, isLoading, setParams } = useAgentRanking(filters);

  // --- HANDLERS ---
  const updateFilter = (updates: Partial<RankingParams>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    setParams(newFilters);
  };

  // Safe Data Access (Get the first item since API returns array for single month)
  const rankingData = data && data.length > 0 ? data[0] : null;

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-500 max-w-[1800px] mx-auto p-4 md:p-8 bg-slate-50/30 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100">
              <Trophy className="w-6 h-6 text-amber-500" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Ranking Report
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-1">
            Performance rank for{" "}
            <span className="font-bold text-slate-900">
              {filters.PolicyStatus}
            </span>{" "}
            business
          </p>
        </div>

        {/* <Button className="bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20 text-white font-bold w-full md:w-auto">
          <Download className="w-4 h-4 mr-2" /> Export Certificate
        </Button> */}
      </div>

      {/* 1. FILTER BAR */}
      <Card className="border-0 shadow-lg shadow-slate-200/40 bg-white rounded-2xl overflow-visible z-20">
        <CardContent className="p-5">
          <div className="flex flex-col lg:flex-row gap-6 items-end">
            {/* Type */}
            <div className="flex-1 w-full lg:w-auto space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-600 tracking-wider">
                Ranking Type
              </label>
              <Select
                value={filters.PolicyStatus}
                onValueChange={(v) => updateFilter({ PolicyStatus: v })}
              >
                <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 font-bold text-emerald-600 transition-all focus:ring-2 focus:ring-amber-500/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-100 shadow-xl z-50">
                  {["PR", "OR", "PR + OR", "Renewal"].map((t) => (
                    <SelectItem
                      key={t}
                      value={t}
                      className="focus:bg-slate-50 cursor-pointer font-medium text-slate-700"
                    >
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Year */}
            <div className="flex-1 w-full lg:w-auto space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-600 tracking-wider">
                Year
              </label>
              <Select
                value={filters.year}
                onValueChange={(v) => updateFilter({ year: v })}
              >
                <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 font-bold text-emerald-600 transition-all focus:ring-2 focus:ring-amber-500/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-100 shadow-xl max-h-[300px] z-50">
                  {years.map((y) => (
                    <SelectItem
                      key={y}
                      value={y}
                      className="focus:bg-slate-50 cursor-pointer font-medium text-slate-700"
                    >
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Month */}
            <div className="flex-2 w-full lg:w-auto space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-600 tracking-wider">
                Month
              </label>
              <Select
                value={filters.month}
                onValueChange={(v) => updateFilter({ month: v })}
              >
                <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 font-bold text-emerald-600 transition-all focus:ring-2 focus:ring-amber-500/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-100 shadow-xl max-h-[300px] z-50">
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem
                      key={i + 1}
                      value={(i + 1).toString()}
                      className="focus:bg-slate-50 cursor-pointer font-medium text-slate-700"
                    >
                      {new Date(0, i).toLocaleString("default", {
                        month: "long",
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. HERO RANKING CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: The Big Ranking Trophy */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-xl shadow-amber-500/10 bg-linear-to-br from-amber-500 to-orange-600 text-white h-full relative overflow-hidden rounded-3xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full"></div>

            <CardContent className="p-8 flex flex-col items-center justify-center h-full text-center relative z-10">
              {isLoading ? (
                <Skeleton className="h-32 w-32 rounded-full bg-white/20 mb-4" />
              ) : (
                <div className="w-28 h-28 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-white/10">
                  <Crown className="w-14 h-14 text-white drop-shadow-md" />
                </div>
              )}

              <p className="text-white uppercase tracking-widest font-bold text-xs mb-1">
                Current Ranking
              </p>
              {isLoading ? (
                <Skeleton className="h-16 w-24 bg-white/20" />
              ) : (
                <h2 className="text-6xl font-black tracking-tighter drop-shadow-sm">
                  {rankingData?.Ranking || "N/A"}
                </h2>
              )}

              <div className="mt-6 px-4 py-2 bg-black/10 rounded-full text-sm font-medium text-white border border-white/30">
                {new Date(0, parseInt(filters.month) - 1).toLocaleString(
                  "default",
                  { month: "long" }
                )}{" "}
                {filters.year}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Detailed Stats Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            label="Total Premium"
            value={rankingData?.PremiumAmount}
            icon={DollarSign}
            theme="emerald"
            loading={isLoading}
            isCurrency
          />
          <StatCard
            label="Total Policies"
            value={rankingData?.NoOfPr}
            icon={Layers}
            theme="blue"
            loading={isLoading}
          />
          <StatCard
            label="Average Premium"
            value={rankingData?.AvgPre}
            icon={TrendingUp}
            theme="violet"
            loading={isLoading}
            isCurrency
          />
          <StatCard
            label="Commission Earned"
            value={rankingData?.TotalCommission}
            icon={Award}
            theme="slate"
            loading={isLoading}
            isCurrency
          />
        </div>
      </div>

      {/* 3. DETAILED LIST (Data Table) */}
      <Card className="border-0 shadow-lg shadow-slate-200/40 bg-white rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80 h-12 border-b border-slate-100">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[100px] font-extrabold text-slate-700 text-xs uppercase tracking-wide pl-6">
                  Rank
                </TableHead>
                <TableHead className="font-extrabold text-slate-700 text-xs uppercase tracking-wide">
                  Month
                </TableHead>
                <TableHead className="font-extrabold text-slate-700 text-xs uppercase tracking-wide">
                  Policies
                </TableHead>
                <TableHead className="font-extrabold text-slate-700 text-xs uppercase tracking-wide">
                  Premium
                </TableHead>
                <TableHead className="font-extrabold text-slate-700 text-xs uppercase tracking-wide text-right pr-6">
                  Avg Pre
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32">
                    <Skeleton className="h-full w-full" />
                  </TableCell>
                </TableRow>
              ) : data && data.length > 0 ? (
                data.map((item, idx) => (
                  <TableRow
                    key={idx}
                    className="group hover:bg-slate-50 transition-colors border-b border-slate-50"
                  >
                    <TableCell className="pl-6">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-md">
                        {item.Ranking}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                        <Calendar className="w-4 h-4 text-slate-400" />{" "}
                        {item.Month}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 border-blue-100 px-3"
                      >
                        {item.NoOfPr} Policies
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-black text-emerald-700 text-base">
                        ৳ {Number(item.PremiumAmount).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <span className="font-medium text-slate-800 text-lg">
                        ৳ {Number(item.AvgPre).toLocaleString()}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-40 text-center text-slate-400"
                  >
                    No ranking data found for {filters.year}.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StatCard({
  label,
  value,
  isCurrency,
  theme,
  icon: Icon,
  loading,
}: any) {
  const themes: any = {
    emerald: {
      bg: "bg-emerald-500",
      text: "text-emerald-600",
      light: "bg-emerald-50",
    },
    blue: { bg: "bg-blue-500", text: "text-blue-600", light: "bg-blue-50" },
    violet: {
      bg: "bg-violet-500",
      text: "text-violet-600",
      light: "bg-violet-50",
    },
    slate: {
      bg: "bg-slate-700",
      text: "text-slate-700",
      light: "bg-slate-100",
    },
  };
  const t = themes[theme];

  return (
    <Card className="border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
      <CardContent className="p-6 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div
            className={`p-3 rounded-xl ${t.light} ${t.text} transition-colors group-hover:bg-white group-hover:shadow-sm`}
          >
            <Icon className="w-6 h-6" />
          </div>
        </div>
        <div>
          {loading ? (
            <Skeleton className="h-9 w-32 mb-1" />
          ) : (
            <h3 className={`text-3xl font-black ${t.text} tracking-tight`}>
              {isCurrency ? "৳ " : ""}
              {(Number(value) || 0).toLocaleString()}
            </h3>
          )}
          <p className="text-[12px] font-bold uppercase text-slate-700 tracking-wider mt-1">
            {label}
          </p>
        </div>
      </CardContent>
      {/* Decorative Blob */}
      <div
        className={`absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-5 ${t.bg}`}
      />
    </Card>
  );
}
