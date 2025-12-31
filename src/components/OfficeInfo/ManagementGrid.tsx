"use client";

import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ManagementMember } from "@/lib/api/company-service";

export default function ManagementGrid({ team }: { team: ManagementMember[] }) {
  if (!team || team.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400">
        <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Management team information is currently updating.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {team.map((member, index) => (
        <ManagementCard key={index} member={member} />
      ))}
    </div>
  );
}

// --- INDIVIDUAL CARD COMPONENT ---
function ManagementCard({ member }: { member: ManagementMember }) {
  return (
    <div className="group flex flex-col items-center text-center">
      {/* 1. Image Frame (Premium Portrait Look) */}
      <div className="relative w-full aspect-4/5 max-w-[320px] mb-6 rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 bg-slate-100 border border-slate-100 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-orange-500/10 group-hover:-translate-y-2">
        {/* Gradient Overlay (Only visible on hover for depth) */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            unoptimized={true} // Direct ERP Load
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            // object-top is CRITICAL for portraits so heads don't get cut off
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50">
            <User className="w-20 h-20 mb-2" />
            <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
              No Image
            </span>
          </div>
        )}
      </div>

      {/* 2. Info Section */}
      <div className="w-full max-w-[320px] relative">
        {/* Decorative Line */}
        <div className="w-12 h-1 bg-orange-500 mx-auto mb-4 rounded-full" />

        {/* <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors">
          {member.name}
        </h3>

        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide leading-relaxed px-2">
          {member.designation}
        </p> */}
        {/* Name: Simple, Bold, Dark. turns Orange on hover */}
        <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-orange-600 transition-colors duration-300">
          {member.name}
        </h3>

        {/* Designation: Small, clean gray text. */}
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mt-1.5 leading-relaxed border-l-2 border-transparent pl-0 transition-all duration-300 group-hover:border-orange-500 group-hover:pl-3">
          {member.designation}
        </p>
      </div>
    </div>
  );
}

// "use client";

// import Image from "next/image";
// import { User } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { ManagementMember } from "@/lib/api/company-service";

// export default function ManagementGrid({ team }: { team: ManagementMember[] }) {
//   if (!team || team.length === 0) return null;

//   return (
//     // CHANGE: grid-cols-4 makes items smaller and more compact on large screens
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
//       {team.map((member, index) => (
//         <ManagementCard key={index} member={member} />
//       ))}
//     </div>
//   );
// }

// function ManagementCard({ member }: { member: ManagementMember }) {
//   return (
//     <div className="group flex flex-col items-start">
//       {/* --- 1. COMPACT IMAGE FRAME --- */}
//       {/* Clean, sharp rounded corners (rounded-xl). No heavy shadows. */}
//       <div className="relative w-full aspect-3/4 overflow-hidden rounded-xl bg-slate-100 border border-slate-200/60 mb-4">
//         {/* Hover Overlay: Darkens slightly at bottom to make text pop if we overlayed it (optional, but adds depth) */}
//         <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5 z-10" />

//         {member.image ? (
//           <Image
//             src={member.image}
//             alt={member.name}
//             fill
//             unoptimized={true}
//             // EFFECT: Slow, subtle zoom. No grayscale. Keeps it authentic.
//             className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
//           />
//         ) : (
//           <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
//             <User className="w-12 h-12 mb-2 opacity-50" />
//             <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
//               No Image
//             </span>
//           </div>
//         )}
//       </div>

//       {/* --- 2. MINIMALIST TEXT INFO --- */}
//       <div className="w-full">
//         {/* Name: Simple, Bold, Dark. turns Orange on hover */}
//         <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-orange-600 transition-colors duration-300">
//           {member.name}
//         </h3>

//         {/* Designation: Small, clean gray text. */}
//         <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-1.5 leading-relaxed border-l-2 border-transparent pl-0 transition-all duration-300 group-hover:border-orange-500 group-hover:pl-3">
//           {member.designation}
//         </p>
//       </div>
//     </div>
//   );
// }
