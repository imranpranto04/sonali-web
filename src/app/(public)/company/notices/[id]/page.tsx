import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { fetchPublicContent } from "@/lib/api/api-server-public";
import { Calendar, Download, FileText } from "lucide-react";
import { NoticeItem } from "@/components/sections/NoticeCard";

// --- SMART FETCHER (Tries BNG, then ENG) ---
async function getNoticeDetails(id: number): Promise<NoticeItem | undefined> {
  // 1. Try Bengali First (Most notices are in Bengali)
  let list = await fetchPublicContent<NoticeItem>("notice", {
    method: "POST",
    body: { lang: "bng", searchfor: "id", text: "", searchid: id },
  });

  // 2. If not found, Try English
  if (!list || list.length === 0) {
    list = await fetchPublicContent<NoticeItem>("notice", {
      method: "POST",
      body: { lang: "eng", searchfor: "id", text: "", searchid: id },
    });
  }

  return list.length > 0 ? list[0] : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await getNoticeDetails(Number(id));
  return { title: item ? `${item.title} | Notice` : "Notice Details" };
}

export default async function NoticeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = await getNoticeDetails(Number(id));

  // 404 View
  if (!notice) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <FileText className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-700">Notice Not Found</h2>
        <p className="text-slate-400">ID: {id}</p>
      </div>
    );
  }

  // Construct Image/File URL safely
  const imageUrl = notice.image
    ? `https://erp.sonalilife.com/Utilities/EventImg/${notice.image}`
    : null;

  return (
    <div className="bg-slate-100 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-8 md:p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Official Notice
              </span>
              <span className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                <Calendar className="w-4 h-4 text-orange-500" /> {notice.date}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              {notice.title}
            </h1>
          </div>

          {/* Direct Download Button */}
          {imageUrl && (
            <a href={imageUrl} target="_blank" download>
              <Button variant="outline" className="shrink-0">
                <Download className="w-4 h-4 mr-2" /> Download File
              </Button>
            </a>
          )}
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12 bg-white">
          {/* Text Details */}
          {notice.details && (
            <div className="prose prose-lg max-w-none text-slate-600 whitespace-pre-line mb-8">
              {notice.details}
            </div>
          )}

          {/* Attachment Image Viewer */}
          {imageUrl ? (
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              <Image
                src={imageUrl}
                alt="Notice Attachment"
                width={1000}
                height={1200}
                className="w-full h-auto object-contain"
                unoptimized // Crucial for ERP images
              />
            </div>
          ) : (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400">
              No image attachment available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
