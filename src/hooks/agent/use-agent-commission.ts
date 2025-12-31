"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";

// --- TYPES ---
export interface CommissionDetail {
  PolicyId: number;
  InstallmentNumber: number;
  Agent: string;
  AgentTypeName: string;
  PRNumber: number;
  BankName: string;
  BankACNo: string;
  LicenseExpiryDate: string;
  BasicComAmount: number;
  SupComAmount: number;
  VatAmount: number;
  TotalPayment: number;
  ComDate: string;
  PayDate: string | null;
  BranchName: string;
  PaymentStatus: string;
}

export interface CommissionResponse {
  AgentName: string;
  TotalNetCommission: string; // API sends string "37999"
  TotalPolicies: number;
  Details: CommissionDetail[];
}

export interface CommissionParams {
  year: string;
  month: string;
  searchValue: string;
  page: string;
}

// --- FETCHER ---
const fetchCommission = async (params: CommissionParams) => {
  try {
    const { data } = await apiClient.post<{
      success: string;
      message: string;
      data: CommissionResponse;
    }>("/Agent/AgentCommission", params);

    if (data.success === "true" && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error("Commission Fetch Error:", error);
    return null;
  }
};

// --- HOOK ---
export const useAgentCommission = (initialParams: CommissionParams) => {
  const [params, setParams] = useState<CommissionParams>(initialParams);

  const queryInfo = useQuery({
    queryKey: ["agent-commission", params],
    queryFn: () => fetchCommission(params),
    placeholderData: keepPreviousData, // Keeps UI stable during page switches
  });

  return {
    ...queryInfo,
    params,
    setParams,
  };
};
