import { Pie, PieChart, Cell } from "recharts";
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
import { donutChartConfig } from "@/constants";
import { Text } from "@/components/Text";

interface DonutChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export function DonutChart({ data }: DonutChartProps) {
  const { t } = useTranslation();

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{t("myExpenses")}</CardTitle>
        <CardDescription>{t("thisMonth")}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-[250px] text-muted-foreground">
            <Text size="sm">{t("noExpensesThisMonth")}</Text>
          </div>
        ) : (
          <ChartContainer
            config={donutChartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value: unknown, name: unknown) => [
                      t(`categories.${name}` as string, {
                        defaultValue:
                          (name as string).charAt(0).toUpperCase() +
                          (name as string).slice(1),
                      }),
                      " ",
                      (value as number).toFixed(2),
                    ]}
                    className="w-fit min-w-0 px-2 py-1"
                  />
                }
              />
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={60}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
