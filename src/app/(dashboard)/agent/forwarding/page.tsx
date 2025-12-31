"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format, subDays } from "date-fns";
import {
  Send,
  Calendar,
  XCircle,
  CreditCard,
  ChevronRight,
  Layers,
  DollarSign,
  X,
  FileText,
} from "lucide-react";
import {
  useForwardingSummary,
  useForwardingDetails,
  useForwardingActions,
  ForwardingSummaryItem,
} from "@/hooks/agent/use-forwarding";
import { SmartDatePicker } from "@/components/ui/smart-date-picker";

// Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Helper for Status Badge Color
const getStatusBadge = (status: string) => {
  switch (status) {
    case "Created":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Cancel":
      return "bg-red-50 text-red-700 border-red-200";
    case "Paid":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
};

export default function AgentForwardingPage() {
  const router = useRouter();
  const today = new Date();
  const lastWeek = subDays(today, 7);

  // --- STATE ---
  const [fromDate, setFromDate] = useState<Date | undefined>(lastWeek);
  const [toDate, setToDate] = useState<Date | undefined>(today);

  const [queryParams, setQueryParams] = useState({
    StartDate: format(lastWeek, "dd/MM/yyyy"),
    EndDate: format(today, "dd/MM/yyyy"),
  });

  const [selectedForwarding, setSelectedForwarding] =
    useState<ForwardingSummaryItem | null>(null);

  // --- HOOKS ---
  const {
    data: summaryData,
    isLoading,
    isFetching,
  } = useForwardingSummary(queryParams);
  const { cancelMutation } = useForwardingActions();

  // --- HANDLERS ---
  const handleView = () => {
    if (fromDate && toDate) {
      setQueryParams({
        StartDate: format(fromDate, "dd/MM/yyyy"),
        EndDate: format(toDate, "dd/MM/yyyy"),
      });
    }
  };

  const handleCancel = (id: number) => {
    cancelMutation.mutate(id);
  };

  const handlePay = (id: number, amount: number) => {
    alert(`Initiating SSL Payment for Amount: ${amount}`);
  };

  const showSkeleton = isLoading || isFetching;

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-500 max-w-[1800px] mx-auto p-4 md:p-8 bg-slate-50/30 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100">
              <Send className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Forwarding History
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-1">
            Manage agent forwarding batches and payments.
          </p>
        </div>

        {/* ADD BUTTON */}
        <Button
          onClick={() => router.push("/agent/forwarding-entry")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 px-6 shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
        >
          + Add Forwarding
        </Button>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <SmartDatePicker
            date={fromDate}
            setDate={setFromDate}
            placeholder="Start Date"
          />
          <span className="text-slate-300 font-bold">-</span>
          <SmartDatePicker
            date={toDate}
            setDate={setToDate}
            placeholder="End Date"
          />
        </div>
        <Button
          onClick={handleView}
          disabled={showSkeleton}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-10 px-6 rounded-lg w-full sm:w-auto transition-all active:scale-95"
        >
          {showSkeleton ? "Loading..." : "View Data"}
        </Button>
      </div>

      {/* MASTER TABLE */}
      <Card className="border-0 shadow-xl shadow-slate-200/40 bg-white rounded-2xl overflow-hidden">
        <div className="relative w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80 h-14 border-b border-slate-100">
              <TableRow className="hover:bg-transparent">
                <TableHead className="hidden md:table-cell w-[150px] font-extrabold text-slate-700 text-xs uppercase pl-6">
                  Created Date
                </TableHead>
                <TableHead className="w-[200px] font-extrabold text-slate-700 text-xs uppercase">
                  Forwarding No
                </TableHead>
                <TableHead className="font-extrabold text-slate-700 text-xs uppercase text-right">
                  Policies
                </TableHead>
                <TableHead className="font-extrabold text-slate-700 text-xs uppercase text-right">
                  Total Amount
                </TableHead>
                <TableHead className="w-[150px] font-extrabold text-slate-700 text-xs uppercase text-center">
                  Status
                </TableHead>
                <TableHead className="text-right font-extrabold text-slate-700 text-xs uppercase">
                  Actions
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {showSkeleton ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={7}>
                      <Skeleton className="h-16 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : summaryData && summaryData.length > 0 ? (
                summaryData.map((item, idx) => (
                  <TableRow
                    key={idx}
                    className="group hover:bg-blue-50/50 transition-all duration-200 border-b border-slate-50 cursor-pointer"
                    onClick={() => setSelectedForwarding(item)}
                  >
                    <TableCell className="pl-6 py-5 hidden md:table-cell">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {item.CreateDate}
                      </div>
                    </TableCell>
                    <TableCell className="py-5">
                      <span className="font-bold text-slate-900 text-sm font-mono bg-slate-100 px-2 py-1 rounded border border-slate-200 group-hover:border-blue-200 transition-colors">
                        {item.ForwardingNo}
                      </span>
                    </TableCell>
                    <TableCell className="py-5 text-right">
                      <span className="font-medium text-slate-700">
                        {item.TotalNoOfPolicy}
                      </span>
                    </TableCell>
                    <TableCell className="py-5 text-right">
                      <span className="font-black text-slate-800 text-sm">
                        ৳ {item.TotalAmount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="py-5 text-center">
                      <Badge
                        variant="outline"
                        className={`${getStatusBadge(
                          item.StatusFlag
                        )} font-bold border`}
                      >
                        {item.StatusFlag}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className="py-5 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.StatusFlag === "Created" ? (
                        <div className="flex justify-end gap-2">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-2 border border-transparent hover:border-red-200"
                              >
                                <XCircle className="w-4 h-4 mr-1.5" /> Cancel
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white border-2 border-emerald-200">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Cancel Forwarding?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to cancel forwarding{" "}
                                  <b>{item.ForwardingNo}</b>? This cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Back</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                  onClick={() => handleCancel(item.Id)}
                                >
                                  Confirm Cancel
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-3 shadow-sm"
                            onClick={() => handlePay(item.Id, item.TotalAmount)}
                          >
                            <CreditCard className="w-3.5 h-3.5 mr-1.5" /> Pay
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic pr-2">
                          No actions needed
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="pr-4 pl-0 text-slate-300 group-hover:text-blue-600 transition-colors text-right">
                      <ChevronRight className="w-5 h-5 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-60 text-center text-slate-400"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Layers className="w-12 h-12 mb-3 opacity-20" />
                      <p>No forwarding records found.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* DETAIL SHEET */}
      <ForwardingDetailsSheet
        isOpen={!!selectedForwarding}
        onClose={() => setSelectedForwarding(null)}
        forwarding={selectedForwarding}
      />
    </div>
  );
}

// --- SUB-COMPONENT: DETAIL SHEET (DESIGN UPDATE) ---

function ForwardingDetailsSheet({
  isOpen,
  onClose,
  forwarding,
}: {
  isOpen: boolean;
  onClose: () => void;
  forwarding: ForwardingSummaryItem | null;
}) {
  const { data, isLoading } = useForwardingDetails(forwarding?.Id || null);

  if (!forwarding) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl p-0 flex flex-col bg-slate-50 h-full border-l shadow-2xl">
        {/* HEADER */}
        <SheetHeader className="flex-none bg-white border-b border-slate-200 px-6 py-5 shadow-sm z-10 text-left space-y-0 relative">
          {/* Custom Highlighted Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 bg-red-500 text-white hover:bg-red-50 hover:text-red-600 rounded-full w-9 h-9 transition-colors"
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="flex flex-col gap-2 pr-10">
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="text-slate-500 bg-slate-50 font-mono border-slate-200"
              >
                ID: {forwarding.Id}
              </Badge>
              <Badge
                className={`${getStatusBadge(
                  forwarding.StatusFlag
                )} border px-2.5 py-0.5 rounded-full font-bold shadow-sm`}
              >
                {forwarding.StatusFlag}
              </Badge>
            </div>
            <SheetTitle className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              #{forwarding.ForwardingNo}
            </SheetTitle>
            <SheetDescription className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <Calendar className="w-4 h-4 text-indigo-500" />
              <span>
                Created Date:{" "}
                <span className="text-slate-700 font-bold">
                  {forwarding.CreateDate}
                </span>
              </span>
            </SheetDescription>
          </div>
        </SheetHeader>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Value Card */}
          <div className="bg-linear-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-xl flex justify-between items-center relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                <DollarSign className="w-4 h-4" /> Total Batch Value
              </p>
              <p className="text-4xl font-black tracking-tight text-white">
                ৳ {forwarding.TotalAmount.toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-white/10 rounded-full relative z-10 backdrop-blur-sm border border-white/20">
              <Layers className="w-8 h-8 text-white" />
            </div>
            {/* Background Shapes */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/20 rounded-full -mr-10 -mt-10 blur-3xl" />
            <div className="absolute left-0 bottom-0 w-24 h-24 bg-blue-500/20 rounded-full -ml-10 -mb-10 blur-2xl" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-black text-slate-700 uppercase tracking-wider">
                <FileText className="w-4 h-4 text-indigo-600" /> Included
                Policies
              </div>
              {!isLoading && data && (
                <Badge
                  variant="secondary"
                  className="bg-slate-200 text-slate-600 font-bold"
                >
                  {data.length} Items
                </Badge>
              )}
            </div>

            {/* Skeleton Loader */}
            {isLoading && (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 rounded-xl border border-slate-100 space-y-3 shadow-sm"
                  >
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-6 w-10" />
                    </div>
                    <Skeleton className="h-12 w-full rounded-lg bg-slate-50" />
                  </div>
                ))}
              </div>
            )}

            {/* Data List */}
            {!isLoading && data && data.length > 0 ? (
              <div className="space-y-3">
                {data.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm p-0 overflow-hidden hover:shadow-md transition-all duration-300 group"
                  >
                    {/* Item Header */}
                    <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs shadow-sm group-hover:border-indigo-300 group-hover:text-indigo-600 transition-colors">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-0.5">
                            Policy Holder
                          </p>
                          <p className="text-sm font-bold text-slate-800 leading-tight">
                            {item.PolicyHolderName}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`border font-bold shadow-sm ${
                          item.RefType === "PR"
                            ? "bg-purple-50 text-purple-700 border-purple-100"
                            : "bg-blue-50 text-blue-700 border-blue-100"
                        }`}
                      >
                        {item.RefType}
                      </Badge>
                    </div>

                    {/* Item Details Grid */}
                    <div className="p-5 grid grid-cols-2 gap-y-4 relative">
                      <div className="absolute left-1/2 top-5 bottom-5 w-px bg-slate-100" />

                      <div className="pr-4">
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
                          Reference No
                        </p>
                        <p className="text-base font-mono font-bold text-slate-700 bg-slate-50 w-fit px-2 py-0.5 rounded border border-slate-100">
                          {item.RefNo}
                        </p>
                      </div>

                      <div className="pl-4 text-right">
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
                          Payments
                        </p>
                        <p className="text-sm font-medium text-slate-700">
                          <span className="font-black text-lg">
                            {item.PaymentCount}
                          </span>{" "}
                          <span className="text-xs text-slate-500 font-bold">
                            Inst.
                          </span>
                        </p>
                      </div>

                      <div className="col-span-2 bg-slate-50/80 rounded-xl p-4 border border-slate-100 flex flex-wrap justify-between items-center mt-2 group-hover:border-indigo-100 transition-colors">
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                          <span className="font-bold text-slate-800">
                            ৳ {item.Amount.toLocaleString()}
                          </span>
                          <X className="w-3 h-3 text-slate-400" />
                          <span>{item.PaymentCount}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">
                            Subtotal
                          </p>
                          <p className="text-xl font-black text-emerald-600">
                            ৳ {item.TotalAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              !isLoading && (
                <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                  <FileText className="w-12 h-12 text-slate-200 mb-2" />
                  <p className="text-slate-500 font-medium">No items found.</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex-none p-4 bg-white border-t border-slate-200 z-10">
          <Button
            onClick={onClose}
            className="w-full h-12 bg-red-600 hover:bg-slate-800 text-white font-bold text-base rounded-xl shadow-lg shadow-slate-900/10 active:scale-95 transition-all"
          >
            Close Details
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
