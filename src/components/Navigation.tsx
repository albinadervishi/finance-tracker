import { Link } from "react-router-dom";
import {
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { Wallet, Globe, Moon, Sun } from "lucide-react";
import { Text } from "./Text";
import { useThemeStore } from "@/stores/useThemeStore";
import { ThemeEnum } from "@/types";
import { useTranslation } from "react-i18next";

export function Navigation() {
  const { theme, toggleTheme } = useThemeStore();
  const { t, i18n } = useTranslation();

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Wallet className="h-6 w-6 text-primary-foreground" />
              </div>
              <Text size="lg" weight="bold" color="foreground">
                FinanceTracker
              </Text>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Select
              value={i18n.language || "en"}
              onValueChange={(lng) => i18n.changeLanguage(lng)}
            >
              <SelectTrigger className="w-32 h-9 gap-2 bg-transparent">
                <Globe className="h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t("english")}</SelectItem>
                <SelectItem value="al">{t("albanian")}</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="theme-toggle-btn h-9 w-9"
            >
              {theme === ThemeEnum.LIGHT ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
