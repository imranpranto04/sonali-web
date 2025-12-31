"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";
import { useState } from "react";

// --- 1. DEFINE INTERFACES (The "Shape" of your data) ---

export interface PerformanceDetail {
  Agent: string;
  Branch: string;
  AgentTypeName: string;
  NoOfPr: number;
  SumAssured: number;
  PremiumAmount: number;
  DepositDate: string;
  CommencementDate: string;
  ApplicantName: string;
  MobileNo: string;
  NextPremiumDueDate: string;
  TableAndTerm: string;
  InstallmentNo: number;
  FAUMBM: string;
  isDeferred: number;
  ColorStatus: string;
}

export interface PerformanceResponse {
  TotalPolicies: number;
  TotalSumAssured: number;
  TotalPremiumAmount: number;
  TotalPoliciesInQSP: number;
  TotalPremiumAmountInQSP: number;
  MSPNoOfPolices: number;
  MSPTotalPremiumAmount: number;
  AllowablePremiumAmount: number;
  TotalPremiumAmountWithoutQSIPMSP: number;
  Details: PerformanceDetail[];
}

export interface PerformanceParams {
  type: string;
  year: string;
  month: string;
  fday: string;
  tday: string;
  searchValue: string;
  page: string;
}

// --- 2. THE FETCHER ---
// We explicitly tell Promise what it returns: <PerformanceResponse | null>
const fetchPerformance = async (
  params: PerformanceParams
): Promise<PerformanceResponse | null> => {
  try {
    const { data } = await apiClient.post<{
      success: string;
      data: PerformanceResponse; // Match API response structure
    }>("/Agent/AgentPerformance", params);

    // Ensure we return the 'data' property which matches PerformanceResponse
    if (data.success === "true" && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
};

// --- 3. THE HOOK ---
export const useAgentPerformance = (initialParams: PerformanceParams) => {
  const [params, setParams] = useState<PerformanceParams>(initialParams);

  const queryInfo = useQuery({
    queryKey: ["agent-performance", params],
    queryFn: () => fetchPerformance(params),
    placeholderData: keepPreviousData, // Keeps table data visible while filtering
  });

  return {
    ...queryInfo,
    data: queryInfo.data, // This is now correctly typed as PerformanceResponse | null | undefined
    params,
    setParams,
  };
};
