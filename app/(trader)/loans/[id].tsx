/**
 * Loan detail screen: info card, restaurant info, approve action (if
 * PENDING + sufficient balance), linked vouchers, notes.
 */
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useTheme } from "../../../src/theme/ThemeContext";
import { useI18n } from "../../../src/i18n";
import { TraderShell } from "../../../src/components/layout/TraderShell";
import { Card } from "../../../src/components/ui/Card";
import { Button } from "../../../src/components/ui/Button";
import { LoanStatusBadge, VoucherStatusBadge } from "../../../src/components/ui/DomainBadges";
import { ErrorState } from "../../../src/components/data/ErrorState";
import { ApproveLoanSheet } from "../../../src/components/modals/ApproveLoanSheet";
import { formatRwf } from "../../../src/lib/currency";
import { formatDate } from "../../../src/lib/date";
import { MOCK_LOANS } from "../../../src/mocks/loans";
import { MOCK_VOUCHERS } from "../../../src/mocks/vouchers";
import { MOCK_WALLET } from "../../../src/mocks/wallet";
import { LoanStatus } from "../../../src/types/domain";

/** Loan detail: full info, approve action, linked vouchers. */
export default function LoanDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, space } = useTheme();
  const t = useI18n();
  const [approveVisible, setApproveVisible] = useState(false);
  const [approvedNow, setApprovedNow] = useState(false);

  const loan = MOCK_LOANS.find((l) => l.id === id);

  if (!loan) {
    return (
      <TraderShell title={t("loans.detail")} showBack onBack={() => router.back()}>
        <ErrorState message="Loan not found" onRetry={() => router.back()} />
      </TraderShell>
    );
  }

  const linkedVouchers = MOCK_VOUCHERS.filter((v) => v.loanId === loan.id);
  const canApprove = loan.status === LoanStatus.PENDING && !approvedNow && MOCK_WALLET.availableBalance >= loan.requestedAmount;

  return (
    <TraderShell title={t("loans.detail")} showBack onBack={() => router.back()}>
      <ScrollView contentContainerStyle={{ padding: space.lg, gap: space.md }}>
        <Card>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 18, fontWeight: "700", color: colors.ink }}>
                {loan.restaurantName}
              </Text>
              <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label, marginTop: 2 }}>
                {loan.id} · {formatDate(loan.createdAt)}
              </Text>
            </View>
            <LoanStatusBadge status={approvedNow ? LoanStatus.APPROVED : loan.status} />
          </View>
        </Card>

        <Card>
          <Row label={t("loans.requestedAmount")} value={formatRwf(loan.requestedAmount)} colors={colors} />
          <Row label={t("loans.purpose")} value={loan.purpose} colors={colors} />
          <Row label={t("loans.repaymentDays")} value={`${loan.repaymentDays} days`} colors={colors} />
        </Card>

        <Card>
          <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 14, fontWeight: "700", color: colors.ink, marginBottom: space.xs }}>
            {t("loans.restaurant")}
          </Text>
          <Row label={t("loans.restaurant")} value={loan.restaurantName} colors={colors} />
          <Row label="Email" value={loan.restaurantEmail} colors={colors} />
        </Card>

        {canApprove ? (
          <Button
            label={t("loans.approve")}
            onPress={() => setApproveVisible(true)}
            fullWidth
            accessibilityLabel={`Approve loan application for ${loan.restaurantName}`}
          />
        ) : null}

        {linkedVouchers.length > 0 ? (
          <Card>
            <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 14, fontWeight: "700", color: colors.ink, marginBottom: space.sm }}>
              {t("loans.linkedVouchers")}
            </Text>
            {linkedVouchers.map((v) => (
              <View key={v.id} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: space.xs }}>
                <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.ink }}>{v.voucherCode}</Text>
                <Text style={{ fontFamily: "IBMPlexSans", fontSize: 12, color: colors.label }}>
                  {formatRwf(v.remainingCredit)}
                </Text>
                <VoucherStatusBadge status={v.status} />
              </View>
            ))}
          </Card>
        ) : null}

        {loan.notes ? (
          <Card>
            <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 14, fontWeight: "700", color: colors.ink, marginBottom: space.xs }}>
              {t("loans.notes")}
            </Text>
            <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.label }}>{loan.notes}</Text>
          </Card>
        ) : null}
      </ScrollView>

      <ApproveLoanSheet
        visible={approveVisible}
        onClose={() => setApproveVisible(false)}
        loan={loan}
        onApproved={() => setApprovedNow(true)}
      />
    </TraderShell>
  );
}

function Row({ label, value, colors }: { label: string; value: string; colors: { ink: string; label: string } }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 }}>
      <Text style={{ fontFamily: "IBMPlexSans", fontSize: 13, color: colors.label }}>{label}</Text>
      <Text style={{ fontFamily: "IBMPlexSans_600", fontSize: 13, fontWeight: "600", color: colors.ink, flexShrink: 1, textAlign: "right" }}>
        {value}
      </Text>
    </View>
  );
}
