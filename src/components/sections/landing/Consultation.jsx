import { Button } from "@/components/ui/button";

function Consultation() {
  return (
    <>
      <section className="container mt-15">
        <div className="">
          {/* THE CARD CONTAINER 
           - rounded-3xl: Modern, soft corners
           - overflow-hidden: Keeps the gradient contained
        */}
          <div className="relative overflow-hidden rounded-3xl px-6 py-12 lg:px-16 lg:py-16">
            {/* 🎨 BACKGROUND SUGGESTION: "Soft Sunrise"
             - bg-gradient-to-r: Gradient flows Left to Right
             - from-orange-50: Starts with a very pale warm orange
             - via-white: Transitions through white (keeps it clean)
             - to-teal-50: Ends with a very pale cool teal/blue
             This creates that "fresh" look perfect for insurance/health.
          */}
            <div className="absolute inset-0 bg-linear-to-r from-orange-100/80 via-white to-teal-100/80 z-0 pointer-events-none" />

            {/* CONTENT WRAPPER (z-10 to sit on top of background) */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 text-center lg:text-left">
              {/* Left Side: Text */}
              <div className="flex flex-col gap-4 max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary">
                  Get Immediate{" "}
                  <span className="text-primary">Free Consultation!</span>
                </h2>
                <p className="">
                  This online plan advisor help you to choose appropriate plan.
                  Tell us a little about you and we will guide you to get the
                  best plan.
                </p>
              </div>

              {/* Right Side: Button */}
              <div className="shrink-0">
                <Button
                  size="lg"
                  className="bg-amber-500 text-white font-bold text-lg px-8 py-6 shadow-lg shadow-orange-500/20 transition-all hover:scale-105 w-full sm:w-auto"
                >
                  Get Your Free Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Consultation;
