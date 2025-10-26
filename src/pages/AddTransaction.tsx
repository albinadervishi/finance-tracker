import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from "@/components";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Card,
  CardContent,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import {
  ArrowLeft,
  Save,
  TrendingUp,
  TrendingDown,
  Plus,
  X,
} from "lucide-react";
import { defaultCategories } from "@/constants";
import { transactionSchema, type TransactionFormData } from "@/types";
import { useTranslation } from "react-i18next";
import { useTransactionStore, useCategoryStore } from "@/stores";
import { useCurrencies, useExchangeRates } from "@/hooks/query";
import { convertToEur } from "@/utils/convertCurrency";
import { toast } from "sonner";

export function AddTransactionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const {
    addTransaction,
    updateTransaction,
    getTransactionById,
    isSubmitting,
  } = useTransactionStore();
  const { data: currencies, isLoading, error } = useCurrencies();
  const { data: exchangeData, error: exchangeError } = useExchangeRates("EUR");
  const {
    addCategory: saveCategory,
    getAllCategories,
    getCategoryById,
  } = useCategoryStore();

  const allCategories = getAllCategories(defaultCategories);

  const isEditMode = !!id;
  const existingTransaction = isEditMode ? getTransactionById(id) : null;

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: existingTransaction?.description || "",
      amount: existingTransaction?.amount || 0,
      currency: existingTransaction?.currency || "",
      type: existingTransaction?.type || "income",
      categoryId: existingTransaction?.categoryId || "",
      notes: existingTransaction?.notes || "",
    },
  });

  const transactionType = form.watch("type");

  const onSubmit = (data: TransactionFormData) => {
    try {
      let finalCategoryId = data.categoryId;

      if (showNewCategory && newCategory.trim()) {
        const newCat = saveCategory(newCategory.trim());
        finalCategoryId = newCat.id;
      }

      const category = getCategoryById(finalCategoryId, defaultCategories);

      if (!category) {
        toast.error(t("categoryNotFound"));
        return;
      }
      if (exchangeError && data.currency.toLowerCase() !== "eur") {
        toast.error(t("errorLoadingCurrencies"));
        return;
      }

      const currencyCode = data.currency;
      const amountEur = convertToEur(
        data.amount,
        currencyCode,
        exchangeData?.rates
      );

      const transactionData = {
        ...data,
        categoryId: finalCategoryId,
        categoryName: category.name,
        amountEur: amountEur,
      };

      if (isEditMode && id) {
        updateTransaction(id, transactionData);
      } else {
        addTransaction({
          ...transactionData,
          date: new Date().toISOString(),
        });
      }
      toast.success(
        isEditMode ? t("transactionUpdated") : t("transactionAdded")
      );
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(t("somethingWentWrong"));
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" className="gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            {t("backToTransactions")}
          </Button>
        </Link>
        <Text size="4xl" weight="bold" color="foreground" className="mb-2">
          {isEditMode ? t("editTransaction") : t("addTransaction")}
        </Text>
      </div>

      <Card className="shadow-lg pt-0">
        <div className="flex border-b border-border">
          <Button
            type="button"
            variant="ghost"
            onClick={() => form.setValue("type", "income")}
            className={`flex-1 rounded-none py-6 gap-2 ${
              transactionType === "income"
                ? "bg-primary text-primary-foreground border-b-2 border-primary rounded-tl-lg"
                : "text-muted-foreground"
            }`}
          >
            <TrendingUp className="h-5 w-5" />
            {t("income")}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => form.setValue("type", "expense")}
            className={`flex-1 rounded-none py-6 gap-2 ${
              transactionType === "expense"
                ? "bg-primary text-primary-foreground border-b-2 border-primary rounded-tr-lg"
                : "text-muted-foreground"
            }`}
          >
            <TrendingDown className="h-5 w-5" />
            {t("expense")}
          </Button>
        </div>
        <CardContent className="space-y-6 pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("description")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("descriptionPlaceholder")}
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("amount")}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="h-11"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("currency")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isLoading || !!error}
                        key={`currency-${existingTransaction?.id || "new"}`}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue
                              placeholder={
                                isLoading
                                  ? t("loading")
                                  : error
                                  ? t("errorLoadingCurrencies")
                                  : t("selectCurrency")
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currencies?.map((currency) => (
                            <SelectItem
                              key={currency.code}
                              value={currency.code}
                            >
                              {currency.code.toUpperCase()} - {currency.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("category")}</FormLabel>
                    {!showNewCategory ? (
                      <div className="flex gap-2">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          key={`category-${existingTransaction?.id || "new"}`}
                        >
                          <FormControl>
                            <SelectTrigger className="flex-1 h-11">
                              <SelectValue placeholder={t("selectCategory")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {allCategories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {t(`categories.${cat.name}`, {
                                  defaultValue:
                                    cat.name.charAt(0).toUpperCase() +
                                    cat.name.slice(1),
                                })}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-11 w-11"
                          onClick={() => setShowNewCategory(true)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          value={newCategory}
                          onChange={(e) => {
                            setNewCategory(e.target.value);
                          }}
                          placeholder={t("newCategoryPlaceholder")}
                          className="flex-1 h-11"
                          autoFocus
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-11 w-11"
                          onClick={() => {
                            setShowNewCategory(false);
                            setNewCategory("");
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("notes")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("notesPlaceholder")}
                        className="min-h-24 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 h-11 gap-2"
                  disabled={isSubmitting}
                >
                  <Save className="h-4 w-4" />
                  {isSubmitting
                    ? t("saving")
                    : isEditMode
                    ? t("updateTransaction")
                    : t("saveTransaction")}
                </Button>
                <Link to="/" className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11"
                  >
                    {t("cancel")}
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
