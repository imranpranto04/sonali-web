// "use client";

// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import {
//   User,
//   Wallet,
//   Calendar,
//   Users,
//   Building2,
//   CreditCard,
// } from "lucide-react";
// import { AgentDetails } from "@/hooks/use-personal-details";

// export function ProfileSheet({ profile }: { profile: AgentDetails }) {
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button
//           variant="outline"
//           className="bg-slate-800 border-white/20 text-white hover:bg-slate-900 hover:text-white backdrop-blur-md"
//         >
//           View Full Profile
//         </Button>
//       </SheetTrigger>

//       <SheetContent className="w-full sm:w-[540px] overflow-y-auto bg-slate-300 px-4">
//         <SheetHeader className="mb-6">
//           <SheetTitle className="text-2xl font-bold text-slate-900">
//             Agent Profile
//           </SheetTitle>
//         </SheetHeader>

//         <div className="space-y-8">
//           {/* 1. Personal Info Section */}
//           <section className="space-y-4">
//             <h3 className="flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-wider">
//               <User className="w-4 h-4" /> Personal Information
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
//               <InfoItem label="Full Name" value={profile.AgentName} />
//               <InfoItem label="Designation" value={profile.Designation} />
//               <InfoItem
//                 label="Date of Birth"
//                 value={profile.DOB}
//                 icon={<Calendar className="w-3 h-3" />}
//               />
//               <InfoItem label="Phone" value={profile.Mobile} />
//             </div>
//           </section>

//           {/* 2. Family Info Section */}
//           <section className="space-y-4">
//             <h3 className="flex items-center gap-2 text-sm font-bold text-purple-600 uppercase tracking-wider">
//               <Users className="w-4 h-4" /> Family Details
//             </h3>
//             <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
//               <div className="grid grid-cols-1 gap-1">
//                 <span className="text-xs text-slate-500 font-medium uppercase">
//                   Father's Name
//                 </span>
//                 <span className="font-semibold text-slate-900">
//                   {profile.AgentFatherName}
//                 </span>
//               </div>
//               <div className="h-px bg-slate-200" />
//               <div className="grid grid-cols-1 gap-1">
//                 <span className="text-xs text-slate-500 font-medium uppercase">
//                   Mother's Name
//                 </span>
//                 <span className="font-semibold text-slate-900">
//                   {profile.AgentMotherName}
//                 </span>
//               </div>
//             </div>
//           </section>

//           {/* 3. Bank Info Section */}
//           <section className="space-y-4">
//             <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-600 uppercase tracking-wider">
//               <Wallet className="w-4 h-4" /> Banking Details
//             </h3>
//             <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100 space-y-4 relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

//               <div className="relative z-10 flex items-start gap-4">
//                 <div className="p-3 bg-white rounded-lg shadow-sm">
//                   <Building2 className="w-6 h-6 text-emerald-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-emerald-800 font-bold">
//                     {profile.BankName || "Dutch Bangla Bank"}
//                   </p>
//                   <p className="text-xs text-emerald-600">
//                     {profile.BankBranch || "Motijheel Branch"}
//                   </p>
//                 </div>
//               </div>

//               <div className="relative z-10 pt-2">
//                 <p className="text-xs text-emerald-600 font-bold uppercase mb-1">
//                   Account Number
//                 </p>
//                 <div className="flex items-center gap-2  text-lg font-bold text-emerald-900 bg-white/60 p-2 rounded-lg w-fit">
//                   <CreditCard className="w-4 h-4 opacity-50" />
//                   {profile.BankACNo}
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }

// // Helper Small Component
// function InfoItem({
//   label,
//   value,
//   icon,
// }: {
//   label: string;
//   value?: string;
//   icon?: React.ReactNode;
// }) {
//   return (
//     <div>
//       <p className="text-xs text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
//         {icon} {label}
//       </p>
//       <p className="font-semibold text-slate-800">{value || "N/A"}</p>
//     </div>
//   );
// }

"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
  SheetDescription, // Added Description
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Wallet,
  Calendar,
  Users,
  Building2,
  CreditCard,
  MapPin,
  Briefcase,
  Phone,
  BadgeCheck,
  Clock,
  Fingerprint,
  X,
} from "lucide-react";
import { AgentDetails } from "@/hooks/use-personal-details";

// UPDATE: Added 'children' to props
export function ProfileSheet({
  profile,
  children, // <--- THIS IS REQUIRED
}: {
  profile: AgentDetails;
  children?: React.ReactNode;
}) {
  const initials = "AG"; // (Shortened logic for brevity)

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* LOGIC: If children (DropdownItem) exists, render it. 
            Otherwise, render default "View Full Profile" button */}
        {children ? (
          children
        ) : (
          <Button variant="outline">View Full Profile</Button>
        )}
      </SheetTrigger>

      <SheetContent className="w-full sm:w-[580px] p-0 overflow-y-auto bg-slate-50 border-l border-slate-200">
        {/* --- CUSTOM CLOSE BUTTON --- */}
        <SheetClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer absolute right-4 top-4 z-50 rounded-full bg-white/80 backdrop-blur-sm text-slate-500 hover:bg-red-50 hover:text-red-600 shadow-sm border border-slate-200 transition-all duration-300 hover:rotate-90"
          >
            <X className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetClose>

        {/* --- HEADER SECTION --- */}
        <div className="relative bg-white pb-6 shadow-sm border-b border-slate-100">
          {/* Cover Photo */}
          <div className="h-36 w-full bg-linear-to-r from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-30"></div>
          </div>

          <div className="px-8 -mt-16">
            <div className="flex justify-between items-end">
              <Avatar className="w-32 h-32 border-[5px] border-white shadow-xl ring-1 ring-slate-100/50 bg-white">
                <AvatarImage
                  src={profile.AgentImage}
                  alt={profile.AgentName}
                  className="object-cover"
                />
                <AvatarFallback className="bg-slate-100 text-slate-400 text-3xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="mb-2 hidden sm:block">
                <Badge
                  variant="secondary"
                  className="bg-emerald-50 text-emerald-700 border-emerald-100 px-3 py-1 gap-1.5"
                >
                  <BadgeCheck className="w-3.5 h-3.5" /> Verified Agent
                </Badge>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              {/* FIX: Used SheetTitle here instead of h2 */}
              <SheetTitle className="text-3xl font-black text-slate-900 tracking-tight">
                {profile.AgentName}
              </SheetTitle>

              {/* FIX: Added SheetDescription for accessibility (styled as role text) */}
              <SheetDescription className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  <Briefcase className="w-3.5 h-3.5" />
                  {profile.Designation}
                </span>
                <span className="flex items-center gap-1.5 pt-0.5">
                  <Fingerprint className="w-3.5 h-3.5 text-slate-400" />
                  ID:{" "}
                  <span className=" text-slate-700">{profile.AgentIdNo}</span>
                </span>
              </SheetDescription>
            </div>
          </div>
        </div>

        <div className="px-8 py-8 space-y-8">
          {/* --- CAREER SNAPSHOT --- */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4">
              <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">
                  Branch
                </p>
                <p className="text-sm font-bold text-slate-800 line-clamp-1">
                  {profile.BranchOfficeCode}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4">
              <div className="p-2.5 bg-orange-50 rounded-xl text-orange-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">
                  Experience
                </p>
                <p className="text-sm font-bold text-slate-800">
                  {profile.jobPeriodYear} Yrs, {profile.jobPeriodMonth} Mos
                </p>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-200" />

          {/* --- PERSONAL DETAILS --- */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
              <User className="w-4 h-4" /> Personal Details
            </h3>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-slate-100">
                <div className="p-5 border-r border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <InfoLabel
                    icon={<Phone className="w-3.5 h-3.5" />}
                    label="Mobile Number"
                  />
                  <p className="font-semibold text-slate-900 mt-1.5  text-sm">
                    {profile.Mobile}
                  </p>
                </div>
                <div className="p-5 hover:bg-slate-50/50 transition-colors">
                  <InfoLabel
                    icon={<Calendar className="w-3.5 h-3.5" />}
                    label="Date of Birth"
                  />
                  <p className="font-semibold text-slate-900 mt-1.5 text-sm">
                    {profile.DOB}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-50/50 border-b border-slate-100">
                <div className="p-5 border-r border-slate-200/50">
                  <InfoLabel
                    icon={<Users className="w-3.5 h-3.5" />}
                    label="Father's Name"
                  />
                  <p className="font-medium text-slate-800 mt-1.5 text-sm ">
                    {profile.AgentFatherName}
                  </p>
                </div>
                <div className="p-5">
                  <InfoLabel
                    icon={<Users className="w-3.5 h-3.5" />}
                    label="Mother's Name"
                  />
                  <p className="font-medium text-slate-800 mt-1.5 text-sm">
                    {profile.AgentMotherName}
                  </p>
                </div>
              </div>

              <div className="p-5 hover:bg-slate-50/50 transition-colors ">
                <InfoLabel
                  icon={<MapPin className="w-3.5 h-3.5" />}
                  label="Present Address"
                />
                <p className="font-medium text-purple-600 mt-1.5 text-sm leading-relaxed ">
                  {profile.PresentAddress}
                </p>
              </div>
            </div>
          </section>

          {/* --- BANKING (Credit Card Style) --- */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
              <Wallet className="w-4 h-4" /> Banking Information
            </h3>

            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl p-7">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-blue-500 opacity-10 rounded-full blur-2xl"></div>
              <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                      Bank Name
                    </p>
                    <p className="font-bold text-lg tracking-wide text-slate-100">
                      {profile.BankName}
                    </p>
                    <p className="text-slate-400 text-xs flex items-center gap-1.5">
                      <Building2 className="w-3 h-3" /> {profile.BankBranch}
                    </p>
                  </div>
                  <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                    <CreditCard className="w-6 h-6 text-slate-200" />
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase mb-1.5 tracking-wider">
                    Account Number
                  </p>
                  <p className="text-lg md:text-2xl font-bold tracking-widest text-white drop-shadow-sm">
                    {profile.BankACNo}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center pt-2 pb-6">
            <p className="text-xs text-slate-400 font-medium">
              Member since {profile.Job_Start_Date}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function InfoLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase ">
      {icon} {label}
    </div>
  );
}
