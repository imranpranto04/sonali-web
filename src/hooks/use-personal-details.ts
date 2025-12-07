"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";
import { useAuthStore } from "@/store/auth-store";

// 1. Define the Shape of Policyholder Data (Based on your JSON)
export interface PolicyholderDetails {
  ApplicantNameEng: string;
  ApplicantNameBang: string;
  DOB: string;
  Email: string;
  NotificationStatusFlag: number;
  PresentAddress: string;
  MobileNo: string;
  ApplicantPPName: string; // Image URL
  ApplicationDate: string;
}

// 2. Define the Shape of Agent Data (Placeholder for future)
export interface AgentDetails {
  AgentName: string;
  AgentCode: string;
  Designation: string;
  // ... add other fields later
}

// 3. The Fetcher Function
const fetchPersonalDetails = async (role: "policyholder" | "agent") => {
  // Scenario A: Policyholder
  if (role === "policyholder") {
    const { data } = await apiClient.get<{
      success: string;
      message: string;
      data: PolicyholderDetails[];
    }>("/PolicyHolder/PersonalDetails");
    // API returns an array, we usually want the first item for the profile
    return data.data[0];
  }

  // Scenario B: Agent (Future Implementation)
  if (role === "agent") {
    // const { data } = await apiClient.get<AgentDetails>('/Agent/PersonalDetails');
    // return data;
    return null;
  }

  return null;
};

// 4. The Hook
export const usePersonalDetails = () => {
  const { user } = useAuthStore(); // Get the current user's role

  return useQuery({
    queryKey: ["personal-details", user?.role], // Unique key depends on role
    queryFn: () => fetchPersonalDetails(user?.role || "policyholder"), // Fetch based on role
    enabled: !!user, // Only run if user is logged in
  });
};
