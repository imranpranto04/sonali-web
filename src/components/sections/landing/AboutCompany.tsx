import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  HandCoins,
  Handshake,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

function AboutCompany() {
  return (
    <>
      <section className="container section_margin mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Image
              src="/assets/landing/about-us.png"
              alt="About us"
              width={650}
              height={450}
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* RIGHT COLUMN: Content */}
          <div className="flex flex-col space-y-6">
            {/* Headings */}

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-primary"></span>
                <h3 className="text-primary font-bold tracking-widest text-sm uppercase">
                  About Our Company
                </h3>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                Providing the best <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-amber-500">
                  insurance policy
                </span>{" "}
                <br />
                to customers
              </h2>
            </div>

            {/* Description Text */}
            <p className="text-paragraph">
              We understand that protecting your loved ones is your top
              priority. Our comprehensive insurance plans are designed to give
              you peace of mind, ensuring financial stability no matter what
              life brings. Experience transparent policies tailored to your
              unique needs.
            </p>

            {/* Feature Icons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {/* Feature 1 */}
              <div className="flex flex-col sm:items-center sm:text-center gap-3 group">
                <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                  <ShieldCheck className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-semibold text-paragraph leading-tight">
                  Fast & Easy
                  <br />
                  Process
                </h4>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col sm:items-center sm:text-center gap-3 group">
                <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                  <Handshake className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-semibold text-paragraph leading-tight">
                  Control Over
                  <br />
                  Policy
                </h4>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col sm:items-center sm:text-center gap-3 group">
                <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                  <HandCoins className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-semibold text-paragraph leading-tight">
                  Save your
                  <br />
                  Money
                </h4>
              </div>
            </div>

            {/* Checkmark List */}
            <div className="flex items-center gap-3 pt-2">
              <div className="bg-yellow-400 rounded-full p-0.5">
                <CheckCircle2 className="w-5 h-5 text-white fill-yellow-400" />
              </div>
              <span className="text-slate-700 font-medium text-lg">
                7 Days Claim settlement
              </span>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <Button size="lg" className="gap-2 font-semibold">
                Discover More <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutCompany;
