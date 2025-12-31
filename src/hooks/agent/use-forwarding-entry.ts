// "use client";

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import apiClient from "@/lib/api/api-client";
// import { toast } from "sonner";

// // --- TYPES ---
// export interface PolicySearchResult {
//   PolicyHolderName: string;
//   Amount: string;
//   status: string;
//   FAId: string;
//   FAName: string;
//   UMId: string;
//   UMName: string;
//   BMId: string;
//   BMName: string;
// }

// export interface ForwardingCartData {
//   TotalPolicies: string;
//   TotalAmount: string;
//   Details: Array<{
//     Id: number;
//     RefType: string;
//     RefNo: number;
//     PolicyHolderName: string;
//     Amount: number;
//     StatusFlag: string;
//     PaymentCount: number;
//     TotalAmount: number;
//   }>;
// }

// // --- API ACTIONS ---

// const fetchForwardingCart = async () => {
//   try {
//     const { data } = await apiClient.get<{
//       success: string;
//       data: ForwardingCartData;
//     }>("/Agent/ForwardingLoad");
//     if (data.success === "true" && data.data) {
//       return data.data;
//     }
//     return { TotalPolicies: "0", TotalAmount: "0", Details: [] };
//   } catch (error) {
//     return { TotalPolicies: "0", TotalAmount: "0", Details: [] };
//   }
// };

// const searchPolicy = async (params: {
//   ReferanceType: string;
//   ReferanceNo: string;
// }) => {
//   const { data } = await apiClient.post(
//     "/Agent/ForwardingLoadPolicyHolder",
//     params
//   );
//   if (data.success === "true" && data.data && data.data.length > 0) {
//     return data.data[0];
//   }
//   throw new Error("Policy reference not found.");
// };

// const addForwardingItem = async (params: any) => {
//   const { data } = await apiClient.post<{
//     success: string;
//     message: string;
//     data: { status: string }[];
//   }>("/Agent/ForwardingAdd", params);
//   if (data.success === "true") {
//     return data.data?.[0]?.status || "Item added successfully";
//   }
//   throw new Error(data.message || "Failed to add item.");
// };

// const deleteForwardingItem = async (id: number) => {
//   const { data } = await apiClient.post("/Agent/ForwardingDelete", { Id: id });
//   if (data.success === "true") return data;
//   throw new Error("Delete failed.");
// };

// interface SaveParams {
//   Name: string; // <--- ADDED THIS to match legacy
//   PaymentMode: string;
//   TotalAmount: string;
//   TotalNoOfPolicy: string;
// }

// const saveForwardingBatch = async (params: SaveParams) => {
//   const { data } = await apiClient.post("/Agent/SaveForwarding", params);
//   if (data.success === "true") {
//     return data;
//   }
//   throw new Error(data.message || "Save failed.");
// };

// // --- HOOK ---

// export const useForwardingEntry = () => {
//   const queryClient = useQueryClient();

//   const {
//     data: cartData,
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["forwarding-cart"],
//     queryFn: fetchForwardingCart,
//     retry: false,
//     staleTime: 0,
//   });

//   const searchMutation = useMutation({
//     mutationFn: searchPolicy,
//     onError: (err) => toast.error(err.message),
//   });

//   const addMutation = useMutation({
//     mutationFn: addForwardingItem,
//     onSuccess: async (statusMsg) => {
//       if (statusMsg.toLowerCase().includes("already")) {
//         toast.info(statusMsg);
//       } else {
//         toast.success("Item Added");
//       }
//       await queryClient.invalidateQueries({ queryKey: ["forwarding-cart"] });
//       refetch();
//       setTimeout(async () => {
//         await queryClient.invalidateQueries({ queryKey: ["forwarding-cart"] });
//         refetch();
//       }, 500);
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   const deleteMutation = useMutation({
//     mutationFn: deleteForwardingItem,
//     onSuccess: async () => {
//       toast.success("Item removed");
//       setTimeout(async () => {
//         await queryClient.invalidateQueries({ queryKey: ["forwarding-cart"] });
//         refetch();
//       }, 300);
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   const saveMutation = useMutation({
//     mutationFn: saveForwardingBatch,
//     onSuccess: async () => {
//       toast.success("Batch Finalized Successfully");
//       await queryClient.invalidateQueries({ queryKey: ["forwarding-summary"] });
//       await queryClient.invalidateQueries({ queryKey: ["forwarding-cart"] });
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   return {
//     cartData,
//     isLoading,
//     refetch,
//     searchMutation,
//     addMutation,
//     deleteMutation,
//     saveMutation,
//   };
// };

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/api-client";
import { toast } from "sonner";

// --- TYPES ---
export interface PolicySearchResult {
  PolicyHolderName: string;
  Amount: string;
  status: string;
  FAId: string;
  FAName: string;
  UMId: string;
  UMName: string;
  BMId: string;
  BMName: string;
}

// Ensure this matches your API response structure
export interface ForwardingCartData {
  TotalPolicies: string;
  TotalAmount: string;
  Details: Array<{
    Id: number;
    RefType: string;
    RefNo: number;
    PolicyHolderName: string;
    Amount: number;
    StatusFlag: string;
    PaymentCount: number;
    TotalAmount: number;
  }>;
}

// --- API ACTIONS ---

// 1. GET LOAD (Strictly GET as requested)
const fetchForwardingCart = async () => {
  try {
    const { data } = await apiClient.get<{
      success: string;
      data: ForwardingCartData;
    }>("/Agent/ForwardingLoad");
    // Safety check if data is null/undefined
    if (data.success === "true" && data.data) {
      return data.data;
    }
    return { TotalPolicies: "0", TotalAmount: "0", Details: [] };
  } catch (error) {
    console.error("Load Error:", error);
    return { TotalPolicies: "0", TotalAmount: "0", Details: [] };
  }
};

// 2. SEARCH
const searchPolicy = async (params: {
  ReferanceType: string;
  ReferanceNo: string;
}) => {
  const { data } = await apiClient.post(
    "/Agent/ForwardingLoadPolicyHolder",
    params
  );

  if (data.success === "true" && data.data && data.data.length > 0) {
    return data.data[0];
  }
  throw new Error("Policy not found.");
};

// 3. ADD
const addForwardingItem = async (params: any) => {
  const { data } = await apiClient.post<{
    success: string;
    message: string;
    data: { status: string }[];
  }>("/Agent/ForwardingAdd", params);

  // Success if success="true", even if status is "Already Exists"
  if (data.success === "true") {
    return data.data?.[0]?.status || "Item added successfully";
  }

  throw new Error(data.message || "Failed to add item.");
};

const deleteForwardingItem = async (id: number) => {
  const { data } = await apiClient.post("/Agent/ForwardingDelete", { Id: id });
  if (data.success === "true") return data;
  throw new Error("Delete failed.");
};

// 4. SAVE (Must send Name parameter for legacy support)
interface SaveParams {
  Name: string;
  PaymentMode: string;
  TotalAmount: string;
  TotalNoOfPolicy: string;
}

const saveForwardingBatch = async (params: SaveParams) => {
  const { data } = await apiClient.post("/Agent/SaveForwarding", params);

  if (data.success === "true") {
    return data;
  }
  // Check for "Not Saved" status
  if (
    data.data &&
    Array.isArray(data.data) &&
    data.data[0]?.status === "Not Saved"
  ) {
    throw new Error("Server returned: Not Saved");
  }

  throw new Error(data.message || "Save failed.");
};

// --- HOOK ---

export const useForwardingEntry = () => {
  const queryClient = useQueryClient();

  const {
    data: cartData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["forwarding-cart"],
    queryFn: fetchForwardingCart,
    retry: false,
    staleTime: 0, // Always fetch fresh
  });

  const searchMutation = useMutation({
    mutationFn: searchPolicy,
    onError: (err) => toast.error(err.message),
  });

  const addMutation = useMutation({
    mutationFn: addForwardingItem,
    onSuccess: async (statusMsg) => {
      if (statusMsg.toLowerCase().includes("already")) {
        toast.info(statusMsg);
      } else {
        toast.success("Item Added");
      }
      // Refresh list immediately
      await queryClient.invalidateQueries({ queryKey: ["forwarding-cart"] });
      refetch();

      // Safety Refresh
      setTimeout(() => refetch(), 500);
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteForwardingItem,
    onSuccess: async () => {
      toast.success("Item removed");
      setTimeout(async () => {
        await queryClient.invalidateQueries({ queryKey: ["forwarding-cart"] });
        refetch();
      }, 300);
    },
    onError: (err) => toast.error(err.message),
  });

  const saveMutation = useMutation({
    mutationFn: saveForwardingBatch,
    onSuccess: async () => {
      toast.success("Forwarding Created Successfully!");
      // Invalidate both History and Cart so data is fresh on redirect
      await queryClient.invalidateQueries({ queryKey: ["forwarding-summary"] });
      await queryClient.invalidateQueries({ queryKey: ["forwarding-cart"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    cartData,
    isLoading,
    refetch,
    searchMutation,
    addMutation,
    deleteMutation,
    saveMutation,
  };
};
