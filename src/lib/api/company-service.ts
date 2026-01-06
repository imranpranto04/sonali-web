// import { fetchPublicContent } from "./api-server-public";

// // --- Types ---
// export type Achiever = {
//   id: string;
//   rank: number;
//   name: string;
//   DeptName: string;
//   image: string;
//   designation: string;
//   branch: string;
//   performance: string;
//   type: "employee" | "agent";
// };

// export type SuperstarCategory = {
//   id: string;
//   label: string;
//   dateLabel?: string;
//   achievers: Achiever[];
// };

// export type SuperstarData = {
//   categories: SuperstarCategory[];
// };

// // --- MANAGEMENT TEAM TYPES ---
// export type ManagementMember = {
//   name: string;
//   designation: string;
//   image: string;
// };

// // --- 1. ROBUST LABEL FORMATTER (The Fix) ---
// const SPECIAL_LABELS: Record<string, string> = {
//   // Add known "weird" keys here
//   bankokpataya: "Bangkok & Pattaya",
//   worldcup2023: "World Cup 2023",
//   goa2023: "Goa Tour 2023",
// };

// const formatCategoryLabel = (slug: string): string => {
//   // Step 1: Check if we have a manual override (Perfect English)
//   if (SPECIAL_LABELS[slug]) return SPECIAL_LABELS[slug];

//   // Step 2: Smart Auto-Format (For future unknown keys)
//   // This turns "sales_manager" -> "Sales Manager" or "topAgent" -> "Top Agent"
//   return slug
//     .replace(/([A-Z])/g, " $1") // Add space before capital letters (camelCase)
//     .replace(/[_-]/g, " ") // Replace underscores/dashes with spaces
//     .replace(/\d+/g, " $&") // Add space before numbers (e.g. "tour2025" -> "tour 2025")
//     .trim()
//     .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
// };

// // --- Helper: Image URL ---
// const getImageUrl = (item: any, type: string) => {
//   const isEmployee = type.toLowerCase() === "employee";
//   const isAgent = type.toLowerCase() === "agent";

//   if (isEmployee && item.ImageName) {
//     return `https://erp.sonalilife.com/PayRollUI/UploadEmpImage/${item.ImageName}`;
//   }
//   if ((isAgent || !isEmployee) && item.AgentImage) {
//     return `https://erp.sonalilife.com/AgentUI/AgentFileUpload/${item.AgentImage}`;
//   }
//   return "";
// };

// // --- Helper: Normalizer ---
// const normalizeAchiever = (
//   item: any,
//   type: string,
//   index: number
// ): Achiever => {
//   const name = item.EmpName || item.AgentName || "Unknown";
//   const DeptName = item.DeptName;
//   const image = getImageUrl(item, type);
//   const designation = item.DesignationName || item.AgentTypeName || "";
//   const rank = item.Ranking || item.SL || index + 1;

//   let performance = "";
//   if (item.Average) performance = `Score: ${item.Average}`;
//   if (item.PremiumAmount)
//     performance = `Premium: ৳${item.PremiumAmount.toLocaleString()}`;

//   return {
//     id: `${type}-${index}`,
//     rank,
//     name,
//     DeptName,
//     image,
//     designation,
//     branch: item.BranchName || "",
//     performance,
//     type: type as any,
//   };
// };

// // --- Main Function ---
// export const getSuperstarData = async (): Promise<SuperstarData | null> => {
//   try {
//     const rawData = await fetchPublicContent<any>("superstar", {
//       method: "GET",
//     });

//     const result: SuperstarData = { categories: [] };

//     if (rawData && rawData.length > 0) {
//       rawData.forEach((obj) => {
//         if (obj.label && Array.isArray(obj.listinfo)) {
//           // USE THE NEW FORMATTER
//           const cleanLabel = formatCategoryLabel(obj.label);

//           // Date Logic (Same as before)
//           let dateLabel = undefined;
//           const firstItem = obj.listinfo[0];
//           if (firstItem) {
//             if (firstItem.Month && firstItem.Year)
//               dateLabel = `${firstItem.Month} ${firstItem.Year}`;
//             else if (firstItem.sMonth && firstItem.sYear)
//               dateLabel = `${firstItem.sMonth} ${firstItem.sYear}`;
//           }

//           result.categories.push({
//             id: obj.label,
//             label: cleanLabel, // Uses the smart label
//             dateLabel: dateLabel,
//             achievers: obj.listinfo.map((item: any, idx: number) =>
//               normalizeAchiever(item, obj.label, idx)
//             ),
//           });
//         }
//       });
//     }

//     return result;
//   } catch (error) {
//     console.error("Failed to process superstar data:", error);
//     return null;
//   }
// };

// // --- MANAGEMENT API ---
// export const getManagementTeam = async (): Promise<ManagementMember[]> => {
//   try {
//     // Fetch from: {{base_url}}/Webdata/officeinfo/management
//     const rawData = await fetchPublicContent<any>("officeinfo/management", {
//       method: "GET",
//     });

//     if (!rawData || !Array.isArray(rawData)) return [];

//     return rawData.map((item) => ({
//       name: item.name || "Name Not Available",
//       designation: item.designation || "",
//       // Construct full ERP path
//       image: item.image
//         ? `https://erp.sonalilife.com/PayRollUI/UploadEmpImage/${item.image}`
//         : "",
//     }));
//   } catch (error) {
//     console.error("Failed to fetch management team:", error);
//     return [];
//   }
// };

import { fetchPublicContent } from "./api-server-public";

// --- Types ---
export type Achiever = {
  id: string;
  name: string;
  DeptName?: string; // Optional because Agents don't have Dept
  image: string;
  designation: string;
  branch?: string;
  performance?: string; // Optional
  type: "employee" | "agent";
};

export type SuperstarCategory = {
  id: string;
  label: string;
  achievers: Achiever[];
};

export type SuperstarData = {
  month: string;
  year: number;
  categories: SuperstarCategory[];
};

// --- MANAGEMENT TEAM TYPES ---
export type ManagementMember = {
  name: string;
  designation: string;
  image: string;
};

// download-form page

export interface DownloadForm {
  id: number;
  title: string;
  description: string;
  linkName?: string;
  link?: string;
  fileName?: string;
}

// --- MANAGEMENT API ---
export const getManagementTeam = async (): Promise<ManagementMember[]> => {
  try {
    // Fetch from: {{base_url}}/Webdata/officeinfo/management
    const rawData = await fetchPublicContent<any>("officeinfo/management", {
      method: "GET",
    });

    if (!rawData || !Array.isArray(rawData)) return [];

    return rawData.map((item) => ({
      name: item.name || "Name Not Available",
      designation: item.designation || "",
      // Construct full ERP path
      image: item.image
        ? `https://erp.sonalilife.com/PayRollUI/UploadEmpImage/${item.image}`
        : "",
    }));
  } catch (error) {
    console.error("Failed to fetch management team:", error);
    return [];
  }
};

// board-affairs

// --- Helper: Image URL ---
const getImageUrl = (item: any, type: string) => {
  const isEmployee = type.toLowerCase() === "employee";

  if (isEmployee && item.ImageName) {
    return `https://erp.sonalilife.com/PayRollUI/UploadEmpImage/${item.ImageName}`;
  }
  // For Agents
  if (item.AgentImage) {
    return `https://erp.sonalilife.com/AgentUI/AgentFileUpload/${item.AgentImage}`;
  }
  return "";
};

// --- Helper: Normalizer ---
const normalizeAchiever = (
  item: any,
  type: string,
  index: number
): Achiever => {
  const isEmployee = type === "employee";

  const name = isEmployee ? item.EmpName : item.AgentName;
  const designation = isEmployee ? item.DesignationName : item.AgentTypeName;
  const image = getImageUrl(item, type);

  // Performance String (Optional)
  let performance = "";
  if (isEmployee && item.Average) performance = `Score: ${item.Average}`;
  if (!isEmployee && item.PremiumAmount)
    performance = `Premium: ৳${item.PremiumAmount.toLocaleString()}`;

  return {
    id: `${type}-${index}`,
    name: name || "Unknown Name",
    DeptName: item.DeptName, // Only employees usually have this
    branch: item.BranchName,
    image,
    designation: designation || "",
    performance,
    type: type as "employee" | "agent",
  };
};

// --- MAIN FUNCTION ---
export const getSuperstarData = async (): Promise<SuperstarData | null> => {
  try {
    const rawData = await fetchPublicContent<any>("superstar", {
      method: "GET",
    });

    // Default return structure
    const result: SuperstarData = {
      month: "Current",
      year: new Date().getFullYear(),
      categories: [],
    };

    if (rawData && Array.isArray(rawData)) {
      // 1. Extract Month/Year from the first object if available
      const metaObj = rawData.find((obj: any) => obj.month && obj.year);
      if (metaObj) {
        result.month = metaObj.month;
        result.year = metaObj.year;
      }

      // 2. Filter & Process Categories
      // We ONLY want "employee" and "agent"
      const ALLOWED_LABELS = ["employee", "agent"];

      rawData.forEach((obj: any) => {
        if (
          obj.label &&
          ALLOWED_LABELS.includes(obj.label.toLowerCase()) &&
          Array.isArray(obj.listinfo)
        ) {
          const categoryId = obj.label.toLowerCase();
          const label =
            categoryId === "employee" ? "Employee of the Month" : "Top Agents";

          result.categories.push({
            id: categoryId,
            label: label,
            achievers: obj.listinfo.map((item: any, idx: number) =>
              normalizeAchiever(item, categoryId, idx)
            ),
          });
        }
      });
    }

    return result;
  } catch (error) {
    console.error("Failed to process superstar data:", error);
    return null;
  }
};

// --- GET BOARD AFFAIRS TEAM ---

// --- GET BOARD AFFAIRS TEAM ---

// download forms
const PDF_BASE_DIR = "https://erp.sonalilife.com/Utilities/Form/";

export const getDownloadForms = async (): Promise<DownloadForm[]> => {
  try {
    // 1. Fetch Data (GET method)
    const response = await fetchPublicContent<any>("formDownload", {
      method: "GET",
      cache: "no-store",
    });

    // 2. Safe Unwrap
    let dataList = [];
    if (Array.isArray(response)) dataList = response;
    else if (response && Array.isArray(response.data)) dataList = response.data;

    // 3. Normalize & Map
    return dataList.map((item: any) => {
      // ROBUST URL HANDLING:
      // If API gives full URL, use it. If just filename, prepend base directory.
      let fullPdfUrl = "";
      if (item.fileName) {
        fullPdfUrl = item.fileName.startsWith("http")
          ? item.fileName
          : `${PDF_BASE_DIR}${item.fileName}`;
      }

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        linkName: item.linkName,
        link: item.link,
        pdfUrl: fullPdfUrl,
      };
    });
  } catch (error) {
    console.error("Failed to fetch download forms:", error);
    return [];
  }
};
