// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   ArrowLeft,
//   Search,
//   Plus,
//   Trash2,
//   Save,
//   User,
//   FileText,
//   Briefcase,
//   Loader2,
//   RefreshCw,
//   Info,
//   CheckCircle2,
//   XCircle,
//   AlertTriangle,
//   PenLine,
// } from "lucide-react";
// import {
//   useForwardingEntry,
//   PolicySearchResult,
// } from "@/hooks/agent/use-forwarding-entry";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// export default function ForwardingEntryPage() {
//   const router = useRouter();
//   const {
//     cartData,
//     isLoading,
//     refetch,
//     searchMutation,
//     addMutation,
//     deleteMutation,
//     saveMutation,
//   } = useForwardingEntry();

//   const [refType, setRefType] = useState("PR");
//   const [refNo, setRefNo] = useState("");
//   const [payCount, setPayCount] = useState("1");
//   const [paymentDetails, setPaymentDetails] = useState("");

//   const [policyData, setPolicyData] = useState<PolicySearchResult | null>(null);
//   const [addStatus, setAddStatus] = useState<{
//     message: string;
//     type: "success" | "info" | "error";
//   } | null>(null);

//   // --- ACTIONS ---

//   const handleSearch = () => {
//     setPolicyData(null);
//     setAddStatus(null);
//     if (!refNo) return;

//     searchMutation.mutate(
//       { ReferanceType: refType, ReferanceNo: refNo },
//       { onSuccess: (data) => setPolicyData(data) }
//     );
//   };

//   const handleAdd = () => {
//     if (!policyData) return;
//     setAddStatus(null);

//     const amountVal = parseFloat(String(policyData.Amount || "0"));
//     const countVal = parseInt(payCount || "1");
//     const totalVal = amountVal * countVal;

//     addMutation.mutate(
//       {
//         ReferanceType: refType,
//         ReferanceNo: refNo,
//         PolicyHolderName: policyData.PolicyHolderName,
//         PayCount: payCount,
//         Amount: String(amountVal),
//         TotalAmount: String(totalVal),
//         FAId: policyData.FAId,
//         FAName: policyData.FAName,
//         UMId: policyData.UMId,
//         UmName: policyData.UMName,
//         BMId: policyData.BMId,
//         BMName: policyData.BMName,
//       },
//       {
//         onSuccess: (statusMsg) => {
//           const msg = statusMsg.toLowerCase();
//           setAddStatus({
//             message: statusMsg,
//             type:
//               msg.includes("already") || msg.includes("exist")
//                 ? "info"
//                 : "success",
//           });
//           setRefNo("");
//           setPolicyData(null);
//           setPayCount("1");
//         },
//         onError: (error) =>
//           setAddStatus({ message: error.message, type: "error" }),
//       }
//     );
//   };

//   const handleDelete = (id: number) => {
//     if (confirm("Remove this policy from the batch?")) {
//       deleteMutation.mutate(id);
//     }
//   };

//   // --- [FIXED] SAVE HANDLER ---
//   const handleSave = () => {
//     if (!cartData?.Details || cartData.Details.length === 0) return;

//     // 1. Calculate Totals
//     const totalAmount = cartData.Details.reduce(
//       (sum, item) => sum + Number(item.TotalAmount || 0),
//       0
//     );
//     const totalPolicies = cartData.Details.length;

//     // 2. Send payload matching Legacy code exactly
//     saveMutation.mutate(
//       {
//         Name: "Save Forwarding", // <--- CRITICAL FIX: Backend needs this trigger
//         PaymentMode: paymentDetails || "Cash",
//         TotalAmount: String(totalAmount),
//         TotalNoOfPolicy: String(totalPolicies),
//       },
//       {
//         onSuccess: () => router.push("/agent/forwarding"),
//       }
//     );
//   };

//   const currentEntryTotal = policyData
//     ? parseFloat(String(policyData.Amount || "0")) * parseInt(payCount || "0")
//     : 0;

//   const isStatusOk = policyData?.status?.toLowerCase() === "ok";

//   return (
//     <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8 pb-24 animate-in fade-in duration-500 bg-slate-50/30 min-h-screen">
//       {/* HEADER */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() => router.back()}
//             className="rounded-full h-10 w-10 border-slate-200 bg-white hover:bg-slate-50 shadow-sm"
//           >
//             <ArrowLeft className="w-5 h-5 text-slate-600" />
//           </Button>
//           <div>
//             <h1 className="text-2xl font-black text-slate-900 tracking-tight">
//               Forwarding Entry
//             </h1>
//             <p className="text-slate-500 text-sm font-medium">
//               Build a new batch of policies.
//             </p>
//           </div>
//         </div>

//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => refetch()}
//           className="bg-white border-slate-300"
//         >
//           <RefreshCw
//             className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
//           />{" "}
//           Sync List
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//         {/* LEFT: FORM (Unchanged) */}
//         <div className="lg:col-span-4 space-y-6">
//           <Card className="border-0 shadow-lg bg-white">
//             <div className="h-1 bg-indigo-600 w-full" />
//             <CardHeader className="bg-white border-b border-slate-100 py-4">
//               <CardTitle className="text-sm font-bold uppercase text-slate-500 flex items-center gap-2">
//                 <Search className="w-4 h-4" /> Find Policy
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-5 space-y-4 bg-slate-50/50">
//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-slate-700">
//                   Reference Type
//                 </label>
//                 <Select value={refType} onValueChange={setRefType}>
//                   <SelectTrigger className="bg-white border-slate-200 font-medium h-10">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="PR">PR (First Year)</SelectItem>
//                     <SelectItem value="OR">OR (Renewal)</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-slate-700">
//                   Reference No
//                 </label>
//                 <div className="flex gap-2">
//                   <Input
//                     placeholder="e.g. 449923"
//                     value={refNo}
//                     onChange={(e) => {
//                       setRefNo(e.target.value);
//                       if (addStatus) setAddStatus(null);
//                     }}
//                     className="font-mono bg-white h-10"
//                   />
//                   <Button
//                     onClick={handleSearch}
//                     disabled={searchMutation.isPending || !refNo}
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white h-10 px-4"
//                   >
//                     {searchMutation.isPending ? (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     ) : (
//                       "Find"
//                     )}
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {policyData && isStatusOk && (
//             <Card className="border-2 border-emerald-100 shadow-xl">
//               <CardContent className="p-5 space-y-5">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-sm font-bold text-slate-500">
//                     Add to Batch
//                   </h3>
//                   <Badge className="bg-emerald-100 text-emerald-800">
//                     Verified
//                   </Badge>
//                 </div>
//                 <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
//                   <p className="text-[10px] font-bold text-emerald-600 uppercase">
//                     Policy Holder
//                   </p>
//                   <p className="font-bold text-slate-900 text-sm">
//                     {policyData.PolicyHolderName}
//                   </p>
//                   <p className="text-xs mt-1 text-slate-600">
//                     Base: ৳ {policyData.Amount}
//                   </p>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs font-bold text-slate-500">
//                       Payments
//                     </label>
//                     <Input
//                       type="number"
//                       min="1"
//                       value={payCount}
//                       onChange={(e) => setPayCount(e.target.value)}
//                       className="font-bold text-center"
//                     />
//                   </div>
//                   <div className="text-right">
//                     <label className="text-xs font-bold text-slate-500">
//                       Total Entry
//                     </label>
//                     <div className="h-10 flex items-center justify-end font-black text-xl text-emerald-600">
//                       ৳ {currentEntryTotal.toLocaleString()}
//                     </div>
//                   </div>
//                 </div>
//                 <Button
//                   onClick={handleAdd}
//                   disabled={addMutation.isPending}
//                   className="w-full bg-slate-900 text-white font-bold h-12"
//                 >
//                   {addMutation.isPending ? "Processing..." : "Add to Batch"}
//                 </Button>
//               </CardContent>
//             </Card>
//           )}

//           {addStatus && (
//             <Alert
//               className={`shadow-sm ${
//                 addStatus.type === "success"
//                   ? "bg-emerald-50 text-emerald-900"
//                   : addStatus.type === "info"
//                   ? "bg-blue-50 text-blue-900"
//                   : "bg-red-50 text-red-900"
//               }`}
//             >
//               {addStatus.type === "success" ? (
//                 <CheckCircle2 className="h-5 w-5" />
//               ) : addStatus.type === "info" ? (
//                 <Info className="h-5 w-5" />
//               ) : (
//                 <XCircle className="h-5 w-5" />
//               )}
//               <AlertDescription className="ml-2 font-medium">
//                 {addStatus.message}
//               </AlertDescription>
//             </Alert>
//           )}
//           {policyData && !isStatusOk && (
//             <Alert variant="destructive" className="bg-red-50 text-red-900">
//               <AlertTriangle className="h-5 w-5" />
//               <AlertTitle>Issue</AlertTitle>
//               <AlertDescription>{policyData.status}</AlertDescription>
//             </Alert>
//           )}
//         </div>

//         {/* RIGHT: TABLE (Cart & Finalize) */}
//         <div className="lg:col-span-8 h-full flex flex-col">
//           <Card className="border-0 shadow-md flex-1 flex flex-col bg-white">
//             <CardHeader className="flex flex-row items-center justify-between py-5 border-b border-slate-100">
//               <div>
//                 <CardTitle className="text-lg font-black text-slate-800">
//                   Current Batch
//                 </CardTitle>
//                 <p className="text-slate-500 text-xs">
//                   {cartData?.Details?.length || 0} items ready.
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-[10px] font-bold text-slate-400 uppercase">
//                   Batch Total
//                 </p>
//                 {isLoading ? (
//                   <Skeleton className="h-8 w-24" />
//                 ) : (
//                   <p className="text-2xl font-black text-emerald-600">
//                     ৳ {Number(cartData?.TotalAmount || 0).toLocaleString()}
//                   </p>
//                 )}
//               </div>
//             </CardHeader>

//             <div className="flex-1 overflow-auto min-h-[400px]">
//               <Table>
//                 <TableHeader className="bg-slate-50 sticky top-0 z-10">
//                   <TableRow>
//                     <TableHead>Reference</TableHead>
//                     <TableHead>Holder</TableHead>
//                     <TableHead>Inst.</TableHead>
//                     <TableHead className="text-right">Total</TableHead>
//                     <TableHead></TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {isLoading ? (
//                     Array.from({ length: 3 }).map((_, i) => (
//                       <TableRow key={i}>
//                         <TableCell colSpan={5}>
//                           <Skeleton className="h-12 w-full" />
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : !cartData?.Details || cartData.Details.length === 0 ? (
//                     <TableRow>
//                       <TableCell
//                         colSpan={5}
//                         className="h-64 text-center text-slate-400"
//                       >
//                         No items found.
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     cartData.Details.map((item) => (
//                       <TableRow key={item.Id} className="hover:bg-slate-50">
//                         <TableCell>
//                           <span className="text-[10px] bg-slate-100 px-1 rounded mr-1">
//                             {item.RefType}
//                           </span>
//                           <span className="font-mono font-bold">
//                             {item.RefNo}
//                           </span>
//                         </TableCell>
//                         <TableCell className="font-bold text-slate-700">
//                           {item.PolicyHolderName}
//                         </TableCell>
//                         <TableCell>x {item.PaymentCount}</TableCell>
//                         <TableCell className="text-right font-bold text-slate-800">
//                           ৳ {item.TotalAmount.toLocaleString()}
//                         </TableCell>
//                         <TableCell>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => deleteMutation.mutate(item.Id)}
//                             className="text-slate-300 hover:text-red-600"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </div>

//             {/* FOOTER: PAYMENT & SAVE */}
//             <div className="p-6 bg-slate-50 border-t border-slate-200 mt-auto">
//               <div className="flex flex-col sm:flex-row gap-6 items-end justify-between">
//                 <div className="space-y-2 w-full sm:w-[350px]">
//                   <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
//                     <PenLine className="w-3 h-3" /> Payment Details / Comments
//                   </label>
//                   <Input
//                     placeholder="e.g. Cash, Check No, Notes..."
//                     value={paymentDetails}
//                     onChange={(e) => setPaymentDetails(e.target.value)}
//                     className="bg-white border-slate-300 h-11"
//                   />
//                 </div>
//                 <div className="flex gap-3 w-full sm:w-auto">
//                   <Button
//                     variant="ghost"
//                     className="flex-1 sm:flex-none text-slate-500 h-11"
//                     onClick={() => router.back()}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     onClick={handleSave}
//                     disabled={
//                       !cartData?.Details ||
//                       cartData.Details.length === 0 ||
//                       saveMutation.isPending
//                     }
//                     className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 h-11 shadow-lg"
//                   >
//                     {saveMutation.isPending ? (
//                       "Finalizing..."
//                     ) : (
//                       <>
//                         <Save className="w-4 h-4 mr-2" /> Finalize Batch
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  Save,
  User,
  FileText,
  Briefcase,
  Loader2,
  RefreshCw,
  Info,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  PenLine,
} from "lucide-react";
import {
  useForwardingEntry,
  PolicySearchResult,
} from "@/hooks/agent/use-forwarding-entry";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ForwardingEntryPage() {
  const router = useRouter();
  const {
    cartData,
    isLoading,
    refetch,
    searchMutation,
    addMutation,
    deleteMutation,
    saveMutation,
  } = useForwardingEntry();

  const [refType, setRefType] = useState("PR");
  const [refNo, setRefNo] = useState("");
  const [payCount, setPayCount] = useState("1");
  const [paymentDetails, setPaymentDetails] = useState("");

  const [policyData, setPolicyData] = useState<PolicySearchResult | null>(null);
  const [addStatus, setAddStatus] = useState<{
    message: string;
    type: "success" | "info" | "error";
  } | null>(null);

  // --- ACTIONS ---

  const handleSearch = () => {
    setPolicyData(null);
    setAddStatus(null);
    if (!refNo) return;

    searchMutation.mutate(
      { ReferanceType: refType, ReferanceNo: refNo },
      { onSuccess: (data) => setPolicyData(data) }
    );
  };

  const handleAdd = () => {
    if (!policyData) return;
    setAddStatus(null);

    // Calculate total for this specific item
    const amountVal = parseFloat(String(policyData.Amount || "0"));
    const countVal = parseInt(payCount || "1");
    const totalVal = amountVal * countVal;

    addMutation.mutate(
      {
        ReferanceType: refType,
        ReferanceNo: refNo,
        PolicyHolderName: policyData.PolicyHolderName,
        PayCount: payCount,
        Amount: String(amountVal),
        TotalAmount: String(totalVal),
        FAId: policyData.FAId,
        FAName: policyData.FAName,
        UMId: policyData.UMId,
        UmName: policyData.UMName,
        BMId: policyData.BMId,
        BMName: policyData.BMName,
      },
      {
        onSuccess: (statusMsg) => {
          const msg = statusMsg.toLowerCase();
          setAddStatus({
            message: statusMsg,
            type:
              msg.includes("already") || msg.includes("exist")
                ? "info"
                : "success",
          });
          setRefNo("");
          setPolicyData(null);
          setPayCount("1");
        },
        onError: (error) =>
          setAddStatus({ message: error.message, type: "error" }),
      }
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("Remove this policy from the batch?")) {
      deleteMutation.mutate(id);
    }
  };

  // --- [FIXED] SAVE HANDLER ---
  const handleSave = () => {
    // 1. Validate
    if (!cartData?.Details || cartData.Details.length === 0) {
      alert("Batch is empty!");
      return;
    }

    // 2. MANUALLY CALCULATE TOTALS (Critical Fix)
    // The server expects us to send the sum of what is in the table
    const calculatedTotalAmount = cartData.Details.reduce(
      (sum, item) => sum + Number(item.TotalAmount || 0),
      0
    );
    const calculatedPolicies = cartData.Details.length;

    // 3. Send to API
    saveMutation.mutate(
      {
        Name: "Save Forwarding", // Trigger for Legacy Backend
        PaymentMode: paymentDetails || "Cash",
        TotalAmount: String(calculatedTotalAmount),
        TotalNoOfPolicy: String(calculatedPolicies),
      },
      {
        onSuccess: () => {
          // Redirect after short delay to allow backend to process
          setTimeout(() => router.push("/agent/forwarding"), 800);
        },
      }
    );
  };

  const currentEntryTotal = policyData
    ? parseFloat(String(policyData.Amount || "0")) * parseInt(payCount || "0")
    : 0;

  const isStatusOk = policyData?.status?.toLowerCase() === "ok";

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8 pb-24 animate-in fade-in duration-500 bg-slate-50/30 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full h-10 w-10 border-slate-200 bg-white hover:bg-slate-50 shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Forwarding Entry
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Build a new batch of policies.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="bg-white border-slate-300"
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />{" "}
          Sync List
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: FORM (Unchanged) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-0 shadow-lg bg-white">
            <div className="h-1 bg-indigo-600 w-full" />
            <CardHeader className="bg-white border-b border-slate-100 py-4">
              <CardTitle className="text-sm font-bold uppercase text-slate-500 flex items-center gap-2">
                <Search className="w-4 h-4" /> Find Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4 bg-slate-50/50">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">
                  Reference Type
                </label>
                <Select value={refType} onValueChange={setRefType}>
                  <SelectTrigger className="bg-white border-slate-200 font-medium h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow">
                    <SelectItem value="PR">PR (First Year)</SelectItem>
                    <SelectItem value="OR">OR (Renewal)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">
                  Reference No
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. 449923"
                    value={refNo}
                    onChange={(e) => {
                      setRefNo(e.target.value);
                      if (addStatus) setAddStatus(null);
                    }}
                    className="font-mono bg-white h-10"
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={searchMutation.isPending || !refNo}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white h-10 px-4 cursor-pointer"
                  >
                    {searchMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Find"
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {policyData && isStatusOk && (
            <Card className="border-2 border-emerald-100 shadow-xl">
              <CardContent className="p-5 space-y-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-500">
                    Add to Batch
                  </h3>
                  <Badge className="bg-emerald-100 text-emerald-800">
                    Verified
                  </Badge>
                </div>
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase">
                    Policy Holder
                  </p>
                  <p className="font-bold text-slate-900 text-sm">
                    {policyData.PolicyHolderName}
                  </p>
                  <p className="text-xs mt-1 text-slate-600">
                    Base: ৳ {policyData.Amount}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500">
                      Payments
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={payCount}
                      onChange={(e) => setPayCount(e.target.value)}
                      className="font-bold text-center"
                    />
                  </div>
                  <div className="text-right">
                    <label className="text-xs font-bold text-slate-500">
                      Total Entry
                    </label>
                    <div className="h-10 flex items-center justify-end font-black text-xl text-emerald-600">
                      ৳ {currentEntryTotal.toLocaleString()}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleAdd}
                  disabled={addMutation.isPending}
                  className="w-full bg-slate-900 text-white font-bold h-12"
                >
                  {addMutation.isPending ? "Processing..." : "Add to Batch"}
                </Button>
              </CardContent>
            </Card>
          )}

          {addStatus && (
            <Alert
              className={`shadow-sm ${
                addStatus.type === "success"
                  ? "bg-emerald-50 text-emerald-900"
                  : addStatus.type === "info"
                  ? "bg-blue-50 text-blue-900"
                  : "bg-red-50 text-red-900"
              }`}
            >
              {addStatus.type === "success" ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : addStatus.type === "info" ? (
                <Info className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              <AlertDescription className="ml-2 font-medium">
                {addStatus.message}
              </AlertDescription>
            </Alert>
          )}
          {policyData && !isStatusOk && (
            <Alert variant="destructive" className="bg-red-50 text-red-900">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Issue</AlertTitle>
              <AlertDescription>{policyData.status}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* RIGHT: TABLE (Cart & Finalize) */}
        <div className="lg:col-span-8 h-full flex flex-col">
          <Card className="border-0 shadow-md flex-1 flex flex-col bg-white">
            <CardHeader className="flex flex-row items-center justify-between py-5 border-b border-slate-100">
              <div>
                <CardTitle className="text-lg font-black text-slate-800">
                  Current Batch
                </CardTitle>
                <p className="text-slate-500 text-xs">
                  {cartData?.Details?.length || 0} items ready.
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Batch Total
                </p>
                {isLoading ? (
                  <Skeleton className="h-8 w-24" />
                ) : (
                  <p className="text-2xl font-black text-emerald-600">
                    ৳ {Number(cartData?.TotalAmount || 0).toLocaleString()}
                  </p>
                )}
              </div>
            </CardHeader>

            <div className="flex-1 overflow-auto min-h-[400px]">
              <Table>
                <TableHeader className="bg-slate-50 sticky top-0 z-10">
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Holder</TableHead>
                    <TableHead>Inst.</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell colSpan={5}>
                          <Skeleton className="h-12 w-full" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : !cartData?.Details || cartData.Details.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-64 text-center text-slate-400"
                      >
                        No items found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    cartData.Details.map((item) => (
                      <TableRow key={item.Id} className="hover:bg-slate-50">
                        <TableCell>
                          <span className="text-[10px] bg-slate-100 px-1 rounded mr-1">
                            {item.RefType}
                          </span>
                          <span className="font-mono font-bold">
                            {item.RefNo}
                          </span>
                        </TableCell>
                        <TableCell className="font-bold text-slate-700">
                          {item.PolicyHolderName}
                        </TableCell>
                        <TableCell>x {item.PaymentCount}</TableCell>
                        <TableCell className="text-right font-bold text-slate-800">
                          ৳ {item.TotalAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteMutation.mutate(item.Id)}
                            className="text-slate-300 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* FOOTER: PAYMENT & SAVE */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 mt-auto">
              <div className="flex flex-col sm:flex-row gap-6 items-end justify-between">
                <div className="space-y-2 w-full sm:w-[350px]">
                  <label className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1">
                    <PenLine className="w-3 h-3" /> Payment Details / Comments
                  </label>
                  <Input
                    placeholder="e.g. Cash, Check No, Notes..."
                    value={paymentDetails}
                    onChange={(e) => setPaymentDetails(e.target.value)}
                    className="bg-white border-slate-300 h-11"
                  />
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button
                    variant="ghost"
                    className="flex-1 sm:flex-none text-slate-500 h-11"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={
                      !cartData?.Details ||
                      cartData.Details.length === 0 ||
                      saveMutation.isPending
                    }
                    className="flex-1 cursor-pointer sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 h-11 shadow-lg"
                  >
                    {saveMutation.isPending ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" /> Save
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
