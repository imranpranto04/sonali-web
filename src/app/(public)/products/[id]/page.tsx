import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchPublicContent } from "@/lib/api/api-server-public";
import ProductDetailsView, {
  ProductDetailItem,
} from "@/components/products/ProductDetailsView";
import { ArrowLeft } from "lucide-react";

// Standard Fetch Helper for Details
async function getProductDetails(id: number) {
  // Using fetchPublicContent assuming it handles POST bodies correctly
  // If your helper supports generics, great. If not, use standard fetch.
  // Here I use standard fetch to be safe given the POST body requirement.
  try {
    const res = await fetch(
      "https://www.sonalilife.com:1010/api/Webdata/ProductDetails",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
        next: { revalidate: 0 }, // Always fresh data for details
      }
    );

    if (!res.ok) return null;
    const json = await res.json();
    // The API returns an array, we take the first item
    return json.data && json.data.length > 0
      ? (json.data[0] as ProductDetailItem)
      : null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductDetails(Number(id));
  return {
    title: product ? `${product.PolicyName} | Sonali Life` : "Product Details",
    description: "Detailed policy information.",
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productData = await getProductDetails(Number(id));

  if (!productData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Product Not Found
        </h2>
        <Link href="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-24">
      <div className="container mx-auto px-4">
        {/* Breadcrumb / Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center text-slate-500 hover:text-orange-600 mb-8 transition-colors text-sm font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Products
        </Link>

        {/* Main Client View */}
        <ProductDetailsView data={productData} />
      </div>
    </div>
  );
}
