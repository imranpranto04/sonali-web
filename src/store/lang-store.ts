import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LangState {
  lang: "eng" | "bng";
  setLang: (lang: "eng" | "bng") => void;
}

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: "eng", // Default to English
      setLang: (lang) => set({ lang }),
    }),
    { name: "sonali-lang-pref" }
  )
);
