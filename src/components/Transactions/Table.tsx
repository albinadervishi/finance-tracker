import { Button, Badge } from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, ArrowUpDown } from "lucide-react";
import type { Transaction } from "@/types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface TransactionsTableProps {
  transactions: Transaction[];
  deleteTransaction: (id: string) => void;
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
  onSort: (column: "date" | "amount") => void;
}

export function TransactionsTable({
  transactions,
  deleteTransaction,
  sortBy,
  sortOrder,
  onSort,
}: TransactionsTableProps) {
  const { t } = useTranslation();

  const SortIcon = ({ column }: { column: "date" | "amount" }) => {
    const isActive = sortBy === column;

    return (
      <ArrowUpDown
        className={`h-3 w-3 transition-all ${
          isActive
            ? "text-primary opacity-100"
            : "text-muted-foreground opacity-40"
        } ${isActive && sortOrder === "desc" ? "rotate-180" : ""}`}
      />
    );
  };
  return (
    <div className="overflow-x-auto px-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 -ml-4"
                onClick={() => onSort("date")}
              >
                {t("table.date")}
                <SortIcon column="date" />
              </Button>
            </TableHead>
            <TableHead>{t("description")}</TableHead>
            <TableHead>{t("category")}</TableHead>
            <TableHead>{t("table.type")}</TableHead>
            <TableHead className="text-right">
              {t("table.originalAmount")}
            </TableHead>
            <TableHead className="text-right">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1"
                onClick={() => onSort("amount")}
              >
                {t("amount")} (EUR)
                <SortIcon column="amount" />
              </Button>
            </TableHead>
            <TableHead className="text-right">{t("table.actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                {t("noTransactions")}
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="font-medium">
                  {transaction.description}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {t(`categories.${transaction.categoryName}`, {
                      defaultValue:
                        transaction.categoryName.charAt(0).toUpperCase() +
                        transaction.categoryName.slice(1),
                    })}
                  </Badge>
                </TableCell>
                <TableCell>
                  {transaction.type === "income" ? (
                    <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-200">
                      {t("income")}
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/10 text-red-700 hover:bg-red-500/20 border-red-200">
                      {t("expense")}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {transaction.amount.toFixed(2)} {transaction.currency}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  <span
                    className={
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {transaction.type === "income" ? "+" : "-"}€
                    {transaction.amountEur.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/transaction/${transaction.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => deleteTransaction(transaction.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
