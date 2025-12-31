"use client";

import { useState } from "react";
import {
  Filter,
  Search,
  Download,
  Calendar,
  CreditCard,
  Briefcase,
  FileText,
  ChevronLeft,
  ChevronRight,
  Wallet,
  Building2,
  User,
  ChevronDown,
  ChevronUp,
  MapPin,
} from "lucide-react";
import {
  useAgentCommission,
  CommissionParams,
} from "@/hooks/agent/use-agent-commission";

// UI Components
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

// --- HELPERS ---
const parseAgentName = (raw: string) => {
  if (!raw) return { id: "--", name: "--" };
  const parts = raw.split(" - ");
  return parts.length >= 2
    ? { id: parts[0], name: parts.slice(1).join(" - ") }
    : { id: "", name: raw };
};

export default function BusinessCommissionPage() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const startYear = 2013;
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) =>
    (currentYear - i).toString()
  );

  const [filters, setFilters] = useState<CommissionParams>({
    year: currentYear.toString(),
    month: (today.getMonth() + 1).toString(),
    searchValue: "",
    page: "1",
  });

  const { data, isLoading, setParams } = useAgentCommission(filters);

  const updateFilter = (updates: Partial<CommissionParams>) => {
    setParams({ ...filters, ...updates, page: "1" });
    setFilters({ ...filters, ...updates, page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    const pageStr = newPage.toString();
    setFilters({ ...filters, page: pageStr });
    setParams({ ...filters, page: pageStr });
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-500 max-w-[1800px] mx-auto p-4 md:p-8 bg-slate-50/30 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100">
              <Wallet className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Business Commission
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-1">
            Statement for{" "}
            <span className="font-bold text-emerald-500">
              {data?.AgentName || "..."}
            </span>
          </p>
        </div>

        {/* <Button className="bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20 text-white font-bold w-full md:w-auto">
          <Download className="w-4 h-4 mr-2" /> Download Statement
        </Button> */}
      </div>

      {/* 1. FILTER BAR */}
      <Card className="border-0 shadow-lg shadow-slate-200/40 bg-white rounded-2xl overflow-visible z-20">
        <CardContent className="p-5">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            {/* Period */}
            <div className="flex-1 w-full lg:w-auto">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2 block">
                Period
              </label>
              <div className="flex gap-3">
                <Select
                  value={filters.year}
                  onValueChange={(v) => updateFilter({ year: v })}
                >
                  <SelectTrigger className="w-full sm:w-[120px] h-11 bg-white border-slate-200 font-bold focus:ring-2 focus:ring-emerald-500/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-100 shadow-xl max-h-[300px] z-50">
                    {years.map((y) => (
                      <SelectItem
                        key={y}
                        value={y}
                        className="focus:bg-slate-50 cursor-pointer font-medium"
                      >
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.month}
                  onValueChange={(v) => updateFilter({ month: v })}
                >
                  <SelectTrigger className="w-full sm:w-40 h-11 bg-white border-slate-200 font-bold focus:ring-2 focus:ring-emerald-500/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-100 shadow-xl max-h-[300px] z-50">
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem
                        key={i + 1}
                        value={(i + 1).toString()}
                        className="focus:bg-slate-50 cursor-pointer font-medium"
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

            {/* Search */}
            <div className="flex-2 w-full lg:w-auto">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2 block">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search Policy No, PR Number..."
                  className="pl-10 h-11 bg-slate-50/50 border-slate-200 focus-visible:ring-2 focus-visible:ring-emerald-500/20"
                  value={filters.searchValue}
                  onChange={(e) =>
                    updateFilter({ searchValue: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard
          label="Total Net Commission"
          value={data?.TotalNetCommission}
          isCurrency
          icon={Wallet}
          theme="emerald"
          loading={isLoading}
        />
        <StatCard
          label="Total Policies Processed"
          value={data?.TotalPolicies}
          icon={FileText}
          theme="blue"
          loading={isLoading}
        />
        <StatCard
          label="Statement Month"
          value={
            new Date(0, parseInt(filters.month) - 1).toLocaleString("default", {
              month: "long",
            }) +
            " " +
            filters.year
          }
          icon={Calendar}
          theme="violet"
          loading={isLoading}
          isText
        />
      </div>

      {/* 3. DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className=" h-12 border-b bg-emerald-100 border-slate-100">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[280px] font-extrabold text-slate-700 text-xs uppercase tracking-wide pl-6">
                  Agent & Type
                </TableHead>
                <TableHead className="w-[250px] font-extrabold text-slate-700 text-xs uppercase tracking-wide">
                  Policy Details
                </TableHead>
                <TableHead className="w-[220px] font-extrabold text-slate-700 text-xs uppercase tracking-wide">
                  Bank Info
                </TableHead>
                <TableHead className="w-[150px] font-extrabold text-slate-700 text-xs uppercase tracking-wide">
                  Commission Date
                </TableHead>
                <TableHead className="text-right font-extrabold text-slate-700 text-xs uppercase tracking-wide pr-6">
                  Net Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableSkeleton key={i} />
                  ))
                : data?.Details?.map((item, idx) => (
                    <DesktopRow key={idx} item={item} />
                  ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* 4. MOBILE CARDS (Detailed) */}
      <div className="md:hidden space-y-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-xl" />
            ))
          : data?.Details?.map((item, idx) => (
              <MobileCard key={idx} item={item} />
            ))}
      </div>

      {/* PAGINATION */}
      {!isLoading && data?.Details && data.Details.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() => handlePageChange(parseInt(filters.page) - 1)}
            disabled={parseInt(filters.page) <= 1}
            className="bg-white"
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Previous
          </Button>
          <span className="text-sm font-bold text-slate-600 bg-white px-4 py-2 rounded-md border border-slate-200">
            Page {filters.page}
          </span>
          <Button
            variant="outline"
            onClick={() => handlePageChange(parseInt(filters.page) + 1)}
            disabled={data.Details.length < 15}
            className="bg-white"
          >
            Next <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {!isLoading && (!data?.Details || data.Details.length === 0) && (
        <EmptyState />
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function DesktopRow({ item }: { item: any }) {
  const agent = parseAgentName(item.Agent);
  return (
    <TableRow className="group hover:bg-slate-50 border-b border-slate-50 transition-colors">
      <TableCell className="align-top py-4 pl-6">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-slate-900 text-sm">{agent.name}</span>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-white border-emerald-200 text-slate-500 text-[12px] px-1.5 h-5"
            >
              {agent.id}
            </Badge>
            <span className="text-xs text-slate-500 font-medium">
              {item.AgentTypeName}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell className="align-top py-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <span className="text-xs font-normal text-slate-400 uppercase w-8">
              Pol:
            </span>{" "}
            {item.PolicyId}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="text-xs font-normal text-slate-400 uppercase w-8">
              PR:
            </span>{" "}
            {item.PRNumber}
          </div>
          <div className="flex items-center gap-1 text-[12px] font-medium text-slate-500 mt-1 bg-emerald-50 w-fit px-1.5 py-0.5 rounded border border-slate-100">
            <Building2 className="w-3 h-3 text-slate-400" /> {item.BranchName}
          </div>
        </div>
      </TableCell>
      <TableCell className="align-top py-4">
        <div className="space-y-1">
          <div className="font-medium text-slate-700 text-xs">
            {item.BankName}
          </div>
          <div className="text-xs   text-slate-800 bg-emerald-50 px-1.5 py-0.5 rounded w-fit">
            AC: {item.BankACNo}
          </div>
        </div>
      </TableCell>
      <TableCell className="align-top py-4">
        <div className="flex items-center gap-2 text-slate-700 text-xs font-medium bg-white border border-slate-200 px-2 py-1 rounded-md w-fit">
          <Calendar className="w-3.5 h-3.5 text-slate-400" /> {item.ComDate}
        </div>
      </TableCell>
      <TableCell className="align-top py-4 pr-6 text-right">
        <div className="flex flex-col items-end gap-1">
          <span className="font-black text-emerald-600 text-base">
            ৳ {item.TotalPayment.toLocaleString()}
          </span>
          <Badge
            variant="outline"
            className={`text-[9px] h-4 ${
              item.PaymentStatus === "Paid"
                ? "text-emerald-600 border-emerald-200"
                : "text-amber-600 border-amber-200"
            }`}
          >
            {item.PaymentStatus || "Due"}
          </Badge>
        </div>
      </TableCell>
    </TableRow>
  );
}

function MobileCard({ item }: { item: any }) {
  const agent = parseAgentName(item.Agent);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
      {/* Header Row */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-[10px] font-bold uppercase text-slate-400 mb-0.5">
            Policy ID
          </p>
          <p className="text-sm font-bold text-slate-900">{item.PolicyId}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase text-slate-400 mb-0.5">
            Net Commission
          </p>
          <p className="text-lg font-black text-emerald-600">
            ৳ {item.TotalPayment.toLocaleString()}
          </p>
        </div>
      </div>

      <Separator className="my-3 opacity-50" />

      {/* Primary Info */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs text-slate-600">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold">
            PR Number
          </p>
          <p className=" ">{item.PRNumber}</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold">
            Com Date
          </p>
          <p className="font-medium flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" /> {item.ComDate}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold">
            Installment
          </p>
          <p className="font-medium">{item.InstallmentNumber}</p>
        </div>

        {/* <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold">
            Or Number
          </p>
          <Badge
            variant="outline"
            className={`h-5 text-[10px] ${
              item.PaymentStatus === "Paid"
                ? "text-emerald-600 border-emerald-200"
                : "text-amber-600 border-amber-200"
            }`}
          >
            <p className=" ">{item.PRNumber}</p>
          </Badge>
        </div> */}
      </div>

      {/* Collapsible Details */}
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="mt-4 pt-2 border-t border-slate-50"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between p-0 h-8 hover:bg-transparent text-slate-400 hover:text-slate-600"
          >
            <span className="text-xs font-bold uppercase tracking-wider">
              View Full Details
            </span>
            {isOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-4 pt-3 text-xs">
          {/* Bank Info */}
          <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100">
            <div className="flex items-center gap-2 mb-2 text-slate-800 font-bold">
              <CreditCard className="w-3.5 h-3.5 text-blue-500" /> Bank
              Information
            </div>
            <div className="space-y-1 pl-5">
              <p className="font-medium text-slate-700">{item.BankName}</p>
              <p className="  text-slate-500">{item.BankACNo}</p>
            </div>
          </div>

          {/* Branch & Agent Info */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                Branch Name
              </p>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Building2 className="w-3 h-3 text-slate-400" />{" "}
                {item.BranchName}
              </div>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                Agent Details
              </p>
              <div className="flex items-center gap-2">
                <User className="w-3 h-3 text-slate-400" />
                <span className="font-medium text-slate-700">{agent.name}</span>
                <Badge
                  variant="secondary"
                  className="text-[9px] h-4 bg-slate-100"
                >
                  {item.AgentTypeName}
                </Badge>
              </div>
              <p className="text-[10px] text-slate-400 pl-5 mt-0.5">
                ID: {agent.id}
              </p>
            </div>
            {/* <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                License Expiry
              </p>
              <p className="text-slate-600">{item.LicenseExpiryDate}</p>
            </div> */}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

function StatCard({
  label,
  value,
  isCurrency,
  theme,
  icon: Icon,
  loading,
  isText,
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
  };
  const t = themes[theme];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-2.5 rounded-xl ${t.light} ${t.text}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="relative z-10">
        {loading ? (
          <Skeleton className="h-9 w-32 mb-1" />
        ) : (
          <h3
            className={`text-3xl font-black ${t.text} tracking-tight ${
              isText ? "text-xl" : ""
            }`}
          >
            {isCurrency ? "৳ " : ""}
            {isText ? value : (value || 0).toLocaleString()}
          </h3>
        )}
        <p className="text-[11px] font-bold uppercase text-slate-400 tracking-wider mt-1">
          {label}
        </p>
      </div>
      <div
        className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full opacity-5 ${t.bg} group-hover:scale-110 transition-transform`}
      />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-20 text-center bg-white rounded-xl border border-slate-200 border-dashed">
      <div className="flex justify-center mb-3">
        <CreditCard className="w-10 h-10 text-slate-300" />
      </div>
      <p className="text-slate-500 font-medium">No commissions found.</p>
      <p className="text-xs text-slate-400 mt-1">
        Try selecting a different month or year.
      </p>
    </div>
  );
}

function TableSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-12 w-48" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-12 w-40" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-12 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-12 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-12 w-24 ml-auto" />
      </TableCell>
    </TableRow>
  );
}
