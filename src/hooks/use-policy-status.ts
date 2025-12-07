// // "use client";

// // import { useQuery } from "@tanstack/react-query";
// // import axios from "axios";
// // import { useAuthStore } from "@/store/auth-store";

// // export interface PolicyStatusDetails {
// //   PolicyNumber: string;
// //   ApplicantNameEng: string;
// //   AgentId: number;
// //   AgentName: string;
// //   TableAndTerm: string;
// //   MobileNo: string;
// //   Status: "Active" | "Lapsed" | "Defaulter" | string;
// // }

// // const fetchPolicyStatus = async (fprId: number) => {
// //   const token = useAuthStore.getState().token;

// //   try {
// //     console.log(`Fetching status for FPRID: ${fprId}...`);

// //     const { data } = await axios.post<PolicyStatusDetails[]>(
// //       // Updated URL to the correct endpoint
// //       "https://www.sonalilife.com:1010/api/Webdata/CustomerPolicyStatus/fill/data",
// //       { fprid: fprId },
// //       {
// //         headers: {
// //           "Content-Type": "application/json",
// //           // Include token if required
// //           Authorization: token ? `Bearer ${token}` : "",
// //         },
// //       }
// //     );

// //     console.log(`API Response for ${fprId}:`, data);

// //     // Robust check for array
// //     if (Array.isArray(data) && data.length > 0) {
// //       return data[0];
// //     }

// //     return null;
// //   } catch (error) {
// //     console.error("Status API Error:", error);
// //     return null;
// //   }
// // };

// // export const usePolicyStatus = (fprId: number) => {
// //   return useQuery({
// //     queryKey: ["policy-status", fprId],
// //     queryFn: () => fetchPolicyStatus(fprId),
// //     enabled: !!fprId,
// //   });
// // };

// "use client";

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useAuthStore } from "@/store/auth-store";

// export interface PolicyStatusDetails {
//   PolicyNumber: string;
//   ApplicantNameEng: string;
//   AgentId: number;
//   AgentName: string;
//   TableAndTerm: string;
//   MobileNo: string;
//   Status: "Active" | "Lapsed" | "Defaulter" | string;
// }

// // Define the wrapper response structure
// interface StatusApiResponse {
//   success: string;
//   message: string;
//   data: PolicyStatusDetails[];
// }

// const fetchPolicyStatus = async (fprId: number) => {
//   const token = useAuthStore.getState().token;

//   try {
//     // console.log(`Fetching status for FPRID: ${fprId}...`);

//     const { data } = await axios.post<StatusApiResponse>(
//       "https://www.sonalilife.com:1010/api/Webdata/CustomerPolicyStatus/fill/data",
//       { fprid: fprId },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//       }
//     );

//     // console.log(`API Response for ${fprId}:`, data);

//     // Check for success and data array
//     if (
//       data.success === "true" &&
//       Array.isArray(data.data) &&
//       data.data.length > 0
//     ) {
//       return data.data[0];
//     }

//     return null;
//   } catch (error) {
//     console.error("Status API Error:", error);
//     return null;
//   }
// };

// export const usePolicyStatus = (fprId: number) => {
//   return useQuery({
//     queryKey: ["policy-status", fprId],
//     queryFn: () => fetchPolicyStatus(fprId),
//     enabled: !!fprId,
//   });
// };
