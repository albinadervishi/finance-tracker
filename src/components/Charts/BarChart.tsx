import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslation } from "react-i18next";
import { barChartConfig } from "@/constants";

interface IncomeExpenseBarChartProps {
  data: {
    income: number;
    expense: number;
  };
}

export function IncomeExpenseBarChart({ data }: IncomeExpenseBarChartProps) {
  const { t } = useTranslation();

  const chartData = [
    { type: "income", amount: data.income },
    { type: "expense", amount: data.expense },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("incomeVsExpenses")}</CardTitle>
        <CardDescription>{t("thisMonth")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={barChartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="type"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => t(value)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value: unknown) => [(value as number).toFixed(2)]}
                  className="w-fit min-w-0 px-2 py-1"
                />
              }
            />
            <Bar
              dataKey="amount"
              radius={8}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    barChartConfig[entry.type as keyof typeof barChartConfig]
                      ?.color
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
