// hooks/content/use-about-content.ts
import { useLangStore } from "@/store/lang-store";

const ABOUT_CONTENT = {
  eng: {
    badge: "About Our Legacy",
    title: {
      line1: "Redefining Insurance With",
      highlight: "Trust & Technology",
    },
    description:
      "We don't just sell policies; we build promises. Sonali Life is the first fully digital insurance company in Bangladesh, ensuring complete transparency. From application to claim settlement, experience a paperless, hassle-free journey designed for the modern family.",
    features: [
      {
        title: "7-Day Claim Settlement",
        desc: "We hold the industry record for the fastest claim processing.",
      },
      {
        title: "100% Digital Ecosystem",
        desc: "Monitor your policy, premiums, and maturity value via our app.",
      },
      {
        title: "Shariah Compliant Options",
        desc: "Ethical investment packages tailored to your values.",
      },
    ],
    cta: "Discover Our Story",
    imageBadge: {
      value: "99.9%",
      label: "Claim Settlement Ratio",
    },
  },
  bng: {
    badge: "আমাদের সম্পর্কে",
    title: {
      line1: "বীমা শিল্পে আমরা আনছি",
      highlight: "আস্থা এবং প্রযুক্তির বিপ্লব",
    },
    description:
      "আমরা কেবল পলিসি বিক্রি করি না, আমরা প্রতিশ্রুতি রক্ষা করি। সোনালী লাইফ বাংলাদেশের প্রথম সম্পূর্ণ ডিজিটাল বীমা কোম্পানি। আবেদন থেকে শুরু করে বীমা দাবি পূরণ—সবকিছুই এখন স্বচ্ছ, দ্রুত এবং ঝামেলামুক্ত।",
    features: [
      {
        title: "৭ দিনে বীমা দাবি পূরণ",
        desc: "দ্রুততম সময়ে বীমা দাবি পরিশোধে আমরা ইন্ডাস্ট্রিতে রেকর্ডধারী।",
      },
      {
        title: "শতভাগ ডিজিটাল সেবা",
        desc: "আমাদের অ্যাপের মাধ্যমে পলিসি এবং প্রিমিয়ামের সব তথ্য জানুন ঘরে বসেই।",
      },
      {
        title: "শরীয়াহ ভিত্তিক বীমা",
        desc: "আপনার মূল্যবোধের সাথে সামঞ্জস্যপূর্ণ হালাল বিনিয়োগ ব্যবস্থা।",
      },
    ],
    cta: "আমাদের গল্প জানুন",
    imageBadge: {
      value: "৯৯.৯%",
      label: "বীমা দাবি পরিশোধের হার",
    },
  },
};

export const useAboutContent = () => {
  const { lang } = useLangStore();
  return ABOUT_CONTENT[lang] || ABOUT_CONTENT.eng;
};
