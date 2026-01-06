import { useLangStore } from "@/store/lang-store";

const CONTENT = {
  eng: {
    hero: {
      title: "Resources & Forms",
      subtitle: "Downloads",
      desc: "Access essential documents and learn why Sonali Life is the right choice for you.",
    },
    whyChoose: {
      title: "Why Choose Sonali Life Insurance?",
      subtitle: "Our Commitment to You",
      points: [
        "Our prime focus is our customers.",
        "Our fully integrated IT-based company is designed and operated solely with our customers in mind.",
        "Our life insurance policies meet the expectations of our clients: affordable, available, and understandable.",
        "We have knowledgeable, friendly staff that can empathize with our customer’s needs.",
        "We make sure that we can provide our customers with what they need.",
        "We are knowledgeable about all of the products and services that we offer.",
        "We offer transparency and accountability in all that we do.",
        "Our policies and endorsements are delivered on time.",
        "We believe personal contact and service is the keystone of our success.",
        "We ensure the highest quality of service by serving our best.",
      ],
    },
    downloads: {
      title: "Downloadable Forms",
      desc: "Browse and download official forms and applications.",
      btnPdf: "Download PDF",
      btnLink: "Apply Online",
      empty: "No forms currently available.",
    },
  },
  bng: {
    hero: {
      title: "রিসোর্স এবং ফর্ম",
      subtitle: "ডাউনলোড",
      desc: "প্রয়োজনীয় নথিপত্র এবং জানুন কেন সোনালী লাইফ আপনার জন্য সঠিক পছন্দ।",
    },
    whyChoose: {
      title: "সোনালী লাইফ ইন্স্যুরেন্স কোম্পানি লিঃ কেন বেছে নিবেন?",
      subtitle: "আপনার প্রতি আমাদের অঙ্গীকার",
      points: [
        "আমাদের প্রধান ফোকাস আমাদের গ্রাহকগণ।",
        "আমাদের সম্পূর্ণ ইন্টিগ্রেটেড তথ্য প্রযুক্তি ভিত্তিক প্রতিষ্ঠানটি কেবলমাত্র আমাদের গ্রাহকদের কথা মাথায় রেখে ডিজাইন করা।",
        "আমাদের জীবন বীমা নীতিগুলি গ্রাহকদের প্রত্যাশা পূরণ করে: সাশ্রয়ী, সহজলভ্য এবং বোধগম্য।",
        "আমাদের রয়েছে মেধাবী ও বন্ধুত্বপূর্ণ কর্মী যারা গ্রাহকদের প্রয়োজনের প্রতি সহানুভূতিশীল।",
        "আমরা নিশ্চিত করি যে আমরা আমাদের গ্রাহকদের প্রয়োজনীয় সেবা প্রদান করতে পারি।",
        "আমরা আমাদের সকল পণ্য এবং পরিষেবা সম্পর্কে সম্পূর্ণ জ্ঞাত।",
        "আমরা আমাদের সকল কাজে স্বচ্ছতা এবং জবাবদিহিতা নিশ্চিত করি।",
        "আমাদের পলিসি এবং এনডোর্সমেন্ট সময়মতো প্রদান করা হয়।",
        "আমরা বিশ্বাস করি ব্যক্তিগত যোগাযোগ এবং পরিষেবাই আমাদের সাফল্যের চাবিকাঠি।",
        "আমরা আমাদের সর্বোচ্চ সেবার মাধ্যমে শ্রেষ্ঠত্ব নিশ্চিত করি।",
      ],
    },
    downloads: {
      title: "প্রয়োজনীয় ফর্মসমূহ",
      desc: "অফিসিয়াল ফর্ম এবং আবেদনপত্র ডাউনলোড করুন।",
      btnPdf: "ডাউনলোড পিডিএফ",
      btnLink: "অনলাইন আবেদন",
      empty: "বর্তমানে কোন ফর্ম নেই।",
    },
  },
};

export const useDownFormsContent = () => {
  const { lang } = useLangStore();
  return CONTENT[lang] || CONTENT.eng;
};
