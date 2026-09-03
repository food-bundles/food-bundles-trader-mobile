/**
 * Generic pill status badge, driven by a colour-map lookup. Concrete badges
 * (LoanStatusBadge, VoucherStatusBadge, etc.) wrap this with their own map —
 * never share a colour map across different status kinds.
 */
import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import type { BadgeTone } from "../../theme/badges";

interface StatusBadgeProps {
  label: string;
  /**
   * Resolved tone for this status. Optional because `Record<Enum, T>`
   * lookups report as possibly-`undefined` under `noUncheckedIndexedAccess`
   * even for exhaustive enum keys — callers pass the map lookup directly
   * and this component falls back to a neutral tone if it is ever missing
   * (e.g. a future status value added to an enum but not yet its map).
   */
  tone: BadgeTone | undefined;
}

/** Renders a single pill badge from a resolved {bg, text, border} tone. */
export function StatusBadge({ label, tone }: StatusBadgeProps) {
  const { radius, space, colors } = useTheme();
  const resolved = tone ?? { bg: colors.hairline, text: colors.label };

  return (
    <View
      style={{
        backgroundColor: resolved.bg,
        borderRadius: radius.pill,
        borderWidth: resolved.border ? 1 : 0,
        borderColor: resolved.border ?? "transparent",
        paddingVertical: space.xs,
        paddingHorizontal: space.md,
        alignSelf: "flex-start",
      }}
    >
      <Text
        style={{
          fontFamily: "IBMPlexSans_600",
          fontSize: 11,
          fontWeight: "600",
          letterSpacing: 0.4,
          textTransform: "uppercase",
          color: resolved.text,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
