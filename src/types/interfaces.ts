import type { TransactionType } from "./enum";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  categoryId: string;
  categoryName: string;
  type: TransactionType;
  amount: number;
  currency: string;
  amountEur: number;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
  isDefault: boolean;
  createdAt?: string;
}
