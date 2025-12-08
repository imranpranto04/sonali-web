"use client";

import { useLangStore } from "@/store/lang-store";
import { usePublicContent } from "@/hooks/use-public-content";

import { Skeleton } from "@/components/ui/skeleton";
import { MessageCard } from "../company/MessageCard";
import { NoticeCard } from "../sections/NoticeCard";
import { AboutContent } from "../sections/AboutContent";
import { ShariahCard } from "../sections/ShariahCard";
import { EventCard } from "../sections/Events/EventCard";
import { SidebarEventCard } from "../sections/Events/SidebarEventCard";
import { NewsCard } from "../News/NewsCard";
import { SidebarNewsCard } from "../News/SidebarNewsCard";

// 2. Register Components
const CARD_COMPONENTS: Record<string, React.ComponentType<any>> = {
  messages: MessageCard,
  notice: NoticeCard,
  aboutus: AboutContent,
  shariah: ShariahCard,
  event: EventCard,
  "sidebar-event": SidebarEventCard,
  news: NewsCard,
  "sidebar-news": SidebarNewsCard, // 3. Add mapping for news sidebar
};

interface DynamicContentProps<T> {
  apiType: string;
  initialData: T[];
  payload?: any;
  renderAs?: string;
}

export default function DynamicContent<T>({
  apiType,
  initialData,
  payload,
  renderAs,
}: DynamicContentProps<T>) {
  const { lang } = useLangStore();

  // Client-Side Fetch
  // @ts-ignore
  const { data: clientData, isLoading } = usePublicContent<T[]>(
    apiType as any,
    payload
  );

  // Switch Logic
  const finalData = lang === "bng" ? clientData || [] : initialData;

  // Determine which component to use
  const componentKey = renderAs || apiType;
  const CardComponent = CARD_COMPONENTS[componentKey];

  if (lang === "bng" && isLoading) {
    return <ContentSkeleton />;
  }

  if (!CardComponent) {
    return (
      <div className="py-10 text-red-500 text-center">
        Error: Unknown content type "{componentKey}"
      </div>
    );
  }

  // Special Grid Layout for Events and News (Main Grid only)
  if (
    (apiType === "event" || apiType === "news") &&
    !componentKey.startsWith("sidebar-")
  ) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {finalData && finalData.length > 0 ? (
          finalData.map((item: any, index: number) => (
            <CardComponent key={index} msg={item} index={index} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">
            No content found.
          </div>
        )}
      </div>
    );
  }

  // Default List Layout (Messages, Notices, and Sidebar items)
  const spacing = componentKey.startsWith("sidebar-")
    ? "space-y-4"
    : "space-y-10";

  return (
    <div className={spacing}>
      {finalData && finalData.length > 0 ? (
        finalData.map((item: any, index: number) => (
          // We pass both 'msg', 'event', 'news' props to cover all bases for different card types
          <CardComponent
            key={index}
            msg={item}
            event={item}
            news={item}
            index={index}
          />
        ))
      ) : (
        <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-2xl text-sm text-slate-400">
          No content found.
        </div>
      )}
    </div>
  );
}

function ContentSkeleton() {
  return (
    <div className="space-y-10">
      {[1, 2].map((i) => (
        <div key={i} className="h-64 bg-slate-100 rounded-2xl animate-pulse" />
      ))}
    </div>
  );
}
