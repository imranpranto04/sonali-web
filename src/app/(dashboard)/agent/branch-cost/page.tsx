"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Building2,
  Search,
  TrendingDown,
  TrendingUp,
  Layers,
  DollarSign,
} from "lucide-react";
import {
  useBranchCosting,
  BranchCostingParams,
} from "@/hooks/agent/use-branch-costing";
import { SmartDatePicker } from "@/components/ui/smart-date-picker";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BranchCostingPage() {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // --- STATE ---
  const [fromDate, setFromDate] = useState<Date | undefined>(firstDay);
  const [toDate, setToDate] = useState<Date | undefined>(lastDay);
  const [searchValue, setSearchValue] = useState("");

  const [apiParams, setApiParams] = useState<BranchCostingParams>({
    DateFrom: format(firstDay, "dd/MM/yyyy"),
    DateTo: format(lastDay, "dd/MM/yyyy"),
    searchValue: "",
    page: "1",
  });

  const { data, isLoading, isFetching, setParams } =
    useBranchCosting(apiParams);
  const showSkeleton = isLoading || isFetching;

  // --- HANDLERS ---
  const handleApplyFilter = () => {
    if (fromDate && toDate) {
      setApiParams((prev) => ({
        ...prev,
        DateFrom: format(fromDate, "dd/MM/yyyy"),
        DateTo: format(toDate, "dd/MM/yyyy"),
        searchValue: searchValue,
        page: "1", // Reset page on filter
      }));
    }
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-500 max-w-[1800px] mx-auto p-4 md:p-8 bg-slate-50/30 min-h-screen">
      {/* HEADER & FILTERS */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Branch Costing
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-1">
            Analyze premium vs. cost ratios per branch.
          </p>
        </div>

        {/* FILTER SECTION */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-3 w-full xl:w-auto">
          {/* Date Range */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <SmartDatePicker
              date={fromDate}
              setDate={setFromDate}
              placeholder="Start"
            />
            <span className="text-slate-300 font-bold">-</span>
            <SmartDatePicker
              date={toDate}
              setDate={setToDate}
              placeholder="End"
            />
          </div>

          {/* Search */}
          <div className="relative w-full md:w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search Branch..."
              className="pl-9 h-10 border-slate-200 bg-slate-50 focus-visible:ring-blue-500/20"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <Button
            onClick={handleApplyFilter}
            disabled={showSkeleton}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-10 px-6 rounded-lg w-full md:w-auto cursor-pointer"
          >
            {showSkeleton ? "Loading..." : "View"}
          </Button>
        </div>
      </div>

      {/* DATA VIEW */}
      {showSkeleton ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-2xl" />
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <>
          {/* 1. DESKTOP TABLE */}
          <div className="hidden lg:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/80 h-14 border-b border-slate-100">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[300px] font-extrabold text-slate-700 text-xs uppercase pl-6">
                    Branch Name
                  </TableHead>
                  <TableHead className="w-[200px] font-extrabold text-slate-700 text-xs uppercase">
                    First Year Business
                  </TableHead>
                  <TableHead className="w-[200px] font-extrabold text-slate-700 text-xs uppercase">
                    Renewal Business
                  </TableHead>
                  <TableHead className="font-extrabold text-slate-700 text-xs uppercase text-right">
                    Cost Analysis
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, idx) => {
                  const isHighCost = item.color === "Red";
                  return (
                    <TableRow
                      key={idx}
                      className="group hover:bg-slate-50 transition-colors border-b border-slate-50"
                    >
                      <TableCell className="pl-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center text-xs">
                            {item.Sl}
                          </div>
                          <span className="font-bold text-slate-800 text-sm">
                            {item.Branch}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="py-5">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">
                            Premium
                          </p>
                          <p className="text-sm font-bold text-slate-700">
                            ৳ {item.FirstYearPremium.toLocaleString()}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="py-5">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">
                            Premium
                          </p>
                          <p className="text-sm font-bold text-emerald-600">
                            ৳ {item.RenewalPremium.toLocaleString()}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="py-5 text-right">
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-slate-500">
                              1st Year Cost:
                            </span>
                            <Badge
                              variant="outline"
                              className={`${
                                isHighCost
                                  ? "bg-red-50 text-red-600 border-red-200"
                                  : "bg-slate-50 text-slate-600 border-slate-200"
                              }`}
                            >
                              {item.FirstYearCost}%
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-slate-500">
                              Overall Cost:
                            </span>
                            <Badge
                              variant="outline"
                              className={`${
                                isHighCost
                                  ? "bg-red-50 text-red-600 border-red-200"
                                  : "bg-slate-50 text-slate-600 border-slate-200"
                              }`}
                            >
                              {item.OverallCost}%
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* 2. MOBILE CARDS */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.map((item, idx) => (
              <BranchMobileCard key={idx} item={item} />
            ))}
          </div>
        </>
      ) : (
        <div className="py-20 text-center bg-white rounded-xl border border-slate-200 border-dashed">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No branch data found.</p>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting the date range.
          </p>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENT ---

function BranchMobileCard({ item }: { item: any }) {
  const isHighCost = item.color === "Red";

  return (
    <Card
      className={`border shadow-sm overflow-hidden ${
        isHighCost ? "border-red-100 shadow-red-500/5" : "border-slate-200"
      }`}
    >
      {/* Colored Indicator Strip */}
      <div
        className={`h-1.5 w-full ${isHighCost ? "bg-red-500" : "bg-slate-800"}`}
      />

      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-3 pr-2">
            <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-500 font-bold flex items-center justify-center text-xs shrink-0 border border-slate-100">
              {item.Sl}
            </div>
            <h3 className="font-bold text-slate-800 text-sm leading-tight mt-1">
              {item.Branch}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-2">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              1st Year Prem
            </p>
            <p className="text-sm font-bold text-slate-800">
              ৳ {item.FirstYearPremium.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              1st Year Cost
            </p>
            <p
              className={`text-lg font-black ${
                isHighCost ? "text-red-600" : "text-slate-700"
              }`}
            >
              {item.FirstYearCost}%
            </p>
          </div>

          <div className="col-span-2 h-px bg-slate-100" />

          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Renewal Prem
            </p>
            <p className="text-sm font-bold text-emerald-600">
              ৳ {item.RenewalPremium.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Overall Cost
            </p>
            <p
              className={`text-lg font-black ${
                isHighCost ? "text-red-600" : "text-slate-700"
              }`}
            >
              {item.OverallCost}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
