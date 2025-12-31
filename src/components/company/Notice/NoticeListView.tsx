"use client";

import Link from "next/link";
import { usePublicContent } from "@/hooks/use-public-content";
import { FileText, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface NoticeItem {
  serialNo: number;
  title: string;
  details: string;
  date: string;
  image: string;
}

export default function NoticeListView({
  initialData,
}: {
  initialData: NoticeItem[];
}) {
  const { data: liveData } = usePublicContent<NoticeItem>("notice", {
    searchfor: "recent",
    text: "",
    searchid: 0,
  });

  const data = liveData || initialData;

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400">No notices found.</div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((notice) => (
        <div
          key={notice.serialNo}
          className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-4"
        >
          {/* Icon */}
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h3 className="font-bold text-slate-800 text-lg">{notice.title}</h3>
            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
              <Calendar className="w-4 h-4 text-orange-400" /> {notice.date}
            </div>
          </div>

          {/* ACTION: OPEN IN NEW TAB */}
          <Link
            href={`/company/notice/${notice.serialNo}`}
            target="_blank" // <--- MAGIC KEY: Opens new tab
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-slate-200 text-slate-600 hover:text-orange-600 hover:border-orange-200"
            >
              <ExternalLink className="w-4 h-4 mr-2" /> View Notice
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
