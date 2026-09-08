/**
 * Error placeholder: chili icon + message + "Try again" retry button.
 */
import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";
import { useI18n } from "../../i18n";
import { Button } from "../ui/Button";

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

/** Shown in place of a list or screen when data failed to load. */
export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const { colors, space } = useTheme();
  const t = useI18n();

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: space.xxxl,
        paddingHorizontal: space.xl,
        gap: space.md,
      }}
    >
      <Ionicons name="alert-circle" size={40} color={colors.chili} />
      <Text
        style={{
          fontFamily: "IBMPlexSans",
          fontSize: 14,
          color: colors.ink,
          textAlign: "center",
        }}
      >
        {message ?? t("common.error")}
      </Text>
      <Button label={t("common.retry")} onPress={onRetry} variant="secondary" size="sm" />
    </View>
  );
}
