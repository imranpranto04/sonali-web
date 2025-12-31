"use client";

import { useState } from "react";
import {
  Lock,
  Save,
  Loader2,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
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

export default function AgentSettingsPage() {
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

    // 1. Validation
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

    // 2. API Call
    setIsLoading(true);
    const toastId = toast.loading("Updating password...");

    try {
      const { data } = await apiClient.post("/Agent/ChangePass", {
        CurrentPassword: formData.currentPassword,
        NewPassword: formData.newPassword,
      });

      if (data.success === "true") {
        toast.success("Success", {
          id: toastId,
          description: "Password changed successfully!",
        });
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error("Error", {
          id: toastId,
          description: data.message || "Failed to change password.",
        });
      }
    } catch (error: any) {
      toast.error("System Error", {
        id: toastId,
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-6 animate-in fade-in duration-500">
      <div className="w-full max-w-lg relative">
        {/* Background Glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />

        <Card className="border-0 shadow-2xl shadow-slate-200/50 bg-white overflow-hidden rounded-3xl relative z-10">
          {/* Header */}
          <div className="h-32 bg-linear-to-r from-slate-900 to-indigo-900 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="text-center z-10">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-2 border border-white/20 shadow-lg">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white tracking-wide">
                Account Security
              </h1>
            </div>
          </div>

          <CardHeader className="pt-8 pb-2 text-center">
            <CardTitle className="text-2xl font-black text-slate-800">
              Change Password
            </CardTitle>
            <CardDescription className="text-slate-500">
              Update your password to keep your account secure.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handlePasswordUpdate}>
            <CardContent className="space-y-5 px-8">
              {/* Current Password Field */}
              <div className="space-y-2 text-left">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative group">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <Input
                    id="currentPassword"
                    type={showCurrent ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="pl-10 pr-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
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

              {/* New Password Field */}
              <div className="space-y-2 text-left">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <Input
                    id="newPassword"
                    type={showNew ? "text" : "password"}
                    placeholder="Min 6 characters"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="pl-10 pr-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
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

              {/* Confirm Password Field */}
              <div className="space-y-2 text-left">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 pr-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
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
                className="w-full bg-slate-900 hover:bg-indigo-900 text-white font-bold h-12 rounded-xl shadow-lg shadow-indigo-900/20 active:scale-95 transition-all"
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
