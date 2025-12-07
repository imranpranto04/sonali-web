// "use client";

// import Image from "next/image";
// import { Quote, Award } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// export interface PublicMessage {
//   name: string;
//   designation: string;
//   speech: string;
//   image: string;
// }

// export function MessageCard({
//   msg,
//   index,
// }: {
//   msg: PublicMessage;
//   index: number;
// }) {
//   const imageUrl = msg.image
//     ? `https://erp.sonalilife.com/Utilities/BoradDirectorImg/${msg.image}`
//     : "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000";

//   const isEven = index % 2 === 0;

//   return (
//     <div
//       className={`flex flex-col ${
//         index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
//       } items-start gap-12 lg:gap-24`}
//     >
//       {/* --- 1. IMAGE SECTION (Group for Hover Effect) --- */}
//       <div className="w-full lg:w-[450px] shrink-0 relative group cursor-pointer">
//         {/* Rotated Background (Animate only on Image Hover) */}
//         <div
//           className={`absolute inset-0 rounded-[2.5rem] transform transition-transform duration-500 ${
//             index % 2 === 1
//               ? "-rotate-3 group-hover:-rotate-6"
//               : "rotate-3 group-hover:rotate-6"
//           } ${isEven ? "bg-orange-100" : "bg-amber-100"}`}
//         ></div>

//         {/* Main Image Container */}
//         <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-3/4 bg-white border-4 border-white">
//           <Image
//             src={imageUrl}
//             alt={msg.name}
//             fill
//             className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
//             unoptimized
//           />

//           {/* Gradient Overlay (Shows on Hover) */}
//           <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//           {/* Name Reveal (Hover Only) */}
//           <div className="absolute bottom-0 left-0 right-0 p-8 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hidden lg:block">
//             <p className="font-bold text-lg text-amber-400">{msg.name}</p>
//             <p
//               className={`${
//                 isEven ? "text-orange-500" : "text-white"
//               } font-medium text-xs uppercase tracking-wider`}
//             >
//               {msg.designation}
//             </p>
//           </div>
//         </div>

//         {/* Floating Quote Icon */}
//         <div
//           className={`absolute -top-6 -left-6 w-20 h-20 rounded-full flex items-center justify-center shadow-xl text-white border-4 border-white z-10 transition-transform duration-300 group-hover:scale-110 ${
//             isEven ? "bg-orange-500" : "bg-blue-600"
//           }`}
//         >
//           <Quote className="w-8 h-8 fill-current" />
//         </div>
//       </div>

//       {/* Text Content */}
//       <div className="flex-1 space-y-6 pt-4 text-center lg:text-left">
//         <div className="space-y-2">
//           <div
//             className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
//               isEven
//                 ? "bg-orange-50 text-orange-600 border-orange-100"
//                 : "bg-blue-50 text-slate-600 border-orange-100"
//             } mb-2 mx-auto lg:mx-0`}
//           >
//             <Award className="w-3 h-3" /> Leadership Message
//           </div>

//           <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
//             {msg.name}
//           </h2>

//           <p className="text-lg font-bold text-orange-500">{msg.designation}</p>
//         </div>

//         <div className="relative max-w-3xl mx-auto lg:mx-0">
//           {/* Quote Icon */}
//           <Quote
//             className={`w-12 h-12 absolute -top-6 -left-8 opacity-10 hidden lg:block ${
//               isEven ? "text-orange-500" : "text-blue-500"
//             }`}
//           />

//           <div className="prose prose-lg text-slate-600 leading-relaxed">
//             {msg.speech ? (
//               //   msg.speech.split("\r\n").map(
//               //     (para, i) =>
//               //       para.trim() && (
//               //         <p key={i} className="mb-1 last:mb-0 ">
//               //           {para}
//               //         </p>
//               //       )
//               //   )
//               <p>{msg.speech}</p>
//             ) : (
//               <p className="italic text-slate-400">
//                 Message content currently unavailable.
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Signature / Footer */}
//         <div className="pt-8 border-t border-slate-100 flex items-center gap-4 opacity-80">
//           <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-400">
//             <Award className="w-5 h-5" />
//           </div>
//           <div>
//             <p className="text-sm font-bold text-slate-900">
//               Sonali Life Insurance Company Limited
//             </p>
//             <p className="text-xs text-slate-500 font-medium">
//               Commitment to Excellence
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { Quote, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface PublicMessage {
  name: string;
  designation: string;
  speech: string;
  image: string;
}

export function MessageCard({
  msg,
  index,
}: {
  msg: PublicMessage;
  index: number;
}) {
  const imageUrl = msg.image
    ? `https://erp.sonalilife.com/Utilities/BoradDirectorImg/${msg.image}`
    : "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000";

  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col ${
        index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-start gap-12 lg:gap-24 group mb-20 last:mb-0`}
    >
      {/* Image Section with Premium Frame */}
      <div className="w-full lg:w-[400px] flex-shrink-0 relative group cursor-pointer mx-auto lg:mx-0">
        {/* Rotated Background Effect */}
        <div
          className={`absolute inset-0 rounded-[2.5rem] transform transition-transform duration-500 ${
            index % 2 === 1
              ? "-rotate-3 group-hover:-rotate-6"
              : "rotate-3 group-hover:rotate-6"
          } ${isEven ? "bg-orange-100" : "bg-blue-100"}`}
        ></div>

        <div className="relative rounded-[2.5rem] overflow-hidden shadow-lg aspect-[3/4] bg-white border-4 border-white">
          <Image
            src={imageUrl}
            alt={msg.name}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />

          {/* Clean Overlay Name (Mobile/Hover) */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white lg:hidden">
            <p className="font-bold text-lg">{msg.name}</p>
            <p className="text-white/80 font-medium text-xs uppercase tracking-wider">
              {msg.designation}
            </p>
          </div>
        </div>

        {/* Floating Icon */}
        <div
          className={`absolute -top-5 -left-5 w-16 h-16 rounded-full flex items-center justify-center shadow-xl text-white border-4 border-white z-10 ${
            isEven ? "bg-orange-500" : "bg-blue-600"
          }`}
        >
          <Quote className="w-6 h-6 fill-current" />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex-1 space-y-6 pt-4 text-center lg:text-left">
        <div className="space-y-3">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border ${
              isEven
                ? "bg-orange-50 text-orange-600 border-orange-100"
                : "bg-blue-50 text-blue-600 border-blue-100"
            } mb-2 mx-auto lg:mx-0`}
          >
            <Award className="w-3 h-3" /> Leadership Message
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {msg.name}
          </h2>

          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div
              className={`h-1 w-10 rounded-full ${
                isEven ? "bg-orange-400" : "bg-blue-500"
              }`}
            ></div>
            <p className="text-lg font-bold text-slate-500 uppercase tracking-wide">
              {msg.designation}
            </p>
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto lg:mx-0">
          <div className="prose prose-lg text-slate-600 leading-loose font-sans">
            {msg.speech ? (
              msg.speech.split("\r\n").map(
                (para, i) =>
                  para.trim() && (
                    <p key={i} className="mb-6 last:mb-0">
                      {para}
                    </p>
                  )
              )
            ) : (
              <p className="italic text-slate-400">
                Message content currently unavailable.
              </p>
            )}
          </div>
        </div>

        {/* Signature / Footer */}
        <div className="pt-8 border-t border-slate-100 flex items-center gap-4 opacity-80 justify-center lg:justify-start">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">
            Sonali Life Insurance Company Limited
          </div>
        </div>
      </div>
    </div>
  );
}
