import * as Icons from "lucide-react";

export function getIcon(name?: string) {
  return Icons[name as keyof typeof Icons] || null;
}
