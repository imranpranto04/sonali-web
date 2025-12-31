"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";

// --- TYPES ---
export interface BranchCostingItem {
  Sl: number;
  Branch: string;
  FirstYearPremium: number;
  RenewalPremium: number;
  FirstYearCost: number; // Percentage or Amount based on context, usually %
  OverallCost: number; // Percentage
  color: string; // "Red" | "Black"
}

export interface BranchCostingParams {
  DateFrom: string;
  DateTo: string;
  searchValue: string;
  page: string;
}

// --- FETCHER ---
const fetchBranchCosting = async (params: BranchCostingParams) => {
  if (!params.DateFrom || !params.DateTo) return [];

  try {
    const { data } = await apiClient.post<{
      success: string;
      message: string;
      data: BranchCostingItem[];
    }>("/Agent/AgentBranchCosting", params);

    if (data.success === "true" && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error("Branch Costing API Error:", error);
    return [];
  }
};

// --- HOOK ---
export const useBranchCosting = (initialParams: BranchCostingParams) => {
  const [params, setParams] = useState<BranchCostingParams>(initialParams);

  const queryInfo = useQuery({
    queryKey: ["agent-branch-costing", params],
    queryFn: () => fetchBranchCosting(params),
    placeholderData: keepPreviousData,
    enabled: !!params.DateFrom && !!params.DateTo,
  });

  return { ...queryInfo, params, setParams };
};
