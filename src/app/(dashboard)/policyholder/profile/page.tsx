"use client";

import {
  User,
  Smartphone,
  MapPin,
  Calendar,
  Mail,
  Clock,
  Shield,
  FileText,
  AlertCircle,
} from "lucide-react";
import { usePersonalDetails } from "@/hooks/use-personal-details";

// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PolicyholderProfilePage() {
  const { data, isLoading, isError } = usePersonalDetails();

  // Using 'any' to match your specific API response structure safely
  const profile = data as any;

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 rounded-lg" />
        <div className="h-96 w-full bg-slate-100 rounded-3xl" />
      </div>
    );
  }

  // --- ERROR STATE ---
  if (isError) {
    return (
      <div className="max-w-4xl mx-auto p-10">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Unable to load profile data.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 p-4 md:p-8 animate-in fade-in duration-500">
      {/* 1. PAGE HEADER */}
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            My Profile
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            View your personal details and policyholder status.
          </p>
        </div>
      </div>

      {/* 2. PROFILE CARD */}
      <Card className="border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden bg-white rounded-3xl">
        {/* Cover Photo Gradient */}
        <div className="h-40 bg-linear-to-r from-blue-600 to-indigo-700 relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          {/* Avatar positioned over the banner */}
          <div className="absolute -bottom-12 left-8 md:left-10">
            <Avatar className="w-32 h-32 border-[5px] border-white shadow-lg bg-white">
              <AvatarImage
                src={profile?.ApplicantPPName}
                className="object-cover"
                alt="Profile"
              />
              <AvatarFallback className="bg-slate-100 text-4xl font-bold text-slate-400">
                {profile?.ApplicantNameEng?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <CardHeader className="pt-16 pb-6 px-8 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 leading-tight">
                {profile?.ApplicantNameEng}
              </h2>
              {profile?.ApplicantNameBang && (
                <p className="text-lg text-slate-500 font-medium mt-1">
                  {profile?.ApplicantNameBang}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              {profile?.ApplicationDate && (
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 border-blue-100 px-3 py-1.5 gap-1.5 text-sm"
                >
                  <Clock className="w-4 h-4" />
                  Since: {profile.ApplicationDate}
                </Badge>
              )}
              <Badge
                variant="outline"
                className="text-slate-500 border-slate-200 px-3 py-1.5 gap-1.5 text-sm"
              >
                <Shield className="w-4 h-4" /> Policyholder
              </Badge>
            </div>
          </div>
        </CardHeader>

        <Separator className="bg-slate-100" />

        <CardContent className="p-8 md:p-10 bg-slate-50/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <InfoItem
              icon={<Smartphone className="w-5 h-5 text-blue-500" />}
              label="Mobile Number"
              value={profile?.MobileNo}
            />

            <InfoItem
              icon={<Mail className="w-5 h-5 text-indigo-500" />}
              label="Email Address"
              value={profile?.Email}
            />

            <InfoItem
              icon={<Calendar className="w-5 h-5 text-orange-500" />}
              label="Date of Birth"
              value={profile?.DOB}
            />

            {/* <InfoItem
              icon={<FileText className="w-5 h-5 text-slate-500" />}
              label="Notification Status"
              value={profile?.NotificationStatusFlag ? "Active" : "Inactive"}
            /> */}

            {/* Full Width Address */}
            <div className="md:col-span-2 mt-2">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex gap-4 items-start shadow-sm">
                <div className="p-2.5 bg-slate-100 rounded-xl">
                  <MapPin className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Present Address
                  </p>
                  <p className="font-medium text-slate-800 text-lg leading-relaxed">
                    {profile?.PresentAddress || "Address not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Reusable Info Component for this page
function InfoItem({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100">
      <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="font-bold text-slate-800 text-lg break-all">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
}
