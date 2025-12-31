"use client";

import { useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Download,
  Briefcase,
  Phone,
  Award,
  MapPin,
  Layers,
  Calendar,
} from "lucide-react";
import {
  useNewRecruitment,
  useAgentTypes,
  RecruitmentParams,
} from "@/hooks/agent/use-new-recruitment";

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
import { Separator } from "@/components/ui/separator";

// --- UTILS ---
// Parses "123 - Name" strings into { id, name }
const parseStringData = (raw: string) => {
  if (!raw) return { id: "--", name: "--" };
  const parts = raw.split(" - ");
  return parts.length >= 2
    ? { id: parts[0], name: parts.slice(1).join(" - ") }
    : { id: "", name: raw };
};

export default function RecruitmentPage() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const startYear = 2013;
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) =>
    (currentYear - i).toString()
  );

  // --- STATE ---
  const [filters, setFilters] = useState<RecruitmentParams>({
    AgentType: "FA",
    PolicyStatus: "PR",
    year: currentYear.toString(),
    month: (today.getMonth() + 1).toString(),
    searchValue: "",
    page: "1",
  });

  const { data: agentTypes, isLoading: typesLoading } = useAgentTypes();
  const { data, isLoading, setParams } = useNewRecruitment(filters);

  //   console.log("use agent type ", agentTypes);

  const updateFilter = (updates: Partial<RecruitmentParams>) => {
    const newFilters = { ...filters, ...updates, page: "1" };
    setFilters(newFilters);
    setParams(newFilters);
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-500 max-w-[1800px] mx-auto p-1 md:p-8 bg-slate-50/30 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Recruitment List
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-1">
            Manage new agents and view their initial performance.
          </p>
        </div>

        {/* <Button className="bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20 text-white font-bold px-6">
          <Download className="w-4 h-4 mr-2" /> Export Data
        </Button> */}
      </div>

      {/* 1. FILTER BAR */}
      <Card className="border-0 shadow-lg shadow-slate-200/40 bg-white rounded-2xl overflow-visible z-20">
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Filter 1: Policy Type */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Policy Type
              </label>
              <Select
                value={filters.PolicyStatus}
                onValueChange={(v) => updateFilter({ PolicyStatus: v })}
              >
                <SelectTrigger className="h-11 bg-white border-2 border-slate-100 font-bold text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-100 shadow-xl rounded-xl">
                  {["PR", "OR", "PR + OR", "Renewal"].map((t) => (
                    <SelectItem
                      key={t}
                      value={t}
                      className="font-medium cursor-pointer py-2.5 my-1 mx-1 rounded-lg focus:bg-slate-50 data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-700"
                    >
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filter 2: Agent Role (Dynamic) */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Agent Role
              </label>
              {typesLoading ? (
                <Skeleton className="h-11 w-full rounded-lg" />
              ) : (
                <Select
                  value={filters.AgentType}
                  onValueChange={(v) => updateFilter({ AgentType: v })}
                >
                  <SelectTrigger className="h-11 bg-white border-2 border-slate-100 font-bold text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-100 shadow-xl rounded-xl max-h-[300px]">
                    {agentTypes?.map((t) => (
                      <SelectItem
                        key={t.AgentTypeId}
                        value={t.AgentTypeShortFrom}
                        className="font-medium cursor-pointer py-2.5 my-1 mx-1 rounded-lg focus:bg-slate-50 data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-700"
                      >
                        {t.AgentTypeShortFrom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Filter 3: Period */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Joined Period
              </label>
              <div className="flex gap-2">
                <Select
                  value={filters.year}
                  onValueChange={(v) => updateFilter({ year: v })}
                >
                  <SelectTrigger className="w-[100px] h-11 bg-white border-2 border-slate-100 font-bold text-slate-700 focus:border-blue-500 transition-all">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-100 shadow-xl rounded-xl max-h-[300px]">
                    {years.map((y) => (
                      <SelectItem
                        key={y}
                        value={y}
                        className="font-medium cursor-pointer py-2 my-1 mx-1 rounded-lg focus:bg-slate-50 data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-700"
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
                  <SelectTrigger className="flex-1 h-11 bg-white border-2 border-slate-100 font-bold text-slate-700 focus:border-blue-500 transition-all">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-100 shadow-xl rounded-xl max-h-[300px]">
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem
                        key={i + 1}
                        value={(i + 1).toString()}
                        className="font-medium cursor-pointer py-2 my-1 mx-1 rounded-lg focus:bg-slate-50 data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-700"
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

            {/* Filter 4: Search */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Name or ID..."
                  className="pl-10 h-11 bg-white border-2 border-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium"
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

      {/* 2. DATA TABLE */}
      <Card className="border-0 shadow-xl shadow-slate-200/40 bg-white rounded-2xl overflow-hidden">
        {/* DESKTOP VIEW */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80 h-14 border-b border-slate-100">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[300px] font-extrabold text-slate-600 text-xs uppercase tracking-wide pl-6">
                  Agent Details
                </TableHead>
                <TableHead className="w-[120px] font-extrabold text-slate-600 text-xs uppercase tracking-wide">
                  Role
                </TableHead>
                <TableHead className="w-[250px] font-extrabold text-slate-600 text-xs uppercase tracking-wide">
                  Branch Info
                </TableHead>
                <TableHead className="w-[180px] font-extrabold text-slate-600 text-xs uppercase tracking-wide">
                  Contact
                </TableHead>
                <TableHead className="w-[180px] font-extrabold text-slate-600 text-xs uppercase tracking-wide">
                  Joining Date
                </TableHead>
                <TableHead className="text-right font-extrabold text-slate-600 text-xs uppercase tracking-wide pr-6">
                  Performance
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}>
                      <Skeleton className="h-16 w-full my-2" />
                    </TableCell>
                  </TableRow>
                ))
              ) : data && data.length > 0 ? (
                data.map((item, idx) => <DesktopRow key={idx} item={item} />)
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-48 text-center text-slate-400"
                  >
                    No recruitment data found for this selection.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* MOBILE VIEW (Cards) */}
        <div className="md:hidden p-4 space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-56 w-full rounded-2xl" />
            ))
          ) : data && data.length > 0 ? (
            data.map((item, idx) => <MobileCard key={idx} item={item} />)
          ) : (
            <div className="py-16 text-center text-slate-400">
              No data found.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function DesktopRow({ item }: { item: any }) {
  const agent = parseStringData(item.Agent);
  const branch = parseStringData(item.Branch);

  return (
    <TableRow className="group hover:bg-slate-50 border-b border-slate-50 transition-colors">
      {/* 1. Agent ID & Name */}
      <TableCell className="py-5 pl-6 align-top">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-slate-900">{agent.name}</span>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-slate-700 border border-slate-200 text-[14px] px-2 h-5 "
            >
              {agent.id}
            </Badge>
          </div>
        </div>
      </TableCell>

      {/* 2. Role */}
      <TableCell className="py-5 align-top">
        <Badge className="bg-emerald-100 text-slate-700 border border-blue-100 hover:bg-blue-100 text-xs px-2.5 py-0.5">
          {item.AgentType}
        </Badge>
      </TableCell>

      {/* 3. Branch ID & Name */}
      <TableCell className="py-5 align-top">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">
            {branch.name}
          </span>
          <div className="flex items-center gap-1 text-[12px] text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded w-fit">
            <MapPin className="w-3 h-3 text-slate-400" />
            ID: {branch.id}
          </div>
        </div>
      </TableCell>

      {/* 4. Mobile */}
      <TableCell className="py-5 align-top">
        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
          <Phone className="w-3.5 h-3.5 text-slate-400" /> {item.Mobile}
        </div>
      </TableCell>

      {/* 5. Joining Date */}
      <TableCell className="py-5 align-top">
        <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 w-fit">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          {item.JoiningDate}
        </div>
      </TableCell>

      {/* 6. Performance (Premium & Policies) */}
      <TableCell className="py-5 pr-6 align-top text-right">
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex flex-col items-end">
            <span className="text-[12px] uppercase font-bold text-slate-400 leading-none mb-1">
              Total Premium
            </span>
            <span className="font-black text-emerald-600 text-sm">
              ৳ {Number(item.TotalPremium).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-slate-200 px-3 py-0.5 rounded-full shadow-sm">
            <Layers className="w-3 h-3 text-blue-500" />
            <span className="text-xs font-bold text-slate-700">
              Total policies {item.TotalNoOfPolicy}
            </span>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

function MobileCard({ item }: { item: any }) {
  const agent = parseStringData(item.Agent);
  const branch = parseStringData(item.Branch);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />

      {/* Header */}
      <div className="flex justify-between items-start mb-4 pl-3">
        <div>
          <h4 className="font-bold text-slate-900 text-base">{agent.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
              {agent.id}
            </span>
            <Badge className="bg-blue-50 text-blue-700 border-0 h-5 text-[10px] font-bold">
              {item.AgentType}
            </Badge>
          </div>
        </div>
      </div>

      <Separator className="my-4 opacity-50" />

      {/* Grid Details */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm pl-3">
        <div className="col-span-2">
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
            Branch
          </p>
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">
              {branch.name} ({branch.id})
            </span>
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
            Joined
          </p>
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />{" "}
            {item.JoiningDate}
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
            Mobile
          </p>
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <Phone className="w-3.5 h-3.5 text-slate-400" /> {item.Mobile}
          </div>
        </div>

        {/* Performance Box */}
        <div className="col-span-2 bg-slate-50 rounded-xl p-3 border border-slate-100 flex justify-between items-center mt-2">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">
              Policies
            </p>
            <p className="text-lg font-bold text-slate-800">
              {item.TotalNoOfPolicy}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">
              Total Premium
            </p>
            <p className="text-lg font-black text-emerald-600">
              ৳ {Number(item.TotalPremium).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
