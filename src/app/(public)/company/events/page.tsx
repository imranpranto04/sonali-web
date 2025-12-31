// import { Metadata } from "next";
// import { CalendarDays, Clock, ArrowRight } from "lucide-react";
// import { fetchPublicContent } from "@/lib/api/api-server-public";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { EventItem } from "@/components/sections/Events/EventCard";
// import DynamicContent from "@/components/common/DynamicContent";

// export const metadata: Metadata = {
//   title: "Events & News | Sonali Life Insurance",
//   description:
//     "Stay updated with our latest events, conferences, and community activities.",
// };

// export default async function EventsPage() {
//   // 1. Fetch initial English data (Server Side)
//   const events = await fetchPublicContent<EventItem>("event", {
//     searchfor: "recent",
//     text: "",
//     searchid: 0,
//   });

//   return (
//     <div className="bg-slate-50 min-h-screen pb-20">
//       {/* Hero Section */}
//       <section className="bg-slate-900 text-white pt-24 pb-16 relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
//         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/30 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/4 pointer-events-none"></div>

//         <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
//           <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-4 backdrop-blur-md border border-white/10">
//             <CalendarDays className="w-8 h-8 text-orange-400" />
//           </div>
//           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
//             Events & Activities
//           </h1>
//           <p className="text-slate-400 text-lg leading-relaxed">
//             Celebrating our milestones and community engagements across
//             Bangladesh.
//           </p>
//         </div>
//       </section>

//       <div className="container mx-auto px-4 pt-16">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//           {/* LEFT COLUMN: Main Grid (8 cols) */}
//           <div className="lg:col-span-8">
//             {/* Main News Grid - Handles Language Switching */}
//             <DynamicContent<EventItem>
//               apiType="event"
//               initialData={events}
//               // Default renderAs is 'event' which uses EventCard
//               payload={{
//                 searchfor: "recent",
//                 text: "",
//                 searchid: 0,
//               }}
//             />
//           </div>

//           {/* RIGHT COLUMN: Sidebar (4 cols) */}
//           <div className="lg:col-span-4 space-y-8">
//             {/* Recent Widget */}
//             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
//               <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
//                 <Clock className="w-5 h-5 text-orange-500" />
//                 <h3 className="text-lg font-bold text-slate-900">
//                   Recent Highlights
//                 </h3>
//               </div>

//               {/* Sidebar List (Now Dynamic!) */}
//               <DynamicContent<EventItem>
//                 apiType="event"
//                 // Pass sliced data for initial render
//                 initialData={events.slice(0, 5)}
//                 renderAs="sidebar-event" // Use the sidebar card variant
//                 payload={{
//                   searchfor: "recent",
//                   text: "",
//                   searchid: 0,
//                 }}
//               />

//               <Button
//                 variant="outline"
//                 className="w-full mt-6 text-xs font-bold uppercase tracking-wider"
//               >
//                 View Archive <ArrowRight className="w-3 h-3 ml-2" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Metadata } from "next";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import { fetchPublicContent } from "@/lib/api/api-server-public";
import { Button } from "@/components/ui/button";
import { EventItem } from "@/components/sections/Events/EventCard";
import DynamicContent from "@/components/common/DynamicContent";

export const metadata: Metadata = {
  title: "Events & News | Sonali Life Insurance",
  description:
    "Stay updated with our latest events, conferences, and community activities.",
};

export default async function EventsPage() {
  // 1. Fetch initial English data (Server Side)
  // FIX: Parameters must be inside 'body'
  const events = await fetchPublicContent<EventItem>("event", {
    method: "POST",
    body: {
      lang: "eng",
      searchfor: "recent",
      text: "",
      searchid: 0,
    },
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/30 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/4 pointer-events-none"></div>

        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-4 backdrop-blur-md border border-white/10">
            <CalendarDays className="w-8 h-8 text-orange-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Events & Activities
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Celebrating our milestones and community engagements across
            Bangladesh.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN: Main Grid (8 cols) */}
          <div className="lg:col-span-8">
            <DynamicContent<EventItem>
              apiType="event"
              initialData={events}
              payload={{
                searchfor: "recent",
                text: "",
                searchid: 0,
              }}
            />
          </div>

          {/* RIGHT COLUMN: Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
                <Clock className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-bold text-slate-900">
                  Recent Highlights
                </h3>
              </div>

              <DynamicContent<EventItem>
                apiType="event"
                initialData={events.slice(0, 5)}
                renderAs="sidebar-event"
                payload={{
                  searchfor: "recent",
                  text: "",
                  searchid: 0,
                }}
              />

              <Button
                variant="outline"
                className="w-full mt-6 text-xs font-bold uppercase tracking-wider"
              >
                View Archive <ArrowRight className="w-3 h-3 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
