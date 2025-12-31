"use client";

import { useState } from "react";
import {
  Filter,
  Search,
  Download,
  Calendar,
  TrendingUp,
  Layers,
  DollarSign,
  Phone,
  MapPin,
  AlertCircle,
  Shield,
  FileText,
  CheckCircle,
  Briefcase,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  useAgentPerformance,
  PerformanceParams,
} from "@/hooks/use-agent-performance";

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

// --- UTILS ---

const parseIdentity = (raw: string) => {
  if (!raw) return { id: "--", name: "--" };
  const parts = raw.split(" - ");
  return parts.length >= 2
    ? { id: parts[0], name: parts.slice(1).join(" - ") }
    : { id: "", name: raw };
};

const getDaysInMonth = (year: string, month: string) => {
  return new Date(parseInt(year), parseInt(month), 0).getDate().toString();
};

const getRowStyles = (colorStatus: string, isDeferred: number) => {
  if (isDeferred > 0)
    return "bg-amber-50/50 hover:bg-amber-50 border-l-4 border-l-amber-500";
  if (colorStatus === "1")
    return "bg-red-50/50 hover:bg-red-50 border-l-4 border-l-red-500";
  if (colorStatus === "2")
    return "bg-orange-50/50 hover:bg-orange-50 border-l-4 border-l-orange-500";
  return "hover:bg-slate-50 border-l-4 border-l-transparent";
};

const getStatusBadge = (colorStatus: string, isDeferred: number) => {
  if (isDeferred > 0)
    return {
      bg: "bg-amber-100",
      text: "text-amber-800",
      label: "Deferred",
      border: "border-amber-200",
    };
  if (colorStatus === "1")
    return {
      bg: "bg-red-100",
      text: "text-red-800",
      label: "Lapsed",
      border: "border-red-200",
    };
  if (colorStatus === "2")
    return {
      bg: "bg-orange-100",
      text: "text-orange-800",
      label: "Due",
      border: "border-orange-200",
    };
  return {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    label: "Active",
    border: "border-emerald-200",
  };
};

export default function AgentPerformancePage() {
  const today = new Date();

  // --- DYNAMIC YEAR GENERATION ---
  const currentYear = today.getFullYear();
  const startYear = 2010; // Adjust based on your company history
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) =>
    (currentYear - i).toString()
  );

  const [filters, setFilters] = useState<PerformanceParams>({
    type: "PR",
    year: currentYear.toString(),
    month: (today.getMonth() + 1).toString(),
    fday: "1",
    tday: new Date(currentYear, today.getMonth() + 1, 0).getDate().toString(),
    searchValue: "",
    page: "1",
  });

  const { data, isLoading, setParams } = useAgentPerformance(filters);

  // --- HANDLERS ---
  const updateFilter = (updates: Partial<PerformanceParams>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    setParams(newFilters);
  };

  const handleDateChange = (field: "year" | "month", value: string) => {
    const currentYear = field === "year" ? value : filters.year;
    const currentMonth = field === "month" ? value : filters.month;
    const lastDay = getDaysInMonth(currentYear, currentMonth);
    updateFilter({ [field]: value, tday: lastDay });
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-500 max-w-[1800px] mx-auto p-4 md:p-8 bg-slate-50/30 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Performance Report
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-1">
            Analytics for{" "}
            <Badge
              variant="secondary"
              className="mx-1 bg-slate-200 text-slate-800"
            >
              {filters.type}
            </Badge>{" "}
            business
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <Button
            variant="outline"
            className="flex-1 md:flex-none bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
          >
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          {/* <Button className="flex-1 md:flex-none bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button> */}
        </div>
      </div>

      {/* 1. FILTER BAR */}
      <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white rounded-2xl overflow-visible relative z-20">
        <CardContent className="p-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Business Type */}
            <div className="lg:col-span-2">
              <label className="text-[12px] font-bold uppercase text-slate-400 tracking-wider mb-2 block">
                Type
              </label>
              <Select
                value={filters.type}
                onValueChange={(v) => updateFilter({ type: v })}
              >
                <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 font-bold text-slate-700 transition-all focus:ring-2 focus:ring-blue-500/20">
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

            {/* Time Period */}
            <div className="lg:col-span-6">
              <label className="text-[12px] font-bold uppercase text-slate-400 tracking-wider mb-2 block">
                Period
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Dynamic Year Select */}
                <Select
                  value={filters.year}
                  onValueChange={(v) => handleDateChange("year", v)}
                >
                  <SelectTrigger className="w-full sm:w-[100px] h-11 bg-white border-slate-200 font-bold transition-all focus:ring-2 focus:ring-blue-500/20">
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

                {/* Month Select */}
                <Select
                  value={filters.month}
                  onValueChange={(v) => handleDateChange("month", v)}
                >
                  <SelectTrigger className="w-full sm:w-[140px] h-11 bg-white border-slate-200 font-bold transition-all focus:ring-2 focus:ring-blue-500/20">
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

                {/* Day Range */}
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 h-11 w-full sm:w-auto">
                  <span className="text-xs font-bold text-slate-400">Day</span>
                  <Input
                    className="w-8 h-full p-0 text-center border-0 bg-transparent focus-visible:ring-0 font-bold text-slate-700"
                    value={filters.fday}
                    onChange={(e) => updateFilter({ fday: e.target.value })}
                  />
                  <span className="text-slate-300">/</span>
                  <Input
                    className="w-8 h-full p-0 text-center border-0 bg-transparent focus-visible:ring-0 font-bold text-slate-700"
                    value={filters.tday}
                    onChange={(e) => updateFilter({ tday: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="lg:col-span-4">
              <label className="text-[12px] font-bold uppercase text-slate-400 tracking-wider mb-2 block">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Policy, Name..."
                  className="pl-10 h-11 bg-slate-50/50 border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-500/20"
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

      {/* 2. STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <StatCard
          label="Total Policies"
          value={data?.TotalPolicies}
          icon={FileText}
          theme="blue"
          loading={isLoading}
        />
        <StatCard
          label="Total Premium"
          value={data?.TotalPremiumAmount}
          isCurrency
          icon={DollarSign}
          theme="emerald"
          loading={isLoading}
        />
        <StatCard
          label="Sum Assured"
          value={data?.TotalSumAssured}
          isCurrency
          icon={Shield}
          theme="violet"
          loading={isLoading}
        />
        <StatCard
          label="Total Premium Amount Without QSIP MSP"
          subLabel=""
          value={data?.TotalPremiumAmountWithoutQSIPMSP}
          isCurrency
          icon={Layers}
          theme="slate"
          loading={isLoading}
        />
        <StatCard
          label="Allowable MSP"
          value={data?.AllowablePremiumAmount}
          isCurrency
          icon={CheckCircle}
          theme="amber"
          loading={isLoading}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
        <MicroStat label="QSIP Pols" value={data?.TotalPoliciesInQSP} />
        <MicroStat
          label="QSIP Prem"
          value={data?.TotalPremiumAmountInQSP}
          isCurrency
        />
        <MicroStat label="MSP Pols" value={data?.MSPNoOfPolices} />
        <MicroStat
          label="MSP Prem"
          value={data?.MSPTotalPremiumAmount}
          isCurrency
        />
      </div>

      {/* 3. DATA VIEW (Responsive) */}

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/80 h-12 border-b border-slate-100">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[300px] font-extrabold text-slate-700 text-xs uppercase tracking-wide pl-6">
                Agent Details
              </TableHead>
              <TableHead className="w-[220px] font-extrabold text-slate-700 text-xs uppercase tracking-wide">
                Policy Holder
              </TableHead>
              <TableHead className="w-[180px] font-extrabold text-slate-700 text-xs uppercase tracking-wide">
                Financials
              </TableHead>
              <TableHead className="w-[180px] font-extrabold text-slate-700 text-xs uppercase tracking-wide">
                Timeline
              </TableHead>
              <TableHead className="w-[180px] font-extrabold text-slate-700 text-xs uppercase tracking-wide">
                Hierarchy
              </TableHead>
              <TableHead className="text-right font-extrabold text-slate-700 text-xs uppercase tracking-wide pr-6">
                Status
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

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))
          : data?.Details?.map((item, idx) => (
              <MobileCard key={idx} item={item} />
            ))}
      </div>

      {!isLoading && (!data?.Details || data.Details.length === 0) && (
        <div className="py-20 text-center bg-white rounded-xl border border-slate-200 border-dashed">
          <p className="text-slate-500 font-medium">
            No records found for this period.
          </p>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function DesktopRow({ item }: { item: any }) {
  const agent = parseIdentity(item.Agent);
  const applicant = parseIdentity(item.ApplicantName);
  const status = getStatusBadge(item.ColorStatus, item.isDeferred);
  const rowClass = getRowStyles(item.ColorStatus, item.isDeferred);

  return (
    <TableRow
      className={`group transition-all border-b border-slate-50 ${rowClass}`}
    >
      <TableCell className="align-top py-4 pl-6">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-slate-900 text-sm">{agent.name}</span>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-white border-slate-200 text-slate-500 text-[12px] px-1.5 h-5"
            >
              {agent.id}
            </Badge>
            <span className="text-xs text-slate-500 font-medium">
              {item.AgentTypeName}
            </span>
          </div>
          <div className="flex items-start gap-1 mt-1 text-[11px] text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
            <span className="truncate max-w-[180px]">{item.Branch}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="align-top py-4">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-slate-800 text-sm">
            {applicant.name}
          </span>
          <span className="text-[11px] font-mono text-blue-600 font-bold">
            ID: {applicant.id}
          </span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Phone className="w-3 h-3" /> {item.MobileNo}
          </span>
        </div>
      </TableCell>
      <TableCell className="align-top py-4">
        <div className="space-y-1">
          <div className="flex flex-col">
            <span className="text-[12px] font-bold uppercase text-slate-400">
              Premium
            </span>
            <span className="font-bold text-emerald-700 text-sm">
              ৳ {item.PremiumAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold uppercase text-slate-400">
              Sum Assured
            </span>
            <span className="font-medium text-slate-600 text-xs">
              ৳ {item.SumAssured.toLocaleString()}
            </span>
          </div>
          <Badge
            variant="outline"
            className="text-[9px] h-5 bg-white text-slate-500"
          >
            Inst: {item.InstallmentNo}
          </Badge>
        </div>
      </TableCell>
      <TableCell className="align-top py-4">
        <div className="flex flex-col gap-2">
          <div className="bg-orange-50 text-orange-700 px-2 py-1 rounded w-fit text-xs font-bold flex items-center gap-1 border border-orange-100">
            <AlertCircle className="w-3 h-3" /> {item.NextPremiumDueDate}
          </div>
          <div className="text-xs text-slate-500">
            Start: {item.CommencementDate}
          </div>
          <div className="text-[12px] text-slate-400">
            Deposit: {item.DepositDate}
          </div>
        </div>
      </TableCell>
      <TableCell className="align-top py-4">
        <div className="text-[12px] text-slate-500 bg-white/50 p-2 rounded border border-slate-100 w-full leading-relaxed max-w-[200px]">
          {item.FAUMBM.split("#").map((line: string, i: number) => (
            <div key={i} className="truncate">
              {line.trim()}
            </div>
          ))}
        </div>
      </TableCell>
      <TableCell className="align-top py-4 text-right pr-6">
        <div className="flex flex-col items-end gap-2">
          <Badge
            variant="secondary"
            className="bg-white text-slate-600 border border-slate-200 text-[12px]"
          >
            <span>Table & Term</span>
            {item.TableAndTerm}
          </Badge>
          <Badge
            className={`${status.bg} ${status.text} border ${status.border}`}
          >
            {status.label}
          </Badge>
        </div>
      </TableCell>
    </TableRow>
  );
}

function MobileCard({ item }: { item: any }) {
  const agent = parseIdentity(item.Agent);
  const applicant = parseIdentity(item.ApplicantName);
  const status = getStatusBadge(item.ColorStatus, item.isDeferred);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 relative overflow-hidden">
      <div
        className={`absolute top-0 left-0 w-1 h-full ${status.bg.replace(
          "bg-",
          "bg-"
        )}-500`}
      />

      <div className="flex justify-between items-start mb-3 pl-3">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">{applicant.name}</h4>
          <p className="text-xs text-blue-600 font-mono mt-0.5">
            {applicant.id}
          </p>
        </div>
        <Badge
          className={`${status.bg} ${status.text} border ${status.border}`}
        >
          {status.label}
        </Badge>
      </div>

      <Separator className="my-3 opacity-50" />

      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm pl-3">
        <div>
          <p className="text-[12px] font-bold uppercase text-slate-400">
            Premium
          </p>
          <p className="font-bold text-emerald-600">
            ৳ {item.PremiumAmount.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[12px] font-bold uppercase text-slate-400">
            Sum Assured
          </p>
          <p className="font-medium text-slate-700">
            ৳ {item.SumAssured.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[12px] font-bold uppercase text-slate-400">
            Next Due
          </p>
          <p className="font-bold text-orange-600 text-xs flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {item.NextPremiumDueDate}
          </p>
        </div>
        <div>
          <p className="text-[12px] font-bold uppercase text-slate-400">
            Mobile
          </p>
          <p className="font-medium text-slate-700">{item.MobileNo}</p>
        </div>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-3 pl-3">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between p-0 h-8 hover:bg-transparent text-slate-400 hover:text-slate-600"
          >
            <span className="text-xs font-bold uppercase">
              View Full Details
            </span>
            {isOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-2 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-slate-400 font-bold">Commencement</p>
              <p className="text-slate-700">{item.CommencementDate}</p>
            </div>
            <div>
              <p className="text-slate-400 font-bold">Deposit</p>
              <p className="text-slate-700">{item.DepositDate}</p>
            </div>
            <div>
              <p className="text-slate-400 font-bold">Inst No</p>
              <p className="text-slate-700">{item.InstallmentNo}</p>
            </div>
            <div>
              <p className="text-slate-400 font-bold">Term</p>
              <p className="text-slate-700">{item.TableAndTerm}</p>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200">
              <User className="w-3 h-3 text-blue-500" />
              <span className="font-bold text-slate-700">{agent.name}</span>
              <Badge variant="outline" className="text-[9px] h-4">
                {agent.id}
              </Badge>
            </div>
            <div className="space-y-1 text-[12px] text-slate-500">
              <p className="flex gap-1">
                <MapPin className="w-3 h-3" /> {item.Branch}
              </p>
              <div className="mt-2 pt-2 border-t border-slate-200">
                {item.FAUMBM.split("#").map((line: string, i: number) => (
                  <div key={i}>{line.trim()}</div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

function StatCard({
  label,
  subLabel,
  value,
  isCurrency,
  theme,
  icon: Icon,
  loading,
}: any) {
  const themes: any = {
    blue: { bg: "bg-blue-500", text: "text-blue-600", light: "bg-blue-50" },
    emerald: {
      bg: "bg-emerald-500",
      text: "text-emerald-600",
      light: "bg-emerald-50",
    },
    violet: {
      bg: "bg-violet-500",
      text: "text-violet-600",
      light: "bg-violet-50",
    },
    amber: { bg: "bg-amber-500", text: "text-amber-600", light: "bg-amber-50" },
    slate: {
      bg: "bg-slate-700",
      text: "text-slate-700",
      light: "bg-slate-100",
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
          <h3 className={`text-3xl font-black ${t.text} tracking-tight`}>
            {isCurrency ? "৳ " : ""}
            {(value || 0).toLocaleString()}
          </h3>
        )}
        <p className="text-[11px] font-bold uppercase text-slate-400 tracking-wider mt-1">
          {label} <span className="normal-case opacity-70">{subLabel}</span>
        </p>
      </div>
      <div
        className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-5 ${t.bg} group-hover:scale-110 transition-transform`}
      />
    </div>
  );
}

function MicroStat({ label, value, isCurrency }: any) {
  return (
    <div className="flex flex-col items-center justify-center p-2 text-center">
      <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-sm font-bold text-slate-800 bg-slate-100/50 px-3 py-1 rounded-full border border-slate-100">
        {isCurrency ? "৳ " : ""}
        {(value || 0).toLocaleString()}
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
        <Skeleton className="h-10 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-10 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-10 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-12 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-16 ml-auto" />
      </TableCell>
    </TableRow>
  );
}
