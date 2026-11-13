import { createContext, useContext } from "react";
import { translations, type Lang, type TranslationKey } from "./translations";

const LangContext = createContext<Lang>("en");

export function LangProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useTranslation() {
  const lang = useContext(LangContext);
  const t = (
    key: TranslationKey,
    params?: Record<string, string | number>
  ) => {
    let text: string = translations[lang][key];
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replaceAll(`{{${k}}}`, String(v));
      });
    }
    return text;
  };
  return { t, lang };
}
