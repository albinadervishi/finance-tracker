import { useState, useMemo } from "react";
import type { Transaction } from "@/types";

export function useTransactionFilters(transactions: Transaction[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateRange, setDateRange] = useState<{
    start: string;
    end: string;
  } | null>(null);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (searchQuery) {
      result = result.filter((t) =>
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (typeFilter !== "all") {
      result = result.filter((t) => t.type === typeFilter);
    }

    if (categoryFilter !== "all") {
      result = result.filter((t) => t.categoryName === categoryFilter);
    }

    if (dateRange) {
      const start = new Date(dateRange.start);
      const end = new Date(dateRange.end);
      end.setHours(23, 59, 59, 999);
      result = result.filter((t) => {
        const transDate = new Date(t.date);
        return transDate >= start && transDate <= end;
      });
    }

    return result;
  }, [transactions, searchQuery, typeFilter, categoryFilter, dateRange]);

  return {
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    categoryFilter,
    setCategoryFilter,
    dateRange,
    setDateRange,
    filteredTransactions,
  };
}
