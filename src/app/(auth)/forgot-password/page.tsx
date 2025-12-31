"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  User,
  Briefcase,
  ArrowLeft,
  Loader2,
  Smartphone,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/lib/api/api-client";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Get default tab from URL (e.g. /forgot-password?type=agent)
  const initialType =
    searchParams.get("type") === "agent" ? "agent" : "policyholder";
  const [activeTab, setActiveTab] = useState<string>(initialType);

  // State
  const [formData, setFormData] = useState({
    id: "", // AgentId or PolicyId
    mobile: "", // Mobile Number
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- SUBMIT HANDLER ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validation
    if (!formData.id || !formData.mobile) {
      toast.error("Missing Information", {
        description: "Please enter your ID and Mobile Number.",
      });
      return;
    }

    setIsLoading(true);

    try {
      let endpoint = "";
      let payload = {};

      // 2. Prepare API Request based on Active Tab
      if (activeTab === "agent") {
        endpoint = "/Common/AgentForgetPass";
        payload = {
          AgentId: formData.id,
          Mobile: formData.mobile,
        };
      } else {
        endpoint = "/Common/ForgotPass";
        payload = {
          policyId: formData.id,
          mobile: formData.mobile,
        };
      }

      // 3. Call API
      const { data } = await apiClient.post(endpoint, payload);

      // 4. Handle Success
      if (data.success === "true" || data.success === true) {
        toast.success("Request Sent Successfully", {
          icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
          description:
            data.message || "Please check your mobile for the new password.",
          duration: 5000,
        });

        // Redirect to login after 2 seconds
        setTimeout(() => router.push(`/login?type=${activeTab}`), 2000);
      } else {
        // 5. Handle Server Error
        toast.error("Request Failed", {
          description:
            data.message || "Invalid ID or Mobile Number. Please try again.",
        });
      }
    } catch (error: any) {
      toast.error("System Error", {
        description: error?.message || "Unable to connect to server.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 animate-in fade-in duration-500">
      <div className="w-full max-w-md space-y-6">
        {/* Top Navigation */}
        <Link
          href={`/login?type=${activeTab}`}
          className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />{" "}
          Back to Login
        </Link>

        {/* Main Card */}
        <Card className="border-0 shadow-2xl shadow-slate-200/60 bg-white overflow-hidden rounded-3xl">
          {/* Header Gradient */}
          <div
            className={`h-32 bg-linear-to-br relative flex items-center justify-center transition-colors duration-500 ${
              activeTab === "agent"
                ? "from-blue-600 to-indigo-800"
                : "from-orange-500 to-red-600"
            }`}
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="text-center z-10">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20 shadow-lg">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white tracking-wide">
                Account Recovery
              </h1>
            </div>
          </div>

          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl font-bold text-slate-900">
              Forgot Password?
            </CardTitle>
            <CardDescription>
              Enter your details to reset your password.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-8">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              {/* Role Selection Tabs */}
              <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-slate-100 p-1 rounded-xl">
                <TabsTrigger
                  value="policyholder"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm font-bold text-xs sm:text-sm transition-all"
                  onClick={() => setFormData({ id: "", mobile: "" })}
                >
                  <User className="w-4 h-4 mr-2" /> Policyholder
                </TabsTrigger>
                <TabsTrigger
                  value="agent"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm font-bold text-xs sm:text-sm transition-all"
                  onClick={() => setFormData({ id: "", mobile: "" })}
                >
                  <Briefcase className="w-4 h-4 mr-2" /> Agent
                </TabsTrigger>
              </TabsList>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="id"
                    className="text-xs font-bold text-slate-500 uppercase"
                  >
                    {activeTab === "agent" ? "Agent ID" : "policy Id"}
                  </Label>
                  <div className="relative group">
                    <div
                      className={`absolute left-3 top-3 h-4 w-4 text-slate-400 transition-colors ${
                        activeTab === "agent"
                          ? "group-focus-within:text-blue-600"
                          : "group-focus-within:text-orange-600"
                      }`}
                    >
                      {activeTab === "agent" ? (
                        <Briefcase className="w-5 h-5" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                    </div>
                    <Input
                      id="id"
                      name="id"
                      placeholder={
                        activeTab === "agent" ? "e.g. 132617" : "e.g. 44993"
                      }
                      value={formData.id}
                      onChange={handleInputChange}
                      className={`pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all font-bold text-slate-800 ${
                        activeTab === "agent"
                          ? "focus:ring-blue-500/20 focus:border-blue-500"
                          : "focus:ring-orange-500/20 focus:border-orange-500"
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="mobile"
                    className="text-xs font-bold text-slate-500 uppercase"
                  >
                    Mobile Number
                  </Label>
                  <div className="relative group">
                    <div
                      className={`absolute left-3 top-3 h-4 w-4 text-slate-400 transition-colors ${
                        activeTab === "agent"
                          ? "group-focus-within:text-blue-600"
                          : "group-focus-within:text-orange-600"
                      }`}
                    >
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <Input
                      id="mobile"
                      name="mobile"
                      placeholder="e.g. 017..."
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className={`pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all font-bold text-slate-800 ${
                        activeTab === "agent"
                          ? "focus:ring-blue-500/20 focus:border-blue-500"
                          : "focus:ring-orange-500/20 focus:border-orange-500"
                      }`}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-12 text-white font-bold rounded-xl mt-4 shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                    activeTab === "agent"
                      ? "bg-blue-600 hover:bg-blue-700 shadow-blue-600/25"
                      : "bg-orange-500 hover:bg-orange-600 shadow-orange-500/25"
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            </Tabs>
          </CardContent>

          <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 text-center justify-center">
            <p className="text-xs text-slate-400 font-medium">
              Having trouble?{" "}
              <a href="#" className="text-slate-600 hover:underline font-bold">
                Contact Support
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
