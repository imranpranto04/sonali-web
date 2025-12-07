// Import the type from your card component

import DynamicContent from "@/components/common/DynamicContent";
import { ShariahItem } from "@/components/sections/ShariahCard";
import { fetchPublicContent } from "@/lib/api/api-server-public";

export default async function ShariahPage() {
  // One line to fetch data!
  const initialData = await fetchPublicContent<ShariahItem>("shariah");

  return (
    <div className="container mx-auto px-4 py-20">
      {/* <h1>Shariah Council</h1> */}

      {/* The Wrapper does the rest! */}
      <DynamicContent apiType="shariah" initialData={initialData} />
    </div>
  );
}
