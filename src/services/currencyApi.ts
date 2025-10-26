export interface Currency {
  code: string;
  name: string;
}

const API_BASE = "https://open.er-api.com/v6";

export const fetchCurrencies = async (): Promise<Currency[]> => {
  const response = await fetch(`${API_BASE}/latest/USD`);

  if (!response.ok) {
    throw new Error("Failed to fetch currencies");
  }

  const data = await response.json();

  const currencyNames: Record<string, string> = {
    USD: "US Dollar",
    EUR: "Euro",
    GBP: "British Pound",
    ALL: "Albanian Lek",
    CHF: "Swiss Franc",
    JPY: "Japanese Yen",
    CAD: "Canadian Dollar",
    AUD: "Australian Dollar",
    RSD: "Serbian Dinar",
    CNY: "Chinese Yuan",
    INR: "Indian Rupee",
    BRL: "Brazilian Real",
    MXN: "Mexican Peso",
    ZAR: "South African Rand",
    SAR: "Saudi Riyal",
    AED: "United Arab Emirates Dirham",
    KRW: "South Korean Won",
  };

  return Object.keys(data.rates)
    .filter((code) => currencyNames[code])
    .map((code) => ({
      code: code.toUpperCase(),
      name: currencyNames[code],
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const fetchExchangeRates = async (base = "EUR") => {
  const response = await fetch(`${API_BASE}/latest/${base.toUpperCase()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch exchange rates");
  }

  return response.json();
};
