/**
 * Single order row for the Orders list screen.
 */
import React from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { MIN_TAP_TARGET } from "../../theme/tokens";
import { OrderStatusBadge } from "../ui/DomainBadges";
import { Card } from "../ui/Card";
import { formatRwf } from "../../lib/currency";
import { formatRelative } from "../../lib/date";
import type { TraderOrder } from "../../types/domain-extra";

interface OrderRowProps {
  order: TraderOrder;
  onPress: () => void;
}

/** Tappable card row summarising one order. */
export function OrderRow({ order, onPress }: OrderRowProps) {
  const { colors, space } = useTheme();
  const mono = Platform.OS === "ios" ? "Courier New" : "monospace";

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Order ${order.orderNumber}, ${order.restaurantName}, ${order.status}`}
      style={{ minHeight: MIN_TAP_TARGET, marginBottom: space.md }}
    >
      <Card>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <View>
            <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 14, fontWeight: "700", color: colors.leaf }}>
              {order.orderNumber}
            </Text>
            <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label, marginTop: 2 }}>
              {order.restaurantName}
            </Text>
          </View>
          <OrderStatusBadge status={order.status} />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: space.sm }}>
          <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 15, fontWeight: "700", color: colors.ink }}>
            {formatRwf(order.totalAmount)}
          </Text>
          <Text style={{ fontFamily: mono, fontSize: 11, color: colors.label }}>{order.voucherCode}</Text>
        </View>
        <Text style={{ fontFamily: "IBMPlexSans", fontSize: 11, color: colors.label, marginTop: space.xs }}>
          {formatRelative(order.createdAt)}
        </Text>
      </Card>
    </Pressable>
  );
}
