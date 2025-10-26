import { useTransactionStore } from "./useTransactionsStore";

describe("useTransactionStore", () => {
  beforeEach(() => {
    useTransactionStore.setState({ transactions: [] });
  });

  it("should add a transaction", () => {
    const store = useTransactionStore.getState();
    store.addTransaction({
      date: "2025-10-26",
      description: "Test",
      amount: 100,
      amountEur: 100,
      currency: "EUR",
      type: "income",
      categoryId: "salary",
      categoryName: "Salary",
    });

    const transactions = useTransactionStore.getState().transactions;
    expect(transactions).toHaveLength(1);
    expect(transactions[0].description).toBe("Test");
    expect(transactions[0].id).toBeDefined();
  });

  it("should delete a transaction", () => {
    const store = useTransactionStore.getState();
    store.addTransaction({
      date: "2025-10-26",
      description: "Test",
      amount: 100,
      amountEur: 100,
      currency: "EUR",
      type: "income",
      categoryId: "salary",
      categoryName: "Salary",
    });

    const id = useTransactionStore.getState().transactions[0].id;
    store.deleteTransaction(id);

    expect(useTransactionStore.getState().transactions).toHaveLength(0);
  });

  it("should update a transaction", () => {
    const store = useTransactionStore.getState();
    store.addTransaction({
      date: "2025-10-26",
      description: "Test",
      amount: 100,
      amountEur: 100,
      currency: "EUR",
      type: "income",
      categoryId: "salary",
      categoryName: "Salary",
    });

    const id = useTransactionStore.getState().transactions[0].id;
    store.updateTransaction(id, { description: "Updated" });

    const updated = useTransactionStore.getState().transactions[0];
    expect(updated.description).toBe("Updated");
  });

  it("should calculate total income", () => {
    const store = useTransactionStore.getState();
    store.addTransaction({
      date: "2025-10-26",
      description: "Salary",
      amount: 1000,
      amountEur: 1000,
      currency: "EUR",
      type: "income",
      categoryId: "salary",
      categoryName: "Salary",
    });
    store.addTransaction({
      date: "2025-10-26",
      description: "Freelance",
      amount: 500,
      amountEur: 500,
      currency: "EUR",
      type: "income",
      categoryId: "freelance",
      categoryName: "Freelance",
    });

    expect(store.getTotalIncome()).toBe(1500);
  });

  it("should calculate total expenses", () => {
    const store = useTransactionStore.getState();
    store.addTransaction({
      date: "2025-10-26",
      description: "Groceries",
      amount: 100,
      amountEur: 100,
      currency: "EUR",
      type: "expense",
      categoryId: "food",
      categoryName: "Food",
    });
    store.addTransaction({
      date: "2025-10-26",
      description: "Rent",
      amount: 800,
      amountEur: 800,
      currency: "EUR",
      type: "expense",
      categoryId: "rent",
      categoryName: "Rent",
    });

    expect(store.getTotalExpenses()).toBe(900);
  });

  it("should calculate balance", () => {
    const store = useTransactionStore.getState();
    store.addTransaction({
      date: "2025-10-26",
      description: "Salary",
      amount: 2000,
      amountEur: 2000,
      currency: "EUR",
      type: "income",
      categoryId: "salary",
      categoryName: "Salary",
    });
    store.addTransaction({
      date: "2025-10-26",
      description: "Rent",
      amount: 800,
      amountEur: 800,
      currency: "EUR",
      type: "expense",
      categoryId: "rent",
      categoryName: "Rent",
    });

    expect(store.getBalance()).toBe(1200);
  });
});
