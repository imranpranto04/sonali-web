"use client";

import { useFormContext } from "react-hook-form";
import { format, isValid } from "date-fns";
import {
  User,
  CalendarDays,
  FileText,
  ShieldCheck,
  Loader2,
  Calculator,
  RefreshCw,
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
import { Separator } from "@/components/ui/separator";
import { SmartDatePicker } from "@/components/ui/smart-date-picker";
import { cn } from "@/lib/utils";

// Types for the props received from the parent
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
  // Callback to trigger age calculation from parent
  onDateSelect: (date: Date) => void;
  calculatingAge: boolean;
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
}: CalculatorFormFieldsProps) {
  const form = useFormContext(); // Access form methods automatically

  return (
    <div className="space-y-8">
      {/* --- Section 1: Personal Details --- */}
      <div className="space-y-4">
        <div className="flex justify-center items-center gap-2 mb-2">
          <User className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-semibold text-slate-800">
            Personal Details
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Date of Birth */}
          <div className="md:col-span-8">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 font-medium">
                    Date of Birth{" "}
                    {/* <span className="text-xs text-slate-400 font-normal">
                      (Optional if Age known)
                    </span> */}
                  </FormLabel>
                  <FormControl>
                    <SmartDatePicker
                      date={field.value ? new Date(field.value) : undefined}
                      setDate={(date) => {
                        const isoDate = date ? format(date, "yyyy-MM-dd") : "";
                        field.onChange(isoDate);
                        if (date && isValid(date)) {
                          onDateSelect(date); // Trigger parent calculation
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
                </FormItem>
              )}
            />
          </div>

          {/* Age Input (Editable) */}
          <div className="md:col-span-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 font-medium">
                    Age <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      {calculatingAge && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 rounded-xl">
                          <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                        </div>
                      )}
                      <Input
                        {...field}
                        type="number"
                        placeholder="0"
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          // If typing age manually, reset DOB
                          if (form.getValues("dob")) form.setValue("dob", "");
                          form.setValue("policyDuration", ""); // Reset duration
                        }}
                        className={cn(
                          "h-10 font-bold text-center border-slate-200 focus:ring-emerald-500/20",
                          noTermsAvailable
                            ? "bg-red-50 border-red-300 text-red-600"
                            : "bg-white text-slate-700"
                        )}
                      />
                      <div className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">
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
      </div>

      <Separator className="bg-slate-100" />

      {/* --- Section 2: Policy Selection --- */}
      <div className="space-y-4">
        <div className="flex justify-center items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-semibold text-slate-800">Policy Plan</h3>
        </div>

        <FormField
          control={form.control}
          name="policyId"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger className="h-11 bg-white border-slate-200 focus:ring-emerald-500/20">
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
                    <SelectItem key={p.PolicyId} value={p.PolicyId.toString()}>
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
                <FormLabel className="text-slate-600 font-medium">
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
                        "h-11 bg-white border-slate-200",
                        noTermsAvailable && "border-amber-400 bg-amber-50"
                      )}
                    >
                      <SelectValue
                        placeholder={
                          noTermsAvailable
                            ? "Invalid Age for Policy"
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
                <FormLabel className="text-slate-600 font-medium">
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
                        "h-11 bg-white border-slate-200",
                        isInstallmentLocked && "bg-slate-100 opacity-80"
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
      </div>

      {/* --- Section 3: Financials --- */}
      <div className="p-5 bg-slate-50/80 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
        {showSumAssured && (
          <FormField
            control={form.control}
            name="totalPolicyAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-600 font-medium">
                  Sum Assured Amount
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      {...field}
                      className="pl-8 h-11 bg-white border-slate-200"
                      placeholder="0"
                    />
                    <span className="absolute left-3 top-3 text-slate-400 font-bold">
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
                <FormLabel className="text-slate-600 font-medium">
                  Monthly Premium Amount
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      {...field}
                      className="pl-8 h-11 bg-white border-slate-200"
                      placeholder="0"
                    />
                    <span className="absolute left-3 top-3 text-slate-400 font-bold">
                      ৳
                    </span>
                  </div>
                </FormControl>
                <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
              </FormItem>
            )}
          />
        )}

        {showSalary && (
          <FormField
            control={form.control}
            name="monthlySalary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-600 font-medium">
                  Monthly Salary
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      {...field}
                      className="pl-8 h-11 bg-white border-slate-200"
                      placeholder="0"
                    />
                    <span className="absolute left-3 top-3 text-slate-400 font-bold">
                      ৳
                    </span>
                  </div>
                </FormControl>
                <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
              </FormItem>
            )}
          />
        )}

        {(showPensionFields || showStipend) && (
          <FormField
            control={form.control}
            name="ysapa"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-600 font-medium">
                  {showStipend ? "Stipend Amount" : "Pension Amount"}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      {...field}
                      className="pl-8 h-11 bg-white border-slate-200"
                      placeholder="0"
                    />
                    <span className="absolute left-3 top-3 text-slate-400 font-bold">
                      ৳
                    </span>
                  </div>
                </FormControl>
                <FormMessage className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold inline-block mt-1" />
              </FormItem>
            )}
          />
        )}
      </div>

      {/* --- Section 4: Supplementary --- */}
      {showSupPolicy && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 mb-2 text-orange-700">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Additional Coverage</h3>
          </div>

          <div className="p-5 bg-orange-50/50 rounded-xl border border-orange-100 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="supplementaryPolicy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 font-medium">
                    Rider Selection
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || "0"}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 bg-white border-slate-200">
                        <SelectValue placeholder="None" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="0">No additional coverage</SelectItem>
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
                    <FormLabel className="text-slate-600 font-medium">
                      Risk Class
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 bg-white border-slate-200">
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

      {/* Buttons */}
      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          className="w-full h-12 text-lg font-bold bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-200 rounded-xl transition-all"
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
        <div className="text-center mt-3">
          <Button
            type="button"
            variant="ghost"
            onClick={onReset}
            className="text-slate-400 hover:text-slate-600"
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Reset Form
          </Button>
        </div>
      </div>
    </div>
  );
}
