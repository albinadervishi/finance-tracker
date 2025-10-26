export const TransactionTypeEnum = {
  INCOME: "income",
  EXPENSE: "expense",
} as const;

export const ThemeEnum = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type TransactionType =
  (typeof TransactionTypeEnum)[keyof typeof TransactionTypeEnum];
export type Theme = (typeof ThemeEnum)[keyof typeof ThemeEnum];
