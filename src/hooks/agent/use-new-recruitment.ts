"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";

// --- TYPES ---
export interface RecruitmentItem {
  Agent: string; // "230857 - Sajal..."
  JoiningDate: string;
  Branch: string; // "284 - Mirpur..."
  Mobile: string;
  AgentType: string; // "FA"
  TotalNoOfPolicy: number;
  TotalPremium: number;
}

export interface AgentTypeOption {
  AgentTypeId: number;
  AgentTypeShortFrom: string; // "FA"
}

export interface RecruitmentParams {
  AgentType: string;
  PolicyStatus: string;
  year: string;
  month: string;
  searchValue: string;
  page: string;
}

// --- FETCHERS ---
const fetchAgentTypes = async () => {
  try {
    const { data } = await apiClient.get<{
      success: string;
      data: AgentTypeOption[];
    }>("/Agent/LoadAgentType");

    if (data.success === "true" && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (error) {
    return [];
  }
};

const fetchRecruitment = async (params: RecruitmentParams) => {
  try {
    const { data } = await apiClient.post<{
      success: string;
      data: RecruitmentItem[];
    }>("/Agent/AgentNewRecruitment", params);

    if (data.success === "true" && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (error) {
    return [];
  }
};

// --- HOOKS ---
export const useAgentTypes = () => {
  return useQuery({
    queryKey: ["agent-types"],
    queryFn: fetchAgentTypes,
    staleTime: Infinity,
  });
};

export const useNewRecruitment = (initialParams: RecruitmentParams) => {
  const [params, setParams] = useState<RecruitmentParams>(initialParams);

  const queryInfo = useQuery({
    queryKey: ["agent-recruitment", params],
    queryFn: () => fetchRecruitment(params),
    placeholderData: keepPreviousData,
  });

  return { ...queryInfo, params, setParams };
};
