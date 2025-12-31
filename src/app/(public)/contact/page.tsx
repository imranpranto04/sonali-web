import { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Sonali Life Insurance",
  description: "Get in touch with our team for support and inquiries.",
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* --- 1. HEADER SECTION --- */}
      <section className="bg-slate-900 pt-24 pb-32 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            Let's Start a <span className="text-amber-500">Conversation</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-lg font-medium leading-relaxed">
            We're here to help you secure your future. Reach out to us for
            personalized assistance.
          </p>
        </div>
      </section>

      {/* --- 2. MAIN SPLIT CARD --- */}
      <section className="container relative z-20 -mt-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col lg:flex-row ">
          {/* === LEFT PANEL: IMAGE & INFO (40%) === */}
          <div className="relative lg:w-2/5 bg-slate-900 p-8 md:p-12 flex flex-col justify-between min-h-[500px] lg:min-h-full overflow-hidden group">
            {/* Background Image */}
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
              alt="Sonali Life Office"
              fill
              className="object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/60 to-slate-900/30" />

            {/* Content (Z-Index ensures it sits above image) */}
            <div className="relative z-10">
              <h2 className="text-white text-2xl font-bold mb-2">
                Contact Information
              </h2>
              <p className="text-slate-300 mb-8 text-sm">
                Find us at our headquarters or reach out directly.
              </p>

              <div className="space-y-4">
                {/* Address Card */}
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-start gap-4 hover:bg-white/15 transition-colors">
                  <div className="bg-amber-500/20 p-2.5 rounded-xl text-amber-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Head Office
                    </h3>
                    <p className="text-white text-sm font-medium leading-relaxed">
                      68/B, DIT Road, Malibagh,
                      <br /> Dhaka-1219, Bangladesh
                    </p>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-start gap-4 hover:bg-white/15 transition-colors">
                  <div className="bg-blue-500/20 p-2.5 rounded-xl text-blue-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Call Us
                    </h3>
                    <a
                      href="tel:+8809678334455"
                      className="text-white text-base font-bold hover:text-blue-300 transition-colors"
                    >
                      +880 9678 334455
                    </a>
                  </div>
                </div>

                {/* Email Card */}
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-start gap-4 hover:bg-white/15 transition-colors">
                  <div className="bg-green-500/20 p-2.5 rounded-xl text-green-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Email Us
                    </h3>
                    <a
                      href="mailto:info@sonalilife.com"
                      className="text-white text-base font-bold hover:text-green-300 transition-colors"
                    >
                      info@sonalilife.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Brand Mark */}
            <div className="relative z-10 mt-12 flex items-center gap-2 text-amber-500 font-bold text-sm">
              <div className="h-px w-8 bg-amber-500/50"></div>
              Sonali Life
            </div>
          </div>

          {/* === RIGHT PANEL: THE FORM (60%) === */}
          <div className="lg:w-3/5 p-8 md:p-14 bg-white">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Send a Message
              </h2>
              <p className="text-slate-500 mb-8 text-sm md:text-base">
                Fill out the form below and our team will get back to you within
                24 hours.
              </p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      className="peer w-full border-b border-slate-200 py-3 text-slate-900 focus:border-amber-500 focus:outline-none bg-transparent transition-colors placeholder-transparent pt-5"
                      placeholder="John Doe"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 top-3 text-slate-400 text-xs font-bold uppercase tracking-wider transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-amber-600"
                    >
                      Full Name
                    </label>
                  </div>

                  {/* Phone Input */}
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      className="peer w-full border-b border-slate-200 py-3 text-slate-900 focus:border-amber-500 focus:outline-none bg-transparent transition-colors placeholder-transparent pt-5"
                      placeholder="+880"
                    />
                    <label
                      htmlFor="phone"
                      className="absolute left-0 top-3 text-slate-400 text-xs font-bold uppercase tracking-wider transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-amber-600"
                    >
                      Phone Number
                    </label>
                  </div>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className="peer w-full border-b border-slate-200 py-3 text-slate-900 focus:border-amber-500 focus:outline-none bg-transparent transition-colors placeholder-transparent pt-5"
                    placeholder="john@example.com"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 top-3 text-slate-400 text-xs font-bold uppercase tracking-wider transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-amber-600"
                  >
                    Email Address
                  </label>
                </div>

                {/* Message Input */}
                <div className="relative">
                  <textarea
                    id="message"
                    rows={4}
                    className="peer w-full border-b border-slate-200 py-3 text-slate-900 focus:border-amber-500 focus:outline-none bg-transparent transition-colors placeholder-transparent pt-5 resize-none"
                    placeholder="Your message..."
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-0 top-3 text-slate-400 text-xs font-bold uppercase tracking-wider transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-amber-600"
                  >
                    Your Message
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="group relative inline-flex items-center justify-start overflow-hidden rounded-xl bg-slate-900 px-8 py-4 font-bold text-white transition-all hover:bg-amber-500"
                  >
                    <span className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-amber-500/30"></span>
                    <span className="relative flex items-center gap-2">
                      Send Message
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. MAP SECTION --- */}
      <section className="container mx-auto px-4 mt-16">
        <div className="h-[350px] rounded-[2.5rem] overflow-hidden grayscale-25 hover:grayscale-0 transition-all duration-500 border border-slate-200 shadow-sm hover:shadow-xl">
          <iframe
            // Points to Malibagh, Dhaka (Approx Coordinates)
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8326790439355!2d90.41244037570168!3d23.753345388662503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b87cf947f293%3A0x45bf8b19abfe0f4!2sSonali%20Life%20Insurance%20Company%20Limited!5e0!3m2!1sen!2sbd!4v1766485693644!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full bg-slate-100"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
