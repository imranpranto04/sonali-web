import { useLangStore } from "@/store/lang-store";

const CONTENT = {
  eng: {
    badge: "Premium Calculator",
    title: {
      line1: "Plan your future",
      line2: "financial goals",
    },
    description:
      "Use our smart calculator to estimate your premium. Tailored to your life stage and needs.",
    stats: {
      policies: "Active Policies",
      claimRatio: "Claim Ratio",
    },
  },
  bng: {
    badge: "প্রিমিয়াম ক্যালকুলেটর",
    title: {
      line1: "পরিকল্পনা করুন আপনার",
      line2: "ভবিষ্যৎ লক্ষ্যগুলোর",
    },
    description:
      "আমাদের স্মার্ট ক্যালকুলেটর ব্যবহার করে আপনার প্রিমিয়াম হিসাব করুন। আপনার জীবনের প্রয়োজন অনুযায়ী সাজানো।",
    stats: {
      policies: "সক্রিয় পলিসি",
      claimRatio: "দাবি পূরণ অনুপাত",
    },
  },
};

export const useCalculatorLandingContent = () => {
  const { lang } = useLangStore();
  return CONTENT[lang] || CONTENT.eng;
};
