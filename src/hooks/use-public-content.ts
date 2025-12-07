"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLangStore } from "@/store/lang-store";

// --- Types for Different Content ---

export interface PublicMessage {
  name: string;
  designation: string;
  speech: string;
  image: string;
}

export interface NoticeItem {
  serialNo: number;
  title: string;
  details: string;
  date: string;
  image: string;
}

// Add more types as needed...

export type ContentType =
  | "messages"
  | "shariah"
  | "notice"
  | "board-of-directors"
  | "management-team"
  | "products"
  | "terms-and-conditions";

// Updated Fetcher Function
const fetchContent = async (
  type: ContentType,
  lang: "eng" | "bng",
  payload?: any
) => {
  const endpoint = `https://www.sonalilife.com:1010/Api/Webdata/${type}`;

  try {
    // Merge language with any custom payload (e.g., searchfor, id)
    const body = { lang, ...payload };

    const { data } = await axios.post(endpoint, body);

    if (data.success === "true") {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    return null;
  }
};

// --- THE UNIVERSAL HOOK ---
export const usePublicContent = <T = any>(type: ContentType, payload?: any) => {
  const { lang } = useLangStore();

  return useQuery({
    // Add payload to queryKey so it refetches if payload changes
    queryKey: ["public-content", type, lang, JSON.stringify(payload)],
    queryFn: () => fetchContent(type, lang, payload),
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
};
