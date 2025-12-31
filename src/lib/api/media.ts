import { fetchPublicContent } from "./api-server-public";

// Define the shape of the News/Event items
export type MediaItem = {
  id: number;
  title: string;
  date: string;
  image?: string;
  description?: string;
  // add other fields your API returns
};

// 1. GET NEWS (Bengali, Recent)
export const getNews = async (): Promise<MediaItem[]> => {
  return await fetchPublicContent<MediaItem>("news", {
    method: "POST",
    body: {
      lang: "bng", // News is in Bengali
      searchfor: "recent",
      text: "",
      searchid: 0,
    },
  });
};

// 2. GET EVENTS (English, Recent)
export const getEvents = async (): Promise<MediaItem[]> => {
  return await fetchPublicContent<MediaItem>("event", {
    method: "POST",
    body: {
      lang: "eng", // Events are in English
      searchfor: "recent",
      text: "",
      searchid: 0,
    },
  });
};

// 3. GET NOTICES (Bengali, Recent)
export const getNotices = async (): Promise<MediaItem[]> => {
  return await fetchPublicContent<MediaItem>("notice", {
    method: "POST",
    body: {
      lang: "bng", // Notices are in Bengali
      searchfor: "recent",
      text: "",
      searchid: 0,
    },
  });
};
