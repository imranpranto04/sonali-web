// "use client";

// import { useFormContext } from "react-hook-form";
// import { format, isValid } from "date-fns";
// import {
//   User,
//   CalendarDays,
//   FileText,
//   ShieldCheck,
//   Loader2,
//   Calculator,
//   RefreshCw,
// } from "lucide-react";

// import {
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
// import { SmartDatePicker } from "@/components/ui/smart-date-picker";
// import { cn } from "@/lib/utils";

// // Types for the props received from the parent
// interface CalculatorFormFieldsProps {
//   policies: any[];
//   installments: any[];
//   durations: any[];
//   supPolicies: any[];
//   riskCategories: any[];
//   loadingPol: boolean;
//   loadingDur: boolean;
//   isInstallmentLocked: boolean;
//   showSumAssured: boolean;
//   showMonthlyPrem: boolean;
//   showPensionFields: boolean;
//   showStipend: boolean;
//   showSupPolicy: boolean;
//   showSalary: boolean;
//   noTermsAvailable: boolean;
//   isSubmitting: boolean;
//   onReset: () => void;
//   // Callback to trigger age calculation from parent
//   onDateSelect: (date: Date) => void;
//   calculatingAge: boolean;
// }

// export function CalculatorFormFields({
//   policies,
//   installments,
//   durations,
//   supPolicies,
//   riskCategories,
//   loadingPol,
//   loadingDur,
//   isInstallmentLocked,
//   showSumAssured,
//   showMonthlyPrem,
//   showPensionFields,
//   showStipend,
//   showSupPolicy,
//   showSalary,
//   noTermsAvailable,
//   isSubmitting,
//   onReset,
//   onDateSelect,
//   calculatingAge,
// }: CalculatorFormFieldsProps) {
//   const form = useFormContext(); // Access form methods automatically

//   return (
//     <div className="space-y-8">
//       {/* --- Section 1: Personal Details --- */}
//       <div className="space-y-4">
//         <div className="flex justify-center items-center gap-2 mb-2">
//           <User className="w-5 h-5 text-emerald-600" />
//           <h3 className="text-lg font-semibold text-slate-800">
//             Personal Details
//           </h3>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
//           {/* Date of Birth */}
//           <div className="md:col-span-8">
//             <FormField
//               control={form.control}
//               name="dob"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-slate-600 font-medium">
//                     Date of Birth{" "}
//                     {/* <span className="text-xs text-slate-400 font-normal">
//                       (Optional if Age known)
//                     </span> */}
//                   </FormLabel>
//                   <FormControl>
//                     <SmartDatePicker
//                       date={field.value ? new Date(field.value) : undefined}
//                       setDate={(date) => {
//                         const isoDate = date ? format(date, "yyyy-MM-dd") : "";
//                         field.onChange(isoDate);
//                         if (date && isValid(date)) {
//                           onDateSelect(date); // Trigger parent calculation
//                         }
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Age Input (Editable) */}
//           <div className="md:col-span-4">
//             <FormField
//               control={form.control}
//               name="age"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-slate-600 font-medium">
//                     Age <span className="text-red-500">*</span>
//                   </FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       {calculatingAge && (
//                         <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 rounded-xl">
//                           <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
//                         </div>
//                       )}
//                       <Input
//                         {...field}
//                         type="number"
//                         placeholder="0"
//                         onChange={(e) => {
//                           field.onChange(e.target.value);
//                           // If typing age manually, reset DOB
//                           if (form.getValues("dob")) form.setValue("dob", "");
//                           form.setValue("policyDuration", ""); // Reset duration
//                         }}
//                         className={cn(
//                           "h-10 font-bold text-center border-slate-200 focus:ring-emerald-500/20",
//                           noTermsAvailable
//                             ? "bg-red-50 border-red-300 text-red-600"
//                             : "bg-white text-slate-700"
//                         )}
//                       />
//                       <div className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">
//                         YRS
//                       </div>
//                     </div>
//                   </FormControl>
//                   <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
//                 </FormItem>
//               )}
//             />
//           </div>
//         </div>
//       </div>

//       <Separator className="bg-slate-100" />

//       {/* --- Section 2: Policy Selection --- */}
//       <div className="space-y-4">
//         <div className="flex justify-center items-center gap-2 mb-2">
//           <FileText className="w-5 h-5 text-emerald-600" />
//           <h3 className="text-lg font-semibold text-slate-800">Policy Plan</h3>
//         </div>

//         <FormField
//           control={form.control}
//           name="policyId"
//           render={({ field }) => (
//             <FormItem>
//               <Select onValueChange={field.onChange} value={field.value || ""}>
//                 <FormControl>
//                   <SelectTrigger className="h-11 bg-white border-slate-200 focus:ring-emerald-500/20">
//                     <SelectValue
//                       placeholder={
//                         loadingPol
//                           ? "Loading policies..."
//                           : "Select a Policy..."
//                       }
//                     />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent className="bg-white max-h-[300px]">
//                   {policies?.map((p: any) => (
//                     <SelectItem key={p.PolicyId} value={p.PolicyId.toString()}>
//                       {p.PolicyName}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
//             </FormItem>
//           )}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FormField
//             control={form.control}
//             name="policyDuration"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-slate-600 font-medium">
//                   Policy Term <span className="text-red-500">*</span>
//                 </FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   value={field.value || ""}
//                   disabled={!durations?.length}
//                 >
//                   <FormControl>
//                     <SelectTrigger
//                       className={cn(
//                         "h-11 bg-white border-slate-200",
//                         noTermsAvailable && "border-amber-400 bg-amber-50"
//                       )}
//                     >
//                       <SelectValue
//                         placeholder={
//                           noTermsAvailable
//                             ? "Invalid Age for Policy"
//                             : loadingDur
//                             ? "Loading..."
//                             : "Select Years"
//                         }
//                       />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent className="bg-white">
//                     {durations?.map((d: any) => (
//                       <SelectItem
//                         key={d.TermOfYear}
//                         value={d.TermOfYear.toString()}
//                       >
//                         {d.TermOfYear} Years
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="installmentType"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-slate-600 font-medium">
//                   Payment Mode
//                 </FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   value={field.value || ""}
//                   disabled={isInstallmentLocked}
//                 >
//                   <FormControl>
//                     <SelectTrigger
//                       className={cn(
//                         "h-11 bg-white border-slate-200",
//                         isInstallmentLocked && "bg-slate-100 opacity-80"
//                       )}
//                     >
//                       <SelectValue placeholder="Select Mode" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent className="bg-white">
//                     {installments?.map((i: any) => (
//                       <SelectItem
//                         key={i.InstallmentTypeId}
//                         value={i.InstallmentTypeName}
//                       >
//                         {i.InstallmentTypeName}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
//               </FormItem>
//             )}
//           />
//         </div>
//       </div>

//       {/* --- Section 3: Financials --- */}
//       <div className="p-5 bg-slate-50/80 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {showSumAssured && (
//           <FormField
//             control={form.control}
//             name="totalPolicyAmount"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-slate-600 font-medium">
//                   Sum Assured Amount
//                 </FormLabel>
//                 <FormControl>
//                   <div className="relative">
//                     <Input
//                       type="number"
//                       {...field}
//                       className="pl-8 h-11 bg-white border-slate-200"
//                       placeholder="0"
//                     />
//                     <span className="absolute left-3 top-3 text-slate-400 font-bold">
//                       ৳
//                     </span>
//                   </div>
//                 </FormControl>
//                 <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
//               </FormItem>
//             )}
//           />
//         )}

//         {showMonthlyPrem && (
//           <FormField
//             control={form.control}
//             name="monthlyPremiumAmount"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-slate-600 font-medium">
//                   Monthly Premium Amount
//                 </FormLabel>
//                 <FormControl>
//                   <div className="relative">
//                     <Input
//                       type="number"
//                       {...field}
//                       className="pl-8 h-11 bg-white border-slate-200"
//                       placeholder="0"
//                     />
//                     <span className="absolute left-3 top-3 text-slate-400 font-bold">
//                       ৳
//                     </span>
//                   </div>
//                 </FormControl>
//                 <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
//               </FormItem>
//             )}
//           />
//         )}

//         {showSalary && (
//           <FormField
//             control={form.control}
//             name="monthlySalary"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-slate-600 font-medium">
//                   Monthly Salary
//                 </FormLabel>
//                 <FormControl>
//                   <div className="relative">
//                     <Input
//                       type="number"
//                       {...field}
//                       className="pl-8 h-11 bg-white border-slate-200"
//                       placeholder="0"
//                     />
//                     <span className="absolute left-3 top-3 text-slate-400 font-bold">
//                       ৳
//                     </span>
//                   </div>
//                 </FormControl>
//                 <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
//               </FormItem>
//             )}
//           />
//         )}

//         {(showPensionFields || showStipend) && (
//           <FormField
//             control={form.control}
//             name="ysapa"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-slate-600 font-medium">
//                   {showStipend ? "Stipend Amount" : "Pension Amount"}
//                 </FormLabel>
//                 <FormControl>
//                   <div className="relative">
//                     <Input
//                       type="number"
//                       {...field}
//                       className="pl-8 h-11 bg-white border-slate-200"
//                       placeholder="0"
//                     />
//                     <span className="absolute left-3 top-3 text-slate-400 font-bold">
//                       ৳
//                     </span>
//                   </div>
//                 </FormControl>
//                 <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
//               </FormItem>
//             )}
//           />
//         )}
//       </div>

//       {/* --- Section 4: Supplementary --- */}
//       {showSupPolicy && (
//         <div className="space-y-4 pt-2">
//           <div className="flex items-center gap-2 mb-2 text-orange-700">
//             <ShieldCheck className="w-5 h-5" />
//             <h3 className="text-lg font-semibold">Additional Coverage</h3>
//           </div>

//           <div className="p-5 bg-orange-50/50 rounded-xl border border-orange-100 grid grid-cols-1 md:grid-cols-2 gap-6">
//             <FormField
//               control={form.control}
//               name="supplementaryPolicy"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-slate-600 font-medium">
//                     Rider Selection
//                   </FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     value={field.value || "0"}
//                   >
//                     <FormControl>
//                       <SelectTrigger className="h-11 bg-white border-slate-200">
//                         <SelectValue placeholder="None" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent className="bg-white">
//                       <SelectItem value="0">No additional coverage</SelectItem>
//                       {supPolicies?.map((s: any) => (
//                         <SelectItem
//                           key={s.SupplimentryId}
//                           value={s.SupplimentryId.toString()}
//                         >
//                           {s.SubPolicyName}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </FormItem>
//               )}
//             />

//             {riskCategories && riskCategories.length > 0 && (
//               <FormField
//                 control={form.control}
//                 name="riskCategory"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-slate-600 font-medium">
//                       Risk Class
//                     </FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       value={field.value || ""}
//                     >
//                       <FormControl>
//                         <SelectTrigger className="h-11 bg-white border-slate-200">
//                           <SelectValue placeholder="Select Class" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent className="bg-white">
//                         {riskCategories.map((r: any) => (
//                           <SelectItem key={r.Class} value={r.Class}>
//                             {r.Class}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormItem>
//                 )}
//               />
//             )}
//           </div>
//         </div>
//       )}

//       {/* Buttons */}
//       <div className="pt-2">
//         <Button
//           type="submit"
//           size="lg"
//           className="w-full h-12 text-lg font-bold bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-200 rounded-xl transition-all"
//           disabled={isSubmitting || noTermsAvailable}
//         >
//           {isSubmitting ? (
//             <>
//               <Loader2 className="mr-2 animate-spin" /> Calculating...
//             </>
//           ) : (
//             <>
//               <Calculator className="mr-2" /> Calculate Premium
//             </>
//           )}
//         </Button>
//         <div className="text-center mt-3">
//           <Button
//             type="button"
//             variant="ghost"
//             onClick={onReset}
//             className="text-slate-400 hover:text-slate-600"
//           >
//             <RefreshCw className="w-4 h-4 mr-2" /> Reset Form
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import {
  User,
  FileText,
  ShieldCheck,
  Loader2,
  Calculator,
  RefreshCw,
  Sparkles,
  Wallet,
  CalendarDays,
} from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SmartDatePicker } from "@/components/ui/smart-date-picker";
import { cn } from "@/lib/utils";

interface CalculatorFormFieldsProps {
  policies: any[];
  installments: any[];
  durations: any[];
  supPolicies: any[];
  riskCategories: any[];
  loadingPol: boolean;
  loadingDur: boolean;
  isInstallmentLocked: boolean;
  showSumAssured: boolean;
  showMonthlyPrem: boolean;
  showPensionFields: boolean;
  showStipend: boolean;
  showSupPolicy: boolean;
  showSalary: boolean;
  noTermsAvailable: boolean;
  isSubmitting: boolean;
  onReset: () => void;
  onDateSelect: (date: Date) => void;
  calculatingAge: boolean;
  policyId: string;
}

export function CalculatorFormFields({
  policies,
  installments,
  durations,
  supPolicies,
  riskCategories,
  loadingPol,
  loadingDur,
  isInstallmentLocked,
  showSumAssured,
  showMonthlyPrem,
  showPensionFields,
  showStipend,
  showSupPolicy,
  showSalary,
  noTermsAvailable,
  isSubmitting,
  onReset,
  onDateSelect,
  calculatingAge,
  policyId,
}: CalculatorFormFieldsProps) {
  const form = useFormContext();
  const pid = parseInt(policyId || "0");

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* --- LEFT COLUMN: CORE INFO (8 Cols) --- */}
        <div className="lg:col-span-8 space-y-8">
          {/* PERSONAL DETAILS CARD */}
          <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm ring-1 ring-slate-200/50 rounded-2xl overflow-hidden">
            <div className="h-1 w-full bg-brand-500" />
            <CardHeader className="pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-brand-50 rounded-xl">
                  <User className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Personal Details
                  </h3>
                  <p className="text-sm text-slate-500">
                    Enter applicant's age details
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8">
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold flex items-center gap-2">
                          <CalendarDays className="w-4 h-4 text-brand-500" />{" "}
                          Date of Birth
                        </FormLabel>
                        <FormControl>
                          <SmartDatePicker
                            date={
                              field.value ? new Date(field.value) : undefined
                            }
                            setDate={(date) => {
                              if (date) {
                                field.onChange(format(date, "yyyy-MM-dd"));
                                onDateSelect(date);
                              } else {
                                field.onChange("");
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="md:col-span-4">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold">
                          Age <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            {calculatingAge && (
                              <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-20 rounded-xl backdrop-blur-[1px]">
                                <Loader2 className="w-5 h-5 animate-spin text-brand-600" />
                              </div>
                            )}
                            <Input
                              {...field}
                              type="number"
                              placeholder="0"
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                if (form.getValues("dob"))
                                  form.setValue("dob", "");
                                form.setValue("policyDuration", "");
                              }}
                              className={cn(
                                "h-10 font-bold text-center border-slate-200 focus:ring-brand-500/20 focus:border-brand-500 transition-all rounded-xl",
                                noTermsAvailable
                                  ? "bg-red-50 border-red-300 text-red-600"
                                  : "bg-white text-brand-900"
                              )}
                            />
                            <div className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 group-hover:text-brand-500 transition-colors">
                              YRS
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* POLICY PLAN CARD */}
          <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm ring-1 ring-slate-200/50 rounded-2xl overflow-hidden">
            <div className="h-1 w-full bg-blue-500" />
            <CardHeader className="pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 rounded-xl">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Policy Plan
                  </h3>
                  <p className="text-sm text-slate-500">
                    Select the plan and duration
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <FormField
                control={form.control}
                name="policyId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger className="h-14 bg-white border-slate-200 focus:ring-brand-500/20 focus:border-brand-500 rounded-xl shadow-sm text-lg">
                          <SelectValue
                            placeholder={
                              loadingPol
                                ? "Loading policies..."
                                : "Select a Policy..."
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white max-h-[300px]">
                        {policies?.map((p: any) => (
                          <SelectItem
                            key={p.PolicyId}
                            value={p.PolicyId.toString()}
                            className="focus:bg-brand-50 cursor-pointer py-3"
                          >
                            {p.PolicyName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="policyDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">
                        Policy Term <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                        disabled={!durations?.length}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "h-12 bg-white border-slate-200 rounded-xl focus:ring-brand-500/20",
                              noTermsAvailable &&
                                "border-amber-400 bg-amber-50 text-amber-700"
                            )}
                          >
                            <SelectValue
                              placeholder={
                                noTermsAvailable
                                  ? "Invalid Age"
                                  : loadingDur
                                  ? "Loading..."
                                  : "Select Years"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white">
                          {durations?.map((d: any) => (
                            <SelectItem
                              key={d.TermOfYear}
                              value={d.TermOfYear.toString()}
                            >
                              {d.TermOfYear} Years
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="installmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">
                        Payment Mode
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                        disabled={isInstallmentLocked}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "h-12 bg-white border-slate-200 rounded-xl focus:ring-brand-500/20",
                              isInstallmentLocked &&
                                "bg-slate-100 opacity-80 cursor-not-allowed"
                            )}
                          >
                            <SelectValue placeholder="Select Mode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white">
                          {installments?.map((i: any) => (
                            <SelectItem
                              key={i.InstallmentTypeId}
                              value={i.InstallmentTypeName}
                            >
                              {i.InstallmentTypeName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* SUPPLEMENTARY */}
          {showSupPolicy && (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60">
              <div className="flex items-center gap-2 mb-4 text-brand-700">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="text-lg font-bold">Additional Coverage</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="supplementaryPolicy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">
                        Rider Selection
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || "0"}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl">
                            <SelectValue placeholder="None" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white">
                          <SelectItem value="0">
                            No additional coverage
                          </SelectItem>
                          {supPolicies?.map((s: any) => (
                            <SelectItem
                              key={s.SupplimentryId}
                              value={s.SupplimentryId.toString()}
                            >
                              {s.SubPolicyName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                {riskCategories && riskCategories.length > 0 && (
                  <FormField
                    control={form.control}
                    name="riskCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold">
                          Risk Class
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl">
                              <SelectValue placeholder="Select Class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            {riskCategories.map((r: any) => (
                              <SelectItem key={r.Class} value={r.Class}>
                                {r.Class}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* --- RIGHT COLUMN: FINANCIALS (4 Cols) --- */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm ring-1 ring-slate-200/50 rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 w-full h-1.5 bg-linear-to-r from-brand-gold-400 to-brand-gold-600" />
            <CardHeader className="pb-4 bg-brand-gold-50/30">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-brand-gold-100 rounded-xl">
                  <Wallet className="w-5 h-5 text-brand-gold-700" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Financials
                  </h3>
                  <p className="text-sm text-slate-500">Amount details</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {showSumAssured && (
                <FormField
                  control={form.control}
                  name="totalPolicyAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">
                        Sum Assured Amount
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            {...field}
                            className="pl-10 h-12 bg-white border-brand-gold-200 focus:border-brand-gold-500 focus:ring-brand-gold-500/20 rounded-xl font-medium"
                            placeholder="0"
                          />
                          <span className="absolute left-3.5 top-3.5 text-brand-gold-500 font-bold">
                            ৳
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
                    </FormItem>
                  )}
                />
              )}

              {showMonthlyPrem && (
                <FormField
                  control={form.control}
                  name="monthlyPremiumAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">
                        Monthly Premium
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            {...field}
                            className="pl-10 h-12 bg-white border-brand-gold-200 focus:border-brand-gold-500 focus:ring-brand-gold-500/20 rounded-xl font-medium"
                            placeholder="0"
                          />
                          <span className="absolute left-3.5 top-3.5 text-brand-gold-500 font-bold">
                            ৳
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
                    </FormItem>
                  )}
                />
              )}

              {(showPensionFields || showStipend || pid === 7) && (
                <FormField
                  control={form.control}
                  name="ysapa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold flex items-center gap-2">
                        {pid === 7
                          ? "Yearly Stipend"
                          : showStipend
                          ? "Stipend Amount"
                          : "Pension Amount"}
                        <Sparkles className="w-3.5 h-3.5 text-brand-gold-500" />
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            {...field}
                            className="pl-10 h-12 bg-white border-brand-gold-200 focus:border-brand-gold-500 focus:ring-brand-gold-500/20 rounded-xl font-medium"
                            placeholder="0"
                          />
                          <span className="absolute left-3.5 top-3.5 text-brand-gold-500 font-bold">
                            ৳
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>

          {/* Buttons */}
          <div className="space-y-4">
            <Button
              type="submit"
              size="lg"
              className="w-full h-14 text-lg font-bold bg-amber-500 hover:bg-brand-700 text-white shadow-xl shadow-brand-500/30 rounded-2xl transition-all transform hover:-translate-y-1"
              disabled={isSubmitting || noTermsAvailable}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 animate-spin" /> Calculating...
                </>
              ) : (
                <>
                  <Calculator className="mr-2" /> Calculate Premium
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={onReset}
              className="w-full text-slate-400 border-slate-300 border hover:text-slate-600 hover:bg-slate-50 h-10 rounded-2xl"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Reset Form
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
