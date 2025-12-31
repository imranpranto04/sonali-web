"use client";

import {
  useCommissionSchedule,
  FirstYearCommissionItem,
  RenewalCommissionItem,
  SupplementaryCommissionItem,
} from "@/hooks/agent/use-commission-schedule";
import {
  FileText,
  Percent,
  Shield,
  Layers,
  ArrowRight,
  HandCoins,
  BadgeDollarSign,
} from "lucide-react";

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function CommissionSchedulePage() {
  const { data, isLoading } = useCommissionSchedule();

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (!data) {
    return (
      <div className="p-8 text-center text-slate-500">
        Failed to load commission schedule.
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-500 max-w-7xl mx-auto p-4 md:p-8 min-h-screen bg-slate-50/30">
      {/* HEADER */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100">
            {/* <FileText className="w-6 h-6 text-blue-600" /> */}
            <BadgeDollarSign className="w-6 h-6 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-black text-emerald-600 tracking-tight">
            Commission Schedule
          </h1>
        </div>
        <p className="text-slate-500 font-medium ml-1 max-w-2xl">
          Comprehensive breakdown of commission rates for different policy terms
          and types.
        </p>
      </div>

      {/* 1. SUPPLEMENTARY COMMISSION (Highlighted at Top) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.SupplementaryCommission.map((item, idx) => (
          <SupplementaryCard key={idx} item={item} />
        ))}
      </div>

      {/* 2. 1ST YEAR COMMISSION SECTION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1 text-sm font-bold uppercase tracking-wider"
          >
            New Business
          </Badge>
          <h2 className="text-xl font-bold text-slate-800">
            1st Year Commission Rates <br />
            <span className="text-[12px]">(Only for Financial Associate)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Akok / Tafakul Table */}
          <CommissionTableCard
            title="Akok, Tafakul & Micro Policy"
            icon={Shield}
            data={data["1stYearCommission"]["Akok, Tafakul & All Micro Policy"]}
            color="blue"
          />

          {/* Single Policy Table */}
          <CommissionTableCard
            title="Single Premium Policy"
            icon={Layers}
            data={data["1stYearCommission"]["Single Policy"]}
            color="violet"
          />
        </div>
      </section>

      {/* 3. RENEWAL COMMISSION SECTION */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200 px-3 py-1 text-sm font-bold uppercase tracking-wider"
          >
            Recurring
          </Badge>
          <h2 className="text-xl font-bold text-slate-800">
            Renewal Commission Rates <br />
            <span className="text-[12px]">(Only for Financial Associate)</span>
          </h2>
        </div>

        <Card className="border-0 shadow-lg shadow-slate-200/40 bg-white overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/80 border-b border-slate-100">
                <TableRow>
                  <TableHead className="w-[40%] font-extrabold text-slate-700 uppercase tracking-wide pl-6 py-4">
                    Policy Term
                  </TableHead>
                  <TableHead className="font-extrabold text-slate-700 uppercase tracking-wide text-center">
                    2nd Year Rate
                  </TableHead>
                  <TableHead className="font-extrabold text-slate-700 uppercase tracking-wide text-right pr-6">
                    3rd Year & Onward
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.RenewalCommission.map((item, idx) => (
                  <TableRow
                    key={idx}
                    className="hover:bg-slate-50 border-b border-slate-50 transition-colors group"
                  >
                    <TableCell className="font-bold text-slate-700 pl-6 py-4">
                      {item.PolicyTerm}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-bold bg-amber-50 text-amber-700 border border-amber-100">
                        {item["2ndYear"]}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        {item["3rdYearAndOnward"]}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function SupplementaryCard({ item }: { item: SupplementaryCommissionItem }) {
  return (
    <Card className="border-0 shadow-md bg-linear-to-br from-slate-900 to-slate-800 text-white rounded-xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
      <CardContent className="p-6 relative z-10 flex justify-between items-center">
        <div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
            Supplementary
          </p>
          <h3 className="text-xl font-bold">{item.Year}</h3>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-3xl font-black bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-cyan-400">
            {item.percentage}%
          </span>
        </div>
      </CardContent>
      {/* Decorative Blob */}
      <div className="absolute -right-6 -bottom-10 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
    </Card>
  );
}

function CommissionTableCard({
  title,
  icon: Icon,
  data,
  color,
}: {
  title: string;
  icon: any;
  data: FirstYearCommissionItem[];
  color: "blue" | "violet";
}) {
  const themes = {
    blue: { icon: "text-blue-600", bg: "bg-blue-50" },
    violet: { icon: "text-violet-600", bg: "bg-violet-50" },
  };
  const t = themes[color];

  return (
    <Card className="border-slate-200 shadow-sm bg-white overflow-hidden rounded-xl h-full flex flex-col">
      <CardHeader className="border-b border-slate-100 bg-slate-50/30 py-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${t.bg}`}>
            <Icon className={`w-5 h-5 ${t.icon}`} />
          </div>
          <CardTitle className="text-base font-bold text-slate-800">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <div className="flex-1 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-slate-50">
              <TableHead className="w-[60%] font-bold text-slate-500 text-xs uppercase pl-6 h-10">
                Policy Term
              </TableHead>
              <TableHead className="text-right font-bold text-slate-500 text-xs uppercase pr-6 h-10">
                Commission
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow
                key={idx}
                className="hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors"
              >
                <TableCell className="font-medium text-slate-700 pl-6 py-3">
                  {row.PolicyTerm}
                </TableCell>
                <TableCell className="text-right pr-6 py-3">
                  <span className="font-bold text-slate-900">
                    {row.CommissionPercentage}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

function PageSkeleton() {
  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      <div className="h-12 w-64 bg-slate-200 rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-96 w-full rounded-xl" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    </div>
  );
}
