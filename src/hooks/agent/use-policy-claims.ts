"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";

export interface ClaimItem {
  ClaimId: number;
  ClaimType: string;
  ClaimIdNoChar: string;
  PolicyNo: number;
  PolicyHolderName: string;
  BranchName: string;
  AgentName: string;
  CreateDate: string;
  Flag: string;
  Comments: string;
}

export interface PolicyClaimResponse {
  TotalClaimes: number;
  Details: ClaimItem[];
}

export interface PolicyClaimParams {
  DateFrom: string;
  DateTo: string;
  searchValue: string;
  page: string;
}

const fetchPolicyClaims = async (params: PolicyClaimParams) => {
  if (!params.DateFrom || !params.DateTo) return null;

  try {
    const { data } = await apiClient.post<{
      success: string;
      message: string;
      data: PolicyClaimResponse;
    }>("/Agent/AgentPolicyClaims", params);

    if (data.success === "true" && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error("Policy Claims API Error:", error);
    return null;
  }
};

export const usePolicyClaims = (params: PolicyClaimParams) => {
  return useQuery({
    queryKey: ["agent-policy-claims", params],
    queryFn: () => fetchPolicyClaims(params),
    enabled: !!params.DateFrom && !!params.DateTo,
    retry: 1,
    // CRITICAL: This ensures data disappears and Skeleton shows immediately when params change
    placeholderData: undefined,
  });
};
