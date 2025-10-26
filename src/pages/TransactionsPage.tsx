import { useMemo } from "react";
import { Button, Card, CardHeader, CardTitle } from "@/components/ui";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Text,
  HeaderCards,
  TransactionFilters,
  Pagination,
  TransactionsTable,
  ChartsRow,
  TransactionsPageSkeleton,
} from "@/components";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useTransactionStore, usePrimaryCurrencyStore } from "@/stores";
import { useTranslation } from "react-i18next";
import {
  useCurrencies,
  useTransactionFilters,
  useTransactionSorting,
  usePagination,
} from "@/hooks";

export function TransactionsPage() {
  const { t } = useTranslation();

  const transactions = useTransactionStore((state) => state.transactions);
  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction
  );
  const totalIncome = useTransactionStore((state) => state.getTotalIncome());
  const totalExpenses = useTransactionStore((state) =>
    state.getTotalExpenses()
  );
  const balance = useTransactionStore((state) => state.getBalance());
  const isLoading = useTransactionStore((state) => state.isLoading);

  const primaryCurrency = usePrimaryCurrencyStore(
    (state) => state.primaryCurrency
  );
  const setPrimaryCurrency = usePrimaryCurrencyStore(
    (state) => state.setPrimaryCurrency
  );
  const { data: currencies, isLoading: isCurrenciesLoading } = useCurrencies();

  const {
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    categoryFilter,
    setCategoryFilter,
    dateRange,
    setDateRange,
    filteredTransactions,
  } = useTransactionFilters(transactions);

  const { sortBy, sortOrder, handleSort, sortedItems } =
    useTransactionSorting(filteredTransactions);

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems,
    itemsPerPage,
    resetPage,
  } = usePagination(sortedItems);

  const categories = useMemo(() => {
    const unique = [...new Set(transactions.map((t) => t.categoryName))];
    return unique.sort();
  }, [transactions]);

  const handleFilterChange = (filterType: string, value: string) => {
    resetPage();
    if (filterType === "type") setTypeFilter(value);
    if (filterType === "category") setCategoryFilter(value);
  };

  if (isLoading || isCurrenciesLoading) {
    return <TransactionsPageSkeleton />;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center gap-2">
          <Text size="4xl" weight="bold" color="foreground" className="mb-2">
            {t("transactions")}
          </Text>
          <Select value={primaryCurrency} onValueChange={setPrimaryCurrency}>
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies?.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.code.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Link to="/transaction/new">
          <Button size="lg" className="gap-2 mt-4 md:mt-0">
            <Plus className="h-5 w-5" />
            {t("addTransaction")}
          </Button>
        </Link>
      </div>

      <HeaderCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        balance={balance}
      />

      <ChartsRow income={totalIncome} expenses={totalExpenses} />

      <TransactionFilters
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        typeFilter={typeFilter}
        onTypeFilterChange={(v) => handleFilterChange("type", v)}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={(v) => handleFilterChange("category", v)}
        categories={categories}
        dateRange={dateRange}
        onDateRangeChange={(v) => {
          setDateRange(v);
          setCurrentPage(1);
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle>
            {t("recentTransactions")} ({sortedItems.length})
          </CardTitle>
        </CardHeader>
        <TransactionsTable
          transactions={paginatedItems}
          deleteTransaction={deleteTransaction}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={sortedItems.length}
          onPageChange={setCurrentPage}
        />
      </Card>
    </main>
  );
}
