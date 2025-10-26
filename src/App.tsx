import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddTransactionPage } from "./pages/AddTransaction";
import { TransactionsPage } from "./pages/TransactionsPage";
import { Layout } from "@/components/Layout";
import { useThemeStore } from "@/stores";
import "./globals.css";

function App() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<TransactionsPage />} />
          <Route path="/transaction/new" element={<AddTransactionPage />} />
          <Route
            path="/transaction/:id/edit"
            element={<AddTransactionPage />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
