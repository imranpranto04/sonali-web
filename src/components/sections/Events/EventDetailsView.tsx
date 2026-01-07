"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { useLangStore } from "@/store/lang-store";
import { usePublicContent } from "@/hooks/use-public-content";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EventItem } from "./EventCard";
import { ShareButton } from "@/components/common/ShareButton";
import { SidebarEventCard } from "./SidebarEventCard";

interface EventDetailsViewProps {
  initialEvent: EventItem;
  initialRecent: EventItem[];
  eventId: number;
}

export default function EventDetailsView({
  initialEvent,
  initialRecent,
  eventId,
}: EventDetailsViewProps) {
  const { lang } = useLangStore();

  // 1. Fetch Dynamic Data (Client-Side)
  // The hook automatically re-fetches when 'lang' changes because 'lang' is in the queryKey (in your hook definition)
  const { data: dynamicEventList, isLoading: isEventLoading } =
    usePublicContent<EventItem>("event", {
      searchfor: "id",
      text: "",
      searchid: eventId,
    });

  const { data: dynamicRecent, isLoading: isRecentLoading } =
    usePublicContent<EventItem>("event", {
      searchfor: "recent",
      text: "",
      searchid: 0,
    });

  // 2. Determine Data to Show
  // Logic:
  // - If Client Data exists (dynamicEventList), use it.
  // - If Client Data is loading or undefined, fall back to Server Data (initialEvent).
  // - This prevents the screen from going blank if English has data but Bengali doesn't.

  const event =
    dynamicEventList && dynamicEventList.length > 0
      ? dynamicEventList[0]
      : initialEvent;

  const recentEvents =
    dynamicRecent && dynamicRecent.length > 0 ? dynamicRecent : initialRecent;

  // 3. Loading Skeleton (Only during active transition)
  if (isEventLoading && !dynamicEventList) {
    return <EventDetailsSkeleton />;
  }

  // 4. Safe Image URL
  const imageUrl = event.image
    ? `https://erp.sonalilife.com/Utilities/EventImg/${event.image}`
    : "https://images.unsplash.com/photo-1540575467063-178a50c2df87";

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: Main Content */}
          <div className="lg:col-span-8">
            <Link
              href="/company/events"
              className="inline-flex items-center text-slate-500 hover:text-orange-600 mb-6 transition-colors font-bold text-xs uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {lang === "bng" ? "ইভেন্ট পেজে ফিরে যান" : "Back to Events"}
            </Link>

            <div className="bg-white rounded-4xl overflow-hidden shadow-sm border border-slate-200">
              <div className="relative h-[300px] md:h-[450px] w-full bg-slate-100">
                <Image
                  src={imageUrl}
                  alt={event.title}
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
                    className="bg-blue-50 text-blue-700 px-3 py-1 text-xs uppercase tracking-wider font-bold hover:bg-blue-100"
                  >
                    {lang === "bng" ? "খবর ও ইভেন্ট" : "News & Events"}
                  </Badge>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    {event.date}
                  </div>
                </div>

                <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-8">
                  {event.title}
                </h1>

                <div className="h-px w-full bg-slate-100 mb-8"></div>

                <div className="prose prose-lg text-slate-600 leading-loose max-w-none text-justify font-sans whitespace-pre-line">
                  {event.details}
                </div>
              </div>

              <div className="bg-slate-50 px-8 py-6 border-t border-slate-100 flex justify-between items-center">
                <p className="text-sm font-bold text-slate-500">
                  {lang === "bng" ? "শেয়ার করুন" : "Share this event"}
                </p>
                <ShareButton title={event.title} />
              </div>
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
                <Clock className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-bold text-slate-900">
                  {lang === "bng" ? "সাম্প্রতিক ইভেন্ট" : "Recent Highlights"}
                </h3>
              </div>

              <div className="flex flex-col gap-2">
                {recentEvents
                  .filter((e: EventItem) => e.serialNo !== event.serialNo)
                  .slice(0, 5)
                  .map((item: EventItem) => (
                    <SidebarEventCard key={item.serialNo} event={item} />
                  ))}

                {recentEvents.length === 0 && (
                  <p className="text-slate-400 text-sm italic p-2">
                    No recent events found.
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

function EventDetailsSkeleton() {
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
