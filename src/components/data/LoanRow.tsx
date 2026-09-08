/**
 * Single loan application row for the Loans list screen.
 */
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { MIN_TAP_TARGET } from "../../theme/tokens";
import { LoanStatusBadge } from "../ui/DomainBadges";
import { Card } from "../ui/Card";
import { formatRwf } from "../../lib/currency";
import { formatRelative } from "../../lib/date";
import type { LoanApplication } from "../../types/domain";

interface LoanRowProps {
  loan: LoanApplication;
  onPress: () => void;
}

/** Tappable card row summarising one loan application. */
export function LoanRow({ loan, onPress }: LoanRowProps) {
  const { colors, space } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Loan for ${loan.restaurantName}, ${formatRwf(loan.requestedAmount)}, ${loan.status}`}
      style={{ minHeight: MIN_TAP_TARGET, marginBottom: space.md }}
    >
      <Card>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 15, fontWeight: "700", color: colors.ink }}>
            {loan.restaurantName}
          </Text>
          <LoanStatusBadge status={loan.status} />
        </View>
        <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 17, fontWeight: "700", color: colors.leaf, marginTop: space.xs }}>
          {formatRwf(loan.requestedAmount)}
        </Text>
        <Text numberOfLines={1} style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label, marginTop: space.xs }}>
          {loan.purpose}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: space.sm }}>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 11, color: colors.label }}>
            {formatRelative(loan.createdAt)}
          </Text>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 11, color: colors.label }}>
            {loan.repaymentDays}d repayment
          </Text>
        </View>
      </Card>
    </Pressable>
  );
}
