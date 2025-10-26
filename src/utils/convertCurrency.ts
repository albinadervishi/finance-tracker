export const convertCurrency = (
  amountInEur: number,
  targetCurrency: string,
  rates: Record<string, number> | undefined
): number => {
  if (!rates || targetCurrency === "EUR") return amountInEur;

  const rate = rates[targetCurrency.toUpperCase()];
  if (!rate) return amountInEur;

  return amountInEur * rate;
};

export function convertToEur(
  amount: number,
  currency: string,
  rates?: Record<string, number>
): number {
  if (currency === "EUR") return amount;
  if (!rates || !rates[currency]) return amount;

  return amount / rates[currency];
}
