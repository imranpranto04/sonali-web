"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";

// --- TYPES ---
export interface RankingItem {
  Month: string;
  Ranking: string;
  NoOfPr: string;
  PremiumAmount: string;
  TotalCommission: string;
  VatAmout: string; // Note: API typo "VatAmout" kept as per your JSON
  AvgPre: string;
}

export interface RankingParams {
  PolicyStatus: string; // "PR", "OR", "Renewal"
  year: string;
  month: string;
}

// --- FETCHER ---
const fetchRanking = async (params: RankingParams) => {
  try {
    const { data } = await apiClient.post<{
      success: string;
      message: string;
      data: RankingItem[];
    }>("/Agent/AgentRanking", params);

    if (data.success === "true" && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error("Ranking Fetch Error:", error);
    return [];
  }
};

// --- HOOK ---
export const useAgentRanking = (initialParams: RankingParams) => {
  const [params, setParams] = useState<RankingParams>(initialParams);

  const queryInfo = useQuery({
    queryKey: ["agent-ranking", params],
    queryFn: () => fetchRanking(params),
    placeholderData: keepPreviousData,
  });

  return {
    ...queryInfo,
    params,
    setParams,
  };
};
