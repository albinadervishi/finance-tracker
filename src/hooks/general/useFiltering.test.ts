import { renderHook, act } from "@testing-library/react";
import { usePagination } from "./usePagination";
import { useTransactionFilters } from "./useTransactionFilters";
import { useTransactionSorting } from "./useTransactionSorting";
import type { Transaction } from "@/types";

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2025-10-26",
    description: "Salary",
    amount: 1000,
    amountEur: 1000,
    currency: "EUR",
    type: "income",
    categoryId: "salary",
    categoryName: "Salary",
  },
  {
    id: "2",
    date: "2025-10-25",
    description: "Groceries",
    amount: 50,
    amountEur: 50,
    currency: "EUR",
    type: "expense",
    categoryId: "food",
    categoryName: "Food",
  },
  {
    id: "3",
    date: "2025-10-24",
    description: "Bonus",
    amount: 500,
    amountEur: 500,
    currency: "EUR",
    type: "income",
    categoryId: "freelance",
    categoryName: "Freelance",
  },
];

describe("useTransactionFilters", () => {
  const mockItems = Array.from({ length: 25 }, (_, i) => ({ id: i }));

  it("should paginate", () => {
    const { result } = renderHook(() => usePagination(mockItems, 10));

    expect(result.current.paginatedItems).toHaveLength(10);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.currentPage).toBe(1);
  });

  it("should filter by search query", () => {
    const { result } = renderHook(() =>
      useTransactionFilters(mockTransactions)
    );

    act(() => {
      result.current.setSearchQuery("Salary");
    });

    expect(result.current.filteredTransactions).toHaveLength(1);
    expect(result.current.filteredTransactions[0].description).toBe("Salary");
  });

  it("should filter by type", () => {
    const { result } = renderHook(() =>
      useTransactionFilters(mockTransactions)
    );

    act(() => {
      result.current.setTypeFilter("income");
    });

    expect(result.current.filteredTransactions).toHaveLength(2);
    expect(
      result.current.filteredTransactions.every((t) => t.type === "income")
    ).toBe(true);
  });

  it("should filter by category", () => {
    const { result } = renderHook(() =>
      useTransactionFilters(mockTransactions)
    );

    act(() => {
      result.current.setCategoryFilter("Food");
    });

    expect(result.current.filteredTransactions).toHaveLength(1);
    expect(result.current.filteredTransactions[0].categoryName).toBe("Food");
  });

  it("should filter by date range", () => {
    const { result } = renderHook(() =>
      useTransactionFilters(mockTransactions)
    );

    act(() => {
      result.current.setDateRange({
        start: "2025-10-25",
        end: "2025-10-26",
      });
    });

    expect(result.current.filteredTransactions).toHaveLength(2);
  });

  it("should sort by date desc by default", () => {
    const { result } = renderHook(() =>
      useTransactionSorting(mockTransactions)
    );

    expect(result.current.sortedItems[0].id).toBe("1");
    expect(result.current.sortedItems[2].id).toBe("3");
  });

  it("should sort by date asc", () => {
    const { result } = renderHook(() =>
      useTransactionSorting(mockTransactions)
    );

    act(() => {
      result.current.handleSort("date");
    });

    expect(result.current.sortOrder).toBe("asc");
    expect(result.current.sortedItems[0].id).toBe("3");
    expect(result.current.sortedItems[2].id).toBe("1");
  });

  it("should sort by amount desc", () => {
    const { result } = renderHook(() =>
      useTransactionSorting(mockTransactions)
    );

    act(() => {
      result.current.handleSort("amount");
    });

    expect(result.current.sortedItems[0].amountEur).toBe(1000);
    expect(result.current.sortedItems[2].amountEur).toBe(50);
  });
});
