"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, Clock, Newspaper } from "lucide-react";
import { useLangStore } from "@/store/lang-store";
import { usePublicContent } from "@/hooks/use-public-content";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { NewsItem } from "./NewsCard";
import { ShareButton } from "@/components/common/ShareButton";
import { SidebarNewsCard } from "./SidebarNewsCard";

interface NewsDetailsViewProps {
  initialNews: NewsItem;
  initialRecent: NewsItem[];
  newsId: number;
}

export default function NewsDetailsView({
  initialNews,
  initialRecent,
  newsId,
}: NewsDetailsViewProps) {
  const { lang } = useLangStore();

  // 1. Fetch Dynamic Data (Client-Side)
  // Re-fetches automatically when 'lang' changes
  const { data: dynamicNewsList, isLoading: isNewsLoading } =
    usePublicContent<NewsItem>("news", {
      searchfor: "id",
      text: "",
      searchid: newsId,
    });

  const { data: dynamicRecent, isLoading: isRecentLoading } =
    usePublicContent<NewsItem>("news", {
      searchfor: "recent",
      text: "",
      searchid: 0,
    });

  // 2. Determine Data to Show
  // Logic: Prefer Client Data if available. Fallback to Server Data.
  const news =
    dynamicNewsList && dynamicNewsList.length > 0
      ? dynamicNewsList[0]
      : initialNews;

  const recentNews =
    dynamicRecent && dynamicRecent.length > 0 ? dynamicRecent : initialRecent;

  // 3. Loading State
  // Only show skeleton if we are waiting for new data and don't have the current data
  if (isNewsLoading && !dynamicNewsList) {
    return <NewsDetailsSkeleton />;
  }

  // 4. Safe Image URL
  const imageUrl = news.image
    ? `https://erp.sonalilife.com/Utilities/EventImg/${news.image}`
    : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000";

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: Main Content */}
          <div className="lg:col-span-8">
            <Link
              href="/company/news"
              className="inline-flex items-center text-slate-500 hover:text-orange-600 mb-6 transition-colors font-bold text-xs uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {lang === "bng" ? "নিউজ পেজে ফিরে যান" : "Back to News"}
            </Link>

            <div className="bg-white rounded-4xl overflow-hidden shadow-sm border border-slate-200">
              <div className="relative h-[300px] md:h-[450px] w-full bg-slate-100">
                <Image
                  src={imageUrl}
                  alt={news.title}
                  fill
                  className="object-contain bg-black/5"
                  unoptimized
                  priority
                />
              </div>

              <div className="p-8 md:p-12">
                <div className="flex flex-wrap gap-4 mb-6">
                  <Badge
                    variant="secondary"
                    className="bg-orange-50 text-orange-700 px-3 py-1 text-xs uppercase tracking-wider font-bold hover:bg-orange-100"
                  >
                    {lang === "bng" ? "খবর" : "Latest News"}
                  </Badge>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    {news.date}
                  </div>
                </div>

                <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-8">
                  {news.title}
                </h1>

                <div className="h-px w-full bg-slate-100 mb-8"></div>

                <div className="prose prose-lg text-slate-600 leading-loose max-w-none text-justify font-sans whitespace-pre-line">
                  {news.details}
                </div>
              </div>

              <div className="bg-slate-50 px-8 py-6 border-t border-slate-100 flex justify-between items-center">
                <p className="text-sm font-bold text-slate-500">
                  {lang === "bng" ? "শেয়ার করুন" : "Share this news"}
                </p>
                <ShareButton title={news.title} />
              </div>
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
                <Newspaper className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-bold text-slate-900">
                  {lang === "bng" ? "সাম্প্রতিক খবর" : "Recent News"}
                </h3>
              </div>

              <div className="flex flex-col gap-2">
                {recentNews
                  .filter((e) => e.serialNo !== news.serialNo)
                  .slice(0, 5)
                  .map((item) => (
                    <SidebarNewsCard key={item.serialNo} news={item} />
                  ))}

                {recentNews.length === 0 && (
                  <p className="text-slate-400 text-sm italic p-2">
                    No recent news found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-[400px] w-full rounded-4xl" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
        <div className="lg:col-span-4">
          <Skeleton className="h-96 w-full rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
