/**
 * Compact metric card: label, value, optional delta. Used 2-across on
 * phones, 4-across on tablets by the parent grid layout.
 */
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { MIN_TAP_TARGET } from "../../theme/tokens";
import { Card } from "../ui/Card";

export type DeltaTone = "ripe" | "chili" | "marigold";

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: DeltaTone;
  icon?: React.ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
}

/** A single statistic tile: label on top, large value, optional delta. */
export function StatCard({
  label,
  value,
  delta,
  deltaTone = "ripe",
  icon,
  onPress,
  accessibilityLabel,
}: StatCardProps) {
  const { colors, space } = useTheme();
  const deltaColor =
    deltaTone === "chili" ? colors.chili : deltaTone === "marigold" ? colors.marigold : colors.ripe;

  const content = (
    <Card>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label, flex: 1 }}>
          {label}
        </Text>
        {icon}
      </View>
      <Text
        style={{
          fontFamily: "SpaceGrotesk_700",
          fontSize: 20,
          fontWeight: "700",
          color: colors.ink,
          marginTop: space.xs,
        }}
      >
        {value}
      </Text>
      {delta ? (
        <Text
          style={{
            fontFamily: "IBMPlexSans_600",
            fontSize: 12,
            fontWeight: "600",
            color: deltaColor,
            marginTop: space.xs,
          }}
        >
          {delta}
        </Text>
      ) : null}
    </Card>
  );

  if (!onPress) return content;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      style={{ minHeight: MIN_TAP_TARGET }}
    >
      {content}
    </Pressable>
  );
}
