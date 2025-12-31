// import { Metadata } from "next";
// import { ShieldCheck } from "lucide-react";
// import { fetchPublicContent } from "@/lib/api/api-server-public";
// import ProductList, { ProductItem } from "@/components/products/ProductList";

// export const metadata: Metadata = {
//   title: "Insurance Products | Sonali Life Insurance",
//   description: "Explore our range of insurance plans tailored for your future.",
// };

// export default async function ProductsPage() {
//   const products = await fetchPublicContent<ProductItem>("Products", {
//     method: "GET",
//     next: { revalidate: 60 },
//   });

//   return (
//     <div className="bg-slate-50 min-h-screen">
//       {/* Improved Hero Section */}
//       <section className="relative bg-slate-900 pt-32 pb-24 overflow-hidden">
//         {/* Abstract Background Mesh */}
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600 rounded-full blur-[120px]" />
//           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
//         </div>

//         {/* Texture Overlay */}
//         <div className="absolute inset-0 opacity-5"></div>

//         <div className="container mx-auto px-4 relative z-10 text-center">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-orange-300 text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
//             <ShieldCheck className="w-3 h-3" /> Sonali Life Products
//           </div>

//           <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
//             Choose Your Protection
//           </h1>

//           <p className="text-slate-400 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
//             Find the perfect insurance plan tailored to your life stage and
//             financial goals.
//           </p>
//         </div>
//       </section>

//       {/* Product List (Overlaps Hero) */}
//       <ProductList products={products} />
//     </div>
//   );
// }

import { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { fetchPublicContent } from "@/lib/api/api-server-public";
import ProductList, { ProductItem } from "@/components/products/ProductList";

export const metadata: Metadata = {
  title: "Insurance Products | Sonali Life Insurance",
  description: "Explore our range of insurance plans tailored for your future.",
};

export default async function ProductsPage() {
  // Ensure your API handles caching correctly
  const products = await fetchPublicContent<ProductItem>("Products", {
    method: "GET",
    next: { revalidate: 60 },
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 pt-32 pb-32 overflow-hidden">
        {/* Abstract Background Mesh */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-600 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]" />
        </div>

        {/* Texture Overlay (Optional noise) */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-md shadow-2xl">
            <ShieldCheck className="w-3 h-3" /> Sonali Life Products
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            Choose Your <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white to-slate-400">
              Future Protection
            </span>
          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-medium">
            Find the perfect insurance plan tailored to your life stage and
            financial goals. Secure tomorrow, today.
          </p>
        </div>
      </section>

      {/* Product List (Overlaps Hero via negative margin) */}
      <ProductList products={products} />
    </div>
  );
}
