"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import {
  Wallet,
  ChevronLeft,
  ArrowRight,
  Printer,
  Download,
  TrendingUp,
  Scissors,
  Building2,
  User,
  Calendar,
  FileText,
} from "lucide-react";
import {
  usePayAndBenefits,
  PayComponentItem,
} from "@/hooks/agent/use-pay-and-benefits";

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

// --- CONSTANTS ---
const MONTHS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const startYear = 2013;
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - startYear + 1 }, (_, i) =>
  (currentYear - i).toString()
);

export default function PayAndBenefitsPage() {
  const today = new Date();

  // --- 1. UI SELECTION STATE (Does NOT trigger API) ---
  const [selectedYear, setSelectedYear] = useState(
    today.getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState(
    (today.getMonth() + 1).toString().padStart(2, "0")
  );

  // --- 2. QUERY STATE (Triggers API only on View Click) ---
  const [queryParams, setQueryParams] = useState({
    Year: today.getFullYear().toString(),
    Month: (today.getMonth() + 1).toString().padStart(2, "0"),
  });

  const [activeView, setActiveView] = useState<PayComponentItem | null>(null);

  // --- 3. FETCH DATA ---
  const { data, isLoading, isFetching } = usePayAndBenefits(queryParams);

  // Show skeleton if Initial Load OR Refetching
  const showSkeleton = isLoading || isFetching;

  // --- 4. HANDLERS ---
  const handleView = () => {
    setActiveView(null); // Reset detail view
    // Update queryParams -> Triggers Hook -> Triggers Skeleton -> Fetches Data
    setQueryParams({ Year: selectedYear, Month: selectedMonth });
  };

  // --- CALCULATIONS ---
  const grandTotal = useMemo(() => {
    if (!data) return { gross: 0, net: 0, tds: 0 };
    return data.reduce(
      (acc, curr) => ({
        gross: acc.gross + curr.GrossAmount,
        net: acc.net + curr.NetPay,
        tds: acc.tds + curr.TDS,
      }),
      { gross: 0, net: 0, tds: 0 }
    );
  }, [data]);

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-500 max-w-[1800px] mx-auto p-4 md:p-8 bg-slate-50/30 min-h-screen">
      {/* HEADER AREA */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
        <div className="flex items-center gap-4">
          {activeView && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setActiveView(null)}
              className="rounded-full h-10 w-10 border-slate-200 bg-white hover:bg-slate-50 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </Button>
          )}

          <div>
            <div className="flex items-center gap-3 mb-1">
              {!activeView && (
                <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                  <Wallet className="w-5 h-5 text-emerald-600" />
                </div>
              )}
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {activeView ? activeView.ComponentName : "Pay & Benefits"}
              </h1>
            </div>
            <p className="text-slate-500 font-medium text-sm">
              {activeView
                ? `Details for ${
                    MONTHS.find((m) => m.value === queryParams.Month)?.label
                  } ${queryParams.Year}`
                : `Statement for ${
                    MONTHS.find((m) => m.value === queryParams.Month)?.label
                  } ${queryParams.Year}`}
            </p>
          </div>
        </div>

        {/* FILTERS (Hidden in Detail View) */}
        {!activeView && (
          <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-2 w-full xl:w-auto">
            <div className="flex gap-2 w-full sm:w-auto">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[140px] h-10 border-slate-200 bg-slate-50 font-bold text-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {MONTHS.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[100px] h-10 border-slate-200 bg-slate-50 font-bold text-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {YEARS.map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleView}
              disabled={showSkeleton}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-10 px-6 rounded-lg w-full sm:w-auto transition-all active:scale-95 cursor-pointer"
            >
              {showSkeleton ? "Loading..." : "View Statement"}
            </Button>
          </div>
        )}
      </div>

      {/* =====================================================================================
          VIEW 1: DASHBOARD (Summary & Cards)
      ===================================================================================== */}
      {!activeView && (
        <div className="animate-in slide-in-from-left-4 duration-500 space-y-8 ">
          {/* Grand Total Hero (Shows Skeleton on Filter Change) */}
          {showSkeleton ? (
            <Skeleton className="h-48 w-full rounded-2xl" />
          ) : (
            data && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
                <Card className="md:col-span-3 border-0 shadow-lg bg-linear-to-br from-slate-900 to-slate-800 text-white rounded-2xl relative overflow-hidden">
                  <CardContent className="p-8 relative z-10 flex flex-col sm:flex-row justify-between items-center gap-8">
                    <div>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">
                        Total Net Payable
                      </p>
                      <h2 className="text-3xl md:text-5xl font-black tracking-tight text-emerald-400">
                        ৳ {grandTotal.net.toLocaleString()}
                      </h2>
                    </div>
                    <div className="flex gap-8 text-right">
                      <div>
                        <p className="text-slate-300 text-xs font-bold uppercase mb-1">
                          Gross
                        </p>
                        <p className="text-2xl font-bold text-slate-200">
                          ৳ {grandTotal.gross.toLocaleString()}
                        </p>
                      </div>
                      <div className="h-12 w-px bg-white/10 hidden sm:block" />
                      <div>
                        <p className="text-slate-400 text-xs font-bold uppercase mb-1">
                          TDS
                        </p>
                        <p className="text-2xl font-bold text-red-300">
                          ৳ {grandTotal.tds.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                </Card>

                {/* Status Card */}
                {/* <Card className="border-0 bg-white shadow-md rounded-2xl flex flex-col justify-center items-center text-center p-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">
                    {data.length} Types
                  </h3>
                  <p className="text-slate-400 text-xs font-bold uppercase mt-1">
                    Of Earnings
                  </p>
                </Card> */}
              </div>
            )
          )}

          {/* --- PREMIUM COMPONENT CARDS --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {showSkeleton ? (
              [1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[300px] rounded-2xl" />
              ))
            ) : data?.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-slate-200 border-dashed text-slate-400">
                No payment data found for{" "}
                {MONTHS.find((m) => m.value === queryParams.Month)?.label}.
              </div>
            ) : (
              data?.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveView(item)}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-300 cursor-pointer transition-all duration-300 group relative overflow-hidden flex flex-col"
                >
                  {/* Decorative Header */}
                  <div className="h-1.5 w-full bg-linear-to-r from-blue-500 to-emerald-500" />

                  <div className="p-6 flex-1 flex flex-col">
                    {/* Card Header: Role & Branch */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <Badge
                          variant="secondary"
                          className="bg-slate-100 text-slate-600 border-slate-200"
                        >
                          {item.AgentType}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                          <Building2 className="w-3 h-3" />
                          <span className="truncate max-w-[150px]">
                            {item.AgentBranch}
                          </span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-800 mb-6 leading-tight min-h-12">
                      {item.ComponentName}
                    </h3>

                    {/* Financial Grid */}
                    <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100 space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-medium">
                          Generated Business
                        </span>
                        <span className="font-bold text-slate-800">
                          ৳ {item.TotalBusiness.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-px bg-slate-200 w-full my-1" />
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-medium">
                          Gross Amount
                        </span>
                        <span className="font-bold text-slate-700">
                          ৳ {item.GrossAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-medium flex items-center gap-1">
                          <Scissors className="w-3 h-3" /> TDS (Tax)
                        </span>
                        <span className="font-bold text-red-500">
                          - ৳ {item.TDS.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Net Pay Hero */}
                    <div className="mt-auto pt-3 border-t border-dashed border-slate-200 flex justify-between items-end">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                        Net Payable
                      </span>
                      <span className="text-2xl font-black text-emerald-600">
                        ৳ {item.NetPay.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* =====================================================================================
          VIEW 2: DETAILS (Full Page Table)
      ===================================================================================== */}
      {activeView && (
        <div className="animate-in slide-in-from-right-8 duration-500">
          {/* Detailed Summary Header */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-6 flex flex-wrap gap-6 justify-between items-center">
            <div className="flex gap-8">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">
                  Business Vol.
                </p>
                <p className="text-2xl font-black text-slate-800">
                  ৳ {activeView.TotalBusiness.toLocaleString()}
                </p>
              </div>
              <div className="w-px bg-slate-100 h-10" />
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">
                  Gross Earning
                </p>
                <p className="text-2xl font-black text-emerald-600">
                  ৳ {activeView.GrossAmount.toLocaleString()}
                </p>
              </div>
              <div className="w-px bg-slate-100 h-10 hidden sm:block" />
              <div className="hidden sm:block">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">
                  Tax Deducted
                </p>
                <p className="text-2xl font-black text-red-500">
                  ৳ {activeView.TDS.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-slate-200 text-slate-600"
              >
                <Printer className="w-4 h-4 mr-2" /> Print
              </Button>
              {/* <Button className="bg-slate-900 text-white hover:bg-slate-800">
                <Download className="w-4 h-4 mr-2" /> CSV
              </Button> */}
            </div>
          </div>

          {/* Detail Table */}
          <DetailTable details={activeView.details} />
        </div>
      )}
    </div>
  );
}

// --- DETAIL TABLE COMPONENT (Unchanged logic, just ensure imports match) ---
function DetailTable({ details }: { details: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  if (!details || details.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-12 text-center">
        <FileText className="w-12 h-12 mx-auto text-slate-200 mb-3" />
        <p className="text-slate-400 font-medium">
          No breakdown details available.
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(details.length / itemsPerPage);
  const paginatedData = details.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/80 h-12 border-b border-slate-100">
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6 w-[150px] font-extrabold text-slate-700 text-xs uppercase">
                Date
              </TableHead>
              <TableHead className="w-[150px] font-extrabold text-slate-700 text-xs uppercase">
                Policy Info
              </TableHead>
              <TableHead className="font-extrabold text-slate-700 text-xs uppercase">
                Plan / Term
              </TableHead>
              <TableHead className="text-right font-extrabold text-slate-700 text-xs uppercase">
                Premium
              </TableHead>
              <TableHead className="text-right font-extrabold text-slate-700 text-xs uppercase">
                Commission
              </TableHead>
              <TableHead className="pr-6 text-right font-extrabold text-slate-700 text-xs uppercase">
                Net Earnings
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, idx) => (
              <TableRow
                key={idx}
                className="hover:bg-slate-50 transition-colors border-b border-slate-50"
              >
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {format(new Date(item.Date), "dd MMM, yyyy")}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-slate-900 text-sm">
                      POL: {item.RefNo}
                    </span>
                    <Badge
                      variant="outline"
                      className="w-fit text-[10px] bg-white border-slate-200 text-slate-500"
                    >
                      {item.Type}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <span className="text-xs text-slate-600 font-medium">
                    {item.TermsofYear} Years Term
                  </span>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <span className="font-bold text-slate-700 text-sm">
                    ৳ {item.TotalPremiumAmount.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="font-bold text-emerald-600 text-sm">
                      + ৳ {item.BasicComAmount || 0}
                    </span>
                    {item.SupComAmount > 0 && (
                      <span className="text-[10px] text-emerald-500">
                        + Sup: {item.SupComAmount}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="pr-6 py-4 text-right">
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="font-black text-slate-800 text-sm">
                      ৳ {item.NetCom?.toLocaleString() || 0}
                    </span>
                    {item.VatAmout > 0 && (
                      <span className="text-[10px] text-red-400 font-medium">
                        - VAT: {item.VatAmout}
                      </span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <div className="p-4 border-t border-slate-100 flex justify-center gap-4 bg-slate-50/50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="bg-white"
          >
            Previous
          </Button>
          <span className="text-sm font-bold text-slate-600 flex items-center">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="bg-white"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
