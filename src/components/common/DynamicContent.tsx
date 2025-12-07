"use client";

import { useLangStore } from "@/store/lang-store";
import { usePublicContent } from "@/hooks/use-public-content";
// 1. Import ShariahCard (Ensure this file exists from Turn 54)
import { Skeleton } from "@/components/ui/skeleton";
import { AboutContent } from "../sections/AboutContent";
import { MessageCard } from "../company/MessageCard";
import { ShariahCard } from "../sections/ShariahCard";
import { NoticeCard } from "../sections/NoticeCard";

// 2. Register it in the component map
const CARD_COMPONENTS: Record<string, React.ComponentType<any>> = {
  messages: MessageCard,
  shariah: ShariahCard,
  notice: NoticeCard,
  aboutus: AboutContent,
};

interface DynamicContentProps<T> {
  apiType: string;
  initialData: T[];
  payload?: any;
}

export default function DynamicContent<T>({
  apiType,
  initialData,
  payload,
}: DynamicContentProps<T>) {
  const { lang } = useLangStore();

  // @ts-ignore
  const { data: clientData, isLoading } = usePublicContent<T[]>(
    apiType as any,
    payload
  );

  const finalData = lang === "bng" ? clientData || [] : initialData;

  const CardComponent = CARD_COMPONENTS[apiType];

  if (lang === "bng" && isLoading) {
    return <ContentSkeleton />;
  }

  if (!CardComponent) {
    // This error block was catching 'shariah' before. Now it won't!
    return (
      <div className="py-10 text-red-500 text-center">
        Error: Unknown content type "{apiType}"
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {finalData && finalData.length > 0 ? (
        finalData.map((item: any, index: number) => (
          <CardComponent key={index} msg={item} index={index} />
        ))
      ) : (
        <div className="text-center py-32 border-2 border-dashed border-slate-200 rounded-3xl">
          <h3 className="text-xl font-bold text-slate-600">
            No content found.
          </h3>
          <p className="text-slate-400 mt-2">Please check back later.</p>
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
