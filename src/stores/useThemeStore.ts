import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ThemeEnum, type Theme } from "@/types";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: ThemeEnum.LIGHT,
      setTheme: (theme: Theme) => {
        document.documentElement.classList.remove(
          ThemeEnum.LIGHT,
          ThemeEnum.DARK
        );
        document.documentElement.classList.add(theme);
        set({ theme });
      },
      toggleTheme: () =>
        set((state) => {
          const newTheme =
            state.theme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT;
          document.documentElement.classList.remove(
            ThemeEnum.LIGHT,
            ThemeEnum.DARK
          );
          document.documentElement.classList.add(newTheme);
          return { theme: newTheme };
        }),
    }),
    { name: "theme-storage" }
  )
);
