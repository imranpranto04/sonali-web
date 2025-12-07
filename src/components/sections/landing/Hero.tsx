import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Award, CalendarDays, Smile } from "lucide-react";
import Image from "next/image";
import { FaAward } from "react-icons/fa";
import { GiLaurelCrown } from "react-icons/gi";
import { FaPeopleRoof } from "react-icons/fa6";
import Consultation from "@/components/sections/landing/Consultation";

const Hero = () => {
  return (
    <>
      <div className="relative z-10 pt-20">
        <div className="absolute left-0 bottom-0 w-full h-full bg-[url('/assets/bg/hero-left-bg.png')] bg-no-repeat -z-10"></div>

        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center justify-between">
            {/* --- 1. LEFT CONTENT COLUMN --- */}

            <div className="space-y-6">
              <div className="flex flex-col">
                {/* Pill Tag */}
                <div className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700 self-start">
                  <Sparkles className="h-4 w-4 mr-2" />A Better life with
                  Sonali, সোনালী জীবন সুখের জীবন
                </div>

                {/* Heading */}
                <h1 className="text-4xl my-8 lg:text-5xl font-extrabold leading-tight text-secondary">
                  Life More Relaxed <br />
                  And Secured With <br />
                  <span className="text-primary">Sonali Life Insurance</span>
                </h1>

                {/* Sub-heading */}
                <p className=" text-lg leading-8 text-paragraph">
                  For over 12 years, we've been protecting families in
                  Bangladesh <br /> with tailored life insurance plans. Get
                  peace of mind today.
                </p>

                {/* Button */}
                <div className="mt-10">
                  <Button
                    size="lg"
                    className="bg-amber-500 hover:bg-orange-500 hover:text-white text-lg font-bold px-8 py-6 rounded-lg"
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>

                {/* Stats Card */}
                <div className="grid grid-cols-3 gap-4 mt-12 bg-white p-6 rounded-2xl border border-amber-500 shadow-[10px_15px_100px_0px_#A7C98540] lg:w-[95%]">
                  {/* Item 1 */}
                  <div className="flex items-center gap-4">
                    <FaAward className="text-4xl text-yellow-600" />
                    <div>
                      <h3 className="text-xl font-bold">12+</h3>
                      <p className="text-gray-600 text-sm">
                        Years Of Experience
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center gap-4">
                    <GiLaurelCrown className="text-4xl text-yellow-600" />
                    <div>
                      <h3 className="text-xl font-bold">20+</h3>
                      <p className="text-gray-600 text-sm">Awards Achieved</p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center gap-4">
                    {/* <IoPeopleCircle className="text-4xl text-green-600" /> */}
                    <FaPeopleRoof className="text-4xl text-yellow-600" />

                    <div>
                      <h3 className="text-xl font-bold">800K+</h3>
                      <p className="text-gray-600 text-sm">Happy Customers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE IMAGES (7 columns) */}
            <div className=" gap-6">
              <Image
                src="/assets/hero/hero-img2.png"
                alt="Sonali hero image"
                width={600}
                height={675}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        <Consultation />
      </div>
    </>
  );
};

export default Hero;
