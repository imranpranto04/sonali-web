// src/config/topbarConfig.ts
import { Mail, Phone, Facebook, Twitter, Linkedin, Globe } from "lucide-react";

// 1. Contact Info
export const contactInfo = [
  {
    name: "info@insureco.com",
    href: "mailto:info@insureco.com",
    icon: Mail,
  },
  {
    name: "+00 0123 456 789",
    href: "tel:+000123456789",
    icon: Phone,
  },
];

// 2. Social Media Links
export const socialLinks = [
  {
    name: "Facebook",
    href: "#", // Add your facebook link
    icon: Facebook,
  },
  {
    name: "Twitter",
    href: "#", // Add your twitter link
    icon: Twitter,
  },
  {
    name: "LinkedIn",
    href: "#", // Add your linkedin link
    icon: Linkedin,
  },
];

// 3. Language Options
export const languages = [
  { name: "ENG (UK)", code: "en-UK" },
  { name: "ESP (ES)", code: "es-ES" },
  { name: "FRA (FR)", code: "fr-FR" },
];
