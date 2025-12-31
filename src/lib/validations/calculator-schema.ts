// import { z } from "zod";
// import { POLICY_GROUPS, isGroup } from "@/lib/constants/policy-groups";

// export const calculatorSchema = z
//   .object({
//     dob: z.string().min(1, "Date of Birth is required"),
//     age: z.string().min(1, "Age is required"),
//     policyId: z.string().min(1, "Please select a policy"),

//     // STRICT CHECK: Duration must be selected and cannot be "0"
//     policyDuration: z.string().refine((val) => val !== "" && val !== "0", {
//       message: "Please select a Policy Duration (Year)",
//     }),

//     installmentType: z.string().min(1, "Payment Mode is required"),

//     // Defaults
//     totalPolicyAmount: z.string().default(""),
//     monthlyPremiumAmount: z.string().default(""),
//     ysapa: z.string().default(""),
//     monthlySalary: z.string().default(""),
//     pensionAge: z.string().default("55"),
//     supplementaryPolicy: z.string().default("0"),
//     riskCategory: z.string().default(""),
//     gender: z.string().default("Male"),
//     noOfNominee: z.string().default(""),
//   })
//   .superRefine((data, ctx) => {
//     const pid = parseInt(data.policyId);
//     const sumAssured = parseFloat(data.totalPolicyAmount || "0");
//     const monthlyPrem = parseFloat(data.monthlyPremiumAmount || "0");
//     const age = parseInt(data.age || "0");

//     // --- POLICY 13 (Micro/Monthly) VALIDATION ---
//     // Policy 13 belongs to MICRO or MONTHLY_PREMIUM_BASED group
//     if (
//       isGroup(pid, POLICY_GROUPS.MONTHLY_PREMIUM_BASED) ||
//       isGroup(pid, POLICY_GROUPS.MICRO)
//     ) {
//       if (!data.monthlyPremiumAmount || monthlyPrem <= 0) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["monthlyPremiumAmount"],
//           message: "Please enter a valid Monthly Premium Amount (e.g. 500)",
//         });
//       }
//     }

//     // --- STANDARD POLICY VALIDATION ---
//     if (
//       (isGroup(pid, POLICY_GROUPS.STANDARD) ||
//         isGroup(pid, POLICY_GROUPS.SIMPLE) ||
//         isGroup(pid, POLICY_GROUPS.EDUCATION)) &&
//       pid !== 19 &&
//       pid !== 20
//     ) {
//       if (!data.totalPolicyAmount || sumAssured <= 0) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["totalPolicyAmount"],
//           message: "Please enter a valid Sum Assured Amount",
//         });
//       }
//     }

//     // --- PENSION VALIDATION ---
//     if (
//       isGroup(pid, POLICY_GROUPS.PENSION) ||
//       isGroup(pid, POLICY_GROUPS.STIPEND)
//     ) {
//       if (parseFloat(data.ysapa || "0") <= 0) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["ysapa"],
//           message: "Pension/Stipend Amount is required",
//         });
//       }
//     }

//     // --- AGE VALIDATION ---
//     if (isGroup(pid, POLICY_GROUPS.EDUCATION) && (age < 18 || age > 55)) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["dob"],
//         message: "Applicant age must be between 18 and 55",
//       });
//     }
//   });

// export type CalculatorFormValues = z.infer<typeof calculatorSchema>;

import { z } from "zod";
import { POLICY_GROUPS, isGroup } from "@/lib/constants/policy-groups";

export const calculatorSchema = z
  .object({
    // FIX: Made optional so manual Age entry works
    dob: z.string().optional(),

    // FIX: Age is the source of truth. Must be a valid number string.
    age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Age is required",
    }),

    policyId: z.string().min(1, "Please select a policy"),

    policyDuration: z.string().refine((val) => val !== "" && val !== "0", {
      message: "Please select a Policy Duration",
    }),

    installmentType: z.string().min(1, "Payment Mode is required"),

    // Default values
    totalPolicyAmount: z.string().default(""),
    monthlyPremiumAmount: z.string().default(""),
    ysapa: z.string().default(""),
    monthlySalary: z.string().default(""),
    pensionAge: z.string().default("55"),
    supplementaryPolicy: z.string().default("0"),
    riskCategory: z.string().default(""),
    gender: z.string().default("Male"),
    noOfNominee: z.string().default(""),
  })
  .superRefine((data, ctx) => {
    const pid = parseInt(data.policyId);
    const sumAssured = parseFloat(data.totalPolicyAmount || "0");
    const monthlyPrem = parseFloat(data.monthlyPremiumAmount || "0");
    const age = parseInt(data.age || "0");

    // --- 1. CRITICAL: Ensure Age is present (Manual OR Auto) ---
    if (!age || age === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["age"],
        message: "Please enter your Age or select Date of Birth",
      });
    }

    // --- 2. Standard Validations ---
    if (
      (isGroup(pid, POLICY_GROUPS.STANDARD) ||
        isGroup(pid, POLICY_GROUPS.SIMPLE) ||
        isGroup(pid, POLICY_GROUPS.EDUCATION) ||
        isGroup(pid, POLICY_GROUPS.PLATINUM)) &&
      pid !== 19 &&
      pid !== 20
    ) {
      if (!data.totalPolicyAmount || sumAssured <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["totalPolicyAmount"],
          message: "Please enter a valid Sum Assured Amount",
        });
      }
    }

    if (
      isGroup(pid, POLICY_GROUPS.MONTHLY_PREMIUM_BASED) ||
      isGroup(pid, POLICY_GROUPS.MICRO)
    ) {
      if (!data.monthlyPremiumAmount || monthlyPrem <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["monthlyPremiumAmount"],
          message: "Please enter a Monthly Premium Amount",
        });
      }
    }

    if (
      isGroup(pid, POLICY_GROUPS.PENSION) ||
      isGroup(pid, POLICY_GROUPS.STIPEND)
    ) {
      if (parseFloat(data.ysapa || "0") <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["ysapa"],
          message: "Amount is required",
        });
      }
    }

    // --- 3. Logic Checks ---
    if (isGroup(pid, POLICY_GROUPS.EDUCATION) && (age < 18 || age > 55)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["age"],
        message: "Applicant age must be between 18 and 55",
      });
    }
  });

export type CalculatorFormValues = z.infer<typeof calculatorSchema>;
