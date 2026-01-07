// export type PublicEndpoint =
//   | "messages"
//   | "shariah"
//   | "notice"
//   | "board-of-directors"
//   | "management-team"
//   | "Products"
//   | "terms-and-conditions"
//   | "superstar"
//   | "officeinfo/management" // Fixed: Included correctly inside the type
//   | "news" // Added for News page
//   | "event"; // Added for Event page

// // 2. Helper Interface for Options
// interface FetchOptions {
//   body?: Record<string, any>; // Custom payload (e.g., { searchfor: "recent" })
//   method?: "GET" | "POST"; // Allow switching methods (Superstar needs GET, News needs POST)
//   revalidate?: number; // Control Cache time (Default: 3600s)
// }

// // 3. The Main Server Fetcher Function
// export async function fetchPublicContent<T>(
//   endpoint: PublicEndpoint,
//   options: FetchOptions = {}
// ): Promise<T[]> {
//   try {
//     // Ensure this env variable is set in .env.local
//     const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

//     // Destructure options with defaults
//     const { body, method = "POST", revalidate = 3600 } = options;

//     // Prepare standard Fetch Config
//     const fetchConfig: RequestInit = {
//       method,
//       headers: { "Content-Type": "application/json" },
//       next: { revalidate }, // Next.js specific caching
//     };

//     // LOGIC: Only attach a JSON body if it is a POST request
//     if (method === "POST") {
//       // Default params usually required by your API
//       const defaultBody = { lang: "eng" };

//       // Merge defaults with your specific payload (Payload takes priority)
//       fetchConfig.body = JSON.stringify({ ...defaultBody, ...body });
//     }

//     // Execute Request
//     // URL Pattern: {{base_url}}/Webdata/{{endpoint}}
//     const res = await fetch(`${baseUrl}/Webdata/${endpoint}`, fetchConfig);

//     if (!res.ok) {
//       console.error(`API Error ${res.status} for endpoint: ${endpoint}`);
//       return [];
//     }

//     const data = await res.json();

//     // 4. Robust Response Checking
//     // Some APIs return success as string "true", others as boolean true.
//     // Some might return the array directly. This covers all cases.

//     // Case A: Standard { success: "true", data: [...] }
//     if (
//       (data.success === "true" || data.success === true) &&
//       Array.isArray(data.data)
//     ) {
//       return data.data;
//     }

//     // Case B: Direct Array Response [ ... ]
//     if (Array.isArray(data)) {
//       return data;
//     }

//     // Case C: { data: [...] } without success flag (Rare but possible)
//     if (Array.isArray(data.data)) {
//       return data.data;
//     }

//     // If nothing matches, return empty array to prevent UI crashes
//     return [];
//   } catch (error) {
//     console.error(`Server fetch failed for ${endpoint}:`, error);
//     return [];
//   }
// }
// lib/api-server-public.ts

export type PublicEndpoint =
  | "messages"
  | "shariah"
  | "notice"
  | "board-of-directors"
  | "management-team"
  | "Products"
  | "terms-and-conditions"
  | "superstar"
  | "officeinfo/management"
  | "news"
  | "event"
  | "financials"
  | "officeinfo/secretaria"
  | "officeinfo/metroproject"
  | "officeinfo/metroadmin"
  | "formDownload"
  | "aboutus";

interface FetchOptions {
  body?: Record<string, any>;
  method?: "GET" | "POST";
  revalidate?: number;
}

/**
 * INTERNAL HELPER: Shared fetching logic (Not exported)
 */
async function _baseFetch(
  endpoint: PublicEndpoint,
  options: FetchOptions = {}
) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { body, method = "POST", revalidate = 60 } = options;

    const fetchConfig: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
      next: { revalidate },
    };

    if (method === "POST") {
      // Logic: Merge defaults. If 'body' has { lang: 'bng' }, it overrides default 'eng'
      const defaultBody = { lang: "eng" };
      fetchConfig.body = JSON.stringify({ ...defaultBody, ...body });
    }

    const res = await fetch(`${baseUrl}/Webdata/${endpoint}`, fetchConfig);

    if (!res.ok) {
      console.error(`API Error ${res.status} for endpoint: ${endpoint}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`Server fetch failed for ${endpoint}:`, error);
    return null;
  }
}

/**
 * OPTION 1: For Arrays (News, Events, etc.)
 * Use this for your existing pages.
 */
export async function fetchPublicContent<T>(
  endpoint: PublicEndpoint,
  options: FetchOptions = {}
): Promise<T[]> {
  const data = await _baseFetch(endpoint, options);
  if (!data) return [];

  // Robustly find the array inside the response
  if (Array.isArray(data)) return data;
  if (data.data && Array.isArray(data.data)) return data.data;

  return [];
}

/**
 * OPTION 2: For Single Objects (Financials)
 * Use this for the new Financials page.
 */
export async function fetchPublicSingle<T>(
  endpoint: PublicEndpoint,
  options: FetchOptions = {}
): Promise<T> {
  const data = await _baseFetch(endpoint, options);
  if (!data) return {} as T;

  // Return the whole object if it's successful
  if (data.success === "true" || data.success === true) {
    return data as T;
  }

  return data as T;
}
