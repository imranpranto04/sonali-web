import { Phone, MapPin, Headphones, Mail, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardSupport() {
  return (
    <>
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        {/* 1. HERO HEADER */}
        <div className="relative bg-slate-900 rounded-3xl p-8 md:p-16 text-white overflow-hidden shadow-xl text-center border border-slate-800">
          {/* Ambient Lights */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs font-bold text-orange-300 uppercase tracking-wider mb-2">
              <Headphones className="w-3 h-3" /> 24/7 Support
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              We are here to <span className="text-orange-400">help.</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-lg max-w-lg mx-auto">
              Contact us for any queries regarding your policy, claims, or
              payments.
            </p>
          </div>
        </div>

        {/* 2. INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
          {/* Phone Card */}
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-8 flex flex-col items-center text-center h-full">
              <div className="w-14 h-14 bg-orange-200 rounded-full flex items-center justify-center text-orange-500 mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Call Us</h3>
              <p className="text-slate-500 text-xs mb-6">
                Speak directly with our agents.
              </p>

              <div className="w-full space-y-2">
                <div className="bg-slate-300 p-3 rounded-lg border border-slate-100 text-slate-700 font-mono font-bold">
                  09678 200004
                </div>
                <div className="bg-slate-300  p-3 rounded-lg border border-slate-100 text-slate-700 font-mono font-bold">
                  +880 1976 625 488
                </div>
                <div className="bg-slate-300  p-3 rounded-lg border border-slate-100 text-slate-700 font-mono font-bold">
                  +880 1976 625 499
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Card */}
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600 rounded-full blur-3xl"></div>
            <CardContent className="p-8 flex flex-col items-center text-center h-full relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-orange-400 mb-6 border border-white/10">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Head Office</h3>
              <p className="text-slate-400 text-xs mb-6">
                Visit us 10 a.m to 6 p.m during office hours.
              </p>

              <div className="bg-white/5 p-5 rounded-xl border border-white/10 w-full text-left">
                <p className="font-medium text-slate-200 text-sm leading-relaxed">
                  68/B D.I.T. Road,
                  <br />
                  Malibagh Chowdhury Para,
                  <br />
                  Dhaka-1219, Bangladesh.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Email Card */}
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-8 flex flex-col items-center text-center h-full">
              <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Email Support
              </h3>
              <p className="text-slate-500 text-xs mb-6">
                We typically reply within 24 hours.
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 w-full mb-4">
                <p className="font-bold text-orange-600 break-all">
                  care@sonalilife.com
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <Globe className="w-3 h-3" /> www.sonalilife.com
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
