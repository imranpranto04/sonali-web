"use client";

import { useLangStore } from "@/store/lang-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Youtube,
  Download,
  CheckCircle2,
  Clock,
  HeartPulse,
  ShieldAlert,
  Gift,
  Share2,
} from "lucide-react";

export interface ProductDetailItem {
  PolicyID: number;
  PolicyName: string;
  PolicyNameBangla: string;
  TermOfThePolicy: string;
  TermOfThePolicyBangla: string;
  OnMaturity: string;
  OnMaturityBangla: string;
  InCaseOfAssuredDeath: string;
  InCaseOfAssuredDeathBangla: string;
  SpecialBenefit: string;
  SpecialBenefitBangla: string;
  SupplementaryCover: string;
  ChartRate: string;
  YouTubeLink: string;
}

export default function ProductDetailsView({
  data,
}: {
  data: ProductDetailItem;
}) {
  const { lang } = useLangStore();
  const isBng = lang === "bng";
  const t = (eng: string, bng: string) => (isBng && bng ? bng : eng);

  const pdfUrl = data.ChartRate
    ? `https://erp.sonalilife.com/Utilities/ChartRate/${data.ChartRate}`
    : null;

  return (
    <div className="space-y-12">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row gap-8 justify-between items-start border-b border-slate-100 pb-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldAlert className="w-3.5 h-3.5" />
            {isBng ? "পলিসি ডিটেইলস" : "Official Policy Document"}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            {t(data.PolicyName, data.PolicyNameBangla)}
          </h1>
          <p className="text-lg text-slate-500">
            {isBng
              ? "আপনার এবং আপনার পরিবারের ভবিষ্যতের সুরক্ষার জন্য একটি নির্ভরযোগ্য পরিকল্পনা।"
              : "A reliable plan designed for the protection of you and your family's future."}
          </p>
        </div>
        <div className="shrink-0">
          <Button variant="outline" className="rounded-full gap-2">
            <Share2 className="w-4 h-4" /> Share Plan
          </Button>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT COLUMN: Features */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 gap-6">
            {/* Term Card */}
            <PremiumFeatureCard
              icon={<Clock className="w-6 h-6 text-blue-600" />}
              title={isBng ? "মেয়াদকাল" : "Term of Policy"}
              desc={t(data.TermOfThePolicy, data.TermOfThePolicyBangla)}
              bg="bg-blue-50"
              border="border-blue-100"
            />

            {/* Maturity Card */}
            <PremiumFeatureCard
              icon={<Gift className="w-6 h-6 text-emerald-600" />}
              title={isBng ? "মেয়াদান্তে সুবিধা" : "On Maturity Benefit"}
              desc={t(data.OnMaturity, data.OnMaturityBangla)}
              bg="bg-emerald-50"
              border="border-emerald-100"
            />

            {/* Death Benefit Card */}
            <PremiumFeatureCard
              icon={<HeartPulse className="w-6 h-6 text-rose-600" />}
              title={isBng ? "মৃত্যুজনিত সুবিধা" : "Death Benefit"}
              desc={t(
                data.InCaseOfAssuredDeath,
                data.InCaseOfAssuredDeathBangla
              )}
              bg="bg-rose-50"
              border="border-rose-100"
            />

            {/* Special Benefit Card */}
            {data.SpecialBenefit && (
              <PremiumFeatureCard
                icon={<CheckCircle2 className="w-6 h-6 text-orange-600" />}
                title={isBng ? "বিশেষ সুবিধা" : "Special Benefit"}
                desc={t(data.SpecialBenefit, data.SpecialBenefitBangla)}
                bg="bg-orange-50"
                border="border-orange-100"
              />
            )}
          </div>

          {/* Supplementary Info */}
          {data.SupplementaryCover && data.SupplementaryCover !== "NIL" && (
            <div className="mt-8 p-8 bg-slate-900 rounded-4xl text-white">
              <h4 className="font-bold text-lg mb-2 text-orange-400">
                {isBng ? "সম্পূরক বিমা" : "Supplementary Cover"}
              </h4>
              <p className="leading-relaxed text-slate-300">
                {data.SupplementaryCover}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Sidebar Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Download Card */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm text-red-500">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">
              {isBng ? "রেট চার্ট" : "Premium Rate Chart"}
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              {isBng
                ? "অফিসিয়াল রেট চার্ট পিডিএফ ডাউনলোড করুন"
                : "Download the official rate chart PDF document."}
            </p>
            {pdfUrl ? (
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                <Button className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-lg shadow-slate-200">
                  <Download className="w-4 h-4 mr-2" /> Download PDF
                </Button>
              </a>
            ) : (
              <Button disabled className="w-full bg-slate-200 text-slate-400">
                Not Available
              </Button>
            )}
          </div>

          {/* Video Card */}
          {data.YouTubeLink && (
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm group">
              <div className="p-6 border-b border-slate-50">
                <div className="flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-red-600" />
                  <h3 className="font-bold text-slate-900">
                    {isBng ? "ভিডিও নির্দেশিকা" : "Video Guide"}
                  </h3>
                </div>
              </div>
              <div className="relative aspect-video bg-slate-100">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${data.YouTubeLink}`}
                  title="Product Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Improved Feature Card Component
function PremiumFeatureCard({
  icon,
  title,
  desc,
  bg,
  border,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bg: string;
  border: string;
}) {
  if (!desc) return null;
  return (
    <div
      className={`flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] border ${border} ${bg} transition-transform hover:scale-[1.01]`}
    >
      <div className="shrink-0">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-xl text-slate-900 mb-3">{title}</h3>
        <div className="text-slate-700 leading-relaxed text-justify whitespace-pre-line">
          {desc}
        </div>
      </div>
    </div>
  );
}
