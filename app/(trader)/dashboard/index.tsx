/**
 * Dashboard (home) screen: wallet card, stats row, commission card, recent
 * transactions, delegation banner. Source: `app/page.tsx` in the web app.
 * Simulates an async load (mocked) so loading/error states are exercised.
 */
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { useTheme } from "../../../src/theme/ThemeContext";
import { useI18n } from "../../../src/i18n";
import { TraderShell } from "../../../src/components/layout/TraderShell";
import { StatCard } from "../../../src/components/data/StatCard";
import { WalletCard } from "../../../src/components/data/WalletCard";
import { CommissionCard } from "../../../src/components/data/CommissionCard";
import { TransactionRow } from "../../../src/components/data/TransactionRow";
import { DelegationBanner } from "../../../src/components/data/DelegationBanner";
import { EmptyState } from "../../../src/components/data/EmptyState";
import { ErrorState } from "../../../src/components/data/ErrorState";
import { SkeletonRow } from "../../../src/components/data/SkeletonRow";
import { TopUpSheet } from "../../../src/components/modals/TopUpSheet";
import { WithdrawSheet } from "../../../src/components/modals/WithdrawSheet";
import { formatRwf } from "../../../src/lib/currency";
import { MOCK_WALLET, MOCK_TRANSACTIONS } from "../../../src/mocks/wallet";
import { MOCK_VOUCHERS } from "../../../src/mocks/vouchers";
import { MOCK_TRADER_STATS, MOCK_COMMISSION_MONTHS } from "../../../src/mocks/commission";
import { MOCK_DELEGATION_STATUS } from "../../../src/mocks/delegation";
import { MOCK_TRADER } from "../../../src/mocks/auth";

/** Trader dashboard: wallet, stats, commission trend, recent activity. */
export default function DashboardScreen() {
  const { colors, space } = useTheme();
  const t = useI18n();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [topUpVisible, setTopUpVisible] = useState(false);
  const [withdrawVisible, setWithdrawVisible] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setIsError(false);
    setTimeout(() => setLoading(false), 400);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  function handleRefresh(): void {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  }

  const activeVouchers = MOCK_VOUCHERS.filter((v) => v.status === "ACTIVE").length;
  const currentMonth = MOCK_COMMISSION_MONTHS[MOCK_COMMISSION_MONTHS.length - 1];

  return (
    <TraderShell title={t("dashboard.title")} avatarUri={MOCK_TRADER.profileImage}>
      {loading ? (
        <ScrollView contentContainerStyle={{ padding: space.lg, gap: space.md }}>
          <SkeletonRow height={160} />
          <SkeletonRow height={90} />
          <SkeletonRow height={140} />
        </ScrollView>
      ) : isError ? (
        <ErrorState onRetry={load} />
      ) : (
        <ScrollView
          contentContainerStyle={{ padding: space.lg, gap: space.lg }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={colors.leaf} />}
        >
          <DelegationBanner
            status={MOCK_DELEGATION_STATUS.status}
            onPress={() => router.push("/(trader)/settings/delegation")}
          />

          <WalletCard wallet={MOCK_WALLET} onTopUp={() => setTopUpVisible(true)} onWithdraw={() => setWithdrawVisible(true)} />

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.md }}>
            <View style={{ flexBasis: "47%", flexGrow: 1 }}>
              <StatCard
                label={t("dashboard.activeVouchers")}
                value={String(activeVouchers)}
                deltaTone="ripe"
              />
            </View>
            <View style={{ flexBasis: "47%", flexGrow: 1 }}>
              <StatCard label={t("dashboard.totalLoansApproved")} value={String(MOCK_TRADER_STATS.totalLoansApproved)} />
            </View>
            <View style={{ flexBasis: "47%", flexGrow: 1 }}>
              <StatCard label={t("dashboard.commissionEarned")} value={formatRwf(MOCK_TRADER_STATS.commissionsEarned)} />
            </View>
            <View style={{ flexBasis: "47%", flexGrow: 1 }}>
              <StatCard
                label={t("dashboard.pendingCommission")}
                value={formatRwf(currentMonth?.pending ?? 0)}
                deltaTone="marigold"
              />
            </View>
          </View>

          <CommissionCard
            mode={MOCK_WALLET.commissionMode}
            rate={MOCK_WALLET.commission}
            earnedThisMonth={currentMonth?.earned ?? 0}
            months={MOCK_COMMISSION_MONTHS}
            onViewSettings={() => router.push("/(trader)/settings/commission")}
          />

          <View>
            <Text style={{ fontFamily: "SpaceGrotesk_700", fontSize: 16, fontWeight: "700", color: colors.ink, marginBottom: space.sm }}>
              {t("dashboard.recentTransactions")}
            </Text>
            {MOCK_TRANSACTIONS.length === 0 ? (
              <EmptyState icon="receipt-outline" message={t("common.error")} />
            ) : (
              MOCK_TRANSACTIONS.slice(0, 5).map((tx) => <TransactionRow key={tx.id} transaction={tx} />)
            )}
          </View>
        </ScrollView>
      )}

      <TopUpSheet visible={topUpVisible} onClose={() => setTopUpVisible(false)} />
      <WithdrawSheet visible={withdrawVisible} onClose={() => setWithdrawVisible(false)} />
    </TraderShell>
  );
}
