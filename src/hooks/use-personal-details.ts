"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";
import apiClient from "@/lib/api/api-client";

// 1. Policyholder Data Shape
export interface PolicyholderDetails {
  ApplicantNameEng: string;
  ApplicantNameBang: string;
  DOB: string;
  Email: string;
  NotificationStatusFlag: number;
  PresentAddress: string;
  MobileNo: string;
  ApplicantPPName: string;
  ApplicationDate: string;
}

// 2. Agent Data Shape (Updated based on your API response)
export interface AgentDetails {
  AgentName: string;
  AgentImage: string;
  AgentFatherName: string;
  AgentMotherName: string;
  DOB: string;
  PresentAddress: string;
  Mobile: string;
  BankName: string;
  BankBranch: string;
  BankACNo: string;
  Job_Start_Date: string;
  BranchOfficeCode: string; // e.g. "Metro Head Office"
  AgentIdNo: string; // e.g. "SLICL-UM-00143638"
  jobPeriodYear: number;
  jobPeriodMonth: number;
  BankDocFileName: string;
  // Mapped/Derived fields for consistent UI usage (optional but helpful)
  ApplicantNameEng?: string; // Optional mapping to reuse components
  ApplicantPPName?: string; // Optional mapping
}

// Union type for the return data
type PersonalDetails = PolicyholderDetails | AgentDetails;

// 3. The Fetcher Function
const fetchPersonalDetails = async (role: "policyholder" | "agent") => {
  // Scenario A: Policyholder
  if (role === "policyholder") {
    const { data } = await apiClient.get<{
      success: string;
      message: string;
      data: PolicyholderDetails[];
    }>("/PolicyHolder/PersonalDetails");
    return data.data[0];
  }

  // Scenario B: Agent
  if (role === "agent") {
    // Calling the Agent Profile API
    const { data } = await apiClient.get<{
      success: string;
      message: string;
      data: AgentDetails[];
    }>("/Agent/PersonalDetails");
    return data.data[0];
  }

  return null;
};

// 4. The Hook
export const usePersonalDetails = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["personal-details", user?.role],
    queryFn: () => fetchPersonalDetails(user?.role || "policyholder"),
    enabled: !!user,
  });
};
