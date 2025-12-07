"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthBanner } from "@/components/auth/AuthBanner";
import { LoginForm } from "@/components/auth/LoginForm";

function LoginContent() {
  const searchParams = useSearchParams();

  // 1. Check URL for 'agent' or 'policyholder'
  const initialType =
    searchParams.get("type") === "agent" ? "agent" : "policyholder";

  const [userType, setUserType] = useState<"policyholder" | "agent">(
    initialType
  );
  const [isAnimating, setIsAnimating] = useState(false);

  // 2. Sync if URL changes
  useEffect(() => {
    setUserType(initialType);
  }, [initialType]);

  // 3. Handle the switch
  const handleSwitch = (type: "policyholder" | "agent") => {
    if (type === userType) return;

    setIsAnimating(true);
    setTimeout(() => {
      setUserType(type);
      setIsAnimating(false);
    }, 300);
  };

  // 4. Dynamic Background Colors
  const gradientClass =
    userType === "policyholder"
      ? "from-orange-500 to-amber-500"
      : "from-blue-600 to-cyan-600";

  return (
    <div className="grow flex items-center justify-center p-4 md:p-8 relative overflow-hidden pt-[100px]">
      {/* Top Border Color */}
      <div
        className={`absolute top-0 left-0 w-full h-1.5 bg-linear-to-r transition-colors duration-500 ${gradientClass}`}
      />

      {/* Card Container */}
      <div className="w-full max-w-[1100px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[650px] border border-slate-100">
        {/* Left: Image Component */}
        <AuthBanner userType={userType} isAnimating={isAnimating} />

        {/* Right: Form Component */}
        <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <LoginForm userType={userType} onSwitch={handleSwitch} />
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans flex flex-col">
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        <LoginContent />
      </Suspense>
    </div>
  );
}
