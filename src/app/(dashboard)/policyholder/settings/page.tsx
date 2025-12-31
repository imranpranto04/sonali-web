"use client";

import { useState } from "react";
import {
  Lock,
  Save,
  Loader2,
  KeyRound,
  ShieldCheck,
  EyeOff,
  Eye,
} from "lucide-react";
import apiClient from "@/lib/api/api-client";
import { toast } from "sonner";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function PolicyholderSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  // State for toggling visibility
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- 1. CLIENT-SIDE VALIDATION ---
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error("Missing Fields", {
        description: "Please fill in all password fields.",
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Password Mismatch", {
        description: "New passwords do not match.",
      });
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.warning("Weak Password", {
        description: "Password must be at least 6 characters.",
      });
      return;
    }

    // --- 2. API SUBMISSION ---
    setIsLoading(true);
    const toastId = toast.loading("Updating password...");

    try {
      // API Call: Policyholder Specific Endpoint & Payload
      const { data } = await apiClient.post("/PolicyHolder/ChangePassword", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        conNewPassword: formData.confirmPassword, // API specifically asks for this key
      });

      // --- 3. HANDLE RESPONSE ---
      // The API returns success="true" even for errors, so we check the message content
      const responseMsg = data?.data?.[0]?.msg || data.message;
      const isErrorMsg =
        responseMsg?.toLowerCase().includes("not same") ||
        responseMsg?.toLowerCase().includes("incorrect") ||
        responseMsg?.toLowerCase().includes("wrong");

      if (data.success === "true" && !isErrorMsg) {
        toast.success("Success", {
          id: toastId,
          description: responseMsg || "Password changed successfully!",
        });
        // Clear form
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error("Update Failed", {
          id: toastId,
          description: responseMsg || "Could not change password.",
        });
      }
    } catch (error: any) {
      toast.error("System Error", {
        id: toastId,
        description:
          error?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-6 animate-in fade-in duration-500">
      {/* Premium Card Container */}
      <div className="w-full max-w-lg relative">
        {/* Background Decorative Blur */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl" />

        <Card className="border-0 shadow-2xl shadow-slate-200/50 bg-white overflow-hidden rounded-3xl relative z-10">
          {/* PREMIUM HEADER GRADIENT (Orange/Red for Policyholder) */}
          <div className="h-32 bg-gradient-to-r from-orange-600 to-red-600 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="text-center z-10">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-2 border border-white/20 shadow-lg">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white tracking-wide">
                My Account Security
              </h1>
            </div>
          </div>

          <CardHeader className="pt-8 pb-2 text-center">
            <CardTitle className="text-2xl font-black text-slate-800">
              Change Password
            </CardTitle>
            <CardDescription className="text-slate-500">
              Update your password to keep your policy account safe.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handlePasswordUpdate}>
            <CardContent className="space-y-5 px-8">
              {/* Current Password */}
              <div className="space-y-2 text-left">
                <Label
                  htmlFor="currentPassword"
                  className="text-xs font-bold text-slate-500 uppercase"
                >
                  Current Password
                </Label>
                <div className="relative group">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-orange-600 transition-colors" />
                  <Input
                    id="currentPassword"
                    type={showCurrent ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                  {/* Eye Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showCurrent ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2 text-left">
                <Label
                  htmlFor="newPassword"
                  className="text-xs font-bold text-slate-500 uppercase"
                >
                  New Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-orange-600 transition-colors" />
                  <Input
                    id="newPassword"
                    type={showNew ? "text" : "password"}
                    placeholder="Min 6 characters"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showNew ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2 text-left">
                <Label
                  htmlFor="confirmPassword"
                  className="text-xs font-bold text-slate-500 uppercase"
                >
                  Confirm Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-orange-600 transition-colors" />
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showConfirm ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-8 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-900 hover:bg-orange-600 text-white font-bold h-12 rounded-xl shadow-lg shadow-orange-900/10 hover:shadow-orange-600/20 active:scale-95 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />{" "}
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" /> Update Password
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
