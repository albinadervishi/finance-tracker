import { useState, useMemo } from "react";

export function useTransactionSorting<
  T extends { date: string; amountEur: number }
>(items: T[]) {
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const comparison =
        sortBy === "date"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : a.amountEur - b.amountEur;
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [items, sortBy, sortOrder]);

  const handleSort = (column: "date" | "amount") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  return { sortBy, sortOrder, handleSort, sortedItems };
}
