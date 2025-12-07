import { Metadata } from "next";
import { Bell } from "lucide-react";
import { fetchPublicContent } from "@/lib/api/api-server-public";
import { NoticeItem } from "@/components/sections/NoticeCard";
import DynamicContent from "@/components/common/DynamicContent";

export const metadata: Metadata = {
  title: "Notice Board | Sonali Life Insurance",
  description: "Latest updates, AGMs, and official notices.",
};

export default async function NoticePage() {
  // 1. Fetch Initial English Data (Server Side)
  const initialData = await fetchPublicContent<NoticeItem>("notice", {
    searchfor: "recent",
    text: "",
    id: 0,
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 pt-24 pb-12">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center justify-center p-3 bg-orange-100 text-orange-600 rounded-2xl mb-4">
            <Bell className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Notice Board
          </h1>
          <p className="text-slate-500 text-lg">
            Stay updated with the latest announcements and official notices.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pt-12 container mx-auto px-4 max-w-4xl">
        <DynamicContent<NoticeItem>
          apiType="notice"
          initialData={initialData}
          // 2. Pass Payload for Client-Side Bengali Fetch
          payload={{
            searchfor: "recent",
            text: "",
            id: 0,
          }}
        />
      </section>
    </div>
  );
}
