"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";

export interface AgentSummaryItem {
  PayType: string; // "PR", "Deferred", "First Year", "Renewal"
  DuePremium: number;
  DueQty: number;
  TotalPremium: number;
  TotalQty: number;
  LapseAmount: number;
  LapseQty: number;
  Percentage: number;
}

// Fetcher function that accepts the 'type' parameter
const fetchAgentSummary = async (type: string) => {
  try {
    const { data } = await apiClient.post<{
      success: string;
      message: string;
      data: AgentSummaryItem[];
    }>(
      "/Agent/LoadSummary",
      { type } // Sending { "type": "Month" } etc.
    );

    if (data.success === "true" && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch agent summary:", error);
    return [];
  }
};

export const useAgentSummary = (type: string) => {
  return useQuery({
    queryKey: ["agent-summary", type], // Refetch when 'type' changes
    queryFn: () => fetchAgentSummary(type),
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
  });
};
