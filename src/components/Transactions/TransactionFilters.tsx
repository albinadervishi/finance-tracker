import { useState } from "react";
import {
  Card,
  CardContent,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Calendar,
} from "@/components/ui";
import { Search, Calendar as CalendarIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { DateRange } from "react-day-picker";

interface TransactionFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  typeFilter: string;
  onTypeFilterChange: (type: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (category: string) => void;
  categories: string[];
  dateRange: { start: string; end: string } | null;
  onDateRangeChange: (range: { start: string; end: string } | null) => void;
}

export function TransactionFilters({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  categories,
  dateRange,
  onDateRangeChange,
}: TransactionFiltersProps) {
  const { t } = useTranslation();
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();

  const handleDateSelect = (range: DateRange | undefined) => {
    setDate(range);
    if (range?.from && range?.to) {
      onDateRangeChange({
        start: range.from.toISOString().split("T")[0],
        end: range.to.toISOString().split("T")[0],
      });
    } else {
      onDateRangeChange(null);
    }
  };

  return (
    <Card className="mb-6 ">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchTransactionsByDescription")}
              className="pl-10 h-11"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <Select value={typeFilter} onValueChange={onTypeFilterChange}>
            <SelectTrigger className="w-full  h-11">
              <SelectValue placeholder={t("allTypes")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allTypes")}</SelectItem>
              <SelectItem value="income">{t("income")}</SelectItem>
              <SelectItem value="expense">{t("expense")}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
            <SelectTrigger className="w-full  h-11">
              <SelectValue placeholder={t("allCategories")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allCategories")}</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {t(`categories.${cat}`, {
                    defaultValue: cat.charAt(0).toUpperCase() + cat.slice(1),
                  })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Popover open={showCustomDate} onOpenChange={setShowCustomDate}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="h-11 gap-2 font-normal text-sm w-full justify-start overflow-hidden"
                >
                  <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">
                    {dateRange
                      ? `${dateRange.start.replace(
                          /-/g,
                          "/"
                        )} - ${dateRange.end.replace(/-/g, "/")}`
                      : t("selectDateRange")}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={handleDateSelect}
                  numberOfMonths={1}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
