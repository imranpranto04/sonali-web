"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { EventItem } from "./EventCard";

export function SidebarEventCard({ event }: { event: EventItem }) {
  const imageUrl = event.image
    ? `https://erp.sonalilife.com/Utilities/EventImg/${event.image}`
    : "https://images.unsplash.com/photo-1540575467063-178a50c2df87";

  return (
    <Link
      href={`/company/events/${event.serialNo}`}
      className="group block mb-4"
    >
      <div className="flex gap-4 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
        <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-200">
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-slate-700 line-clamp-2 group-hover:text-orange-600 transition-colors mb-2">
            {event.title}
          </h4>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            <Calendar className="w-3 h-3" /> {event.date}
          </div>
        </div>
      </div>
    </Link>
  );
}
