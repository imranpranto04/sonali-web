import { FileText, Download, ArrowUpRight } from "lucide-react";

const getFileUrl = (path: string) => {
  if (!path) return "#";
  if (path.startsWith("http")) return path;
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `https://sonalilife.com/${cleanPath}`;
};

export default function DocumentCard({
  doc,
}: {
  doc: { title: string; fileName: string };
}) {
  const url = getFileUrl(doc.fileName);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 hover:border-slate-200 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
    >
      {/* Hover Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-600 group-hover:border-amber-100 transition-colors">
          <FileText className="w-6 h-6" />
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all transform group-hover:rotate-45">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      <div className="flex-1">
        <h4
          className="text-sm font-bold text-slate-800 group-hover:text-slate-900 leading-relaxed line-clamp-2"
          title={doc.title}
        >
          {doc.title}
        </h4>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded-md">
          PDF Document
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
          Download <Download className="w-3 h-3" />
        </span>
      </div>
    </a>
  );
}

// import { FileText, Download, ArrowUpRight } from "lucide-react";

// const getFileUrl = (path: string) => {
//   if (!path) return "#";
//   if (path.startsWith("http")) return path;
//   const cleanPath = path.startsWith("/") ? path.substring(1) : path;
//   return `https://sonalilife.com/${cleanPath}`;
// };

// export default function DocumentCard({
//   doc,
// }: {
//   doc: { title: string; fileName: string };
// }) {
//   const url = getFileUrl(doc.fileName);

//   return (
//     <a
//       href={url}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] hover:border-amber-200/50 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
//     >
//       {/* Premium Hover Gradient Line */}
//       <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

//       <div className="flex items-start justify-between mb-4 pl-2">
//         {/* Icon with soft background */}
//         <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
//           <FileText className="w-6 h-6" />
//         </div>

//         <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all transform group-hover:rotate-45">
//           <ArrowUpRight className="w-4 h-4" />
//         </div>
//       </div>

//       <div className="flex-1 pl-2">
//         <h4
//           className="text-base font-bold text-slate-800 group-hover:text-amber-700 leading-snug line-clamp-2 transition-colors"
//           title={doc.title}
//         >
//           {doc.title}
//         </h4>
//       </div>

//       <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between pl-2">
//         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded-md">
//           PDF
//         </span>
//         <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 group-hover:text-amber-600 transition-colors">
//           Download <Download className="w-3.5 h-3.5" />
//         </span>
//       </div>
//     </a>
//   );
// }
