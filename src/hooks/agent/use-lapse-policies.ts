"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";

// --- TYPES ---
export interface LapsePolicyItem {
  AgentId: number;
  FPRId: string;
  MobileNo: string;
  ProductsId: number;
  TermOfYear: number;
  InstallmentTypeName: string;
  TotalNumberOfInstallments: number;
  TotalInstallmentsPaid: number;
  TotalPremium: number;
  SupplementaryPremium: number;
  CommencementDate: string;
  LastPaymentDate: string;
  DueDate: string;
  LapseDate: string;
  BranchId: number;
  BranchName: string;

  // Hierarchy
  FAID: number;
  FAName: string;
  UMID: number;
  UMName: string;
  BMID: number;
  BMName: string;
}

export interface LapsePolicyResponse {
  TotalPolicies: number;
  TotalPremiumAmount: string;
  TotalSupplementaryPremium: string;
  Details: LapsePolicyItem[];
}

export interface LapsePolicyParams {
  DateFrom: string;
  DateTo: string;
  Type: string;
  searchValue: string;
  page: string;
}

// --- FETCHER ---
const fetchLapsePolicies = async (params: LapsePolicyParams) => {
  if (!params.DateFrom || !params.DateTo) return null;

  try {
    const { data } = await apiClient.post<{
      success: string;
      message: string;
      data: LapsePolicyResponse;
    }>("/Agent/AgentLapsePolicies", params);

    if (data.success === "true" && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error("Lapse Policy API Error:", error);
    return null;
  }
};

// --- HOOK ---
export const useLapsePolicies = (params: LapsePolicyParams) => {
  return useQuery({
    queryKey: ["agent-lapse-policies", params],
    queryFn: () => fetchLapsePolicies(params),
    enabled: !!params.DateFrom && !!params.DateTo,
    retry: 1, // Fix: Stop infinite loading on error
    placeholderData: undefined, // Fix: Force skeleton on new fetch
  });
};
