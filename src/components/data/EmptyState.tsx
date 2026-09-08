/**
 * Empty-list placeholder: icon + specific message + optional action button.
 * Never render a generic "No data" — callers must pass domain-specific copy.
 */
import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";
import { Button } from "../ui/Button";

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

/** Shown in place of a list when there is no data to display. */
export function EmptyState({ icon, message, actionLabel, onAction }: EmptyStateProps) {
  const { colors, space } = useTheme();

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
      <Ionicons name={icon} size={40} color={colors.label} />
      <Text
        style={{
          fontFamily: "IBMPlexSans",
          fontSize: 14,
          color: colors.label,
          textAlign: "center",
        }}
      >
        {message}
      </Text>
      {actionLabel && onAction ? (
        <Button label={actionLabel} onPress={onAction} variant="secondary" size="sm" />
      ) : null}
    </View>
  );
}
