"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Shield,
  ArrowRight,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  Lock,
  Wallet,
  Calendar,
} from "lucide-react";

import { usePolicies, usePolicyDetailsFull } from "@/hooks/use-policy-data";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";

// --- CONFIGURATION: Payment Gateways ---
const GATEWAY_CONFIG = {
  bkash: {
    id: "bkash",
    label: "bKash",
    url: "https://payment.bkash.com/pay",
    colorClass: "bg-pink-600 hover:bg-pink-700 shadow-pink-600/20",
  },
  nagad: {
    id: "nagad",
    label: "Nagad",
    url: "https://payment.nagad.com.bd/pay",
    colorClass: "bg-orange-600 hover:bg-orange-700 shadow-orange-600/20",
  },
  card: {
    id: "card",
    label: "Card",
    url: "/policyholder/payments/card",
    colorClass: "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20",
  },
};

function GatewaySelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* bKash */}
      <div
        onClick={() => onSelect("bkash")}
        className={`relative cursor-pointer rounded-2xl border-2 p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg ${
          selected === "bkash"
            ? "border-pink-500 bg-pink-50/50"
            : "border-slate-100 bg-white hover:border-pink-200"
        }`}
      >
        <div className="h-12 w-12 relative flex items-center justify-center">
          <div className="w-full h-full bg-pink-600 rounded-lg flex items-center justify-center text-white font-extrabold text-[10px] shadow-sm">
            bKash
          </div>
        </div>
        <div className="text-center">
          <p
            className={`font-bold text-sm ${
              selected === "bkash" ? "text-pink-700" : "text-slate-600"
            }`}
          >
            bKash
          </p>
        </div>
        {selected === "bkash" && (
          <div className="absolute top-3 right-3 text-pink-600 bg-pink-100 rounded-full p-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Nagad */}
      <div
        onClick={() => onSelect("nagad")}
        className={`relative cursor-pointer rounded-2xl border-2 p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg ${
          selected === "nagad"
            ? "border-orange-500 bg-orange-50/50"
            : "border-slate-100 bg-white hover:border-orange-200"
        }`}
      >
        <div className="h-14 w-14 relative flex items-center justify-center">
          {/* <div className="w-full h-full bg-orange-600 rounded-lg flex items-center justify-center text-white font-extrabold text-[10px] shadow-sm">
            Nagad
          </div> */}
          <Image
            src="/assets/brand/nagad-logo.png"
            alt="Nagad"
            width={55}
            height={55}
          />
        </div>
        <div className="text-center">
          <p
            className={`font-bold text-sm ${
              selected === "nagad" ? "text-orange-700" : "text-slate-600"
            }`}
          >
            Nagad
          </p>
        </div>
        {selected === "nagad" && (
          <div className="absolute top-3 right-3 text-orange-600 bg-orange-100 rounded-full p-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Card */}
      <div
        onClick={() => onSelect("card")}
        className={`relative cursor-pointer rounded-2xl border-2 p-0 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg overflow-hidden group ${
          selected === "card"
            ? "border-blue-600"
            : "border-slate-100 bg-white hover:border-blue-200"
        }`}
      >
        <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-purple-600 opacity-10 group-hover:opacity-20 transition-opacity"></div>
        <div className="z-10 flex flex-col items-center py-4 w-full">
          <div className="h-10 w-14 bg-linear-to-br from-blue-500 to-purple-600 rounded-md shadow-sm flex items-center justify-center text-white mb-2">
            <CreditCard className="w-6 h-6" />
          </div>
          <div className="text-center">
            <p
              className={`font-bold text-sm ${
                selected === "card" ? "text-blue-700" : "text-slate-600"
              }`}
            >
              Cards
            </p>
          </div>
        </div>
        {selected === "card" && (
          <div className="absolute top-3 right-3 text-blue-600 bg-blue-100 rounded-full p-0.5 z-10">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
}

// --- COMPONENT: CHECKOUT VIEW ---
function PaymentCheckout({ policyId }: { policyId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlGateway = searchParams.get("gateway");
  const initialGateway =
    urlGateway && Object.keys(GATEWAY_CONFIG).includes(urlGateway)
      ? (urlGateway as keyof typeof GATEWAY_CONFIG)
      : "bkash";

  const [gateway, setGateway] =
    useState<keyof typeof GATEWAY_CONFIG>(initialGateway);
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: fullDetails, isLoading } = usePolicyDetailsFull(policyId);

  if (isLoading)
    return (
      <div className="max-w-3xl mx-auto p-8 space-y-8">
        <Skeleton className="h-12 w-1/3" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64 w-full rounded-3xl" />
          <Skeleton className="h-64 w-full rounded-3xl" />
        </div>
      </div>
    );

  if (
    typeof fullDetails === "string" ||
    !fullDetails ||
    !fullDetails.PolicyInfo?.PolicyDetails?.length
  )
    return (
      <div className="p-20 text-center flex flex-col items-center">
        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
        <h3 className="text-xl font-bold text-slate-800">Policy Not Found</h3>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </div>
    );

  const info = fullDetails.PolicyInfo.PolicyDetails[0];

  // --- NEW: Calculate Due Month ---
  const history = fullDetails.PaymentsHistory || [];
  // Sort history to find last payment
  const sortedHistory = [...history].sort((a, b) => {
    // Parse DD/MM/YYYY
    const [dA, mA, yA] = a.DepositDate.split("/");
    const [dB, mB, yB] = b.DepositDate.split("/");
    return (
      new Date(`${yB}-${mB}-${dB}`).getTime() -
      new Date(`${yA}-${mA}-${dA}`).getTime()
    );
  });

  const lastPayment = sortedHistory[0];
  const nextDueDate = lastPayment?.Npdd || "N/A";

  // Format Month Name (e.g. "January 2026")
  let dueMonthDisplay = "N/A";
  if (nextDueDate !== "N/A") {
    try {
      const [day, month, year] = nextDueDate.split("/");
      const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
      dueMonthDisplay = dateObj.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      dueMonthDisplay = nextDueDate;
    }
  }

  const premium = info.BasicPremiumAmount || 0;
  const lateFee = (info as any).TotalLateFees || 0;
  const vat = 0;
  const totalPayable = premium + lateFee + vat;
  const nextInstallmentNo = info.TotalInstallmentsPaid + 1;

  //   @ts-ignore
  const currentConfig = GATEWAY_CONFIG[gateway];

  const handlePayment = async () => {
    if (!currentConfig) return;
    setIsProcessing(true);

    setTimeout(() => {
      if (gateway === "card") {
        router.push(
          `${currentConfig.url}?id=${policyId}&amount=${totalPayable}`
        );
      } else {
        // In production: Call backend API to get paymentURL
        const paymentUrl = `${currentConfig.url}?amount=${totalPayable}&ref=${policyId}`;
        console.log(`Redirecting to: ${paymentUrl}`);
        window.location.href = paymentUrl;
      }
      setIsProcessing(false);
    }, 1000);
  };

  const payButtonColor =
    gateway === "bkash"
      ? "bg-pink-600 hover:bg-pink-700 shadow-pink-600/20"
      : gateway === "nagad"
      ? "bg-orange-600 hover:bg-orange-700 shadow-orange-600/20"
      : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20";

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full bg-orange-400 hover:bg-orange-500 -ml-2"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </Button>
        <div>
          <h1 className="text-2xl font-extrabold text-orange-400">Checkout</h1>
          <p className="text-slate-500 text-sm">
            Secure payment for <strong>{dueMonthDisplay}</strong>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Invoice & Policy Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Policy Summary Card */}
          <Card className="border-none shadow-md overflow-hidden bg-white">
            <div className="h-2 bg-linear-to-r from-orange-400 to-orange-600" />
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                <div className="flex gap-4">
                  <div className="h-14 w-14 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center border border-slate-100">
                    <Shield className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900">
                      {info.PolicyName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className="text-slate-500 border-slate-200 font-mono font-normal"
                      >
                        {policyId}
                      </Badge>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 font-bold shadow-none">
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 py-6 border-t border-dashed border-slate-200">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Payment For
                  </p>
                  <p className="font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-500" />{" "}
                    {dueMonthDisplay}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Installment No.
                  </p>
                  <p className="font-bold text-slate-700">
                    {nextInstallmentNo}{" "}
                    <span className="text-slate-400 font-normal">
                      / {info.TotalNumberOfInstallments}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Late Fees
                  </p>
                  <p className="font-bold text-slate-700">৳ {lateFee}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Base Premium
                  </p>
                  <p className="font-bold text-slate-700">
                    ৳ {premium.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                <p className="text-sm font-medium text-slate-500">
                  Total Payable Amount
                </p>
                <span className="text-3xl font-extrabold text-slate-900">
                  ৳ {totalPayable.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Gateway Selection */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pl-1">
              Select Payment Method
            </h3>
            <GatewaySelector
              selected={gateway}
              onSelect={(v) => setGateway(v as any)}
            />
          </div>
        </div>

        {/* RIGHT: Payment Action */}
        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-none shadow-xl p-8 relative overflow-hidden rounded-3xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-600 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col h-full">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-6">
                Payment Summary
              </p>

              <div className="space-y-3 mb-8 flex-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">For Month</span>
                  <span className="font-medium text-white">
                    {dueMonthDisplay}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Installment</span>
                  <span className="font-medium">#{nextInstallmentNo}</span>
                </div>
                <div className="h-px bg-white/10 my-4"></div>
                <div className="flex justify-between items-end">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-2xl font-extrabold text-orange-400">
                    ৳ {totalPayable.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full text-white font-bold h-14 text-base shadow-lg transition-all ${payButtonColor}`}
              >
                {isProcessing
                  ? "Processing..."
                  : `Pay with ${currentConfig?.label}`}
                {!isProcessing && <ArrowRight className="w-5 h-5 ml-2" />}
              </Button>

              <p className="text-[10px] text-center text-slate-500 mt-6 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Secure 128-bit SSL Encrypted
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ... (Rest of the file remains the same: PolicySelectionList, PaymentPage export)
function PolicySelectionList() {
  const { data: policies, isLoading } = usePolicies();

  if (isLoading)
    return (
      <div className="p-8">
        <Skeleton className="h-96 w-full" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-10 pb-20 animate-in fade-in">
      <div className="text-center space-y-2 mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-orange-50 text-orange-600 rounded-full mb-4">
          <Wallet className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Make a Payment
        </h1>
        <p className="text-slate-500">
          Select a policy to proceed with premium payment.
        </p>
      </div>

      <div className="grid gap-4">
        {policies?.map((policy) => (
          <Link
            key={policy.FPRId}
            href={`/policyholder/payments?policyId=${policy.FPRId}`}
            className="block group"
          >
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 hover:border-orange-400 shadow-lg hover:shadow-lg transition-all cursor-pointer mb-4 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-slate-200 group-hover:bg-orange-500 transition-colors"></div>

              <div className="flex-1 flex items-center gap-5 pl-4 w-full">
                <div className="h-14 w-14 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100 group-hover:bg-orange-50 group-hover:text-orange-600 group-hover:scale-110 transition-all">
                  <Shield className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 group-hover:text-orange-700 transition-colors">
                    {policy.Category || "Insurance Plan"}
                  </h4>
                  <p className="text-sm text-slate-500 font-mono">
                    No: {policy.PolicyNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end pl-4 md:pl-0 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 mt-4 md:mt-0">
                <div className="text-left md:text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Premium
                  </p>
                  <p className="text-xl font-extrabold text-orange-500">
                    ৳ {policy.PremiumAmount.toLocaleString()}
                  </p>
                </div>

                <Button className="bg-slate-900 hover:bg-orange-600 text-white font-bold shadow-md transition-all rounded-xl h-12 px-6">
                  Select{" "}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function PaymentPageContent() {
  const searchParams = useSearchParams();
  const policyId = searchParams.get("policyId");

  if (policyId) {
    return <PaymentCheckout policyId={policyId} />;
  }
  return <PolicySelectionList />;
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <PaymentPageContent />
    </Suspense>
  );
}
