"use client";

import { FileText, Calendar, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface NoticeItem {
  serialNo: number;
  title: string;
  details: string;
  date: string;
  image: string; // Often a PDF link or image
}

export function NoticeCard({ msg, index }: { msg: NoticeItem; index: number }) {
  // Construct full URL for the file/image
  const fileUrl = msg.image
    ? `https://erp.sonalilife.com/Utilities/EventImg/${msg.image}`
    : "#";

  return (
    <Card className="hover:shadow-md transition-shadow border-slate-200 group overflow-hidden">
      <CardContent className="p-0 flex flex-col md:flex-row">
        {/* Date Box */}
        <div className="bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100 p-6 flex flex-col items-center justify-center min-w-[120px] text-center">
          <Calendar className="w-6 h-6 text-orange-500 mb-2" />
          <p className="font-bold text-slate-700 text-sm">{msg.date}</p>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col justify-center">
          <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
            {msg.title}
          </h3>
          {msg.details && (
            <p className="text-slate-500 text-sm mb-4 line-clamp-2">
              {msg.details}
            </p>
          )}

          <div className="mt-auto pt-2">
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-xs font-bold border-orange-200 text-orange-600 hover:text-orange-600 hover:bg-orange-100"
              >
                <Download className="w-3.5 h-3.5" /> Download / View
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
