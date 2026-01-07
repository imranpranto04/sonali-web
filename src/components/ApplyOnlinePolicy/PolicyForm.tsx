"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Heart,
  CreditCard,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import { format, differenceInYears } from "date-fns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SmartDatePicker } from "@/components/ui/smart-date-picker";
import { cn } from "@/lib/utils";

// --- 1. Static Validation Schema (For Demo) ---
const identitySchema = z.object({
  applicantName: z.string().min(3, "Name is required"),
  fatherName: z.string().min(3, "Father's name is required"),
  motherName: z.string().min(3, "Mother's name is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  age: z.string(),
  // gender: z.enum(["Male", "Female"], { required_error: "Select gender" }),
  maritalStatus: z.string().min(1, "Select status"),
  spouseName: z.string().optional(),
  mobileNo: z.string().regex(/^01[3-9]\d{8}$/, "Invalid Mobile Number"),
  email: z.string().email().optional().or(z.literal("")),
  permanentAddress: z.string().min(5, "Address is required"),
  district: z.string().min(1, "Select District"),
  policeStation: z.string().min(1, "Enter Thana"),
  nid: z.string().min(10, "NID must be at least 10 digits"),
  tin: z.string().optional(),
});

export default function PolicyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof identitySchema>>({
    resolver: zodResolver(identitySchema),
    defaultValues: {
      applicantName: "",
      fatherName: "",
      motherName: "",
      dob: "",
      age: "",
      // gender: "Male",
      maritalStatus: "",
      spouseName: "",
      mobileNo: "",
      email: "",
      permanentAddress: "",
      district: "",
      policeStation: "",
      nid: "",
      tin: "",
    },
  });

  // Watch for conditional logic
  const maritalStatus = form.watch("maritalStatus");

  // Mock Submit Function
  const onSubmit = (values: any) => {
    setIsSubmitting(true);
    console.log("Static Form Data:", values);

    // Simulate API delay for demo
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Demo: Form Validated & Ready for Next Step!");
    }, 1500);
  };

  return (
    <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur rounded-2xl overflow-hidden">
      <div className="h-1.5 w-full bg-linear-to-r from-emerald-500 to-teal-500" />
      <CardContent className="p-8 md:p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            {/* --- SECTION 1: PERSONAL DETAILS --- */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                <div className="p-2.5 bg-emerald-50 rounded-xl">
                  <User className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Personal Information
                  </h3>
                  <p className="text-sm text-slate-500">
                    According to your NID / Passport
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="applicantName"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel className="text-slate-600 font-medium">
                        Applicant Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. Md. Abdur Rahman"
                          className="h-12 bg-white focus:ring-emerald-500/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Parents */}
                <FormField
                  control={form.control}
                  name="fatherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-medium">
                        Father's Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="h-12 bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="motherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-medium">
                        Mother's Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="h-12 bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* DOB & Age */}
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-medium">
                        Date of Birth <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <SmartDatePicker
                          date={field.value ? new Date(field.value) : undefined}
                          setDate={(date) => {
                            if (date) {
                              field.onChange(format(date, "yyyy-MM-dd"));
                              const age = differenceInYears(new Date(), date);
                              form.setValue("age", age.toString());
                            } else {
                              field.onChange("");
                              form.setValue("age", "");
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-medium">
                        Calculated Age
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            readOnly
                            className="h-12 bg-slate-100 font-bold text-center text-slate-700"
                          />
                          <span className="absolute right-4 top-3.5 text-xs font-bold text-slate-400">
                            YEARS
                          </span>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Gender & Marital Status */}
                {/* <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-slate-600 font-medium">
                        Gender <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 cursor-pointer hover:border-emerald-200 transition-colors w-full">
                            <FormControl>
                              <RadioGroupItem value="Male" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex-1">
                              Male
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 cursor-pointer hover:border-emerald-200 transition-colors w-full">
                            <FormControl>
                              <RadioGroupItem value="Female" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex-1">
                              Female
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-medium">
                        Marital Status <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 bg-white">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Single">Single</SelectItem>
                          <SelectItem value="Married">Married</SelectItem>
                          <SelectItem value="Divorced">Divorced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Conditional Spouse Field */}
                {maritalStatus === "Married" && (
                  <FormField
                    control={form.control}
                    name="spouseName"
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <FormLabel className="text-emerald-700 font-medium flex items-center gap-2">
                          <Heart className="w-4 h-4 fill-emerald-100" /> Spouse
                          Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-12 bg-emerald-50/30 border-emerald-100 focus:border-emerald-400 focus:ring-emerald-500/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>

            {/* --- SECTION 2: CONTACT & ADDRESS --- */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                <div className="p-2.5 bg-blue-50 rounded-xl">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Address & Contact
                  </h3>
                  <p className="text-sm text-slate-500">
                    Permanent address details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="mobileNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-medium">
                        Mobile Number <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                          <Input
                            {...field}
                            placeholder="01XXXXXXXXX"
                            className="pl-10 h-12 bg-white"
                            maxLength={11}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-medium">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                          <Input
                            {...field}
                            placeholder="you@example.com"
                            className="pl-10 h-12 bg-white"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="permanentAddress"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel className="text-slate-600 font-medium">
                        Village / Road / House{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-12 bg-white"
                          placeholder="Enter full address details"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-medium">
                        District <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 bg-white">
                            <SelectValue placeholder="Select District" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Dhaka">Dhaka</SelectItem>
                          <SelectItem value="Chittagong">Chittagong</SelectItem>
                          <SelectItem value="Sylhet">Sylhet</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="policeStation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-medium">
                        Police Station (Thana){" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-12 bg-white"
                          placeholder="Enter Thana name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* --- SECTION 3: IDENTITY --- */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                <div className="p-2.5 bg-orange-50 rounded-xl">
                  <CreditCard className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Identification
                  </h3>
                  <p className="text-sm text-slate-500">Legal documents</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="nid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-medium">
                        National ID (NID){" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter NID Number"
                          className="h-12 bg-white"
                          maxLength={17}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-medium">
                        TIN Number (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter TIN Number"
                          className="h-12 bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className="bg-slate-100" />

            {/* --- ACTION BUTTONS --- */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto h-14 px-8 text-lg font-bold bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-200 rounded-xl transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Next Step"}{" "}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
