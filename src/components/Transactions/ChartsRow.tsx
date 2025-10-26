import { useMemo } from "react";
import { IncomeExpenseBarChart, DonutChart } from "@/components";
import { useTransactionStore, usePrimaryCurrencyStore } from "@/stores";
import { useExchangeRates } from "@/hooks/query";
import { convertCurrency } from "@/utils/convertCurrency";
import { chartColors } from "@/constants";

interface ChartsRowData {
  income: number;
  expenses: number;
}

export function ChartsRow({ income, expenses }: ChartsRowData) {
  const transactions = useTransactionStore((state) => state.transactions);
  const primaryCurrency = usePrimaryCurrencyStore(
    (state) => state.primaryCurrency
  );
  const { data: ratesData } = useExchangeRates("EUR");

  const convertedIncome = convertCurrency(
    income,
    primaryCurrency,
    ratesData?.rates
  );
  const convertedExpenses = convertCurrency(
    expenses,
    primaryCurrency,
    ratesData?.rates
  );

  const expenseCategoriesData = useMemo(() => {
    const expenseTransactions = transactions.filter(
      (t) => t.type === "expense"
    );

    const categoryTotals = expenseTransactions.reduce((acc, transaction) => {
      const category = transaction.categoryName;
      acc[category] = (acc[category] || 0) + transaction.amountEur;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals)
      .map(([name, value], index) => ({
        name,
        value: Math.round(
          convertCurrency(value, primaryCurrency, ratesData?.rates)
        ),
        color: chartColors[index % chartColors.length],
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions, primaryCurrency, ratesData?.rates]);

  if (expenseCategoriesData.length === 0) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <IncomeExpenseBarChart
        data={{ income: convertedIncome, expense: convertedExpenses }}
      />
      <DonutChart data={expenseCategoriesData} />
    </div>
  );
}
