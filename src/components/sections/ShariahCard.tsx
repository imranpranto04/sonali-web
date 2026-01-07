// "use client";

// import Image from "next/image";
// import { Quote, BookOpen } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";

// // Define the shape of the Shariah API data
// export interface ShariahMessage {
//   name: string;
//   designation: string;
//   speech: string;
//   image: string;
// }

// export function ShariahCard({
//   msg,
//   index,
// }: {
//   msg: ShariahMessage;
//   index: number;
// }) {
//   // Construct Image URL (Using the Board Director path as they are board members)
//   const imageUrl = msg.image
//     ? `https://erp.sonalilife.com/Utilities/BoradDirectorImg/${msg.image}`
//     : "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000";

//   return (
//     <div
//       className={`flex flex-col ${
//         index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
//       } items-start gap-10 lg:gap-16 group mb-20 last:mb-0`}
//     >
//       {/* 1. Image Section (Green Theme) */}
//       <div className="w-full lg:w-[350px] shrink-0 relative mx-auto lg:mx-0">
//         {/* Islamic-inspired geometric background accent */}
//         <div className="absolute inset-0 bg-green-600 rounded-t-[10rem] rounded-b-4xlrotate-3 opacity-10 scale-105 transform transition-transform duration-500 group-hover:rotate-6"></div>
//         <div className="absolute inset-0 bg-emerald-500 rounded-t-[10rem] rounded-b-4xl-rotate-2 opacity-10 scale-105 transform transition-transform duration-500 group-hover:-rotate-4"></div>

//         <Card className="relative overflow-hidden rounded-t-[10rem] rounded-b-4xlborder-4 border-white shadow-2xl aspect-3/4 z-10">
//           <Image
//             src={imageUrl}
//             alt={msg.name}
//             fill
//             className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
//             unoptimized
//           />

//           {/* Overlay Name */}
//           <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-green-900/90 to-transparent text-white text-center">
//             <p className="font-bold text-lg">{msg.name}</p>
//             <p className="text-green-100 text-xs uppercase tracking-wider font-medium">
//               {msg.designation}
//             </p>
//           </div>
//         </Card>

//         {/* Floating Icon */}
//         <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white z-20">
//           <BookOpen className="w-7 h-7" />
//         </div>
//       </div>

//       {/* 2. Text Content */}
//       <div className="flex-1 space-y-6 pt-8 text-center lg:text-left">
//         <div className="space-y-2">
//           <Badge
//             variant="outline"
//             className="border-green-200 text-green-700 bg-green-50 px-4 py-1 text-xs font-bold uppercase tracking-widest mb-2 mx-auto lg:mx-0 w-fit"
//           >
//             Shariah Council
//           </Badge>

//           <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
//             {msg.name}
//           </h2>

//           <p className="text-lg font-medium text-slate-500 flex items-center justify-center lg:justify-start gap-2">
//             <span className="h-px w-8 bg-green-400 inline-block"></span>
//             {msg.designation}
//           </p>
//         </div>

//         <div className="relative">
//           <Quote className="w-12 h-12 text-green-100 absolute -top-6 -left-6 -z-10 transform -scale-x-100 hidden lg:block" />

//           <div className="prose prose-lg text-slate-600 leading-loose text-justify">
//             {msg.speech ? (
//               msg.speech.split("\r\n").map(
//                 (para, i) =>
//                   para.trim() && (
//                     <p key={i} className="mb-4">
//                       {para}
//                     </p>
//                   )
//               )
//             ) : (
//               <p className="italic text-slate-400">
//                 Message content currently unavailable.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { Quote, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// 👇 RENAME: Changed from ShariahMessage to ShariahItem to match your page import
export interface ShariahItem {
  name: string;
  designation: string;
  speech: string;
  image: string;
}

export function ShariahCard({
  msg, // This prop name in DynamicContent map might need to be 'item' or we handle it here
  index,
}: {
  msg: ShariahItem;
  index: number;
}) {
  const imageUrl = msg.image
    ? `https://erp.sonalilife.com/Utilities/BoradDirectorImg/${msg.image}`
    : "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000";

  const isEven = index % 2 === 0;

  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24 last:mb-0 relative",
        !isEven && "lg:flex-row-reverse"
      )}
    >
      {/* 1. Image Section (Islamic Arch Shape) */}
      <div className="w-full lg:w-[400px] shrink-0 relative group">
        {/* Decorative Background Pattern */}
        <div className="absolute -inset-4 bg-emerald-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* The Card Container */}
        <div className="relative">
          {/* Gold Border Offset */}
          <div className="absolute inset-0 border-2 border-amber-400/30 rounded-t-[12rem] rounded-b-[3rem] translate-x-3 translate-y-3 z-0" />

          <Card className="relative z-10 overflow-hidden rounded-t-[12rem] rounded-b-[3rem] border-0 shadow-2xl shadow-emerald-900/10 aspect-3/4 group-hover:-translate-y-2 transition-transform duration-500">
            {/* Image */}
            <Image
              src={imageUrl}
              alt={msg.name}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />

            {/* Gradient Overlay for Name visibility */}
            <div className="absolute inset-0 bg-linear-to-t from-[#064e3b] via-transparent to-transparent opacity-90" />

            {/* Name & Designation on Image (Mobile/Card view) */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <div className="w-12 h-1 bg-amber-400 mx-auto mb-4 rounded-full" />
              <h3 className="font-bold text-xl md:text-2xl leading-tight mb-1 font-serif tracking-wide">
                {msg.name}
              </h3>
              <p className="text-emerald-100 text-xs font-bold uppercase tracking-[0.2em] opacity-80">
                {msg.designation}
              </p>
            </div>
          </Card>

          {/* Floating Icon Badge */}
          <div className="absolute -top-6 -right-6 lg:-right-10 w-20 h-20 bg-white p-1.5 rounded-full shadow-xl z-20 animate-in fade-in zoom-in duration-700 delay-100">
            <div className="w-full h-full bg-emerald-600 rounded-full flex items-center justify-center text-white border-4 border-emerald-50 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/assets/bg/grid-pattern.svg')] opacity-20" />
              <BookOpen className="w-8 h-8 relative z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="flex-1 text-center lg:text-left relative">
        {/* Background Watermark (optional) */}
        <Quote className="absolute -top-10 left-0 text-emerald-50 w-32 h-32 -z-10 opacity-50 rotate-12 hidden lg:block" />

        <div className="space-y-6">
          {/* <Badge
            variant="outline"
            className="border-amber-200 bg-amber-50 text-amber-700 px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
          >
            Shariah Supervisory Board
          </Badge> */}

          <div>
            <h2 className="text-3xl md:text-4xl font-black text-brand mb-3 leading-tight">
              In the name of Allah, <br />
              <span className="text-emerald-600">The Most Gracious</span>
            </h2>
            <div className="h-1.5 w-20 bg-linear-to-r from-emerald-400 to-emerald-600 rounded-full mx-auto lg:mx-0" />
          </div>

          <div className="prose prose-lg text-slate-600 leading-loose">
            {msg.speech ? (
              msg.speech.split("\r\n").map(
                (para, i) =>
                  para.trim() && (
                    <p key={i} className="mb-4 relative">
                      {/* Subtle decorative quote for first paragraph */}
                      {i === 0 && (
                        <span className="text-4xl text-emerald-200 font-serif absolute -left-6 -top-2 leading-none">
                          “
                        </span>
                      )}
                      {para}
                    </p>
                  )
              )
            ) : (
              <p className="italic text-slate-400 flex items-center gap-2 justify-center lg:justify-start">
                Message content currently unavailable.
              </p>
            )}
          </div>

          {/* Signature / Footer */}
          <div className="pt-6 border-t border-slate-100 mt-8 flex flex-col lg:flex-row items-center gap-4">
            <div className="text-center lg:text-left">
              <p className="font-bold text-slate-900">{msg.name}</p>
              <p className="text-sm text-slate-500">{msg.designation}</p>
            </div>
            <div className="lg:ml-auto">
              {/* Decorative Islamic Star or simple dot */}
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-200" />
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div className="w-2 h-2 rounded-full bg-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
