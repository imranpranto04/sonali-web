export const POLICY_GROUPS = {
  // Standard: Show Sum Assured, Risk Category, Sup. Policy
  STANDARD: [1, 2, 3, 8, 11, 12, 21, 22],

  // Simple: Show Sum Assured ONLY (Hidden Sup/Risk)
  SIMPLE: [4, 5, 6, 9, 19, 20, 23],

  // Stipend: Show Yearly Stipend Amount
  STIPEND: [7],

  // Monthly Premium: Input Monthly Premium -> Calculates Sum Assured
  MONTHLY_PREMIUM_BASED: [16, 17],

  // Pension: Show Pension Age & Amount
  PENSION: [10],

  // Micro: Monthly Premium input only (Fixed installment)
  MICRO: [13, 14],

  // Salary: Monthly Salary & Premium
  SALARY_BASED: [18],

  // Special: Fixed Sup Policy (DPR)
  SPECIAL_DPR: [15],

  // Education: Nominee field required
  EDUCATION: [24, 25],

  // Platinum: High value policies
  PLATINUM: [29],
};

export const isGroup = (id: string | number, group: number[]) => {
  const numericId = typeof id === "string" ? parseInt(id) : id;
  return group.includes(numericId);
};
