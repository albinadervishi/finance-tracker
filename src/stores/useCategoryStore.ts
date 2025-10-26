import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Category } from "@/types";

interface CategoryStore {
  customCategories: Category[];
  addCategory: (name: string) => Category;
  removeCategory: (id: string) => void;
  getAllCategories: (defaultCategories: Category[]) => Category[];
  getCategoryById: (
    id: string,
    defaultCategories: Category[]
  ) => Category | undefined;
}

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set, get) => ({
      customCategories: [],

      addCategory: (name) => {
        const trimmed = name.trim().toLowerCase();

        const existing = get().customCategories.find((c) => c.name === trimmed);
        if (existing) return existing;

        const newCategory: Category = {
          id: crypto.randomUUID(),
          name: trimmed,
          isDefault: false,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          customCategories: [...state.customCategories, newCategory],
        }));

        return newCategory;
      },

      removeCategory: (id) =>
        set((state) => ({
          customCategories: state.customCategories.filter((c) => c.id !== id),
        })),

      getAllCategories: (defaultCategories) => {
        const custom = get().customCategories;
        return [...defaultCategories, ...custom].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      },

      getCategoryById: (id, defaultCategories = []) => {
        return [...get().customCategories, ...defaultCategories].find(
          (c) => c.id === id
        );
      },
    }),
    { name: "categories-storage" }
  )
);
