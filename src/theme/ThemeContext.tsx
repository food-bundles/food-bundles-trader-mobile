/**
 * Theme provider: resolves light/dark colour tokens from the OS colour
 * scheme and exposes them, plus static tokens, via `useTheme()`.
 */
import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";
import { COLORS, COLORS_DARK, ColorToken } from "./tokens";
import { SPACE, RADIUS, SHADOW, DURATION, TYPE_SCALE, FONTS } from "./tokens";

export interface ThemeValue {
  colors: Record<ColorToken, string>;
  isDark: boolean;
  space: typeof SPACE;
  radius: typeof RADIUS;
  shadow: typeof SHADOW;
  duration: typeof DURATION;
  type: typeof TYPE_SCALE;
  fonts: typeof FONTS;
}

const ThemeContext = createContext<ThemeValue | null>(null);

/** Wraps the app root; provides resolved theme tokens to all descendants. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const value = useMemo<ThemeValue>(
    () => ({
      colors: isDark ? COLORS_DARK : COLORS,
      isDark,
      space: SPACE,
      radius: RADIUS,
      shadow: SHADOW,
      duration: DURATION,
      type: TYPE_SCALE,
      fonts: FONTS,
    }),
    [isDark]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Access resolved theme tokens. Must be used within a ThemeProvider. */
export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
