import apiClient from "../api-client";

// We define the Input type based on your Form Schema (camelCase)
export interface CalculatorInput {
  age: string;
  policyId: string;
  policyDuration: string;
  pensionAge?: string;
  installmentType: string;
  totalPolicyAmount?: string;
  monthlySalary?: string;
  monthlyPremiumAmount?: string;
  ysapa?: string;
  gender?: string;
  supplementaryPolicy?: string;
  supplementaryPolicyDuration?: string;
  riskCategory?: string;
  noOfNominee?: string;
}

export const calculatorService = {
  // --- Static Data ---
  getPolicies: async (lang: "eng" | "bng" = "eng") => {
    const endpoint =
      lang === "eng" ? "/Common/AllPolicyEnglish" : "/Common/AllPolicyBangla";
    const { data } = await apiClient.get(endpoint);
    return data.data || [];
  },

  getInstallmentTypes: async () => {
    const { data } = await apiClient.get("/Common/InstallmentType");
    return data.data || [];
  },

  getSupPolicies: async () => {
    const { data } = await apiClient.get("/Common/PolicySupplimentry");
    return data.data || [];
  },

  // --- Dynamic Data ---
  calculateAge: async (dob: string) => {
    const { data } = await apiClient.post("/Common/calculateAge", { DOB: dob });
    return data.data?.[0]?.Age?.toString() || "0";
  },

  getDurations: async (policyId: string, age: string) => {
    const { data } = await apiClient.post("/Common/TermofYear", {
      productid: policyId,
      age,
    });
    return data.data || [];
  },

  getRiskCategories: async (supId: string, age: string) => {
    const { data } = await apiClient.post("/Common/PolicyRiskCategory", {
      supplementaryPolicyId: supId,
      age,
    });
    return data.data || [];
  },

  // --- Main Calculation (FIXED MAPPING) ---
  calculatePremium: async (payload: CalculatorInput) => {
    // MAP camelCase (Form) -> PascalCase (API)
    // This ensures values like 'policyDuration' are correctly sent as 'PolicyDuration'
    const apiPayload = {
      age: payload.age || "0",
      policyId: payload.policyId || "0",

      // FIX: Map policyDuration to PolicyDuration
      PolicyDuration: payload.policyDuration || "0",

      PensionAge: payload.pensionAge || "55",
      InstallmentType: payload.installmentType || "Monthly",

      // FIX: Map amounts correctly
      TotalPolicyAmount: payload.totalPolicyAmount || "0",
      MonthlySalary: payload.monthlySalary || "0",
      MonthlyPremiumAmount: payload.monthlyPremiumAmount || "0",
      YSAPA: payload.ysapa || "0",

      Gender: payload.gender || "Male",

      SupplementaryPolicy: payload.supplementaryPolicy || "",
      // Check if sup duration is passed, otherwise use policy duration or empty
      SupplementaryPolicyDuration: payload.supplementaryPolicyDuration || "",

      PolicyRiskCategory: payload.riskCategory || "",

      // Defaults
      extraPrem: 0,
      otherPrem: 0,
      NoOfNominee: payload.noOfNominee || "0",
    };

    // console.log("Sending Payload to API:", apiPayload); // Check console to verify!

    const { data } = await apiClient.post(
      "/Common/AmountCalculate",
      apiPayload
    );
    return data.data?.[0];
  },
};
