import { Award, Lock, Play, Users } from "lucide-react";
import Image from "next/image";

function WhyPreferUs() {
  return (
    <>
      <section className="section_padding w-full" id="why-us">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Video Embed */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video w-full">
              <iframe
                className="w-full h-full absolute inset-0"
                src="https://www.youtube.com/embed/95GPintrbi8?si=DWjcL1_mQ-f2vcEO"
                title="Sonali Life Insurance Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>

            {/* Right: Text Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-extrabold text-secondary">
                  Why Prefer{" "}
                  <span className="text-primary relative">
                    Sonali Life?
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
                <p className="text-lg text-slate-600 font-medium leading-relaxed italic border-l-4 border-primary pl-4">
                  "Whatever life holds, we are here to help you live it with
                  confidence."
                </p>
              </div>

              <div className="space-y-6">
                {/* Feature 1: Security */}
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <Lock className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-secondary">
                      Keeping your Data Safe
                    </h3>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                      We use state-of-the-art encryption to ensure your personal
                      and financial information remains private and secure.
                    </p>
                  </div>
                </div>

                {/* Feature 2: Awards */}
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition-colors duration-300">
                    <Award className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-secondary">
                      Award Winning Service
                    </h3>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                      Recognized nationally for excellence in claim settlement
                      ratio and customer satisfaction.
                    </p>
                  </div>
                </div>

                {/* Feature 3: Support */}
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0 group-hover:bg-green-500 transition-colors duration-300">
                    <Users className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-secondary">
                      Customer First Approach
                    </h3>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                      Dedicated support agents available 24/7 to assist you with
                      policy queries and claims.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyPreferUs;
