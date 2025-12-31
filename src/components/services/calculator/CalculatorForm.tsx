// "use client";

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import {
//   Loader2,
//   Calculator,
//   User,
//   ShieldCheck,
//   FileText,
//   RefreshCw,
//   AlertTriangle,
//   Info,
// } from "lucide-react";
// import { format, isValid } from "date-fns";

// import { calculatorService } from "@/lib/api/services/calculator-service";
// import {
//   calculatorSchema,
//   CalculatorFormValues,
// } from "@/lib/validations/calculator-schema";
// import { POLICY_GROUPS, isGroup } from "@/lib/constants/policy-groups";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Card, CardContent } from "@/components/ui/card";
// import { cn } from "@/lib/utils";

// import { SmartDatePicker } from "@/components/ui/smart-date-picker";
// import { PremiumResultCard } from "./PremiumResultCard";
// // import { PremiumResultCard } from "./premium-result-card"; // Import the new component

// export default function CalculatorForm() {
//   const [result, setResult] = useState<any>(null);
//   const [apiError, setApiError] = useState<string | null>(null);
//   const [calculatingAge, setCalculatingAge] = useState(false);

//   const form = useForm<CalculatorFormValues>({
//     resolver: zodResolver(calculatorSchema),
//     defaultValues: {
//       dob: "",
//       age: "",
//       policyId: "",
//       policyDuration: "",
//       installmentType: "",
//       gender: "Male",
//       pensionAge: "55",
//       supplementaryPolicy: "0",
//       totalPolicyAmount: "",
//       monthlyPremiumAmount: "",
//       monthlySalary: "",
//       ysapa: "",
//       riskCategory: "",
//       noOfNominee: "",
//     },
//     mode: "onChange",
//   });

//   const { dob, age, policyId, supplementaryPolicy: supPolicyId } = form.watch();

//   // --- QUERIES ---
//   const { data: policies, isLoading: loadingPol } = useQuery({
//     queryKey: ["policies"],
//     queryFn: () => calculatorService.getPolicies("eng"),
//   });

//   const { data: installments } = useQuery({
//     queryKey: ["installments"],
//     queryFn: calculatorService.getInstallmentTypes,
//   });

//   const { data: supPolicies } = useQuery({
//     queryKey: ["supPolicies"],
//     queryFn: calculatorService.getSupPolicies,
//   });

//   // Valid Age Check for Durations
//   const isValidAge =
//     age && !isNaN(Number(age)) && Number(age) > 0 && Number(age) < 100;

//   const { data: durations, isLoading: loadingDur } = useQuery({
//     queryKey: ["durations", policyId, age],
//     queryFn: () => calculatorService.getDurations(policyId, age),
//     enabled: !!policyId && !!isValidAge,
//   });

//   const { data: riskCategories } = useQuery({
//     queryKey: ["risk", supPolicyId, age],
//     queryFn: () => calculatorService.getRiskCategories(supPolicyId, age),
//     enabled: !!supPolicyId && !!isValidAge && supPolicyId !== "0",
//   });

//   // --- MUTATION ---
//   const calculateMutation = useMutation({
//     mutationFn: calculatorService.calculatePremium,
//     onSuccess: (data) => {
//       if (data && data.msg) {
//         setResult(null);
//         setApiError(data.msg);
//       } else if (data && parseFloat(data.lblCalculationValue || "0") > 0) {
//         setResult(data);
//         setApiError(null);
//         // Scroll handled in component or here if needed
//       } else {
//         setResult(null);
//         setApiError(
//           "Calculation returned 0. Please check Sum Assured or Duration."
//         );
//       }
//     },
//     onError: (error) => {
//       console.error(error);
//       setApiError("Server Error: Unable to calculate premium.");
//     },
//   });

//   // --- EFFECTS ---
//   useEffect(() => {
//     const pid = parseInt(policyId || "0");
//     if (!pid) return;

//     setResult(null);
//     setApiError(null);
//     form.setValue("policyDuration", "");

//     // Payment Logic
//     if (pid === 9) {
//       form.setValue("installmentType", "One Time");
//     } else if (
//       isGroup(pid, POLICY_GROUPS.MONTHLY_PREMIUM_BASED) ||
//       isGroup(pid, POLICY_GROUPS.MICRO)
//     ) {
//       form.setValue("installmentType", "Monthly");
//     }

//     if (pid === 19) form.setValue("totalPolicyAmount", "1000000");
//     if (pid === 20) form.setValue("totalPolicyAmount", "10000000");
//     if (pid === 15) form.setValue("supplementaryPolicy", "10");
//   }, [policyId, form]);

//   // --- UI LOGIC ---
//   const pid = parseInt(policyId || "0");
//   const showSumAssured =
//     isGroup(pid, POLICY_GROUPS.STANDARD) ||
//     isGroup(pid, POLICY_GROUPS.SIMPLE) ||
//     isGroup(pid, POLICY_GROUPS.EDUCATION) ||
//     isGroup(pid, POLICY_GROUPS.PLATINUM);
//   const showMonthlyPrem =
//     isGroup(pid, POLICY_GROUPS.MONTHLY_PREMIUM_BASED) ||
//     isGroup(pid, POLICY_GROUPS.MICRO) ||
//     isGroup(pid, POLICY_GROUPS.SALARY_BASED);
//   const showPensionFields = isGroup(pid, POLICY_GROUPS.PENSION);
//   const showStipend = isGroup(pid, POLICY_GROUPS.STIPEND);
//   const showSalary = isGroup(pid, POLICY_GROUPS.SALARY_BASED);
//   const showSupPolicy =
//     !isGroup(pid, POLICY_GROUPS.SIMPLE) &&
//     !isGroup(pid, POLICY_GROUPS.MICRO) &&
//     pid !== 0;

//   const isInstallmentLocked = pid === 9;

//   // Logic: Show warning if valid Age + Policy, but NO Durations returned
//   const noTermsAvailable =
//     !!policyId &&
//     isValidAge &&
//     durations &&
//     durations.length === 0 &&
//     !loadingDur;

//   const onSubmit = (values: CalculatorFormValues) => {
//     const hasSup =
//       values.supplementaryPolicy && values.supplementaryPolicy !== "0";
//     calculateMutation.mutate({
//       ...values,
//       supplementaryPolicyDuration: hasSup ? values.policyDuration : "",
//     });
//   };

//   return (
//     <div className="space-y-8 animate-in fade-in duration-700">
//       {/* API Error */}
//       {apiError && (
//         <Alert
//           variant="destructive"
//           className="border-l-4 border-red-500 bg-red-50 shadow-sm"
//         >
//           <AlertTriangle className="h-5 w-5 text-red-600" />
//           <AlertTitle className="text-red-800 font-semibold ml-2">
//             Calculation Error
//           </AlertTitle>
//           <AlertDescription className="text-red-700 ml-2 mt-1">
//             {apiError}
//           </AlertDescription>
//         </Alert>
//       )}

//       {/* Age Restriction Error */}
//       {form.formState.errors.age && (
//         <Alert
//           variant="destructive"
//           className="border-l-4 border-orange-500 bg-orange-50 shadow-sm"
//         >
//           <AlertTriangle className="h-5 w-5 text-orange-600" />
//           <AlertTitle className="text-orange-800 font-semibold ml-2">
//             Invalid Age
//           </AlertTitle>
//           <AlertDescription className="text-orange-700 ml-2 mt-1">
//             Please enter a valid age to proceed.
//           </AlertDescription>
//         </Alert>
//       )}

//       {/* No Terms Warning */}
//       {noTermsAvailable && (
//         <Alert className="border-l-4 border-amber-500 bg-amber-50 shadow-sm">
//           <Info className="h-5 w-5 text-amber-600" />
//           <AlertTitle className="text-amber-800 font-semibold ml-2">
//             Unavailable for Age {age}
//           </AlertTitle>
//           <AlertDescription className="text-amber-700 ml-2 mt-1">
//             This policy plan does not have any valid terms for your current age.
//           </AlertDescription>
//         </Alert>
//       )}

//       <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm ring-1 ring-slate-200/50 rounded-2xl overflow-hidden">
//         <div className="h-1.5 w-full bg-linear-to-r from-emerald-500 to-teal-500" />
//         <CardContent className="p-8">
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//               {/* --- Section 1: Personal Details --- */}
//               <div className="space-y-4">
//                 <div className="flex items-center gap-2 mb-2">
//                   <User className="w-5 h-5 text-emerald-600" />
//                   <h3 className="text-lg font-semibold text-slate-800">
//                     Personal Details
//                   </h3>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
//                   {/* DATE OF BIRTH (Optional if user types Age) */}
//                   <div className="md:col-span-8">
//                     <FormField
//                       control={form.control}
//                       name="dob"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-slate-600 font-medium">
//                             Date of Birth{" "}
//                             <span className="text-slate-400 font-normal text-xs">
//                               (Optional if Age entered)
//                             </span>
//                           </FormLabel>
//                           <FormControl>
//                             <SmartDatePicker
//                               date={
//                                 field.value ? new Date(field.value) : undefined
//                               }
//                               setDate={(date: Date | undefined) => {
//                                 const isoDate = date
//                                   ? format(date, "yyyy-MM-dd")
//                                   : "";
//                                 field.onChange(isoDate);

//                                 if (date && isValid(date)) {
//                                   setCalculatingAge(true);
//                                   const apiDate = format(date, "dd/MM/yyyy");
//                                   calculatorService
//                                     .calculateAge(apiDate)
//                                     .then((calculatedAge) => {
//                                       form.setValue("age", calculatedAge); // Auto-set Age
//                                       form.setValue("policyDuration", "");
//                                       setResult(null);
//                                     })
//                                     .finally(() => setCalculatingAge(false));
//                                 }
//                               }}
//                             />
//                           </FormControl>
//                           <FormMessage className="text-red-600 bg-red-50 px-3 py-1.5 rounded-md text-xs font-semibold inline-block mt-1 border border-red-100 shadow-sm" />
//                         </FormItem>
//                       )}
//                     />
//                   </div>

//                   {/* CALCULATED AGE (Editable) */}
//                   <div className="md:col-span-4">
//                     <FormField
//                       control={form.control}
//                       name="age"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-slate-600 font-medium">
//                             Age <span className="text-red-500">*</span>
//                           </FormLabel>
//                           <FormControl>
//                             <div className="relative">
//                               {calculatingAge ? (
//                                 <div className="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-xl z-10">
//                                   <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
//                                 </div>
//                               ) : null}
//                               <Input
//                                 {...field}
//                                 // REMOVED readOnly - Now user can type!
//                                 type="number"
//                                 onChange={(e) => {
//                                   field.onChange(e.target.value);
//                                   // If user types age manually, clear DOB to avoid conflict
//                                   if (dob) form.setValue("dob", "");
//                                   form.setValue("policyDuration", ""); // Reset durations
//                                   setResult(null);
//                                 }}
//                                 className={cn(
//                                   "h-12 bg-white border-slate-200 text-center font-bold text-slate-700 rounded-xl focus:ring-emerald-500/20",
//                                   form.formState.errors.age &&
//                                     "border-red-300 bg-red-50"
//                                 )}
//                               />
//                               <div className="absolute right-3 top-3.5 text-xs font-semibold text-slate-400">
//                                 YEARS
//                               </div>
//                             </div>
//                           </FormControl>
//                           <FormMessage className="text-red-600 bg-red-50 px-3 py-1.5 rounded-md text-xs font-semibold inline-block mt-1 border border-red-100 shadow-sm" />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <Separator className="bg-slate-100" />

//               {/* ... REST OF FORM (Policy, Financials, etc.) ... */}
//               {/* This part remains exactly same as previous version */}
//               {/* Keep Section 2, 3, 4 and Submit Button logic here */}

//               {/* --- Section 2: Policy Selection --- */}
//               <div className="space-y-4">
//                 <div className="flex items-center gap-2 mb-2">
//                   <FileText className="w-5 h-5 text-emerald-600" />
//                   <h3 className="text-lg font-semibold text-slate-800">
//                     Policy Information
//                   </h3>
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="policyId"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-slate-600 font-medium">
//                         Select Policy Plan{" "}
//                         <span className="text-red-500">*</span>
//                       </FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         value={field.value || ""}
//                       >
//                         <FormControl>
//                           <SelectTrigger
//                             className={cn(
//                               "h-12 bg-white border-slate-200 rounded-xl focus:ring-emerald-500/20",
//                               form.formState.errors.policyId &&
//                                 "border-red-300 bg-red-50/50"
//                             )}
//                           >
//                             <SelectValue
//                               placeholder={
//                                 loadingPol
//                                   ? "Loading policies..."
//                                   : "Choose a policy plan..."
//                               }
//                             />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent className="bg-white max-h-80">
//                           {policies?.map((p: any) => (
//                             <SelectItem
//                               key={p.PolicyId}
//                               value={p.PolicyId.toString()}
//                               className="hover:bg-emerald-50 cursor-pointer py-3"
//                             >
//                               {p.PolicyName}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <FormMessage className="text-red-600 bg-red-50 px-3 py-1.5 rounded-md text-xs font-semibold inline-block mt-1 border border-red-100 shadow-sm" />
//                     </FormItem>
//                   )}
//                 />

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <FormField
//                     control={form.control}
//                     name="policyDuration"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-slate-600 font-medium">
//                           Policy Term (Years){" "}
//                           <span className="text-red-500">*</span>
//                         </FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           value={field.value || ""}
//                           disabled={!durations?.length}
//                         >
//                           <FormControl>
//                             <SelectTrigger
//                               className={cn(
//                                 "h-12 bg-white border-slate-200 rounded-xl focus:ring-emerald-500/20",
//                                 form.formState.errors.policyDuration &&
//                                   "border-red-300 bg-red-50/50",
//                                 noTermsAvailable &&
//                                   "border-amber-300 bg-amber-50"
//                               )}
//                             >
//                               <SelectValue
//                                 placeholder={
//                                   noTermsAvailable
//                                     ? "Unavailable for Age"
//                                     : loadingDur
//                                     ? "Loading..."
//                                     : "Select Term"
//                                 }
//                               />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent className="bg-white">
//                             {durations?.map((d: any) => (
//                               <SelectItem
//                                 key={d.TermOfYear}
//                                 value={d.TermOfYear.toString()}
//                               >
//                                 {d.TermOfYear} Years
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                         <FormMessage className="text-red-600 bg-red-50 px-3 py-1.5 rounded-md text-xs font-semibold inline-block mt-1 border border-red-100 shadow-sm" />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="installmentType"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-slate-600 font-medium">
//                           Payment Frequency{" "}
//                           <span className="text-red-500">*</span>
//                         </FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           value={field.value || ""}
//                           disabled={isInstallmentLocked}
//                         >
//                           <FormControl>
//                             <SelectTrigger
//                               className={cn(
//                                 "h-12 bg-white border-slate-200 rounded-xl focus:ring-emerald-500/20",
//                                 isInstallmentLocked &&
//                                   "bg-slate-100 opacity-80",
//                                 form.formState.errors.installmentType &&
//                                   "border-red-300 bg-red-50/50"
//                               )}
//                             >
//                               <SelectValue placeholder="Select Mode" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent className="bg-white">
//                             {installments?.map((i: any) => (
//                               <SelectItem
//                                 key={i.InstallmentTypeId}
//                                 value={i.InstallmentTypeName}
//                               >
//                                 {i.InstallmentTypeName}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                         {isInstallmentLocked && (
//                           <p className="text-[11px] text-amber-600 font-medium pt-1">
//                             Locked for this policy type
//                           </p>
//                         )}
//                         <FormMessage className="text-red-600 bg-red-50 px-3 py-1.5 rounded-md text-xs font-semibold inline-block mt-1 border border-red-100 shadow-sm" />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               {/* --- Section 3: Financials --- */}
//               <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {showSumAssured && (
//                   <FormField
//                     control={form.control}
//                     name="totalPolicyAmount"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-slate-600 font-medium">
//                           Sum Assured Amount{" "}
//                           <span className="text-red-500">*</span>
//                         </FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <Input
//                               type="number"
//                               {...field}
//                               className={cn(
//                                 "pl-12 h-12 bg-white border-slate-200 rounded-xl",
//                                 form.formState.errors.totalPolicyAmount &&
//                                   "border-red-300 bg-red-50/50"
//                               )}
//                               placeholder="0.00"
//                             />
//                             <div className="absolute left-4 top-3.5 text-slate-400 font-bold">
//                               ৳
//                             </div>
//                           </div>
//                         </FormControl>
//                         <FormMessage className="text-red-600 bg-red-50 px-3 py-1.5 rounded-md text-xs font-semibold inline-block mt-1 border border-red-100 shadow-sm" />
//                       </FormItem>
//                     )}
//                   />
//                 )}
//                 {showMonthlyPrem && (
//                   <FormField
//                     control={form.control}
//                     name="monthlyPremiumAmount"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-slate-600 font-medium">
//                           Monthly Premium Input{" "}
//                           <span className="text-red-500">*</span>
//                         </FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <Input
//                               type="number"
//                               {...field}
//                               className={cn(
//                                 "pl-12 h-12 bg-white border-slate-200 rounded-xl",
//                                 form.formState.errors.monthlyPremiumAmount &&
//                                   "border-red-300 bg-red-50/50"
//                               )}
//                               placeholder="0.00"
//                             />
//                             <div className="absolute left-4 top-3.5 text-slate-400 font-bold">
//                               ৳
//                             </div>
//                           </div>
//                         </FormControl>
//                         <FormMessage className="text-red-600 bg-red-50 px-3 py-1.5 rounded-md text-xs font-semibold inline-block mt-1 border border-red-100 shadow-sm" />
//                       </FormItem>
//                     )}
//                   />
//                 )}
//                 {(showPensionFields || showStipend) && (
//                   <FormField
//                     control={form.control}
//                     name="ysapa"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-slate-600 font-medium">
//                           {showStipend ? "Stipend Amount" : "Pension Amount"}{" "}
//                           <span className="text-red-500">*</span>
//                         </FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <Input
//                               type="number"
//                               {...field}
//                               className={cn(
//                                 "pl-12 h-12 bg-white border-slate-200 rounded-xl",
//                                 form.formState.errors.ysapa &&
//                                   "border-red-300 bg-red-50/50"
//                               )}
//                               placeholder="0.00"
//                             />
//                             <div className="absolute left-4 top-3.5 text-slate-400 font-bold">
//                               ৳
//                             </div>
//                           </div>
//                         </FormControl>
//                         <FormMessage className="text-red-600 bg-red-50 px-3 py-1.5 rounded-md text-xs font-semibold inline-block mt-1 border border-red-100 shadow-sm" />
//                       </FormItem>
//                     )}
//                   />
//                 )}
//               </div>

//               {/* --- Section 4: Supplementary --- */}
//               {showSupPolicy && (
//                 <div className="space-y-4 pt-2">
//                   <div className="flex items-center gap-2 mb-2">
//                     <ShieldCheck className="w-5 h-5 text-emerald-600" />
//                     <h3 className="text-lg font-semibold text-slate-800">
//                       Additional Coverage
//                     </h3>
//                   </div>

//                   <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <FormField
//                       control={form.control}
//                       name="supplementaryPolicy"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-slate-600 font-medium">
//                             Supplementary Rider
//                           </FormLabel>
//                           <Select
//                             onValueChange={field.onChange}
//                             value={field.value || "0"}
//                             disabled={pid === 15}
//                           >
//                             <FormControl>
//                               <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl">
//                                 <SelectValue placeholder="None" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent className="bg-white">
//                               <SelectItem value="0" className="text-slate-500">
//                                 No additional coverage
//                               </SelectItem>
//                               {supPolicies?.map((s: any) => (
//                                 <SelectItem
//                                   key={s.SupplimentryId}
//                                   value={s.SupplimentryId.toString()}
//                                 >
//                                   {s.SubPolicyName}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </FormItem>
//                       )}
//                     />

//                     {riskCategories && riskCategories.length > 0 && (
//                       <FormField
//                         control={form.control}
//                         name="riskCategory"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-slate-600 font-medium">
//                               Risk Class
//                             </FormLabel>
//                             <Select
//                               onValueChange={field.onChange}
//                               value={field.value || ""}
//                             >
//                               <FormControl>
//                                 <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl">
//                                   <SelectValue placeholder="Select Class" />
//                                 </SelectTrigger>
//                               </FormControl>
//                               <SelectContent className="bg-white">
//                                 {riskCategories.map((r: any) => (
//                                   <SelectItem key={r.Class} value={r.Class}>
//                                     {r.Class}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </FormItem>
//                         )}
//                       />
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Submit Button */}
//               <div className="pt-4">
//                 <Button
//                   type="submit"
//                   size="lg"
//                   className="w-full h-14 text-lg font-bold bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-200 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5"
//                   disabled={calculateMutation.isPending || noTermsAvailable}
//                 >
//                   {calculateMutation.isPending ? (
//                     <>
//                       <Loader2 className="mr-2 animate-spin" /> Calculating
//                       Premium...
//                     </>
//                   ) : (
//                     <>
//                       <Calculator className="mr-2" /> Calculate Premium
//                     </>
//                   )}
//                 </Button>
//                 <div className="text-center mt-4">
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     onClick={() => {
//                       form.reset();
//                       setResult(null);
//                     }}
//                     className="text-slate-400 hover:text-slate-600 hover:bg-transparent"
//                   >
//                     <RefreshCw className="w-4 h-4 mr-2" /> Reset Form
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>

//       {/* --- PREMIUM RESULT CARD --- */}
//       <PremiumResultCard result={result} formValues={form.getValues()} />
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AlertTriangle, Info } from "lucide-react";
import { format } from "date-fns";

// Types & Logic
import {
  calculatorService,
  CalculatorInput,
} from "@/lib/api/services/calculator-service";
import {
  calculatorSchema,
  CalculatorFormValues,
} from "@/lib/validations/calculator-schema";
import { POLICY_GROUPS, isGroup } from "@/lib/constants/policy-groups";

// UI Components
import { Form } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorFormFields } from "./CalculatorFormFields";
import { PremiumResultCard } from "./PremiumResultCard";

// Sub-Components

export default function CalculatorForm() {
  const [result, setResult] = useState<any>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [calculatingAge, setCalculatingAge] = useState(false);

  const form = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      dob: "", // Can now be empty
      age: "",
      policyId: "",
      policyDuration: "",
      installmentType: "",
      gender: "Male",
      pensionAge: "55",
      supplementaryPolicy: "0",
      totalPolicyAmount: "",
      monthlyPremiumAmount: "",
      monthlySalary: "",
      ysapa: "",
      riskCategory: "",
      noOfNominee: "",
    },
    mode: "onChange",
  });

  // Watch fields
  const { age, policyId, supplementaryPolicy: supPolicyId } = form.watch();

  // --- API QUERIES ---
  const { data: policies, isLoading: loadingPol } = useQuery({
    queryKey: ["policies"],
    queryFn: () => calculatorService.getPolicies("eng"),
  });

  const { data: installments } = useQuery({
    queryKey: ["installments"],
    queryFn: calculatorService.getInstallmentTypes,
  });

  const { data: supPolicies } = useQuery({
    queryKey: ["supPolicies"],
    queryFn: calculatorService.getSupPolicies,
  });

  // Check valid age for Duration API
  const isValidAge =
    age && !isNaN(Number(age)) && Number(age) > 0 && Number(age) < 100;

  const { data: durations, isLoading: loadingDur } = useQuery({
    queryKey: ["durations", policyId, age],
    queryFn: () => calculatorService.getDurations(policyId, age),
    enabled: !!policyId && !!isValidAge,
  });

  const { data: riskCategories } = useQuery({
    queryKey: ["risk", supPolicyId, age],
    queryFn: () => calculatorService.getRiskCategories(supPolicyId, age),
    enabled: !!supPolicyId && !!isValidAge && supPolicyId !== "0",
  });

  // --- MUTATION ---
  const calculateMutation = useMutation({
    mutationFn: calculatorService.calculatePremium,
    onSuccess: (data) => {
      if (data && data.msg) {
        setResult(null);
        setApiError(data.msg);
      } else if (data && parseFloat(data.lblCalculationValue || "0") > 0) {
        setResult(data);
        setApiError(null);
        setTimeout(() => {
          document
            .getElementById("result-card")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        setResult(null);
        setApiError(
          "Calculation returned 0. Please check Sum Assured or Duration."
        );
      }
    },
    onError: () => setApiError("Server Error: Unable to calculate premium."),
  });

  // --- LOGIC: Submit ---
  const onSubmit = (values: CalculatorFormValues) => {
    const hasSup =
      values.supplementaryPolicy && values.supplementaryPolicy !== "0";

    // Explicitly define payload
    const payload: CalculatorInput = {
      ...values,
      supplementaryPolicyDuration: hasSup ? values.policyDuration : "",
    };

    calculateMutation.mutate(payload);
  };

  // --- LOGIC: Auto Updates ---
  const handleDateSelect = async (date: Date) => {
    setCalculatingAge(true);
    try {
      const apiDate = format(date, "dd/MM/yyyy");
      const calculatedAge = await calculatorService.calculateAge(apiDate);

      form.setValue("age", calculatedAge); // Sets age automatically
      form.clearErrors("age"); // Clear any manual errors
      form.setValue("policyDuration", "");
      setResult(null);
    } catch (error) {
      console.error("Age Calculation Failed", error);
    } finally {
      setCalculatingAge(false);
    }
  };

  useEffect(() => {
    const pid = parseInt(policyId || "0");
    if (!pid) return;

    setResult(null);
    setApiError(null);
    form.setValue("policyDuration", "");

    // Auto-Set Payment
    if (pid === 9) {
      form.setValue("installmentType", "One Time");
    } else if (
      isGroup(pid, POLICY_GROUPS.MONTHLY_PREMIUM_BASED) ||
      isGroup(pid, POLICY_GROUPS.MICRO)
    ) {
      form.setValue("installmentType", "Monthly");
    }

    // Auto-Set Amounts
    if (pid === 19) form.setValue("totalPolicyAmount", "1000000");
    if (pid === 20) form.setValue("totalPolicyAmount", "10000000");
    if (pid === 15) form.setValue("supplementaryPolicy", "10");
  }, [policyId, form]);

  const pid = parseInt(policyId || "0");
  const noTermsAvailable =
    !!policyId &&
    !!isValidAge &&
    durations &&
    durations.length === 0 &&
    !loadingDur;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Global Error */}
      {apiError && (
        <Alert
          variant="destructive"
          className="border-l-4 border-red-500 bg-red-50 shadow-sm"
        >
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertTitle className="text-red-800 font-semibold ml-2">
            Error
          </AlertTitle>
          <AlertDescription className="text-red-700 ml-2 mt-1">
            {apiError}
          </AlertDescription>
        </Alert>
      )}

      {/* No Terms Warning */}
      {noTermsAvailable && (
        <Alert className="border-l-4 border-amber-500 bg-amber-50 shadow-sm">
          <Info className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-800 font-semibold ml-2">
            Unavailable for Age {age}
          </AlertTitle>
          <AlertDescription className="text-amber-700 ml-2 mt-1">
            This policy plan is not available for your age.
          </AlertDescription>
        </Alert>
      )}

      <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm ring-1 ring-slate-200/50 rounded-2xl overflow-hidden">
        <div className="h-1.5 w-full bg-linear-to-r from-emerald-500 to-teal-500" />
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CalculatorFormFields
                policies={policies}
                installments={installments}
                durations={durations}
                supPolicies={supPolicies}
                riskCategories={riskCategories}
                loadingPol={loadingPol}
                loadingDur={loadingDur}
                calculatingAge={calculatingAge}
                onReset={() => {
                  form.reset();
                  setResult(null);
                }}
                onDateSelect={handleDateSelect}
                isSubmitting={calculateMutation.isPending}
                noTermsAvailable={!!noTermsAvailable}
                isInstallmentLocked={pid === 9}
                showSumAssured={
                  isGroup(pid, POLICY_GROUPS.STANDARD) ||
                  isGroup(pid, POLICY_GROUPS.SIMPLE) ||
                  isGroup(pid, POLICY_GROUPS.EDUCATION) ||
                  isGroup(pid, POLICY_GROUPS.PLATINUM)
                }
                showMonthlyPrem={
                  isGroup(pid, POLICY_GROUPS.MONTHLY_PREMIUM_BASED) ||
                  isGroup(pid, POLICY_GROUPS.MICRO) ||
                  isGroup(pid, POLICY_GROUPS.SALARY_BASED)
                }
                showPensionFields={isGroup(pid, POLICY_GROUPS.PENSION)}
                showStipend={isGroup(pid, POLICY_GROUPS.STIPEND)}
                showSalary={isGroup(pid, POLICY_GROUPS.SALARY_BASED)}
                showSupPolicy={
                  !isGroup(pid, POLICY_GROUPS.SIMPLE) &&
                  !isGroup(pid, POLICY_GROUPS.MICRO) &&
                  pid !== 0
                }
              />
            </form>
          </Form>
        </CardContent>
      </Card>

      <PremiumResultCard result={result} formValues={form.getValues()} />
    </div>
  );
}
