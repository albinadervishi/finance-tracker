import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Transaction } from "@/types";

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  getTransactionById: (id: string) => Transaction | undefined;
  getTransactionsByType: (type: "income" | "expense") => Transaction[];
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getBalance: () => number;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    immer((set, get) => ({
      transactions: [],

      addTransaction: (transaction) =>
        set((state) => {
          get().setIsSubmitting(true);
          const newTransaction = {
            ...transaction,
            id: crypto.randomUUID(),
          };
          state.transactions.push(newTransaction);
          get().setIsSubmitting(false);
        }),

      updateTransaction: (id, updates) =>
        set((state) => {
          get().setIsSubmitting(true);
          const index = state.transactions.findIndex((t) => t.id === id);
          if (index !== -1) {
            state.transactions[index] = {
              ...state.transactions[index],
              ...updates,
            };
          }
          get().setIsSubmitting(false);
        }),

      deleteTransaction: (id) =>
        set((state) => {
          state.transactions = state.transactions.filter((t) => t.id !== id);
        }),

      getTransactionById: (id) => {
        return get().transactions.find((t) => t.id === id);
      },

      getTransactionsByType: (type) => {
        return get().transactions.filter((t) => t.type === type);
      },

      getTotalIncome: () => {
        return get()
          .transactions.filter((t) => t.type === "income")
          .reduce((sum, t) => sum + t.amountEur, 0);
      },

      getTotalExpenses: () => {
        return get()
          .transactions.filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amountEur, 0);
      },

      getBalance: () => {
        return get().getTotalIncome() - get().getTotalExpenses();
      },
      isSubmitting: false,
      setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
    })),
    {
      name: "transactions-storage",
      version: 1,
    }
  )
);
