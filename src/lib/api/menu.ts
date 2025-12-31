// import axios from "axios";

// export interface MenuItem {
//   label: string;
//   href: string;
//   listinfo?: MenuItem[] | null;
//   children?: MenuItem[];
// }

// export async function fetchMenu(lang: "eng" | "bng"): Promise<MenuItem[]> {
//   try {
//     const url = `https://www.sonalilife.com:1010/api/Webdata/menudata/${lang}`;
//     const { data } = await axios.get(url);

//     // DEBUG: Uncomment to see what the API actually returns
//     // console.log("Raw Menu API Response:", data);

//     let parsedData = data;

//     // 1. Handle stringified JSON (Only if it IS a string)
//     if (typeof data === "string") {
//       try {
//         parsedData = JSON.parse(data);
//       } catch (e) {
//         console.error("Failed to parse menu string", e);
//         return [];
//       }
//     }

//     // 2. Handle Direct Array: [ { label... } ]
//     if (Array.isArray(parsedData)) {
//       return parsedData.map(normalizeItem);
//     }

//     // 3. Handle Wrapper: { data: [...] }
//     if (parsedData && Array.isArray(parsedData.data)) {
//       return parsedData.data.map(normalizeItem);
//     }

//     // 4. Handle specific "success" wrapper if present
//     if (
//       parsedData &&
//       parsedData.success === "true" &&
//       Array.isArray(parsedData.data)
//     ) {
//       return parsedData.data.map(normalizeItem);
//     }

//     console.warn("Menu API returned unexpected structure:", parsedData);
//     return [];
//   } catch (error) {
//     console.error("Menu fetch failed:", error);
//     return [];
//   }
// }

// function normalizeItem(item: any): MenuItem {
//   // Safety check: Default to '#' if href is missing/null
//   const rawHref = item.href || "#";

//   return {
//     label: item.label || "Untitled",
//     // Ensure href starts with / if it's internal
//     href:
//       rawHref.startsWith("http") || rawHref.startsWith("/") || rawHref === "#"
//         ? rawHref
//         : `/${rawHref}`,
//     // Recursively normalize children
//     children:
//       item.listinfo && Array.isArray(item.listinfo)
//         ? item.listinfo.map(normalizeItem)
//         : undefined,
//   };
// }

// import axios from "axios";

// export interface MenuItem {
//   label: string;
//   href: string;
//   listinfo?: MenuItem[] | null;
//   children?: MenuItem[];
// }

// export async function fetchMenu(lang: "eng" | "bng"): Promise<MenuItem[]> {
//   try {
//     const url = `https://www.sonalilife.com:1010/api/Webdata/menudata/${lang}`;
//     const { data } = await axios.get(url);

//     // DEBUG: Uncomment to see raw data in browser console
//     // console.log("Menu API Raw:", data);

//     let parsedData = data;

//     // 1. Handle stringified JSON (Safety check)
//     if (typeof data === "string") {
//       try {
//         parsedData = JSON.parse(data);
//       } catch (e) {
//         console.error("Failed to parse menu string", e);
//         return [];
//       }
//     }

//     // 2. Handle YOUR API Format: Direct Array [ { label: "Home"... } ]
//     if (Array.isArray(parsedData)) {
//       return parsedData.map(normalizeItem);
//     }

//     // 3. Handle Wrapper Format: { data: [...] } (Just in case)
//     if (parsedData && Array.isArray(parsedData.data)) {
//       return parsedData.data.map(normalizeItem);
//     }

//     console.warn("Menu API returned unexpected structure:", parsedData);
//     return [];
//   } catch (error) {
//     console.error("Menu fetch failed:", error);
//     return [];
//   }
// }

// function normalizeItem(item: any): MenuItem {
//   // Safety check: Default to '#' if href is missing/null
//   const rawHref = item.href || "#";

//   return {
//     label: item.label || "Untitled",
//     // Ensure href starts with / if it's internal
//     href:
//       rawHref.startsWith("http") || rawHref.startsWith("/") || rawHref === "#"
//         ? rawHref
//         : `/${rawHref}`,
//     // Recursively normalize children
//     // Your API uses 'listinfo', so we map it to 'children'
//     children:
//       item.listinfo && Array.isArray(item.listinfo)
//         ? item.listinfo.map(normalizeItem)
//         : undefined,
//   };
// }

// workable down
import axios from "axios";

export interface MenuItem {
  label: string;
  href: string;
  listinfo?: MenuItem[] | null;
  children?: MenuItem[];
}

export async function fetchMenu(lang: "eng" | "bng"): Promise<MenuItem[]> {
  try {
    const url = `https://www.sonalilife.com:1010/api/Webdata/menudata/${lang}`;
    const { data } = await axios.get(url);

    // console.log(`[Menu] Fetching: ${url}`, data); // Debug log

    let parsedData = data;

    // 1. Handle stringified JSON (Safety check)
    if (typeof data === "string") {
      try {
        parsedData = JSON.parse(data);
      } catch (e) {
        console.error("Failed to parse menu string", e);
        return [];
      }
    }

    // 2. Handle Direct Array: [ { label... } ]
    if (Array.isArray(parsedData)) {
      return parsedData.map(normalizeItem);
    }

    // 3. Handle Wrapper: { data: [...] }
    if (parsedData && Array.isArray(parsedData.data)) {
      return parsedData.data.map(normalizeItem);
    }

    console.warn("Menu API returned unexpected structure:", parsedData);
    return [];
  } catch (error) {
    console.error("Menu fetch failed:", error);
    return [];
  }
}

function normalizeItem(item: any): MenuItem {
  // Safety check: Default to '#' if href is missing/null
  const rawHref = item.href || "#";

  return {
    label: item.label || "Untitled",
    // Ensure href starts with / if it's internal
    href:
      rawHref.startsWith("http") || rawHref.startsWith("/") || rawHref === "#"
        ? rawHref
        : `/${rawHref}`,
    // Recursively normalize children
    // Your API uses 'listinfo', so we map it to 'children'
    children:
      item.listinfo && Array.isArray(item.listinfo)
        ? item.listinfo.map(normalizeItem)
        : undefined,
  };
}
