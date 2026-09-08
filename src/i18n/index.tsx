/**
 * Language context and `useI18n()` hook. Persists the chosen language to
 * AsyncStorage under the key `traderLanguage`. Default language: English.
 */
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { en, type TranslationKey } from "./en";
import { rw } from "./rw";
import { fr } from "./fr";

export type Language = "en" | "rw" | "fr";

const DICTS: Record<Language, Record<TranslationKey, string>> = { en, rw, fr };
const STORAGE_KEY = "traderLanguage";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Wraps the app root; loads/persists the active language. */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored === "en" || stored === "rw" || stored === "fr") {
          setLanguageState(stored);
        }
      })
      .catch(() => {
        // No persisted preference — default (English) stands.
      });
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    AsyncStorage.setItem(STORAGE_KEY, lang).catch(() => {
      // Persistence failure is non-fatal — in-memory language still applies.
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

/** Returns the current language and a setter. */
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

/** Returns a translation function `t(key)` bound to the active language. */
export function useI18n(): (key: TranslationKey) => string {
  const { language } = useLanguage();
  return useCallback((key: TranslationKey) => DICTS[language][key], [language]);
}

export type { TranslationKey } from "./en";
