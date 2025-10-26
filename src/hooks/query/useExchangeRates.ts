import { useQuery } from "@tanstack/react-query";
import { fetchExchangeRates } from "@/services/currencyApi";

export const useExchangeRates = (baseCurrency = "EUR") => {
  return useQuery({
    queryKey: ["exchangeRates", baseCurrency],
    queryFn: () => fetchExchangeRates(baseCurrency),
    staleTime: 1000 * 60 * 60,
    enabled: !!baseCurrency,
  });
};
