export interface AllClaimItem {
  Sl: number;
  ClaimType: string;
  PolicyNo: string;
  CommencementDate: string;
  ClaimId: number;
  ClaimDate: string;
  ClaimAmount: number;
  DecisionDate: string;
  PaidDate: string;
  SettlementDuration1: string;
  ClaimStatus: string;
  Comment: string;
  ClaimNotificationDate: string;
  OCFreceivingDate: string;
  Duration: number;
  SettlementDuration: number;
}

export interface AllClaimStatusResponse {
  success: string;
  message: string;
  data: AllClaimItem[];
}

export interface AllStatusFilterParams {
  year: string;
  month: string;
  policyId: string;
  status: string;
  claimType: string;
}
