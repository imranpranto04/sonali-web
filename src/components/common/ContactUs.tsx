import { Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";

const ContactUs = () => {
  return (
    <>
      <section className="section_margin bg-slate-50" id="contact">
        <div className="container">
          <div className="relative w-full max-w-5xl mx-auto rounded-3xl shadow-2xl shadow-slate-200/50 bg-white overflow-hidden flex flex-col lg:flex-row">
            {/* LEFT: Contact Info */}
            <div className="lg:w-5/12 bg-secondary text-white p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-orange-400 text-[10px] font-bold uppercase tracking-wider mb-4">
                  <MessageSquare className="w-3 h-3" /> Get in touch
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">
                  Let's discuss your <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-200">
                    Financial Future.
                  </span>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Have questions about a policy? Our team is ready to help 24/7.
                </p>

                <div className="space-y-5">
                  <div className="flex items-start gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Head Office</h4>
                      <p className="text-slate-400 text-xs mt-0.5">
                        68/B, DIT Road, Malibagh,
                        <br />
                        Dhaka-1219, Bangladesh
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Call Us</h4>
                      <p className="text-orange-400 font-bold text-sm mt-0.5">
                        +880 9678 334455
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Email Us</h4>
                      <p className="text-white font-bold text-sm mt-0.5">
                        info@sonalilife.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div className="lg:w-7/12 bg-white p-8 lg:p-10">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Send us a message
              </h3>
              {/* onSubmit={(e) => e.preventDefault()} */}
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                  />
                </div>

                {/* CHANGED: Subject -> Mobile Number */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="+880 1XXX XXXXXX"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="How can we help you today?"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <button className="w-full bg-linear-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group text-sm">
                  Send Message{" "}
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
