import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PrimaryCurrencyStore {
  primaryCurrency: string;
  setPrimaryCurrency: (currency: string) => void;
}

export const usePrimaryCurrencyStore = create<PrimaryCurrencyStore>()(
  persist(
    (set) => ({
      primaryCurrency: "EUR",
      setPrimaryCurrency: (currency) => set({ primaryCurrency: currency }),
    }),
    {
      name: "primary-currency-storage",
    }
  )
);
