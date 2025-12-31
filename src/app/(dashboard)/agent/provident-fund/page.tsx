"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import {
  PiggyBank,
  ChevronRight,
  ArrowLeft,
  Calendar,
  FileText,
} from "lucide-react";
import {
  usePfSummary,
  usePfYearDetails,
  usePfMonthDetails,
} from "@/hooks/agent/use-provident-fund";

// Components
import { Button } from "@/components/ui/button";
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

// Helper
const formatDate = (iso: string) => {
  try {
    return format(parseISO(iso), "dd MMM, yyyy");
  } catch {
    return iso;
  }
};

export default function ProvidentFundPage() {
  // --- STATE ---
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  // --- QUERIES ---
  const { data: summary, isLoading: loadingSummary } = usePfSummary();

  const { data: yearData, isLoading: loadingYear } =
    usePfYearDetails(selectedYear);

  const { data: monthData, isLoading: loadingMonth } = usePfMonthDetails(
    selectedYear,
    selectedMonth
  );

  // --- HANDLERS ---
  const handleBack = () => {
    if (selectedMonth) setSelectedMonth(null); // Back to Year Level
    else setSelectedYear(null); // Back to Summary Level
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-500 max-w-[1800px] mx-auto p-4 md:p-8 bg-slate-50/30 min-h-screen">
      {/* HEADER & BREADCRUMB */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          {(selectedYear || selectedMonth) && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleBack}
              className="rounded-full h-10 w-10 shrink-0 border-slate-200 bg-white hover:bg-slate-50 shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Button>
          )}

          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              {!selectedYear ? (
                <>
                  <PiggyBank className="w-8 h-8 text-emerald-600" /> Provident
                  Fund
                </>
              ) : !selectedMonth ? (
                <>
                  <Calendar className="w-8 h-8 text-blue-600" /> {selectedYear}{" "}
                  Breakdown
                </>
              ) : (
                <>
                  <FileText className="w-8 h-8 text-purple-600" />{" "}
                  {selectedMonth} {selectedYear}
                </>
              )}
            </h1>
            <p className="text-slate-500 font-medium ml-1">
              {!selectedYear
                ? "Total accrued savings overview."
                : !selectedMonth
                ? "Monthly contribution analysis."
                : "Detailed policy list for this month."}
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================================================
          LEVEL 1: GRAND SUMMARY (Years List)
      ===================================================================================== */}
      {!selectedYear && (
        <>
          {loadingSummary ? (
            // LEVEL 1 SKELETON
            <div className="space-y-6">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <div>
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-40 rounded-xl" />
                  ))}
                </div>
              </div>
            </div>
          ) : summary ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
              {/* Hero Card */}
              <Card className="md:col-span-3 border-0 shadow-lg bg-linear-to-br from-emerald-600 to-teal-700 text-white rounded-2xl relative overflow-hidden">
                <CardContent className="p-8 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <p className="text-emerald-100 font-bold uppercase tracking-widest text-xs mb-2">
                      Total Accrued Fund
                    </p>
                    <h2 className="text-5xl font-black tracking-tight">
                      ৳ {Number(summary.TotalPFAmountAccrued).toLocaleString()}
                    </h2>
                  </div>
                  <div className="flex gap-8 text-right">
                    <div>
                      <p className="text-emerald-200 text-xs font-bold uppercase">
                        Total Policies
                      </p>
                      <p className="text-2xl text-white font-bold">
                        {summary.TotalPolicies}
                      </p>
                    </div>
                    <div className="h-12 w-px bg-white/20 hidden md:block" />
                    <div>
                      <p className="text-emerald-200 text-xs font-bold uppercase">
                        Total Commission
                      </p>
                      <p className="text-2xl font-bold text-white">
                        ৳{" "}
                        {Number(summary.TotalCommissionAmount).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              </Card>

              {/* Yearly List */}
              <div className="md:col-span-3 mt-15">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Yearly Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {summary.Details.map((item) => (
                    <div
                      key={item.PfYear}
                      onClick={() => setSelectedYear(item.PfYear.toString())}
                      className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-200 cursor-pointer transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-5 h-5 text-emerald-500" />
                      </div>

                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">
                            Year
                          </p>
                          <h3 className="text-3xl font-black text-slate-800">
                            {item.PfYear}
                          </h3>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-emerald-50 text-emerald-700 border-emerald-100"
                        >
                          {item.PolicyCount} Policies
                        </Badge>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-slate-50">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Premium</span>
                          <span className="font-bold text-slate-800">
                            ৳ {item.TotalPremiumAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Commission</span>
                          <span className="font-bold text-slate-800">
                            ৳ {item.TotalCommission.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm bg-slate-50 p-2 rounded-lg mt-1">
                          <span className="text-emerald-600 font-bold">
                            PF Amount
                          </span>
                          <span className="font-black text-emerald-600">
                            ৳ {item.TotalPFAmt.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}

      {/* =====================================================================================
          LEVEL 2: YEARLY DETAILS (Months List)
      ===================================================================================== */}
      {selectedYear && !selectedMonth && (
        <div className="animate-in slide-in-from-right-4 duration-300">
          {loadingYear ? (
            // LEVEL 2 SKELETON
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl border border-slate-100 space-y-4"
                >
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {yearData?.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedMonth(item.PfMonth)}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 cursor-pointer transition-all group"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800">
                      {item.PfMonth}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        Policies
                      </span>
                      <span className="font-bold text-slate-700">
                        {item.PolicyCount}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        Commission
                      </span>
                      <span className="font-bold text-slate-700">
                        ৳ {item.TotalCommission.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        Premium
                      </span>
                      <span className="font-bold text-slate-700">
                        ৳ {item.TotalPremiumAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center">
                      <p className="text-[12px] font-bold text-slate-500 uppercase">
                        PF Accrued
                      </p>
                      <p className="text-lg font-black text-blue-600">
                        ৳ {item.TotalPFAmt.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {yearData?.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white rounded-xl border border-slate-200 border-dashed text-slate-400">
                  No data available for {selectedYear}.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* =====================================================================================
          LEVEL 3: MONTHLY DETAILS (Policy Table)
      ===================================================================================== */}
      {selectedMonth && (
        <div className="animate-in slide-in-from-right-4 duration-300">
          {loadingMonth ? (
            // LEVEL 3 SKELETON (Table)
            <Card className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden">
              <div className="p-6 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-14 w-full rounded-lg" />
                ))}
              </div>
            </Card>
          ) : (
            <Card className="border-0 shadow-xl shadow-slate-200/40 bg-white rounded-2xl overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50/80 h-14 border-b border-slate-100">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-6 font-extrabold text-slate-700 text-xs uppercase">
                      Policy ID
                    </TableHead>
                    <TableHead className="font-extrabold text-slate-700 text-xs uppercase">
                      Date
                    </TableHead>
                    <TableHead className="font-extrabold text-slate-700 text-xs uppercase">
                      Installment
                    </TableHead>
                    <TableHead className="font-extrabold text-slate-700 text-xs uppercase">
                      Premium
                    </TableHead>
                    <TableHead className="font-extrabold text-slate-700 text-xs uppercase">
                      Commission
                    </TableHead>
                    <TableHead className="pr-6 text-right font-extrabold text-slate-700 text-xs uppercase">
                      PF Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthData && monthData.length > 0 ? (
                    monthData.map((item, idx) => (
                      <TableRow
                        key={idx}
                        className="hover:bg-slate-50 transition-colors border-b border-slate-50"
                      >
                        <TableCell className="pl-6 py-4 font-bold text-slate-800 text-sm">
                          {item.fprid}
                        </TableCell>
                        <TableCell className="py-4 text-xs text-slate-500 font-medium">
                          {formatDate(item.PFDATE)}
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge
                            variant="outline"
                            className="text-slate-600 border-slate-200 bg-amber-50"
                          >
                            Inst: {item.installmentno}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4 font-bold text-slate-700 text-sm">
                          ৳ {item.TotalPremiumAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="py-4 font-bold text-slate-700 text-sm">
                          ৳ {item.CommissionAmt.toLocaleString()}
                        </TableCell>
                        <TableCell className="pr-6 py-4 text-right">
                          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-purple-50 text-purple-700 font-bold text-sm border border-purple-100">
                            ৳ {item.PFAMT.toFixed(2)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="h-40 text-center text-slate-400"
                      >
                        No policy details found for {selectedMonth}.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
