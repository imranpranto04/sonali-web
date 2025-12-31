// hooks/content/use-consultation-content.ts
import { useLangStore } from "@/store/lang-store";

const CONSULTATION_CONTENT = {
  eng: {
    title: {
      main: "Get Immediate",
      highlight: "Free Consultation!",
    },
    description:
      "This online plan advisor helps you choose the appropriate plan. Tell us a little about you and we will guide you to get the best plan.",
    cta: "Get Your Free Quote",
  },
  bng: {
    title: {
      main: "অবিলম্বে নিন",
      highlight: "ফ্রি পরামর্শ!",
    },
    description:
      "আমাদের অনলাইন প্ল্যান অ্যাডভাইজার আপনাকে সঠিক প্ল্যান বেছে নিতে সাহায্য করবে। আপনার সম্পর্কে আমাদের জানান এবং আমরা আপনাকে সেরা প্ল্যানটি পেতে গাইড করব।",
    cta: "ফ্রি কোটেশন নিন",
  },
};

export const useConsultationContent = () => {
  const { lang } = useLangStore();
  return CONSULTATION_CONTENT[lang] || CONSULTATION_CONTENT.eng;
};
