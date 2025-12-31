"use client";

import { useState } from "react";
import { PieChart, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import {
  useDeferredSummary,
  useLapseDetails,
  DeferredParams,
} from "@/hooks/agent/use-deferred-renewal";

import { SmartDatePicker } from "@/components/ui/smart-date-picker";

// UI Components
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LapseMobileCard,
  LapseTable,
  SummaryCard,
} from "@/components/dashboard/agent/DeferredRenewal";

const ITEMS_PER_PAGE = 20;

export default function DeferredRenewalPage() {
  const today = new Date();

  // 1. Calendar State
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [toDate, setToDate] = useState<Date | undefined>(
    new Date(today.getFullYear(), today.getMonth() + 1, 0)
  );

  // 2. API & Logic State
  const [apiParams, setApiParams] = useState<DeferredParams>({
    DateFrom: fromDate ? format(fromDate, "dd/MM/yyyy") : "",
    DateTo: toDate ? format(toDate, "dd/MM/yyyy") : "",
  });
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // 3. Queries
  const {
    data: summaryData,
    isLoading: isSummaryLoading,
    isFetching: isSummaryFetching,
  } = useDeferredSummary(apiParams);
  const {
    data: detailsData,
    isLoading: isDetailsLoading,
    isFetching: isDetailsFetching,
  } = useLapseDetails({
    ...apiParams,
    ReportType: selectedType || "",
  });

  // 4. Loading States
  // Shows skeleton on Initial Load OR when Fetching new data
  const showSummarySkeleton = isSummaryLoading || isSummaryFetching;
  const showDetailsSkeleton = isDetailsLoading || isDetailsFetching;

  // 5. Pagination Logic (Client Side)
  const totalItems = detailsData?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedData = detailsData?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 6. Handlers
  const handleFilterApply = () => {
    if (fromDate && toDate) {
      setApiParams({
        DateFrom: format(fromDate, "dd/MM/yyyy"),
        DateTo: format(toDate, "dd/MM/yyyy"),
      });
      setSelectedType(null); // Reset selection
      setCurrentPage(1); // Reset page
    }
  };

  const handleTypeSelect = (type: string) => {
    if (selectedType === type) {
      setSelectedType(null);
    } else {
      setSelectedType(type);
      setCurrentPage(1);
    }
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-500 max-w-[1800px] mx-auto p-4 md:p-8 bg-slate-50/30 min-h-screen">
      {/* HEADER & FILTERS */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100">
              <PieChart className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Deferred & Renewal
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-1">
            Analyze retention rates and lapsed policies.
          </p>
        </div>

        {/* SMART DATE PICKER SECTION */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div className="flex flex-col md:flex-row items-center gap-2 w-full sm:w-auto">
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
            onClick={handleFilterApply}
            disabled={showSummarySkeleton}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-10 px-6 rounded-lg w-full sm:w-auto cursor-pointer"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showSummarySkeleton ? "Loading..." : "View"}
          </Button>
        </div>
      </div>

      {/* 1. MASTER VIEW: SUMMARY CARDS */}
      {showSummarySkeleton ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Skeleton className="h-72 w-full rounded-2xl" />
          <Skeleton className="h-72 w-full rounded-2xl" />
        </div>
      ) : summaryData && summaryData.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {summaryData.map((item, idx) => (
            <SummaryCard
              key={idx}
              item={item}
              isActive={selectedType === item.Type}
              onClick={() => handleTypeSelect(item.Type)}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white rounded-xl border border-slate-200 border-dashed">
          <p className="text-slate-500 font-medium">
            No summary data available.
          </p>
        </div>
      )}

      {/* 2. DETAIL VIEW: LAPSE LIST */}
      {selectedType && (
        <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 bg-red-500 rounded-full" />
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Lapse Details
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Showing {totalItems} lapses for{" "}
                  <span className="font-bold text-blue-600">
                    {selectedType}
                  </span>
                </p>
              </div>
            </div>

            {/* Pagination Controls (Top) */}
            {!showDetailsSkeleton && totalItems > ITEMS_PER_PAGE && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-xs font-bold text-slate-600 px-2">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* LIST CONTAINER */}
          <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/40 rounded-2xl overflow-hidden">
            {/* Desktop Table */}
            <LapseTable
              data={paginatedData || []}
              loading={showDetailsSkeleton}
            />

            {/* Mobile Cards */}
            <div className="md:hidden p-4 space-y-4 bg-slate-50/50">
              {showDetailsSkeleton ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-2xl" />
                ))
              ) : paginatedData && paginatedData.length > 0 ? (
                paginatedData.map((item, idx) => (
                  <LapseMobileCard key={idx} item={item} />
                ))
              ) : (
                <div className="text-center py-10 text-slate-400 text-sm">
                  No lapses found.
                </div>
              )}
            </div>

            {/* Pagination Footer (Bottom) */}
            {!showDetailsSkeleton && totalItems > ITEMS_PER_PAGE && (
              <div className="p-4 border-t border-slate-100 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm font-bold mx-2">
                    {currentPage} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
