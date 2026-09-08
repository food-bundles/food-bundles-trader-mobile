/**
 * Selectable payment-method tile (MTN MoMo / Airtel Money / Bank). Logo
 * colours are the two permitted off-token brand values from the design
 * system SKILL — payment-logo use only.
 */
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";
import { MIN_TAP_TARGET } from "../../theme/tokens";

export type PaymentMethodId = "momo" | "airtel" | "bank";

const MOMO_YELLOW = "#FFCC00";
const AIRTEL_RED = "#E40000";

const METHOD_META: Record<PaymentMethodId, { label: string; icon: keyof typeof Ionicons.glyphMap; tint: string }> = {
  momo: { label: "MTN MoMo", icon: "phone-portrait-outline", tint: MOMO_YELLOW },
  airtel: { label: "Airtel Money", icon: "phone-portrait-outline", tint: AIRTEL_RED },
  bank: { label: "Bank Transfer", icon: "business-outline", tint: "" },
};

interface PaymentMethodTileProps {
  method: PaymentMethodId;
  selected: boolean;
  onPress: () => void;
}

/** A single tappable payment-method tile within a selector row. */
export function PaymentMethodTile({ method, selected, onPress }: PaymentMethodTileProps) {
  const { colors, radius, space } = useTheme();
  const meta = METHOD_META[method];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Pay with ${meta.label}`}
      accessibilityState={{ selected }}
      style={{
        flex: 1,
        minHeight: MIN_TAP_TARGET,
        borderWidth: 1.5,
        borderColor: selected ? colors.leaf : colors.hairline,
        borderRadius: radius.md,
        padding: space.md,
        alignItems: "center",
        gap: space.xs,
        backgroundColor: selected ? colors.oat : colors.paper,
      }}
    >
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: meta.tint || colors.pine,
        }}
      />
      <Ionicons name={meta.icon} size={20} color={colors.ink} />
      <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 12, fontWeight: "600", color: colors.ink }}>
        {meta.label}
      </Text>
    </Pressable>
  );
}
