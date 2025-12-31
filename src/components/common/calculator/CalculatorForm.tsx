// import {
//   ArrowLeft,
//   ArrowRight,
//   Calendar,
//   CheckCircle2,
//   Layers,
//   User,
// } from "lucide-react";
// import React, { useEffect, useState } from "react";

// function CalculatorForm({ onCancel }) {
//   const [step, setStep] = useState(1);
//   const [dob, setDob] = useState("");
//   const [age, setAge] = useState<string | number>("-");
//   const [gender, setGender] = useState("Male");
//   const [policy, setPolicy] = useState("DPS (Deposit Pension Scheme)");
//   const [duration, setDuration] = useState("10");
//   const [sumAssured, setSumAssured] = useState("100000");
//   const [installmentType, setInstallmentType] = useState("Monthly");
//   const [riskCategory, setRiskCategory] = useState("Standard");
//   const [hasSuppPolicy, setHasSuppPolicy] = useState(false);
//   const [premium, setPremium] = useState(0);

//   // Auto-fill Age
//   useEffect(() => {
//     if (dob) {
//       const birthDate = new Date(dob);
//       const today = new Date();
//       let calculatedAge = today.getFullYear() - birthDate.getFullYear();
//       const m = today.getMonth() - birthDate.getMonth();
//       if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//         calculatedAge--;
//       }
//       setAge(calculatedAge);
//     }
//   }, [dob]);

//   // Calculation Logic
//   useEffect(() => {
//     let baseAmount = parseFloat(sumAssured) || 0;
//     let term = parseInt(duration) || 10;
//     let freqDivisor = 12;

//     if (installmentType === "Quarterly") freqDivisor = 4;
//     if (installmentType === "Half-Yearly") freqDivisor = 2;
//     if (installmentType === "Yearly") freqDivisor = 1;

//     let calc = baseAmount / term / freqDivisor;

//     if (typeof age === "number" && age > 35) calc *= 1.1;
//     if (gender === "Female") calc *= 0.98;
//     if (riskCategory === "High") calc *= 1.25;
//     if (riskCategory === "Medium") calc *= 1.1;
//     if (hasSuppPolicy) calc += (500 / freqDivisor) * 12;

//     setPremium(Math.round(calc) || 0);
//   }, [
//     sumAssured,
//     duration,
//     installmentType,
//     age,
//     gender,
//     riskCategory,
//     hasSuppPolicy,
//   ]);

//   const nextStep = () => setStep((s) => Math.min(s + 1, 3));
//   const prevStep = () => setStep((s) => Math.max(s - 1, 1));

//   const labelClasses =
//     "block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2";
//   const inputClasses =
//     "w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all";

//   return (
//     <>
//       <div className="bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[550px] animate-in fade-in zoom-in-95 duration-300">
//         {/* Header */}
//         <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex justify-between items-center">
//           <button
//             onClick={onCancel}
//             className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-xs font-bold uppercase tracking-wide"
//           >
//             <ArrowLeft className="w-3 h-3" /> Cancel
//           </button>
//           <div className="flex gap-1">
//             {[1, 2, 3].map((i) => (
//               <div
//                 key={i}
//                 className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
//                   step >= i ? "bg-orange-500" : "bg-slate-200"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Dynamic Body */}
//         <div className="p-8 grow flex flex-col justify-center" key={step}>
//           {step === 1 && (
//             <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
//               <h3 className="text-2xl font-bold text-slate-800">About You</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div>
//                   <label className={labelClasses}>Date of Birth</label>
//                   <div className="relative">
//                     <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                     <input
//                       type="date"
//                       value={dob}
//                       onChange={(e) => setDob(e.target.value)}
//                       className={`${inputClasses} pl-10`}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className={labelClasses}>Age</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                     <input
//                       type="text"
//                       value={age}
//                       disabled
//                       className={`${inputClasses} pl-10 bg-slate-100 text-slate-400`}
//                     />
//                   </div>
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className={labelClasses}>Gender</label>
//                   <div className="flex gap-3">
//                     {["Male", "Female"].map((g) => (
//                       <button
//                         key={g}
//                         onClick={() => setGender(g)}
//                         className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all ${
//                           gender === g
//                             ? "border-orange-500 bg-orange-50 text-orange-700"
//                             : "border-slate-100 text-slate-500 hover:border-slate-200"
//                         }`}
//                       >
//                         {g}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {step === 2 && (
//             <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
//               <h3 className="text-2xl font-bold text-slate-800">Your Plan</h3>
//               <div className="space-y-5">
//                 <div>
//                   <label className={labelClasses}>Policy Type</label>
//                   <select
//                     value={policy}
//                     onChange={(e) => setPolicy(e.target.value)}
//                     className={inputClasses}
//                   >
//                     <option>DPS (Deposit Pension Scheme)</option>
//                     <option>Endowment Assurance Plan</option>
//                     <option>Child Education Protection</option>
//                   </select>
//                 </div>
//                 <div className="grid grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClasses}>Duration (Years)</label>
//                     <select
//                       value={duration}
//                       onChange={(e) => setDuration(e.target.value)}
//                       className={inputClasses}
//                     >
//                       {[5, 10, 15, 20, 25, 30].map((y) => (
//                         <option key={y} value={y}>
//                           {y} Years
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className={labelClasses}>Sum Assured</label>
//                     <input
//                       type="number"
//                       value={sumAssured}
//                       onChange={(e) => setSumAssured(e.target.value)}
//                       className={inputClasses}
//                       placeholder="100000"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {step === 3 && (
//             <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
//               <h3 className="text-2xl font-bold text-slate-800">Preferences</h3>
//               <div className="grid grid-cols-2 gap-5">
//                 <div>
//                   <label className={labelClasses}>Payment</label>
//                   <select
//                     value={installmentType}
//                     onChange={(e) => setInstallmentType(e.target.value)}
//                     className={inputClasses}
//                   >
//                     <option>Monthly</option>
//                     <option>Quarterly</option>
//                     <option>Yearly</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className={labelClasses}>Risk</label>
//                   <select
//                     value={riskCategory}
//                     onChange={(e) => setRiskCategory(e.target.value)}
//                     className={inputClasses}
//                   >
//                     <option>Standard</option>
//                     <option>High Risk</option>
//                   </select>
//                 </div>
//               </div>

//               <div
//                 className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between cursor-pointer"
//                 onClick={() => setHasSuppPolicy(!hasSuppPolicy)}
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
//                       hasSuppPolicy
//                         ? "bg-orange-100 text-orange-600"
//                         : "bg-slate-200 text-slate-500"
//                     }`}
//                   >
//                     <Layers className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-slate-800">Supplementary</p>
//                     <p className="text-xs text-slate-500">Add extra coverage</p>
//                   </div>
//                 </div>
//                 <div
//                   className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
//                     hasSuppPolicy
//                       ? "bg-orange-500 border-orange-500"
//                       : "border-slate-300"
//                   }`}
//                 >
//                   {hasSuppPolicy && (
//                     <CheckCircle2 className="w-4 h-4 text-white" />
//                   )}
//                 </div>
//               </div>

//               <div className="mt-4 pt-4 border-t border-dashed border-slate-200 flex justify-between items-end">
//                 <div>
//                   <p className="text-xs font-bold text-slate-400 uppercase">
//                     Estimated {installmentType}
//                   </p>
//                   <p className="text-3xl font-extrabold text-slate-900">
//                     ৳ {premium.toLocaleString("en-BD")}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer Navigation */}
//         <div className="bg-slate-50 p-6 flex justify-between items-center border-t border-slate-100">
//           {step > 1 ? (
//             <button
//               onClick={prevStep}
//               className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
//             >
//               <ArrowLeft className="w-4 h-4" /> Back
//             </button>
//           ) : (
//             <div />
//           )}

//           {step < 3 ? (
//             <button
//               onClick={nextStep}
//               className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all flex items-center gap-2"
//             >
//               Next <ArrowRight className="w-4 h-4" />
//             </button>
//           ) : (
//             <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">
//               Apply Now
//             </button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default CalculatorForm;
