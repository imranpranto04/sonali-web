"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  FileCheck,
  Calendar,
  Search,
  User,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react";
import {
  usePolicyClaims,
  PolicyClaimParams,
} from "@/hooks/agent/use-policy-claims";
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
const parseAgent = (raw: string) => {
  if (!raw) return { id: "", name: "--" };
  const parts = raw.split("-");
  return parts.length > 1
    ? { id: parts[0], name: parts.slice(1).join("-") }
    : { id: "", name: raw };
};

const getStatusConfig = (status: string) => {
  const s = status?.toLowerCase() || "";
  if (s === "paid" || s === "settled") {
    return {
      label: status,
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      icon: CheckCircle,
    };
  }
  if (s === "declined" || s === "rejected") {
    return {
      label: status,
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      icon: XCircle,
    };
  }
  return {
    label: status,
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    icon: AlertCircle,
  };
};

export default function PolicyClaimsPage() {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // --- 1. UI INPUT STATE (Changes instantly, does NOT load data) ---
  const [fromDate, setFromDate] = useState<Date | undefined>(firstDay);
  const [toDate, setToDate] = useState<Date | undefined>(lastDay);
  const [searchValue, setSearchValue] = useState("");

  // --- 2. API QUERY STATE (Changes only on "View", triggers Loading) ---
  const [queryParams, setQueryParams] = useState<PolicyClaimParams>({
    DateFrom: format(firstDay, "dd/MM/yyyy"),
    DateTo: format(lastDay, "dd/MM/yyyy"),
    searchValue: "",
    page: "1",
  });

  // --- 3. FETCH DATA ---
  const { data, isLoading, isFetching } = usePolicyClaims(queryParams);

  // This is true if Initial Loading OR Refetching (View Clicked)
  const showSkeleton = isLoading || isFetching;

  // --- 4. HANDLER ---
  const handleView = () => {
    if (fromDate && toDate) {
      // Changing queryParams triggers the hook -> sets isFetching=true -> shows Skeleton
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
              <FileCheck className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Policy Claims
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-1">
            Track claim status and settlements.
          </p>
        </div>

        {/* FILTERS */}
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
              placeholder="Claim ID, Policy No..."
              className="pl-9 h-10 border-slate-200 bg-slate-50 focus-visible:ring-blue-500/20"
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

      {/* 1. SUMMARY STATS (Only show when NOT loading) */}
      {data && !showSkeleton && (
        <Card className="border-0 shadow-md bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-2xl relative overflow-hidden max-w-sm animate-in zoom-in duration-300">
          <CardContent className="p-6 relative z-10 flex items-center justify-between">
            <div>
              <p className="text-blue-100 font-bold text-xs uppercase tracking-widest mb-1">
                Total Claims Found
              </p>
              <h2 className="text-4xl font-black">{data.TotalClaimes}</h2>
            </div>
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </CardContent>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </Card>
      )}

      {/* 2. DATA TABLE (Desktop) */}
      <Card className="hidden lg:block border-0 shadow-xl shadow-slate-200/40 bg-white rounded-2xl overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/80 h-16 border-b border-slate-100">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[280px] font-extrabold text-slate-700 text-sm uppercase pl-6 tracking-wide">
                Claim Info
              </TableHead>
              <TableHead className="w-[250px] font-extrabold text-slate-700 text-sm uppercase tracking-wide">
                Policy Holder
              </TableHead>
              <TableHead className="w-[220px] font-extrabold text-slate-700 text-sm uppercase tracking-wide">
                Agent & Branch
              </TableHead>
              <TableHead className="w-[300px] font-extrabold text-slate-700 text-sm uppercase tracking-wide">
                Resolution / Comments
              </TableHead>
              <TableHead className="text-right font-extrabold text-slate-700 text-sm uppercase pr-6 tracking-wide">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {showSkeleton ? (
              // SKELETON ROWS (Shows on View Click)
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={5}>
                    <Skeleton className="h-20 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : data?.Details && data.Details.length > 0 ? (
              data.Details.map((item, idx) => {
                const agent = parseAgent(item.AgentName);
                const status = getStatusConfig(item.Flag);

                return (
                  <TableRow
                    key={idx}
                    className="group hover:bg-slate-50 transition-colors border-b border-slate-50"
                  >
                    {/* Claim Info */}
                    <TableCell className="pl-6 py-6 align-top">
                      <div className="flex flex-col gap-1.5">
                        <span className="font-bold text-slate-900 text-sm">
                          {item.ClaimIdNoChar}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-slate-500 border-slate-200 font-mono text-[10px]"
                          >
                            ID: {item.ClaimId}
                          </Badge>
                          <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-200 text-[10px] border-0">
                            {item.ClaimType}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Created:{" "}
                          {item.CreateDate}
                        </p>
                      </div>
                    </TableCell>

                    {/* Policy Holder (Wrapped) */}
                    <TableCell className="py-6 align-top">
                      <div className="flex flex-col gap-1 max-w-[220px]">
                        <span className="font-bold text-slate-800 text-sm whitespace-normal  wrap-break-word leading-tight">
                          {item.PolicyHolderName}
                        </span>
                        <span className="text-xs font-mono text-slate-500 bg-slate-50 px-1.5 rounded border border-slate-100 w-fit">
                          Policy: {item.PolicyNo}
                        </span>
                      </div>
                    </TableCell>

                    {/* Agent & Branch */}
                    <TableCell className="py-6 align-top">
                      <div className="flex flex-col gap-2 max-w-[200px]">
                        <div className="flex items-center gap-2 text-xs">
                          <User className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          <span
                            className="font-medium text-slate-700 truncate"
                            title={agent.name}
                          >
                            {agent.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span
                            className="text-slate-500 truncate"
                            title={item.BranchName}
                          >
                            {item.BranchName}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Comments (Wrapped) */}
                    <TableCell className="py-6 align-top">
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 max-w-[280px]">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                          Remarks
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed whitespace-normal  wrap-break-word">
                          {item.Comments || "No comments available."}
                        </p>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="pr-6 py-6 align-top text-right">
                      <Badge
                        variant="outline"
                        className={`${status.bg} ${status.text} ${status.border} gap-1.5 py-1 pr-3`}
                      >
                        <status.icon className="w-3.5 h-3.5" /> {status.label}
                      </Badge>
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
                    <FileCheck className="w-12 h-12 mb-3 opacity-20" />
                    <p>No claims found for this period.</p>
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
              const agent = parseAgent(item.AgentName);
              const status = getStatusConfig(item.Flag);

              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 relative overflow-hidden"
                >
                  <div
                    className={`absolute top-0 left-0 w-1.5 h-full ${status.bg
                      .replace("bg-", "bg-")
                      .replace("-50", "-500")}`}
                  />

                  <div className="flex justify-between items-start mb-4 pl-3">
                    <div className="max-w-[70%]">
                      <h4 className="font-bold text-slate-900 text-sm leading-tight whitespace-normal  wrap-break-word">
                        {item.ClaimIdNoChar}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {item.ClaimType}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${status.bg} ${status.text} ${status.border} h-6`}
                    >
                      {status.label}
                    </Badge>
                  </div>

                  <div className="h-px bg-slate-100 my-3 ml-3" />

                  <div className="space-y-3 pl-3">
                    <div className="flex justify-between items-start text-sm">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          Policy Holder
                        </p>
                        <p className="font-bold text-slate-800">
                          {item.PolicyHolderName}
                        </p>
                        <p className="text-xs text-slate-500 font-mono">
                          Pol: {item.PolicyNo}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          Date
                        </p>
                        <p className="font-medium text-slate-700">
                          {item.CreateDate}
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                        Remarks
                      </p>
                      <p className="text-xs text-slate-600 leading-snug whitespace-normal  wrap-break-word">
                        {item.Comments}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium max-w-[60%]">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{agent.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium max-w-[40%]">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{item.BranchName}</span>
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
