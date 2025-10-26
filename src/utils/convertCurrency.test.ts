import { convertCurrency, convertToEur } from "./convertCurrency";

describe("convertCurrency", () => {
  it("returns same amount when target is EUR", () => {
    const result = convertCurrency(100, "EUR", { USD: 1.1 });
    expect(result).toBe(100);
  });

  it("converts from EUR to target currency", () => {
    const result = convertCurrency(100, "USD", { USD: 1.1 });
    expect(result).toBeCloseTo(110, 2);
  });

  it("returns original amount when rates are undefined", () => {
    const result = convertCurrency(100, "USD", undefined);
    expect(result).toBe(100);
  });

  it("returns original amount when rate not found", () => {
    const result = convertCurrency(100, "XYZ", { USD: 1.1 });
    expect(result).toBe(100);
  });

  it("handles uppercase currency codes", () => {
    const result = convertCurrency(100, "usd", { USD: 1.1 });
    expect(result).toBeCloseTo(110, 2);
  });
});

describe("convertToEur", () => {
  it("returns same amount when currency is EUR", () => {
    const result = convertToEur(100, "EUR", { USD: 1.1 });
    expect(result).toBe(100);
  });

  it("converts from target currency to EUR", () => {
    const result = convertToEur(110, "USD", { USD: 1.1 });
    expect(result).toBeCloseTo(100, 2);
  });

  it("returns original amount when rates are undefined", () => {
    const result = convertToEur(100, "USD", undefined);
    expect(result).toBe(100);
  });

  it("returns original amount when rate not found", () => {
    const result = convertToEur(100, "XYZ", { USD: 1.1 });
    expect(result).toBe(100);
  });
});
