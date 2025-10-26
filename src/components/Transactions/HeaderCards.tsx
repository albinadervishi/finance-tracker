import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  AnimatedNumber,
} from "@/components/ui";
import { Text } from "@/components";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePrimaryCurrencyStore } from "@/stores";
import { useExchangeRates } from "@/hooks";
import { convertCurrency } from "@/utils/convertCurrency";

interface HeaderCardsProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export function HeaderCards({
  totalIncome,
  totalExpenses,
  balance,
}: HeaderCardsProps) {
  const { t } = useTranslation();

  const primaryCurrency = usePrimaryCurrencyStore(
    (state) => state.primaryCurrency
  );
  const { data: ratesData } = useExchangeRates("EUR");

  const convertedIncome = convertCurrency(
    totalIncome,
    primaryCurrency,
    ratesData?.rates
  );
  const convertedExpenses = convertCurrency(
    totalExpenses,
    primaryCurrency,
    ratesData?.rates
  );
  const convertedBalance = convertCurrency(
    balance,
    primaryCurrency,
    ratesData?.rates
  );

  const secondaryCurrency = primaryCurrency === "EUR" ? "ALL" : "EUR";
  const secondaryBalance =
    primaryCurrency === "EUR"
      ? convertCurrency(balance, "ALL", ratesData?.rates)
      : balance;

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {t("totalIncome")}
          </CardTitle>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
        </CardHeader>
        <CardContent className="flex gap-2 items-baseline">
          <Text size="3xl" weight="bold" color="foreground">
            {convertedIncome.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
          <Text size="xs" weight="normal" color="foreground">
            {primaryCurrency.toUpperCase()}
          </Text>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {t("totalExpenses")}
          </CardTitle>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
            <TrendingDown className="h-5 w-5 text-red-600" />
          </div>
        </CardHeader>
        <CardContent className="flex gap-2 items-baseline">
          <Text as="div" size="3xl" weight="bold" color="foreground">
            {convertedExpenses.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
          <Text size="xs" weight="normal" color="foreground">
            {primaryCurrency.toUpperCase()}
          </Text>
        </CardContent>
      </Card>

      <Card className=" bg-primary">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-primary-foreground/80">
            {t("currentBalance")}
          </CardTitle>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 items-baseline">
            <Text as="div" size="3xl" weight="bold" color="primary-foreground">
              {convertedBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
            <Text size="xs" weight="normal" color="primary-foreground">
              {primaryCurrency.toUpperCase()}
            </Text>
          </div>
          <div className="flex gap-2 items-baseline mt-2">
            <Text
              size="sm"
              weight="normal"
              color="primary-foreground"
              className="opacity-70"
            >
              <AnimatedNumber value={secondaryBalance} />
            </Text>
            <Text
              size="xs"
              weight="normal"
              color="primary-foreground"
              className="opacity-70"
            >
              {secondaryCurrency}
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
