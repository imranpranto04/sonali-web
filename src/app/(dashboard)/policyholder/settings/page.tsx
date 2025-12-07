"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { User, Lock, Shield, ChevronRight } from "lucide-react";
import { usePersonalDetails } from "@/hooks/use-personal-details";

// Import Components
import { SecurityTab } from "@/components/dashboard/settings/SecurtityTab";
import { ProfileTab } from "@/components/dashboard/settings/ProfileTab";

// Shadcn Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab = searchParams.get("tab") || "profile";
  const { data: profile, isLoading } = usePersonalDetails();

  const handleTabChange = (value: string) => {
    router.push(`/policyholder/settings?tab=${value}`);
  };

  if (isLoading)
    return (
      <div className="max-w-5xl mx-auto space-y-8 p-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-in fade-in duration-500">
      {/* Premium Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
            <Shield className="w-8 h-8 text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Settings
            </h1>
            <p className="text-slate-500 font-medium text-sm">
              Manage your account & security preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Modern Tabs System */}
      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full space-y-8"
      >
        {/* Floating Pill Design for Tabs */}
        <div className="flex justify-center md:justify-start">
          <TabsList className="bg-white p-1.5 rounded-full border border-slate-200 shadow-sm h-auto inline-flex">
            <TabsTrigger
              value="profile"
              className="gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-slate-500 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
            >
              <User className="w-4 h-4" /> My Profile
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-slate-500 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
            >
              <Lock className="w-4 h-4" /> Security
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="profile"
          className="mt-0 focus-visible:outline-none"
        >
          <ProfileTab profile={profile} />
        </TabsContent>

        <TabsContent
          value="security"
          className="mt-0 focus-visible:outline-none"
        >
          <SecurityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
