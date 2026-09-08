/**
 * Voucher detail screen (full page — used for direct/deep-link navigation,
 * as opposed to the VoucherDetailsSheet used from the list). Same content
 * shape as the sheet: code/type/status, credit summary, repayment info,
 * transaction history, link to loan.
 */
import React, { useEffect } from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "../../../src/theme/ThemeContext";
import { useI18n } from "../../../src/i18n";
import { TraderShell } from "../../../src/components/layout/TraderShell";
import { Card } from "../../../src/components/ui/Card";
import { Button } from "../../../src/components/ui/Button";
import { VoucherStatusBadge, VoucherTypeChip } from "../../../src/components/ui/DomainBadges";
import { ErrorState } from "../../../src/components/data/ErrorState";
import { formatRwf } from "../../../src/lib/currency";
import { formatDate } from "../../../src/lib/date";
import { MOCK_VOUCHERS } from "../../../src/mocks/vouchers";

/** Full-screen voucher detail, reached via direct navigation or deep link. */
export default function VoucherDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, space, radius } = useTheme();
  const t = useI18n();
  const voucher = MOCK_VOUCHERS.find((v) => v.id === id);
  const mono = Platform.OS === "ios" ? "Courier New" : "monospace";
  const width = useSharedValue(0);

  const usedPct = voucher && voucher.creditLimit > 0 ? Math.round((voucher.usedCredit / voucher.creditLimit) * 100) : 0;

  useEffect(() => {
    width.value = withTiming(usedPct, { duration: 800 });
  }, [usedPct, width]);

  const animStyle = useAnimatedStyle(() => ({ width: `${width.value}%` }));

  if (!voucher) {
    return (
      <TraderShell title={t("vouchers.detail")} showBack onBack={() => router.back()}>
        <ErrorState message={`${t("vouchers.detail")}: ${t("common.notFound")}`} onRetry={() => router.back()} />
      </TraderShell>
    );
  }

  return (
    <TraderShell title={t("vouchers.detail")} showBack onBack={() => router.back()}>
      <ScrollView contentContainerStyle={{ padding: space.lg, gap: space.md }}>
        <Card>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontFamily: mono, fontSize: 18, color: colors.leaf }}>{voucher.voucherCode}</Text>
            <VoucherStatusBadge status={voucher.status} />
          </View>
          <View style={{ marginTop: space.sm }}>
            <VoucherTypeChip type={voucher.voucherType} />
          </View>
        </Card>

        <Card>
          <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 24, fontWeight: "700", color: colors.ink }}>
            {formatRwf(voucher.creditLimit)}
          </Text>
          <View style={{ height: 8, borderRadius: radius.pill, backgroundColor: colors.hairline, marginTop: space.sm, overflow: "hidden" }}>
            <Animated.View style={[animStyle, { height: "100%", backgroundColor: colors.leaf }]} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: space.sm }}>
            <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label }}>
              {t("vouchers.usedCredit")}: {formatRwf(voucher.usedCredit)}
            </Text>
            <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label }}>
              {t("vouchers.remainingCredit")}: {formatRwf(voucher.remainingCredit)}
            </Text>
          </View>
        </Card>

        <Card>
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
        </Card>

        <Card>
          <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 14, fontWeight: "700", color: colors.ink, marginBottom: space.sm }}>
            {t("vouchers.transactions")}
          </Text>
          {voucher.transactions.length === 0 ? (
            <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.label }}>—</Text>
          ) : (
            voucher.transactions.map((tx) => (
              <View key={tx.id} style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 }}>
                <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.ink }}>{tx.orderNumber}</Text>
                <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 13, fontWeight: "700", color: colors.ink }}>
                  {formatRwf(tx.amountCharged)}
                </Text>
              </View>
            ))
          )}
        </Card>

        <Button
          label={t("vouchers.viewLoan")}
          onPress={() => router.push(`/(trader)/loans/${voucher.loanId}`)}
          variant="secondary"
          fullWidth
          accessibilityLabel="View linked loan application"
        />
      </ScrollView>
    </TraderShell>
  );
}

function Row({ label, value, colors, valueColor }: { label: string; value: string; colors: { ink: string; label: string }; valueColor?: string }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 }}>
      <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.label }}>{label}</Text>
      <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 13, fontWeight: "600", color: valueColor ?? colors.ink }}>
        {value}
      </Text>
    </View>
  );
}
