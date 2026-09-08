/**
 * Primary interactive button. Variants: primary/secondary/destructive/ghost.
 * Sizes: sm(36)/md(44)/lg(52). Always pill-shaped, min 44x44 tap area.
 */
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../../theme/ThemeContext";
import { MIN_TAP_TARGET } from "../../theme/tokens";

export type ButtonVariant = "primary" | "secondary" | "destructive" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  fullWidth?: boolean;
}

const HEIGHTS: Record<ButtonSize, number> = { sm: 36, md: 44, lg: 52 };

/** A pill-shaped, animated-press button following the app's design system. */
export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  fullWidth = false,
}: ButtonProps) {
  const { colors, radius, duration } = useTheme();
  const pressed = useSharedValue(0);
  const isDisabled = disabled || loading;

  const animStyle = useAnimatedStyle(() => ({
    opacity: withTiming(pressed.value ? 0.82 : 1, { duration: duration.micro }),
    transform: [{ scale: withTiming(pressed.value ? 0.97 : 1, { duration: duration.micro }) }],
  }));

  const bg =
    variant === "primary"
      ? colors.marigold
      : variant === "destructive"
        ? colors.chili
        : variant === "secondary"
          ? colors.paper
          : "transparent";
  const textColor =
    variant === "primary"
      ? colors.ink
      : variant === "destructive"
        ? colors.paper
        : colors.leaf;
  const borderColor = variant === "secondary" ? colors.leaf : "transparent";
  const height = Math.max(HEIGHTS[size], MIN_TAP_TARGET);

  return (
    <Animated.View style={[animStyle, fullWidth && { width: "100%" }]}>
      <Pressable
        onPress={isDisabled ? undefined : onPress}
        onPressIn={() => (pressed.value = 1)}
        onPressOut={() => (pressed.value = 0)}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: isDisabled }}
        style={{
          height,
          minWidth: MIN_TAP_TARGET,
          borderRadius: radius.pill,
          backgroundColor: bg,
          borderWidth: variant === "secondary" ? 1.5 : 0,
          borderColor,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          paddingHorizontal: 20,
          opacity: isDisabled && !loading ? 0.5 : 1,
        }}
      >
        {loading ? (
          <ActivityIndicator color={textColor} />
        ) : (
          <View>
            <Text
              style={{
                fontFamily: "IBMPlexSans_600",
                fontSize: size === "sm" ? 13 : 14,
                fontWeight: "600",
                color: textColor,
              }}
              numberOfLines={1}
            >
              {label}
            </Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}
