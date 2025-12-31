// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Home, ArrowLeft, LifeBuoy, Phone } from "lucide-react";

// export default function NotFound() {
//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden">
//       {/* Background Abstract Shapes (Subtle Premium Feel) */}
//       <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

//       <div className="relative z-10 max-w-md w-full px-6 text-center">
//         {/* 1. Large 404 Text */}
//         <h1 className="text-[8rem] font-bold leading-none text-slate-200 select-none">
//           404
//         </h1>

//         {/* 2. Message Card */}
//         <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl p-8 -mt-12 relative">
//           <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
//             <LifeBuoy className="w-8 h-8" />
//           </div>

//           <h2 className="text-2xl font-bold text-slate-800 mb-2">
//             Page Not Found
//           </h2>
//           <p className="text-slate-500 mb-8 leading-relaxed">
//             Sorry, we couldn't find the page you're looking for. It might have
//             been moved, deleted, or the link is incorrect.
//           </p>

//           {/* 3. Action Buttons */}
//           <div className="flex flex-col gap-3">
//             <Button
//               asChild
//               size="lg"
//               className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20"
//             >
//               <Link href="/">
//                 <Home className="w-4 h-4 mr-2" />
//                 Return Home
//               </Link>
//             </Button>

//             <Button
//               asChild
//               variant="outline"
//               size="lg"
//               className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-bold rounded-xl"
//             >
//               <Link href="/contact">
//                 <Phone className="w-4 h-4 mr-2" />
//                 Contact Support
//               </Link>
//             </Button>
//           </div>
//         </div>

//         {/* 4. Footer Link */}
//         <div className="mt-8">
//           <button
//             onClick={() => window.history.back()}
//             className="text-sm font-medium text-slate-400 hover:text-orange-500 flex items-center justify-center gap-2 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Go Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Home,
  Search,
  ArrowRight,
  CreditCard,
  UserCircle,
  FileText,
  ShieldQuestion,
  ArrowLeft,
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] relative overflow-hidden p-4">
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />{" "}
      {/* Optional grid texture */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* --- MAIN CARD --- */}
        <div className="bg-white/80 backdrop-blur-2xl border border-white/50 shadow-2xl shadow-slate-200/50 rounded-4xl overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            {/* 404 Text Gradient */}
            <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-linear-to-br from-red-200 to-red-400 select-none leading-none mb-2">
              404
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">
              Page Not Found
            </h2>
            {/* <p className="text-slate-500 max-w-md mx-auto mb-8 text-base leading-relaxed">
              We can't seem to find the page you're looking for. It might have
              been moved or doesn't exist anymore.
            </p> */}

            <div className="h-px w-full bg-slate-100 mb-8" />

            <div className="flex justify-center mb-7">
              <button
                onClick={() => window.history.back()}
                className="text-md font-bold cursor-pointer text-orange-400 hover:text-orange-500 flex items-center justify-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </div>

            {/* --- HELPFUL LINKS GRID --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {/* Option 1: Go Home */}
              <Link
                href="/"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all bg-white shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    Return Home
                  </h3>
                  <p className="text-xs text-slate-400">
                    Go back to the beginning
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-orange-500 transition-colors" />
              </Link>

              {/* Option 2: Pay Premium */}
              <Link
                href="/pay-premium"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all bg-white shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    Pay Premium
                  </h3>
                  <p className="text-xs text-slate-400">Pay your policy bill</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-blue-500 transition-colors" />
              </Link>

              {/* Option 3: Client Login */}
              <Link
                href="/login"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-green-200 hover:bg-green-50/50 transition-all bg-white shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <UserCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    Client Login
                  </h3>
                  <p className="text-xs text-slate-400">
                    Access your dashboard
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-green-500 transition-colors" />
              </Link>

              {/* Option 4: Help & Support */}
              <Link
                href="/contact"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all bg-white shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldQuestion className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    Help Center
                  </h3>
                  <p className="text-xs text-slate-400">Contact our support</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-purple-500 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
            <p className="text-xs text-slate-400 font-medium">
              Need urgent assistance? Call us at{" "}
              <span className="text-slate-600 font-bold hover:underline cursor-pointer">
                16612
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
