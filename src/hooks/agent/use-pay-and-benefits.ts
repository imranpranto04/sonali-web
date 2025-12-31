"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";

// --- TYPES ---
export interface PayDetailItem {
  AgentID: number;
  Type: string;
  RefNo: number;
  TermsofYear: number;
  TotalPremiumAmount: number;
  BasicComAmount?: number;
  SupComAmount?: number;
  VatAmout?: number;
  NetCom?: number;
  Remarks: string;
  Status: string;
  Date: string;
}

export interface PayComponentItem {
  AgentId: number | null;
  AgentName: string;
  AgentBranch: string;
  JoinDate: string;
  AgentType: string;
  ComponentName: string;
  TotalBusiness: number;
  GrossAmount: number;
  TDS: number;
  NetPay: number;
  PaidDate: string | null;
  details: PayDetailItem[];
}

export interface PayParams {
  Year: string;
  Month: string;
}

const fetchPayAndBenefits = async (params: PayParams) => {
  try {
    const { data } = await apiClient.post<{
      success: string;
      message: string;
      data: PayComponentItem[];
    }>("/Agent/PayAndBenefits", params);

    if (data.success === "true" && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const usePayAndBenefits = (params: PayParams) => {
  return useQuery({
    // The hook listens to 'params'. If 'params' changes, it refetches.
    queryKey: ["agent-pay-benefits", params],
    queryFn: () => fetchPayAndBenefits(params),
    enabled: !!params.Year && !!params.Month,
    retry: 1,
    placeholderData: undefined, // CRITICAL: Forces skeleton on new fetch
  });
};
