import { Metadata } from "next";
import { Briefcase } from "lucide-react";
import MetroAdminList, {
  MetroAdmin,
} from "@/components/OfficeInfo/MetroAdminList";
// import MetroAdminList, {
//   MetroAdmin,
// } from "@/components/office-info/MetroAdminList";

export const metadata: Metadata = {
  title: "Metro Project Admin | Sonali Life Insurance",
  description: "Administrative leadership for our Metro Projects.",
};

// Define the full response shape
interface AdminApiResponse {
  success: string;
  message: string;
  designations: string; // "Executive Officer,Deputy General Manager"
  data: MetroAdmin[];
}

async function getAdminData() {
  try {
    const res = await fetch(
      "https://www.sonalilife.com:1010/api/Webdata/officeinfo/metroadmin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchfor: "all" }),
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    if (!res.ok) throw new Error("Failed to fetch admin data");

    return (await res.json()) as AdminApiResponse;
  } catch (error) {
    console.error(error);
    return { success: "false", message: "error", designations: "", data: [] };
  }
}

export default async function MetroProjectAdminPage() {
  // 1. Fetch Full Response (Data + Designations string)
  const response = await getAdminData();
  const initialData = response.data || [];

  // 2. Parse Designations String into an Array
  // "Executive Officer,Deputy General Manager" -> ["Executive Officer", "Deputy General Manager"]
  const designationList = response.designations
    ? response.designations
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-slate-900 text-white pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>

        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-4 backdrop-blur-md border border-white/10">
            <Briefcase className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Project Admin
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Meet the administrative team managing our metro operations.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 pt-12">
        {/* Pass both the member list AND the dynamic filter list */}
        <MetroAdminList
          initialData={initialData}
          dynamicFilters={designationList}
        />
      </div>
    </div>
  );
}
