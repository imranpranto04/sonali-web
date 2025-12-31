"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";

// --- TYPES ---

// Level 1: Yearly Summary
export interface PfYearlyItem {
  PfYear: number;
  PolicyCount: number;
  TotalPremiumAmount: number;
  TotalCommission: number;
  TotalPFAmt: number;
}

export interface PfSummaryResponse {
  TotalPolicies: string;
  TotalPremiumAmount: string;
  TotalCommissionAmount: string;
  TotalPFAmountAccrued: string;
  Details: PfYearlyItem[];
}

// Level 2: Monthly Details
export interface PfMonthlyItem {
  PfMonth: string;
  PfYear: string;
  PolicyCount: number;
  TotalPremiumAmount: number;
  TotalCommission: number;
  TotalPFAmt: number;
}

// Level 3: Policy Details
export interface PfPolicyItem {
  fprid: number;
  installmentno: number;
  PFAMT: number;
  PFDATE: string;
  TotalPremiumAmount: number;
  CommissionAmt: number;
}

// --- FETCHERS ---

const fetchYearlySummary = async () => {
  try {
    const { data } = await apiClient.get<{
      success: string;
      data: PfSummaryResponse;
    }>("/Agent/AgentProvidentFundYearlySammary");
    return data.success === "true" ? data.data : null;
  } catch (error) {
    return null;
  }
};

const fetchYearDetails = async (year: string) => {
  try {
    const { data } = await apiClient.post<{
      success: string;
      data: PfMonthlyItem[];
    }>("/Agent/AgentProvidentFundYearDetails", { year });
    return data.success === "true" ? data.data : [];
  } catch (error) {
    return [];
  }
};

const fetchMonthDetails = async (year: string, month: string) => {
  try {
    const { data } = await apiClient.post<{
      success: string;
      data: PfPolicyItem[];
    }>("/Agent/AgentProvidentFundMonthDetails", { year, month, page: "1" });
    return data.success === "true" ? data.data : [];
  } catch (error) {
    return [];
  }
};

// --- HOOKS ---

export const usePfSummary = () => {
  return useQuery({
    queryKey: ["pf-summary"],
    queryFn: fetchYearlySummary,
  });
};

export const usePfYearDetails = (year: string | null) => {
  return useQuery({
    queryKey: ["pf-year", year],
    queryFn: () => fetchYearDetails(year!),
    enabled: !!year,
  });
};

export const usePfMonthDetails = (
  year: string | null,
  month: string | null
) => {
  return useQuery({
    queryKey: ["pf-month", year, month],
    queryFn: () => fetchMonthDetails(year!, month!),
    enabled: !!year && !!month,
  });
};
