/**
 * Single order line-item row: 48x48 product photo, name, qty x unit,
 * unit price, subtotal.
 */
import React from "react";
import { Image, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { formatRwf } from "../../lib/currency";
import type { OrderItem } from "../../types/domain-extra";

/** A single order item row with product photo and line totals. */
export function OrderItemRow({ item }: { item: OrderItem }) {
  const { colors, space, radius } = useTheme();

  return (
    <View style={{ flexDirection: "row", gap: space.md, alignItems: "center", paddingVertical: space.sm }}>
      <Image
        source={{ uri: item.imageUri }}
        accessibilityLabel={item.productName}
        style={{ width: 48, height: 48, borderRadius: radius.sm, backgroundColor: colors.hairline }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 13, fontWeight: "600", color: colors.ink }}>
          {item.productName}
        </Text>
        <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label }}>
          {item.quantity} {item.unit} × {formatRwf(item.unitPrice)}
        </Text>
      </View>
      <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 13, fontWeight: "700", color: colors.ink }}>
        {formatRwf(item.subtotal)}
      </Text>
    </View>
  );
}
