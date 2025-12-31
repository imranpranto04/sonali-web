"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Award,
  Calendar,
  Search,
  User,
  Layers,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
} from "lucide-react";
import {
  usePolicyMaturity,
  MaturityParams,
} from "@/hooks/agent/use-policy-maturity";
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

// --- UTILS ---
const parseIdentity = (raw: string) => {
  if (!raw) return { id: "", name: "--" };
  const parts = raw.split("-");
  return parts.length > 1
    ? { id: parts[0].trim(), name: parts.slice(1).join("-").trim() }
    : { id: "", name: raw };
};

const getLapseStyle = (status: string) => {
  if (status?.toLowerCase().includes("lapse"))
    return "bg-red-50 text-red-700 border-red-200";
  return "bg-emerald-50 text-emerald-700 border-emerald-200";
};

export default function PolicyMaturityPage() {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // --- 1. UI INPUT STATE ---
  const [fromDate, setFromDate] = useState<Date | undefined>(firstDay);
  const [toDate, setToDate] = useState<Date | undefined>(lastDay);
  const [searchValue, setSearchValue] = useState("");

  // --- 2. API QUERY STATE ---
  const [queryParams, setQueryParams] = useState<MaturityParams>({
    DateFrom: format(firstDay, "dd/MM/yyyy"),
    DateTo: format(lastDay, "dd/MM/yyyy"),
    searchValue: "",
    page: "1",
  });

  const { data, isLoading, isFetching } = usePolicyMaturity(queryParams);
  const showSkeleton = isLoading || isFetching;

  // --- HANDLER ---
  const handleView = () => {
    if (fromDate && toDate) {
      setQueryParams({
        DateFrom: format(fromDate, "dd/MM/yyyy"),
        DateTo: format(toDate, "dd/MM/yyyy"),
        searchValue: searchValue,
        page: "1",
      });
    }
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-500 max-w-[1800px] mx-auto p-4 md:p-8 bg-slate-50/30 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Policy Maturity
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-1">
            Track maturing policies and benefit payments.
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-col xl:flex-row items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2 w-full xl:w-auto">
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

          <div className="relative w-full xl:w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Policy No / Name..."
              className="pl-9 h-10 border-slate-200 bg-slate-50 focus-visible:ring-purple-500/20"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <Button
            onClick={handleView}
            disabled={showSkeleton}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-10 px-6 rounded-lg w-full xl:w-auto transition-all active:scale-95 cursor-pointer"
          >
            {showSkeleton ? "Loading..." : "View"}
          </Button>
        </div>
      </div>

      {/* SUMMARY CARD (Dynamic Total) */}
      {!showSkeleton && data && data.length > 0 && (
        <Card className="border-0 shadow-md bg-linear-to-r from-purple-600 to-indigo-600 text-white rounded-2xl relative overflow-hidden max-w-sm">
          <CardContent className="p-6 relative z-10 flex items-center justify-between">
            <div>
              <p className="text-purple-100 font-bold text-xs uppercase tracking-widest mb-1">
                Maturity Claims
              </p>
              <h2 className="text-4xl font-black">{data.length}</h2>
            </div>
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Clock className="w-8 h-8 text-white" />
            </div>
          </CardContent>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </Card>
      )}

      {/* DATA TABLE (Desktop) */}
      <Card className="hidden lg:block border-0 shadow-xl shadow-slate-200/40 bg-white rounded-2xl overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/80 h-16 border-b border-slate-100">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[300px] font-extrabold text-slate-700 text-sm uppercase pl-6 tracking-wide">
                Policy Holder
              </TableHead>
              <TableHead className="w-[220px] font-extrabold text-slate-700 text-sm uppercase tracking-wide">
                Plan Details
              </TableHead>
              <TableHead className="w-[200px] font-extrabold text-slate-700 text-sm uppercase tracking-wide">
                Financials
              </TableHead>
              <TableHead className="w-[200px] font-extrabold text-slate-700 text-sm uppercase tracking-wide">
                Dates & Status
              </TableHead>
              <TableHead className="text-right font-extrabold text-slate-700 text-sm uppercase pr-6 tracking-wide">
                Hierarchy
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {showSkeleton ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={5}>
                    <Skeleton className="h-24 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : data && data.length > 0 ? (
              data.map((item, idx) => {
                const policy = parseIdentity(item.PolicyNumber);
                const product = parseIdentity(item.Product);
                const branch = parseIdentity(item.Branch);
                const fa = parseIdentity(item.FA);

                return (
                  <TableRow
                    key={idx}
                    className="group hover:bg-slate-50 transition-colors border-b border-slate-50"
                  >
                    {/* Policy Info */}
                    <TableCell className="pl-6 py-6 align-top">
                      <div className="flex flex-col gap-1.5 max-w-[280px]">
                        <span className="font-bold text-slate-900 text-base leading-tight whitespace-normal wrap-break-word">
                          {policy.name}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-slate-500 border-slate-200 bg-amber-100 text-[12px]"
                          >
                            POL: {policy.id}
                          </Badge>
                          <span className="text-[12px] text-emerald-500 font-bold bg-slate-50 px-1.5 rounded">
                            {item.InstallmentType}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[12px] text-slate-400 mt-1">
                          <MapPin className="w-3 h-3" /> {branch.name}
                        </div>
                      </div>
                    </TableCell>

                    {/* Plan Details */}
                    <TableCell className="py-6 align-top">
                      <div className="flex flex-col gap-1.5 max-w-[200px]">
                        <span className="text-xs font-bold text-slate-700 leading-snug whitespace-normal wrap-break-word">
                          {product.name}
                        </span>
                        <div className="flex gap-2 text-[12px] text-slate-500">
                          <span>Term: {item.TermOfYear}Y</span>
                          <span>•</span>
                          <span>Paid: {item.TotalInsPaid} Inst.</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center mt-4">
                        <Badge
                          variant="outline"
                          className="text-emerald-600 border-emerald-200 text-[12px]"
                        >
                          {item.MaturityCategory}
                        </Badge>
                      </div>
                    </TableCell>

                    {/* Financials */}
                    <TableCell className="py-6 align-top">
                      <div className="space-y-1">
                        <div className="flex justify-between w-40 ">
                          <span className="text-slate-500">Sum Assured:</span>
                          <span className="font-bold text-slate-800">
                            ৳ {item.SumAssured.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between w-40 ">
                          <span className="text-slate-500">Prem. Paid:</span>
                          <span className="font-bold text-slate-800">
                            ৳ {item.TotalPremiumPaid.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between w-40 text-xs bg-purple-50 p-1 rounded border border-purple-100 mt-1">
                          <span className="text-purple-700 font-bold">
                            Benefit:
                          </span>
                          <span className="font-black text-purple-700">
                            ৳ {item.TotalPolicyAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Dates & Status */}
                    <TableCell className="py-6 align-top">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                          <Calendar className="w-3.5 h-3.5 text-purple-500" />
                          Maturity: {item.MaturityDate}
                        </div>
                        <Badge
                          className={`${
                            item.flag === "Paid"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-600 bg-amber-50"
                          } hover:bg-opacity-80 border-0 w-fit`}
                        >
                          {item.flag}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`w-fit ${getLapseStyle(item.LapseStatus)}`}
                        >
                          {item.LapseStatus}
                        </Badge>
                      </div>
                    </TableCell>

                    {/* Hierarchy */}
                    <TableCell className="pr-6 py-6 align-top text-right">
                      <div className="flex flex-col gap-1 items-end">
                        <div className="flex items-center gap-1.5 text-xs">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-medium text-slate-700 truncate ">
                            {fa.name}
                          </span>
                        </div>
                        <span className="text-[12px] text-slate-400 ">
                          {fa.id}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-60 text-center text-slate-400"
                >
                  <div className="flex flex-col items-center justify-center">
                    <Clock className="w-12 h-12 mb-3 opacity-20" />
                    <p>No maturity records found for this period.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* MOBILE CARDS */}
      <div className="lg:hidden space-y-4">
        {showSkeleton
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-72 w-full rounded-2xl" />
            ))
          : data?.map((item, idx) => {
              const policy = parseIdentity(item.PolicyNumber);
              const fa = parseIdentity(item.FA);

              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 relative overflow-hidden"
                >
                  <div
                    className={`absolute top-0 left-0 w-1.5 h-full ${
                      item.LapseStatus.includes("Lapse")
                        ? "bg-red-500"
                        : "bg-purple-500"
                    }`}
                  />

                  <div className="flex justify-between items-start mb-4 pl-3">
                    <div className="max-w-[70%]">
                      <h4 className="font-bold text-slate-900 text-sm leading-tight whitespace-normal wrap-break-word">
                        {policy.name}
                      </h4>
                      <p className="text-xs text-slate-500  mt-1">
                        POL: {policy.id}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-700 border-purple-200 h-6 font-bold whitespace-nowrap"
                    >
                      {item.MaturityCategory}
                    </Badge>
                  </div>

                  <div className="h-px bg-slate-100 my-3 ml-3" />

                  <div className="space-y-3 pl-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-xs font-bold text-slate-400 uppercase">
                        Maturity Date
                      </span>
                      <span className="font-bold text-purple-700 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {item.MaturityDate}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Sum Assured</span>
                        <span className="font-medium text-slate-800">
                          ৳ {item.SumAssured.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Paid Amount</span>
                        <span className="font-medium text-slate-800">
                          ৳ {item.TotalPremiumPaid.toLocaleString()}
                        </span>
                      </div>
                      <div className="border-t border-slate-200 pt-1.5 mt-1.5 flex justify-between text-xs font-bold">
                        <span className="text-slate-600">Benefit Amount</span>
                        <span className="text-purple-700">
                          ৳ {item.TotalPolicyAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <Badge
                        variant="outline"
                        className={`${getLapseStyle(
                          item.LapseStatus
                        )} text-[12px]`}
                      >
                        {item.LapseStatus}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-slate-100 text-slate-600 text-[12px]"
                      >
                        {item.flag}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-50">
                      <User className="w-3.5 h-3.5" />
                      <span className="truncate">FA: {fa.name}</span>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
