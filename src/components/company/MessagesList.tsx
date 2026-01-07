"use client";

import { Award } from "lucide-react";
import { usePublicContent, PublicMessage } from "@/hooks/use-public-content";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageCard } from "./MessageCard";

export default function MessagesList() {
  // This hook automatically handles the English/Bengali switch!
  const { data: messages, isLoading } =
    usePublicContent<PublicMessage[]>("messages");

  if (isLoading) {
    return <MessagesSkeleton />;
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="text-center py-32 border-2 border-dashed border-slate-200 rounded-3xl">
        <div className="w-20 h-20 bg-slate-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <Award className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-600">No messages found</h3>
        <p className="text-slate-400 mt-2">Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-40">
      {messages.map((msg: PublicMessage, index: number) => (
        <MessageCard key={index} msg={msg} index={index} />
      ))}
    </div>
  );
}

function MessagesSkeleton() {
  return (
    <div className="space-y-32">
      {[1, 2].map((i) => (
        <div key={i} className="flex flex-col md:flex-row gap-16 animate-pulse">
          <Skeleton className="w-full md:w-[450px] h-[600px] rounded-[3rem]" />
          <div className="w-full flex-1 space-y-6 pt-10">
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-96 w-full mt-8" />
          </div>
        </div>
      ))}
    </div>
  );
}
