/**
 * Segmented language switcher: EN | Kinyarwanda | FR. Wired live to the
 * i18n system's `useLanguage()` — selecting a segment changes the app
 * language immediately and persists the choice to AsyncStorage, unlike the
 * web source's non-functional hardcoded "ENG" stub.
 */
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { useI18n, useLanguage, type Language } from "../../i18n";
import { MIN_TAP_TARGET } from "../../theme/tokens";

const LANGUAGES: { code: Language; labelKey: "language.english" | "language.kinyarwanda" | "language.french" }[] = [
  { code: "en", labelKey: "language.english" },
  { code: "rw", labelKey: "language.kinyarwanda" },
  { code: "fr", labelKey: "language.french" },
];

/** Live segmented control that switches and persists the app language. */
export function LanguageSwitcher() {
  const { colors, radius, space } = useTheme();
  const t = useI18n();
  const { language, setLanguage } = useLanguage();

  return (
    <View style={{ flexDirection: "row", gap: space.sm }}>
      {LANGUAGES.map((opt) => {
        const selected = language === opt.code;
        return (
          <Pressable
            key={opt.code}
            onPress={() => setLanguage(opt.code)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={`${t(opt.labelKey)}${selected ? ", selected" : ""}`}
            style={{
              flex: 1,
              minHeight: MIN_TAP_TARGET,
              borderRadius: radius.pill,
              borderWidth: 1.5,
              borderColor: selected ? colors.leaf : colors.hairline,
              backgroundColor: selected ? colors.leaf : colors.paper,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: space.sm,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontFamily: "IBMPlexSans_600",
                fontSize: 12,
                fontWeight: "600",
                color: selected ? colors.paper : colors.ink,
              }}
            >
              {t(opt.labelKey)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
