"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface NewsItem {
  serialNo: number;
  title: string;
  details: string;
  date: string;
  image: string;
}

export function NewsCard({ msg }: { msg: NewsItem }) {
  const imageUrl = msg.image
    ? `https://erp.sonalilife.com/Utilities/EventImg/${msg.image}` // Assuming similar path, change if needed
    : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000";

  const [day, month, year] = msg.date.split(" ");

  return (
    <Link href={`/company/news/${msg.serialNo}`} className="block h-full group">
      <Card className="overflow-hidden border-none shadow-md hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl h-full flex flex-col cursor-pointer">
        <div className="relative h-60 overflow-hidden bg-slate-50">
          <Image
            src={imageUrl}
            alt={msg.title}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-xl p-2 text-center min-w-[60px] shadow-sm">
            <span className="block text-xs font-bold text-orange-600 uppercase">
              {month}
            </span>
            <span className="block text-2xl font-extrabold text-slate-900 leading-none">
              {day}
            </span>
            <span className="block text-[10px] font-bold text-slate-500">
              {year}
            </span>
          </div>
        </div>
        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="mb-3">
            <Badge
              variant="secondary"
              className="bg-orange-50 text-orange-600 mb-2 font-bold border-orange-100"
            >
              Latest News
            </Badge>
            <h3 className="text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
              {msg.title}
            </h3>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-5 flex-1">
            {msg.details}
          </p>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Calendar className="w-4 h-4 text-orange-500" /> {msg.date}
            </div>
            <span className="text-sm font-bold text-orange-600 flex items-center gap-1">
              Read More{" "}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
