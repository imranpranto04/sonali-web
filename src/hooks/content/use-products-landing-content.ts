import { useLangStore } from "@/store/lang-store";

const CONTENT = {
  eng: {
    title: {
      main: "Secure Your Future with",
      highlight: "Our Plans",
    },
    description:
      "Choose from our range of tailored insurance products designed to support you at every stage of life.",
    cta: "See All Products",
  },
  bng: {
    title: {
      main: "ভবিষ্যৎ সুরক্ষিত করুন",
      highlight: "আমাদের প্ল্যান দিয়ে",
    },
    description:
      "জীবনের প্রতিটি ধাপে আপনাকে সহযোগিতা করার জন্য আমাদের বিশেষ বীমা পরিকল্পনাগুলো থেকে বেছে নিন।",
    cta: "সব পণ্য দেখুন",
  },
};

export const useProductsLandingContent = () => {
  const { lang } = useLangStore();
  return CONTENT[lang] || CONTENT.eng;
};
