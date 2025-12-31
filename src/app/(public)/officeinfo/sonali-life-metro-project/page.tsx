import { Metadata } from "next";
import { Building2 } from "lucide-react";
import { fetchPublicContent } from "@/lib/api/api-server-public";
import MetroProjectList, {
  MetroMember,
} from "@/components/OfficeInfo/MetroProjectList";
// import MetroProjectList, {
//   MetroMember,
// } from "@/components/office-info/MetroProjectList";

export const metadata: Metadata = {
  title: "Metro Project Team | Sonali Life Insurance",
  description: "Meet the dedicated team behind our Metro Projects.",
};

export default async function MetroProjectPage() {
  // 1. Fetch Initial Data (Default: "all")
  // We pass the payload inside 'body' as established in previous steps.
  const initialData = await fetchPublicContent<MetroMember>(
    "officeinfo/metroproject",
    {
      method: "POST",
      body: {
        searchfor: "all",
      },
    }
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-slate-900 text-white pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>

        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-4 backdrop-blur-md border border-white/10">
            <Building2 className="w-8 h-8 text-orange-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Metro Project Team
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Our leadership and team members driving the metro projects forward.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 pt-12">
        <MetroProjectList initialData={initialData} />
      </div>
    </div>
  );
}
