import { fetchPublicContent } from "./api-server-public";

// --- Types ---
export type Achiever = {
  id: string;
  rank: number;
  name: string;
  DeptName: string;
  image: string;
  designation: string;
  branch: string;
  performance: string;
  type: "employee" | "agent";
};

export type SuperstarCategory = {
  id: string;
  label: string;
  dateLabel?: string;
  achievers: Achiever[];
};

export type SuperstarData = {
  categories: SuperstarCategory[];
};

// --- MANAGEMENT TEAM TYPES ---
export type ManagementMember = {
  name: string;
  designation: string;
  image: string;
};

// --- 1. ROBUST LABEL FORMATTER (The Fix) ---
const SPECIAL_LABELS: Record<string, string> = {
  // Add known "weird" keys here
  bankokpataya: "Bangkok & Pattaya",
  worldcup2023: "World Cup 2023",
  goa2023: "Goa Tour 2023",
};

const formatCategoryLabel = (slug: string): string => {
  // Step 1: Check if we have a manual override (Perfect English)
  if (SPECIAL_LABELS[slug]) return SPECIAL_LABELS[slug];

  // Step 2: Smart Auto-Format (For future unknown keys)
  // This turns "sales_manager" -> "Sales Manager" or "topAgent" -> "Top Agent"
  return slug
    .replace(/([A-Z])/g, " $1") // Add space before capital letters (camelCase)
    .replace(/[_-]/g, " ") // Replace underscores/dashes with spaces
    .replace(/\d+/g, " $&") // Add space before numbers (e.g. "tour2025" -> "tour 2025")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

// --- Helper: Image URL ---
const getImageUrl = (item: any, type: string) => {
  const isEmployee = type.toLowerCase() === "employee";
  const isAgent = type.toLowerCase() === "agent";

  if (isEmployee && item.ImageName) {
    return `https://erp.sonalilife.com/PayRollUI/UploadEmpImage/${item.ImageName}`;
  }
  if ((isAgent || !isEmployee) && item.AgentImage) {
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
  const name = item.EmpName || item.AgentName || "Unknown";
  const DeptName = item.DeptName;
  const image = getImageUrl(item, type);
  const designation = item.DesignationName || item.AgentTypeName || "";
  const rank = item.Ranking || item.SL || index + 1;

  let performance = "";
  if (item.Average) performance = `Score: ${item.Average}`;
  if (item.PremiumAmount)
    performance = `Premium: ৳${item.PremiumAmount.toLocaleString()}`;

  return {
    id: `${type}-${index}`,
    rank,
    name,
    DeptName,
    image,
    designation,
    branch: item.BranchName || "",
    performance,
    type: type as any,
  };
};

// --- Main Function ---
export const getSuperstarData = async (): Promise<SuperstarData | null> => {
  try {
    const rawData = await fetchPublicContent<any>("superstar", {
      method: "GET",
    });

    const result: SuperstarData = { categories: [] };

    if (rawData && rawData.length > 0) {
      rawData.forEach((obj) => {
        if (obj.label && Array.isArray(obj.listinfo)) {
          // USE THE NEW FORMATTER
          const cleanLabel = formatCategoryLabel(obj.label);

          // Date Logic (Same as before)
          let dateLabel = undefined;
          const firstItem = obj.listinfo[0];
          if (firstItem) {
            if (firstItem.Month && firstItem.Year)
              dateLabel = `${firstItem.Month} ${firstItem.Year}`;
            else if (firstItem.sMonth && firstItem.sYear)
              dateLabel = `${firstItem.sMonth} ${firstItem.sYear}`;
          }

          result.categories.push({
            id: obj.label,
            label: cleanLabel, // Uses the smart label
            dateLabel: dateLabel,
            achievers: obj.listinfo.map((item: any, idx: number) =>
              normalizeAchiever(item, obj.label, idx)
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
