// import { Metadata } from "next";
// import Image from "next/image";
// import Link from "next/link";
// import { Calendar, ArrowLeft, Share2, Clock } from "lucide-react";
// import { fetchPublicContent } from "@/lib/api/api-server-public";

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { EventItem } from "@/components/sections/Events/EventCard";
// import { SidebarEventCard } from "@/components/sections/Events/SidebarEventCard";
// import { ShareButton } from "@/components/common/ShareButton";

// // --- Data Fetchers ---

// // 1. Fetch specific event by ID
// async function getEventDetails(id: number): Promise<EventItem | undefined> {
//   const events = await fetchPublicContent<EventItem>("event", {
//     searchfor: "id",
//     text: "",
//     searchid: id,
//   });
//   return events.length > 0 ? events[0] : undefined;
// }

// // 2. Fetch recent events for Sidebar
// async function getRecentEvents(): Promise<EventItem[]> {
//   return await fetchPublicContent<EventItem>("event", {
//     searchfor: "recent",
//     text: "",
//     searchid: 0,
//   });
// }

// // 3. SEO Metadata (Fixed for Next.js 15)
// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }): Promise<Metadata> {
//   const { id } = await params;
//   const event = await getEventDetails(Number(id));
//   return {
//     title: event ? `${event.title} | Sonali Life` : "Event Details",
//   };
// }

// // --- Main Page Component ---
// export default async function EventDetailsPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const eventId = Number(id);

//   // Fetch current event AND recent list in parallel
//   const [event, recentEvents] = await Promise.all([
//     getEventDetails(eventId),
//     getRecentEvents(),
//   ]);

//   if (!event)
//     return (
//       <div className="min-h-[60vh] flex flex-col items-center justify-center pt-24">
//         <h2 className="text-2xl font-bold text-slate-800">Event not found</h2>
//         <p className="text-slate-500 mb-6">
//           The event you are looking for might have been removed.
//         </p>
//         <Link href="/company/events">
//           <Button>Back to Events</Button>
//         </Link>
//       </div>
//     );

//   const imageUrl = event.image
//     ? `https://erp.sonalilife.com/Utilities/EventImg/${event.image}`
//     : "https://images.unsplash.com/photo-1540575467063-178a50c2df87";

//   return (
//     <div className="bg-slate-50 min-h-screen pb-20 pt-24">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//           {/* --- LEFT COLUMN: Main Content (8 cols) --- */}
//           <div className="lg:col-span-8">
//             {/* Back Link */}
//             <Link
//               href="/company/events"
//               className="inline-flex items-center text-slate-500 hover:text-orange-600 mb-6 transition-colors font-bold text-xs uppercase tracking-wider"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
//             </Link>

//             {/* Main Card */}
//             <div className="bg-white rounded-4xl overflow-hidden shadow-sm border border-slate-200">
//               {/* Hero Image */}
//               <div className="relative h-[300px] md:h-[450px] w-full bg-slate-100">
//                 <Image
//                   src={imageUrl}
//                   alt={event.title}
//                   fill
//                   className="object-contain bg-black/5"
//                   unoptimized
//                   priority
//                 />
//               </div>

//               <div className="p-8 md:p-12">
//                 {/* Meta Tags */}
//                 <div className="flex flex-wrap gap-4 mb-6">
//                   <Badge
//                     variant="secondary"
//                     className="bg-blue-50 text-blue-700 px-3 py-1 text-xs uppercase tracking-wider font-bold hover:bg-blue-100"
//                   >
//                     News & Events
//                   </Badge>
//                   <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
//                     <Calendar className="w-4 h-4 text-orange-500" />{" "}
//                     {event.date}
//                   </div>
//                 </div>

//                 {/* Title */}
//                 <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-8">
//                   {event.title}
//                 </h1>

//                 <div className="h-px w-full bg-slate-100 mb-8"></div>

//                 {/* Description Body */}
//                 <div className="prose prose-lg text-slate-600 leading-loose max-w-none text-justify">
//                   {event.details.split("\n").map(
//                     (para, i) =>
//                       para.trim() && (
//                         <p key={i} className="mb-4">
//                           {para}
//                         </p>
//                       )
//                   )}
//                 </div>
//               </div>

//               {/* Footer Actions */}
//               <div className="bg-slate-50 px-8 py-6 border-t border-slate-100 flex justify-between items-center">
//                 <p className="text-sm font-bold text-slate-500">
//                   Share this event
//                 </p>
//                 {/* <Button
//                   variant="outline"
//                   size="sm"
//                   className="gap-2 bg-white hover:text-blue-600 hover:border-blue-200"
//                 >
//                   <Share2 className="w-4 h-4" /> Share Link
//                 </Button> */}
//                 <ShareButton />
//               </div>
//             </div>
//           </div>

//           {/* --- RIGHT COLUMN: Sidebar (4 cols) --- */}
//           <div className="lg:col-span-4 space-y-8">
//             {/* Recent Widget */}
//             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
//               <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
//                 <Clock className="w-5 h-5 text-orange-500" />
//                 <h3 className="text-lg font-bold text-slate-900">
//                   Recent Highlights
//                 </h3>
//               </div>

//               <div className="flex flex-col gap-2">
//                 {recentEvents
//                   .filter((e) => e.serialNo !== event.serialNo) // Don't show current event in sidebar
//                   .slice(0, 5) // Show top 5
//                   .map((item) => (
//                     <SidebarEventCard key={item.serialNo} event={item} />
//                   ))}

//                 {recentEvents.length === 0 && (
//                   <p className="text-slate-400 text-sm italic">
//                     No other recent events.
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Contact Card */}
//             {/* <Card className="bg-slate-900 text-white border-none shadow-xl relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
//               <CardContent className="p-8 relative z-10 text-center">
//                 <h4 className="text-lg font-bold mb-2">Media Inquiries?</h4>
//                 <p className="text-slate-400 text-sm mb-6">
//                   Contact our corporate communication team.
//                 </p>
//                 <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold">
//                   Contact Us
//                 </Button>
//               </CardContent>
//             </Card> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchPublicContent } from "@/lib/api/api-server-public";
import { EventItem } from "@/components/sections/Events/EventCard";
import EventDetailsView from "@/components/sections/Events/EventDetailsView";

// --- Data Fetchers (Server Side) ---

async function getEventDetails(id: number): Promise<EventItem | undefined> {
  const events = await fetchPublicContent<EventItem>("event", {
    searchfor: "id",
    text: "",
    searchid: id,
  });
  return events.length > 0 ? events[0] : undefined;
}

async function getRecentEvents(): Promise<EventItem[]> {
  return await fetchPublicContent<EventItem>("event", {
    searchfor: "recent",
    text: "",
    searchid: 0,
  });
}

// --- SEO Metadata ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = await getEventDetails(Number(id));
  return {
    title: event ? `${event.title} | Sonali Life` : "Event Details",
    description: event ? event.details.substring(0, 160) : "Event details",
  };
}

// --- Main Page Component ---
export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const eventId = Number(id);

  // Fetch initial data in parallel
  const [event, recentEvents] = await Promise.all([
    getEventDetails(eventId),
    getRecentEvents(),
  ]);

  // Handle 404 Case
  if (!event)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-24">
        <h2 className="text-2xl font-bold text-slate-800">Event not found</h2>
        <p className="text-slate-500 mb-6">
          The event you are looking for might have been removed.
        </p>
        <Link href="/company/events">
          <Button>Back to Events</Button>
        </Link>
      </div>
    );

  // Pass data to the Client Component for display & language switching
  return (
    <EventDetailsView
      initialEvent={event}
      initialRecent={recentEvents}
      eventId={eventId}
    />
  );
}
