// "use client";

// import { useLangStore } from "@/store/lang-store";
// import { usePublicContent } from "@/hooks/use-public-content";
// import { ImageOff, AlertCircle } from "lucide-react";

// // --- 1. Import All Cards ---
// import { MessageCard } from "../company/MessageCard";
// import { NoticeCard } from "../sections/NoticeCard";
// import { AboutContent } from "../sections/AboutContent";
// import { ShariahCard } from "../sections/ShariahCard";
// import { EventCard } from "../sections/Events/EventCard";
// import { SidebarEventCard } from "../sections/Events/SidebarEventCard";
// import { NewsCard } from "../News/NewsCard";
// import { SidebarNewsCard } from "../News/SidebarNewsCard";

// // --- 2. Register Components Safely ---
// // Add new feature cards here in the future.
// const CARD_COMPONENTS: Record<string, React.ComponentType<any>> = {
//   messages: MessageCard,
//   notice: NoticeCard,
//   aboutus: AboutContent,
//   shariah: ShariahCard,
//   event: EventCard,
//   "sidebar-event": SidebarEventCard,
//   news: NewsCard,
//   "sidebar-news": SidebarNewsCard,
// };

// interface DynamicContentProps<T> {
//   apiType: string; // e.g., "news", "event"
//   initialData: T[]; // Server-side data (SEO)
//   payload?: Record<string, any>; // API Body Params
//   renderAs?: string; // Which card to use? (defaults to apiType)
//   initialLang?: "eng" | "bng"; // Language of the server data
// }

// export default function DynamicContent<T>({
//   apiType,
//   initialData,
//   payload = {},
//   renderAs,
//   initialLang = "eng",
// }: DynamicContentProps<T>) {
//   const { lang } = useLangStore();

//   // --- 3. Client-Side Fetching (Only triggers on language mismatch) ---
//   // @ts-ignore
//   const {
//     data: clientData,
//     isLoading,
//     error,
//   } = usePublicContent<T[]>(apiType as any, payload);

//   // --- 4. Smart Data Merging ---
//   const isLanguageMatch = lang === initialLang;
//   // If languages match, use Server Data. If not, use Client Data.
//   const finalData = isLanguageMatch ? initialData : clientData || [];

//   // --- 5. Component Resolution ---
//   const componentKey = renderAs || apiType;
//   const CardComponent = CARD_COMPONENTS[componentKey];

//   // --- 6. SAFETY GUARDS ---

//   // Guard 1: Developer Typo Check (Prevents app crash if key is wrong)
//   if (!CardComponent) {
//     console.error(
//       `DynamicContent Error: No component registered for key "${componentKey}"`
//     );
//     return null; // Fail silently in production, or show error in dev
//   }

//   // Guard 2: Loading State (Only when fetching new language data)
//   if (!isLanguageMatch && isLoading) {
//     return (
//       <ContentSkeleton
//         gridMode={componentKey === "news" || componentKey === "event"}
//       />
//     );
//   }

//   // Guard 3: API Error State
//   if (!isLanguageMatch && error) {
//     return (
//       <div className="p-4 text-red-500 bg-red-50 rounded-lg flex items-center gap-2">
//         <AlertCircle className="w-4 h-4" /> Failed to load content.
//       </div>
//     );
//   }

//   // --- 7. RENDER LOGIC ---

//   // A. Grid Layout (Strictly for Main News & Events)
//   const isGrid =
//     (apiType === "event" || apiType === "news") &&
//     !componentKey.startsWith("sidebar-");

//   if (isGrid) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
//         {finalData.length > 0 ? (
//           finalData.map((item: any, index: number) => (
//             <CardComponent
//               key={index}
//               // Passing data with multiple prop names ensures compatibility
//               // with ANY card component without changing this file again.
//               msg={item}
//               event={item}
//               news={item}
//               data={item} // Generic prop for future components
//               index={index}
//             />
//           ))
//         ) : (
//           <EmptyState />
//         )}
//       </div>
//     );
//   }

//   // B. Standard List Layout (Notices, Sidebar, Messages)
//   const spacing = componentKey.startsWith("sidebar-")
//     ? "space-y-4"
//     : "space-y-6";

//   return (
//     <div className={spacing}>
//       {finalData.length > 0 ? (
//         finalData.map((item: any, index: number) => (
//           <CardComponent
//             key={index}
//             msg={item}
//             event={item}
//             news={item}
//             data={item}
//             index={index}
//           />
//         ))
//       ) : (
//         <EmptyState small={componentKey.startsWith("sidebar-")} />
//       )}
//     </div>
//   );
// }

// // --- Sub-Components ---
// function EmptyState({ small = false }: { small?: boolean }) {
//   if (small)
//     return (
//       <div className="text-center py-4 text-xs text-slate-400 italic">
//         No items found.
//       </div>
//     );

//   return (
//     <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-400 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
//       <ImageOff className="w-10 h-10 mb-3 opacity-20" />
//       <p>No content available in this language.</p>
//     </div>
//   );
// }

// function ContentSkeleton({ gridMode = false }: { gridMode?: boolean }) {
//   if (gridMode) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {[1, 2, 3].map((i) => (
//           <div
//             key={i}
//             className="h-[350px] bg-slate-100 rounded-2xl animate-pulse"
//           />
//         ))}
//       </div>
//     );
//   }
//   return (
//     <div className="space-y-6">
//       {[1, 2].map((i) => (
//         <div key={i} className="h-40 bg-slate-100 rounded-2xl animate-pulse" />
//       ))}
//     </div>
//   );
// }

"use client";

import { useLangStore } from "@/store/lang-store";
import { usePublicContent } from "@/hooks/use-public-content";
import { ImageOff, AlertCircle } from "lucide-react";

// --- 1. Import All Cards ---
import { MessageCard } from "../company/MessageCard";
import { NoticeCard } from "../sections/NoticeCard";
import { AboutContent } from "../sections/AboutContent";
import { ShariahCard } from "../sections/ShariahCard";
import { EventCard } from "../sections/Events/EventCard";
import { SidebarEventCard } from "../sections/Events/SidebarEventCard";
import { NewsCard } from "../News/NewsCard";
import { SidebarNewsCard } from "../News/SidebarNewsCard";
// import { FinancialCard } from "../financials/FinancialCard";

// --- 2. Register Components Mapping ---
const CARD_COMPONENTS: Record<string, React.ComponentType<any>> = {
  messages: MessageCard,
  notice: NoticeCard,
  aboutus: AboutContent,
  shariah: ShariahCard,
  event: EventCard,
  "sidebar-event": SidebarEventCard,
  news: NewsCard,
  "sidebar-news": SidebarNewsCard,
  // financials: FinancialCard,
};

interface DynamicContentProps<T> {
  apiType: string;
  initialData: T[];
  payload?: Record<string, any>;
  renderAs?: string;
  initialLang?: "eng" | "bng";
}

export default function DynamicContent<T>({
  apiType,
  initialData,
  payload = {},
  renderAs,
  initialLang = "eng",
}: DynamicContentProps<T>) {
  const { lang } = useLangStore();

  // --- 3. Logic: Should we fetch? ---
  // If the user's language (lang) matches the server's language (initialLang),
  // we do NOT need to fetch. We already have the data.
  const isLanguageMatch = lang === initialLang;

  // --- 4. Client-Side Fetching ---
  // We pass the 3rd argument (options) to your updated hook.
  // enabled: false -> Hook does nothing.
  // enabled: true  -> Hook fetches data.
  // @ts-ignore
  const {
    data: clientData,
    isLoading,
    error,
  } = usePublicContent<T[]>(
    apiType as any,
    payload,
    { enabled: !isLanguageMatch } // <--- VITAL UPDATE HERE
  );

  // --- 5. Data Selection ---
  const finalData = isLanguageMatch ? initialData : clientData || [];

  // --- 6. Component Resolution ---
  const componentKey = renderAs || apiType;
  const CardComponent = CARD_COMPONENTS[componentKey];

  // Guard: Developer Typo Check
  if (!CardComponent) {
    console.error(`DynamicContent Error: No component for "${componentKey}"`);
    return null;
  }

  // Guard: Loading State (Only if fetching new language)
  if (!isLanguageMatch && isLoading) {
    return (
      <ContentSkeleton
        gridMode={componentKey === "news" || componentKey === "event"}
      />
    );
  }

  // Guard: Error State
  if (!isLanguageMatch && error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg flex items-center gap-2">
        <AlertCircle className="w-4 h-4" /> Failed to load content.
      </div>
    );
  }

  // --- 7. RENDER LOGIC ---

  // A. Grid Layout (Strictly for Main News & Events)
  const isGrid =
    (apiType === "event" || apiType === "news") &&
    !componentKey.startsWith("sidebar-");

  if (isGrid) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {finalData.length > 0 ? (
          finalData.map((item: any, index: number) => (
            <CardComponent
              key={index}
              msg={item}
              event={item}
              news={item}
              data={item}
              index={index}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    );
  }

  // B. List Layout (Everything else)
  const spacing = componentKey.startsWith("sidebar-")
    ? "space-y-4"
    : "space-y-6";

  return (
    <div className={spacing}>
      {finalData.length > 0 ? (
        finalData.map((item: any, index: number) => (
          <CardComponent
            key={index}
            msg={item}
            event={item}
            news={item}
            data={item}
            index={index}
          />
        ))
      ) : (
        <EmptyState small={componentKey.startsWith("sidebar-")} />
      )}
    </div>
  );
}

// --- Sub-Components ---

function EmptyState({ small = false }: { small?: boolean }) {
  if (small)
    return (
      <div className="text-center py-4 text-xs text-slate-400 italic">
        No items found.
      </div>
    );

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-400 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
      <ImageOff className="w-10 h-10 mb-3 opacity-20" />
      <p>No content available.</p>
    </div>
  );
}

function ContentSkeleton({ gridMode = false }: { gridMode?: boolean }) {
  if (gridMode) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-[350px] bg-slate-100 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-32 bg-slate-100 rounded-xl animate-pulse" />
      ))}
    </div>
  );
}
