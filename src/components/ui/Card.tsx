/**
 * Surface container: paper background, radius.md, card shadow.
 * `elevated` swaps in the stronger elevated shadow for sheets/popovers.
 */
import React from "react";
import { View, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";

interface CardProps {
  children: React.ReactNode;
  elevated?: boolean;
  style?: ViewStyle;
}

/** A themed card surface used throughout list rows and detail sections. */
export function Card({ children, elevated = false, style }: CardProps) {
  const { colors, radius, shadow, space } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.paper,
          borderRadius: radius.md,
          padding: space.lg,
        },
        elevated ? shadow.elevated : shadow.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}
