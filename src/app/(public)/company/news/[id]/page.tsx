import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchPublicContent } from "@/lib/api/api-server-public";
import { NewsItem } from "@/components/News/NewsCard";
import NewsDetailsView from "@/components/News/NewsDetailsView";
import { ArrowLeft } from "lucide-react";

// --- SMART FETCHER (Prevents 404s) ---
async function getSmartNewsDetails(id: number): Promise<NewsItem | undefined> {
  // 1. Try English First
  let list = await fetchPublicContent<NewsItem>("news", {
    method: "POST",
    body: { lang: "eng", searchfor: "id", text: "", searchid: id },
  });

  // 2. If not found, Try Bengali
  if (!list || list.length === 0) {
    list = await fetchPublicContent<NewsItem>("news", {
      method: "POST",
      body: { lang: "bng", searchfor: "id", text: "", searchid: id },
    });
  }

  return list.length > 0 ? list[0] : undefined;
}

async function getRecentNews(): Promise<NewsItem[]> {
  return await fetchPublicContent<NewsItem>("news", {
    method: "POST",
    body: { lang: "eng", searchfor: "recent", text: "", searchid: 0 },
  });
}

// --- Metadata ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await getSmartNewsDetails(Number(id));
  return {
    title: item ? `${item.title} | Sonali Life News` : "News Details",
    description: item ? item.details.substring(0, 160) : "Latest news updates.",
  };
}

// --- Main Page ---
export default async function NewsDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const newsId = Number(id);

  const [news, recent] = await Promise.all([
    getSmartNewsDetails(newsId),
    getRecentNews(),
  ]);

  if (!news)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-24 bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800">News not found</h2>
        <p className="text-slate-500 mb-6">
          The article you are looking for does not exist.
        </p>
        <Link href="/company/news">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
          </Button>
        </Link>
      </div>
    );

  return (
    <NewsDetailsView
      initialNews={news}
      initialRecent={recent}
      newsId={newsId}
    />
  );
}
