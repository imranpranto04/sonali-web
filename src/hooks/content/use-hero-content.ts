import { useLangStore } from "@/store/lang-store";

export const useHeroContent = () => {
  const { lang } = useLangStore();

  // 1. DYNAMIC YEAR CALCULATION
  // Sonali Life started in 2013
  const startYear = 2013;
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - startYear; // e.g., 2025 - 2013 = 12

  const HERO_CONTENT = {
    eng: {
      pill: "সোনালী জীবন সুখের জীবন",
      title: {
        line1: "Life More Relaxed",
        line2: "And Secured With",
        highlight: "Sonali Life Insurance",
      },
      description: `For over ${experienceYears} years, we've been protecting families in Bangladesh with tailored life insurance plans. Get peace of mind today.`,
      cta: "Get a Quote",
      stats: {
        exp: "Years Of Experience",
        awards: "Awards Achieved",
        customers: "Happy Customers",
      },
      // Pass the calculated number
      expNumber: `${experienceYears}+`,
    },
    bng: {
      pill: "সোনালী জীবন সুখের জীবন",
      title: {
        line1: "জীবন হোক আরও",
        line2: "নিশ্চিন্ত এবং নিরাপদ",
        highlight: "সোনালী লাইফ ইন্স্যুরেন্স এর সাথে",
      },
      description: `${experienceYears} বছরেরও বেশি সময় ধরে আমরা বাংলাদেশের পরিবারগুলোকে দিচ্ছি সর্বোচ্চ সুরক্ষা। আজই আপনার ভবিষ্যৎ নিশ্চিত করুন।`,
      cta: "কোটেশন নিন",
      stats: {
        exp: "বছরের অভিজ্ঞতা",
        awards: "টি অর্জন",
        customers: "সন্তুষ্ট গ্রাহক",
      },
      expNumber: `${experienceYears}+`,
    },
  };

  return HERO_CONTENT[lang] || HERO_CONTENT.eng;
};
