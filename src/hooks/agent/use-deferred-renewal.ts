"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";

// --- TYPES ---

export interface DeferredSummaryItem {
  Agent: string;
  TotalNoPolicies: number;
  SumAssured: number;
  TotalPremiumReceived: number;
  TotalVat: number; // Display as AIT
  TotalNetCommission: number;
  NetRetention: number;
  LapsePolicy: number;
  LapseAmount: number;
  ExpectedRenewal: number;
  ExpectedRenewalAmt: number;
  RenewalAmt: number; // Percentage
  OverallRenewalAmt: number; // Percentage
  AgentName: string;
  Type: string;
}

export interface LapseDetailItem {
  FPRId: string; // Policy No & Name
  MobileNo: string;
  ProductsId: number; // Plan ID
  TermOfYear: number;
  InstallmentTypeName: string;
  TotalNumberOfInstallments: number;
  TotalInstallmentsPaid: number;
  TotalPremium: number;
  SupplementaryPremium: number;
  LastPaymentDate: string;
  LapseDate: string;
  FAUMBM: string;
}

export interface DeferredParams {
  DateFrom: string;
  DateTo: string;
}

export interface LapseParams extends DeferredParams {
  ReportType: string;
}

// --- FETCHERS ---

const fetchSummary = async (params: DeferredParams) => {
  if (!params.DateFrom || !params.DateTo) return [];
  try {
    const { data } = await apiClient.post<{
      success: string;
      data: DeferredSummaryItem[];
    }>("/Agent/DeferredandRenewalPercentage", params);
    return data.success === "true" && Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    return [];
  }
};

const fetchLapseDetails = async (params: LapseParams) => {
  if (!params.ReportType) return [];
  try {
    const { data } = await apiClient.post<{
      success: string;
      data: LapseDetailItem[];
    }>("/Agent/DeferredandRenewalPercentageLapse", params);
    return data.success === "true" && Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    return [];
  }
};

// --- HOOKS ---

export const useDeferredSummary = (params: DeferredParams) => {
  return useQuery({
    queryKey: ["deferred-summary", params],
    queryFn: () => fetchSummary(params),
    placeholderData: keepPreviousData,
    enabled: !!params.DateFrom && !!params.DateTo,
  });
};

export const useLapseDetails = (params: LapseParams) => {
  return useQuery({
    queryKey: ["deferred-lapse", params],
    queryFn: () => fetchLapseDetails(params),
    enabled: !!params.ReportType,
  });
};
