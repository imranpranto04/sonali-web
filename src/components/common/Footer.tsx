import { Mail, MapPin, Phone, Sprout } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-slate-950 relative overflow-hidden section_margin">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-orange-600 via-amber-500 to-orange-600"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                {/* <div className="w-10 h-10 bg-orange-500 rounded-br-2xl rounded-tl-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Sprout className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-extrabold text-white tracking-tight">
                  Sonali<span className="text-orange-500">Life</span>
                </span> */}
                <Image
                  src="/logo.png"
                  alt="Sonali Life"
                  width={250}
                  height={55}
                />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Trust, Transparency, and Technology. Building a secure future
                for you and your family with Bangladesh's most innovative life
                insurance company.
              </p>
              <div className="flex gap-4">
                {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:text-white transition-all shadow-sm hover:shadow-orange-500/20 hover:-translate-y-1"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                {[
                  "About Us",
                  "Board of Directors",
                  "Management Team",
                  "Annual Reports",
                  "Careers",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-orange-500 transition-all flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-orange-500 transition-colors"></span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        {item}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services/Support */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Support</h4>
              <ul className="space-y-3 text-sm">
                {[
                  "Customer Portal",
                  "Pay Premium",
                  "File a Claim",
                  "Policy Status",
                  "Branch Locator",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-orange-500 transition-all flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-orange-500 transition-colors"></span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        {item}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3 group">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                    <MapPin className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-slate-400 group-hover:text-slate-300 transition-colors">
                    68/B, DIT Road, Malibagh,
                    <br />
                    Dhaka-1219, Bangladesh
                  </span>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                    <Phone className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-slate-400 font-bold hover:text-white cursor-pointer transition-colors">
                    +880 9678 334455
                  </span>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                    <Mail className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">
                    info@sonalilife.com
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Sonali Life Insurance Company
              Limited. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-500 font-medium">
              <a href="#" className="hover:text-orange-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
