"use client";

import {
  ArrowRight,
  Calendar,
  Phone,
  AlertTriangle,
  Layers,
} from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import {
  DeferredSummaryItem,
  LapseDetailItem,
} from "@/hooks/agent/use-deferred-renewal";

// --- 1. UPDATED SUMMARY CARD ---
interface SummaryCardProps {
  item: DeferredSummaryItem;
  isActive: boolean;
  onClick: () => void;
}

export function SummaryCard({ item, isActive, onClick }: SummaryCardProps) {
  const accentColor =
    item.Type === "Renewal" ? "border-l-blue-500" : "border-l-emerald-500";
  const bgActive = isActive
    ? "ring-2 ring-blue-500 shadow-xl"
    : "hover:shadow-lg";

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer transition-all duration-200 border-l-[6px] ${accentColor} ${bgActive}`}
    >
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
        <div>
          {/* UPDATED: Just Type, no long text */}
          <Badge className="mb-2 bg-slate-900 text-white hover:bg-slate-800">
            {item.Type}
          </Badge>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-black text-slate-800">
              {item.OverallRenewalAmt}%
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase mb-1.5">
              Retention
            </span>
          </div>
        </div>
        <div
          className={`p-2 rounded-full ${
            isActive ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
          }`}
        >
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>

      {/* Grid Data */}
      <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase text-slate-400">
            Policies
          </p>
          <p className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-400" /> {item.TotalNoPolicies}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase text-slate-400">
            Premium Rcv.
          </p>
          <p className="text-lg font-bold text-emerald-600">
            ৳ {item.TotalPremiumReceived.toLocaleString()}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase text-slate-400">AIT</p>
          <p className="text-sm font-bold text-slate-600">
            ৳ {item.TotalVat.toLocaleString()}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase text-slate-400">
            Net Retention
          </p>
          <p className="text-lg font-bold text-blue-600">
            ৳ {item.NetRetention.toLocaleString()}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase text-slate-400">
            Exp. Renewal
          </p>
          <p className="text-sm font-bold text-slate-600">
            ৳ {item.ExpectedRenewalAmt.toLocaleString()}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase text-slate-400">
            Renewal %
          </p>
          <p className="text-sm font-bold text-slate-600">{item.RenewalAmt}%</p>
        </div>

        {/* UPDATED: Lapse Policy Count Shown Explicitly */}
        <div className="space-y-1 col-span-2 bg-red-50 p-2 -m-2 rounded-lg border border-red-100 flex justify-between items-center px-4">
          <div>
            <p className="text-[10px] font-bold uppercase text-red-400">
              Lapse Policies
            </p>
            <p className="text-lg font-black text-red-600">
              {item.LapsePolicy}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase text-red-400">
              Lapse Amt
            </p>
            <p className="text-sm font-bold text-red-600">
              ৳ {item.LapseAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 2. DETAILS TABLE (Desktop) ---
// --- 2. DETAILS TABLE (Desktop) ---
export function LapseTable({
  data,
  loading,
}: {
  data: LapseDetailItem[];
  loading: boolean;
}) {
  // 1. Loading State (Returns a DIV, valid outside table)
  if (loading) {
    return (
      <div className="hidden md:block p-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  // 2. Empty State (Returns a DIV, valid outside table)
  if (!data || data.length === 0) {
    return (
      <div className="hidden md:block text-center py-20 text-slate-400">
        No data found.
      </div>
    );
  }

  // 3. Data Table
  return (
    <div className="hidden md:block">
      <Table>
        <TableHeader className="bg-slate-50/80 h-14 border-b border-slate-100">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[280px] font-extrabold text-slate-700 text-xs uppercase pl-6">
              Policy / Holder
            </TableHead>
            <TableHead className="w-[200px] font-extrabold text-slate-700 text-xs uppercase">
              Product Details
            </TableHead>
            <TableHead className="w-[150px] font-extrabold text-slate-700 text-xs uppercase">
              Installments
            </TableHead>
            <TableHead className="w-[150px] font-extrabold text-slate-700 text-xs uppercase">
              Financials
            </TableHead>
            <TableHead className="w-[200px] font-extrabold text-slate-700 text-xs uppercase">
              Timeline
            </TableHead>
            <TableHead className="font-extrabold text-slate-700 text-xs uppercase text-right pr-6">
              Hierarchy
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow
              key={idx}
              className="hover:bg-slate-50 transition-colors border-b border-slate-50"
            >
              <TableCell className="pl-6 py-4 align-top">
                <div className="flex flex-col gap-1 max-w-[280px]">
                  <span className="font-bold text-slate-900 text-sm whitespace-normal wrap-break-word leading-tight">
                    {item.FPRId}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded w-fit">
                    <Phone className="w-3 h-3" /> {item.MobileNo}
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4 align-top">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-700">
                    Plan ID: {item.ProductsId}
                  </p>
                  <p className="text-xs text-slate-500">
                    Term: {item.TermOfYear} Yrs
                  </p>
                </div>
              </TableCell>
              <TableCell className="py-4 align-top">
                <div className="space-y-1">
                  <Badge
                    variant="outline"
                    className="text-[10px] h-5 bg-emerald-100"
                  >
                    {item.InstallmentTypeName}
                  </Badge>
                  <p className="text-xs text-slate-600 font-medium">
                    Paid: {item.TotalInstallmentsPaid} /{" "}
                    {item.TotalNumberOfInstallments}
                  </p>
                </div>
              </TableCell>
              <TableCell className="py-4 align-top">
                <div className="space-y-1">
                  <p className="text-sm font-black text-slate-800">
                    ৳ {item.TotalPremium.toLocaleString()}
                  </p>
                  {item.SupplementaryPremium > 0 && (
                    <div className="text-[10px] text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded w-fit border border-slate-200">
                      Sup: ৳ {item.SupplementaryPremium.toLocaleString()}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="py-4 align-top">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5" /> {item.LastPaymentDate}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-red-600 font-bold bg-red-50 px-2 py-1 rounded w-fit">
                    <AlertTriangle className="w-3.5 h-3.5" /> {item.LapseDate}
                  </div>
                </div>
              </TableCell>
              <TableCell className="pr-6 py-4 align-top text-right">
                <div className="text-[12px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100 inline-block text-left w-full max-w-[200px] whitespace-normal break-words leading-relaxed">
                  {item.FAUMBM}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// --- 3. MOBILE CARD (UPDATED) ---
export function LapseMobileCard({ item }: { item: LapseDetailItem }) {
  return (
    <div className="bg-white rounded-xl border border-red-100 shadow-sm p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500" />
      <div className="flex justify-between items-start mb-3 pl-3">
        <div className="max-w-[60%]">
          <h4 className="font-bold text-slate-900 text-sm whitespace-normal wrap-break-word leading-tight">
            {item.FPRId}
          </h4>
          <p className="text-xs text-slate-500 mt-1">{item.MobileNo}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase">
            Total Prem
          </p>
          <p className="text-lg font-black text-slate-900">
            ৳ {item.TotalPremium.toLocaleString()}
          </p>
        </div>
      </div>
      <Separator className="my-3 opacity-50" />
      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs pl-3">
        <div>
          <p className="text-[10px] font-bold uppercase text-slate-400">
            Sup. Premium
          </p>
          <p className="font-bold text-slate-700">
            ৳ {item.SupplementaryPremium.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase text-slate-400">
            Installment
          </p>
          <p className="font-medium text-slate-700">
            {item.InstallmentTypeName} ({item.TotalInstallmentsPaid}/
            {item.TotalNumberOfInstallments})
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase text-slate-400">
            Last Pay
          </p>
          <p className="font-medium text-slate-700">{item.LastPaymentDate}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase text-red-400">
            Lapse Date
          </p>
          <p className="font-bold text-red-600">{item.LapseDate}</p>
        </div>
        <div className="col-span-2 bg-slate-50 p-2 rounded border border-slate-100 mt-1">
          <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">
            Hierarchy
          </p>
          <p className="text-[10px] text-slate-600 leading-normal whitespace-normal wrap-break-word">
            {item.FAUMBM}
          </p>
        </div>
      </div>
    </div>
  );
}
