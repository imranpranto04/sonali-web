"use client";

import Image from "next/image";
import { Quote, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Define the shape of the Shariah API data
export interface ShariahMessage {
  name: string;
  designation: string;
  speech: string;
  image: string;
}

export function ShariahCard({
  msg,
  index,
}: {
  msg: ShariahMessage;
  index: number;
}) {
  // Construct Image URL (Using the Board Director path as they are board members)
  const imageUrl = msg.image
    ? `https://erp.sonalilife.com/Utilities/BoradDirectorImg/${msg.image}`
    : "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000";

  return (
    <div
      className={`flex flex-col ${
        index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-start gap-10 lg:gap-16 group mb-20 last:mb-0`}
    >
      {/* 1. Image Section (Green Theme) */}
      <div className="w-full lg:w-[350px] shrink-0 relative mx-auto lg:mx-0">
        {/* Islamic-inspired geometric background accent */}
        <div className="absolute inset-0 bg-green-600 rounded-t-[10rem] rounded-b-4xlrotate-3 opacity-10 scale-105 transform transition-transform duration-500 group-hover:rotate-6"></div>
        <div className="absolute inset-0 bg-emerald-500 rounded-t-[10rem] rounded-b-4xl-rotate-2 opacity-10 scale-105 transform transition-transform duration-500 group-hover:-rotate-4"></div>

        <Card className="relative overflow-hidden rounded-t-[10rem] rounded-b-4xlborder-4 border-white shadow-2xl aspect-3/4 z-10">
          <Image
            src={imageUrl}
            alt={msg.name}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
            unoptimized
          />

          {/* Overlay Name */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-green-900/90 to-transparent text-white text-center">
            <p className="font-bold text-lg">{msg.name}</p>
            <p className="text-green-100 text-xs uppercase tracking-wider font-medium">
              {msg.designation}
            </p>
          </div>
        </Card>

        {/* Floating Icon */}
        <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white z-20">
          <BookOpen className="w-7 h-7" />
        </div>
      </div>

      {/* 2. Text Content */}
      <div className="flex-1 space-y-6 pt-8 text-center lg:text-left">
        <div className="space-y-2">
          <Badge
            variant="outline"
            className="border-green-200 text-green-700 bg-green-50 px-4 py-1 text-xs font-bold uppercase tracking-widest mb-2 mx-auto lg:mx-0 w-fit"
          >
            Shariah Council
          </Badge>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            {msg.name}
          </h2>

          <p className="text-lg font-medium text-slate-500 flex items-center justify-center lg:justify-start gap-2">
            <span className="h-px w-8 bg-green-400 inline-block"></span>
            {msg.designation}
          </p>
        </div>

        <div className="relative">
          <Quote className="w-12 h-12 text-green-100 absolute -top-6 -left-6 -z-10 transform -scale-x-100 hidden lg:block" />

          <div className="prose prose-lg text-slate-600 leading-loose text-justify">
            {msg.speech ? (
              msg.speech.split("\r\n").map(
                (para, i) =>
                  para.trim() && (
                    <p key={i} className="mb-4">
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
      </div>
    </div>
  );
}
