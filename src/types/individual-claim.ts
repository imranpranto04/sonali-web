export interface IndividualClaimData {
  PolicyHolderName: string;
  ApplicantPPName: string;
  CalcSumAssuredAmount: number;
  SubPolicyName: string;
  SuppPolClaimAmount: number;
  BonusAmount: number;
  LienAmountDeduct: number | null;
  ClaimSummary: string;
  InvestigationSummary: string;
  ClaimComMemberName: string;
  DecisionofClaimCommittee: string;
  SuggestedAmount: number;
  ClaimTypeName: string;
  Status: string;
  paiddate: string;
}

export interface IndividualClaimResponse {
  success: string;
  message: string;
  data: IndividualClaimData[];
}
