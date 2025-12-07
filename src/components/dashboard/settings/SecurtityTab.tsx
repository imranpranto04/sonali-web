"use client";

import { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  Save,
  KeyRound,
  ShieldCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
// import apiClient from '@/lib/api/api-client' // Uncomment for real API

export function SecurityTab() {
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      setStatus("error");
      setMessage("New passwords do not match.");
      return;
    }
    if (formData.newPassword.length < 6) {
      setStatus("error");
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      // --- API CALL GOES HERE ---
      // const res = await apiClient.post('/Auth/ChangePassword', { ... });

      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay

      setStatus("success");
      setMessage("Password updated successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setStatus("error");
      setMessage("Failed to update password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-slate-100 shadow-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-900"></div>

        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-slate-200 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-slate-900">
                Password & Security
              </CardTitle>
              <CardDescription>
                Update your password to keep your account secure.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="p-8 space-y-6 max-w-2xl">
            {status !== "idle" && (
              <div
                className={`p-3 rounded-lg flex items-center gap-2 text-sm font-medium ${
                  status === "error"
                    ? "bg-red-50 text-red-600"
                    : "bg-green-50 text-green-600"
                }`}
              >
                {status === "error" ? (
                  <AlertCircle className="w-4 h-4" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                {message}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-700 font-bold">
                  Current Password
                </Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type={showOldPass ? "text" : "password"}
                    placeholder="Enter current password"
                    className="pl-10 pr-10 h-11 bg-slate-50 border-slate-200 focus-visible:ring-orange-500"
                    value={formData.currentPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentPassword: e.target.value,
                      })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPass(!showOldPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showOldPass ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-bold">
                    New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type={showNewPass ? "text" : "password"}
                      placeholder="New password"
                      className="pl-10 pr-10 h-11 bg-slate-50 border-slate-200 focus-visible:ring-orange-500"
                      value={formData.newPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          newPassword: e.target.value,
                        })
                      }
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPass ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-bold">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="password"
                      placeholder="Re-enter password"
                      className="pl-10 h-11 bg-slate-50 border-slate-200 focus-visible:ring-orange-500"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50 border-t border-slate-100 p-6 flex justify-end">
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg transition-all gap-2 h-11 px-8"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
