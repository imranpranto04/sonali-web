"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Briefcase,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  AlertCircle,
  Loader2,
  ChevronLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";
import apiClient from "@/lib/api/api-client";

interface LoginFormProps {
  userType: "policyholder" | "agent";
  onSwitch: (type: "policyholder" | "agent") => void;
}

export function LoginForm({ userType, onSwitch }: LoginFormProps) {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  // Form State
  const [formData, setFormData] = useState({ id: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle Typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(null);
  };

  // Handle Real Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // STOP page refresh
    e.stopPropagation();

    if (!formData.id || !formData.password) {
      setErrorMessage("Please enter both ID and Password.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 1. Use the Correct Endpoint
      const endpoint =
        userType === "policyholder" ? "/Token/PolicyHolder" : "/Token/Agent";

      console.log(`Calling API: ${endpoint}`);

      // 2. Call API
      const response = await apiClient.post(endpoint, {
        UserName: formData.id,
        Password: formData.password,
      });

      console.log("FULL API Response:", response);
      const data = response.data;

      // 3. Check for Success
      if (data.success === "true" || data.success === true) {
        // 4. Extract Token (Updated for lowercase 'token' inside data object)
        // The error showed: data: { token: "..." }
        const token =
          data.data?.token ||
          data.data?.Token ||
          (Array.isArray(data.data) && data.data[0]?.Token) ||
          data.token ||
          data.Token;

        if (token) {
          console.log("Token found successfully:", token);

          const userData = {
            id: formData.id,
            // Try to find name in response, fallback to ID
            name:
              data.data?.UserName ||
              (Array.isArray(data.data) && data.data[0]?.UserName) ||
              formData.id,
            role: userType,
          };

          // 5. Update Store
          login(userData, token);

          // 6. Redirect
          if (userType === "agent") {
            router.replace("/agent");
          } else {
            router.replace("/policyholder");
          }
        } else {
          console.error(
            "CRITICAL: Login success true, but NO Token found. Data structure:",
            JSON.stringify(data, null, 2)
          );
          setErrorMessage(
            "Login succeeded but the server didn't return a valid security token."
          );
        }
      } else {
        setErrorMessage(data.message || "Invalid ID or Password.");
      }
    } catch (error: any) {
      console.error("Login Error Details:", error);
      const msg =
        error.response?.data?.message || error.message || "Connection failed.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic Theme Config
  const theme =
    userType === "policyholder"
      ? {
          text: "text-orange-600",
          focusBorder: "focus:border-orange-500",
          ring: "focus:ring-orange-500/20",
          button:
            "bg-gradient-to-r from-orange-500 to-orange-600 shadow-orange-500/25 hover:shadow-orange-500/40",
          tabActive:
            "bg-white text-orange-600 shadow-sm ring-1 ring-orange-100 border-b-2 border-orange-500",
          iconColor: "text-orange-500",
        }
      : {
          text: "text-blue-600",
          focusBorder: "focus:border-blue-500",
          ring: "focus:ring-blue-500/20",
          button:
            "bg-gradient-to-r from-blue-600 to-blue-700 shadow-blue-600/25 hover:shadow-blue-600/40",
          tabActive:
            "bg-white text-blue-600 shadow-sm ring-1 ring-blue-100 border-b-2 border-blue-600",
          iconColor: "text-blue-500",
        };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8">
        <h3 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
          <span className={theme.text}>
            {userType === "policyholder" ? "Policyholder" : "Agent"}
          </span>{" "}
          Login
        </h3>
        <p className="text-slate-500 mt-1.5 text-sm font-medium">
          Please enter your credentials to secure access.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-xl mb-8 border border-slate-200">
        <button
          type="button"
          onClick={() => onSwitch("policyholder")}
          className={`flex items-center justify-center gap-2 py-3.5 rounded-lg text-sm font-bold transition-all duration-300 ${
            userType === "policyholder"
              ? theme.tabActive
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-200"
          }`}
        >
          <User className="w-4 h-4" /> Policyholder
        </button>
        <button
          type="button"
          onClick={() => onSwitch("agent")}
          className={`flex items-center justify-center gap-2 py-3.5 rounded-lg text-sm font-bold transition-all duration-300 ${
            userType === "agent"
              ? theme.tabActive
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Briefcase className="w-4 h-4" /> Agent
        </button>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 animate-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-bold">{errorMessage}</p>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* ID Input */}
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">
            {userType === "policyholder"
              ? "Policy ID / Mobile Number"
              : "Agent Code"}
          </Label>
          <div className="relative group">
            <div
              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 text-slate-400 group-focus-within:${theme.iconColor}`}
            >
              {userType === "policyholder" ? (
                <ShieldCheck className="w-5 h-5" />
              ) : (
                <Briefcase className="w-5 h-5" />
              )}
            </div>
            <Input
              name="id"
              type="text"
              placeholder={
                userType === "policyholder" ? "e.g. 58392018" : "e.g. AG-12345"
              }
              value={formData.id}
              onChange={handleChange}
              required
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-6 pl-12 pr-4 text-slate-900 font-medium outline-none transition-all duration-300 focus:bg-white ${theme.focusBorder} focus:ring-4 ${theme.ring}`}
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center ml-1">
            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Password
            </Label>
            <Link
              href="#"
              className={`text-xs font-bold hover:underline ${theme.text}`}
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative group">
            <div
              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 text-slate-400 group-focus-within:${theme.iconColor}`}
            >
              <Lock className="w-5 h-5" />
            </div>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-6 pl-12 pr-12 text-slate-900 font-medium outline-none transition-all duration-300 focus:bg-white ${theme.focusBorder} focus:ring-4 ${theme.ring}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className={`w-full py-6 rounded-xl font-bold text-white shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group mt-6 ${theme.button}`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
            </>
          ) : (
            <>
              Secure Login{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-8 pt-8 border-t border-slate-100 text-center">
        <div
          className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[11px] font-medium border transition-colors duration-300 ${
            userType === "policyholder"
              ? "bg-orange-50 border-orange-100 text-orange-700"
              : "bg-blue-50 border-blue-100 text-blue-700"
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Don't have an account? Contact your branch.
        </div>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ChevronLeft className="w-3 h-3" /> Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
