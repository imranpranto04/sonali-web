import ProductCard from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  GraduationCap,
  Shield,
  HeartHandshake,
} from "lucide-react";

// --- TYPES ---
interface InsurancePlan {
  id: string;
  title: string;
  image: string;
  headline: string;
  description: string;
  icon?: React.ReactNode; // Optional icon for visual flair
}

// --- DATA ---
const PLANS: InsurancePlan[] = [
  {
    id: "p1",
    title: "Family Protection Plan",
    // Using high-quality Unsplash placeholders.
    // For local images: import img1 from '@/assets/img1.jpg' and use that variable here.
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop",
    headline: "Comprehensive Family Cover",
    description:
      "Protect your loved ones' financial future with complete life coverage up to BDT 1 Crore. Peace of mind starts here.",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: "p2",
    title: "Child Education Plan",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
    headline: "Secure Their Education",
    description:
      "Guaranteed payouts for higher studies ensuring your child's dreams never have to wait. Flexible premium options available.",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    id: "p3",
    title: "Retirement Pension Plan",
    image:
      "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=2070&auto=format&fit=crop",
    headline: "Worry-Free Retirement",
    description:
      "Build a steady income stream for your golden years. Enjoy financial independence with our monthly pension scheme.",
    icon: <HeartHandshake className="w-5 h-5" />,
  },
];

function HomeProducts() {
  return (
    <>
      <section className="w-full section_padding bg-slate-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-300 to-transparent" />
        <div className="absolute -left-20 top-40 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -right-20 bottom-40 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-secondary tracking-tight">
              Secure Your Future with{" "}
              <span className="text-primary relative whitespace-nowrap">
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

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {PLANS.map((plan) => (
              <ProductCard key={plan.id} plan={plan} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-orange-600 hover:bg-orange-500 hover:text-white"
            >
              See All Products <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeProducts;
