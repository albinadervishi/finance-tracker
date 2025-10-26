import { Link } from "react-router-dom";
import {
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { Globe, Moon, Sun } from "lucide-react";
import { Text } from "./Text";
import { useThemeStore } from "@/stores/useThemeStore";
import { ThemeEnum } from "@/types";
import { useTranslation } from "react-i18next";
import EasyPay from "@/assets/easyPay.png";

export function Navigation() {
  const { theme, toggleTheme } = useThemeStore();
  const { t, i18n } = useTranslation();
  console.log(i18n.language);
  console.log(localStorage.getItem("i18nextLng"));

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={EasyPay}
                alt="EasyPay"
                className="h-10 w-10 object-fill"
              />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Select
              value={i18n.language || "en"}
              onValueChange={(lng) => i18n.changeLanguage(lng)}
            >
              <SelectTrigger className="w-32 h-9  bg-transparent">
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
              className="theme-toggle-btn h-11 w-11"
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
