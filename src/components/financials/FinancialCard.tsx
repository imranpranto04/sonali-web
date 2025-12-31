// import { FileText, Download, Calendar } from "lucide-react";

// export interface FinancialReport {
//   // We use lowercase to match standard JS, but we'll map API data to this safely
//   id: string | number;
//   title: string;
//   year: string;
//   publish_date: string;
//   file_url: string;
// }

// export function FinancialCard({ data }: { data: FinancialReport }) {
//   return (
//     <div className="group bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row items-start md:items-center gap-6 transition-all hover:shadow-lg hover:border-orange-200">
//       {/* Icon */}
//       <div className="hidden md:flex shrink-0 w-16 h-16 bg-slate-50 rounded-xl items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
//         <FileText className="w-8 h-8" />
//       </div>

//       {/* Content */}
//       <div className="flex-1 w-full">
//         <div className="flex items-center gap-3 mb-2">
//           <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200 uppercase tracking-wider">
//             {data.year}
//           </span>
//           {data.publish_date && (
//             <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
//               <Calendar className="w-3 h-3" />
//               <span>{data.publish_date}</span>
//             </div>
//           )}
//         </div>
//         <h3 className="text-xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors leading-tight">
//           {data.title}
//         </h3>
//       </div>

//       {/* Button */}
//       <div className="mt-4 md:mt-0 w-full md:w-auto">
//         <a
//           href={data.file_url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-orange-500 transition-all shadow-md hover:shadow-orange-200"
//         >
//           <Download className="w-4 h-4" />
//           <span>Download PDF</span>
//         </a>
//       </div>
//     </div>
//   );
// }
