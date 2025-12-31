// hooks/content/use-calculator-intro-content.ts
import { useLangStore } from "@/store/lang-store";

const INTRO_CONTENT = {
  eng: {
    title: "Calculate your financial future",
    description:
      "Curious about your returns? See how a small monthly deposit can grow into a secure future for your family.",
    features: {
      tax: "Tax Rebate",
      return: "High Return",
      cost: "Low Cost",
    },
    cta: "Start Calculation",
    note: "Takes less than 30 seconds",
  },
  bng: {
    title: "ভবিষ্যৎ পরিকল্পনা করুন",
    description:
      "আপনার বিনিয়োগের রিটার্ন জানতে চান? দেখুন কিভাবে ছোট মাসিক সঞ্চয় আপনার পরিবারের জন্য একটি নিরাপদ ভবিষ্যৎ গড়ে তুলতে পারে।",
    features: {
      tax: "কর রেয়াত সুবিধা",
      return: "উচ্চ মুনাফা",
      cost: "স্বল্প খরচ",
    },
    cta: "হিসাব শুরু করুন",
    note: "৩০ সেকেন্ডেরও কম সময় লাগে",
  },
};

export const useCalculatorIntroContent = () => {
  const { lang } = useLangStore();
  return INTRO_CONTENT[lang] || INTRO_CONTENT.eng;
};
