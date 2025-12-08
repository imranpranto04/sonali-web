import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchPublicContent } from "@/lib/api/api-server-public";
import { NewsItem } from "@/components/News/NewsCard";
import NewsDetailsView from "@/components/News/NewsDetailsView";

async function getNewsDetails(id: number): Promise<NewsItem | undefined> {
  const list = await fetchPublicContent<NewsItem>("news", {
    searchfor: "id",
    text: "",
    searchid: id,
  });
  return list.length > 0 ? list[0] : undefined;
}

async function getRecentNews(): Promise<NewsItem[]> {
  return await fetchPublicContent<NewsItem>("news", {
    searchfor: "recent",
    text: "",
    searchid: 0,
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await getNewsDetails(Number(id));
  return { title: item ? `${item.title} | Sonali Life News` : "News Details" };
}

export default async function NewsDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [news, recent] = await Promise.all([
    getNewsDetails(Number(id)),
    getRecentNews(),
  ]);

  if (!news)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-24">
        <h2 className="text-2xl font-bold text-slate-800">News not found</h2>
        <Link href="/company/news">
          <Button>Back to News</Button>
        </Link>
      </div>
    );

  return (
    <NewsDetailsView
      initialNews={news}
      initialRecent={recent}
      newsId={Number(id)}
    />
  );
}
