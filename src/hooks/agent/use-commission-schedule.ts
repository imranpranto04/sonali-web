"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";

// --- TYPES ---
export interface FirstYearCommissionItem {
  PolicyTerm: string;
  CommissionPercentage: string;
}

export interface RenewalCommissionItem {
  PolicyTerm: string;
  "2ndYear": string;
  "3rdYearAndOnward": string;
}

export interface SupplementaryCommissionItem {
  Year: string;
  percentage: string;
}

export interface CommissionScheduleData {
  "1stYearCommission": {
    "Akok, Tafakul & All Micro Policy": FirstYearCommissionItem[];
    "Single Policy": FirstYearCommissionItem[];
  };
  RenewalCommission: RenewalCommissionItem[];
  SupplementaryCommission: SupplementaryCommissionItem[];
}

// --- FETCHER ---
const fetchCommissionSchedule = async () => {
  try {
    const { data } = await apiClient.get<{
      success: string;
      message: string;
      data: CommissionScheduleData;
    }>("/Common/CommissionSchedule");

    if (data.success === "true" && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error("Commission Schedule Fetch Error:", error);
    return null;
  }
};

// --- HOOK ---
export const useCommissionSchedule = () => {
  return useQuery({
    queryKey: ["commission-schedule"],
    queryFn: fetchCommissionSchedule,
    staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours (static data)
  });
};
