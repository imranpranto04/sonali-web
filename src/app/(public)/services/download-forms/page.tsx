import type { Metadata } from "next";
import { getDownloadForms } from "@/lib/api/company-service";
import DownloadFormsView from "@/components/services/DownloadFormsView";

export const metadata: Metadata = {
  title: "Download Forms | Sonali Life Insurance",
  description: "Download official forms, documents, and policy applications.",
};

export default async function DownloadFormsPage() {
  const forms = await getDownloadForms();

  return (
    <div className="min-h-screen bg-slate-50">
      <DownloadFormsView forms={forms} />
    </div>
  );
}
