"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";

// --- TYPES ---
export interface DuePolicyItem {
  ApplicantID: number;
  FPRId: number;
  TotalInstallmentsPaid: number;
  NoOfIns: number;
  DueAmount: number;
  NextPremiumDueDate: string;
  BranchCode: number;
  BranchOfficeCode: string;
  ApplicantNameEng: string;
  MobileNo: string;
  YearType: number;
  PresentAddress: string;
  InstallmentTypeName: string;
  FA: string;
  UM: string;
  BM: string;
}

export interface DuePolicyResponse {
  TotalPolicies: number;
  TotalDueAmount: string;
  Details: DuePolicyItem[];
}

export interface DuePolicyParams {
  DateFrom: string;
  DateTo: string;
  Type: string;
  searchValue: string;
  page: string;
}

// --- FETCHER ---
const fetchDuePolicies = async (params: DuePolicyParams) => {
  if (!params.DateFrom || !params.DateTo) return null;

  try {
    const { data } = await apiClient.post<{
      success: string;
      message: string;
      data: DuePolicyResponse;
    }>("/Agent/AgentDuePolicies", params);

    if (data.success === "true" && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error("Due Policy API Error:", error);
    return null;
  }
};

// --- HOOK ---
export const useDuePolicies = (params: DuePolicyParams) => {
  return useQuery({
    queryKey: ["agent-due-policies", params],
    queryFn: () => fetchDuePolicies(params),
    enabled: !!params.DateFrom && !!params.DateTo,
    retry: 1, // Stop infinite retries on error
    placeholderData: undefined, // Force skeleton on new fetch
  });
};
