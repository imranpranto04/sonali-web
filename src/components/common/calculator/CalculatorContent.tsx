import {
  ArrowRight,
  Coins,
  RefreshCcw,
  Shield,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const CalculatorContent = () => {
  return (
    <>
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl p-8 md:p-12 min-h-[500px] flex flex-col justify-center items-center text-center animate-in fade-in zoom-in-95 duration-500">
        {/* <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <RefreshCcw className="w-10 h-10 text-orange-600" />
        </div> */}

        <h3 className="text-3xl font-extrabold mb-4">Calculate Your Future</h3>
        <p className="text-slate-500 max-w-md mb-8">
          Curious about your returns? See how a small monthly deposit can grow
          into a secure future for your family.
        </p>

        <div className="grid grid-cols-3 gap-4 w-full mb-10">
          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50">
            <Shield className="w-6 h-6 text-blue-600" />
            <span className="text-xs font-bold text-slate-700">Tax Rebate</span>
          </div>

          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <span className="text-xs font-bold text-slate-700">
              High Return
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50">
            <Coins className="w-6 h-6 text-orange-600" />
            <span className="text-xs font-bold text-slate-700">Low Cost</span>
          </div>
        </div>

        <Link href="/services/calculator">
          <button className="w-full max-w-xs bg-orange-500 text-white py-3 px-5 rounded-xl font-bold text-base shadow-xl shadow-orange-500/20 hover:scale-105 hover:bg-orange-600 transition-all flex items-center justify-center gap-2 cursor-pointer">
            Start Calculation <ArrowRight className="w-5 h-5" />
          </button>
        </Link>

        <p className="mt-4 text-xs text-slate-400">
          Takes less than 30 seconds
        </p>
      </div>
    </>
  );
};

export default CalculatorContent;
