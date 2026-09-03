/**
 * Single wallet transaction row: type icon, description, amount (ripe for
 * credit, label-grey for debit), relative date.
 */
import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";
import { formatRwf } from "../../lib/currency";
import { formatRelative } from "../../lib/date";
import type { TraderTransaction, TransactionType } from "../../types/domain";

const TYPE_ICON: Record<TransactionType, keyof typeof Ionicons.glyphMap> = {
  TOP_UP: "add-circle-outline",
  COMMISSION_CREDIT: "trending-up-outline",
  VOUCHER_UTILIZATION: "ticket-outline",
  WITHDRAWAL: "arrow-down-circle-outline",
};

/** A single transaction row for the dashboard's recent-activity list. */
export function TransactionRow({ transaction }: { transaction: TraderTransaction }) {
  const { colors, space } = useTheme();
  const isCredit = transaction.amount >= 0;

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: space.md, paddingVertical: space.sm }}>
      <Ionicons name={TYPE_ICON[transaction.type]} size={20} color={isCredit ? colors.ripe : colors.label} />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.ink }}>
          {transaction.description}
        </Text>
        <Text style={{ fontFamily: "IBMPlexSans", fontSize: 11, color: colors.label, marginTop: 2 }}>
          {formatRelative(transaction.createdAt)}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: "SpaceGrotesk_700",
          fontSize: 14,
          fontWeight: "700",
          color: isCredit ? colors.ripe : colors.ink,
        }}
      >
        {isCredit ? "+" : ""}
        {formatRwf(transaction.amount)}
      </Text>
    </View>
  );
}
