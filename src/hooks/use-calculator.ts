// "use client";

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// // --- Types ---
// export interface PolicyOption {
//   policyId: number;
//   policyName: string;
//   termOfYears: string;
// }

// export interface SubPolicyOption {
//   id: number;
//   subPolicyName: string;
// }

// export interface TermOption {
//   TermOfYear: number;
//   ty: string;
// }

// // --- Fetchers ---

// const fetchInitialOptions = async () => {
//   const { data } = await axios.post(
//     "https://www.sonalilife.com:1010/Api/PremiumCalc",
//     { age: 0 }
//   );
//   return {
//     policyNames: data.policyNames || [],
//     subPolicyNames: data.subPolicyNames || [],
//   };
// };

// const fetchTerms = async (policyId: number, age: number) => {
//   if (!policyId || !age) return [];
//   // Matches legacy: /api/Calculator/TermofYear
//   // Payload: { policyid: 23, age: 25 }
//   try {
//     const { data } = await axios.post(
//       "https://www.sonalilife.com:1010/Api/Calculator/TermofYear",
//       { policyid: policyId, age }
//     );
//     return Array.isArray(data) ? data : [];
//   } catch (err) {
//     console.error("Failed to fetch terms", err);
//     return [];
//   }
// };

// // --- Hooks ---

// export const useCalculatorOptions = () => {
//   return useQuery({
//     queryKey: ["calculator-options"],
//     queryFn: fetchInitialOptions,
//     staleTime: Infinity, // Static data
//   });
// };

// export const usePolicyTerms = (policyId: number | null, age: number) => {
//   return useQuery({
//     queryKey: ["policy-terms", policyId, age],
//     queryFn: () => fetchTerms(policyId!, age),
//     enabled: !!policyId && age > 0,
//   });
// };
