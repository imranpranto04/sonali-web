import { http } from "./http";
import { ICON_MAP } from "../icon-nav";
import type { NavItem } from "@/types/nav";

export async function fetchNavbar(): Promise<NavItem[]> {
  const { data } = await http.get("/Webdata/menudata");

  return data.map((item: any) => ({
    label: item.label,
    href: item.href || undefined,
    // icon: ICON_MAP[item.label] ?? "Circle",
    children:
      item.listinfo?.map((child: any) => ({
        label: child.label,
        href: child.href,
        type: child.type,
      })) || undefined,
  }));
}
