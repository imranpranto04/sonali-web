"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";

// Replace the paths below with your actual logo files in 'public/partners/'
const PARTNERS = [
  { name: "Rupali Insurance", logo: "/assets/landing/partners/rupali.png" },
  { name: "Ditcl", logo: "/assets/landing/partners/ditcl.png" },
  { name: "City Bank", logo: "/assets/landing/partners/rupali.png" },
  { name: "Dragon", logo: "/assets/landing/partners/dragon.png" },
  { name: "IBN SINA", logo: "/assets/landing/partners/inb-sina.png" },
  { name: "VISA", logo: "/assets/landing/partners/rupali.png" },
  //   { name: "Mastercard", logo: "/partners/mastercard.png" },
  //   { name: "Grameenphone", logo: "/partners/gp.png" },
  //   { name: "MetLife", logo: "/partners/metlife.png" },
  //   { name: "Robi", logo: "/partners/robi.png" },
  //   { name: "Standard Chartered", logo: "/partners/scb.png" },
];

const PartnerSection = () => {
  return (
    <>
      <section className="section_margin bg-white border-t border-slate-100 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [bg-size:20px_20px]" />

        <div className="container relative z-10 pt-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider border border-orange-100 mb-3">
              Trusted Network
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Collaborating with
              <span className="text-orange-500 relative whitespace-nowrap">
                {" "}
                Industry Leaders
              </span>
            </h3>
            <p className="text-slate-500 mt-2 text-sm md:text-base">
              We partner with the nation's top financial institutions to ensure
              maximum security for your investments.
            </p>
          </div>

          {/* Marquee Container */}
          <div className="relative">
            {/* Gradient Masks ("Mist" Effect) */}
            <div className="absolute top-0 left-0 h-full w-24 bg-linear-to-r from-white to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 h-full w-24 bg-linear-to-l from-white to-transparent z-20 pointer-events-none" />

            {/* Infinite Scroll */}
            <Marquee
              gradient={false}
              speed={40}
              pauseOnHover={true}
              className="py-7"
            >
              {PARTNERS.map((partner, index) => (
                <div
                  key={index}
                  className="group relative mx-4 md:mx-8 w-32 h-20 md:w-40 md:h-20 bg-white rounded-xl border border-slate-100 flex items-center justify-center p-4 cursor-pointer hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Next.js Image Component */}
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-auto h-10 object-contain filter group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                  />

                  {/* Tooltip */}
                  <div className="absolute font-bold -bottom-8 left-1/2 -translate-x-1/2 bg-orange-100 text-orange-600 text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
                    {partner.name}
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>
    </>
  );
};

export default PartnerSection;
