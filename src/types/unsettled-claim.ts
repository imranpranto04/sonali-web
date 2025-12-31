export interface UnsettledClaimItem {
  Sl: number;
  ClaimType: string;
  PolicyNo: string;
  CommencementDate: string;
  ClaimId: number;
  ClaimDate: string;
  ClaimAmount: number;
  UnsettledDuration: number;
  ClaimStatus: string;
  NotificationDate: string;
  OCFdate: string;
  UWComment: string;
}

export interface UnsettledResponse {
  success: string;
  message: string;
  data: null; // API returns null here, data is in specific fields below
  unsattledIndividualCount: number;
  unsattledGroupCount: number;
  unsattledIndividual: UnsettledClaimItem[];
  // unsattledGroup array might exist in future, but not in current spec
}
