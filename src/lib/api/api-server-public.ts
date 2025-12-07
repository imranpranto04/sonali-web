// Define valid public endpoints to prevent typos
export type PublicEndpoint =
  | "messages"
  | "shariah"
  | "notice" // Added 'notice'
  | "board-of-directors"
  | "management-team"
  | "products"
  | "terms-and-conditions";

// This function is only for Server Components (page.tsx)
export async function fetchPublicContent<T>(
  endpoint: PublicEndpoint,
  customBody?: Record<string, any> // Allow custom payload
): Promise<T[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // Default body for standard pages
    const defaultBody = { lang: "eng" };

    // Merge default with custom body (Custom takes precedence)
    const body = { ...defaultBody, ...customBody };

    const res = await fetch(`${baseUrl}/Webdata/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      next: { revalidate: 3600 }, // Cache for 1 hour (ISR)
    });

    const data = await res.json();

    // Robust check for success
    return data.success === "true" && Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    console.error(`Server fetch failed for ${endpoint}:`, error);
    return [];
  }
}
