import {
  HeartPulse,
  ShieldAlert,
  GraduationCap,
  Briefcase,
} from "lucide-react";

export const CLAIM_TYPES = [
  {
    id: "death",
    label: "Death Claim",
    icon: HeartPulse,
    description:
      "Required documents for Natural, Accidental, and Overseas death claims.",
    sections: [
      {
        title: "Natural Death Claim",
        items: [
          "Nominee must complete the Claim form provided by the company.",
          "Original Policy Document.",
          "Original Death Certificate from a Hospital/an MBBS Doctor with Registration No. of BMDC.",
          "Original all Treatment Papers of Deceased.",
          "NID Card/Birth certificate of Nominee.",
          "Statement of Imam/ Purohit.",
          "Death certificate from Union Parishad.",
          "Cemetery certificate (if any).",
          "NID Card of legal Guardian (In case of Minority).",
        ],
      },
      {
        title: "Accidental Death (Additional Documents)",
        items: ["FIR Report.", "Post-Mortem Report or Waiver Certificate."],
      },
      {
        title: "Death Overseas (Additional Documents)",
        items: [
          "Death Certificate.",
          "Treatment Papers (if any).",
          "Procedure Paper of Bangladesh Hi-Commission of relevant country.",
          "Passport Photocopy.",
          "Airways Bill/Ticket.",
          "No Objection Certificate.",
        ],
      },
    ],
  },
  {
    id: "supplementary",
    label: "Supplementary Benefits",
    icon: ShieldAlert,
    description:
      "Requirements for PDAB, ADB, PTD, PPD, and Hospitalization claims.",
    sections: [
      {
        title: "PDAB (Permanent Disability & Accidental Benefit)",
        items: [
          "FIR Report (from police station for cause of injury).",
          "Post-Mortem Report or Waiver Certificate.",
          "Doctor's Report (Medical Certificate) & Discharge Certificate from Hospital (If Confined).",
          "All diagnostics papers.",
          "Photograph of the concerned person with exposure of severed organ.",
        ],
      },
      {
        title: "ADB (Accidental Death Benefit)",
        items: [
          "FIR Report.",
          "State of Affair.",
          "Post-Mortem Report or Waiver Certificate.",
        ],
      },
      {
        title: "PTD (Permanent Total Disability)",
        items: [
          "Doctor's Report (Medical Certificate) & Discharge Certificate from Hospital (If Confined).",
          "All diagnostics papers.",
          "F.I.R (from police station for cause of injury).",
          "Photograph of the concerned person with exposure of severed organ.",
        ],
      },
      {
        title: "PPD (Permanent Partial Disability)",
        items: [
          "Doctor's Report (Medical Certificate) & Discharge Certificate from Hospital (If Confined).",
          "F.I.R (From Police Station).",
          "Photograph of the concerned person with exposure of severed organ.",
        ],
      },
      {
        title: "WP/DPR (Waiver of Premium / Disability)",
        items: [
          "Doctor's Report (Medical Certificate) & Discharge Certificate from Hospital (if confined).",
          "All diagnostics papers.",
          "F.I.R (from police station for cause of injury).",
          "Photograph of the concerned person with exposure of severed organ.",
        ],
      },
      {
        title: "EPA/CIC (Critical Illness)",
        items: [
          "Doctor's Report (Medical Certificate) & Discharge Certificate from Hospital (if confined).",
          "X-Ray Report.",
          "All diagnostics papers.",
          "Bill for hospital, diagnostics and medicine.",
          "Note: Certificate from a registered physician of specific discipline (viz, Ophthalmology or Otolaryngology) incase of irrecoverable loss of Sight or Hearing.",
        ],
      },
      {
        title: "Hospital Insurance Claim",
        items: [
          "Employment Certificate.",
          "Consultant’s recommendation for hospitalization/investigations (original copy).",
          "Discharge certificate (attested photocopy).",
          "An attested photocopy of the patient's file while hospitalized (if possible).",
          "Original Money Receipt or Bill of Consultants (Physician/Surgeon) fee.",
          "Bill relating to room charges, investigations and other services where applicable (original copy).",
          "Bill of medicine/drugs (original copy).",
          "Bill relating to Surgical Operation charges (Operation Theatre, surgical team, delivery charge, anaesthesia & other charges), where applicable (original copy).",
          "Original Bill relating to ancillary charges (e.g. ambulance service, oxygen therapy, blood transfusions etc.).",
        ],
      },
    ],
  },
  {
    id: "maturity",
    label: "Maturity & Surrender",
    icon: GraduationCap,
    description:
      "Documents required for full maturity, survival benefit, or policy surrender.",
    sections: [
      {
        title: "Full Maturity Claim",
        items: [
          "Original Deed.",
          "Signature of Claim Voucher.",
          "Bank Cheque Leaf or Bank Statement of Policyholder.",
          "Policyholders Photo.",
        ],
      },
      {
        title: "Survival Benefit (SB)",
        items: [
          "Original Deed for Endorsement.",
          "Signature of Claim Voucher.",
          "Bank Cheque Leaf or Bank Statement of Policyholder.",
          "Payment Instruction sign (If Needed).",
          "Policyholders Photo.",
          "Application for Bank Name mismatch with Policy Name (If Needed).",
          "Application for Signature mismatch (If Needed).",
        ],
      },
      {
        title: "Surrender Value Claim",
        items: [
          "Application from Policyholder.",
          "Original Deed.",
          "Bank Cheque Leaf or Bank Statement of the Policyholder.",
          "Policyholders Photo.",
          "Signature of Claim Voucher.",
        ],
      },
    ],
  },
  {
    id: "group",
    label: "Group Insurance",
    icon: Briefcase,
    description: "Requirements for Group Insurance Death Claims.",
    sections: [
      {
        title: "Group Death Claim",
        items: [
          "Claim should be submitted in prescribed Claim Form attested by competent authority of the Organization.",
          "Original Death Certificate from a Hospital/an MBBS Doctor with Registration No. of BMDC.",
          "Original all Treatment Papers of Deceased.",
          "NID Card/Birth certificate of Nominee.",
          "Statement of Imam/ Purohit.",
          "Death certificate from Union Parishad.",
          "Cemetery certificate (if any).",
          "Employment Certificate.",
          "Salary Certificate.",
          "Attendance Sheet.",
          "NID Card of legal Guardian (In case of Minority).",
        ],
      },
    ],
  },
];
