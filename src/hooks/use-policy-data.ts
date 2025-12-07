"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";

// --- Types based on your API Response ---

// 1. List Item Type (matches /PolicyHolder/PolicyByDocId response)
export interface PolicyData {
  FPRId: number;
  Category: string;
  PolicyNumber: string;
  PremiumAmount: number;
  DueDate: string;
  Installments: string;
}

// 2. Detailed View Types (matches /PolicyHolder/PolicyDetails response)
export interface PolicyOverview {
  PolicyNumber: string;
  PolicyName: string;
  TotalPremDue: number;
  SoFarPaidAmount: number;
  ProductId: number;
  TotalNumberOfInstallments: number;
  TotalInstallmentsPaid: number;
}

export interface PolicyDetailsInfo {
  PolicyName: string;
  InstallmentTypeName: string;
  SupName: string;
  TermOfYear: number;
  TotalNumberOfInstallments: number;
  TotalInstallmentsPaid: number;
  TotalLateFees: number;
  DueInstallments: number;
  CurrentTotInstallmentNoDue: number;
  TotalPolicyAmount: number; // Sum Assured
  BasicPremiumAmount: number;
  TotalPremium: number;
  SuspenseAmount: number;
  TotalPremPay: number;
  SoFarPaidAmount: number;
  TotalPremDue: number;
  CommencementDate: string;
}

export interface PolicyStatusItem {
  PolicyNumber: string;
  ApplicantNameEng: string;
  AgentId: number;
  AgentName: string;
  TableAndTerm: string;
  MobileNo: string;
  Status: string;
}

export interface NomineeItem {
  NomineeId: number;
  NomineeName: string;
  NomineeAge: string;
  NomineeRelation: string;
  NomineeAllocation: string;
  NomineePPName: string;
}

export interface PaymentHistoryItem {
  FPR_ORMultiId: string;
  DepositDate: string;
  TotPrem: number;
  DepAmt: number;
  SuspensePremium: number;
  InsNo: number;
  Npdd: string;
}

export interface PolicyBonus {
  SumAssured: number;
  TermOfYear: number;
  NthYr: number;
  UpdatedYr: number;
  CummulativeBonusAmt: number;
}

// New Interface for Maturity Data
export interface PolicyMaturity {
  MaturityDate: string;
  InsNo: number;
  TotalMaturityPaymentAmount: number;
  PayStatus: string;
  MaturityDeliveryDate: string;
}

export interface PolicyBenefitDetails {
  PolicyID: number;
  PolicyName: string;
  TermOfThePolicy: string; // Description Text
  SupplementaryCover: string; // Description Text
  OnMaturity: string; // Description Text (Benefit rules)
  InCaseOfAssuredDeath: string; // Description Text (Death Benefit)
  SpecialBenefit: string; // Description Text
  ChartRate: string;
  TermOfYear: number;
}

export interface FullPolicyDetailsResponse {
  success: string;
  message: string;
  data: {
    OverView: PolicyOverview[];
    PolicyInfo: {
      PolicyDetails: PolicyDetailsInfo[];
      PolicyStatus: PolicyStatusItem[];
      Nominee: NomineeItem[];
    };
    FinancialBenefits: {
      Bonus: PolicyBonus[];
      OnMaturity: PolicyMaturity[]; // Added this based on your JSON
      // Benefit details (text) might also be here if needed later
      OnDeath?: PolicyBenefitDetails[];
    };
    PaymentsHistory: PaymentHistoryItem[];
  };
}

// --- Hooks ---

// 1. Get All Policies (List)
export const usePolicies = () => {
  return useQuery({
    queryKey: ["my-policies"],
    queryFn: async () => {
      const { data } = await apiClient.get<{
        success: string;
        message: string;
        data: PolicyData[];
      }>("/PolicyHolder/PolicyByDocId");
      return data.data;
    },
  });
};

// 2. Get Single Policy Details (Full View)
const fetchPolicyDetailsFull = async (policyId: string) => {
  const { data } = await apiClient.post<FullPolicyDetailsResponse>(
    "/PolicyHolder/PolicyDetails",
    {
      FprId: policyId,
    }
  );
  return data.data;
};

export const usePolicyDetailsFull = (policyId: string) => {
  return useQuery({
    queryKey: ["policy-details-full", policyId],
    queryFn: () => fetchPolicyDetailsFull(policyId),
    enabled: !!policyId,
  });
};

// 3. Get Policy Status (Derived from Full Details)
export const usePolicyStatus = (policyId: number) => {
  const { data, ...rest } = usePolicyDetailsFull(policyId.toString());
  const statusDetails = data?.PolicyInfo?.PolicyStatus?.[0] || null;
  return { data: statusDetails, ...rest };
};

// 4. Get Nominee Info (Specific Endpoint if needed independently)
export const useNominee = (policyId: string) => {
  return useQuery({
    queryKey: ["nominee", policyId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/Policy/Nominee/${policyId}`);
      return data.data;
    },
    enabled: !!policyId,
  });
};

// 5. Get Payment History (Specific Endpoint if needed independently)
export const usePaymentHistory = (policyId: string) => {
  return useQuery({
    queryKey: ["payments", policyId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/Policy/Payments/${policyId}`);
      return data.data;
    },
    enabled: !!policyId,
  });
};

// 6. Get Loan Eligibility
export const useCustomerLoan = (policyId: string) => {
  return useQuery({
    queryKey: ["loan", policyId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/Policy/LoanStatus/${policyId}`);
      return data.data;
    },
    enabled: !!policyId,
  });
};
