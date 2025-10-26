import { useQuery } from "@tanstack/react-query";
import { fetchCurrencies } from "@/services/currencyApi";

export const useCurrencies = () => {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
