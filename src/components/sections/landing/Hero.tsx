// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { ArrowRight, Sparkles, Award, CalendarDays, Smile } from "lucide-react";
// import Image from "next/image";
// import { FaAward } from "react-icons/fa";
// import { GiLaurelCrown } from "react-icons/gi";
// import { FaPeopleRoof } from "react-icons/fa6";
// import Consultation from "@/components/sections/landing/Consultation";

// const Hero = () => {
//   return (
//     <>
//       <div className="relative z-10 pt-20">
//         <div className="absolute left-0 bottom-0 w-full h-full bg-[url('/assets/bg/hero-left-bg.png')] bg-no-repeat -z-10"></div>

//         <div className="container">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center justify-between">
//             {/* --- 1. LEFT CONTENT COLUMN --- */}

//             <div className="space-y-6">
//               <div className="flex flex-col">
//                 {/* Pill Tag */}
//                 <div className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700 self-start">
//                   <Sparkles className="h-4 w-4 mr-2" /> সোনালী জীবন সুখের জীবন
//                 </div>

//                 {/* Heading */}
//                 <h1 className="text-4xl my-8 lg:text-5xl font-extrabold leading-tight text-secondary">
//                   Life More Relaxed <br />
//                   And Secured With <br />
//                   <span className="text-primary">Sonali Life Insurance</span>
//                 </h1>

//                 {/* Sub-heading */}
//                 <p className=" text-lg leading-8 text-paragraph">
//                   For over 12 years, we've been protecting families in
//                   Bangladesh <br /> with tailored life insurance plans. Get
//                   peace of mind today.
//                 </p>

//                 {/* Button */}
//                 <div className="mt-10">
//                   {/* <Button
//                     size="lg"
//                     className="bg-amber-500 hover:bg-orange-500 hover:text-white text-lg font-bold px-8 py-6 rounded-lg"
//                   >
//                     Learn more
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </Button> */}
//                   <Button
//                     variant="gold"
//                     size="pill"
//                     // className="bg-amber-500 hover:bg-orange-500 hover:text-white text-lg font-bold px-8 py-6 rounded-lg"
//                   >
//                     Learn more
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </Button>
//                 </div>

//                 {/* Stats Card */}
//                 <div className="grid grid-cols-3 gap-4 mt-12 bg-white p-6 rounded-2xl border border-amber-500 shadow-[10px_15px_100px_0px_#A7C98540] lg:w-[95%]">
//                   {/* Item 1 */}
//                   <div className="flex items-center gap-4">
//                     <FaAward className="text-4xl text-yellow-600" />
//                     <div>
//                       <h3 className="text-xl font-bold">12+</h3>
//                       <p className="text-gray-600 text-sm">
//                         Years Of Experience
//                       </p>
//                     </div>
//                   </div>

//                   {/* Item 2 */}
//                   <div className="flex items-center gap-4">
//                     <GiLaurelCrown className="text-4xl text-yellow-600" />
//                     <div>
//                       <h3 className="text-xl font-bold">20+</h3>
//                       <p className="text-gray-600 text-sm">Awards Achieved</p>
//                     </div>
//                   </div>

//                   {/* Item 3 */}
//                   <div className="flex items-center gap-4">
//                     {/* <IoPeopleCircle className="text-4xl text-green-600" /> */}
//                     <FaPeopleRoof className="text-4xl text-yellow-600" />

//                     <div>
//                       <h3 className="text-xl font-bold">800K+</h3>
//                       <p className="text-gray-600 text-sm">Happy Customers</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT SIDE IMAGES (7 columns) */}
//             <div className=" gap-6">
//               <Image
//                 src="/assets/hero/hero-img2.png"
//                 alt="Sonali hero image"
//                 width={600}
//                 height={675}
//                 className="w-full h-auto object-cover"
//               />
//             </div>
//           </div>
//         </div>

//         <Consultation />
//       </div>
//     </>
//   );
// };

// export default Hero;

"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { FaAward } from "react-icons/fa";
import { GiLaurelCrown } from "react-icons/gi";
import { FaPeopleRoof } from "react-icons/fa6";
import Consultation from "@/components/sections/landing/Consultation";
import { useHeroContent } from "@/hooks/content/use-hero-content"; // Import the hook

const Hero = () => {
  // 1. Get the content based on current language
  const content = useHeroContent();

  return (
    <>
      <div className="relative z-10 pt-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute left-0 bottom-0 w-full h-full bg-[url('/assets/bg/hero-left-bg.png')] bg-no-repeat -z-10 opacity-50"></div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* --- 1. LEFT CONTENT COLUMN --- */}
            <div className="space-y-8">
              <div className="flex flex-col items-start">
                {/* Pill Tag (Updated Colors) */}
                <div className="inline-flex items-center rounded-full bg-brand/5 border border-brand/10 px-4 py-2 text-sm font-bold text-brand self-start">
                  <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
                  {content.pill}
                </div>

                {/* Heading (Dynamic) */}
                <h1 className="text-4xl mt-6 mb-6 lg:text-6xl font-extrabold leading-[1.15] text-brand">
                  {content.title.line1} <br />
                  {content.title.line2} <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">
                    {content.title.highlight}
                  </span>
                </h1>

                {/* Sub-heading (Dynamic) */}
                <p className="text-lg leading-relaxed text-slate-600 max-w-xl">
                  {content.description}
                </p>

                {/* Button (Using your new 'gold' variant) */}
                <div className="mt-10">
                  <Button
                    variant="gold"
                    size="pill" // Using the size we added earlier
                    className="gap-2 text-base"
                  >
                    {content.cta}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>

                {/* Stats Card (Premium Design) */}
                <div className="grid grid-cols-3 gap-6 mt-12 bg-white p-8 rounded-2xl border border-amber-100 shadow-[0_20px_50px_-12px_rgba(245,158,11,0.15)] w-full lg:w-[105%] relative z-20">
                  {/* Item 1 */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="p-3 rounded-full bg-amber-50 text-amber-500">
                      <FaAward className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-brand">12+</h3>
                      <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">
                        {content.stats.exp}
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-l border-slate-100 pl-4">
                    <div className="p-3 rounded-full bg-amber-50 text-amber-500">
                      <GiLaurelCrown className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-brand">20+</h3>
                      <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">
                        {content.stats.awards}
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-l border-slate-100 pl-4">
                    <div className="p-3 rounded-full bg-amber-50 text-amber-500">
                      <FaPeopleRoof className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-brand">800K+</h3>
                      <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">
                        {content.stats.customers}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- 2. RIGHT IMAGE COLUMN --- */}
            <div className="relative">
              {/* Background Glow Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl -z-10" />

              <Image
                src="/assets/hero/hero-img2.png"
                alt="Sonali Life Hero"
                width={600}
                height={675}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* You can pass the same language logic to this component if needed */}
        <Consultation />
      </div>
    </>
  );
};

export default Hero;
