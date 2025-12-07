export interface NavItem {
  label: string;
  href?: string;
  icon?: string;
  type?: string;
  children?: NavItem[];
}
