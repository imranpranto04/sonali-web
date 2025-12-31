"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";
import { toast } from "sonner";

// --- TYPES ---

export interface ForwardingSummaryItem {
  Id: number;
  ForwardingNo: string;
  TotalAmount: number;
  TotalNoOfPolicy: number;
  StatusFlag: string; // "Created" | "Cancel" | "Paid"
  CreateDate: string;
  Comments: string | null;
}

export interface ForwardingDetailItem {
  Id: number;
  RefType: string;
  RefNo: number;
  PolicyHolderName: string;
  Amount: number;
  StatusFlag: string;
  PaymentCount: number;
  TotalAmount: number;
}

export interface ForwardingParams {
  StartDate: string;
  EndDate: string;
}

// --- FETCHERS ---

// 1. Summary API
const fetchSummary = async (params: ForwardingParams) => {
  if (!params.StartDate || !params.EndDate) return [];
  try {
    const { data } = await apiClient.post<{
      success: string;
      data: ForwardingSummaryItem[];
    }>("/Agent/ForwardingSummary", params);
    return data.success === "true" ? data.data : [];
  } catch (error) {
    console.error("Summary API Error:", error);
    return [];
  }
};

// 2. Details API
const fetchDetails = async (forwardingId: number | null) => {
  if (!forwardingId) return [];
  try {
    const { data } = await apiClient.post<{
      success: string;
      data: ForwardingDetailItem[];
    }>("/Agent/ForwardingLoadDetails", { ForwardingId: forwardingId });
    return data.success === "true" ? data.data : [];
  } catch (error) {
    console.error("Details API Error:", error);
    return [];
  }
};

// 3. Cancel API
const cancelForwarding = async (id: number) => {
  const { data } = await apiClient.post<{ success: string; message: string }>(
    "/Agent/ForwardingCancel",
    { Id: id }
  );
  if (data.success !== "true") throw new Error(data.message || "Cancel failed");
  return data;
};

// --- HOOKS ---

export const useForwardingSummary = (params: ForwardingParams) => {
  return useQuery({
    queryKey: ["forwarding-summary", params],
    queryFn: () => fetchSummary(params),
    enabled: !!params.StartDate && !!params.EndDate,
    placeholderData: undefined, // Ensures skeleton shows on new fetch
  });
};

export const useForwardingDetails = (id: number | null) => {
  return useQuery({
    queryKey: ["forwarding-details", id],
    queryFn: () => fetchDetails(id),
    enabled: !!id,
  });
};

export const useForwardingActions = () => {
  const queryClient = useQueryClient();

  const cancelMutation = useMutation({
    mutationFn: cancelForwarding,
    onSuccess: () => {
      toast.success("Forwarding cancelled successfully");
      queryClient.invalidateQueries({ queryKey: ["forwarding-summary"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to cancel forwarding");
    },
  });

  return { cancelMutation };
};
