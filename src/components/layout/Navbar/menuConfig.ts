// // // src/components/navbar/menuConfig.ts
// // export const menus = {
// //   public: [
// //     { name: "Home", href: "/" },
// //     { name: "Products", href: "/products" },
// //     { name: "About", href: "/about" },
// //     { name: "Login", href: "/login" },
// //   ],
// //   policyholder: [
// //     { name: "Dashboard", href: "/dashboard" },
// //     { name: "My Policies", href: "/dashboard/policies" },
// //     { name: "Claims", href: "/dashboard/claims" },
// //     { name: "Profile", href: "/dashboard/profile" },
// //   ],
// //   agent: [
// //     { name: "Dashboard", href: "/agent/dashboard" },
// //     { name: "Clients", href: "/agent/clients" },
// //     { name: "Payments", href: "/agent/payments" },
// //     { name: "Reports", href: "/agent/reports" },
// //   ],
// // };

// // src/components/navbar/menuConfig.ts
// // src/components/layout/Navbar/menuConfig.ts

// export type DropdownItem = {
//   name: string;
//   href: string;
//   description?: string;
// };

// export type NavLink = {
//   name: string;
//   href?: string;
//   dropdown?: DropdownItem[];
// };

// export const menus: { [key: string]: NavLink[] } = {
//   public: [
//     { name: "Home", href: "/" },
//     {
//       name: "Products",
//       dropdown: [
//         {
//           name: "Auto Insurance",
//           href: "/products/auto",
//           description: "Coverage for cars, trucks, and motorcycles.",
//         },
//         {
//           name: "Home Insurance",
//           href: "/products/home",
//           description: "Protect your property and belongings.",
//         },
//         {
//           name: "Life Insurance",
//           href: "/products/life",
//           description: "Financial security for your loved ones.",
//         },
//       ],
//     },
//     { name: "About", href: "/about" },
//     { name: "Login", href: "/login" },
//   ],
//   policyholder: [
//     { name: "Dashboard", href: "/dashboard" },
//     { name: "My Policies", href: "/dashboard/policies" },
//     { name: "Claims", href: "/dashboard/claims" },
//     { name: "Profile", href: "/dashboard/profile" },
//   ],
//   agent: [
//     { name: "Dashboard", href: "/agent/dashboard" },
//     { name: "Clients", href: "/agent/clients" },
//     { name: "Payments", href: "/agent/payments" },
//     { name: "Reports", href: "/agent/reports" },
//   ],
// };
