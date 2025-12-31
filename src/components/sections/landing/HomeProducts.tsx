import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchPublicContent } from "@/lib/api/api-server-public";
import ProductCard, { ProductItem } from "@/components/common/ProductCard";

export default async function HomeProducts() {
  // 1. Fetch Real Data
  const products = await fetchPublicContent<ProductItem>("Products", {
    method: "GET",
    next: { revalidate: 60 },
  });

  // 2. Take only the first 3 items
  const featuredProducts = products.slice(0, 3);

  return (
    <section className="w-full py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-300 to-transparent" />
      <div className="absolute -left-20 top-40 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute -right-20 bottom-40 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Secure Your Future with{" "}
            <span className="text-orange-600 relative whitespace-nowrap">
              Our Plans
              {/* Underline Scribble */}
              <svg
                className="absolute w-[110%] h-3 -bottom-2 -left-1 text-amber-500/30"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose from our range of tailored insurance products designed to
            support you at every stage of life.
          </p>
        </div>

        {/* Real Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {featuredProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 flex justify-center">
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="border-orange-200 text-orange-600 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all duration-300 rounded-full px-8"
            >
              See All Products <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
