"use client";

import { NewsItem, NewsCard } from "@/components/News/NewsCard";
import { usePublicContent } from "@/hooks/use-public-content";
// import { NewsSidebarItem } from "@/components/News/NewsSidebarItem";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  initialNews: NewsItem[];
}

export default function NewsListView({ initialNews }: Props) {
  // 1. Client-Side Fetch (Listens to Language Store)
  const { data: newsList } = usePublicContent<NewsItem>("news", {
    searchfor: "recent",
    text: "",
    searchid: 0, // Correct Parameter
  });

  // 2. Merge Data (Prefer Client Data, Fallback to Server Data)
  const data = newsList || initialNews;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* LEFT COLUMN: Main Grid (8 cols) */}
      <div className="lg:col-span-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((item: NewsItem) => (
            <div key={item.serialNo} className="h-full">
              <NewsCard msg={item} />
            </div>
          ))}
        </div>

        {data.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400">No news found.</p>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Sidebar (4 cols) */}
      <div className="lg:col-span-4 space-y-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
            <Clock className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-bold text-slate-900">Recent Updates</h3>
          </div>

          <div className="space-y-4">
            {data.slice(0, 5).map((item: NewsItem) => (
              // Simple Sidebar Item Design
              <div
                key={item.serialNo}
                className="pb-4 border-b border-slate-50 last:border-0 last:pb-0"
              >
                <Link
                  href={`/company/news/${item.serialNo}`}
                  className="group block"
                >
                  <h4 className="text-sm font-bold text-slate-700 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <span className="text-xs text-slate-400 mt-1 block">
                    {item.date}
                  </span>
                </Link>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full mt-6 text-xs font-bold uppercase tracking-wider"
          >
            View Archive <ArrowRight className="w-3 h-3 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
