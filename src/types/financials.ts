export interface DocumentItem {
  id?: number;
  title: string;
  fileName: string;
}

export interface ContactPerson {
  name: string;
  designation: string;
  mobile: string;
  email: string;
  image: string;
}

export interface FinancialsResponse {
  success: string;
  message: string;
  // Reports
  ipoNotice: DocumentItem[];
  finalApplicationSatus: DocumentItem[];
  proRataAllotment: DocumentItem[];
  prospectus: DocumentItem[];
  shareholdingReport: DocumentItem[];
  annualReport: DocumentItem[];
  auditFinancialReport: DocumentItem[];
  halfyearlyReport: DocumentItem[];
  quarterlyReport: DocumentItem[];
  priceSensitiveInfo: DocumentItem[];
  financialNotice: DocumentItem[];
  corporateGovernance: DocumentItem[];
  creditRating: DocumentItem[];
  principlesOfDisclosure: DocumentItem[];

  // Contacts
  investorRelation: ContactPerson[];
  rtiDept: ContactPerson[];
}
