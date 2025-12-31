"use client";

import Link from "next/link";
import { FileText, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface NoticeItem {
  serialNo: number;
  title: string;
  details: string;
  date: string;
  image: string;
}

export function NoticeCard({ msg }: { msg: NoticeItem }) {
  // FIX: Link to our internal Details Page, NOT the ERP file directly.
  // This allows the Details Page to handle the "Smart Fetch" (Eng -> Bng fallback)
  const detailsUrl = `/company/notices/${msg.serialNo}`;

  return (
    <Card className="hover:shadow-md transition-shadow border-slate-200 group overflow-hidden mb-4">
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
            {/* Use Next.js Link for internal routing to the details page */}
            <Link
              href={detailsUrl}
              target="_blank" // Opens in new tab
              rel="noopener noreferrer" // Security best practice
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-xs font-bold border-orange-200 text-orange-600 hover:text-white hover:bg-orange-600"
              >
                {/* Changed Icon to ExternalLink to signify opening a new view */}
                <ExternalLink className="w-3.5 h-3.5" /> View Notice
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
