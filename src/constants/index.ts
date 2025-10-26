import type { Category } from "@/types";
import type { ChartConfig } from "@/components/ui/chart";

export const defaultCategories: Category[] = [
  {
    id: "salary",
    name: "salary",
    isDefault: true,
  },
  {
    id: "freelance",
    name: "freelance",
    isDefault: true,
  },
  {
    id: "food",
    name: "food",
    isDefault: true,
  },
  {
    id: "rent",
    name: "rent",
    isDefault: true,
  },
  {
    id: "utilities",
    name: "utilities",
    isDefault: true,
  },
  {
    id: "transport",
    name: "transport",
    isDefault: true,
  },
  {
    id: "entertainment",
    name: "entertainment",
    isDefault: true,
  },
  {
    id: "shopping",
    name: "shopping",
    isDefault: true,
  },
];

// export const chartColors = [
//   "#dc2626",
//   "#059669",
//   "#2563eb",
//   "#7c2d12",
//   "#7c3aed",
//   "#0891b2",
// ];

export const chartColors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

export const barChartConfig = {
  income: {
    label: "Income",
    color: "#16a34a",
  },
  expense: {
    label: "Expenses",
    color: "#dc2626",
  },
} satisfies ChartConfig;

export const donutChartConfig = {
  value: {
    label: "Amount",
  },
} satisfies ChartConfig;
