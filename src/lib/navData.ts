import { Info, Shield, Handshake, Building, Building2 } from "lucide-react";

export interface NavItem {
  label: string;
  href?: string;
  desc?: string;
  icon?: any;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Company Info",
    icon: Info,
    children: [
      { label: "About Us", desc: "History & Mission", href: "/about" },
      { label: "Board of Directors", desc: "Leadership Team", href: "/board" },
      { label: "Management", desc: "Executive Profiles", href: "/management" },
      { label: "Annual Reports", desc: "Financial Data", href: "/reports" },
    ],
  },
  {
    label: "Products",
    icon: Shield,
    children: [
      {
        label: "Family Protection",
        desc: "Secure loved ones",
        href: "/products/family",
      },
      {
        label: "Child Education",
        desc: "Future planning",
        href: "/products/education",
      },
      { label: "Retirement", desc: "Pension plans", href: "/products/pension" },
      {
        label: "Health Insurance",
        desc: "Medical coverage",
        href: "/products/health",
      },
    ],
  },
  {
    label: "Services",
    icon: Handshake,
    children: [
      { label: "Pay Premium", desc: "Online payment", href: "/pay" },
      { label: "Claim Status", desc: "Track claims", href: "/claims" },
      { label: "Policy Statement", desc: "Download docs", href: "/policy" },
    ],
  },
  {
    label: "Office Info",
    icon: Building,
    children: [
      { label: "Head Office", desc: "Dhaka HQ", href: "/contact" },
      { label: "Branch Locator", desc: "Find near you", href: "/branches" },
    ],
  },
  { label: "Financials", href: "/financials" },
  { label: "Contact", href: "/contact" },
  {
    label: "Bancassurance",
    icon: Building2,
    children: [
      { label: "Partner Banks", desc: "Network banks", href: "/partners" },
      {
        label: "Bank Products",
        desc: "Exclusive plans",
        href: "/bank-products",
      },
    ],
  },
];
