/**
 * Single voucher row: code, restaurant, type chip, status badge, inline
 * credit bar, expiry (chili if expired or < 2h remaining).
 */
import React from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { MIN_TAP_TARGET } from "../../theme/tokens";
import { VoucherStatusBadge, VoucherTypeChip } from "../ui/DomainBadges";
import { Card } from "../ui/Card";
import { formatDate, isWithinMs } from "../../lib/date";
import { formatRwf } from "../../lib/currency";
import type { Voucher } from "../../types/domain";

interface VoucherRowProps {
  voucher: Voucher;
  onPress: () => void;
}

const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

/** Tappable card row summarising one voucher, with an inline credit bar. */
export function VoucherRow({ voucher, onPress }: VoucherRowProps) {
  const { colors, space, radius } = useTheme();
  const mono = Platform.OS === "ios" ? "Courier New" : "monospace";
  const usedPct = voucher.creditLimit > 0 ? Math.round((voucher.usedCredit / voucher.creditLimit) * 100) : 0;
  const isExpiringSoon = voucher.status === "ACTIVE" && isWithinMs(voucher.expiryDate, TWO_HOURS_MS);
  const expiryColor = voucher.status === "EXPIRED" || isExpiringSoon ? colors.chili : colors.label;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Voucher ${voucher.voucherCode}, ${voucher.status}, ${formatRwf(voucher.remainingCredit)} remaining`}
      style={{ minHeight: MIN_TAP_TARGET, marginBottom: space.md }}
    >
      <Card>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <View>
            <Text style={{ fontFamily: mono, fontSize: 14, color: colors.leaf }}>{voucher.voucherCode}</Text>
            <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label, marginTop: 2 }}>
              {voucher.restaurantName}
            </Text>
          </View>
          <VoucherStatusBadge status={voucher.status} />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: space.sm }}>
          <VoucherTypeChip type={voucher.voucherType} />
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 11, color: expiryColor }}>
            {formatDate(voucher.expiryDate)}
          </Text>
        </View>

        <View style={{ height: 6, borderRadius: radius.pill, backgroundColor: colors.hairline, marginTop: space.sm, overflow: "hidden" }}>
          <View style={{ width: `${usedPct}%`, height: "100%", backgroundColor: colors.leaf }} />
        </View>
      </Card>
    </Pressable>
  );
}
