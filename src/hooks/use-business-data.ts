"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";

// Define the shape of a single policy/business row
export interface BusinessItem {
  PolicyNo: string;
  ClientName: string;
  PlanName: string;
  PayType: string; // e.g., "First Year", "Renewal"
  PremiumMode: string;
  PremiumAmount: number;
  NextDueDate: string;
  MobileNo: string;
  Status: "Inforce" | "Lapsed" | "Due";
}

// Fetcher Function
const fetchBusinessList = async (type: string) => {
  try {
    const { data } = await apiClient.post<{
      success: string;
      message: string;
      data: BusinessItem[];
    }>("/Agent/LoadBusinessDetails", { type });

    // Validate response
    if (data.success === "true" && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch business details:", error);
    return [];
  }
};

// The Hook
export const useBusinessList = (type: string) => {
  return useQuery({
    queryKey: ["agent-business", type], // Cache key includes the filter type
    queryFn: () => fetchBusinessList(type),
    staleTime: 5 * 60 * 1000, // Keep data fresh for 5 minutes
    keepPreviousData: true, // specific for pagination/filtering UX
  });
};
