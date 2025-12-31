"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";

// --- TYPES ---
export interface MaturityItem {
  PolicyNumber: string; // "135928-Falgun Sarkar (Samir)"
  Product: string; // "3 - Plan Name..."
  CommencementDate: string;
  TermOfYear: number;
  InstallmentType: string;
  SumAssured: number;
  TotalPremiumPaid: number;
  TotalPolicyAmount: number;
  InstallmentNumber: number;
  Branch: string;
  MaturityDate: string;
  FA: string;
  SAMD: string;
  BM: string;
  LapseStatus: string;
  flag: string; // "Not Matured", "Matured"
  MaturityCategory: string; // "SB Maturity", etc.
  TotalInsPaid: number;
  SettledBy: string | null;
}

export interface MaturityParams {
  DateFrom: string;
  DateTo: string;
  searchValue: string;
  page: string;
}

// --- FETCHER ---
const fetchPolicyMaturity = async (params: MaturityParams) => {
  if (!params.DateFrom || !params.DateTo) return [];

  try {
    const { data } = await apiClient.post<{
      success: string;
      message: string;
      data: MaturityItem[];
    }>("/Agent/AgentPolicyMaturity", params);

    if (data.success === "true" && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error("Maturity API Error:", error);
    return [];
  }
};

// --- HOOK ---
export const usePolicyMaturity = (params: MaturityParams) => {
  return useQuery({
    queryKey: ["agent-policy-maturity", params],
    queryFn: () => fetchPolicyMaturity(params),
    enabled: !!params.DateFrom && !!params.DateTo,
    retry: 1,
    placeholderData: undefined, // Force skeleton on new fetch
  });
};
