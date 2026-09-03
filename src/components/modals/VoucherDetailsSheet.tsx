/**
 * Voucher detail bottom sheet (85% height). Mirrors the web app's
 * `voucher-details-dialog.tsx`: code, type+status, credit bar, key
 * figures, repayment info, recent transactions, "view linked loan" link.
 */
import React, { useEffect } from "react";
import { Platform, Text, View } from "react-native";
import { router } from "expo-router";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "../../theme/ThemeContext";
import { useI18n } from "../../i18n";
import { BottomSheet } from "../ui/BottomSheet";
import { Button } from "../ui/Button";
import { VoucherStatusBadge, VoucherTypeChip } from "../ui/DomainBadges";
import { formatRwf } from "../../lib/currency";
import { formatDate } from "../../lib/date";
import type { Voucher } from "../../types/domain";

interface VoucherDetailsSheetProps {
  visible: boolean;
  onClose: () => void;
  voucher: Voucher;
}

/** Animated credit-usage bar: fills from 0 to actual value over 800ms. */
function CreditBar({ pct }: { pct: number }) {
  const { colors, radius } = useTheme();
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(pct, { duration: 800 });
  }, [pct, width]);

  const animStyle = useAnimatedStyle(() => ({ width: `${width.value}%` }));

  return (
    <View style={{ height: 8, borderRadius: radius.pill, backgroundColor: colors.hairline, overflow: "hidden" }}>
      <Animated.View style={[animStyle, { height: "100%", backgroundColor: colors.leaf }]} />
    </View>
  );
}

/** Bottom sheet showing full voucher details, transactions, and repayment info. */
export function VoucherDetailsSheet({ visible, onClose, voucher }: VoucherDetailsSheetProps) {
  const { colors, space, radius } = useTheme();
  const t = useI18n();
  const mono = Platform.OS === "ios" ? "Courier New" : "monospace";
  const usedPct = voucher.creditLimit > 0 ? Math.round((voucher.usedCredit / voucher.creditLimit) * 100) : 0;

  function handleViewLoan(): void {
    onClose();
    router.push(`/(trader)/loans/${voucher.loanId}` as never);
  }

  return (
    <BottomSheet visible={visible} onClose={onClose} title={t("vouchers.detail")}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontFamily: mono, fontSize: 18, color: colors.leaf }}>{voucher.voucherCode}</Text>
        <VoucherStatusBadge status={voucher.status} />
      </View>
      <VoucherTypeChip type={voucher.voucherType} />

      <View style={{ gap: space.xs }}>
        <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 24, fontWeight: "700", color: colors.ink }}>
          {formatRwf(voucher.creditLimit)}
        </Text>
        <CreditBar pct={usedPct} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label }}>
            {t("vouchers.usedCredit")}: {formatRwf(voucher.usedCredit)}
          </Text>
          <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label }}>
            {t("vouchers.remainingCredit")}: {formatRwf(voucher.remainingCredit)}
          </Text>
        </View>
      </View>

      <View style={{ backgroundColor: colors.oat, borderRadius: radius.md, padding: space.md, gap: space.xs }}>
        <Row label={t("vouchers.repaymentDue")} value={formatDate(voucher.repaymentDueDate)} colors={colors} />
        <Row
          label={t("vouchers.daysOverdue")}
          value={String(voucher.daysOverdue)}
          colors={colors}
          valueColor={voucher.daysOverdue > 0 ? colors.chili : colors.ink}
        />
        <Row
          label={t("vouchers.penalty")}
          value={formatRwf(voucher.penaltyAmount)}
          colors={colors}
          valueColor={voucher.penaltyAmount > 0 ? colors.chili : colors.ink}
        />
        <Row label={t("vouchers.serviceFee")} value={`${voucher.serviceFeeRate}%`} colors={colors} />
      </View>

      <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 15, fontWeight: "700", color: colors.ink }}>
        {t("vouchers.transactions")}
      </Text>
      {voucher.transactions.length === 0 ? (
        <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.label }}>—</Text>
      ) : (
        voucher.transactions.slice(0, 5).map((tx) => (
          <View
            key={tx.id}
            style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: space.xs }}
          >
            <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.ink }}>{tx.orderNumber}</Text>
            <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 13, fontWeight: "700", color: colors.ink }}>
              {formatRwf(tx.amountCharged)}
            </Text>
            <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label }}>
              {formatDate(tx.transactionDate)}
            </Text>
          </View>
        ))
      )}

      <Button
        label={t("vouchers.viewLoan")}
        onPress={handleViewLoan}
        variant="secondary"
        fullWidth
        accessibilityLabel="View linked loan application"
      />
    </BottomSheet>
  );
}

function Row({
  label,
  value,
  colors,
  valueColor,
}: {
  label: string;
  value: string;
  colors: { ink: string; label: string };
  valueColor?: string;
}) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.label }}>{label}</Text>
      <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 13, fontWeight: "600", color: valueColor ?? colors.ink }}>
        {value}
      </Text>
    </View>
  );
}
