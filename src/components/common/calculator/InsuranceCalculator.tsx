// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Calculator,
//   RefreshCcw,
//   Calendar,
//   User,
//   ArrowRight,
//   ArrowLeft,
//   CheckCircle2,
//   TrendingUp,
//   Shield,
//   Coins,
//   Layers,
//   AlertCircle,
// } from "lucide-react";
// import { useCalculatorOptions } from "@/hooks/use-calculator";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";

// // --- LOGIC HELPERS ---

// const INSTALLMENT_MODES = [
//   { label: "Monthly", factor: 0.0925, name: "Monthly" },
//   { label: "Quarterly", factor: 0.275, name: "Quarterly" },
//   { label: "Half-Yearly", factor: 0.525, name: "Half-Yearly" },
//   { label: "Yearly", factor: 1.0, name: "Yearly" },
// ];

// const calculateAge = (dob: string): number => {
//   if (!dob) return 0;
//   const birthDate = new Date(dob);
//   const today = new Date();
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const m = today.getMonth() - birthDate.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   return age;
// };

// // --- FORM COMPONENT ---

// function CalculatorForm({ onCancel }: { onCancel: () => void }) {
//   const { data: options, isLoading } = useCalculatorOptions();

//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     dob: "",
//     age: 0,
//     gender: "Male",
//     policyId: "", // Selected Policy ID
//     term: "", // Selected Term
//     sumAssured: 100000,
//     mode: "Yearly",
//     suppIds: [] as string[], // Selected Riders
//   });

//   const [result, setResult] = useState<number | null>(null);
//   const [error, setError] = useState("");

//   // 1. Auto-Calculate Age
//   useEffect(() => {
//     if (formData.dob) {
//       setFormData((prev) => ({ ...prev, age: calculateAge(prev.dob) }));
//     }
//   }, [formData.dob]);

//   // 2. Derive Available Terms based on selected Policy
//   const availableTerms = useMemo(() => {
//     if (!options || !formData.policyId) return [];
//     const policy = options.policyNames.find(
//       (p) => p.policyId.toString() === formData.policyId
//     );
//     if (!policy) return [];

//     // Parse "3" or "5,10,15" or "10-20" if complex. Assuming simple CSV or single value from your example.
//     if (policy.termOfYears.includes(",")) {
//       return policy.termOfYears.split(",").map((t) => t.trim());
//     }
//     return [policy.termOfYears];
//   }, [options, formData.policyId]);

//   // 3. Calculation Handler (Frontend Logic based on your C# file)
//   const handleCalculate = () => {
//     setError("");

//     // Validation
//     if (formData.age < 18 || formData.age > 55) {
//       setError("Age must be between 18 and 55.");
//       return;
//     }
//     if (formData.sumAssured < 30000 || formData.sumAssured > 10000000) {
//       setError("Sum Assured must be between 30,000 and 1 Crore.");
//       return;
//     }

//     const modeFactor =
//       INSTALLMENT_MODES.find((m) => m.name === formData.mode)?.factor || 1;

//     // Base Rate Assumption (Since we don't have the full SQL DB in frontend)
//     // In a real app, you would POST to /Api/Calculator/AmountCalculate to get the exact premium.
//     // Here we simulate it for the UI demo.
//     const assumedRatePer1000 = 45;

//     let basicPremium = (formData.sumAssured * assumedRatePer1000) / 1000;

//     // Supplementary (Rider) Logic
//     let suppPremium = 0;
//     if (formData.suppIds.length > 0) {
//       suppPremium = (formData.sumAssured * 5) / 1000; // Mock rate
//     }

//     let totalPremium = (basicPremium + suppPremium) * modeFactor;

//     // Gender Discount
//     if (formData.gender === "Female") totalPremium *= 0.98;

//     setResult(Math.round(totalPremium));
//   };

//   const nextStep = () => setStep((s) => s + 1);
//   const prevStep = () => setStep((s) => s - 1);

//   if (isLoading)
//     return <div className="p-10 text-center">Loading Calculator...</div>;

//   return (
//     <div className="bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[500px]">
//       {/* Header */}
//       <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex justify-between items-center">
//         <button
//           onClick={onCancel}
//           className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-xs font-bold uppercase tracking-wide"
//         >
//           <ArrowLeft className="w-3 h-3" /> Cancel
//         </button>
//         <div className="flex gap-1">
//           {[1, 2, 3].map((i) => (
//             <div
//               key={i}
//               className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
//                 step >= i ? "bg-orange-500" : "bg-slate-200"
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Body */}
//       <div className="p-8 flex-grow flex flex-col justify-center">
//         {/* STEP 1: Personal */}
//         {step === 1 && (
//           <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
//             <h3 className="text-2xl font-bold text-slate-800">
//               Personal Details
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div className="space-y-2">
//                 <Label>Date of Birth</Label>
//                 <Input
//                   type="date"
//                   value={formData.dob}
//                   onChange={(e) =>
//                     setFormData({ ...formData, dob: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Calculated Age</Label>
//                 <Input value={formData.age} disabled className="bg-slate-100" />
//               </div>
//               <div className="md:col-span-2 space-y-2">
//                 <Label>Gender</Label>
//                 <div className="flex gap-3">
//                   {["Male", "Female"].map((g) => (
//                     <button
//                       key={g}
//                       onClick={() => setFormData({ ...formData, gender: g })}
//                       className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all ${
//                         formData.gender === g
//                           ? "border-orange-500 bg-orange-50 text-orange-700"
//                           : "border-slate-100 text-slate-500 hover:border-slate-200"
//                       }`}
//                     >
//                       {g}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <Button
//               onClick={nextStep}
//               className="w-full bg-slate-900 text-white mt-4"
//             >
//               Next Step <ArrowRight className="w-4 h-4 ml-2" />
//             </Button>
//           </div>
//         )}

//         {/* STEP 2: Policy Selection */}
//         {step === 2 && (
//           <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
//             <h3 className="text-2xl font-bold text-slate-800">Choose Plan</h3>
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label>Policy Plan</Label>
//                 <Select
//                   onValueChange={(val) =>
//                     setFormData({ ...formData, policyId: val })
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a Policy" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {options?.policyNames.map((p) => (
//                       <SelectItem
//                         key={p.policyId}
//                         value={p.policyId.toString()}
//                       >
//                         {p.policyName}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label>Sum Assured (৳)</Label>
//                   <Input
//                     type="number"
//                     value={formData.sumAssured}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         sumAssured: parseInt(e.target.value),
//                       })
//                     }
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label>Term (Years)</Label>
//                   <Select
//                     onValueChange={(val) =>
//                       setFormData({ ...formData, term: val })
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select Term" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {availableTerms.length > 0 ? (
//                         availableTerms.map((y) => (
//                           <SelectItem key={y} value={y}>
//                             {y} Years
//                           </SelectItem>
//                         ))
//                       ) : (
//                         <SelectItem value="0" disabled>
//                           Select Policy First
//                         </SelectItem>
//                       )}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               {/* Supplementary Options */}
//               <div className="space-y-2">
//                 <Label>Supplementary Riders</Label>
//                 <div className="flex flex-wrap gap-2">
//                   {options?.subPolicyNames.map((sub) => (
//                     <div
//                       key={sub.id}
//                       className="flex items-center space-x-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200"
//                     >
//                       <Checkbox
//                         id={`rider-${sub.id}`}
//                         onCheckedChange={(checked) => {
//                           if (checked)
//                             setFormData({
//                               ...formData,
//                               suppIds: [...formData.suppIds, sub.id.toString()],
//                             });
//                           else
//                             setFormData({
//                               ...formData,
//                               suppIds: formData.suppIds.filter(
//                                 (id) => id !== sub.id.toString()
//                               ),
//                             });
//                         }}
//                       />
//                       <label
//                         htmlFor={`rider-${sub.id}`}
//                         className="text-sm font-medium leading-none cursor-pointer"
//                       >
//                         {sub.subPolicyName}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="flex gap-3 mt-6">
//               <Button variant="outline" onClick={prevStep} className="flex-1">
//                 Back
//               </Button>
//               <Button
//                 onClick={() => {
//                   handleCalculate();
//                   nextStep();
//                 }}
//                 className="flex-1 bg-slate-900 text-white"
//               >
//                 Calculate
//               </Button>
//             </div>
//           </div>
//         )}

//         {/* STEP 3: Result */}
//         {step === 3 && (
//           <div className="space-y-8 animate-in slide-in-from-right-4 fade-in text-center">
//             {error ? (
//               <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-red-600">
//                 <AlertCircle className="w-10 h-10 mx-auto mb-2" />
//                 <p className="font-bold">{error}</p>
//                 <Button
//                   variant="outline"
//                   onClick={prevStep}
//                   className="mt-4 border-red-200 text-red-600"
//                 >
//                   Go Back
//                 </Button>
//               </div>
//             ) : (
//               <>
//                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
//                   <CheckCircle2 className="w-10 h-10" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-slate-900">
//                     Estimated Premium
//                   </h3>
//                   <p className="text-slate-500 text-sm">
//                     Based on your selection
//                   </p>
//                 </div>

//                 <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
//                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
//                     {formData.mode} Payment
//                   </p>
//                   <p className="text-4xl font-extrabold text-orange-600">
//                     ৳ {result?.toLocaleString()}
//                   </p>
//                 </div>

//                 <div className="flex gap-3">
//                   <Button
//                     variant="outline"
//                     onClick={prevStep}
//                     className="flex-1"
//                   >
//                     Recalculate
//                   </Button>
//                   <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
//                     Apply Now
//                   </Button>
//                 </div>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // --- TEASER ---
// function CalculatorTeaser({ onStart }: { onStart: () => void }) {
//   return (
//     <div className="bg-white text-slate-900 rounded-3xl shadow-2xl p-12 min-h-[500px] flex flex-col justify-center items-center text-center">
//       <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
//         <Calculator className="w-10 h-10 text-orange-600" />
//       </div>
//       <h3 className="text-3xl font-extrabold mb-4">Premium Calculator</h3>
//       <p className="text-slate-500 max-w-md mb-8">
//         Get an instant estimate for your life insurance premium with our
//         advanced AI calculator.
//       </p>
//       <Button
//         onClick={onStart}
//         className="w-full max-w-xs bg-orange-500 hover:bg-orange-600 text-white h-12 text-lg font-bold shadow-lg shadow-orange-500/20"
//       >
//         Start Calculation <ArrowRight className="w-5 h-5 ml-2" />
//       </Button>
//     </div>
//   );
// }

// // --- MAIN EXPORT ---
// export default function InsuranceCalculator() {
//   const [isActive, setIsActive] = useState(false);

//   return (
//     <section
//       className="w-full py-24 bg-slate-900 text-white relative overflow-hidden"
//       id="calculator"
//     >
//       <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/10 blur-3xl rounded-full translate-x-1/2 pointer-events-none" />
//       <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-500/10 blur-3xl rounded-full -translate-x-1/2 pointer-events-none" />

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//           <div className="space-y-8">
//             <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
//               Plan your future <br />
//               <span className="text-orange-500">financial goals</span>.
//             </h2>
//             <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
//               Our calculator uses real-time data to give you the most accurate
//               premium estimation for your specific needs.
//             </p>
//             <div className="grid grid-cols-2 gap-6 pt-4">
//               <div className="flex items-center gap-3">
//                 <div className="p-3 bg-white/10 rounded-xl">
//                   <TrendingUp className="w-6 h-6 text-green-400" />
//                 </div>
//                 <div>
//                   <p className="font-bold text-xl">12%</p>
//                   <p className="text-xs text-slate-400">Avg. Return</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="p-3 bg-white/10 rounded-xl">
//                   <Shield className="w-6 h-6 text-blue-400" />
//                 </div>
//                 <div>
//                   <p className="font-bold text-xl">100%</p>
//                   <p className="text-xs text-slate-400">Secured</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div>
//             {isActive ? (
//               <CalculatorForm onCancel={() => setIsActive(false)} />
//             ) : (
//               <CalculatorTeaser onStart={() => setIsActive(true)} />
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
