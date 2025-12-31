"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLangStore } from "@/store/lang-store";

export interface MenuItem {
  label: string;
  href: string;
  listinfo?: MenuItem[] | null;
  children?: MenuItem[];
  type?: string;
}

// Robust Normalizer
const normalizeMenu = (items: any[]): MenuItem[] => {
  return items.map((item) => {
    // 1. Safe HREF: Default to '#' if missing
    let href = item.href || "#";
    // Ensure internal links start with '/'
    if (!href.startsWith("http") && !href.startsWith("/") && href !== "#") {
      href = `/${href}`;
    }

    // 2. Map 'listinfo' to 'children'
    // Handle null/undefined listinfo safely
    const children =
      item.listinfo && Array.isArray(item.listinfo)
        ? normalizeMenu(item.listinfo)
        : undefined;

    return {
      label: item.label,
      href,
      children,
      type: item.type,
    };
  });
};

const fetchMenu = async (lang: "eng" | "bng") => {
  try {
    const url = `https://www.sonalilife.com:1010/api/Webdata/menudata/${lang}`;
    const { data } = await axios.get(url);

    // DEBUG: See exactly what API returns
    // console.log("API Raw:", data);

    // Handle stringified JSON (common issue)
    let parsedData = data;
    if (typeof data === "string") {
      try {
        parsedData = JSON.parse(data);
      } catch (e) {
        console.error("JSON Parse Error", e);
        return [];
      }
    }

    // Handle Direct Array
    if (Array.isArray(parsedData)) {
      return normalizeMenu(parsedData);
    }

    // Handle Wrapper { data: [...] }
    if (parsedData && Array.isArray(parsedData.data)) {
      return normalizeMenu(parsedData.data);
    }

    return [];
  } catch (error) {
    console.error("Menu fetch failed:", error);
    return [];
  }
};

export const useMenu = () => {
  const { lang } = useLangStore();

  return useQuery({
    queryKey: ["menu", lang],
    queryFn: () => fetchMenu(lang),
    staleTime: 1000 * 60 * 60,
    // initialData: [],
  });
};
