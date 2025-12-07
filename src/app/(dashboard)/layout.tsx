// 1. Import them here
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { DashboardTopbar } from "@/components/dashboard/Topbar";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Get Auth State & Hydration Status
  // We use _hasHydrated to know when Zustand has finished reading localStorage
  // @ts-ignore - Ignoring TS error if store types aren't fully updated yet
  const { isAuthenticated, _hasHydrated } = useAuthStore();
  const router = useRouter();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // 2. Security Check (Only runs AFTER hydration is complete)
  // We don't need a separate 'isMounted' state because _hasHydrated implies we are on the client
  useEffect(() => {
    if (_hasHydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [_hasHydrated, isAuthenticated, router]);

  // 3. Loading State (Prevents flicker/redirect loop)
  // We show this spinner while waiting for the store to finish reading localStorage
  if (!_hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            Secure Portal Loading...
          </p>
        </div>
      </div>
    );
  }

  // 4. Final Guard: If still not authenticated after loading, don't render children (redirect handles it)
  if (!isAuthenticated) return null;

  // 5. Authenticated View
  return (
    // new code

    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Desktop Sidebar (Hidden on mobile) */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 z-40">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          ></div>
          {/* Drawer */}
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-2xl animate-in slide-in-from-left">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64 transition-all duration-300">
        {/* Topbar passes the mobile menu toggle handler */}{" "}
        <DashboardTopbar onMenuClick={() => setIsMobileOpen(true)} />
        {/* Dashboard Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
    // !new code
  );
}
