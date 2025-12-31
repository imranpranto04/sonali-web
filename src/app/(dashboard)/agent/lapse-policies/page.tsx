"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  ShieldAlert,
  Calendar,
  Search,
  Phone,
  User,
  Layers,
  Coins,
  AlertTriangle,
  FileWarning,
  MapPin,
} from "lucide-react";
import {
  useLapsePolicies,
  LapsePolicyParams,
} from "@/hooks/agent/use-lapse-policies";
import { SmartDatePicker } from "@/components/ui/smart-date-picker";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

// --- UTILS ---
const parseFPR = (raw: string) => {
  if (!raw) return { id: "", name: "--" };
  const parts = raw.split(" - ");
  return parts.length > 1
    ? { id: parts[0], name: parts.slice(1).join(" - ") }
    : { id: "", name: raw };
};

export default function LapsePoliciesPage() {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // --- 1. UI INPUT STATE (Changes instantly, DOES NOT trigger API) ---
  const [fromDate, setFromDate] = useState<Date | undefined>(firstDay);
  const [toDate, setToDate] = useState<Date | undefined>(lastDay);
  const [reportType, setReportType] = useState("Renewal");
  const [searchValue, setSearchValue] = useState("");

  // --- 2. API QUERY STATE (Changes only on View click, TRIGGERS API) ---
  const [queryParams, setQueryParams] = useState<LapsePolicyParams>({
    DateFrom: format(firstDay, "dd/MM/yyyy"),
    DateTo: format(lastDay, "dd/MM/yyyy"),
    Type: "Renewal",
    searchValue: "",
    page: "1",
  });

  const { data, isLoading, isFetching } = useLapsePolicies(queryParams);
  const showSkeleton = isLoading || isFetching;

  // --- 3. VIEW BUTTON HANDLER ---
  const handleView = () => {
    if (fromDate && toDate) {
      setQueryParams({
        DateFrom: format(fromDate, "dd/MM/yyyy"),
        DateTo: format(toDate, "dd/MM/yyyy"),
        Type: reportType,
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
              <ShieldAlert className="w-6 h-6 text-red-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Lapse Policies
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-1">
            Monitor and recover lapsed business.
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

          <div className="w-full xl:w-[140px]">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="h-10 border-slate-200 bg-slate-50 font-bold text-slate-700 cursor-pointer focus:ring-2 focus:ring-red-500/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem
                  value="Renewal"
                  className="font-medium cursor-pointer"
                >
                  Renewal
                </SelectItem>
                <SelectItem
                  value="Deferred"
                  className="font-medium cursor-pointer"
                >
                  Deferred
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative w-full xl:w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Policy / Name..."
              className="pl-9 h-10 border-slate-200 bg-slate-50 focus-visible:ring-red-500/20"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <Button
            onClick={handleView}
            disabled={showSkeleton}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-10 px-6 rounded-lg w-full xl:w-auto cursor-pointer transition-all active:scale-95"
          >
            {showSkeleton ? "Loading..." : "View"}
          </Button>
        </div>
      </div>

      {/* 1. SUMMARY STATS */}
      {data && !showSkeleton && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="border-0 shadow-md bg-linear-to-br from-red-500 to-rose-600 text-white rounded-2xl relative overflow-hidden">
            <CardContent className="p-6 relative z-10 flex items-center justify-between">
              <div>
                <div>
                  <p className="text-red-100 font-bold text-xs uppercase tracking-widest mb-1">
                    Total Lapsed Premium
                  </p>
                  <h2 className="text-4xl font-black">
                    ৳ {Number(data.TotalPremiumAmount).toLocaleString()}
                  </h2>
                </div>

                <div className="mt-5">
                  <p className="text-red-100 font-bold text-xs uppercase tracking-widest mb-1">
                    Total Supplementary Premium
                  </p>
                  <h2 className="text-4xl font-black">
                    ৳ {Number(data.TotalSupplementaryPremium).toLocaleString()}
                  </h2>
                </div>
              </div>

              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Coins className="w-8 h-8 text-white" />
              </div>
            </CardContent>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </Card>

          <Card className="border border-slate-200 shadow-sm bg-white rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">
                Total Policies Lapsed
              </p>
              <h2 className="text-4xl font-black text-slate-800">
                {data.TotalPolicies}
              </h2>
            </div>
            <div className="p-3 bg-slate-50 rounded-full border border-slate-100">
              <Layers className="w-8 h-8 text-slate-400" />
            </div>
          </Card>
        </div>
      )}

      {/* 2. DATA TABLE (Desktop) */}
      <Card className="hidden lg:block border-0 shadow-xl shadow-slate-200/40 bg-white rounded-2xl overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/80 h-16 border-b border-slate-100">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[300px] font-extrabold text-slate-700 text-sm uppercase pl-6 tracking-wide">
                Policy Details
              </TableHead>
              <TableHead className="w-[180px] font-extrabold text-slate-700 text-sm uppercase tracking-wide">
                Lapse Info
              </TableHead>
              <TableHead className="w-[180px] font-extrabold text-slate-700 text-sm uppercase tracking-wide">
                Installment
              </TableHead>
              <TableHead className="w-[250px] font-extrabold text-slate-700 text-sm uppercase tracking-wide">
                Responsible Agents
              </TableHead>
              <TableHead className="text-right font-extrabold text-slate-700 text-sm uppercase pr-6 tracking-wide">
                Contact
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {showSkeleton ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={5}>
                    <Skeleton className="h-20 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : data?.Details && data.Details.length > 0 ? (
              data.Details.map((item, idx) => {
                const policy = parseFPR(item.FPRId);
                return (
                  <TableRow
                    key={idx}
                    className="group hover:bg-red-50/30 transition-colors border-b border-slate-50"
                  >
                    {/* Policy Info */}
                    <TableCell className="pl-6 py-6 align-top">
                      <div className="flex flex-col gap-1.5 max-w-[280px]">
                        <span className="font-bold text-slate-900 text-base leading-tight whitespace-normal break-words">
                          {policy.name}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-slate-100 text-slate-600 border-slate-200 font-mono text-[11px]"
                          >
                            POL: {policy.id}
                          </Badge>
                          <span className="text-[11px] text-slate-500 font-bold bg-slate-50 px-1.5 rounded">
                            Plan: {item.ProductsId} ({item.TermOfYear}Y)
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Lapse Info */}
                    <TableCell className="py-6 align-top">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-red-600 font-bold text-sm bg-red-50 w-fit px-2.5 py-1 rounded-md border border-red-100">
                          <AlertTriangle className="w-4 h-4" />
                          {item.LapseDate}
                        </div>
                        <p className="text-sm font-black text-slate-800 whitespace-nowrap">
                          Prem: ৳ {item.TotalPremium.toLocaleString()}
                        </p>
                        {Number(item.SupplementaryPremium) > 0 && (
                          <p className="text-[10px] text-slate-500">
                            Sup: ৳ {item.SupplementaryPremium}
                          </p>
                        )}
                      </div>
                    </TableCell>

                    {/* Installments */}
                    <TableCell className="py-6 align-top">
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-[10px] mb-1">
                          {item.InstallmentTypeName}
                        </Badge>
                        <p className="text-sm text-slate-600 whitespace-nowrap">
                          Paid:{" "}
                          <span className="font-bold text-slate-900">
                            {item.TotalInstallmentsPaid} /{" "}
                            {item.TotalNumberOfInstallments}
                          </span>
                        </p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          Last: {item.LastPaymentDate}
                        </p>
                      </div>
                    </TableCell>

                    {/* Hierarchy (FA, UM, BM) */}
                    <TableCell className="py-6 align-top">
                      <div className="flex flex-col gap-2 max-w-[220px]">
                        {/* FA */}
                        <div className="flex flex-col gap-0.5 text-xs bg-blue-50 p-2 rounded border border-blue-100">
                          <span className="font-bold text-blue-700">
                            FA: {item.FAName}
                          </span>
                          <span className="text-[10px] text-blue-400">
                            ID: {item.FAID}
                          </span>
                        </div>

                        {/* UM */}
                        {item.UMName && (
                          <div className="flex flex-col gap-0.5 text-xs bg-purple-50 p-2 rounded border border-purple-100">
                            <span className="font-bold text-purple-700">
                              UM: {item.UMName}
                            </span>
                            <span className="text-[10px] text-purple-400">
                              ID: {item.UMID}
                            </span>
                          </div>
                        )}

                        {/* BM */}
                        {item.BMName && (
                          <div className="flex flex-col gap-0.5 text-xs bg-slate-50 p-2 rounded border border-slate-100">
                            <span className="font-bold text-slate-700">
                              BM: {item.BMName}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              ID: {item.BMID}
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>

                    {/* Contact */}
                    <TableCell className="pr-6 py-6 align-top text-right">
                      <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 bg-white shadow-sm px-3 py-1.5 rounded-lg border border-slate-200 whitespace-nowrap">
                        <Phone className="w-4 h-4 text-slate-400" />{" "}
                        {item.MobileNo}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 flex items-center justify-end gap-1">
                        <MapPin className="w-3 h-3" /> {item.BranchName}
                      </p>
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
                    <FileWarning className="w-10 h-10 mb-3 opacity-20" />
                    <p>No lapsed policies found for this period.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* 3. MOBILE CARDS */}
      <div className="lg:hidden space-y-4">
        {showSkeleton
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl" />
            ))
          : data?.Details?.map((item, idx) => {
              const policy = parseFPR(item.FPRId);
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500" />

                  <div className="flex justify-between items-start mb-4 pl-3">
                    <div className="max-w-[70%]">
                      <h4 className="font-bold text-slate-900 text-sm leading-tight whitespace-normal break-words">
                        {policy.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-mono mt-1">
                        POL: {policy.id}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200 h-6 font-bold whitespace-nowrap"
                    >
                      ৳ {item.TotalPremium.toLocaleString()}
                    </Badge>
                  </div>

                  <div className="h-px bg-slate-100 my-3 ml-3" />

                  <div className="space-y-3 pl-3">
                    {/* Lapse Date & Paid */}
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          Lapse Date
                        </p>
                        <p className="font-bold text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />{" "}
                          {item.LapseDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          Paid / Total
                        </p>
                        <p className="font-medium text-slate-700">
                          {item.TotalInstallmentsPaid} /{" "}
                          {item.TotalNumberOfInstallments}
                        </p>
                      </div>
                    </div>

                    {/* Agent & Mobile */}
                    <div className="flex justify-between items-center pt-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium max-w-[60%]">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">FA: {item.FAName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />{" "}
                        {item.MobileNo}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
