"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // Import useRouter
import { AuthBanner } from "@/components/auth/AuthBanner";
import { LoginForm } from "@/components/auth/LoginForm";

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter(); // Initialize Router

  // 1. Get initial type from URL, default to 'policyholder'
  const initialType =
    searchParams.get("type") === "agent" ? "agent" : "policyholder";

  const [userType, setUserType] = useState<"policyholder" | "agent">(
    initialType
  );
  const [isAnimating, setIsAnimating] = useState(false);

  // 2. Sync State if URL changes (e.g. Back Button or Logout Redirect)
  useEffect(() => {
    setUserType(initialType);
  }, [initialType]);

  // 3. Handle the switch (FIXED: Updates URL)
  const handleSwitch = (type: "policyholder" | "agent") => {
    if (type === userType) return;

    setIsAnimating(true);

    // Update URL immediately so if page reloads, it stays on this tab
    router.replace(`/login?type=${type}`, { scroll: false });

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
          <div className="flex h-screen items-center justify-center text-slate-400">
            Loading...
          </div>
        }
      >
        <LoginContent />
      </Suspense>
    </div>
  );
}
