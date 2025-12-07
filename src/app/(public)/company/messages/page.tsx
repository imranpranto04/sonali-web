// "use client";

// import Image from "next/image";
// import { Quote, Award } from "lucide-react";
// import { usePublicContent, PublicMessage } from "@/hooks/use-public-content";
// import { Card } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Badge } from "@/components/ui/badge";
// import { MessageCard } from "@/components/sections/about/MessageCard";

// export default function MessagesPage() {
//   const { data: messages, isLoading } =
//     usePublicContent<PublicMessage[]>("messages");

//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-24 space-y-32">
//         {[1, 2].map((i) => (
//           <div
//             key={i}
//             className="flex flex-col md:flex-row gap-16 animate-pulse"
//           >
//             <Skeleton className="w-full md:w-[450px] h-[600px] rounded-[3rem]" />
//             <div className="w-full flex-1 space-y-6 pt-10">
//               <Skeleton className="h-16 w-3/4" />
//               <Skeleton className="h-6 w-1/3" />
//               <Skeleton className="h-96 w-full mt-8" />
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="bg-slate-50 min-h-screen">
//       {/* Hero Section (Restored & Enhanced) */}
//       <section className="relative bg-slate-900 text-white py-24 md:py-32 overflow-hidden">
//         {/* Dynamic Orange Glows */}
//         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-600/20 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
//         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/30 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/4 pointer-events-none"></div>

//         <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
//           <div className="inline-block px-6 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-md text-xs font-bold text-orange-300 uppercase tracking-[0.2em] mb-8">
//             Visionary Leadership
//           </div>
//           <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
//             Guiding the Future of <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-200 to-amber-200">
//               Insurance in Bangladesh
//             </span>
//           </h1>
//           <p className="text-slate-400 text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto font-light">
//             Words of wisdom and unwavering commitment from the leaders who steer
//             Sonali Life towards excellence.
//           </p>
//         </div>
//       </section>

//       {/* Messages Content */}
//       <section className="py-24 md:py-32 container mx-auto px-4 space-y-40">
//         {messages && messages.length > 0 ? (
//           messages.map((msg, index) => (
//             <MessageCard key={index} msg={msg} index={index} />
//           ))
//         ) : (
//           <div className="text-center py-32">
//             <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-6 flex items-center justify-center">
//               <Award className="w-10 h-10 text-slate-400" />
//             </div>
//             <h3 className="text-xl font-bold text-slate-600">
//               No messages found
//             </h3>
//             <p className="text-slate-400">Please check back later.</p>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

import { Metadata } from "next";
import { Award } from "lucide-react";
import { PublicMessage } from "@/components/company/MessageCard";
import DynamicContent from "@/components/common/DynamicContent";

// Server Fetcher (English Default)
async function getInitialMessages(): Promise<PublicMessage[]> {
  try {
    const res = await fetch(
      "https://www.sonalilife.com:1010/Api/Webdata/messages",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang: "eng" }),
        next: { revalidate: 3600 },
      }
    );
    const data = await res.json();
    return data.success === "true" ? data.data : [];
  } catch (error) {
    console.error("Failed to fetch initial messages:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Leadership Messages | Sonali Life Insurance",
  description:
    "Read inspiring messages from our Chairperson and CEO about the vision and commitment of Sonali Life Insurance.",
};

export default async function MessagesPage() {
  const initialMessages = await getInitialMessages();

  return (
    // <div className="bg-slate-50 min-h-screen pb-20">
    //   {/* Hero Section */}
    //   <section className="relative bg-slate-900 text-white py-24 md:py-32 overflow-hidden">
    //     <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-600/20 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
    //     <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/30 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/4 pointer-events-none"></div>

    //     <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
    //       <div className="inline-block px-6 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-md text-xs font-bold text-orange-300 uppercase tracking-[0.2em] mb-8">
    //         Visionary Leadership
    //       </div>
    //       <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
    //         Guiding the Future of <br />
    //         <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-orange-200 to-amber-200">
    //           Insurance in Bangladesh
    //         </span>
    //       </h1>
    //       <p className="text-slate-400 text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto font-light">
    //         Words of wisdom and unwavering commitment from the leaders who steer
    //         Sonali Life towards excellence.
    //       </p>
    //     </div>
    //   </section>

    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Premium Dark Hero */}
      <section className="relative bg-slate-900 border-b border-slate-800 py-20 overflow-hidden">
        {/* Ambient Lighting Effects */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-50%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-50%] right-[-10%] w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px]"></div>
          {/* Subtle Texture Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-bold text-orange-300 uppercase tracking-[0.25em] mb-6 shadow-lg">
            Visionary Leadership
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Guiding our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-200">
              Future
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto">
            Words of wisdom and unwavering commitment from the leaders who steer
            Sonali Life towards excellence.
          </p>
        </div>
      </section>

      {/* Dynamic Content Section */}
      <section className="pt-16 container mx-auto px-4">
        <DynamicContent<PublicMessage>
          apiType="messages"
          initialData={initialMessages}
        />
      </section>
    </div>
  );
}
