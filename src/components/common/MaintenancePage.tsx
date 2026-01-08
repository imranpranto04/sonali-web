"use client";

import Link from "next/link";
import { Construction, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MaintenancePageProps {
  title?: string;
  description?: string;
  showHomeButton?: boolean;
}

export default function MaintenancePage({
  title = "We are upgrading your experience.",
  description = "Our system is currently undergoing scheduled maintenance. We will be back shortly.",
  showHomeButton = false,
}: MaintenancePageProps) {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center relative overflow-hidden bg-slate-900 rounded-3xl my-4">
      {/* Background Shapes */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-linear-to-br from-orange-500/20 to-orange-600/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 p-8 text-center max-w-2xl w-full">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative bg-linear-to-br from-slate-800 to-slate-900 p-5 rounded-2xl shadow-lg border border-slate-700/50">
            <Construction className="w-10 h-10 text-orange-500" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
          {title}
        </h1>
        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showHomeButton && (
            <Button
              asChild
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
              </Link>
            </Button>
          )}

          <Button
            asChild
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold"
          >
            <Link href="/contact">
              <Mail className="w-4 h-4 mr-2" /> Contact Team
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
