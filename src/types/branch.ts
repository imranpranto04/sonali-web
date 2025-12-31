export interface Branch {
  BranchName: string;
  Division: string;
  BranchAddress: string;
  BranchContactNumber: string;
  MapLocation: string; // The raw URL from API
}

export interface District {
  DistrictId: number;
  DistrictName: string;
  Branches: Branch[];
}

export interface Division {
  DivisionId: number;
  DivisionName: string;
  Districts: District[];
}

export interface BranchApiResponse {
  success: string;
  message: string;
  data: Division[];
}
