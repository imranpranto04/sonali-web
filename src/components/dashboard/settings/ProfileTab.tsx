"use client";

import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle2,
  LucideIcon,
  User,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth-store"; // Import auth store to get real User ID

// Helper Component for Info Items
function InfoItem({
  label,
  value,
  icon: Icon,
  className,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label className="text-xs text-slate-500 uppercase font-bold tracking-wider">
        {label}
      </Label>
      <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-orange-200 transition-colors group">
        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-orange-50 transition-colors">
          <Icon className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transition-colors" />
        </div>
        <span className="font-semibold text-slate-700 text-sm pt-1 break-all">
          {value}
        </span>
      </div>
    </div>
  );
}

export function ProfileTab({ profile }: { profile: any }) {
  // Get the real User ID from the auth store
  const { user } = useAuthStore();

  // Helper to ensure mobile number starts with 0
  const formatMobile = (num: string) => {
    if (!num) return "Not provided";
    return num.startsWith("0") ? num : `0${num}`;
  };

  const formattedMobile = formatMobile(profile?.MobileNo);
  // Use the actual ID from the logged-in user session
  const userId = user?.id || "Unknown ID";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Card (Restored Clean Design) */}
      <Card className="border-none shadow-sm bg-white overflow-hidden rounded-4xl border border-slate-100">
        <div className="h-32 bg-linear-to-r from-orange-500 to-amber-500 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        </div>

        <CardContent className="px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-12">
            <div className="relative">
              <Avatar className="w-28 h-28 border-4 border-white shadow-lg bg-white">
                <AvatarImage
                  src={profile?.ApplicantPPName}
                  className="object-cover"
                />
                <AvatarFallback className="bg-orange-100 text-orange-600 text-3xl font-bold">
                  {profile?.ApplicantNameEng?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white"></div>
            </div>

            <div className="flex-1 text-center md:text-left mb-2">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {profile?.ApplicantNameEng}
              </h2>
              <p className="text-slate-500 font-medium">
                {profile?.ApplicantNameBang}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
                <Badge
                  variant="secondary"
                  className="bg-green-50 text-green-700 border-green-200 px-3 py-1 gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active Policyholder
                </Badge>
                {/* Displaying Real User ID */}
                <Badge
                  variant="outline"
                  className="text-slate-500 border-slate-200 gap-1.5"
                >
                  <User className="w-3 h-3" /> ID: {userId}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Grid */}
      <Card className="border-slate-100 shadow-sm overflow-hidden bg-white">
        <CardHeader className="border-b border-slate-50 pb-4">
          <CardTitle className="text-base font-bold text-slate-900">
            Personal Details
          </CardTitle>
          <CardDescription>
            Information associated with your policy records.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Updated to use formatted mobile number */}
          <InfoItem label="Phone Number" value={formattedMobile} icon={Phone} />
          <InfoItem
            label="Email Address"
            value={profile?.Email || "Not provided"}
            icon={Mail}
          />
          <InfoItem
            label="Date of Birth"
            value={profile?.DOB}
            icon={Calendar}
          />
          <InfoItem
            label="Present Address"
            value={profile?.PresentAddress}
            icon={MapPin}
            className="md:col-span-2"
          />
        </CardContent>
        <CardFooter className="bg-slate-50 border-t border-slate-100 p-4">
          <p className="text-xs text-slate-500 flex items-center gap-2 font-medium mx-auto md:mx-0">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            To update these details, please contact your assigned agent or
            nearest branch.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
