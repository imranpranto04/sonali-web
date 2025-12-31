"use client";

import { useState, useMemo } from "react";
import {
  Users,
  Search,
  Download,
  ShieldCheck,
  ShieldAlert,
  Briefcase,
  Phone,
  Clock,
  User,
  Layers,
  Filter,
} from "lucide-react";
import { useAgentTeam, TeamParams } from "@/hooks/agent/use-agent-team";
import { useAuthStore } from "@/store/auth-store";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// --- CONFIGURATION ---
const HIERARCHY_ORDER = [
  "AMD",
  "SGM",
  "GM",
  "DVC",
  "RC",
  "DC",
  "BC",
  "BM",
  "UM",
];

const isInactive = (colorCode: string) => colorCode?.toLowerCase() === "fa2d2d";

const getStatusConfig = (colorCode: string) => {
  if (isInactive(colorCode)) {
    return {
      label: "Inactive",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-100",
      dot: "bg-red-500",
      icon: ShieldAlert,
    };
  }
  return {
    label: "Active",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    dot: "bg-emerald-500",
    icon: ShieldCheck,
  };
};

export default function AgentTeamPage() {
  const { user } = useAuthStore();
  const myRank = user?.role === "agent" ? user?.designation || "UM" : "UM";

  const [filters, setFilters] = useState<TeamParams>({
    searchValue: "",
    page: "1",
  });

  // Filter State: 'all' | 'active' | 'inactive'
  const [viewFilter, setViewFilter] = useState<"all" | "active" | "inactive">(
    "all"
  );

  const { data, isLoading, setParams } = useAgentTeam(filters);

  // --- DATA PROCESSING ---
  const { filteredList, faStats, hierarchyStats } = useMemo(() => {
    if (!data?.Details)
      return {
        filteredList: [],
        faStats: { total: 0, active: 0, inactive: 0 },
        hierarchyStats: [],
      };

    // 1. Calculate Counts
    let activeCount = 0;
    let inactiveCount = 0;

    // Count from actual list for accuracy
    data.Details.forEach((m) => {
      if (m.AgentType === "FA") {
        isInactive(m.activeStatus) ? inactiveCount++ : activeCount++;
      }
    });

    // Fallback to API summary if list is empty (e.g. searching/pagination)
    if (activeCount === 0 && inactiveCount === 0) {
      activeCount = data.faActive;
      inactiveCount = data.faInactive;
    }

    const totalCount = activeCount + inactiveCount;

    // 2. Filter List based on Selection
    let list = data.Details;
    if (viewFilter === "active") {
      list = data.Details.filter(
        (m) => !isInactive(m.activeStatus) && m.AgentType === "FA"
      );
    } else if (viewFilter === "inactive") {
      list = data.Details.filter(
        (m) => isInactive(m.activeStatus) && m.AgentType === "FA"
      );
    }

    // 3. Hierarchy Logic
    const startIndex = HIERARCHY_ORDER.indexOf(myRank);
    const visibleRanks =
      startIndex !== -1 ? HIERARCHY_ORDER.slice(startIndex) : HIERARCHY_ORDER;

    const stats = visibleRanks
      .map((role) => ({
        label: role,
        value: (data as any)[role.toLowerCase()] || 0,
      }))
      .filter((s) => s.value > 0 || s.label === myRank); // Always show my rank, hide other zeros if preferred

    return {
      filteredList: list,
      faStats: {
        total: totalCount,
        active: activeCount,
        inactive: inactiveCount,
      },
      hierarchyStats: stats,
    };
  }, [data, viewFilter, myRank]);

  const handleSearch = (val: string) => {
    setFilters({ ...filters, searchValue: val, page: "1" });
    setParams({ ...filters, searchValue: val, page: "1" });
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-500 max-w-[1800px] mx-auto p-4 md:p-8 bg-slate-50/30 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Team Hierarchy
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-1">
            Viewing structure for{" "}
            <span className="font-bold text-slate-900">
              {myRank} & Downline
            </span>
            .
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search Name or ID..."
              className="pl-10 h-11 bg-white border-slate-200 focus-visible:ring-blue-500/20 shadow-sm"
              value={filters.searchValue}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          {/* <Button className="bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20 h-11 px-6 font-bold">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button> */}
        </div>
      </div>

      {/* OVERVIEW SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 1. HIERARCHY SCROLL (Left) */}
        <div className="lg:col-span-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4" /> Structure Breakdown
          </h3>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-24 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {hierarchyStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:border-blue-200 hover:shadow-md transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Briefcase className="w-10 h-10 text-slate-900" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-800">
                    {stat.value}
                  </h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2. FIELD FORCE FILTERS (Right) */}
        <div className="lg:col-span-1">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Filter className="w-4 h-4" /> Field Force (FA)
          </h3>

          <div className="flex flex-col gap-3">
            {/* TOTAL FA (Acts as Show All Button) */}
            <div
              onClick={() => setViewFilter("all")}
              className={`relative rounded-xl p-3 border cursor-pointer transition-all duration-200 group flex items-center justify-between ${
                viewFilter === "all"
                  ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "bg-white border-slate-200 hover:border-blue-300"
              }`}
            >
              <div>
                <p
                  className={`text-[10px] font-bold uppercase tracking-wide ${
                    viewFilter === "all" ? "text-blue-100" : "text-slate-400"
                  }`}
                >
                  Total FA
                </p>
                <h3
                  className={`text-xl font-black ${
                    viewFilter === "all" ? "text-white" : "text-slate-800"
                  }`}
                >
                  {isLoading ? "-" : faStats.total}
                </h3>
              </div>
              <div
                className={`p-2 rounded-lg ${
                  viewFilter === "all"
                    ? "bg-white/20 text-white"
                    : "bg-slate-50 text-slate-400"
                }`}
              >
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Active Filter */}
              <div
                onClick={() => setViewFilter("active")}
                className={`relative rounded-xl p-3 border cursor-pointer transition-all duration-200 group ${
                  viewFilter === "active"
                    ? "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500"
                    : "bg-white border-slate-200 hover:border-emerald-200"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <p
                    className={`text-[10px] font-bold uppercase ${
                      viewFilter === "active"
                        ? "text-emerald-700"
                        : "text-emerald-600"
                    }`}
                  >
                    Active
                  </p>
                  <ShieldCheck
                    className={`w-4 h-4 ${
                      viewFilter === "active"
                        ? "text-emerald-600"
                        : "text-emerald-400"
                    }`}
                  />
                </div>
                <h3 className="text-xl font-black text-slate-800">
                  {isLoading ? "-" : faStats.active}
                </h3>
              </div>

              {/* Inactive Filter */}
              <div
                onClick={() => setViewFilter("inactive")}
                className={`relative rounded-xl p-3 border cursor-pointer transition-all duration-200 group ${
                  viewFilter === "inactive"
                    ? "bg-red-50 border-red-500 ring-1 ring-red-500"
                    : "bg-white border-slate-200 hover:border-red-200"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <p
                    className={`text-[10px] font-bold uppercase ${
                      viewFilter === "inactive"
                        ? "text-red-700"
                        : "text-red-600"
                    }`}
                  >
                    Inactive
                  </p>
                  <ShieldAlert
                    className={`w-4 h-4 ${
                      viewFilter === "inactive"
                        ? "text-red-600"
                        : "text-red-400"
                    }`}
                  />
                </div>
                <h3 className="text-xl font-black text-slate-800">
                  {isLoading ? "-" : faStats.inactive}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MEMBER LIST TABLE */}
      <Card className="border-0 shadow-xl shadow-slate-200/40 bg-white rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Header Indication */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-700">
            {viewFilter === "all"
              ? "All Team Members"
              : viewFilter === "active"
              ? "Active FA List"
              : "Inactive FA List"}
          </h3>
          <Badge variant="outline" className="bg-white">
            {filteredList.length} Records
          </Badge>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80 h-12 border-b border-slate-100">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[350px] font-extrabold text-slate-700 text-xs uppercase pl-6">
                  Agent Profile
                </TableHead>
                <TableHead className="w-[150px] font-extrabold text-slate-700 text-xs uppercase">
                  Designation
                </TableHead>
                <TableHead className="w-[200px] font-extrabold text-slate-700 text-xs uppercase">
                  Experience
                </TableHead>
                <TableHead className="w-[200px] font-extrabold text-slate-700 text-xs uppercase">
                  Contact Info
                </TableHead>
                <TableHead className="text-right font-extrabold text-slate-700 text-xs uppercase pr-6">
                  Current Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={5}>
                      <Skeleton className="h-16 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredList.length > 0 ? (
                filteredList.map((member, idx) => {
                  const status = getStatusConfig(member.activeStatus);
                  return (
                    <TableRow
                      key={idx}
                      className="group hover:bg-slate-50 transition-colors border-b border-slate-50"
                    >
                      <TableCell className="pl-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Avatar className="h-11 w-11 border-2 border-white shadow-sm bg-slate-100">
                              <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 font-black text-sm">
                                {member.AgentName.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${status.dot}`}
                            />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">
                              {member.AgentName}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[11px] bg-slate-100 text-slate-500 px-1.5 rounded border border-slate-200 font-mono">
                                ID: {member.AgentId}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="space-y-1">
                          <Badge className="bg-slate-900 text-white hover:bg-slate-800 text-[10px] h-5 px-2">
                            {member.AgentType}
                          </Badge>
                          <p className="text-xs text-slate-500 font-medium pl-0.5">
                            Branch {member.Branch}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex items-center gap-2 text-slate-700 bg-slate-50 w-fit px-3 py-1.5 rounded-lg border border-slate-100">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-xs font-bold">
                            {member.jobPeriod}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium group-hover:text-blue-600 transition-colors">
                          <Phone className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500" />
                          {member.Mobile}
                        </div>
                      </TableCell>
                      <TableCell className="pr-6 py-5 text-right">
                        <Badge
                          variant="outline"
                          className={`${status.bg} ${status.color} ${status.border} border gap-1.5 py-1 pr-3`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
                          />
                          {status.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-48 text-center text-slate-400"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Users className="w-12 h-12 opacity-10 mb-3" />
                      <p>
                        No {viewFilter === "all" ? "" : viewFilter} members
                        found.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* MOBILE CARDS (Unchanged from before) */}
        <div className="md:hidden p-4 space-y-4 bg-slate-50/50">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-2xl" />
              ))
            : filteredList.map((member, idx) => {
                const status = getStatusConfig(member.activeStatus);
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 relative overflow-hidden"
                  >
                    <div
                      className={`absolute top-0 left-0 w-1.5 h-full ${
                        isInactive(member.activeStatus)
                          ? "bg-red-500"
                          : "bg-emerald-500"
                      }`}
                    />

                    <div className="flex justify-between items-start mb-4 pl-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-slate-100">
                          <AvatarFallback className="bg-slate-50 text-slate-600 font-bold text-xs">
                            {member.AgentName.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {member.AgentName}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge className="bg-slate-900 text-[10px] h-4 px-1">
                              {member.AgentType}
                            </Badge>
                            <span className="text-xs text-slate-500 font-mono">
                              {member.AgentId}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-px bg-slate-100 my-3 ml-3" />
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs pl-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">
                          Branch
                        </p>
                        <p className="font-medium text-slate-700">
                          {member.Branch}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">
                          Status
                        </p>
                        <Badge
                          variant="outline"
                          className={`${status.bg} ${status.color} border-0 text-[10px] h-5 px-2`}
                        >
                          {status.label}
                        </Badge>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">
                          Experience
                        </p>
                        <div className="flex items-center gap-1.5 font-medium text-slate-700 bg-slate-50 p-1.5 rounded border border-slate-100">
                          <Briefcase className="w-3.5 h-3.5 text-slate-400" />{" "}
                          {member.jobPeriod}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">
                          Mobile
                        </p>
                        <p className="font-medium text-slate-700 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />{" "}
                          {member.Mobile}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </Card>
    </div>
  );
}
