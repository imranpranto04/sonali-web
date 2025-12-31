// import { Metadata } from "next";
// import { Newspaper, Clock, ArrowRight } from "lucide-react";
// import { fetchPublicContent } from "@/lib/api/api-server-public";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { NewsItem } from "@/components/News/NewsCard";
// import DynamicContent from "@/components/common/DynamicContent";

// export const metadata: Metadata = {
//   title: "Latest News | Sonali Life Insurance",
//   description: "Stay informed with the latest updates and announcements.",
// };

// export default async function NewsPage() {
//   // 1. Fetch Server Data (English) with correct payload
//   const initialData = await fetchPublicContent<NewsItem>("news", {
//     body: {
//       lang: "bng",
//       searchfor: "recent",
//       text: "",
//       searchid: 0, // FIX 2: Rename 'id' to 'searchid'
//     },
//   });

//   return (
//     <div className="bg-slate-50 min-h-screen pb-20">
//       {/* Hero Section */}
//       <section className="bg-slate-900 text-white pt-24 pb-16 relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
//         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/30 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/4 pointer-events-none"></div>

//         <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
//           <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-4 backdrop-blur-md border border-white/10">
//             <Newspaper className="w-8 h-8 text-orange-400" />
//           </div>
//           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
//             Latest News
//           </h1>
//           <p className="text-slate-400 text-lg leading-relaxed">
//             Updates, press releases, and announcements.
//           </p>
//         </div>
//       </section>

//       <div className="container mx-auto px-4 pt-16">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//           {/* LEFT COLUMN: Main Grid (8 cols) */}
//           <div className="lg:col-span-8">
//             {/* Main News Grid */}
//             <DynamicContent<NewsItem>
//               apiType="news"
//               initialData={initialData}
//               renderAs="news"
//               payload={{
//                 lang: "bng", // <--- Don't forget to update client payload too
//                 searchfor: "recent",
//                 text: "",
//                 searchid: 0,
//               }}
//             />
//           </div>

//           {/* RIGHT COLUMN: Sidebar (4 cols) */}
//           <div className="lg:col-span-4 space-y-8">
//             {/* Recent News Widget */}
//             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
//               <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
//                 <Clock className="w-5 h-5 text-orange-500" />
//                 <h3 className="text-lg font-bold text-slate-900">
//                   Recent Updates
//                 </h3>
//               </div>

//               {/* Sidebar List (Dynamic Language) */}
//               <DynamicContent<NewsItem>
//                 apiType="news"
//                 // We pass a sliced version for initial server load,
//                 // but client fetch will get full list (React Query handles caching)
//                 initialData={initialData.slice(0, 5)}
//                 renderAs="sidebar-news" // Uses the SidebarNewsCard we registered
//                 payload={{
//                   searchfor: "recent",
//                   text: "",
//                   id: 0,
//                 }}
//               />

//               <Button
//                 variant="outline"
//                 className="w-full mt-6 text-xs font-bold uppercase tracking-wider"
//               >
//                 View Archive <ArrowRight className="w-3 h-3 ml-2" />
//               </Button>
//             </div>

//             {/* Media Contact Card */}
//             {/* <Card className="bg-slate-900 text-white border-none shadow-xl relative overflow-hidden hidden lg:block">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
//               <CardContent className="p-8 relative z-10 text-center">
//                 <h4 className="text-lg font-bold mb-2">Press Inquiries?</h4>
//                 <p className="text-slate-400 text-sm mb-6">
//                   Contact our corporate communication team for media kits.
//                 </p>
//                 <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold">
//                   Contact PR Team
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
import { Newspaper } from "lucide-react";
import { fetchPublicContent } from "@/lib/api/api-server-public";
import { NewsItem } from "@/components/News/NewsCard";
import NewsListView from "@/components/News/NewsListView"; // Import the new component

export const metadata: Metadata = {
  title: "Latest News | Sonali Life Insurance",
  description: "Stay informed with the latest updates and announcements.",
};

export default async function NewsPage() {
  // 1. Fetch Server Data (English Default)
  // This ensures Google SEO sees English content
  const initialData = await fetchPublicContent<NewsItem>("news", {
    method: "POST",
    body: {
      lang: "eng", // FORCE ENGLISH HERE
      searchfor: "recent",
      text: "",
      searchid: 0, // Correct Parameter
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
            <Newspaper className="w-8 h-8 text-orange-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Latest News
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Updates, press releases, and announcements.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-16">
        {/* 2. Render the Client View */}
        <NewsListView initialNews={initialData} />
      </div>
    </div>
  );
}
