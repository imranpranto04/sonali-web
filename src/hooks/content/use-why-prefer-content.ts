import { useLangStore } from "@/store/lang-store";

const CONTENT = {
  eng: {
    title: {
      main: "Why Prefer",
      highlight: "Sonali Life?",
    },
    quote:
      "Whatever life holds, we are here to help you live it with confidence.",
    features: [
      {
        title: "Keeping your Data Safe",
        desc: "We use state-of-the-art encryption to ensure your personal and financial information remains private and secure.",
      },
      {
        title: "Award Winning Service",
        desc: "Recognized nationally for excellence in claim settlement ratio and customer satisfaction.",
      },
      {
        title: "Customer First Approach",
        desc: "Dedicated support agents available 24/7 to assist you with policy queries and claims.",
      },
    ],
  },
  bng: {
    title: {
      main: "কেন বেছে নেবেন",
      highlight: "সোনালী লাইফ?",
    },
    quote: "জীবনের যেকোনো পরিস্থিতিতে, আমরা আছি আপনার পাশে আত্মবিশ্বাসের সাথে।",
    features: [
      {
        title: "তথ্য সুরক্ষা ও নিরাপত্তা",
        desc: "আপনার ব্যক্তিগত ও আর্থিক তথ্যের গোপনীয়তা রক্ষায় আমরা ব্যবহার করি সর্বাধুনিক এনক্রিপশন প্রযুক্তি।",
      },
      {
        title: "পুরস্কারপ্রাপ্ত সেবা",
        desc: "বীমা দাবি পূরণ এবং গ্রাহক সন্তুষ্টিতে জাতীয়ভাবে স্বীকৃত শ্রেষ্ঠত্বের জন্য আমরা গর্বিত।",
      },
      {
        title: "গ্রাহক সেবাই প্রথম",
        desc: "পলিসি সংক্রান্ত যেকোনো প্রশ্ন বা দাবির জন্য আমাদের প্রতিনিধিরা আছেন ২৪/৭ আপনার পাশে।",
      },
    ],
  },
};

export const useWhyPreferContent = () => {
  const { lang } = useLangStore();
  return CONTENT[lang] || CONTENT.eng;
};
