import { fetchNavbar } from "@/lib/api/menu";
import ClientNavbarController from "./ClientNavbarController";

export default async function Navbar() {
  const items = await fetchNavbar();

  return (
    <>
      <ClientNavbarController items={items} />
    </>
  );
}
