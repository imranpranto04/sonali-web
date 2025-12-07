import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  role: "policyholder" | "agent";
  email?: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean; // <--- NEW FLAG

  login: (user: User, token: string) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void; // <--- NEW ACTION
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      _hasHydrated: false, // Start as false

      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      },

      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "sonali-life-auth",

      // This function runs when the store finishes loading from localStorage
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true); // <--- THIS FIXES THE BUG
      },
    }
  )
);
