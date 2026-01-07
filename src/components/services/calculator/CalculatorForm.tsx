// before new new update
"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AlertTriangle, Info, Crown, Sparkles } from "lucide-react";
import {
  format,
  isValid,
  differenceInYears,
  isFuture,
  isToday,
} from "date-fns";

import {
  calculatorService,
  CalculatorInput,
} from "@/lib/api/services/calculator-service";
import {
  calculatorSchema,
  CalculatorFormValues,
} from "@/lib/validations/calculator-schema";
import { POLICY_GROUPS, isGroup } from "@/lib/constants/policy-groups";

import { Form } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorFormFields } from "./CalculatorFormFields";
import { PremiumResultCard } from "./PremiumResultCard";

export default function CalculatorForm() {
  const [result, setResult] = useState<any>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [calculatingAge, setCalculatingAge] = useState(false);
  const lastRequestTime = useRef<number>(0);

  const form = useForm({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      dob: "",
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

  const { dob, age, policyId, supplementaryPolicy: supPolicyId } = form.watch();

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

  const isValidAge =
    age && !isNaN(Number(age)) && Number(age) > 0 && Number(age) < 100;

  const { data: durations, isLoading: loadingDur } = useQuery({
    queryKey: ["durations", policyId, age],
    queryFn: () => calculatorService.getDurations(policyId, age),
    enabled: !!policyId && !!isValidAge,
  });

  const { data: riskCategories } = useQuery({
    queryKey: ["risk", supPolicyId, age],
    queryFn: () => calculatorService.getRiskCategories(supPolicyId || "0", age),
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
        setTimeout(
          () =>
            document
              .getElementById("result-card")
              ?.scrollIntoView({ behavior: "smooth" }),
          100
        );
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
    const payload: CalculatorInput = {
      ...values,
      supplementaryPolicyDuration: hasSup ? values.policyDuration : "",
    };
    calculateMutation.mutate(payload);
  };

  // --- LOGIC: Date Handler ---
  const handleDateSelect = async (date: Date) => {
    if (!isValid(date) || isFuture(date) || isToday(date)) return;

    const requestId = Date.now();
    lastRequestTime.current = requestId;
    setCalculatingAge(true);

    try {
      const apiDate = format(date, "dd/MM/yyyy");
      const calculatedAge = await calculatorService.calculateAge(apiDate);

      if (lastRequestTime.current === requestId) {
        const yearDiff = new Date().getFullYear() - date.getFullYear();
        if (calculatedAge === "0" && yearDiff > 1) {
          form.setValue("age", yearDiff.toString());
        } else {
          form.setValue("age", calculatedAge);
        }
        form.setValue("policyDuration", "");
        setResult(null);
      }
    } catch (error) {
      console.error("Age Calculation Failed", error);
      // Fallback
      const localAge = differenceInYears(new Date(), date);
      form.setValue("age", localAge.toString());
    } finally {
      if (lastRequestTime.current === requestId) setCalculatingAge(false);
    }
  };

  // --- LOGIC: Policy Rules ---
  useEffect(() => {
    const pid = parseInt(policyId || "0");
    if (!pid) return;

    setResult(null);
    setApiError(null);
    form.setValue("policyDuration", "");

    if (pid === 9) {
      form.setValue("installmentType", "One Time");
    } else if (
      isGroup(pid, POLICY_GROUPS.MONTHLY_PREMIUM_BASED) ||
      isGroup(pid, POLICY_GROUPS.MICRO)
    ) {
      form.setValue("installmentType", "Monthly");
    }

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
      {/* --- HERO HEADER --- */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl ring-1 ring-slate-900/5 p-8 md:p-10">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[400px] h-[400px] bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[300px] h-[300px] bg-brand-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 border border-brand-gold-500/30 text-brand text-xs font-bold uppercase tracking-wider shadow-sm">
              <Crown className="w-3.5 h-3.5" /> Premium Tool
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
            Insurance Premium Calculator
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Plan your financial future with precision. Get an instant quote
            tailored to your needs.
          </p>
        </div>
      </div>

      {/* ERROR ALERTS */}
      {apiError && (
        <Alert
          variant="destructive"
          className="border-l-4 border-red-500 bg-red-50 shadow-sm"
        >
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertTitle className="text-red-800 font-semibold ml-2">
            Calculation Error
          </AlertTitle>
          <AlertDescription className="text-red-700 ml-2 mt-1">
            {apiError}
          </AlertDescription>
        </Alert>
      )}

      {noTermsAvailable && (
        <Alert className="border-l-4 border-brand-gold-500 bg-brand-gold-50 shadow-sm">
          <Info className="h-5 w-5 text-brand-gold-600" />
          <AlertTitle className="text-brand-gold-800 font-semibold ml-2">
            Unavailable for Age {age}
          </AlertTitle>
          <AlertDescription className="text-brand-gold-700 ml-2 mt-1">
            This policy plan is not available for your age. Please try a
            different plan.
          </AlertDescription>
        </Alert>
      )}

      {/* FORM CARD */}
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
            policyId={policyId}
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

      <PremiumResultCard result={result} formValues={form.getValues()} />
    </div>
  );
}
