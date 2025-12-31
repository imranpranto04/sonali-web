"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";

// --- TYPES ---
export interface TeamMember {
  AgentId: number;
  AgentType: string;
  AgentName: string;
  Branch: number;
  jobPeriodYear: number;
  jobPeriodMonth: number;
  jobPeriodDay: number;
  Mobile: string;
  activeStatus: string; // Hex code (e.g., "fa2d2d" for inactive)
  jobPeriod: string;
}

export interface TeamHierarchyResponse {
  Details: TeamMember[];
  amd: number;
  sgm: number;
  dvc: number;
  rc: number;
  dc: number;
  bc: number;
  bm: number;
  um: number;
  faActive: number;
  faInactive: number;
}

export interface TeamParams {
  searchValue: string;
  page: string;
}

// --- FETCHER ---
const fetchTeam = async (params: TeamParams) => {
  try {
    const { data } = await apiClient.post<{
      success: string;
      message: string;
      data: TeamHierarchyResponse;
    }>("/Agent/AgentHierarchyList", params);

    if (data.success === "true" && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error("Team Fetch Error:", error);
    return null;
  }
};

// --- HOOK ---
export const useAgentTeam = (initialParams: TeamParams) => {
  const [params, setParams] = useState<TeamParams>(initialParams);

  const queryInfo = useQuery({
    queryKey: ["agent-team", params],
    queryFn: () => fetchTeam(params),
    placeholderData: keepPreviousData,
  });

  return { ...queryInfo, params, setParams };
};
