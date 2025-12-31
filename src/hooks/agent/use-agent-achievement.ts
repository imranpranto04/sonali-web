"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";

export interface AchievementItem {
  SL: string;
  Month: string;
  Target: string;
  Achieved: string;
  Percentage: string;
}

const fetchAchievement = async (year: string) => {
  if (!year) return [];

  try {
    const { data } = await apiClient.post<{
      success: string;
      message: string;
      data: AchievementItem[];
    }>("/Agent/AgentAchievement", { year });

    if (data.success === "true" && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error("Achievement API Error:", error);
    throw error;
  }
};

export const useAgentAchievement = (year: string) => {
  return useQuery({
    queryKey: ["agent-achievement", year],
    queryFn: () => fetchAchievement(year),
    enabled: !!year,
    retry: 1,

    // --- PERFORMANCE FIX ---
    // Cache data for 5 minutes.
    // If you switch years and come back, it will load INSTANTLY.
    staleTime: 1000 * 60 * 5,
  });
};
