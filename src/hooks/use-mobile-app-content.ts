import { useLangStore } from "@/store/lang-store";

const CONTENT = {
  eng: {
    badge: "Mobile App",
    title: {
      line1: "Insurance at your",
      line2: "fingertips.",
    },
    description:
      "Manage your policy, pay premiums, and file claims directly from your smartphone. Experience the power of Sonali Life in your pocket.",
    features: ["Fast Claims", "Secure Payments", "Policy Tracking"],
    buttons: {
      google: { sub: "Get it on", main: "Google Play" },
      apple: { sub: "Download on", main: "App Store" },
    },
  },
  bng: {
    badge: "মোবাইল অ্যাপ",
    title: {
      line1: "বীমা সেবা এখন",
      line2: "আপনার হাতের মুঠোয়।",
    },
    description:
      "আপনার পলিসি পরিচালনা, প্রিমিয়াম প্রদান এবং বীমা দাবি পেশ করুন সরাসরি স্মার্টফোন থেকে। সোনালী লাইফ অ্যাপটি আজই ডাউনলোড করুন।",
    features: ["দ্রুত দাবি পূরণ", "নিরাপদ পেমেন্ট", "পলিসি ট্র্যাকিং"],
    buttons: {
      google: { sub: "ডাউনলোড করুন", main: "Google Play" },
      apple: { sub: "ডাউনলোড করুন", main: "App Store" },
    },
  },
};

export const useMobileAppContent = () => {
  const { lang } = useLangStore();
  return CONTENT[lang] || CONTENT.eng;
};
